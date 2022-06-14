import { Router } from "express"

import postRouter from "./postRouter.js"
import authRouter from "./authRouter.js";


const router = Router()

router.use(authRouter)
router.use(postRouter)

export default router;