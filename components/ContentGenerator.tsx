import React, { useState } from "react";
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
import {
  Sparkles,
  Copy,
  Image as ImageIcon,
  Lightbulb,
  Target,
  Wand2,
  Zap,
  Search,
  BrainCircuit,
  BarChart2,
  Check,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/common/Button";
import { Input } from "@/components/common/Input";
import { Select } from "@/components/common/Select";

export const ContentGenerator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "quick" | "campaign" | "optimize" | "seo"
  >("quick");

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
    const posts = await generateMarketingCopy(topic, platform, tone, audience);
    setGeneratedPosts(posts);
    setIsGenerating(false);
  };

  const handleGenerateStrategy = async () => {
    if (!productName || !campaignGoal) return;
    setIsGenerating(true);
    setStrategy(null);
    setGeneratedImage(null);
    const result = await generateCampaignStrategy(productName, campaignGoal);
    setStrategy(result);
    setIsGenerating(false);
  };

  const handleOptimizeContent = async () => {
    if (!contentToOptimize) return;
    setIsGenerating(true);
    setOptimizationResult(null);
    const result = await optimizeContent(contentToOptimize, optimizationGoal);
    setOptimizationResult(result);
    setIsGenerating(false);
  };

  const handleSeoResearch = async () => {
    if (!seoTopic || !seoNiche) return;
    setIsGenerating(true);
    setSeoResult(null);
    const result = await generateSeoKeywords(seoTopic, seoNiche);
    setSeoResult(result);
    setIsGenerating(false);
  };

  const handleGenerateImage = async (promptText: string) => {
    setIsGeneratingImage(true);
    const imagePrompt = `Professional, minimalist advertising photography for: ${promptText}. High resolution, studio lighting.`;
    const imageBase64 = await generateMarketingImage(imagePrompt);
    setGeneratedImage(imageBase64);
    setIsGeneratingImage(false);
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const isThinkingMode = activeTab === "campaign" || activeTab === "seo";

  return (
    <div className="flex flex-col animate-fade-in pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 pb-6 border-b border-slate-200 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Marketing Content Studio
          </h2>
          <div className="flex items-center gap-3 mt-1">
            <p className="text-slate-500 text-sm">
              AI-powered content generation and strategy
            </p>
            {isThinkingMode && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-bold uppercase tracking-wider border border-blue-100">
                <BrainCircuit size={12} /> Advanced AI Active
              </span>
            )}
          </div>
        </div>
        <div className="bg-slate-100 p-1 rounded-xl flex gap-1">
          {[
            { id: "quick", label: "Quick Post", icon: <Wand2 size={14} /> },
            { id: "campaign", label: "Strategy", icon: <Target size={14} /> },
            { id: "seo", label: "SEO", icon: <Search size={14} /> },
            { id: "optimize", label: "Optimizer", icon: <Zap size={14} /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === tab.id
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Configuration Card */}
        <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-slate-900">
              {activeTab === "quick"
                ? "Content Configuration"
                : activeTab === "campaign"
                  ? "Strategic Inputs"
                  : activeTab === "seo"
                    ? "Target Research"
                    : "Content Refinement"}
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              {activeTab === "quick"
                ? "Define your topic and audience parameters."
                : activeTab === "campaign"
                  ? "Provide brand and goal details for your strategy."
                  : activeTab === "seo"
                    ? "Identify key areas for search optimization."
                    : "Paste content to analyze and improve."}
            </p>
          </div>

          <div className="space-y-4">
            {activeTab === "quick" && (
              <>
                <Input
                  label="Campaign Topic"
                  multiline
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g. Benefits of sustainable home heating"
                  className="h-28 !bg-white !border-slate-300"
                />
                <Input
                  label="Target Audience"
                  value={audience}
                  onChange={(e) => setAudience(e.target.value)}
                  placeholder="e.g. Environmentally conscious homeowners"
                  className="!bg-white !border-slate-300"
                />
                <div className="grid grid-cols-2 gap-4">
                  <Select
                    label="Target Platform"
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value as Platform)}
                    options={Object.values(Platform).map((p) => ({
                      label: p,
                      value: p,
                    }))}
                    className="!bg-white !border-slate-300"
                  />
                  <Select
                    label="Desired Tone"
                    value={tone}
                    onChange={(e) => setTone(e.target.value as Tone)}
                    options={Object.values(Tone).map((t) => ({
                      label: t,
                      value: t,
                    }))}
                    className="!bg-white !border-slate-300"
                  />
                </div>
              </>
            )}

            {activeTab === "campaign" && (
              <>
                <Input
                  label="Product / Brand Name"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="e.g. EcoSmart Pro"
                  className="!bg-white !border-slate-300"
                />
                <Input
                  label="Primary Objectives"
                  multiline
                  value={campaignGoal}
                  onChange={(e) => setCampaignGoal(e.target.value)}
                  placeholder="What are your main goals for this campaign?"
                  className="h-32 !bg-white !border-slate-300"
                />
              </>
            )}

            {activeTab === "seo" && (
              <>
                <Input
                  label="Core Topic"
                  value={seoTopic}
                  onChange={(e) => setSeoTopic(e.target.value)}
                  placeholder="e.g. Renewable energy storage"
                  className="!bg-white !border-slate-300"
                />
                <Input
                  label="Market Niche"
                  value={seoNiche}
                  onChange={(e) => setSeoNiche(e.target.value)}
                  placeholder="e.g. Residential Solar Power"
                  className="!bg-white !border-slate-300"
                />
                <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg flex items-start gap-3">
                  <Lightbulb size={20} className="text-blue-600 shrink-0" />
                  <p className="text-xs text-blue-700 leading-relaxed">
                    Gemini AI will analyze search intent and keyword
                    competitiveness to suggest high-impact opportunities.
                  </p>
                </div>
              </>
            )}

            {activeTab === "optimize" && (
              <>
                <Input
                  label="Draft Content"
                  multiline
                  value={contentToOptimize}
                  onChange={(e) => setContentToOptimize(e.target.value)}
                  placeholder="Paste the text you want to optimize..."
                  className="h-40 !bg-white !border-slate-300"
                />
                <Select
                  label="Desired Outcome"
                  value={optimizationGoal}
                  onChange={(e) => setOptimizationGoal(e.target.value)}
                  options={[
                    {
                      label: "Increase engagement & virality",
                      value: "Make it more engaging and viral",
                    },
                    {
                      label: "Professionalize tone & fix grammar",
                      value: "Fix grammar and professionalize tone",
                    },
                    {
                      label: "Concise & high impact",
                      value: "Shorten and make punchy",
                    },
                    {
                      label: "Add depth & technical detail",
                      value: "Expand and add detail",
                    },
                    {
                      label: "Optimize for search keywords",
                      value: "Optimize for SEO keywords",
                    },
                  ]}
                  className="!bg-white !border-slate-300"
                />
              </>
            )}

            <Button
              onClick={
                activeTab === "quick"
                  ? handleGeneratePost
                  : activeTab === "campaign"
                    ? handleGenerateStrategy
                    : activeTab === "seo"
                      ? handleSeoResearch
                      : handleOptimizeContent
              }
              disabled={
                isGenerating ||
                (activeTab === "quick"
                  ? !topic || !audience
                  : activeTab === "campaign"
                    ? !productName || !campaignGoal
                    : activeTab === "seo"
                      ? !seoTopic || !seoNiche
                      : !contentToOptimize)
              }
              isLoading={isGenerating}
              icon={
                isThinkingMode ? (
                  <BrainCircuit size={20} />
                ) : (
                  <Wand2 size={20} />
                )
              }
              fullWidth
              className="mt-6 !bg-blue-600 hover:!bg-blue-700 text-white font-bold h-12"
            >
              {isGenerating
                ? "Processing..."
                : activeTab === "quick"
                  ? "Generate Marketing Copy"
                  : activeTab === "campaign"
                    ? "Generate Strategy"
                    : activeTab === "seo"
                      ? "Run SEO Analysis"
                      : "Optimize My Content"}
            </Button>
          </div>
        </div>

        {/* Results Card */}
        <div className="space-y-6">
          {!isGenerating &&
            !generatedPosts.length &&
            !strategy &&
            !optimizationResult &&
            !seoResult && (
              <div className="bg-slate-50 border border-slate-200 border-dashed rounded-xl p-12 text-center">
                <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center border border-slate-200 shadow-sm mb-4">
                  <Sparkles size={24} className="text-slate-300" />
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  AI Results Terminal
                </h3>
                <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                  Once generated, your copy, strategies, or research will appear
                  here for review.
                </p>
              </div>
            )}

          {isGenerating && (
            <div className="space-y-4 animate-pulse">
              <div className="h-40 bg-slate-100 rounded-xl border border-slate-200"></div>
              <div className="h-40 bg-slate-100 rounded-xl border border-slate-200"></div>
            </div>
          )}

          {/* Quick Post Results */}
          {activeTab === "quick" &&
            generatedPosts.map((post, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden hover:border-blue-300 transition-colors group"
              >
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded uppercase tracking-wider">
                      {platform}
                    </span>
                    <button
                      onClick={() => copyToClipboard(post, idx)}
                      className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                      title="Copy to clipboard"
                    >
                      {copiedIndex === idx ? (
                        <Check size={18} />
                      ) : (
                        <Copy size={18} />
                      )}
                    </button>
                  </div>
                  <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-wrap">
                    {post}
                  </p>
                </div>
                <div className="bg-slate-50 px-6 py-3 border-t border-slate-100 flex justify-end">
                  <button
                    onClick={() => handleGenerateImage(post)}
                    className="text-xs font-bold text-slate-600 hover:text-blue-700 flex items-center gap-2 transition-colors"
                  >
                    <ImageIcon size={14} /> Generate Ad Visual
                  </button>
                </div>
              </div>
            ))}

          {/* Campaign Strategy Results */}
          {activeTab === "campaign" && strategy && (
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 animate-fade-in">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-blue-100 p-2.5 rounded-lg text-blue-600">
                  <Target size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Campaign Strategy
                  </h3>
                  <p className="text-xs text-slate-500">
                    Drafted by Advanced AI
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                    Executive Summary
                  </h4>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {strategy.overview}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                    <h4 className="text-[10px] font-bold text-blue-600 uppercase mb-2">
                      Target Profile
                    </h4>
                    <p className="text-xs text-slate-600">
                      {strategy.targetAudience}
                    </p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                    <h4 className="text-[10px] font-bold text-blue-600 uppercase mb-2">
                      Key Value Pillars
                    </h4>
                    <ul className="text-xs text-slate-600 space-y-1">
                      {strategy.keyThemes.map((t, i) => (
                        <li key={i} className="flex gap-2">
                          <span className="text-blue-400">•</span> {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 space-y-4">
                  <h4 className="text-xs font-bold text-slate-900 flex items-center gap-2">
                    <Lightbulb size={16} className="text-amber-500" />
                    Recommended Content Plan
                  </h4>
                  {strategy.suggestedPosts.map((post, i) => (
                    <div
                      key={i}
                      className="bg-slate-50 border border-slate-200 rounded-lg p-4 group"
                    >
                      <div className="flex justify-between mb-2">
                        <span className="text-[9px] font-bold bg-white text-slate-600 px-2 py-0.5 rounded border border-slate-200 uppercase">
                          {post.platform}
                        </span>
                        <span className="text-[9px] text-slate-400 font-semibold">
                          {post.bestTime}
                        </span>
                      </div>
                      <p className="text-xs text-slate-700 mb-3">
                        {post.content}
                      </p>
                      <div className="flex justify-between items-center">
                        <div className="flex gap-1.5">
                          {post.hashtags.map((h, i) => (
                            <span
                              key={i}
                              className="text-[9px] text-blue-600 font-bold"
                            >
                              #{h}
                            </span>
                          ))}
                        </div>
                        <button
                          onClick={() => copyToClipboard(post.content, 100 + i)}
                          className="text-slate-400 hover:text-blue-600 transition-colors"
                        >
                          <Copy size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* SEO & Optimization Results - follow similar clean pattern */}
          {activeTab === "seo" && seoResult && (
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
              <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Search size={18} className="text-blue-600" /> Keyword
                Intelligence
              </h3>
              <div className="bg-slate-50 rounded-lg overflow-hidden border border-slate-100">
                <table className="w-full text-xs">
                  <thead className="bg-slate-100 text-slate-500 font-bold uppercase">
                    <tr>
                      <th className="px-4 py-2 text-left">Term</th>
                      <th className="px-4 py-2 text-center">Volume</th>
                      <th className="px-4 py-2 text-right">Difficulty</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {seoResult.keywords.map((kw, i) => (
                      <tr key={i}>
                        <td className="px-4 py-3 font-semibold text-slate-900">
                          {kw.term}
                        </td>
                        <td className="px-4 py-3 text-center text-slate-600">
                          {kw.volume}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                              kw.difficulty === "High"
                                ? "bg-red-50 text-red-600 border-red-100"
                                : kw.difficulty === "Medium"
                                  ? "bg-amber-50 text-amber-600 border-amber-100"
                                  : "bg-emerald-50 text-emerald-600 border-emerald-100"
                            }`}
                          >
                            {kw.difficulty}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "optimize" && optimizationResult && (
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
              <div className="bg-blue-600 px-6 py-3 flex items-center gap-2 text-white">
                <Zap size={16} />
                <h3 className="font-bold text-sm">Optimized Output</h3>
              </div>
              <div className="p-6">
                <p className="text-slate-800 text-sm leading-relaxed whitespace-pre-wrap">
                  {optimizationResult.optimized}
                </p>
                <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between items-center">
                  <span className="text-[10px] text-slate-400 italic font-medium">
                    ✨ {optimizationResult.changesMade}
                  </span>
                  <button
                    onClick={() =>
                      copyToClipboard(optimizationResult.optimized, 999)
                    }
                    className="flex items-center gap-2 text-blue-600 font-bold text-xs"
                  >
                    <Copy size={14} /> Copy Content
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Image Result */}
          {(isGeneratingImage || generatedImage) && (
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                  Ad Creative
                </h4>
                {generatedImage && (
                  <a
                    href={generatedImage}
                    download="expert-campaign.png"
                    className="text-xs bg-slate-900 text-white px-3 py-1.5 rounded-lg font-bold"
                  >
                    Download
                  </a>
                )}
              </div>
              {isGeneratingImage ? (
                <div className="h-64 bg-slate-100 rounded-lg flex flex-col items-center justify-center gap-3">
                  <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-xs font-bold text-slate-500">
                    Generating HD Visual...
                  </p>
                </div>
              ) : (
                <img
                  src={generatedImage!}
                  alt="AI Generated"
                  className="w-full rounded-lg border border-slate-100 shadow-inner"
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
