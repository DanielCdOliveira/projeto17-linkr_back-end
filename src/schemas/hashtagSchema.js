
import joi from "joi"

const hashtagSchema = joi.object({
    hashtag: joi.string()
        .pattern(/^(?=.*[a-zA-Z])[0-9a-zA-Z$*&_/@#]{1,}$/)
});

export default hashtagSchema