import React from "react";
import { useMarketingStudio } from "./hooks/useMarketingStudio";
import { StudioHeader } from "./components/StudioHeader";
import { StudioTabs } from "./components/StudioTabs";
import { ConfigPanel } from "./components/ConfigPanel";
import { ResultsTerminal } from "./components/ResultsTerminal";

export const ContentGenerator: React.FC = () => {
  const { state, actions } = useMarketingStudio();

  return (
    <div className="flex flex-col animate-fade-in pb-10">
      <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-8">
        <StudioHeader isThinkingMode={state.isThinkingMode} />
        <StudioTabs
          activeTab={state.activeTab}
          setActiveTab={actions.setActiveTab}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <ConfigPanel
          activeTab={state.activeTab}
          isGenerating={state.isGenerating}
          isThinkingMode={state.isThinkingMode}
          topic={state.topic}
          setTopic={actions.setTopic}
          audience={state.audience}
          setAudience={actions.setAudience}
          platform={state.platform}
          setPlatform={actions.setPlatform}
          tone={state.tone}
          setTone={actions.setTone}
          productName={state.productName}
          setProductName={actions.setProductName}
          campaignGoal={state.campaignGoal}
          setCampaignGoal={actions.setCampaignGoal}
          seoTopic={state.seoTopic}
          setSeoTopic={actions.setSeoTopic}
          seoNiche={state.seoNiche}
          setSeoNiche={actions.setSeoNiche}
          contentToOptimize={state.contentToOptimize}
          setContentToOptimize={actions.setContentToOptimize}
          optimizationGoal={state.optimizationGoal}
          setOptimizationGoal={actions.setOptimizationGoal}
          handlers={{
            handleGeneratePost: actions.handleGeneratePost,
            handleGenerateStrategy: actions.handleGenerateStrategy,
            handleSeoResearch: actions.handleSeoResearch,
            handleOptimizeContent: actions.handleOptimizeContent,
          }}
        />

        <ResultsTerminal
          activeTab={state.activeTab}
          isGenerating={state.isGenerating}
          generatedPosts={state.generatedPosts}
          strategy={state.strategy}
          optimizationResult={state.optimizationResult}
          seoResult={state.seoResult}
          generatedImage={state.generatedImage}
          isGeneratingImage={state.isGeneratingImage}
          copiedIndex={state.copiedIndex}
          platform={state.platform}
          actions={{
            handleGenerateImage: actions.handleGenerateImage,
            copyToClipboard: actions.copyToClipboard,
          }}
        />
      </div>
    </div>
  );
};
