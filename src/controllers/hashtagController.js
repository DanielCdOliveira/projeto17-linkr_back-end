import hashtagsRepository from "../repositories/hashtagsRepository.js"
import postRepository from "../repositories/postRepository.js"

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
        console.log(posts.rows)
        res.status(200).send(posts.rows) 
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}