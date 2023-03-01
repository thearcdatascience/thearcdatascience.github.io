import express from "express";
import {
  createArticle,
  deleteArticle,
  likeUnlikeArticle,
  updateArticletDesc,
  commentOnArticle,
  deleteComment,
  getallArticles
  
} from "../controllers/article.js";
import { isAuthenticated, isResearch } from "../utils/Auth.js";

const router = express.Router();

router.post("/create", isResearch, createArticle);

router.get("/like/:id", isAuthenticated, likeUnlikeArticle);

router.put("/article/:id", isResearch, updateArticletDesc);

router.delete("/article/:id", isResearch, deleteArticle);

router.put("/comment/:id", isAuthenticated, commentOnArticle);

router.delete("/comment/:id/:commentId", isAuthenticated, deleteComment);

router.get("/articles", isAuthenticated, getallArticles)


export default router;