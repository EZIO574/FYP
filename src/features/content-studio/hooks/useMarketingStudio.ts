import { useState } from "react";
import {
  Platform,
  Tone,
  CampaignStrategy,
  OptimizationResult,
  SeoResult,
} from "@/types";
import {
  generateMarketingCopy,
  generateMarketingImage,
  generateCampaignStrategy,
  optimizeContent,
  generateSeoKeywords,
} from "@/services/geminiService";

export type ContentTab = "quick" | "campaign" | "optimize" | "seo";

export const useMarketingStudio = () => {
  const [activeTab, setActiveTab] = useState<ContentTab>("quick");

  // Quick Post State
  const [topic, setTopic] = useState("");
  const [audience, setAudience] = useState("");
  const [platform, setPlatform] = useState<Platform>(Platform.Twitter);
  const [tone, setTone] = useState<Tone>(Tone.Professional);
  const [generatedPosts, setGeneratedPosts] = useState<string[]>([]);

  // Campaign State
  const [productName, setProductName] = useState("");
  const [campaignGoal, setCampaignGoal] = useState("");
  const [strategy, setStrategy] = useState<CampaignStrategy | null>(null);

  // Optimizer State
  const [contentToOptimize, setContentToOptimize] = useState("");
  const [optimizationGoal, setOptimizationGoal] = useState(
    "Make it more engaging and viral",
  );
  const [optimizationResult, setOptimizationResult] =
    useState<OptimizationResult | null>(null);

  // SEO State
  const [seoTopic, setSeoTopic] = useState("");
  const [seoNiche, setSeoNiche] = useState("");
  const [seoResult, setSeoResult] = useState<SeoResult | null>(null);

  // Shared State
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleGeneratePost = async () => {
    if (!topic || !audience) return;
    setIsGenerating(true);
    setGeneratedPosts([]);
    setGeneratedImage(null);
    try {
      const posts = await generateMarketingCopy(
        topic,
        platform,
        tone,
        audience,
      );
      setGeneratedPosts(posts);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerateStrategy = async () => {
    if (!productName || !campaignGoal) return;
    setIsGenerating(true);
    setStrategy(null);
    setGeneratedImage(null);
    try {
      const result = await generateCampaignStrategy(productName, campaignGoal);
      setStrategy(result);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleOptimizeContent = async () => {
    if (!contentToOptimize) return;
    setIsGenerating(true);
    setOptimizationResult(null);
    try {
      const result = await optimizeContent(contentToOptimize, optimizationGoal);
      setOptimizationResult(result);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSeoResearch = async () => {
    if (!seoTopic || !seoNiche) return;
    setIsGenerating(true);
    setSeoResult(null);
    try {
      const result = await generateSeoKeywords(seoTopic, seoNiche);
      setSeoResult(result);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerateImage = async (promptText: string) => {
    setIsGeneratingImage(true);
    try {
      const imagePrompt = `Professional, minimalist advertising photography for: ${promptText}. High resolution, studio lighting.`;
      const imageBase64 = await generateMarketingImage(imagePrompt);
      setGeneratedImage(imageBase64);
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const isThinkingMode = activeTab === "campaign" || activeTab === "seo";

  return {
    state: {
      activeTab,
      topic,
      audience,
      platform,
      tone,
      generatedPosts,
      productName,
      campaignGoal,
      strategy,
      contentToOptimize,
      optimizationGoal,
      optimizationResult,
      seoTopic,
      seoNiche,
      seoResult,
      generatedImage,
      isGenerating,
      isGeneratingImage,
      copiedIndex,
      isThinkingMode,
    },
    actions: {
      setActiveTab,
      setTopic,
      setAudience,
      setPlatform,
      setTone,
      setProductName,
      setCampaignGoal,
      setContentToOptimize,
      setOptimizationGoal,
      setSeoTopic,
      setSeoNiche,
      handleGeneratePost,
      handleGenerateStrategy,
      handleOptimizeContent,
      handleSeoResearch,
      handleGenerateImage,
      copyToClipboard,
    },
  };
};
