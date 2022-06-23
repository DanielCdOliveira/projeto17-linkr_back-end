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
async function countShares(id) {
  return connection.query(`
      SELECT COUNT(shares."originalPostId")
      FROM shares
      WHERE shares."originalPostId" = $1`,
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

async function deleteComments(id) {
  return connection.query(
   `DELETE FROM comments
    WHERE comments."postId" = $1`
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

async function getPosts(limit, offset, userId, followerId){

  const offsetClause = offset ? `OFFSET ${offset}` : "";
  const limitClause = limit ? `LIMIT ${limit}` : `LIMIT 20`;
  const userIdClause = userId ? `WHERE posts."userId" = ${Number(userId)}` : ``;
  if(userId){
    return connection.query(
      `SELECT posts.id as postId,posts.message, posts."userId",posts."originalUserId", posts."originalPostId", link.*,  users.name as "userName", users.image as "userImage"FROM posts
      join link
        on posts."linkId" = link.id
      join users 
        on posts."userId" = users.id
        ${userIdClause}
        order by posts.id desc
        ${offsetClause}
        ${limitClause}
      `
    )
  } else{

    const followingSomeone = await connection.query(
      `SELECT 
            * 
        from 
            users 
                join users_follow as uf 
                    on users.id = uf."followerId"
    `)
    if(followingSomeone.rowCount === 0){
      return false
    }

    return connection.query(
      `SELECT posts.id as postId,posts.message, posts."userId" ,posts."originalUserId", posts."originalPostId", link.*,  users.name as "userName", users.image as "userImage" FROM posts
      join link
        on posts."linkId" = link.id
      join users_follow as uf
        on uf."followedId" = posts."userId"
      join users 
        on uf."followedId" = users.id
      where uf."followerId" = $1`,
      [followerId]
    );
  }

  
}

async function getPostsByParams(hashtag) {
  return connection.query(`
    SELECT 
      posts.id as postId,posts.message, posts."userId", link.*,  users.name as "userName", users.image as "userImage" 
    FROM
      posts
    JOIN 
      link
    ON
      posts."linkId" = link.id
    JOIN 
      users 
    ON 
      posts."userId" = users.id
    WHERE 
      message
    ILIKE 
      ($1)
    ORDER BY 
      posts."id" DESC
  `,[`%#${hashtag}%`])
}

async function getPostsById(id) {
    return connection.query(`
    SELECT 
      * 
    FROM 
      posts 
    WHERE 
      id = $1
  `,[id])
}

async function deleteHashtag(hashtags) {
  let answer 
  for(let hashtag of hashtags){
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
      answer = await connection.query(`
        UPDATE 
            hashtags
        SET 
            ranking = (ranking - 1)
        WHERE 
            name = ($1)
      `, [hashtag])
    } else {
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
async function getPostInfo(postId) {

  const postInfo = (await connection.query(`
    SELECT * 
    FROM posts
    WHERE posts.id = $1
    `,[postId])).rows[0]
  return postInfo;
}
async function createRePost(userIdRepost,infoPost) {
const{userId, message,linkId,id} = infoPost
  const repostId = (await connection.query(`
  INSERT INTO posts
  ("originalUserId","userId","message","linkId","originalPostId") 
  values ($1, $2, $3, $4, $5)
  RETURNING id;
  `,[userId,userIdRepost,message,linkId,id])).rows[0].id
  await connection.query(`
  INSERT INTO shares("userId","originalPostId","repostId") values($1, $2,$3)
  `,[userIdRepost, id,repostId])
}
async function getName(userIdRepost) {
    const name = (await connection.query(`
      SELECT name
      FROM users
      WHERE id = $1
    `,[userIdRepost])).rows[0].name
  return name
}
async function getUser(userIdRepost) {
  const user = (await connection.query(`
    SELECT *
    FROM users
    WHERE id = $1
  `,[userIdRepost])).rows[0]
  console.log("name",user);
return user
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
  deleteHashtag,
  countShares,
  getPostInfo,
  createRePost,
  deleteComments,
  getName,
  getUser
};

export default postRepository