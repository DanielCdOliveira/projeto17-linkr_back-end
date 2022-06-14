import joi from "joi"

const postSchema = joi.object({
        url: joi.string().required(),
        message: joi.string()
})

export default postSchema