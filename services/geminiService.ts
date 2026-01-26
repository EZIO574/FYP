import { Platform, Tone, CampaignStrategy, SwotAnalysis, OptimizationResult, Persona } from '../types';

// Configuration from Environment Variables
const API_URL = process.env.REACT_APP_N8N_WEBHOOK_URL || "YOUR_N8N_WEBHOOK_URL"; 
// Default to true if not specified to prevent broken app state before config
const USE_MOCKS = process.env.REACT_APP_USE_MOCKS === 'false' ? false : true;

console.log("Service Config:", { API_URL, USE_MOCKS });

// Helper to handle API calls vs Mocks
const callApi = async (action: string, data: any) => {
  if (USE_MOCKS || API_URL === "YOUR_N8N_WEBHOOK_URL") {
    console.warn(`[Mock Mode] Action: ${action}. Configure REACT_APP_N8N_WEBHOOK_URL in .env to use n8n.`);
    return null; // Signals to use fallback mock data
  }

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action, ...data }),
    });
    
    if (!response.ok) throw new Error('API Call Failed');
    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    return null; // Fallback to mocks on error
  }
};

// --- Content Generation ---
export const generateMarketingCopy = async (
  topic: string,
  platform: Platform,
  tone: Tone,
  audience: string
): Promise<string[]> => {
  const result = await callApi('generate_copy', { topic, platform, tone, audience });
  if (result) return result;

  // Mock Fallback
  await new Promise(resolve => setTimeout(resolve, 1500));
  return [
    `🚀 Excited to share our latest thoughts on ${topic}! It's time to revolutionize how we think about ${audience}. \n\n#${topic.replace(/\s+/g, '')} #Innovation #Growth`,
    `Here's a hot take: ${topic} is the future. \n\nWe've been seeing incredible results. What are your thoughts? 👇 \n\n#${tone} #TechTrends #Future`,
    `✨ meaningful change starts with ${topic}. \n\nDesigned specifically for ${audience} who demand excellence. \n\n#Inspiration #Leadership #${topic.replace(/\s+/g, '')}`
  ];
};

export const generateCampaignStrategy = async (
  productName: string,
  goal: string
): Promise<CampaignStrategy | null> => {
  const result = await callApi('generate_strategy', { productName, goal });
  if (result) return result;

  // Mock Fallback
  await new Promise(resolve => setTimeout(resolve, 2000));
  return {
    overview: `A comprehensive digital strategy for ${productName} focused on ${goal}. The approach leverages cross-channel synergy to maximize reach and engagement while maintaining a cohesive brand voice.`,
    targetAudience: "Tech-savvy professionals aged 25-45, interested in productivity and automation tools.",
    keyThemes: ["Efficiency & Automation", "Future of Work", "Data-Driven Decisions"],
    suggestedPosts: [
      {
        platform: Platform.LinkedIn,
        content: `${productName} is redefining industry standards. We are helping businesses achieve ${goal} with unprecedented ease. #BusinessGrowth`,
        hashtags: ["Innovation", "B2B", "Growth"],
        bestTime: "Tuesday 10:00 AM"
      },
      {
        platform: Platform.Twitter,
        content: `Stop wasting time on manual tasks. ${productName} is here to solve it. ⚡️ #${productName.replace(/\s+/g, '')}`,
        hashtags: ["Productivity", "Tech"],
        bestTime: "Wednesday 02:00 PM"
      },
      {
        platform: Platform.Instagram,
        content: `Behind the scenes at ${productName}. Building the future, one feature at a time. 🛠️`,
        hashtags: ["BehindTheScenes", "StartupLife"],
        bestTime: "Friday 12:00 PM"
      }
    ]
  };
};

export const generateMarketingImage = async (prompt: string): Promise<string | null> => {
  await new Promise(resolve => setTimeout(resolve, 3000));
  // Return a high-quality placeholder image (Image gen usually requires specific APIs not easily done in simple JSON flow without keys)
  return "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop";
};

// --- Lead Intelligence ---
export const analyzeLeadScore = async (leadData: {name: string, source: string, interactions: string}): Promise<{score: number, reason: string}> => {
  const result = await callApi('analyze_lead', leadData);
  if (result) return result;

  // Mock Fallback
  await new Promise(resolve => setTimeout(resolve, 1000));
  const baseScore = 60;
  const randomFactor = Math.floor(Math.random() * 30);
  const score = Math.min(100, baseScore + randomFactor);
  return {
    score: score,
    reason: "High engagement level detected across multiple touchpoints indicating strong purchase intent."
  };
};

// --- Competitor Analysis ---
export const analyzeCompetitor = async (competitorName: string, industry: string): Promise<SwotAnalysis | null> => {
  const result = await callApi('analyze_competitor', { competitorName, industry });
  if (result) return result;

  // Mock Fallback
  await new Promise(resolve => setTimeout(resolve, 2500));
  return {
    strengths: [
      "Strong brand recognition in the " + industry + " sector",
      "Extensive distribution network",
      "High customer loyalty and retention rates"
    ],
    weaknesses: [
      "Slow adaptation to new digital trends",
      "Higher price point compared to market average",
      "Legacy technology infrastructure"
    ],
    opportunities: [
      "Expansion into emerging markets",
      "Development of AI-driven product features",
      "Strategic partnerships with tech startups"
    ],
    threats: [
      "Rapidly evolving regulatory landscape",
      "New agile competitors entering the market",
      "Economic downturn affecting consumer spending"
    ],
    strategicAdvice: `To compete effectively against ${competitorName}, focus on agility and rapid innovation. Leverage their slow adaptation to offer more modern, user-centric solutions at a competitive price point. Highlight your superior customer support and flexible integration capabilities.`
  };
};

// --- Content Optimization ---
export const optimizeContent = async (originalText: string, goal: string): Promise<OptimizationResult | null> => {
  const result = await callApi('optimize_content', { originalText, goal });
  if (result) return result;

  // Mock Fallback
  await new Promise(resolve => setTimeout(resolve, 1500));
  return {
    original: originalText,
    optimized: `[Optimized for ${goal}] 🚀 \n\n${originalText} \n\n👉 Click here to learn more!`,
    changesMade: "Added an engaging hook, improved sentence flow for better readability, and included a clear call-to-action to drive conversion."
  };
};

// --- Audience Persona ---
export const generateAudiencePersona = async (
  productName: string,
  industry: string,
  region: string
): Promise<Persona> => {
  const result = await callApi('generate_persona', { productName, industry, region });
  if (result) return result;

  // Mock Fallback
  await new Promise(resolve => setTimeout(resolve, 2000));
  return {
    name: "Sarah Jenkins",
    ageRange: "28-35",
    occupation: "Marketing Manager",
    incomeLevel: "$75k - $95k",
    bio: `Sarah is a tech-savvy professional living in ${region === "Global" || !region ? "a metropolitan area" : region}. She values efficiency and is always looking for tools related to ${industry} to automate her workflow. She is ambitious but often feels overwhelmed by the amount of data she needs to process daily.`,
    goals: [
      "Increase efficiency by 20%",
      "Reduce manual work time",
      "Scale efforts without hiring more staff"
    ],
    frustrations: [
      "Disparate tools that don't integrate",
      "Lack of actionable insights",
      "Time-consuming manual processes"
    ],
    motivations: [
      "Career growth and recognition",
      "Work-life balance through automation",
      "Being seen as an innovator"
    ],
    preferredChannels: [
      "LinkedIn",
      "Email Newsletters",
      "Industry Podcasts",
      "Twitter/X"
    ]
  };
};