import React, { useState } from "react";
import { analyzeCompetitor } from "@/services/geminiService";
import { SwotAnalysis } from "@/types";
import {
  TrendingUp,
  AlertTriangle,
  Target,
  Shield,
  Loader2,
  ArrowRight,
  Search,
  RotateCcw,
} from "lucide-react";
import { Input } from "@/components/common/Input";
import { Button } from "@/components/common/Button";

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
    <div className="flex flex-col animate-fade-in pb-10">
      {/* Header */}
      <div className="mb-8 pb-6 border-b border-slate-200">
        <h2 className="text-2xl font-bold text-slate-900">
          Competitor Intelligence
        </h2>
        <p className="text-slate-500 text-sm mt-1">
          Perform AI-powered SWOT analysis and market intelligence research
        </p>
      </div>

      {!analysis && !isAnalyzing && (
        <div className="flex-1 flex items-center justify-center py-20">
          <div className="bg-white border border-slate-200 p-10 w-full max-w-lg rounded-2xl shadow-lg">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                <Search size={32} />
              </div>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-6 text-center">
              New Competitor Analysis
            </h3>
            <div className="space-y-5">
              <Input
                label="Competitor Company Name"
                value={competitorName}
                onChange={(e) => setCompetitorName(e.target.value)}
                placeholder="e.g. Acme Corporation"
                className="!bg-white !border-slate-300"
              />

              <Input
                label="Target Industry / Market"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                placeholder="e.g. Enterprise Cloud Storage"
                className="!bg-white !border-slate-300"
              />

              <Button
                onClick={handleAnalyze}
                disabled={!competitorName || !industry}
                fullWidth
                size="lg"
                icon={<ArrowRight size={20} />}
                className="mt-4 !bg-blue-600 hover:!bg-blue-700 text-white font-bold h-12 rounded-xl"
              >
                Perform Analysis
              </Button>
            </div>
          </div>
        </div>
      )}

      {isAnalyzing && (
        <div className="flex-1 flex flex-col items-center justify-center py-32 space-y-6">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-bold text-slate-900">
              Analyzing Market Intelligence...
            </h3>
            <p className="text-slate-500 text-sm mt-2 max-w-xs mx-auto leading-relaxed">
              Our AI is currently synthesizing competitor strengths and market
              positioning data.
            </p>
          </div>
        </div>
      )}

      {analysis && (
        <div className="space-y-8 animate-fade-in">
          {/* Strategic Advice Header */}
          <div className="bg-blue-600 rounded-xl p-8 text-white shadow-lg shadow-blue-200 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[80px] -mr-32 -mt-32" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <Shield size={24} className="text-blue-200" />
                <h3 className="text-sm font-bold uppercase tracking-widest text-blue-100">
                  Strategic Executive Summary
                </h3>
              </div>
              <p className="text-lg font-medium leading-relaxed max-w-4xl">
                {analysis.strategicAdvice}
              </p>
              <button
                onClick={() => setAnalysis(null)}
                className="mt-8 flex items-center gap-2 text-xs font-bold text-blue-100 hover:text-white transition-colors"
              >
                <RotateCcw size={14} /> New Analysis
              </button>
            </div>
          </div>

          {/* SWOT Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Strengths */}
            <div className="bg-white border border-slate-200 p-8 rounded-xl shadow-sm border-l-4 border-l-emerald-500">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-2.5 bg-emerald-50 rounded-lg text-emerald-600">
                  <Shield size={24} />
                </div>
                <h4 className="font-bold text-slate-900">Market Advantages</h4>
              </div>
              <ul className="space-y-3">
                {analysis.strengths.map((item, i) => (
                  <li
                    key={i}
                    className="flex gap-3 text-sm text-slate-600 leading-relaxed items-start"
                  >
                    <span className="text-emerald-500 font-bold mt-1">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Weaknesses */}
            <div className="bg-white border border-slate-200 p-8 rounded-xl shadow-sm border-l-4 border-l-red-500">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-2.5 bg-red-50 rounded-lg text-red-600">
                  <AlertTriangle size={24} />
                </div>
                <h4 className="font-bold text-slate-900">
                  Internal Weaknesses
                </h4>
              </div>
              <ul className="space-y-3">
                {analysis.weaknesses.map((item, i) => (
                  <li
                    key={i}
                    className="flex gap-3 text-sm text-slate-600 leading-relaxed items-start"
                  >
                    <span className="text-red-500 font-bold mt-1">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Opportunities */}
            <div className="bg-white border border-slate-200 p-8 rounded-xl shadow-sm border-l-4 border-l-blue-500">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-2.5 bg-blue-50 rounded-lg text-blue-600">
                  <Target size={24} />
                </div>
                <h4 className="font-bold text-slate-900">
                  Growth Opportunities
                </h4>
              </div>
              <ul className="space-y-3">
                {analysis.opportunities.map((item, i) => (
                  <li
                    key={i}
                    className="flex gap-3 text-sm text-slate-600 leading-relaxed items-start"
                  >
                    <span className="text-blue-500 font-bold mt-1">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Threats */}
            <div className="bg-white border border-slate-200 p-8 rounded-xl shadow-sm border-l-4 border-l-amber-500">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-2.5 bg-amber-50 rounded-lg text-amber-600">
                  <TrendingUp size={24} />
                </div>
                <h4 className="font-bold text-slate-900">Market Threats</h4>
              </div>
              <ul className="space-y-3">
                {analysis.threats.map((item, i) => (
                  <li
                    key={i}
                    className="flex gap-3 text-sm text-slate-600 leading-relaxed items-start"
                  >
                    <span className="text-amber-500 font-bold mt-1">•</span>
                    {item}
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
