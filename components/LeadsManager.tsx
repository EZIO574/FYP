import React, { useState } from "react";
import { Lead } from "@/types";
import { analyzeLeadScore } from "@/services/geminiService";
import {
  Search,
  Filter,
  RefreshCw,
  Star,
  Loader2,
  Plus,
  ArrowRight,
  Mail,
  MoreVertical,
} from "lucide-react";
import { Modal } from "@/components/common/Modal";

const mockLeads: Lead[] = [
  {
    id: "1",
    name: "Enterprise Solutions Ltd.",
    email: "contact@enterprise-sol.com",
    source: "Google Search",
    status: "New",
    score: 0,
  },
  {
    id: "2",
    name: "Growth Partners Group",
    email: "info@growth-partners.io",
    source: "LinkedIn Inbound",
    status: "Contacted",
    score: 68,
  },
  {
    id: "3",
    name: "Capital One Finance",
    email: "outreach@capitalone.com",
    source: "Direct Referral",
    status: "Qualified",
    score: 92,
  },
];

export const LeadsManager: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const [analyzingId, setAnalyzingId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newLead, setNewLead] = useState({ name: "", email: "", source: "" });
  const [searchTerm, setSearchTerm] = useState("");

  const handleScoreLead = async (id: string, name: string, source: string) => {
    setAnalyzingId(id);
    const interactions =
      "Analyzed public company records and recent funding rounds.";
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

  const filteredLeads = leads.filter(
    (l) =>
      l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="flex flex-col animate-fade-in pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 pb-6 border-b border-slate-200 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Lead Management</h2>
          <p className="text-slate-500 text-sm mt-1">
            Track and qualify potential sales prospects with AI intelligence
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 transition-all shadow-sm"
        >
          <Plus size={18} />
          Add New Lead
        </button>
      </div>

      {/* Main Table Card */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
        {/* Table Toolbar */}
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search
              size={16}
              className="absolute left-3 top-2.5 text-slate-400"
            />
            <input
              type="text"
              placeholder="Search leads by name or email..."
              className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-xs font-bold text-slate-600 flex items-center gap-2 hover:bg-slate-50 transition-colors">
            <Filter size={16} /> Filter Results
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] tracking-widest border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">Company / Lead</th>
                <th className="px-6 py-4">Acquisition Source</th>
                <th className="px-6 py-4">Current Status</th>
                <th className="px-6 py-4 text-center">Lead Score</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLeads.map((lead) => (
                <tr
                  key={lead.id}
                  className="hover:bg-slate-50/80 transition-colors group"
                >
                  <td className="px-6 py-5">
                    <div className="font-bold text-slate-900">{lead.name}</div>
                    <div className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                      <Mail size={12} className="text-slate-400" /> {lead.email}
                    </div>
                  </td>
                  <td className="px-6 py-5 text-slate-600 font-medium">
                    {lead.source}
                  </td>
                  <td className="px-6 py-5">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border ${
                        lead.status === "Qualified"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                          : lead.status === "New"
                            ? "bg-blue-50 text-blue-700 border-blue-100"
                            : "bg-slate-50 text-slate-500 border-slate-200"
                      }`}
                    >
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center justify-center gap-2">
                      {analyzingId === lead.id ? (
                        <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                      ) : lead.score > 0 ? (
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-lg font-bold ${
                              lead.score >= 80
                                ? "text-emerald-500"
                                : lead.score >= 50
                                  ? "text-amber-500"
                                  : "text-slate-400"
                            }`}
                          >
                            {lead.score}
                          </span>
                          {lead.aiAnalysis && (
                            <div className="group relative">
                              <Star
                                size={14}
                                className="text-amber-400 fill-amber-400 cursor-help"
                              />
                              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-slate-900 text-white rounded-lg text-[10px] font-medium invisible group-hover:visible shadow-xl z-10 border border-slate-700 animate-fade-in">
                                <p className="font-bold text-blue-400 uppercase tracking-widest mb-1.5 border-b border-slate-700 pb-1">
                                  AI Intelligence Insight
                                </p>
                                {lead.aiAnalysis}
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <button
                          onClick={() =>
                            handleScoreLead(lead.id, lead.name, lead.source)
                          }
                          className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                          title="Run AI Qualification"
                        >
                          <RefreshCw size={16} />
                        </button>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button className="text-slate-400 hover:text-slate-600 p-2 rounded-lg hover:bg-slate-100 transition-colors">
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Register New Sales Lead"
      >
        <form onSubmit={handleAddLead} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase">
              Organization Name
            </label>
            <input
              required
              type="text"
              className="w-full p-3 bg-white border border-slate-300 rounded-lg text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              placeholder="e.g. Acme Corp"
              value={newLead.name}
              onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase">
              Primary Email
            </label>
            <input
              required
              type="email"
              className="w-full p-3 bg-white border border-slate-300 rounded-lg text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              placeholder="lead@company.com"
              value={newLead.email}
              onChange={(e) =>
                setNewLead({ ...newLead, email: e.target.value })
              }
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase">
              Referral Source
            </label>
            <select
              className="w-full p-3 bg-white border border-slate-300 rounded-lg text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              value={newLead.source}
              onChange={(e) =>
                setNewLead({ ...newLead, source: e.target.value })
              }
            >
              <option value="">Select Inbound Source</option>
              <option value="Direct Search">Google / Direct Search</option>
              <option value="LinkedIn Inbound">LinkedIn Social</option>
              <option value="Website Form">Corporate Website</option>
              <option value="Partner Referral">Business Partner</option>
            </select>
          </div>
          <div className="pt-4 flex gap-3">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="flex-1 py-2.5 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-50 font-bold text-sm transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-bold text-sm transition-colors shadow-sm"
            >
              Register Lead
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
