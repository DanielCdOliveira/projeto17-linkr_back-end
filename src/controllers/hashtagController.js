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
        const post = (await postRepository.getPostsById(id))
        const hashtags = findHashtag(post.rows[0].message)
        if(hashtags !== ""){
            for(let hashtag of hashtags){
                const hashtagInfos = (await hashtagsRepository.verificateHashtag(hashtag)).rows
                await hashtagsRepository.deleteHashtag(hashtagInfos[0].id)
            }
        }
        return res.sendStatus(204);
    } catch (err) {
        return res.status(422).send("Não foi possível deletar a hashtag!")
    }
}

export async function updateHashtag(req, res) {
    const { message, postId  } = req.body
    try {
        const post = (await postRepository.getPostsById(postId))
        const oldHashtags = findHashtag(post.rows[0].message)

        if(oldHashtags !== ""){
            for(let hashtag of oldHashtags){
                let hashtagInfos = (await hashtagsRepository.verificateHashtag(hashtag)).rows
                await hashtagsRepository.deleteHashtag(hashtagInfos[0].id)
            }
        }
        if(message == ""){
            return res.sendStatus(204);
        }
        const newHashtags = findHashtag(message)
        if(newHashtags !== ""){
            for(let hashtag of newHashtags){
                await hashtagsRepository.insertHashtag(hashtag)
            }
        }
        return res.sendStatus(204);
    } catch (err) {
        return res.status(422).send("Não foi possível deletar a hashtag")
    }
}