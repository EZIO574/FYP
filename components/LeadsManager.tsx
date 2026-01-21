import React, { useState } from "react";
import { Lead } from "../types";
import { analyzeLeadScore } from "../services/geminiService";
import {
  Search,
  Filter,
  RefreshCw,
  Star,
  Loader2,
  X,
  Plus,
} from "lucide-react";

const mockLeads: Lead[] = [
  {
    id: "1",
    name: "Tech Solutions Inc.",
    email: "contact@techsolutions.com",
    source: "LinkedIn Ad",
    status: "New",
    score: 0,
  },
  {
    id: "2",
    name: "Global Ventures",
    email: "info@globalventures.com",
    source: "Website Form",
    status: "Contacted",
    score: 65,
  },
  {
    id: "3",
    name: "StartUp Alpha",
    email: "hello@alpha.io",
    source: "Twitter",
    status: "Qualified",
    score: 88,
  },
];

export const LeadsManager: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const [analyzingId, setAnalyzingId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newLead, setNewLead] = useState({ name: "", email: "", source: "" });

  const handleScoreLead = async (id: string, name: string, source: string) => {
    setAnalyzingId(id);
    const interactions = "Visited pricing page twice, downloaded whitepaper.";
    const result = await analyzeLeadScore({ name, source, interactions });

    setLeads((prev) =>
      prev.map((lead) =>
        lead.id === id
          ? { ...lead, score: result.score, aiAnalysis: result.reason }
          : lead,
      ),
    );
    setAnalyzingId(null);
  };

  const handleAddLead = (e: React.FormEvent) => {
    e.preventDefault();
    const lead: Lead = {
      id: Date.now().toString(),
      name: newLead.name,
      email: newLead.email,
      source: newLead.source,
      status: "New",
      score: 0,
    };
    setLeads([lead, ...leads]);
    setNewLead({ name: "", email: "", source: "" });
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-fade-in relative">
      <div className="flex justify-between items-end pb-2">
        <p className="text-slate-500">AI-powered lead qualification.</p>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2 rounded-lg font-medium transition-colors text-sm flex items-center gap-2"
        >
          <Plus size={16} /> Add Manual Lead
        </button>
      </div>

      <div className="minimal-card overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-100 flex gap-4 bg-slate-50/50">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={16}
            />
            <input
              type="text"
              placeholder="Search leads..."
              className="minimal-input w-full rounded-lg pl-9 pr-4 py-2 text-sm"
            />
          </div>
          <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-600 flex items-center gap-2 hover:bg-slate-50 text-sm">
            <Filter size={16} /> Filter
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-white border-b border-slate-100 text-slate-500 font-semibold uppercase text-xs tracking-wider">
              <tr>
                <th className="px-6 py-4">Lead Name</th>
                <th className="px-6 py-4">Source</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">AI Score</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {leads.map((lead) => (
                <tr
                  key={lead.id}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-900">
                      {lead.name}
                    </div>
                    <div className="text-xs text-slate-500">{lead.email}</div>
                  </td>
                  <td className="px-6 py-4">{lead.source}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold 
                      ${
                        lead.status === "New"
                          ? "bg-blue-50 text-blue-600"
                          : lead.status === "Qualified"
                            ? "bg-emerald-50 text-emerald-600"
                            : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {lead.score > 0 ? (
                        <div
                          className={`text-base font-bold ${lead.score > 70 ? "text-emerald-600" : lead.score > 40 ? "text-amber-500" : "text-rose-500"}`}
                        >
                          {lead.score}
                        </div>
                      ) : (
                        <span className="text-slate-400">-</span>
                      )}
                      {lead.aiAnalysis && (
                        <div className="group relative">
                          <Star
                            size={14}
                            className="text-slate-400 hover:text-indigo-500 cursor-help"
                          />
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-3 bg-white text-xs text-slate-600 rounded-lg shadow-xl border border-slate-100 hidden group-hover:block z-10">
                            {lead.aiAnalysis}
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {analyzingId === lead.id ? (
                      <Loader2
                        className="animate-spin text-indigo-600 ml-auto"
                        size={18}
                      />
                    ) : (
                      <button
                        onClick={() =>
                          handleScoreLead(lead.id, lead.name, lead.source)
                        }
                        className="text-slate-500 hover:text-indigo-600 font-medium text-xs flex items-center gap-1 ml-auto hover:bg-indigo-50 px-2 py-1 rounded transition-colors"
                      >
                        <RefreshCw size={14} /> Analyze
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Lead Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/10 backdrop-blur-sm animate-fade-in p-4">
          <div className="bg-white border border-slate-200 w-full max-w-md p-6 rounded-2xl shadow-xl transform transition-all scale-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-slate-900">Add New Lead</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-900"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddLead} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  Lead Name
                </label>
                <input
                  required
                  type="text"
                  className="minimal-input w-full rounded-lg p-3 text-sm"
                  placeholder="Enter full name"
                  value={newLead.name}
                  onChange={(e) =>
                    setNewLead({ ...newLead, name: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  Email
                </label>
                <input
                  required
                  type="email"
                  className="minimal-input w-full rounded-lg p-3 text-sm"
                  placeholder="email@example.com"
                  value={newLead.email}
                  onChange={(e) =>
                    setNewLead({ ...newLead, email: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  Source
                </label>
                <select
                  className="minimal-input w-full rounded-lg p-3 text-sm appearance-none"
                  value={newLead.source}
                  onChange={(e) =>
                    setNewLead({ ...newLead, source: e.target.value })
                  }
                >
                  <option value="">Select Source</option>
                  <option value="LinkedIn">LinkedIn</option>
                  <option value="Website">Website</option>
                  <option value="Referral">Referral</option>
                  <option value="Cold Call">Cold Call</option>
                </select>
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-2.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium text-sm transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-lg bg-slate-900 text-white hover:bg-slate-800 font-medium text-sm transition-all"
                >
                  Add Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
