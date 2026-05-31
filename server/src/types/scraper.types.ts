export interface ScrapeOptions {
  useBrowser?: boolean;
  generateJson?: boolean;
  jsonSchema?: Record<string, any>;
  timeoutMs?: number;
}

export interface ScrapeJobResponse {
  jobId?: string;
  id?: string;
}

export interface PollResponse {
  status: string;
  result?: any;
}

export interface BatchScrapeResult {
  url: string;
  success: boolean;
  data: any | null;
  error: string | null;
}
