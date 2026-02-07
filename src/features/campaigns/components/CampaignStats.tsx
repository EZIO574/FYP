import React from "react";
import { DollarSign, Activity, MousePointerClick, Eye } from "lucide-react";

interface CampaignStatsProps {
  stats: {
    budget: number;
    spent: number;
    clicks: number;
    impressions: number;
  };
}

export const CampaignStats: React.FC<CampaignStatsProps> = ({ stats }) => {
  const statItems = [
    {
      label: "Allocated Budget",
      value: `$${stats.budget.toLocaleString()}`,
      change: "12%",
      positive: true,
      icon: <DollarSign size={18} />,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Total Spent",
      value: `$${stats.spent.toLocaleString()}`,
      change: "8%",
      positive: false,
      icon: <Activity size={18} />,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Clicks Received",
      value: stats.clicks.toLocaleString(),
      change: "5%",
      positive: true,
      icon: <MousePointerClick size={18} />,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Impressions",
      value: stats.impressions.toLocaleString(),
      change: "15%",
      positive: true,
      icon: <Eye size={18} />,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {statItems.map((stat, i) => (
        <div
          key={i}
          className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-sm transition-shadow group"
        >
          <div className="flex justify-between items-start mb-4">
            <div className={`p-2 ${stat.bg} ${stat.color} rounded-lg`}>
              {stat.icon}
            </div>
            <div
              className={`flex items-center gap-0.5 text-xs font-bold ${stat.positive ? "text-emerald-600 bg-emerald-50" : "text-amber-600 bg-amber-50"} px-2 py-0.5 rounded-md`}
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
  );
};
