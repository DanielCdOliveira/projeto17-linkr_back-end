import hashtagSchema from "../schemas/hashtagSchema.js";

export default function hashtagValidator(req, res, next){
    const { message } = req.body;
    let messageArray = message.split(" ")
    let hashtags = messageArray.filter((hashtag) => {
        let validation = hashtagSchema.validate({hashtag})
        if(hashtag.includes("#") && !validation.error){
            return hashtag
        }
    })
    if(hashtags.length > 0){
        res.locals.hashtags = hashtags
    }
    console.log("next")
    next()
}