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
} from "lucide-react";

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
    name: "Product Launch - GenAI Tool",
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
    name: "Q3 Brand Awareness",
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
    name: "Retargeting Campaign",
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
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-emerald-50 text-emerald-600 border-emerald-200";
      case "paused":
        return "bg-amber-50 text-amber-600 border-amber-200";
      case "completed":
        return "bg-blue-50 text-blue-600 border-blue-200";
      case "draft":
        return "bg-slate-100 text-slate-500 border-slate-200";
      default:
        return "bg-slate-100 text-slate-500 border-slate-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <Play size={14} className="fill-current" />;
      case "paused":
        return <Pause size={14} className="fill-current" />;
      case "completed":
        return <CheckCircle size={14} />;
      case "draft":
        return <Clock size={14} />;
      default:
        return <AlertCircle size={14} />;
    }
  };

  const filteredCampaigns = mockCampaigns.filter((campaign) => {
    const matchesFilter = filter === "all" || campaign.status === filter;
    const matchesSearch = campaign.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div className="relative flex-1 w-full md:w-auto max-w-md">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search campaigns..."
            className="minimal-input w-full pl-10 pr-4 py-2.5 text-sm rounded-lg focus:ring-2 focus:ring-indigo-500/20"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <select
            className="minimal-input px-4 py-2.5 text-sm w-full md:w-auto cursor-pointer rounded-lg"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="paused">Paused</option>
            <option value="completed">Completed</option>
            <option value="draft">Drafts</option>
          </select>
          <button className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2 transition-all shadow-sm whitespace-nowrap">
            <Plus size={18} />
            Create Campaign
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          {
            label: "Total Budget",
            value: "$34,000",
            change: "+12%",
            isPositive: true,
          },
          {
            label: "Total Spend",
            value: "$15,690",
            change: "+8%",
            isPositive: true,
          },
          {
            label: "Avg. CPA",
            value: "$12.50",
            change: "-5%",
            isPositive: false,
          },
          {
            label: "Conversions",
            value: "1,250",
            change: "+15%",
            isPositive: true,
          },
        ].map((stat, i) => (
          <div key={i} className="minimal-card p-5">
            <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-2">
              {stat.label}
            </p>
            <h3 className="text-2xl font-bold text-slate-900 mb-1">
              {stat.value}
            </h3>
            <p
              className={`text-xs font-medium ${stat.isPositive ? "text-emerald-600" : "text-red-500"}`}
            >
              {stat.change}{" "}
              <span className="text-slate-400">vs last month</span>
            </p>
          </div>
        ))}
      </div>

      {/* Campaigns List */}
      <div className="minimal-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-slate-500 font-semibold border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Campaign Name</th>
                <th className="px-6 py-4">Platform</th>
                <th className="px-6 py-4">Budget / Spend</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Performance</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCampaigns.map((campaign) => (
                <tr
                  key={campaign.id}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <p className="font-semibold text-slate-900 mb-0.5">
                      {campaign.name}
                    </p>
                    <p className="text-xs text-slate-500">
                      {new Date(campaign.startDate).toLocaleDateString()}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-medium text-slate-600">
                      {campaign.platform}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-slate-900 font-medium">
                        ${campaign.budget.toLocaleString()}
                      </span>
                      <div className="w-24 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-indigo-500 rounded-full"
                          style={{
                            width: `${(campaign.spent / campaign.budget) * 100}%`,
                          }}
                        />
                      </div>
                      <span className="text-xs text-slate-500">
                        ${campaign.spent.toLocaleString()} spent
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-semibold ${getStatusColor(campaign.status)}`}
                    >
                      {getStatusIcon(campaign.status)}
                      <span className="capitalize">{campaign.status}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-xs space-y-1">
                      <div className="flex justify-between gap-4">
                        <span className="text-slate-500">Clicks</span>
                        <span className="text-slate-900 font-medium">
                          {campaign.clicks.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between gap-4">
                        <span className="text-slate-500">Impr.</span>
                        <span className="text-slate-900 font-medium">
                          {campaign.impressions.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-400 hover:text-slate-700 p-2 hover:bg-slate-100 rounded-lg transition-colors">
                      <MoreHorizontal size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredCampaigns.length === 0 && (
          <div className="p-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 text-slate-400 mb-4">
              <Filter size={32} />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-1">
              No campaigns found
            </h3>
            <p className="text-slate-500">
              Try adjusting your filters or create a new campaign.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
