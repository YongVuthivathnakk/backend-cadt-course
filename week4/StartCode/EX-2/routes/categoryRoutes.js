import express from "express"
import { createNewCategory, getAllCategories, getCategory, getCategoryArticles, removeCategory, updateExistingCategory } from "../controllers/categoryController.js";

const router = express.Router();

router.get("/",  getAllCategories)
router.get("/:id",  getCategory)
router.post("/", createNewCategory)
router.put("/:id", updateExistingCategory)
router.delete("/:id", removeCategory)
router.get("/:id/articles", getCategoryArticles)

export default router