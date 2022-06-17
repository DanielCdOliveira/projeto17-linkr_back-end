import { Router } from "express";

import { validateSchema } from "../middlewares/schemaValidator.js"
import postSchema from "../schemas/postSchema.js"
import hashtagValidator from "../middlewares/hashtagValidator.js"
import {publishPost, likePost, deslikePost, countLikes, deletePost, editPost, getPosts, getLikes } from "../controllers/postController.js";
import tokenValidator from "../middlewares/tokenValidation.js";
const postRouter = Router()


postRouter.post("/publish/post", tokenValidator, validateSchema(postSchema), hashtagValidator, publishPost);
postRouter.post("/like/post/:id", tokenValidator, likePost);
postRouter.delete("/deslike/post/:id",tokenValidator, deslikePost)
postRouter.get("/get/likes", getLikes)
postRouter.get("/coutlikes/post/:id", countLikes)
postRouter.delete("/delete/post/:id",tokenValidator, deletePost)
postRouter.post("/edit/post",tokenValidator, editPost)
postRouter.get("/get/posts", getPosts)



export default postRouter;