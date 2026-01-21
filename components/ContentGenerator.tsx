import React, { useState } from "react";
import { Platform, Tone, CampaignStrategy, OptimizationResult } from "../types";
import {
  generateMarketingCopy,
  generateMarketingImage,
  generateCampaignStrategy,
  optimizeContent,
} from "../services/geminiService";
import {
  Sparkles,
  Copy,
  Image as ImageIcon,
  Loader2,
  Lightbulb,
  Target,
  Layers,
  Wand2,
  Zap,
  ArrowRightLeft,
} from "lucide-react";

export const ContentGenerator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"quick" | "campaign" | "optimize">(
    "quick",
  );

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

  // Shared State
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);

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

  const handleGenerateImage = async (promptText: string) => {
    setIsGeneratingImage(true);
    const imagePrompt = `Professional, minimalist marketing photography for: ${promptText}. High quality, 4k.`;
    const imageBase64 = await generateMarketingImage(imagePrompt);
    setGeneratedImage(imageBase64);
    setIsGeneratingImage(false);
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex items-center justify-between mb-6 pb-2">
        <p className="text-slate-500">
          Create and optimize content powered by Gemini 3 Pro.
        </p>
        <div className="bg-slate-100 p-1 rounded-lg flex gap-1">
          <button
            onClick={() => setActiveTab("quick")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${activeTab === "quick" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
          >
            Quick Post
          </button>
          <button
            onClick={() => setActiveTab("campaign")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${activeTab === "campaign" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
          >
            Strategy
          </button>
          <button
            onClick={() => setActiveTab("optimize")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${activeTab === "optimize" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
          >
            <Zap
              size={14}
              className={activeTab === "optimize" ? "text-indigo-500" : ""}
            />{" "}
            Optimizer
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1 overflow-hidden">
        {/* Input Section */}
        <div className="minimal-card p-6 overflow-y-auto custom-scrollbar flex flex-col h-full">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              {activeTab === "quick"
                ? "Configure Post"
                : activeTab === "campaign"
                  ? "Strategy Details"
                  : "Content Optimizer"}
            </h3>
            <p className="text-slate-500 text-sm">
              {activeTab === "quick"
                ? "Fill in details to generate content."
                : activeTab === "campaign"
                  ? "Define your campaign goals."
                  : "Refine existing content with Gemini Pro."}
            </p>
          </div>

          <div className="space-y-5 flex-1">
            {activeTab === "quick" && (
              <>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Topic
                  </label>
                  <textarea
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="minimal-input w-full rounded-lg p-3 h-32 resize-none placeholder:text-slate-400 text-sm"
                    placeholder="What would you like to post about?"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Target Audience
                  </label>
                  <input
                    type="text"
                    value={audience}
                    onChange={(e) => setAudience(e.target.value)}
                    className="minimal-input w-full rounded-lg p-3 text-sm placeholder:text-slate-400"
                    placeholder="Who are you writing for?"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Platform
                    </label>
                    <select
                      value={platform}
                      onChange={(e) => setPlatform(e.target.value as Platform)}
                      className="minimal-input w-full rounded-lg p-3 text-sm appearance-none cursor-pointer"
                    >
                      {Object.values(Platform).map((p) => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Tone
                    </label>
                    <select
                      value={tone}
                      onChange={(e) => setTone(e.target.value as Tone)}
                      className="minimal-input w-full rounded-lg p-3 text-sm appearance-none cursor-pointer"
                    >
                      {Object.values(Tone).map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </>
            )}

            {activeTab === "campaign" && (
              <>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Product / Brand Name
                  </label>
                  <input
                    type="text"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    className="minimal-input w-full rounded-lg p-3 text-sm placeholder:text-slate-400"
                    placeholder="e.g., AutoMarketer AI"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Campaign Goal
                  </label>
                  <textarea
                    value={campaignGoal}
                    onChange={(e) => setCampaignGoal(e.target.value)}
                    className="minimal-input w-full rounded-lg p-3 h-40 resize-none text-sm placeholder:text-slate-400"
                    placeholder="What are the objectives?"
                  />
                </div>
              </>
            )}

            {activeTab === "optimize" && (
              <>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Content to Optimize
                  </label>
                  <textarea
                    value={contentToOptimize}
                    onChange={(e) => setContentToOptimize(e.target.value)}
                    className="minimal-input w-full rounded-lg p-3 h-48 resize-none text-sm placeholder:text-slate-400"
                    placeholder="Paste your draft here (email, post, blog intro)..."
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Optimization Goal
                  </label>
                  <select
                    value={optimizationGoal}
                    onChange={(e) => setOptimizationGoal(e.target.value)}
                    className="minimal-input w-full rounded-lg p-3 text-sm appearance-none cursor-pointer"
                  >
                    <option>Make it more engaging and viral</option>
                    <option>Fix grammar and professionalize tone</option>
                    <option>Shorten and make punchy</option>
                    <option>Expand and add detail</option>
                    <option>Optimize for SEO keywords</option>
                  </select>
                </div>
              </>
            )}
          </div>

          <button
            onClick={
              activeTab === "quick"
                ? handleGeneratePost
                : activeTab === "campaign"
                  ? handleGenerateStrategy
                  : handleOptimizeContent
            }
            disabled={
              isGenerating ||
              (activeTab === "quick"
                ? !topic
                : activeTab === "campaign"
                  ? !productName
                  : !contentToOptimize)
            }
            className="w-full mt-6 py-3 rounded-lg font-bold text-white bg-slate-900 hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 text-sm"
          >
            {isGenerating ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              <Wand2 size={18} />
            )}
            {isGenerating
              ? "Processing..."
              : activeTab === "quick"
                ? "Generate Content"
                : activeTab === "campaign"
                  ? "Develop Strategy"
                  : "Optimize Content"}
          </button>
        </div>

        {/* Output Section */}
        <div className="minimal-card p-6 overflow-y-auto custom-scrollbar h-full bg-slate-50/50">
          {!isGenerating &&
            generatedPosts.length === 0 &&
            !strategy &&
            !optimizationResult && (
              <div className="h-full flex flex-col items-center justify-center text-slate-400 text-center space-y-4">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center border border-slate-200 shadow-sm">
                  <Sparkles size={24} className="text-slate-300" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    AI Assistant Ready
                  </h3>
                  <p className="max-w-xs mx-auto text-xs mt-1">
                    Configure your request to see results from Gemini 3 Pro.
                  </p>
                </div>
              </div>
            )}

          {isGenerating && (
            <div className="space-y-6 animate-pulse">
              <div className="h-32 bg-white rounded-xl border border-slate-200"></div>
              <div className="h-32 bg-white rounded-xl border border-slate-200"></div>
            </div>
          )}

          <div className="space-y-6">
            {/* Quick Post Results */}
            {activeTab === "quick" &&
              generatedPosts.map((post, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm group hover:border-indigo-200 transition-colors"
                >
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                        {platform}
                      </span>
                      <button
                        className="text-slate-400 hover:text-slate-900 transition-colors"
                        title="Copy"
                      >
                        <Copy
                          size={16}
                          onClick={() => navigator.clipboard.writeText(post)}
                        />
                      </button>
                    </div>
                    <p className="text-slate-800 whitespace-pre-wrap leading-relaxed text-sm">
                      {post}
                    </p>
                  </div>
                  <div className="bg-slate-50 p-3 border-t border-slate-100 flex justify-end">
                    <button
                      onClick={() => handleGenerateImage(post)}
                      className="text-xs flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium bg-white border border-slate-200 px-3 py-1.5 rounded-md transition-colors shadow-sm"
                    >
                      <ImageIcon size={14} /> Generate Visual
                    </button>
                  </div>
                </div>
              ))}

            {/* Campaign Strategy Results */}
            {activeTab === "campaign" && strategy && (
              <div className="space-y-6 animate-fade-in">
                <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-indigo-50 p-2 rounded-lg text-indigo-600">
                      <Target size={18} />
                    </div>
                    <h3 className="text-base font-bold text-slate-900">
                      Campaign Overview
                    </h3>
                  </div>
                  <p className="text-slate-600 leading-relaxed mb-6 text-sm">
                    {strategy.overview}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                      <h4 className="text-xs font-bold text-indigo-600 mb-1 uppercase tracking-wide">
                        Target Audience
                      </h4>
                      <p className="text-sm text-slate-600">
                        {strategy.targetAudience}
                      </p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                      <h4 className="text-xs font-bold text-indigo-600 mb-1 uppercase tracking-wide">
                        Key Themes
                      </h4>
                      <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
                        {strategy.keyThemes.map((t, i) => (
                          <li key={i}>{t}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-4">
                    <Lightbulb className="text-amber-500" size={18} /> Suggested
                    Content
                  </h3>
                  <div className="space-y-4">
                    {strategy.suggestedPosts.map((post, i) => (
                      <div
                        key={i}
                        className="bg-white border border-slate-200 rounded-xl p-5 hover:border-indigo-200 transition-all shadow-sm"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded uppercase">
                            {post.platform}
                          </span>
                          <span className="text-xs text-slate-400">
                            Time: {post.bestTime}
                          </span>
                        </div>
                        <p className="text-slate-800 mb-4 whitespace-pre-wrap text-sm">
                          {post.content}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.hashtags.map((tag, t) => (
                            <span
                              key={t}
                              className="text-xs text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                          <button
                            onClick={() => handleGenerateImage(post.content)}
                            className="flex items-center gap-2 text-xs text-slate-600 hover:text-indigo-600 font-medium transition-colors"
                          >
                            <ImageIcon size={14} /> Create Visual
                          </button>
                          <button className="text-slate-400 hover:text-slate-900 transition-colors">
                            <Copy
                              size={16}
                              onClick={() =>
                                navigator.clipboard.writeText(post.content)
                              }
                            />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Optimization Results */}
            {activeTab === "optimize" && optimizationResult && (
              <div className="space-y-6 animate-fade-in">
                <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                  <div className="bg-indigo-50/50 p-4 border-b border-indigo-100 flex items-center gap-2">
                    <Zap size={16} className="text-indigo-600" />
                    <h3 className="font-bold text-slate-900 text-sm">
                      Optimized Content
                    </h3>
                  </div>
                  <div className="p-6">
                    <p className="text-slate-800 text-base leading-relaxed whitespace-pre-wrap">
                      {optimizationResult.optimized}
                    </p>
                    <div className="flex justify-end mt-4">
                      <button className="text-slate-500 hover:text-indigo-600 flex items-center gap-1 text-xs font-medium transition-colors">
                        <Copy
                          size={14}
                          onClick={() =>
                            navigator.clipboard.writeText(
                              optimizationResult.optimized,
                            )
                          }
                        />{" "}
                        Copy Result
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                      AI Changes Explained
                    </h4>
                    <p className="text-sm text-slate-600 italic">
                      "{optimizationResult.changesMade}"
                    </p>
                  </div>
                </div>
              </div>
            )}

            {isGeneratingImage && (
              <div className="h-64 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                  <Loader2 className="animate-spin text-indigo-600" size={24} />
                  <p className="text-slate-500 text-xs font-medium">
                    Rendering...
                  </p>
                </div>
              </div>
            )}
            {generatedImage && (
              <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wide">
                    AI Visual
                  </h4>
                  <a
                    href={generatedImage}
                    download="visual.png"
                    className="text-xs bg-slate-900 text-white hover:bg-slate-700 px-3 py-1.5 rounded-md font-medium transition-colors"
                  >
                    Download
                  </a>
                </div>
                <img
                  src={generatedImage}
                  alt="Generated"
                  className="w-full rounded-lg shadow-sm border border-slate-100"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
