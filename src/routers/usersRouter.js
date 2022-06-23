import { Router } from "express";

import {
  follow,
  getUser,
  unfollow,
} from "../controllers/usersController.js";
import { validateSchema } from "../middlewares/schemaValidator.js";
import tokenValidator from "../middlewares/tokenValidation.js";
const usersRouter = Router();

usersRouter.get("/users",tokenValidator, getUser);
usersRouter.post("/follow/:followedId", tokenValidator, follow);
usersRouter.delete("/unfollow/:followedId",tokenValidator, unfollow)
export default usersRouter;