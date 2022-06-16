import { Router } from "express"
import { getRanking, getPostsByHashtag } from "../controllers/hashtagController.js"

const hashtagRouter = Router();

hashtagRouter.get("/hashtag", getRanking);
hashtagRouter.get("/hashtag/:hashtag", getPostsByHashtag);

export default hashtagRouter;
