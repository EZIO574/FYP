import React, { useState } from "react";
import { EmailCampaign } from "@/types";
import {
  Mail,
  Send,
  Plus,
  Clock,
  Calendar,
  Play,
  MoreHorizontal,
  BarChart2,
} from "lucide-react";
import { Modal } from "@/components/common/Modal";
import { Input } from "@/components/common/Input";
import { Button } from "@/components/common/Button";

const mockCampaigns: EmailCampaign[] = [
  {
    id: "1",
    name: "Q4 Quarterly Newsletter",
    subject: "Emerging Market Trends in 2024",
    status: "Sent",
    sentCount: 1250,
    openRate: 24.5,
  },
  {
    id: "2",
    name: "Product Feature Announcement",
    subject: "Seamless AI Integration has arrived",
    status: "Draft",
    sentCount: 0,
    openRate: 0,
  },
  {
    id: "3",
    name: "Customer Success Webinar",
    subject: "Scale your marketing with AutoMarketer",
    status: "Scheduled",
    sentCount: 0,
    openRate: 0,
    scheduledDate: "2023-11-15",
  },
];

export const EmailMarketing: React.FC = () => {
  const [campaigns, setCampaigns] = useState<EmailCampaign[]>(mockCampaigns);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);

  // Form States
  const [newCampaign, setNewCampaign] = useState({ name: "", subject: "" });
  const [scheduleData, setScheduleData] = useState({ id: "", date: "" });

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
    setIsCreateModalOpen(false);
  };

  const openScheduleModal = (id: string) => {
    setScheduleData({ id, date: "" });
    setIsScheduleModalOpen(true);
  };

  const handleScheduleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!scheduleData.id || !scheduleData.date) return;

    setCampaigns((prev) =>
      prev.map((c) => {
        if (c.id === scheduleData.id) {
          return {
            ...c,
            status: "Scheduled",
            scheduledDate: scheduleData.date,
          };
        }
        return c;
      }),
    );
    setIsScheduleModalOpen(false);
  };

  const handleSendNow = (id: string) => {
    setCampaigns((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          return {
            ...c,
            status: "Sent",
            scheduledDate: undefined,
            sentCount: Math.floor(Math.random() * 2000) + 500,
            openRate: parseFloat((Math.random() * 20 + 15).toFixed(1)),
          };
        }
        return c;
      }),
    );
  };

  return (
    <div className="flex flex-col animate-fade-in pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 pb-6 border-b border-slate-200 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Email Marketing</h2>
          <p className="text-slate-500 text-sm mt-1">
            Build and deploy professional email campaigns to your prospects
          </p>
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 transition-all shadow-sm"
        >
          <Plus size={18} />
          Create Campaign
        </button>
      </div>

      {/* Campaign Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaigns.map((camp) => (
          <div
            key={camp.id}
            className="bg-white border border-slate-200 p-8 rounded-xl shadow-sm flex flex-col hover:border-blue-300 transition-all group"
          >
            <div className="flex justify-between items-start mb-6">
              <div
                className={`p-3 rounded-lg border transition-colors ${
                  camp.status === "Sent"
                    ? "bg-emerald-50 border-emerald-100 text-emerald-600"
                    : camp.status === "Scheduled"
                      ? "bg-blue-50 border-blue-100 text-blue-600"
                      : "bg-slate-50 border-slate-100 text-slate-400"
                }`}
              >
                {camp.status === "Sent" ? (
                  <Send size={22} />
                ) : camp.status === "Scheduled" ? (
                  <Clock size={22} />
                ) : (
                  <Mail size={22} />
                )}
              </div>
              <span
                className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                  camp.status === "Sent"
                    ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                    : camp.status === "Scheduled"
                      ? "bg-blue-50 text-blue-700 border-blue-100"
                      : "bg-slate-50 text-slate-500 border-slate-200"
                }`}
              >
                {camp.status}
              </span>
            </div>

            <h3 className="text-lg font-bold text-slate-900 mb-1 leading-tight">
              {camp.name}
            </h3>
            <p className="text-sm text-slate-500 italic mb-6 line-clamp-1">
              {camp.subject}
            </p>

            {camp.scheduledDate && (
              <div className="bg-blue-50 text-blue-700 px-3 py-2 rounded-lg border border-blue-100 flex items-center gap-2 mb-6">
                <Calendar size={14} />
                <span className="text-[10px] font-bold uppercase">
                  Scheduled: {camp.scheduledDate}
                </span>
              </div>
            )}

            <div className="mt-auto pt-6 border-t border-slate-100">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                    Recipients
                  </p>
                  <p className="text-xl font-bold text-slate-900">
                    {camp.sentCount > 0 ? camp.sentCount.toLocaleString() : "—"}
                  </p>
                </div>
                <div>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                    Open Rate
                  </p>
                  <p className="text-xl font-bold text-slate-900">
                    {camp.openRate > 0 ? `${camp.openRate}%` : "—"}
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                {camp.status === "Draft" && (
                  <>
                    <button
                      onClick={() => openScheduleModal(camp.id)}
                      className="flex-1 py-2 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-50 text-xs font-bold transition-colors"
                    >
                      Schedule
                    </button>
                    <button
                      onClick={() => handleSendNow(camp.id)}
                      className="flex-1 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 text-xs font-bold transition-colors"
                    >
                      Send Now
                    </button>
                  </>
                )}
                {camp.status === "Scheduled" && (
                  <button
                    onClick={() => handleSendNow(camp.id)}
                    className="flex-1 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 text-xs font-bold transition-colors flex items-center justify-center gap-2"
                  >
                    <Play size={14} /> Send Now
                  </button>
                )}
                {camp.status === "Sent" && (
                  <button className="flex-1 py-2 rounded-lg border border-slate-200 text-slate-500 hover:text-blue-600 hover:bg-blue-50 text-xs font-bold transition-colors flex items-center justify-center gap-2">
                    <BarChart2 size={14} /> View Report
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create New Campaign"
      >
        <form onSubmit={handleCreate} className="space-y-4">
          <Input
            label="Internal Campaign Name"
            required
            placeholder="e.g. October Feature Update"
            value={newCampaign.name}
            onChange={(e) =>
              setNewCampaign({ ...newCampaign, name: e.target.value })
            }
            className="!bg-white !border-slate-300"
          />
          <Input
            label="Email Subject Line"
            required
            placeholder="What will users see in their inbox?"
            value={newCampaign.subject}
            onChange={(e) =>
              setNewCampaign({ ...newCampaign, subject: e.target.value })
            }
            className="!bg-white !border-slate-300"
          />
          <div className="pt-4 flex gap-3">
            <button
              type="button"
              onClick={() => setIsCreateModalOpen(false)}
              className="flex-1 py-2.5 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-50 font-bold text-sm transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-bold text-sm transition-colors shadow-sm"
            >
              Create Campaign
            </button>
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        title="Schedule Campaign"
      >
        <form onSubmit={handleScheduleConfirm} className="space-y-5">
          <Input
            label="Dispatch Date"
            type="date"
            required
            value={scheduleData.date}
            onChange={(e) =>
              setScheduleData({ ...scheduleData, date: e.target.value })
            }
            className="!bg-white !border-slate-300"
          />
          <div className="pt-2 flex gap-3">
            <button
              type="button"
              onClick={() => setIsScheduleModalOpen(false)}
              className="flex-1 py-2.5 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-50 font-bold text-sm transition-colors"
            >
              Discard
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-bold text-sm transition-colors shadow-sm"
            >
              Confirm Schedule
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
