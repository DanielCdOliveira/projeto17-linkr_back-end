import connection from "../config/db.js"


async function createPost(user, link, message) {
  return connection.query(
    `INSERT INTO posts("userId","message","link") values($1,$2,$3)`,
  [user, message, link]
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

const postRepository = {
        createPost,
        likePost,
        deslikePost,
        countLikes,
        deletePost,
        editPost
};

export default postRepository