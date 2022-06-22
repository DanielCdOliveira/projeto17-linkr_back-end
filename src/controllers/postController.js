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
                        await hashtagsRepository.insertHashtag(hashtag)
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
        return res.status(200).send("Liked the post!");
    
    } catch (e) {
        return res.status(422).send("Unable to like the post!")
    }
}

export async function deslikePost(req, res) {
    const { userId } = res.locals;
    const { id } = req.params;

    try {
        await postRepository.deslikePost(userId, id);
        return res.status(200).send("Dislike the post!");
    
    } catch (e) {
        return res.status(422).send("Unable to dislike the post!")
    }
}

export async function getLikes(req, res) {
    try {
        const likes = await postRepository.getLikes();
        return res.status(200).send(likes.rows);
    
    } catch (e) {
        return res.status(422).send("Unable to get likes!")
    }
}

export async function getLikesById(req, res) {
    const { id } = req.params;

    try {
        const likes = await postRepository.getLikesById(id);
        return res.status(200).send(likes.rows);
    
    } catch (e) {
        return res.status(422).send("Unable to get likes!")
    }
}

export async function countLikes(req, res) {
    const { id } = req.params;

    try {
        const likesInfo = await postRepository.countLikes(id);

        if(likesInfo.rows.length == 0){
            return res.status(200).send(`${likesInfo.rows.length}`);
        } else {
            return res.status(200).send(likesInfo.rows[0].count);
        }
    
    } catch (e) {
        return res.status(422).send("Unable to get likes count!")
    }
}

export async function deletePost(req, res) {
    const { userId } = res.locals;
    const { id } = req.params;

    try {
        await postRepository.deleteLikes(id);
        await postRepository.deleteComments(id);
        await postRepository.deletePost(userId, id);
        return res.sendStatus(204);
    } catch (e) {
        return res.status(422).send("Unable to delete the post!")
    }
}

export async function editPost(req, res) {
    const { userId } = res.locals;
    const { postId, message } = req.body;

    try {
        await postRepository.editPost(userId, postId, message);
        const postEdited = await postRepository.getEditedPost(postId);
        return res.status(200).send(postEdited.rows[0].message);
    
    } catch (e) {
        return res.status(422).send("Unable to edit the post!")
    }
}

export async function getPosts(req,res){
    const { limit, offset, userId } = req.query;
        try{
            const result = await postRepository.getPosts(limit, offset, userId)
            res.send(result.rows)
        }catch(err){
            res.send(err)
        }
}

export async function countShares(req, res) {
    const { id } = req.params;

    try {
        const sharesInfo = await postRepository.countShares(id);

        if(sharesInfo.rows.length == 0){
            return res.status(200).send(`${sharesInfo.rows.length}`);
        } else {
            return res.status(200).send(sharesInfo.rows[0].count);
        }

    } catch (e) {
        return res.status(422).send("Unable to get shares count!")
    }
}
export async function sharePost(req, res) {
    const { userId } = res.locals;
    const  postId  = req.params.id;

    try {
        const infoPost = await postRepository.getPostInfo(postId);
        await postRepository.createRePost(userId,infoPost)

    } catch (e) {
        return res.status(422).send("Unable to share the post!")
    }
}