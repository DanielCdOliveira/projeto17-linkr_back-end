import { Router } from "express"

import postRouter from "./postRouter.js"
import authRouter from "./authRouter.js";
import usersRouter from "./usersRouter.js";
import hashtagRouter from "./hashtagRouter.js"
import commentRouter from "./commentRouter.js";

const router = Router();

router.use(authRouter);
router.use(postRouter);
router.use(usersRouter);
router.use(hashtagRouter);
router.use(commentRouter)

export default router;