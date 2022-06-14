import connection from "../config/db.js"
async function createPost(user, link, message) {
  return connection.query(
    `INSERT INTO posts("userId","message","link") values($1,$2,$3)`,
    [user, message, link]
  );
}

const postRepository = {
        createPost,
};

export default postRepository