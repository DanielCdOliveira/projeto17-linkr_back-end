import postRepository from "../repositories/postRepository.js"
import hashtagSchema from "../schemas/hashtagSchema.js";

export default function hashtagValidator(req, res, next){
    const { message } = req.body;
    let messageArray = message.split(" ")
    let hashtags = []
    for(let hashtag of messageArray){
        if(hashtag.includes("#")){
            let word = hashtag.replace('#',"")
            let validation = hashtagSchema.validate({hashtag: word})
            if(!validation.error && word != undefined){
                hashtags.push(word)
            }
        }
    }
    if(hashtags.length > 0){
        res.locals.hashtags = hashtags
    }
    next()
}

export async function updateHashtagMiddleware(req, res, next) {
    const { postId } = req.body
    try {
        const idValidation = await postRepository.getPostsById(postId)
        if(idValidation.rowCount == 0) {
            res.status(404).send("O post não existe")
            return
        }
        next()

    } catch (err) {
        res.status(500).send("Erro no servidor " + err);
    }
}