import React from "react";
import {
  MoreHorizontal,
  Play,
  Pause,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react";
import { Campaign } from "../hooks/useCampaigns";

interface CampaignTableProps {
  campaigns: Campaign[];
}

export const CampaignTable: React.FC<CampaignTableProps> = ({ campaigns }) => {
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
            {campaigns.map((campaign) => {
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
                      Start: {new Date(campaign.startDate).toLocaleDateString()}
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
      {campaigns.length === 0 && (
        <div className="py-20 text-center">
          <h3 className="text-lg font-semibold text-slate-900 mb-1">
            No results matching your criteria
          </h3>
          <p className="text-slate-500 text-sm">
            Try adjusting your filters or search terms
          </p>
        </div>
      )}
    </div>
  );
};
