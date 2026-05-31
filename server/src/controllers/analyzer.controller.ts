import { NextFunction, Request, Response } from "express";
import { AnalysisService } from "../services/analyzer.service.js";

export const AnalyzeController = {
  async analyzeMarket(req: Request, res: Response, next: NextFunction) {
    try {
      const { url } = req.body;

      if (!url || !url.includes("amazon.com")) {
        return res.status(400).json({
          error: "Please provide a valid Amazon URL",
        });
      }

      const report = await AnalysisService.analyzedReport(url);

      return res.json(report);
    } catch (error: any) {
      return res.status(500).json({
        error: "Analysis failed",
        details: error.message,
      });
    }
  },
};
