import { Router } from "express"
import { getRanking } from "../controllers/hashtagController.js"

const hashtagRouter = Router();

hashtagRouter.get("/ranking", getRanking);

export default hashtagRouter;
