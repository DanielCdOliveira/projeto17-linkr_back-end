import urlMetadata from "url-metadata";

import postRepository from "../repositories/postRepository.js"
import hashtagsRepository from "../repositories/hashtagsRepository.js"

export async function publishPost(req,res){
        const { link, message } = req.body
        const { hashtags, userId } = res.locals
        try{
                const {title, description, image, url} = await urlMetadata(`${link}`);
                const metadatas = {
                title,
                description,
                image,
                url
                };
                const result = await postRepository.createLink(metadatas)

                await postRepository.createPost(userId, url, message, result);
                if(hashtags !== undefined){
                for(let hashtag of hashtags){
                    let verification = await hashtagsRepository.verificateHashtag(hashtag)
                    if(verification.rowCount > 0){
                        await hashtagsRepository.updateHashtag(hashtag)
                    } else {
                        await hashtagsRepository.insertHashtag(hashtag)
                    }
                }
            }
                res.sendStatus(201)
        
        }catch(err){
            res.send(err)
        }
}

export async function likePost(req, res) {
    const { userId } = res.locals;
    const { id } = req.params;

    try {
        await postRepository.likePost(userId, id);
        return res.status(200).send("Curtiu a publicação!");
    
    } catch (e) {
        console.log(e);
        return res.status(422).send("Não foi possível curtir a publicação!")
    }
}

export async function deslikePost(req, res) {
    const { userId } = res.locals;
    const { id } = req.params;

    try {
        await postRepository.deslikePost(userId, id);
        return res.status(200).send("Descurtiu a publicação!");
    
    } catch (e) {
        console.log(e);
        return res.status(422).send("Não foi possível descurtir a publicação!")
    }
}

export async function countLikes(req, res) {
    const { postId } = req.body;

    try {
        const likesInfo = await postRepository.countLikes(postId);
        return res.status(200).send(likesInfo);
    
    } catch (e) {
        console.log(e);
        return res.status(422).send("Não foi possível mostrar a quantidade de likes!")
    }
}

export async function deletePost(req, res) {
    const { userId } = res.locals;
    const { id } = req.params;

    console.log(userId, id)

    try {
        await postRepository.deletePost(userId, id);
        return res.sendStatus(204);
    
    } catch (e) {
        console.log(e);
        return res.status(422).send("Não foi possível deletar o post!")
    }
}

export async function editPost(req, res) {
    const { userId } = res.locals;
    const { postId, message } = req.body;

    console.log("aaaaaa", postId, message, userId)

    try {
        await postRepository.editPost(userId, postId, message);
        const postEdited = await postRepository.getEditedPost(postId);
        console.log(postEdited.rows)
        return res.status(200).send(postEdited.rows[0].message);
    
    } catch (e) {
        console.log(e);
        return res.status(422).send("Não foi possível editar o post!")
    }
}

export async function getPosts(req,res){

        try{
                const result = await postRepository.getPosts()
                res.send(result.rows)
        }catch(err){
                res.send(err)
        }
}