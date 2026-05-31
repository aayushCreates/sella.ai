export interface MonthlySalesEstimate {
  unitsSold: number;
  revenue: number;
}

export interface ParsedProduct {
  asin: string;
  title: string | null;
  price: string | null;
  rating: string | null;
  reviewCount: string | null;
  bsr: string | null;
  bullets: string[];
  rawMarkdown: string;
  estimatedMonthlySales: MonthlySalesEstimate | null;
}

export function parseBestSellers(markdown: string) {
  const products = [];

  const asinRegex = /\/dp\/([A-Z0-9]{10})/g; //  Amazon standard identification NO.
  const titleRegex = /#{1,4}\s+(.+)/g;

  const asins = [
    ...new Set([...markdown.matchAll(asinRegex)].map((m) => m[1])),
  ];

  const top10 = asins.slice(0, 10);

  return top10.map((asin) => ({
    asin,
    productUrl: `https://www.amazon.com/dp/${asin}`,
    reviewsUrl: `https://www.amazon.com/product-reviews/${asin}?sortBy=recent&pageNumber=1`,
  }));
}

function extractField(text: string, patterns: any[]) {
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) return match[1] || match[0];
  }
  return null;
}

function extractBullets(markdown: any) {
  const bullets = [];
  const lines = markdown.split("\n");

  for (const line of lines) {
    const match = line.match(/^[-*•]\s+(.+)/);

    if (match && match[1].length > 20) {
      bullets.push(match[1].trim());
    }
  }

  return bullets.slice(0, 6);
}

function estimateMonthlySales(
  bsrStr: string | null,
  priceStr: string | null,
): MonthlySalesEstimate | null {
  if (!bsrStr) return null;

  const bsr = Number(bsrStr.replace(/,/g, ""));

  if (Number.isNaN(bsr)) {
    return null;
  }

  const price = parseFloat(priceStr?.replace(/[$,]/g, "") ?? "0") || 25;

  let salesPerDay = 1;

  if (bsr <= 100) salesPerDay = 300;
  else if (bsr <= 500) salesPerDay = 150;
  else if (bsr <= 1000) salesPerDay = 80;
  else if (bsr <= 5000) salesPerDay = 30;
  else if (bsr <= 10000) salesPerDay = 15;
  else if (bsr <= 50000) salesPerDay = 5;

  return {
    unitsSold: salesPerDay * 30,
    revenue: Math.round(salesPerDay * 30 * price),
  };
}

export function parseReviews(markdown: string) {
  const reviews = [];

  const sections = markdown.split(/\n---\n|\n\*\*\*\n/);

  for (const section of sections) {
    const stars = section.match(/(\d)\s+out of\s+5\s+stars/i);
    const title = section.match(/\*\*([^*]+)\*\*/);
    const body = section
      .replace(/\*\*[^*]+\*\*/g, "")
      .trim()
      .slice(0, 500);

    if (body.length > 50) {
      reviews.push({
        stars: stars ? parseInt(stars[1] as string) : null,
        title: title ? title[1] : "",
        body: body.slice(0, 300),
      });
    }
  }

  return reviews.slice(0, 20);
}

export function parseProductPage(
  markdown: string,
  asin: string,
): ParsedProduct {
  const data: ParsedProduct = {
    asin,

    title: extractField(markdown, [/^#\s+(.+)/m, /product[^\n]*\n([^\n]+)/i]),

    price: extractField(markdown, [
      /\$[\d,]+\.?\d*/,
      /price[^\n]*\$[\d,]+\.?\d*/i,
    ]),

    rating: extractField(markdown, [
      /(\d+\.?\d*)\s+out of\s+5/i,
      /(\d+\.?\d*)\s+stars/i,
    ]),

    reviewCount: extractField(markdown, [
      /([\d,]+)\s+ratings/i,
      /([\d,]+)\s+reviews/i,
      /([\d,]+)\s+customer reviews/i,
    ]),

    bsr: extractField(markdown, [
      /#([\d,]+)\s+in\s+.+Best Sellers/i,
      /Best Sellers Rank[^\n]*#([\d,]+)/i,
    ]),

    bullets: extractBullets(markdown),

    rawMarkdown: markdown.slice(0, 3000),

    estimatedMonthlySales: null,
  };

  data.estimatedMonthlySales = estimateMonthlySales(data.bsr, data.price);

  return data;
}
