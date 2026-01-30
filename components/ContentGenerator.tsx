import React, { useState } from 'react';
import { Platform, Tone, CampaignStrategy, OptimizationResult, SeoResult } from '../types';
import { generateMarketingCopy, generateMarketingImage, generateCampaignStrategy, optimizeContent, generateSeoKeywords } from '../services/geminiService';
import { Sparkles, Copy, Image as ImageIcon, Lightbulb, Target, Wand2, Zap, Search, BrainCircuit, BarChart2 } from 'lucide-react';
import { Button } from './common/Button';
import { Input } from './common/Input';
import { Select } from './common/Select';

export const ContentGenerator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'quick' | 'campaign' | 'optimize' | 'seo'>('quick');

  // Quick Post State
  const [topic, setTopic] = useState('');
  const [audience, setAudience] = useState('');
  const [platform, setPlatform] = useState<Platform>(Platform.Twitter);
  const [tone, setTone] = useState<Tone>(Tone.Professional);
  const [generatedPosts, setGeneratedPosts] = useState<string[]>([]);
  
  // Campaign State
  const [productName, setProductName] = useState('');
  const [campaignGoal, setCampaignGoal] = useState('');
  const [strategy, setStrategy] = useState<CampaignStrategy | null>(null);

  // Optimizer State
  const [contentToOptimize, setContentToOptimize] = useState('');
  const [optimizationGoal, setOptimizationGoal] = useState('Make it more engaging and viral');
  const [optimizationResult, setOptimizationResult] = useState<OptimizationResult | null>(null);

  // SEO State
  const [seoTopic, setSeoTopic] = useState('');
  const [seoNiche, setSeoNiche] = useState('');
  const [seoResult, setSeoResult] = useState<SeoResult | null>(null);

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
  }

  const handleSeoResearch = async () => {
    if (!seoTopic || !seoNiche) return;
    setIsGenerating(true);
    setSeoResult(null);
    const result = await generateSeoKeywords(seoTopic, seoNiche);
    setSeoResult(result);
    setIsGenerating(false);
  }

  const handleGenerateImage = async (promptText: string) => {
    setIsGeneratingImage(true);
    const imagePrompt = `Professional, minimalist marketing photography for: ${promptText}. High quality, 4k.`;
    const imageBase64 = await generateMarketingImage(imagePrompt);
    setGeneratedImage(imageBase64);
    setIsGeneratingImage(false);
  };

  // Helper to determine if current mode uses Thinking Model
  const isThinkingMode = activeTab === 'campaign' || activeTab === 'seo';

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex items-center justify-between mb-6 pb-6 border-b border-slate-200">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 font-display">AI Studio</h2>
          <p className="text-slate-500 mt-1 flex items-center gap-2">
            Powered by Gemini 3 Pro.
            {isThinkingMode && (
                <span className="flex items-center gap-1 text-xs font-bold bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full border border-indigo-200">
                    <BrainCircuit size={12} /> Thinking Mode
                </span>
            )}
          </p>
        </div>
        <div className="bg-slate-100 p-1 rounded-lg flex gap-1">
          <Button 
            size="sm" 
            variant={activeTab === 'quick' ? 'outline' : 'ghost'} 
            onClick={() => setActiveTab('quick')}
            className={activeTab === 'quick' ? 'bg-white text-slate-900 shadow-sm' : ''}
          >
            Quick Post
          </Button>
          <Button 
            size="sm" 
            variant={activeTab === 'campaign' ? 'outline' : 'ghost'} 
            onClick={() => setActiveTab('campaign')}
            className={activeTab === 'campaign' ? 'bg-white text-slate-900 shadow-sm' : ''}
          >
            Strategy
          </Button>
          <Button 
            size="sm" 
            variant={activeTab === 'seo' ? 'outline' : 'ghost'} 
            onClick={() => setActiveTab('seo')}
            className={activeTab === 'seo' ? 'bg-white text-slate-900 shadow-sm' : ''}
            icon={<Search size={14} className={activeTab === 'seo' ? 'text-indigo-500' : ''} />}
          >
            SEO
          </Button>
           <Button 
            size="sm" 
            variant={activeTab === 'optimize' ? 'outline' : 'ghost'} 
            onClick={() => setActiveTab('optimize')}
            className={activeTab === 'optimize' ? 'bg-white text-slate-900 shadow-sm' : ''}
            icon={<Zap size={14} className={activeTab === 'optimize' ? 'text-indigo-500' : ''} />}
          >
            Optimizer
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1 overflow-hidden">
        {/* Input Section */}
        <div className="minimal-card p-6 overflow-y-auto custom-scrollbar flex flex-col h-full">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              {activeTab === 'quick' ? 'Configure Post' : 
               activeTab === 'campaign' ? 'Strategy Details' : 
               activeTab === 'seo' ? 'Keyword Research' : 'Content Optimizer'}
            </h3>
            <p className="text-slate-500 text-sm">
              {activeTab === 'quick' ? 'Fill in details to generate content.' : 
               activeTab === 'campaign' ? 'Define goals for strategic reasoning.' : 
               activeTab === 'seo' ? 'Find high-value keywords and gaps.' :
               'Refine existing content with Gemini Pro.'}
            </p>
          </div>

          <div className="space-y-5 flex-1">
            {activeTab === 'quick' && (
              <>
                <Input 
                  label="Topic"
                  multiline
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="What would you like to post about?"
                  className="h-32"
                />
                
                <Input 
                   label="Target Audience"
                   value={audience}
                   onChange={(e) => setAudience(e.target.value)}
                   placeholder="Who are you writing for?"
                />

                <div className="grid grid-cols-2 gap-4">
                  <Select 
                    label="Platform"
                    value={platform} 
                    onChange={(e) => setPlatform(e.target.value as Platform)}
                    options={Object.values(Platform).map(p => ({label: p, value: p}))}
                  />
                  <Select 
                    label="Tone"
                    value={tone} 
                    onChange={(e) => setTone(e.target.value as Tone)}
                    options={Object.values(Tone).map(t => ({label: t, value: t}))}
                  />
                </div>
              </>
            )}
            
            {activeTab === 'campaign' && (
              <>
                 <Input 
                    label="Product / Brand Name"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    placeholder="e.g., AutoMarketer AI"
                 />
                 <Input 
                    label="Campaign Goal"
                    multiline
                    value={campaignGoal}
                    onChange={(e) => setCampaignGoal(e.target.value)}
                    placeholder="What are the objectives? (e.g. increase brand awareness in Q4)"
                    className="h-40"
                 />
              </>
            )}

            {activeTab === 'seo' && (
              <>
                 <Input 
                    label="Core Topic / Keyword"
                    value={seoTopic}
                    onChange={(e) => setSeoTopic(e.target.value)}
                    placeholder="e.g. Digital Marketing Automation"
                 />
                 <Input 
                    label="Niche / Industry"
                    value={seoNiche}
                    onChange={(e) => setSeoNiche(e.target.value)}
                    placeholder="e.g. SaaS for Small Business"
                 />
                 <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-lg">
                    <div className="flex items-center gap-2 text-indigo-700 font-bold text-xs mb-2 uppercase">
                        <BrainCircuit size={14} /> Thinking Model Active
                    </div>
                    <p className="text-xs text-indigo-600/80">
                        Gemini 3 Pro will analyze search intent and difficulty to suggest high-value opportunities.
                    </p>
                 </div>
              </>
            )}

            {activeTab === 'optimize' && (
              <>
                <Input 
                    label="Content to Optimize"
                    multiline
                    value={contentToOptimize}
                    onChange={(e) => setContentToOptimize(e.target.value)}
                    placeholder="Paste your draft here (email, post, blog intro)..."
                    className="h-48"
                />
                
                <Select 
                    label="Optimization Goal"
                    value={optimizationGoal} 
                    onChange={(e) => setOptimizationGoal(e.target.value)}
                    options={[
                        {label: "Make it more engaging and viral", value: "Make it more engaging and viral"},
                        {label: "Fix grammar and professionalize tone", value: "Fix grammar and professionalize tone"},
                        {label: "Shorten and make punchy", value: "Shorten and make punchy"},
                        {label: "Expand and add detail", value: "Expand and add detail"},
                        {label: "Optimize for SEO keywords", value: "Optimize for SEO keywords"}
                    ]}
                />
              </>
            )}
          </div>

          <Button 
            onClick={activeTab === 'quick' ? handleGeneratePost : activeTab === 'campaign' ? handleGenerateStrategy : activeTab === 'seo' ? handleSeoResearch : handleOptimizeContent}
            disabled={isGenerating || (activeTab === 'quick' ? !topic : activeTab === 'campaign' ? !productName : activeTab === 'seo' ? !seoTopic : !contentToOptimize)}
            isLoading={isGenerating}
            icon={isThinkingMode ? <BrainCircuit size={18} /> : <Wand2 size={18} />}
            fullWidth
            className="mt-6"
            variant={isThinkingMode ? 'primary' : 'primary'}
          >
            {isGenerating ? 'Thinking...' : (
                activeTab === 'quick' ? 'Generate Content' : 
                activeTab === 'campaign' ? 'Develop Strategy' : 
                activeTab === 'seo' ? 'Analyze Keywords' : 'Optimize Content'
            )}
          </Button>
        </div>

        {/* Output Section */}
        <div className="minimal-card p-6 overflow-y-auto custom-scrollbar h-full bg-slate-50/50">
          {!isGenerating && generatedPosts.length === 0 && !strategy && !optimizationResult && !seoResult && (
             <div className="h-full flex flex-col items-center justify-center text-slate-400 text-center space-y-4">
               <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center border border-slate-200 shadow-sm">
                  <Sparkles size={24} className="text-slate-300" />
               </div>
               <div>
                  <h3 className="text-sm font-bold text-slate-900">AI Assistant Ready</h3>
                  <p className="max-w-xs mx-auto text-xs mt-1">Configure your request to see results from Gemini 3 Pro.</p>
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
            {activeTab === 'quick' && generatedPosts.map((post, idx) => (
              <div key={idx} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm group hover:border-indigo-200 transition-colors">
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{platform}</span>
                      <button className="text-slate-400 hover:text-slate-900 transition-colors" title="Copy">
                        <Copy size={16} onClick={() => navigator.clipboard.writeText(post)}/>
                      </button>
                    </div>
                    <p className="text-slate-800 whitespace-pre-wrap leading-relaxed text-sm">{post}</p>
                  </div>
                  <div className="bg-slate-50 p-3 border-t border-slate-100 flex justify-end">
                    <Button 
                        size="sm" 
                        variant="secondary" 
                        onClick={() => handleGenerateImage(post)}
                        icon={<ImageIcon size={14}/>}
                    >
                      Generate Visual
                    </Button>
                  </div>
              </div>
            ))}

            {/* Campaign Strategy Results */}
            {activeTab === 'campaign' && strategy && (
              <div className="space-y-6 animate-fade-in">
                <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm">
                   <div className="flex items-center gap-3 mb-4">
                      <div className="bg-indigo-50 p-2 rounded-lg text-indigo-600">
                        <Target size={18} />
                      </div>
                      <h3 className="text-base font-bold text-slate-900">Campaign Overview</h3>
                   </div>
                   <p className="text-slate-600 leading-relaxed mb-6 text-sm">{strategy.overview}</p>
                   
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                        <h4 className="text-xs font-bold text-indigo-600 mb-1 uppercase tracking-wide">Target Audience</h4>
                        <p className="text-sm text-slate-600">{strategy.targetAudience}</p>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                        <h4 className="text-xs font-bold text-indigo-600 mb-1 uppercase tracking-wide">Key Themes</h4>
                        <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
                          {strategy.keyThemes.map((t, i) => <li key={i}>{t}</li>)}
                        </ul>
                      </div>
                   </div>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-4">
                    <Lightbulb className="text-amber-500" size={18} /> Suggested Content
                  </h3>
                  <div className="space-y-4">
                    {strategy.suggestedPosts.map((post, i) => (
                      <div key={i} className="bg-white border border-slate-200 rounded-xl p-5 hover:border-indigo-200 transition-all shadow-sm">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded uppercase">{post.platform}</span>
                            <span className="text-xs text-slate-400">Time: {post.bestTime}</span>
                          </div>
                          <p className="text-slate-800 mb-4 whitespace-pre-wrap text-sm">{post.content}</p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {post.hashtags.map((tag, t) => (
                              <span key={t} className="text-xs text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">#{tag}</span>
                            ))}
                          </div>
                          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                            <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => handleGenerateImage(post.content)}
                                icon={<ImageIcon size={14} />}
                            >
                                Create Visual
                            </Button>
                            <button className="text-slate-400 hover:text-slate-900 transition-colors">
                                <Copy size={16} onClick={() => navigator.clipboard.writeText(post.content)} />
                            </button>
                          </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* SEO Results */}
            {activeTab === 'seo' && seoResult && (
                <div className="space-y-6 animate-fade-in">
                    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                         <div className="bg-indigo-50/50 p-4 border-b border-indigo-100 flex items-center gap-2">
                            <BarChart2 size={16} className="text-indigo-600" />
                            <h3 className="font-bold text-slate-900 text-sm">Target Keywords</h3>
                        </div>
                        <div className="divide-y divide-slate-100">
                            <div className="grid grid-cols-4 bg-slate-50 px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">
                                <div className="col-span-2">Keyword</div>
                                <div>Volume</div>
                                <div>Difficulty</div>
                            </div>
                            {seoResult.keywords.map((kw, i) => (
                                <div key={i} className="grid grid-cols-4 px-6 py-3 text-sm hover:bg-slate-50 transition-colors">
                                    <div className="col-span-2 font-medium text-slate-800">{kw.term}</div>
                                    <div className="text-slate-600">{kw.volume}</div>
                                    <div>
                                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                                            kw.difficulty === 'High' ? 'bg-rose-50 text-rose-600 border-rose-100' :
                                            kw.difficulty === 'Medium' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                                            'bg-emerald-50 text-emerald-600 border-emerald-100'
                                        }`}>
                                            {kw.difficulty}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Content Ideas</h4>
                            <ul className="space-y-2">
                                {seoResult.contentIdeas.map((idea, i) => (
                                    <li key={i} className="flex gap-2 text-sm text-slate-700">
                                        <span className="text-indigo-500">•</span> {idea}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Competitor Gaps</h4>
                             <ul className="space-y-2">
                                {seoResult.competitorUrls.map((url, i) => (
                                    <li key={i} className="flex gap-2 text-sm text-slate-600 truncate">
                                        <span className="text-rose-400">⚡</span> {url}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            )}

            {/* Optimization Results */}
            {activeTab === 'optimize' && optimizationResult && (
               <div className="space-y-6 animate-fade-in">
                  <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                      <div className="bg-indigo-50/50 p-4 border-b border-indigo-100 flex items-center gap-2">
                        <Zap size={16} className="text-indigo-600" />
                        <h3 className="font-bold text-slate-900 text-sm">Optimized Content</h3>
                      </div>
                      <div className="p-6">
                        <p className="text-slate-800 text-base leading-relaxed whitespace-pre-wrap">{optimizationResult.optimized}</p>
                        <div className="flex justify-end mt-4">
                           <Button variant="ghost" size="sm" icon={<Copy size={14} />} onClick={() => navigator.clipboard.writeText(optimizationResult.optimized)}>
                              Copy Result
                           </Button>
                        </div>
                      </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                       <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">AI Changes Explained</h4>
                       <p className="text-sm text-slate-600 italic">"{optimizationResult.changesMade}"</p>
                    </div>
                  </div>
               </div>
            )}

            {isGeneratingImage && (
              <div className="h-64 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-center">
                <Button isLoading variant="ghost" disabled>Rendering...</Button>
              </div>
            )}
            {generatedImage && (
              <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
                <div className="flex justify-between items-center mb-4">
                    <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wide">AI Visual</h4>
                    <a href={generatedImage} download="visual.png" className="text-xs bg-slate-900 text-white hover:bg-slate-700 px-3 py-1.5 rounded-md font-medium transition-colors">Download</a>
                </div>
                <img src={generatedImage} alt="Generated" className="w-full rounded-lg shadow-sm border border-slate-100" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};