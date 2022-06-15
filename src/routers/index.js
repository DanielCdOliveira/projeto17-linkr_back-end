import { Router } from "express"

import postRouter from "./postRouter.js"
import authRouter from "./authRouter.js"
import hashtagRouter from "./hashtagRouter.js"

const router = Router()

router.use(authRouter)
router.use(postRouter)
router.use(hashtagRouter)

export default router;