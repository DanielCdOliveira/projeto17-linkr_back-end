import { Router } from "express";

import {validateSchema} from "../middlewares/schemaValidator.js"
import postSchema from "../schemas/postSchema.js"
import publishPost from "../controllers/postController";

const postRouter = Router()

postRouter.post("/publish/post", validateSchema(postSchema), publishPost);

export default postRouter;