import { NextFunction, Request, Response } from "express";
import { ScraperService } from "../services/scraper.service";

export const scraperController = {
  async getScrappedProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { url } = req.body as { url: string | string[] };
      if (!url) {
        return res.status(400).json({
          success: false,
          message: "URL is required",
        });
      }

      const data = await ScraperService.scrapeUrl(url);

      return res.json({
        success: true,
        data,
      });
    } catch (error) {
      next(error);
    }
  },
};
