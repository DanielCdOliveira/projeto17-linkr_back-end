import usersRepository from "../repositories/usersRepository.js";

export async function getUser(req,res){
    const {name, id} = req.query

    try{
        const users = await usersRepository.findUser(name, id);

        res.status(200).send(users.rows);
    }
    catch(err){
        console.log("Erro ao buscar usuário");
        console.log(err);
        res.status(500).send(err);
    }
}