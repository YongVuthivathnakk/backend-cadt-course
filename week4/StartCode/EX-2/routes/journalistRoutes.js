import express from "express"
import { createNewJournalist, getAllJournalists, getJournalist, getJournalistArticles, removeJournalist, updateExistingJournalist } from "../controllers/journalistController.js"

const router = express.Router()


router.get("/", getAllJournalists)
router.get("/:id", getJournalist)
router.post("/", createNewJournalist)
router.put("/:id", updateExistingJournalist)
router.delete("/:id", removeJournalist)
router.get("/:id/articles", getJournalistArticles)

export default router