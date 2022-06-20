import hashtagSchema from "../schemas/hashtagSchema.js"

export default function findHashtag(message){
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
    console.log(hashtags)
    if(hashtags.length > 0){
        console.log(hashtags)
        return hashtags
    }
    return ""
}