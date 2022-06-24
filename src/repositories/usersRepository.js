import connection from "../config/db.js";

async function findUser(name, followerId, id){

    const nameClause = name? `u.name ILIKE '${name}%'` : ``;
    const idClause = id ? `users.id = ${id}` : ``;

    if(id){
      return(
        connection.query(
          `
          SELECT users.name AS name, users.id AS id, users.image AS image
          FROM users
          WHERE 
          ${idClause}
          `
        )
    )
    }

    return(
        connection.query(
        `
        select 
            u.name, u.image, u.id
        from 
            users as u
            left join users_follow as uf
                on u.id = uf."followedId"
                and uf."followerId" = $1
        where
            u.id <> $2 and ${nameClause}
        order by
            case
                when uf."followedId" is not null then 1
                else 0
            end desc,
            u.name
        `, [followerId, followerId]
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
        where uf."followedId" = $1 and uf."followerId" = $2`,
      [followed,follower]
    );
    if(validateFollowerAlreadyFollow.rowCount !== 0){
        return validateFollowerAlreadyFollow
    }
    return connection.query(
      `INSERT INTO users_follow ("followerId","followedId") values($1,$2)`,
      [follower, followed]
    );
}
async function unfollow(follower,followed){
    const validateFollowerExist = await connection.query(
      `SELECT * FROM users where id = $1`,
      [follower]
    );
    if (validateFollowerExist.rowCount === 0) {
      return validateFollowedExist;
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
    if (validateFollowerAlreadyFollow.rowCount === 0) {
      return validateFollowerAlreadyFollow;
    }

    return connection.query(
      `DELETE FROM users_follow where "followerId" = $1 and "followedId" = $2`,[follower,followed]
    );
}

async function getUserFollow(follower,followed){

  const validateFollowerExist = await connection.query(
    `SELECT * FROM users where id = $1`,
    [follower]
  );
  if (validateFollowerExist.rowCount === 0) {
    return validateFollowedExist;
  }

  const validateFollowedExist = await connection.query(
    `SELECT * FROM users where id = $1`,
    [followed]
  );
  if (validateFollowedExist.rowCount === 0) {
    return validateFollowedExist;
  }
  
  return connection.query(
    `SELECT 
            * 
        from 
            users 
                join users_follow as uf 
                    on users.id = uf."followerId"
        where uf."followerId" = $1 and uf."followedId" = $2 `,
    [follower,followed]
  );
}

async function getUserFollowed() {
  return await connection.query(`
  SELECT * 
  FROM users_follow`
  );
}

const usersRepository = {
  findUser,
  follow,
  unfollow,
  getUserFollow,
  getUserFollowed
};

export default usersRepository