import { Router } from "express";

import { validateSchema } from "../middlewares/schemaValidator.js"
import postSchema from "../schemas/postSchema.js"
import hashtagValidator from "../middlewares/hashtagValidator.js"
import { publishPost } from "../controllers/postController.js"

const postRouter = Router()

postRouter.post("/publish/post", validateSchema(postSchema), hashtagValidator, publishPost);

export default postRouter;