import { anakinClient } from "../config/scraper.config";
import {
  ScrapeOptions,
  ScrapeJobResponse,
  PollResponse,
  BatchScrapeResult,
} from "../types/scraper.types";
import { sleep } from "../utils/sleep.utils";

export const ScraperService = {
  async submitScrapeJob(url: string, options: ScrapeOptions = {}) {
    try {
      const payload = {
        url,
        useBrowser: options.useBrowser ?? true,
        generateJson: options.generateJson ?? false,
        ...(options.jsonSchema && {
          jsonSchema: options.jsonSchema,
        }),
      };

      const res = await anakinClient.post<ScrapeJobResponse>(
        "/url-scraper",
        payload,
      );

      const jobId = res.data.jobId || res.data.id;

      if (!jobId) {
        throw new Error("No jobId returned from Anakin API");
      }

      return jobId;
    } catch (err) {
      console.error("Failed to submit scrape job:", err);
      throw new Error("Failed to submit scrape job");
    }
  },

  async pollJob(jobId: string, timeoutMs = 60000): Promise<any> {
    try {
      const start = Date.now();
      const interval = 2000;

      while (Date.now() - start < timeoutMs) {
        await sleep(interval);

        const res = await anakinClient.get<PollResponse>(
          `/url-scraper/${jobId}`,
        );

        const { status, result } = res.data;

        if (["completed", "done"].includes(status)) {
          return result;
        }

        if (["failed", "error"].includes(status)) {
          throw new Error(`Job ${jobId} failed`);
        }
      }

      throw new Error("Job timed out");
    } catch (err) {
      console.error("Failed to poll job:", err);
      throw new Error("Failed to poll job");
    }
  },

  async scrapeUrl(
    urls: string | string[],
    options: ScrapeOptions = {},
    concurrency = 3,
  ): Promise<BatchScrapeResult[]> {
    try {
      const result: BatchScrapeResult[] = [];
      const urlList = Array.isArray(urls) ? urls : [urls];

      for (let i = 0; i < urlList.length; i += concurrency) {
        const batch = urlList.slice(i, i + concurrency);

        const batchResults = await Promise.allSettled(
          batch.map(async (url: string) => {
            const jobId = await this.submitScrapeJob(url, options);
            return this.pollJob(jobId, options.timeoutMs);
          }),
        );

        batchResults.forEach((res: any, idx: number) => {
          result.push({
            url: batch[idx] as string,
            success: res.status === "fulfilled",
            data: res.status === "fulfilled" ? res.value : null,
            error: res.status === "rejected" ? res.reason?.message : null,
          });
        });
      }

      return result;
    } catch (err) {
      console.error("Failed to scrape URL:", err);
      throw new Error("Failed to scrape URL");
    }
  },
};
