import { Router } from "express";

import {getUsers} from "../controllers/usersController.js"

const usersRouter = Router();

usersRouter.get("/users/:name", getUsers);

export default usersRouter;