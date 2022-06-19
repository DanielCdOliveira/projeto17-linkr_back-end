import { Router } from "express"
import { getRanking, getPostsByHashtag, deleteHashtag } from "../controllers/hashtagController.js"

const hashtagRouter = Router();

hashtagRouter.get("/hashtag", getRanking);
hashtagRouter.get("/hashtag/:hashtag", getPostsByHashtag);
hashtagRouter.delete("/delete/hashtag/:id", deleteHashtag)

export default hashtagRouter;
