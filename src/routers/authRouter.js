import { Router } from "express";

import { signIn, signUp } from "../controllers/authController.js";
import {validateSchema} from "../middlewares/schemaValidator.js"
import { signupSchema, loginSchema } from "../schemas/authSchema.js";


const authRouter = Router();

authRouter.post("/signup",validateSchema(signupSchema),  signUp);
authRouter.post("/signin",validateSchema(loginSchema), signIn);

export default authRouter;
