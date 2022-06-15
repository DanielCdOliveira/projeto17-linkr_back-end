import hashtagsRepository from "../repositories/hashtagsRepository.js"

export async function getRanking(req, res) {
    try {
        let list = await hashtagsRepository.hashtagList()
        res.status(200).send(list.rows) 
    } catch {
        res.status(500).send(err)
    }
}