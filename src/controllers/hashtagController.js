import hashtagsRepository from "../repositories/hashtagsRepository.js"
import postRepository from "../repositories/postRepository.js"
import findHashtag from "../middlewares/findHashtag.js"

export async function getRanking(req, res) {
    try {
        let list = await hashtagsRepository.hashtagList()
        res.status(200).send(list.rows) 
    } catch (err) {
        res.status(500).send(err)
    }
}

export async function getPostsByHashtag(req, res) {
    const { hashtag } = req.params 
    try {
        let posts = await postRepository.getPostsByParams(hashtag)
        res.status(200).send(posts.rows) 
    } catch (err) {
        res.status(500).send(err)
    }
}

export async function deleteHashtag(req,res) {
    const { id } = req.params

    try {
        const post = await postRepository.getPostsById(id)
        const hashtags = findHashtag(post.rows[0].message)
        if(hashtags !== ""){
            await postRepository.deleteHashtag(hashtags)
        }
        return res.sendStatus(204);
    } catch (err) {
        return res.status(422).send("Não foi possível deletar o post!")
    }
}

export async function updateHashtag(req, res) {
    const { message, postId  } = req.body
    try {
        const newHashtags = findHashtag(message)
        const oldPost = await postRepository.getPostsById(postId)
        const oldHashtags = findHashtag(oldPost.rows[0].message)
        if(newHashtags == undefined){
            for(let oldHashtag of oldHashtags){
                await hashtagsRepository.deleteHashtag(oldHashtag)
            }
        }
        if(oldHashtags != undefined){
            for(let oldHashtag of oldHashtags){
                const verification = await hashtagsRepository.verificateHashtag(oldHashtag)
                if(verification.rowCount > 0) {
                    let infos = verification.rows[0]
                    if(infos.ranking > 1){
                        await hashtagsRepository.updateRanking(oldHashtag)
                    } else {
                        await hashtagsRepository.deleteHashtag(oldHashtag)
                    }
                }
            } 
        }
        if(newHashtags != undefined){
            for(let newHashtag of newHashtags){
                const verification = await hashtagsRepository.verificateHashtag(newHashtag)
                if(verification.rowCount > 0) {
                    await hashtagsRepository.updateHashtag(newHashtag)
                } else {
                    await hashtagsRepository.insertHashtag(newHashtag)
                }    
            }
        }
        return res.sendStatus(204);
    } catch (err) {
        return res.status(422).send("Não foi possível deletar a hashtag")
    }
}