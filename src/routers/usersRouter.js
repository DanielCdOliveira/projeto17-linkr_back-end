import { Router } from "express";

import { getUser } from "../controllers/usersController.js"

const usersRouter = Router();

usersRouter.get("/users", getUser);

export default usersRouter;