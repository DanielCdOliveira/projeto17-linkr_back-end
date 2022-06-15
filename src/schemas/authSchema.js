import joi from "joi";

export const loginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(1).required(),
});
export const signupSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(1).required(),
  name: joi.string().min(1).required(),
  image: joi
    .string()
    .pattern(
      new RegExp(
        "(https?://(?:www.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|www.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|https?://(?:www.|(?!www))[a-zA-Z0-9]+.[^s]{2,}|www.[a-zA-Z0-9]+.[^s]{2,})"
      )
    )
    .required(),
});
