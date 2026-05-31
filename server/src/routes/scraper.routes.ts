import { Router } from "express";
import { scraperController } from "../controllers/scraper.controller";
import { requireAuth } from "../middlewares/auth.middleware";

const scrapeRouter = Router();

scrapeRouter.post("/", requireAuth, scraperController.getScrappedProduct);

export default scrapeRouter;
