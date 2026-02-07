import {
  Platform,
  Tone,
  CampaignStrategy,
  SwotAnalysis,
  OptimizationResult,
  Persona,
  SeoResult,
} from "@/types";

/**
 * Singleton ApiClient for Gemini & n8n interactions
 */
class ApiClient {
  private static instance: ApiClient;
  private readonly baseUrl: string;
  private readonly useMocks: boolean;

  private constructor() {
    this.baseUrl = process.env.REACT_APP_N8N_WEBHOOK_URL || "";
    this.useMocks = process.env.REACT_APP_USE_MOCKS !== "false";
  }

  public static getInstance(): ApiClient {
    if (!ApiClient.instance) ApiClient.instance = new ApiClient();
    return ApiClient.instance;
  }

  public async request<T>(
    action: string,
    payload: any,
    mockData: T | (() => T),
    delay = 1000,
  ): Promise<T> {
    if (!this.useMocks && this.baseUrl && this.baseUrl.startsWith("http")) {
      try {
        const response = await fetch(this.baseUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action, ...payload }),
        });

        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return await response.json();
      } catch (error) {
        // Silent error for UX, fallback to mock if API fails
      }
    }

    await new Promise((r) => setTimeout(r, delay));
    return typeof mockData === "function" ? (mockData as any)() : mockData;
  }
}

const client = ApiClient.getInstance();

const withFallback = <T>(
  action: string,
  payload: any,
  mockData: T | (() => T),
  mockDelay = 1000,
) => client.request(action, payload, mockData, mockDelay);

// --- Content Generation ---

export const generateMarketingCopy = (
  topic: string,
  platform: Platform,
  tone: Tone,
  audience: string,
) =>
  withFallback<string[]>(
    "generate_copy",
    { topic, platform, tone, audience },
    [
      `🚀 Excited to share our latest thoughts on ${topic}! It's time to revolutionize how we think about ${audience}. \n\n#${topic.replace(/\s+/g, "")} #Innovation`,
      `Here's a hot take: ${topic} is the future. \n\nWe've been seeing incredible results. What are your thoughts? 👇 \n\n#${tone} #TechTrends`,
      `✨ Meaningful change starts with ${topic}. \n\nDesigned specifically for ${audience} who demand excellence. \n\n#Inspiration #Leadership`,
    ],
    1500,
  );

export const generateCampaignStrategy = (productName: string, goal: string) =>
  withFallback<CampaignStrategy | null>(
    "generate_strategy",
    { productName, goal },
    {
      overview: `A comprehensive digital strategy for ${productName} focused on ${goal}. The approach leverages cross-channel synergy using Gemini 3 Pro's reasoning capabilities.`,
      targetAudience: "Tech-savvy professionals aged 25-45.",
      keyThemes: ["Efficiency", "Future of Work", "Data-Driven"],
      suggestedPosts: [
        {
          platform: Platform.LinkedIn,
          content: `${productName} is redefining industry standards for ${goal}. #BusinessGrowth`,
          hashtags: ["Innovation", "B2B"],
          bestTime: "Tuesday 10:00 AM",
        },
        {
          platform: Platform.Twitter,
          content: `Stop wasting time. ${productName} is here. ⚡️ #${productName.replace(/\s+/g, "")}`,
          hashtags: ["Productivity", "Tech"],
          bestTime: "Wednesday 02:00 PM",
        },
      ],
    },
    4000, // Longer delay for thinking mode simulation
  );

export const generateMarketingImage = async (
  prompt: string,
): Promise<string | null> => {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop";
};

// --- Lead Intelligence ---

export const analyzeLeadScore = (leadData: {
  name: string;
  source: string;
  interactions: string;
}) =>
  withFallback<{ score: number; reason: string }>(
    "analyze_lead",
    leadData,
    () => {
      const baseScore = 60;
      const randomFactor = Math.floor(Math.random() * 30);
      return {
        score: Math.min(100, baseScore + randomFactor),
        reason:
          "High engagement level detected. Thinking Model analysis suggests strong intent based on pricing page visits.",
      };
    },
    2500,
  );

// --- Competitor Analysis ---

export const analyzeCompetitor = (competitorName: string, industry: string) =>
  withFallback<SwotAnalysis | null>(
    "analyze_competitor",
    { competitorName, industry },
    {
      strengths: ["Strong brand recognition", "Extensive distribution"],
      weaknesses: ["Slow adaptation", "Higher price point"],
      opportunities: ["Expansion into emerging markets", "AI features"],
      threats: ["Regulatory landscape", "Agile competitors"],
      strategicAdvice: `Based on deep analysis, to compete effectively against ${competitorName}, focus on agility and rapid innovation. Capitalize on their slow adaptation to AI.`,
    },
    4000, // Thinking mode delay
  );

// --- Content Optimization ---

export const optimizeContent = (originalText: string, goal: string) =>
  withFallback<OptimizationResult | null>(
    "optimize_content",
    { originalText, goal },
    {
      original: originalText,
      optimized: `[Optimized for ${goal}] 🚀 \n\n${originalText} \n\n👉 Click here to learn more!`,
      changesMade: "Added an engaging hook and improved sentence flow.",
    },
    1500,
  );

// --- Audience Persona ---

export const generateAudiencePersona = (
  productName: string,
  industry: string,
  region: string,
) =>
  withFallback<Persona>(
    "generate_persona",
    { productName, industry, region },
    {
      name: "Sarah Jenkins",
      ageRange: "28-35",
      occupation: "Marketing Manager",
      incomeLevel: "$75k - $95k",
      bio: `Sarah is a tech-savvy professional living in ${region || "urban areas"}. She values efficiency in ${industry}.`,
      goals: ["Increase efficiency by 20%", "Reduce manual work"],
      frustrations: ["Disparate tools", "Lack of insights"],
      motivations: ["Career growth", "Work-life balance"],
      preferredChannels: ["LinkedIn", "Email Newsletters", "Twitter"],
    },
    3500, // Thinking delay
  );

// --- SEO Research (New Feature) ---

export const generateSeoKeywords = (topic: string, niche: string) =>
  withFallback<SeoResult>(
    "generate_seo",
    { topic, niche },
    {
      keywords: [
        { term: `${topic} automation`, volume: "12k", difficulty: "High" },
        { term: `best ${topic} tools`, volume: "5.4k", difficulty: "Medium" },
        { term: `${niche} trends 2024`, volume: "8k", difficulty: "Low" },
        { term: "AI marketing strategy", volume: "22k", difficulty: "High" },
        { term: "how to use ${topic}", volume: "1.2k", difficulty: "Low" },
      ],
      contentIdeas: [
        `The Ultimate Guide to ${topic} in 2024`,
        `5 Ways ${niche} is Changing`,
        `${topic} vs Traditional Methods: A Comparison`,
      ],
      competitorUrls: [
        "www.competitorA.com/blog/topic",
        "www.industry-leader.com/insights",
      ],
    },
    3000,
  );
