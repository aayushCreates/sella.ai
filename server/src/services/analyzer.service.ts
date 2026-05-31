import { getAiAnalyzedMarketData } from "../utils/aiAnalyzer.utils";
import { extractCategory } from "../utils/category.utils";
import {
  parseBestSellers,
  parseProductPage,
  parseReviews,
  ParsedProduct,
} from "../utils/parsing.utils";
import { ScraperService } from "./scraper.service";

export const AnalysisService = {
  async analyzedReport(url: string) {
    console.log("📦 Step 1: Scraping Best Sellers page...");

    const bsPages = await ScraperService.scrapeUrl(url, {
      useBrowser: true,
    });
    const bsPage = bsPages[0];

    const products = parseBestSellers(
      bsPage?.data?.markdown || bsPage?.data?.content || "",
    );
    if (!products.length) {
      throw new Error("Could not find any products for this page");
    }

    const category = extractCategory(url, bsPage?.data?.markdown);
    console.log(`✅ Found ${products.length} products in "${category}"`);

    console.log("📦 Step 2: Scraping product pages...");
    const productUrls = products.map((p) => p.productUrl);
    const productResults = await ScraperService.scrapeUrl(
      productUrls,
      { useBrowser: true },
      3,
    );

    const productData = productResults.map((r, i) => {
      if (!r.success) {
        console.warn(`⚠️  Failed to scrape ${products[i]?.asin}: ${r.error}`);
        return {
          asin: products[i]?.asin as string,
          title: null,
          price: null,
          rating: null,
          reviewCount: null,
          bsr: null,
          bullets: [],
          rawMarkdown: "",
          estimatedMonthlySales: null,
        } as ParsedProduct;
      }
      const content = r.data?.markdown || r.data?.content || "";
      return parseProductPage(content, products[i]?.asin as string);
    });

    console.log("📦 Step 3: Scraping reviews...");
    const reviewUrls = products.map((p) => p.reviewsUrl);
    const reviewResults = await ScraperService.scrapeUrl(
      reviewUrls,
      { useBrowser: true },
      3,
    );

    const allReviews: any[] = [];
    reviewResults.forEach((r, i) => {
      if (r.success) {
        const content = r.data?.markdown || r.data?.content || "";
        const reviews = parseReviews(content);
        allReviews.push(...reviews);
        (productData[i] as any).reviews = reviews;
      }
    });

    console.log(
      `✅ Collected ${allReviews.length} reviews across ${products.length} products`,
    );

    console.log("🧠 Step 4: Running Claude market analysis...");
    const analysis = await getAiAnalyzedMarketData(
      productData,
      allReviews,
      category,
    );

    const report = {
      meta: {
        url,
        category,
        productsAnalyzed: productData.length,
        reviewsAnalyzed: allReviews.length,
        generatedAt: new Date().toISOString(),
      },
      products: productData.map((p) => ({
        asin: p.asin,
        title: p.title,
        price: p.price,
        rating: p.rating,
        reviewCount: p.reviewCount,
        bsr: p.bsr,
        estimatedMonthlySales: p.estimatedMonthlySales,
        bullets: p.bullets,
      })),
      analysis,
    };

    console.log("✅ Report ready!");
    return report;
  },
};
