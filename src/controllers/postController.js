import postRepository from "../repositories/postRepository.js"

export default async function publishPost(req,res){
        const { link, message } = req.body;
        const user = 1
        try{
                await postRepository.createPost(user, link, message);
                res.sendStatus(201)
        }catch(err){
                res.send(err)
        }
}

export default async function likePost(req, res) {
    const { userId } = res.locals;
    const { postId } = req.body;

    try {
        await likesRepository.likePost(userId, postId);
        return res.status(200).send("Curtiu a publicação!");
    
    } catch (e) {
        console.log(e);
        return res.status(422).send("Não foi possível curtir a publicação!")
    }
}

export default async function deslikePost(req, res) {
    const { userId } = res.locals;
    const { postId } = req.body;

    try {
        await likesRepository.deslikePost(userId, postId);
        return res.status(200).send("Descurtiu a publicação!");
    
    } catch (e) {
        console.log(e);
        return res.status(422).send("Não foi possível descurtir a publicação!")
    }
}

export default async function countLikes(req, res) {
    const { postId } = req.body;

    try {
        const likesInfo = await likesRepository.countLikes(postId);
        return res.status(200).send(likesInfo);
    
    } catch (e) {
        console.log(e);
        return res.status(422).send("Não foi possível mostrar a quantidade de likes!")
    }
}

export default async function deletePost(req, res) {
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

export default async function editPost(req, res) {
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
