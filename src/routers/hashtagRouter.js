import { Router } from "express"
import { getRanking, getPostsByHashtag, deleteHashtag, updateHashtag } from "../controllers/hashtagController.js"
import tokenValidator from "../middlewares/tokenValidation.js";

const hashtagRouter = Router();

hashtagRouter.get("/hashtag", getRanking);
hashtagRouter.get("/hashtag/:hashtag", getPostsByHashtag);
hashtagRouter.delete("/delete/hashtag/:id", tokenValidator, deleteHashtag)
hashtagRouter.post("/update/hashtag", updateHashtag)


export default hashtagRouter;
