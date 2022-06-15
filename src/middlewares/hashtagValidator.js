import hashtagSchema from "../schemas/hashtagSchema.js"

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