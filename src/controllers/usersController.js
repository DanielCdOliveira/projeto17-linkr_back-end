import connection from "../config/db.js";

export async function getUsers(req,res){
    const {name, id} = req.query

    const nameClause = name? `users.name ILIKE ${name}` : ``;
    const idClause = id ? `users.id = ${id}` : ``;

    try{
        const users = await connection.query(
            `
            SELECT users.name AS name, users.id AS id, users.image AS image
            FROM users
            WHERE 
            ${nameClause}
            ${idClause}
            `
        );

        res.status(200).send(users.rows);
    }
    catch(err){
        res.status(500).send("Erro no servidor");
    }
}

