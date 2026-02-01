import React, { useState } from "react";
import { generateAudiencePersona } from "@/services/geminiService";
import { Persona } from "@/types";
import {
  User,
  Loader2,
  Target,
  Briefcase,
  TrendingUp,
  AlertCircle,
  Quote,
  MapPin,
  Circle,
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
    <div className="flex flex-col animate-fade-in pb-10">
      {/* Header */}
      <div className="mb-8 pb-6 border-b border-slate-200">
        <h2 className="text-2xl font-bold text-slate-900">
          Audience Persona Builder
        </h2>
        <p className="text-slate-500 text-sm mt-1">
          Generate detailed buyer personas based on your market and product
          profile
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Input Card */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Product or Brand Name
              </label>
              <input
                type="text"
                className="w-full p-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-slate-900 text-sm outline-none transition-all"
                placeholder="e.g. EcoSmart Home Hub"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Industry Sector
              </label>
              <input
                type="text"
                className="w-full p-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-slate-900 text-sm outline-none transition-all"
                placeholder="e.g. Smart Home / Green Energy"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Target Region (Optional)
              </label>
              <div className="relative">
                <MapPin
                  size={16}
                  className="absolute left-3 top-3.5 text-slate-400"
                />
                <input
                  type="text"
                  className="w-full p-3 pl-10 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-slate-900 text-sm outline-none transition-all"
                  placeholder="e.g. Western Europe, USA"
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                />
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading || !productName || !industry}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold text-sm transition-colors flex items-center justify-center gap-2 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <User size={20} />
              )}
              {loading ? "Analyzing Market..." : "Generate Persona"}
            </button>
          </div>

          <div className="bg-blue-50 border border-blue-100 p-5 rounded-xl">
            <div className="flex items-start gap-4">
              <div className="bg-blue-600 p-2.5 rounded-lg text-white">
                <Target size={20} />
              </div>
              <div>
                <h4 className="font-bold text-blue-900 text-sm mb-1">
                  Strategic Advantage
                </h4>
                <p className="text-blue-700/80 text-xs leading-relaxed">
                  Deeply understand buyer pain points and triggers to optimize
                  your marketing engagement strategies.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Output Section */}
        <div className="lg:col-span-8">
          {loading ? (
            <div className="bg-white border border-slate-200 rounded-xl p-20 flex flex-col items-center justify-center text-center shadow-sm">
              <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-6"></div>
              <h3 className="text-xl font-bold text-slate-900">
                Drafting Profile...
              </h3>
              <p className="text-sm text-slate-500 mt-2">
                Our AI is synthesizing a detailed behavioral analysis of your
                target audience.
              </p>
            </div>
          ) : !persona ? (
            <div className="bg-white border-2 border-dashed border-slate-200 rounded-xl p-20 text-center flex flex-col items-center justify-center">
              <div className="w-20 h-20 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 text-slate-300">
                <User size={40} />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                No Persona Selected
              </h3>
              <p className="text-sm text-slate-500 mt-2 max-w-sm mx-auto">
                Fill in the product and industry details to the left to generate
                a high-fidelity buyer persona.
              </p>
            </div>
          ) : (
            <div className="space-y-6 animate-fade-in">
              {/* Profile Card */}
              <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden border-t-4 border-t-blue-600">
                <div className="p-8 sm:p-10 relative">
                  <div className="flex flex-col sm:flex-row gap-8 items-start">
                    <div className="w-24 h-24 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-4xl font-bold shadow-lg shadow-blue-200 shrink-0">
                      {persona.name.charAt(0)}
                    </div>
                    <div className="flex-1 space-y-4">
                      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                        <div>
                          <h3 className="text-3xl font-bold text-slate-900 leading-tight">
                            {persona.name}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-blue-600 font-bold text-sm">
                              {persona.occupation}
                            </span>
                            <span className="text-slate-300">•</span>
                            <span className="text-slate-500 text-sm">
                              {persona.ageRange} Years Old
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end text-xs font-bold text-slate-400 uppercase tracking-widest gap-2">
                          <span className="bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
                            {persona.incomeLevel}
                          </span>
                        </div>
                      </div>

                      <div className="bg-slate-50 border border-slate-100 p-5 rounded-xl relative italic text-slate-600">
                        <Quote
                          size={20}
                          className="absolute -top-2 -left-2 text-blue-200 fill-current"
                        />
                        "{persona.bio}"
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Detail Grids */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-emerald-100 p-2 rounded-lg text-emerald-600">
                      <TrendingUp size={18} />
                    </div>
                    <h4 className="font-bold text-slate-900 text-sm">
                      Goals & Motivations
                    </h4>
                  </div>
                  <ul className="space-y-3">
                    {persona.goals.map((g, i) => (
                      <li
                        key={i}
                        className="flex gap-3 text-sm text-slate-600 items-start"
                      >
                        <Circle
                          size={8}
                          className="text-emerald-500 shrink-0 mt-1.5 fill-current"
                        />
                        <span>{g}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-slate-100">
                    {persona.motivations.map((m, i) => (
                      <span
                        key={i}
                        className="bg-emerald-50 text-emerald-700 text-[10px] px-2.5 py-1 rounded-full font-bold border border-emerald-100 uppercase tracking-wider"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-red-100 p-2 rounded-lg text-red-600">
                      <AlertCircle size={18} />
                    </div>
                    <h4 className="font-bold text-slate-900 text-sm">
                      Pain Points & Obstacles
                    </h4>
                  </div>
                  <div className="space-y-3">
                    {persona.frustrations.map((f, i) => (
                      <div
                        key={i}
                        className="p-3 bg-red-50/50 border border-red-100 rounded-lg text-sm text-slate-600"
                      >
                        {f}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm md:col-span-2">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                    Preferred Channels
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {persona.preferredChannels.map((channel, i) => (
                      <div
                        key={i}
                        className="px-4 py-2 bg-slate-50 text-slate-700 rounded-lg text-xs font-bold border border-slate-200 hover:border-blue-300 hover:text-blue-600 transition-all cursor-default"
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
