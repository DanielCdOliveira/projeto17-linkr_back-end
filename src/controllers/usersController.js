import connection from "../config/db.js";

export async function getUsers(req,res){
    let filter = req.body.name;
    filter = filter ? filter + "%" : "%";

    try{
        const users = await connection.query(
            `
            SELECT users.name AS name, users.id AS id, users.image AS image
            FROM users
            WHERE users.name ILIKE $1
            `,
            [`${filter}%`]
        );

        res.status(200).send(users.rows);
    }
    catch(err){
        console.log("Erro ao buscar usuários");
        console.log(err);
        res.status(500).send("Erro no servidor");
    }
}