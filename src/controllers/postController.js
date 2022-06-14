import postRepository from "../repositories/postRepository.js"
import createHashtag from "../repositories/hashtagsRepository.js";
console.log("here")

export async function publishPost(req,res){
        const { link, message } = req.body
        const { hashtags } = res.locals
        const user = 1
        try{
                // validar o token
                await postRepository.createPost(user, link, message)
                console.log("controller")
                await createHashtag(hashtags)
                res.sendStatus(201)
        }catch(err){
                res.send(err)
        }
}

