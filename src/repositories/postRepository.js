import connection from "../config/db.js"

async function createLink(link) {
  const { title, description, image, url } = link;

  const result = await connection.query(`SELECT * FROM link where url = $1`, [
    url,
  ]);
  if (result.rowCount > 0) {
    return result.rows[0].id;
  }

  return connection.query(
    `INSERT INTO link ("title","description","image","url") values($1,$2,$3,$4)`,
    [title, description, image, url]
  );
}

async function createPost(user, link, message,resultLink) {
  if(resultLink){
    return connection.query(
      `INSERT INTO posts("userId","message","linkId") values($1, $2, $3)`,
      [user, message, resultLink]
    );
  } 

  const result = await connection.query(
    `SELECT 
      * 
    FROM 
      link
      where url = $1
      order by id desc
      `,
    [link]
  );

  const linkId = result.rows[0].id
  
    return connection.query(
      `INSERT INTO posts("userId","message","linkId") values($1, $2, $3)`,
      [user, message, linkId]
    );
}

async function likePost(userId, postId) {
    return connection.query(`
        INSERT INTO likes ("userId", "postId")
        VALUES ($1, $2)`,
        [userId, postId]);
}

async function deslikePost(userId, postId) {
    return connection.query(`
        DELETE from likes
        WHERE "userId" = $1 AND "postId" = $2`,
        [userId, postId]);
}

async function countLikes(postId) {
    return connection.query(`
        SELECT COUNT(likes."postId"), users.name
        FROM likes
        JOIN users ON users.id = likes."userId"
        WHERE likes."postId" = $1`,
        [postId])
}

async function deletePost(userId, postId) {
    return connection.query(`
        DELETE from posts
        WHERE "userId" = $1 AND "postId" = $2`,
        [userId, postId]);
}

async function editPost(userId, postId, newMessage) {
    return connection.query(`
        update posts
        set message = $1
        WHERE "userId" = $2 AND "postId" = $3`,
        [newMessage, userId, postId]);
}

async function getPosts(){
  return connection.query(
    `SELECT * FROM posts`
  )
}
const postRepository = {
  createPost,
  likePost,
  deslikePost,
  countLikes,
  deletePost,
  editPost,
  getPosts,
  createLink
};

export default postRepository