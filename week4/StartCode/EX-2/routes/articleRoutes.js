
import express from 'express';
import { createNewArticle, getAllArticles, getArticle, removeArticle, updateExistingArticle } from '../controllers/articleController.js';
const router = express.Router()

router.get("/", getAllArticles)
router.get("/:id", getArticle)
router.post("/", createNewArticle)
router.put("/:id", updateExistingArticle)
router.delete("/:id", removeArticle)

export default router