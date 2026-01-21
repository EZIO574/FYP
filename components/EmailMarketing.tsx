import React, { useState } from "react";
import { EmailCampaign } from "../types";
import { Mail, Send, Plus, Clock, X } from "lucide-react";

const mockCampaigns: EmailCampaign[] = [
  {
    id: "1",
    name: "October Newsletter",
    subject: "Trends in 2024",
    status: "Sent",
    sentCount: 1250,
    openRate: 24.5,
  },
  {
    id: "2",
    name: "Product Launch",
    subject: "Introducing AutoMarketer",
    status: "Draft",
    sentCount: 0,
    openRate: 0,
  },
  {
    id: "3",
    name: "Webinar Invite",
    subject: "Join us live!",
    status: "Scheduled",
    sentCount: 0,
    openRate: 0,
    scheduledDate: "2023-10-28",
  },
];

export const EmailMarketing: React.FC = () => {
  const [campaigns, setCampaigns] = useState<EmailCampaign[]>(mockCampaigns);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCampaign, setNewCampaign] = useState({ name: "", subject: "" });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const campaign: EmailCampaign = {
      id: Date.now().toString(),
      name: newCampaign.name,
      subject: newCampaign.subject,
      status: "Draft",
      sentCount: 0,
      openRate: 0,
    };
    setCampaigns([campaign, ...campaigns]);
    setNewCampaign({ name: "", subject: "" });
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-fade-in relative">
      <div className="flex justify-between items-end pb-2">
        <p className="text-slate-500">Manage bulk email automation.</p>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-lg font-medium transition-colors flex items-center gap-2 text-sm shadow-sm"
        >
          <Plus size={16} /> Create Campaign
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaigns.map((camp) => (
          <div
            key={camp.id}
            className="minimal-card p-6 flex flex-col justify-between hover:shadow-md transition-shadow"
          >
            <div>
              <div className="flex justify-between items-start mb-4">
                <div
                  className={`p-2.5 rounded-lg border ${
                    camp.status === "Sent"
                      ? "bg-emerald-50 border-emerald-100 text-emerald-600"
                      : camp.status === "Scheduled"
                        ? "bg-amber-50 border-amber-100 text-amber-600"
                        : "bg-slate-50 border-slate-100 text-slate-500"
                  }`}
                >
                  {camp.status === "Sent" ? (
                    <Send size={18} />
                  ) : camp.status === "Scheduled" ? (
                    <Clock size={18} />
                  ) : (
                    <Mail size={18} />
                  )}
                </div>
                <span
                  className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase border ${
                    camp.status === "Sent"
                      ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                      : camp.status === "Scheduled"
                        ? "bg-amber-50 text-amber-600 border-amber-100"
                        : "bg-slate-50 text-slate-500 border-slate-100"
                  }`}
                >
                  {camp.status}
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-900 mb-1">
                {camp.name}
              </h3>
              <p className="text-sm text-slate-500 mb-6 truncate">
                {camp.subject}
              </p>
            </div>

            <div>
              <div className="border-t border-slate-100 pt-4 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                    Recipients
                  </p>
                  <p className="text-lg font-bold text-slate-800">
                    {camp.sentCount > 0 ? camp.sentCount : "-"}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                    Open Rate
                  </p>
                  <p className="text-lg font-bold text-slate-800">
                    {camp.openRate > 0 ? `${camp.openRate}%` : "-"}
                  </p>
                </div>
              </div>

              <button className="w-full mt-4 py-2 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-sm font-medium text-slate-600 transition-colors">
                {camp.status === "Draft" ? "Edit Campaign" : "View Report"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create Campaign Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/10 backdrop-blur-sm animate-fade-in p-4">
          <div className="bg-white border border-slate-200 w-full max-w-md p-6 rounded-2xl shadow-xl transform transition-all scale-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-slate-900">
                New Email Campaign
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-900"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  Campaign Name
                </label>
                <input
                  required
                  type="text"
                  className="minimal-input w-full rounded-lg p-3 text-sm"
                  placeholder="e.g. Winter Sale 2024"
                  value={newCampaign.name}
                  onChange={(e) =>
                    setNewCampaign({ ...newCampaign, name: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  Email Subject Line
                </label>
                <input
                  required
                  type="text"
                  className="minimal-input w-full rounded-lg p-3 text-sm"
                  placeholder="Subject..."
                  value={newCampaign.subject}
                  onChange={(e) =>
                    setNewCampaign({ ...newCampaign, subject: e.target.value })
                  }
                />
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
                  Create Draft
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
