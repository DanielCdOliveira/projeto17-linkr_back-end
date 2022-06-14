import joi from "joi"

const postSchema = joi.object({
  link: joi.string().regex(/^((http)|(https)|(ftp)):\/\/([\- \w]+\.)+\w{2,3}(\/ [%\-\w]+(\.\w{2,})?)*$/).required(),
  message: joi.string().allow(""),
});

export default postSchema