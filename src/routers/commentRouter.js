import { Router } from "express";

import {postComments, getComments, countComments, getFollows } from "../controllers/commentsController.js";
import tokenValidator from "../middlewares/tokenValidation.js";
const commentRouter = Router()


commentRouter.post("/post/comments", tokenValidator, postComments);
commentRouter.get("/get/comments/:id", tokenValidator, getComments);
commentRouter.get("/countcomments/:id", countComments)
commentRouter.get("/commment/follow/:id", getFollows)

export default commentRouter;