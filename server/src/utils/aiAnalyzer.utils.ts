import { claudeClient } from "../config/claude.config";
import { geminiClient } from "../config/gemini.config";

function buildPrompt(products: any, allReviews: any, category: any) {
  const productSummaries = products
    .map((p: any, i: number) =>
      `Product ${i + 1}: ${p.title || "Unknown"}
- ASIN: ${p.asin}
- Price: ${p.price || "N/A"}
- Rating: ${p.rating || "N/A"} stars
- Reviews: ${p.reviewCount || "N/A"}
- BSR: #${p.bsr || "N/A"}
- Est. Monthly Revenue: $${p.estimatedMonthlySales?.revenue || "N/A"}
- Key Features: ${p.bullets?.slice(0, 3).join(" | ") || "N/A"}
  `.trim(),
    )
    .join("\n\n");

  const reviewSample = allReviews
    .slice(0, 60)
    .map((r: any) => `[${r.stars}★] ${r.title}: ${r.body}`)
    .join("\n");

  return `Analyze this Amazon market data for category: "${category}"
 
== PRODUCTS ==
${productSummaries}
 
== CUSTOMER REVIEWS (sample) ==
${reviewSample}
 
Return a JSON object with EXACTLY this structure:
{
  "marketOverview": {
    "totalMonthlyRevenue": number,
    "avgPrice": number,
    "avgRating": number,
    "competitionLevel": "Low | Medium | High | Very High",
    "marketMaturity": "Emerging | Growing | Mature | Saturated",
    "opportunityScore": number (1-10),
    "summary": "2-3 sentence market summary"
  },
  "topCompetitors": [
    {
      "rank": number,
      "asin": "string",
      "title": "string",
      "price": number,
      "rating": number,
      "estimatedMonthlyRevenue": number,
      "strengths": ["string"],
      "weaknesses": ["string"]
    }
  ],
  "customerInsights": {
    "topPurchaseCriteria": [
      { "criterion": "string", "importance": "High | Medium | Low", "insight": "string" }
    ],
    "painPoints": ["string"],
    "delightFactors": ["string"],
    "commonComplaints": ["string"]
  },
  "marketGaps": [
    {
      "gap": "string",
      "opportunity": "string",
      "difficulty": "Easy | Medium | Hard"
    }
  ],
  "hookPatterns": [
    {
      "pattern": "string",
      "example": "string",
      "whyItWorks": "string"
    }
  ],
  "entryRecommendation": {
    "shouldEnter": boolean,
    "reasoning": "string",
    "suggestedPriceRange": "string",
    "keyDifferentiators": ["string"],
    "estimatedTimeToProfit": "string"
  }
}
`.trim();
}

export async function getAiAnalyzedMarketData(
  products: any,
  allReviews: any,
  category: any,
) {
  try {
    const prompt = buildPrompt(products, allReviews, category);

    const res = await claudeClient.messages.create({
      model: "claude-sonnet-4-0",
      max_tokens: 4000,
      messages: [{ role: "user", content: prompt }],
      system:
        "You are a world-class Amazon market analyst. Analyze product and review data and return ONLY valid JSON — no markdown, no preamble, no backticks. Return exactly the JSON structure requested.",
    });

    const raw = res.content
      .filter((c) => c.type === "text")
      .map((c) => c.text)
      .join("");
    const clean = raw.replace(/^```json\n?|```$/g, "").trim();

    return JSON.parse(clean);
  } catch (err) {
    console.log("Claude failed, falling back to Gemini:", err);
    return await getMarketAnalyzerFallbackData(products, allReviews, category);
  }
}

export async function getMarketAnalyzerFallbackData(
  products: any,
  allReviews: any,
  category: any,
) {
  try {
    const prompt = buildPrompt(products, allReviews, category);

    const res = await geminiClient.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction:
          "You are a world-class Amazon market analyst. Analyze product and review data and return ONLY valid JSON — no markdown, no preamble, no backticks. Return exactly the JSON structure requested.",
      },
    });

    const raw = res.text || "";
    const clean = raw.replace(/^```json\n?|```$/g, "").trim();

    return JSON.parse(clean);
  } catch (err) {
    console.log(err);
  }
}
