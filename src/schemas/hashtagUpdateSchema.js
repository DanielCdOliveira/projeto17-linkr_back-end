import joi from "joi";

const hashtagUpSchema = joi.object({
    postId: joi.number()
        .required(),
    message: joi.string()
})

export default hashtagUpSchema