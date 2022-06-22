import connection from "../config/db.js";

async function postComments(comment, userId, postId) {
    return connection.query(`
        INSERT INTO comments (comment, "userId", "postId")
        VALUES ($1, $2, $3)`,
        [comment, userId, postId]);
}

async function getComments(id) {
    return connection.query(`
        SELECT comments.*, posts.id AS "postId", posts."userId" AS "postUserId", users.name, users.image
        FROM comments
        JOIN posts ON posts.id = comments."postId"
        JOIN users ON users.id = comments."userId"
        WHERE "postId" = $1
        ORDER BY id`,
        [id]);
}

async function countComments(id) {
    return connection.query(`
        SELECT COUNT(comments."postId")
        FROM comments
        WHERE comments."postId" = $1`,
        [id])
}

async function getFollows(id) {
    return connection.query(`
        SELECT * FROM users_follow
        WHERE "followerId" = $1`,
        [id]);
}

const commentsRepository = {
    postComments,
    getComments,
    countComments,
    getFollows
};

export default commentsRepository;