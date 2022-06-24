import { Router } from "express";

import {
  follow,
  getUser,
  getUserFollowed,
  unfollow,
} from "../controllers/usersController.js";
import tokenValidator from "../middlewares/tokenValidation.js";
const usersRouter = Router();

usersRouter.get("/users",tokenValidator, getUser);
usersRouter.post("/follow/:followedId", tokenValidator, follow);
usersRouter.delete("/unfollow/:followedId",tokenValidator, unfollow)
usersRouter.get("/users/follow", tokenValidator, getUserFollowed)

export default usersRouter;