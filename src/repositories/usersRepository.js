import connection from "../config/db.js";

async function findUser(name, id){

    const nameClause = name? `users.name ILIKE '${name}%'` : ``;
    const idClause = id ? `users.id = ${id}` : ``;

    return(
        await connection.query(
        `
        SELECT users.name AS name, users.id AS id, users.image AS image
        FROM users
        WHERE 
        ${nameClause}
        ${idClause}
        `
        )
    )
}
async function follow(follower,followed){

    const validateFollowerExist = await connection.query(
        `SELECT * FROM users where id = $1`,[follower]
    )
    if(validateFollowerExist.rowCount === 0){
        return validateFollowedExist
    }

    const validateFollowedExist = await connection.query(
      `SELECT * FROM users where id = $1`,
      [followed]
    );
    if (validateFollowedExist.rowCount === 0) {
      return validateFollowedExist;
    }

    const validateFollowerAlreadyFollow = await connection.query(
      `SELECT 
            * 
        from 
            users 
                join users_follow as uf 
                    on users.id = uf."followerId"
        where uf."followedId" = $1 `,
      [followed]
    );
    if(validateFollowerAlreadyFollow.rowCount !== 0){
        return validateFollowerAlreadyFollow
    }
    return connection.query(
      `INSERT INTO users_follow ("followerId","followedId") values($1,$2)`,
      [follower, followed]
    );
}
const usersRepository = {
  findUser,
  follow
};

export default usersRepository