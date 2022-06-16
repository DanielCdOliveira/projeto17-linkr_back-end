import joi from "joi"

const postSchema = joi.object({
  link: joi.string()
    .uri()
    .required(),
  message: joi.string().allow(""),
});

export default postSchema