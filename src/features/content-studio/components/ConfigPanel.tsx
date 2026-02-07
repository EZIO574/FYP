import React from "react";
import { Platform, Tone } from "@/types";
import { Lightbulb, BrainCircuit, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { ContentTab } from "../hooks/useMarketingStudio";

interface ConfigPanelProps {
  activeTab: ContentTab;
  isGenerating: boolean;
  isThinkingMode: boolean;
  topic: string;
  setTopic: (v: string) => void;
  audience: string;
  setAudience: (v: string) => void;
  platform: Platform;
  setPlatform: (v: Platform) => void;
  tone: Tone;
  setTone: (v: Tone) => void;
  productName: string;
  setProductName: (v: string) => void;
  campaignGoal: string;
  setCampaignGoal: (v: string) => void;
  seoTopic: string;
  setSeoTopic: (v: string) => void;
  seoNiche: string;
  setSeoNiche: (v: string) => void;
  contentToOptimize: string;
  setContentToOptimize: (v: string) => void;
  optimizationGoal: string;
  setOptimizationGoal: (v: string) => void;
  handlers: {
    handleGeneratePost: () => void;
    handleGenerateStrategy: () => void;
    handleSeoResearch: () => void;
    handleOptimizeContent: () => void;
  };
}

export const ConfigPanel: React.FC<ConfigPanelProps> = ({
  activeTab,
  isGenerating,
  isThinkingMode,
  topic,
  setTopic,
  audience,
  setAudience,
  platform,
  setPlatform,
  tone,
  setTone,
  productName,
  setProductName,
  campaignGoal,
  setCampaignGoal,
  seoTopic,
  setSeoTopic,
  seoNiche,
  setSeoNiche,
  contentToOptimize,
  setContentToOptimize,
  optimizationGoal,
  setOptimizationGoal,
  handlers,
}) => {
  const getTabTitle = () => {
    switch (activeTab) {
      case "quick":
        return "Content Configuration";
      case "campaign":
        return "Strategic Inputs";
      case "seo":
        return "Target Research";
      case "optimize":
        return "Content Refinement";
    }
  };

  const getTabDesc = () => {
    switch (activeTab) {
      case "quick":
        return "Define your topic and audience parameters.";
      case "campaign":
        return "Provide brand and goal details for your strategy.";
      case "seo":
        return "Identify key areas for search optimization.";
      case "optimize":
        return "Paste content to analyze and improve.";
    }
  };

  const isButtonDisabled =
    isGenerating ||
    (activeTab === "quick"
      ? !topic || !audience
      : activeTab === "campaign"
        ? !productName || !campaignGoal
        : activeTab === "seo"
          ? !seoTopic || !seoNiche
          : !contentToOptimize);

  const getButtonText = () => {
    if (isGenerating) return "Processing...";
    switch (activeTab) {
      case "quick":
        return "Generate Marketing Copy";
      case "campaign":
        return "Generate Strategy";
      case "seo":
        return "Run SEO Analysis";
      case "optimize":
        return "Optimize My Content";
    }
  };

  const handleAction = () => {
    switch (activeTab) {
      case "quick":
        handlers.handleGeneratePost();
        break;
      case "campaign":
        handlers.handleGenerateStrategy();
        break;
      case "seo":
        handlers.handleSeoResearch();
        break;
      case "optimize":
        handlers.handleOptimizeContent();
        break;
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm h-fit">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-slate-900">{getTabTitle()}</h3>
        <p className="text-sm text-slate-500 mt-1">{getTabDesc()}</p>
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
                Gemini AI will analyze search intent and keyword competitiveness
                to suggest high-impact opportunities.
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
          onClick={handleAction}
          disabled={isButtonDisabled}
          isLoading={isGenerating}
          icon={
            isThinkingMode ? <BrainCircuit size={20} /> : <Wand2 size={20} />
          }
          fullWidth
          className="mt-6 !bg-blue-600 hover:!bg-blue-700 text-white font-bold h-12"
        >
          {getButtonText()}
        </Button>
      </div>
    </div>
  );
};
