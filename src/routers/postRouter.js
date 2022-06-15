import { Router } from "express";

import { validateSchema } from "../middlewares/schemaValidator.js"
import postSchema from "../schemas/postSchema.js"
import hashtagValidator from "../middlewares/hashtagValidator.js"
import {publishPost, likePost, deslikePost, countLikes, deletePost, editPost, getPosts } from "../controllers/postController.js";
const postRouter = Router()

postRouter.post("/publish/post", validateSchema(postSchema), hashtagValidator, publishPost);
postRouter.post("/like/post/:id", likePost);
postRouter.delete("/deslike/post/:id", deslikePost)
postRouter.get("/coutlikes/post", countLikes)
postRouter.delete("/delete/post", deletePost)
postRouter.post("/edit/post", editPost)
postRouter.get("/get/posts", getPosts)


export default postRouter;