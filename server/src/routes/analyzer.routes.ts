import { Router } from "express";
import { requireAuth } from "../middlewares/auth.middleware";
import { AnalyzeController } from "../controllers/analyzer.controller.js";

const analyzerRouter = Router();

analyzerRouter.post("/analyze", requireAuth, AnalyzeController.analyzeMarket);

export default analyzerRouter;
