import { Router } from "express";
import { getAllJournalists, getJournalist ,getArticleByJournalist} from "../controllers/journalistController.js";

const journalistRouter = Router()

journalistRouter.get("/", getAllJournalists)
journalistRouter.get("/:id", getJournalist)
journalistRouter.get("/:id/articles", getArticleByJournalist);

export default journalistRouter;