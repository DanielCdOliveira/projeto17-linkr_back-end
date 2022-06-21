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

const usersRepository = {
    findUser
}

export default usersRepository