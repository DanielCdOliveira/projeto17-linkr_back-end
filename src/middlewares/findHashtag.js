import hashtagSchema from "../schemas/hashtagSchema.js"

export default function findHashtag(message){
    let messageArray = message.split(" ")
    let hashtags = []
    for(let hashtag of messageArray){
        if(hashtag.includes("#") && hashtag[0] == "#"){
            let word = hashtag.replace('#',"")
            if(word.length > 0){
                hashtags.push(word)
            }
        }
    }
    if(hashtags.length > 0){
        return hashtags
    }
    return ""
}