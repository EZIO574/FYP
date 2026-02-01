import React, { useState } from "react";
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Play,
  Pause,
  CheckCircle,
  Clock,
  AlertCircle,
  Target,
  DollarSign,
  Calendar,
  Activity,
  MousePointerClick,
  Eye,
} from "lucide-react";
import { Modal } from "@/components/common/Modal";
import { Button } from "@/components/common/Button";
import { Input } from "@/components/common/Input";
import { Select } from "@/components/common/Select";

interface Campaign {
  id: string;
  name: string;
  status: "active" | "paused" | "completed" | "draft";
  platform: "Facebook" | "Google" | "Instagram" | "LinkedIn" | "Email";
  budget: number;
  spent: number;
  clicks: number;
  impressions: number;
  startDate: string;
}

const mockCampaigns: Campaign[] = [
  {
    id: "1",
    name: "Summer Sale 2024",
    status: "active",
    platform: "Facebook",
    budget: 5000,
    spent: 2340,
    clicks: 1250,
    impressions: 45000,
    startDate: "2024-06-01",
  },
  {
    id: "2",
    name: "Enterprise Launch",
    status: "active",
    platform: "LinkedIn",
    budget: 10000,
    spent: 1500,
    clicks: 450,
    impressions: 12000,
    startDate: "2024-06-15",
  },
  {
    id: "3",
    name: "Q3 Awareness",
    status: "paused",
    platform: "Google",
    budget: 15000,
    spent: 8900,
    clicks: 3400,
    impressions: 89000,
    startDate: "2024-05-15",
  },
  {
    id: "4",
    name: "Newsletter Signup",
    status: "draft",
    platform: "Email",
    budget: 1000,
    spent: 0,
    clicks: 0,
    impressions: 0,
    startDate: "2024-07-01",
  },
  {
    id: "5",
    name: "Social Retargeting",
    status: "completed",
    platform: "Instagram",
    budget: 3000,
    spent: 2950,
    clicks: 980,
    impressions: 32000,
    startDate: "2024-04-01",
  },
];

export const CampaignManager: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>(mockCampaigns);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    platform: "Facebook",
    budget: "",
    status: "draft",
    startDate: new Date().toISOString().split("T")[0],
  });

  const handleCreateCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    const newCampaign: Campaign = {
      id: Date.now().toString(),
      name: formData.name || "Untitled Campaign",
      platform: formData.platform as any,
      status: formData.status as any,
      budget: Number(formData.budget) || 0,
      spent: 0,
      clicks: 0,
      impressions: 0,
      startDate: formData.startDate,
    };

    setCampaigns([newCampaign, ...campaigns]);
    setIsModalOpen(false);
    setFormData({
      name: "",
      platform: "Facebook",
      budget: "",
      status: "draft",
      startDate: new Date().toISOString().split("T")[0],
    });
  };

  const filteredCampaigns = campaigns.filter((campaign) => {
    return (
      (filter === "all" || campaign.status === filter) &&
      campaign.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const getStatusConfig = (status: string) => {
    const configs: Record<
      string,
      { bg: string; text: string; icon: React.ReactNode }
    > = {
      active: {
        bg: "bg-emerald-50",
        text: "text-emerald-700",
        icon: <Play size={12} className="fill-current" />,
      },
      paused: {
        bg: "bg-amber-50",
        text: "text-amber-700",
        icon: <Pause size={12} className="fill-current" />,
      },
      completed: {
        bg: "bg-blue-50",
        text: "text-blue-700",
        icon: <CheckCircle size={12} />,
      },
      draft: {
        bg: "bg-slate-50",
        text: "text-slate-600",
        icon: <Clock size={12} />,
      },
    };
    return (
      configs[status] || {
        bg: "bg-slate-50",
        text: "text-slate-600",
        icon: <AlertCircle size={12} />,
      }
    );
  };

  return (
    <div className="space-y-6 animate-fade-in relative pb-10">
      {/* Header Controls */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
        <div className="relative flex-1 max-w-md">
          <Input
            placeholder="Search campaigns..."
            icon={<Search size={18} className="text-slate-400" />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full !bg-white !border-slate-200 !rounded-lg !py-2.5 !pl-10 !text-slate-900 shadow-sm"
          />
        </div>
        <div className="flex items-center gap-3">
          <select
            className="bg-white border border-slate-200 text-slate-600 text-sm font-medium rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer shadow-sm"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">Every Channel</option>
            <option value="active">Active Only</option>
            <option value="paused">Paused Only</option>
            <option value="completed">Completed Only</option>
            <option value="draft">Drafts Only</option>
          </select>
          <Button
            onClick={() => setIsModalOpen(true)}
            variant="primary"
            icon={<Plus size={18} />}
            className="!bg-blue-600 hover:!bg-blue-700 text-white font-semibold rounded-lg px-5 shadow-sm"
          >
            New Campaign
          </Button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Allocated Budget",
            value: `$${campaigns.reduce((acc, c) => acc + c.budget, 0).toLocaleString()}`,
            change: "12%",
            positive: true,
            icon: <DollarSign size={18} />,
            color: "text-blue-600",
            bg: "bg-blue-50",
          },
          {
            label: "Total Spent",
            value: `$${campaigns.reduce((acc, c) => acc + c.spent, 0).toLocaleString()}`,
            change: "8%",
            positive: false,
            icon: <Activity size={18} />,
            color: "text-blue-600",
            bg: "bg-blue-50",
          },
          {
            label: "Clicks Received",
            value: campaigns
              .reduce((acc, c) => acc + c.clicks, 0)
              .toLocaleString(),
            change: "5%",
            positive: true,
            icon: <MousePointerClick size={18} />,
            color: "text-blue-600",
            bg: "bg-blue-50",
          },
          {
            label: "Impressions",
            value: campaigns
              .reduce((acc, c) => acc + c.impressions, 0)
              .toLocaleString(),
            change: "15%",
            positive: true,
            icon: <Eye size={18} />,
            color: "text-blue-600",
            bg: "bg-blue-50",
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-sm transition-shadow group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`p-2 ${stat.bg} ${stat.color} rounded-lg`}>
                {stat.icon}
              </div>
              <div
                className={`flex items-center gap-0.5 text-xs font-bold ${
                  stat.positive
                    ? "text-emerald-600 bg-emerald-50"
                    : "text-amber-600 bg-amber-50"
                } px-2 py-0.5 rounded-md`}
              >
                {stat.change}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 leading-none">
                {stat.value}
              </h3>
              <p className="text-slate-500 text-xs font-medium mt-1 uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Campaigns Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 font-semibold uppercase text-xs tracking-wider">
              <tr>
                <th className="px-6 py-4">Campaign Name</th>
                <th className="px-6 py-4">Platform</th>
                <th className="px-6 py-4">Budget Progress</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Performance</th>
                <th className="px-6 py-4 text-right">Settings</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCampaigns.map((campaign) => {
                const cfg = getStatusConfig(campaign.status);
                return (
                  <tr
                    key={campaign.id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <p className="font-semibold text-slate-900">
                        {campaign.name}
                      </p>
                      <p className="text-xs text-slate-500">
                        Start:{" "}
                        {new Date(campaign.startDate).toLocaleDateString()}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
                        {campaign.platform}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1 w-32">
                        <div className="flex justify-between text-xs font-bold text-slate-700">
                          <span>${campaign.spent.toLocaleString()}</span>
                          <span className="text-slate-400">
                            / ${campaign.budget.toLocaleString()}
                          </span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-600"
                            style={{
                              width: `${campaign.budget > 0 ? (campaign.spent / campaign.budget) * 100 : 0}%`,
                            }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${cfg.bg} ${cfg.text}`}
                      >
                        {cfg.icon}
                        <span className="capitalize">{campaign.status}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-xs text-center space-y-0.5">
                        <p className="text-slate-900 font-bold">
                          {campaign.clicks.toLocaleString()} clicks
                        </p>
                        <p className="text-slate-500 font-medium">
                          {campaign.impressions.toLocaleString()} views
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-slate-400 hover:text-slate-600 p-2 hover:bg-slate-100 rounded-lg transition-colors">
                        <MoreHorizontal size={18} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {filteredCampaigns.length === 0 && (
          <div className="py-20 text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-slate-50 flex items-center justify-center text-slate-300 mb-4">
              <Search size={32} />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-1">
              Search yielded zero results
            </h3>
            <p className="text-slate-500 text-sm">
              Try adjusting your filters or search terms
            </p>
          </div>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Setup Marketing Campaign"
        maxWidth="max-w-lg"
      >
        <form onSubmit={handleCreateCampaign} className="space-y-4">
          <Input
            label="Campaign Name"
            required
            placeholder="e.g. Q4 Growth Initiative"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="!bg-white !border-slate-300 !text-slate-900"
          />

          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Platform Channel"
              value={formData.platform}
              onChange={(e) =>
                setFormData({ ...formData, platform: e.target.value as any })
              }
              options={[
                { label: "Facebook Ads", value: "Facebook" },
                { label: "Google Search", value: "Google" },
                { label: "Instagram", value: "Instagram" },
                { label: "LinkedIn Ads", value: "LinkedIn" },
                { label: "Email Marketing", value: "Email" },
              ]}
              className="!bg-white !border-slate-300 !text-slate-900"
            />
            <Select
              label="Initial Status"
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value as any })
              }
              options={[
                { label: "Draft Only", value: "draft" },
                { label: "Active Start", value: "active" },
                { label: "Start Paused", value: "paused" },
              ]}
              className="!bg-white !border-slate-300 !text-slate-900"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Allocated Budget"
              type="number"
              min="0"
              required
              placeholder="e.g. 1000"
              value={formData.budget}
              onChange={(e) =>
                setFormData({ ...formData, budget: e.target.value })
              }
              className="!bg-white !border-slate-300 !text-slate-900"
            />
            <Input
              label="Campaign Launch Date"
              type="date"
              required
              value={formData.startDate}
              onChange={(e) =>
                setFormData({ ...formData, startDate: e.target.value })
              }
              className="!bg-white !border-slate-300 !text-slate-900"
            />
          </div>
          <div className="pt-6 flex gap-3">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="flex-1 px-4 py-2.5 rounded-lg border border-slate-300 text-slate-600 font-semibold hover:bg-slate-50 transition-colors"
            >
              Discard
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2.5 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors shadow-sm"
            >
              Launch Campaign
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
