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
        console.log(err)
        res.status(500).send(err)
    }
}

export async function deleteHashtag(req,res) {
    const { id } = req.params

    try {
        const post = await postRepository.getPostsById(id)
        const hashtags = findHashtag(post[0].message)
        if(hashtags !== ""){
            await postRepository.deleteHashtag(hashtags)
        }
        return res.sendStatus(204);
    } catch (err) {
        return res.status(422).send("Não foi possível deletar o post!")
    }
}