import { Router } from "express"
import { getRanking, getPostsByHashtag } from "../controllers/hashtagController.js"

const hashtagRouter = Router();

hashtagRouter.get("/hashtag", getRanking);
hashtagRouter.get("/hashtag/:hashtag", getPostsByHashtag);
hashtagRouter.delete("/delete/hashtag/:id", getPostsByHashtag);


export default hashtagRouter;
