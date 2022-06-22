import commentsRepository from "../repositories/commentsRepository.js"

export async function postComments(req, res) {
    const { userId } = res.locals;
    const { comment, postId } = req.body;

    if (comment == null) {
        return res.status(422).send("Unable to comment the post!")
    }

    try {
        await commentsRepository.postComments(comment, userId, postId);
        return res.status(200).send("Comment posted!");

    } catch (e) {
        return res.status(422).send("Unable to comment the post!")
    }
}

export async function getComments(req, res) {
    const { id } = req.params;

    try {
        const comments = await commentsRepository.getComments(id);
        return res.status(200).send(comments.rows);

    } catch (e) {
        return res.status(422).send("Unable to get the comments!")
    }
}

export async function countComments(req, res) {
    const { id } = req.params;

    try {
        const commentsInfo = await commentsRepository.countComments(id);

        if (commentsInfo.rows.length == 0) {
            return res.status(200).send(`${commentsInfo.rows.length}`);
        } else {
            return res.status(200).send(commentsInfo.rows[0].count);
        }

    } catch (e) {
        return res.status(422).send("Unable to get comments count!")
    }
}

export async function getFollows(req, res) {
    const { id } = req.params;

    try {
        const follows = await commentsRepository.getFollows(id);
        return res.status(200).send(follows.rows);

    } catch (e) {
        return res.status(422).send("Unable to get the follows!")
    }
}