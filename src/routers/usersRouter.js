import { Router } from "express";

import { follow, getUser } from "../controllers/usersController.js"
import { validateSchema } from "../middlewares/schemaValidator.js";
import tokenValidator from "../middlewares/tokenValidation.js";
const usersRouter = Router();

usersRouter.get("/users", getUser);
usersRouter.post("/follow/:followedId", tokenValidator, follow);
export default usersRouter;