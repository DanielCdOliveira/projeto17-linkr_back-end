import postRepository from "../repositories/postRepository.js"

export default async function publishPost(req,res){
        const { link, message } = req.body;
        const user = 1
        try{
                await postRepository.createPost(user, link, message);
                res.sendStatus(201)
        }catch(err){
                res.send(err)
        }
}

