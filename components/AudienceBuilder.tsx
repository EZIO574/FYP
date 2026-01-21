import React, { useState } from "react";
import { generateAudiencePersona } from "../services/geminiService";
import { Persona } from "../types";
import {
  User,
  Loader2,
  Target,
  Briefcase,
  TrendingUp,
  AlertCircle,
  Quote,
} from "lucide-react";

export const AudienceBuilder: React.FC = () => {
  const [productName, setProductName] = useState("");
  const [industry, setIndustry] = useState("");
  const [region, setRegion] = useState("");
  const [persona, setPersona] = useState<Persona | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!productName || !industry) return;
    setLoading(true);
    const result = await generateAudiencePersona(
      productName,
      industry,
      region || "Global",
    );
    setPersona(result);
    setLoading(false);
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col animate-fade-in">
      <div className="mb-8 border-b border-slate-200 pb-6">
        <h2 className="text-3xl font-bold text-slate-900 font-display">
          Audience Persona Builder
        </h2>
        <p className="text-slate-500 mt-1">
          Generate detailed buyer personas powered by Gemini AI to target your
          marketing effectively.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full overflow-hidden">
        {/* Input Form */}
        <div className="lg:col-span-4 flex flex-col gap-6 h-full overflow-y-auto pb-4 custom-scrollbar">
          <div className="minimal-card p-6 space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Product / Service Name
              </label>
              <input
                type="text"
                className="minimal-input w-full p-3 rounded-lg text-sm"
                placeholder="e.g. EcoHome Smart Thermostat"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Industry / Niche
              </label>
              <input
                type="text"
                className="minimal-input w-full p-3 rounded-lg text-sm"
                placeholder="e.g. Home Automation / Green Tech"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Target Region (Optional)
              </label>
              <input
                type="text"
                className="minimal-input w-full p-3 rounded-lg text-sm"
                placeholder="e.g. North America, Urban Areas"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
              />
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading || !productName || !industry}
              className="w-full bg-slate-900 text-white py-3 rounded-lg font-bold hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 text-sm"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <User size={18} />
              )}
              {loading ? "Generating Persona..." : "Generate Persona"}
            </button>
          </div>

          <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-5">
            <div className="flex items-start gap-3">
              <div className="bg-indigo-100 p-2 rounded-lg text-indigo-600 mt-1">
                <Target size={18} />
              </div>
              <div>
                <h4 className="font-bold text-indigo-900 text-sm mb-1">
                  Why use Personas?
                </h4>
                <p className="text-indigo-700/80 text-xs leading-relaxed">
                  Understanding your ideal customer's pain points and
                  motivations helps you tailor your messaging, resulting in
                  higher conversion rates and better engagement.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Output Display */}
        <div className="lg:col-span-8 h-full overflow-y-auto pb-4 custom-scrollbar">
          {loading ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-4 minimal-card bg-slate-50/50 p-12">
              <Loader2 size={48} className="animate-spin text-indigo-500" />
              <p className="text-sm font-medium animate-pulse">
                Analyzing market data and constructing persona...
              </p>
            </div>
          ) : !persona ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 minimal-card bg-slate-50/50 p-12 text-center">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                <User size={32} className="text-slate-300" />
              </div>
              <h3 className="font-bold text-slate-900 mb-1">
                No Persona Generated Yet
              </h3>
              <p className="max-w-xs mx-auto text-sm">
                Enter your product details on the left to create your ideal
                buyer profile.
              </p>
            </div>
          ) : (
            <div className="space-y-6 animate-fade-in">
              {/* Header Card */}
              <div className="minimal-card p-6 border-l-4 border-l-indigo-500">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="w-24 h-24 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center flex-shrink-0 border-4 border-white shadow-sm">
                    <span className="text-3xl font-bold text-indigo-600">
                      {persona.name.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-2xl font-bold text-slate-900 font-display">
                          {persona.name}
                        </h3>
                        <p className="text-indigo-600 font-medium">
                          {persona.occupation}
                        </p>
                      </div>
                      <span className="bg-slate-100 text-slate-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                        {persona.ageRange}
                      </span>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2 text-slate-600">
                        <Briefcase size={16} className="text-slate-400" />
                        <span>{persona.incomeLevel}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-600">
                        <Target size={16} className="text-slate-400" />
                        <span>{region || "Global Market"}</span>
                      </div>
                    </div>

                    <div className="mt-4 bg-slate-50 p-4 rounded-lg border border-slate-100 italic text-slate-600 relative">
                      <Quote
                        size={20}
                        className="absolute -top-2 -left-2 text-indigo-200 fill-current"
                      />
                      "{persona.bio}"
                    </div>
                  </div>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Motivations & Goals */}
                <div className="minimal-card p-6 flex flex-col h-full">
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="text-emerald-500" size={20} />
                    <h4 className="font-bold text-slate-900 uppercase tracking-wide text-xs">
                      Motivations & Goals
                    </h4>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <span className="text-xs font-semibold text-slate-500 mb-2 block">
                        Goals
                      </span>
                      <ul className="space-y-2">
                        {persona.goals.map((g, i) => (
                          <li
                            key={i}
                            className="flex gap-2 text-sm text-slate-700"
                          >
                            <span className="text-emerald-500 mt-1">•</span> {g}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-slate-500 mb-2 block">
                        Core Motivations
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {persona.motivations.map((m, i) => (
                          <span
                            key={i}
                            className="bg-emerald-50 text-emerald-700 text-xs px-2.5 py-1 rounded-md font-medium border border-emerald-100"
                          >
                            {m}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Frustrations */}
                <div className="minimal-card p-6 flex flex-col h-full">
                  <div className="flex items-center gap-2 mb-4">
                    <AlertCircle className="text-red-500" size={20} />
                    <h4 className="font-bold text-slate-900 uppercase tracking-wide text-xs">
                      Pain Points
                    </h4>
                  </div>
                  <ul className="space-y-3">
                    {persona.frustrations.map((f, i) => (
                      <li
                        key={i}
                        className="bg-red-50 border border-red-100 p-3 rounded-lg text-sm text-red-800"
                      >
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Channels */}
                <div className="minimal-card p-6 md:col-span-2">
                  <h4 className="font-bold text-slate-900 uppercase tracking-wide text-xs mb-4">
                    Preferred Channels
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {persona.preferredChannels.map((channel, i) => (
                      <div
                        key={i}
                        className="bg-slate-100 text-slate-700 px-4 py-2 rounded-full text-sm font-semibold border border-slate-200"
                      >
                        {channel}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};