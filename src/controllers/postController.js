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
        await likesRepository.likePost(userId, id);
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
        await likesRepository.deslikePost(userId, id);
        return res.status(200).send("Descurtiu a publicação!");
    
    } catch (e) {
        console.log(e);
        return res.status(422).send("Não foi possível descurtir a publicação!")
    }
}

export async function countLikes(req, res) {
    const { postId } = req.body;

    try {
        const likesInfo = await likesRepository.countLikes(postId);
        return res.status(200).send(likesInfo);
    
    } catch (e) {
        console.log(e);
        return res.status(422).send("Não foi possível mostrar a quantidade de likes!")
    }
}

export async function deletePost(req, res) {
    const { userId } = res.locals;
    const { postId } = req.body;

    try {
        await likesRepository.deletePost(userId, postId);
        return res.sendStatus(204);
    
    } catch (e) {
        console.log(e);
        return res.status(422).send("Não foi possível deletar o post!")
    }
}

export async function editPost(req, res) {
    const { userId } = res.locals;
    const { postId, newMessage } = req.body;

    try {
        const postEdited = await likesRepository.editPost(userId, postId, newMessage);
        return res.status(200).send(postEdited);
    
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