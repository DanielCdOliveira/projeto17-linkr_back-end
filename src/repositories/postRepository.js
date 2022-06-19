import connection from "../config/db.js"

async function createLink(link) {
  const { title, description, image, url } = link;

  const result = await connection.query(`SELECT * FROM link where url = $1`, [
    url,
  ]);
  console.log(result.rows)
  if (result.rowCount > 0) {
    return result.rows[0].id;
  }

  return connection.query(
    `INSERT INTO link ("title","description","image","url") values($1,$2,$3,$4)`,
    [title, description, image, url]
  );
}

async function createPost(user, link, message,resultLink) {
  if(typeof(resultLink) === "number" ){
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

async function likePost(userId, id) {
    return connection.query(`
        INSERT INTO likes ("userId", "postId")
        VALUES ($1, $2)`,
        [userId, id]);
}

async function deslikePost(userId, id) {
    return connection.query(`
        DELETE from likes
        WHERE "userId" = $1 AND "postId" = $2`,
        [userId, id]);
}

async function getLikes() {
    return connection.query(`
      SELECT likes.id, likes."postId", users.name, likes."userId"
      FROM likes
      JOIN users ON users.id = likes."userId"
    `);
}

async function getLikesById(id) {
  return connection.query(`
    SELECT likes.id, likes."postId", users.name, likes."userId"
    FROM likes
    JOIN users ON users.id = likes."userId"
    WHERE likes."postId" = $1`, [id]
  );
}

async function countLikes(id) {
    return connection.query(`
        SELECT COUNT(likes."postId")
        FROM likes
        WHERE likes."postId" = $1`,
        [id])
}

async function deletePost(userId, id) {
    return connection.query(`
        DELETE from posts
        WHERE "userId" = $1 AND "id" = $2`,
        [userId, id]);
}

async function deleteLikes(id) {
  return connection.query(
   `DELETE FROM likes
    WHERE likes."postId" = $1`
  , [id]);
}

async function editPost(userId, postId, message) {
    return connection.query(`
        update posts
        set message = $1
        WHERE "userId" = $2 AND id = $3`,
        [message, userId, postId]);
}

async function getEditedPost(postId) {
  return connection.query(`
  SELECT * FROM posts
  WHERE id = $1`, [postId]);
}

async function getPosts(limit, offset){

  const offsetClause = offset ? `OFFSET ${offset}` : "";
  const limitClause = limit ? `LIMIT ${limit}` : `LIMIT 20`;
  
  return connection.query(
    `SELECT
      posts.id as postId,posts.message, posts."userId", link.* FROM posts
    JOIN
     link
    ON
     posts."linkId" = link.id
    ORDER BY
     posts.id desc
    ${offsetClause}
    ${limitClause}
    `
  );
}

async function getPostsByParams(hashtag) {
  return connection.query(`
    SELECT 
      * 
    FROM
      posts
    JOIN 
      link
    ON
      posts."linkId" = link.id
    WHERE 
      message
    ILIKE 
      ($1)
    ORDER BY 
      posts."id" DESC
  `,[`%#${hashtag}%`])
}

async function getPostsById(id) {
  return (await connection.query(`
    SELECT 
      * 
    FROM 
      posts 
    WHERE 
      id = ($1)
  `,[id])).rows
}

async function deleteHashtag(hashtags) {
  let answer 
  for(let hashtag of hashtags){
    console.log(hashtag)
    let count = await connection.query(`
      SELECT 
        *
      FROM 
        hashtags
      WHERE
        name = ($1)
    `,[hashtag])
    let countInfos = count.rows
    if(countInfos.ranking > 1){
      console.log("maior q 1")
      answer = await connection.query(`
        UPDATE 
            hashtags
        SET 
            ranking = (ranking - 1)
        WHERE 
            name = ($1)
      `, [hashtag])
    } else {
      console.log('menor que 1')
      answer = await connection.query(`
        DELETE FROM
            hashtags
        WHERE 
            name = ($1)
      `, [hashtag])
    }
  }
  return answer
}

const postRepository = {
  createPost,
  likePost,
  deslikePost,
  getLikes,
  countLikes,
  deletePost,
  editPost,
  getEditedPost,
  getPosts,
  createLink,
  getPostsByParams,
  deleteLikes,
  getLikesById,
  getPostsById,
  deleteHashtag
};

export default postRepository