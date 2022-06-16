import { Router } from "express"

import postRouter from "./postRouter.js"
import authRouter from "./authRouter.js";
import usersRouter from "./usersRouter.js";


const router = Router();

router.use(authRouter);
router.use(postRouter);
router.use(usersRouter);

export default router;