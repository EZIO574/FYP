import React, { useState } from "react";
import { analyzeCompetitor } from "../services/geminiService";
import { SwotAnalysis } from "../types";
import {
  Search,
  TrendingUp,
  AlertTriangle,
  Target,
  Shield,
  Loader2,
  ArrowRight,
} from "lucide-react";

export const CompetitorAnalysis: React.FC = () => {
  const [competitorName, setCompetitorName] = useState("");
  const [industry, setIndustry] = useState("");
  const [analysis, setAnalysis] = useState<SwotAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async () => {
    if (!competitorName || !industry) return;
    setIsAnalyzing(true);
    setAnalysis(null);

    const result = await analyzeCompetitor(competitorName, industry);
    setAnalysis(result);
    setIsAnalyzing(false);
  };

  return (
    <div className="h-full flex flex-col animate-fade-in">
      <div className="pb-2 mb-4">
        <p className="text-slate-500">
          Strategic SWOT analysis powered by Gemini 3 Pro reasoning.
        </p>
      </div>

      {!analysis && !isAnalyzing && (
        <div className="flex-1 flex items-center justify-center">
          <div className="minimal-card p-8 w-full max-w-lg">
            <h3 className="text-xl font-bold text-slate-900 mb-6 text-center">
              Start New Analysis
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                  Competitor Name
                </label>
                <input
                  type="text"
                  value={competitorName}
                  onChange={(e) => setCompetitorName(e.target.value)}
                  className="minimal-input w-full rounded-lg p-3 text-sm"
                  placeholder="e.g. Acme Corp"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                  Industry / Niche
                </label>
                <input
                  type="text"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="minimal-input w-full rounded-lg p-3 text-sm"
                  placeholder="e.g. SaaS Marketing Tools"
                />
              </div>
              <button
                onClick={handleAnalyze}
                disabled={!competitorName || !industry}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-lg font-bold transition-all disabled:opacity-50 mt-2 flex items-center justify-center gap-2"
              >
                Analyze Competitor <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {isAnalyzing && (
        <div className="flex-1 flex flex-col items-center justify-center space-y-4">
          <Loader2 className="animate-spin text-indigo-600" size={48} />
          <div className="text-center">
            <h3 className="text-lg font-bold text-slate-900">
              Analyzing Market Data...
            </h3>
            <p className="text-slate-500 text-sm">
              Gemini 3 Pro is thinking about market trends and hidden factors.
            </p>
          </div>
        </div>
      )}

      {analysis && (
        <div className="space-y-6 pb-8">
          {/* Strategic Advice Header */}
          <div className="bg-indigo-50 border border-indigo-100 p-6 rounded-xl">
            <h3 className="text-lg font-bold text-indigo-900 mb-2">
              Strategic Advice
            </h3>
            <p className="text-indigo-800 text-sm leading-relaxed">
              {analysis.strategicAdvice}
            </p>
            <button
              onClick={() => setAnalysis(null)}
              className="mt-4 text-xs font-bold text-indigo-600 hover:text-indigo-800 uppercase tracking-wide"
            >
              Start New Analysis
            </button>
          </div>

          {/* SWOT Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Strengths */}
            <div className="minimal-card p-6 border-l-4 border-l-emerald-500">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
                  <Shield size={20} />
                </div>
                <h4 className="font-bold text-slate-900">Strengths</h4>
              </div>
              <ul className="space-y-3">
                {analysis.strengths.map((item, i) => (
                  <li key={i} className="flex gap-3 text-sm text-slate-600">
                    <span className="text-emerald-500 font-bold">•</span> {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Weaknesses */}
            <div className="minimal-card p-6 border-l-4 border-l-rose-500">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-rose-50 rounded-lg text-rose-600">
                  <AlertTriangle size={20} />
                </div>
                <h4 className="font-bold text-slate-900">Weaknesses</h4>
              </div>
              <ul className="space-y-3">
                {analysis.weaknesses.map((item, i) => (
                  <li key={i} className="flex gap-3 text-sm text-slate-600">
                    <span className="text-rose-500 font-bold">•</span> {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Opportunities */}
            <div className="minimal-card p-6 border-l-4 border-l-blue-500">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                  <Target size={20} />
                </div>
                <h4 className="font-bold text-slate-900">Opportunities</h4>
              </div>
              <ul className="space-y-3">
                {analysis.opportunities.map((item, i) => (
                  <li key={i} className="flex gap-3 text-sm text-slate-600">
                    <span className="text-blue-500 font-bold">•</span> {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Threats */}
            <div className="minimal-card p-6 border-l-4 border-l-amber-500">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-amber-50 rounded-lg text-amber-600">
                  <TrendingUp size={20} />
                </div>
                <h4 className="font-bold text-slate-900">Threats</h4>
              </div>
              <ul className="space-y-3">
                {analysis.threats.map((item, i) => (
                  <li key={i} className="flex gap-3 text-sm text-slate-600">
                    <span className="text-amber-500 font-bold">•</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
