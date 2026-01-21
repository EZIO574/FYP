import React, { useMemo, useCallback, memo } from "react";
import { useNavigate } from "react-router-dom";
import { StatsCard } from "./StatsCard";
import {
  Users,
  Eye,
  MousePointerClick,
  Activity,
  ArrowRight,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Move static data outside component to prevent recreation
const CHART_DATA = [
  { name: "Mon", visits: 4000, clicks: 2400 },
  { name: "Tue", visits: 3000, clicks: 1398 },
  { name: "Wed", visits: 2000, clicks: 9800 },
  { name: "Thu", visits: 2780, clicks: 3908 },
  { name: "Fri", visits: 1890, clicks: 4800 },
  { name: "Sat", visits: 2390, clicks: 3800 },
  { name: "Sun", visits: 3490, clicks: 4300 },
] as const;

// Memoized chart config to prevent recreation
const TOOLTIP_STYLE = {
  backgroundColor: "#ffffff",
  borderColor: "#e2e8f0",
  borderRadius: "8px",
  color: "#0f172a",
  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
} as const;

const CHART_MARGIN = { top: 10, right: 0, left: -20, bottom: 0 } as const;

// Extract ActivityItem as memoized component
const ActivityItem = memo(({ index }: { index: number }) => (
  <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer group">
    <div className="mt-1 w-2 h-2 rounded-full bg-indigo-500" />
    <div>
      <p className="text-sm font-semibold text-slate-900">
        Campaign #{100 + index} launched
      </p>
      <p className="text-xs text-slate-500 mt-0.5">
        Automated post scheduled for Twitter
      </p>
    </div>
    <span className="text-[10px] text-slate-400 ml-auto whitespace-nowrap">
      2h ago
    </span>
  </div>
));
ActivityItem.displayName = "ActivityItem";

// Stats configuration for cleaner rendering
const STATS_CONFIG = [
  {
    title: "Total Followers",
    value: "12,450",
    change: "12%",
    isPositive: true,
    Icon: Users,
  },
  {
    title: "Impressions",
    value: "84.3k",
    change: "8.1%",
    isPositive: true,
    Icon: Eye,
  },
  {
    title: "Link Clicks",
    value: "4,203",
    change: "2.4%",
    isPositive: false,
    Icon: MousePointerClick,
  },
  {
    title: "Engagement Rate",
    value: "5.8%",
    change: "1.2%",
    isPositive: true,
    Icon: Activity,
  },
] as const;

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  // Memoize navigation handlers
  const handleViewReports = useCallback(() => navigate("/reports"), [navigate]);
  const handleViewActivity = useCallback(
    () => navigate("/activity"),
    [navigate],
  );

  return (
    <div className="space-y-8 animate-fade-in pb-8">
      <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 pb-2">
        <div>
          <p className="text-slate-500">
            Overview of your marketing performance.
          </p>
        </div>
        <button
          onClick={handleViewReports}
          className="bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 text-sm shadow-sm"
        >
          View Detailed Reports <ArrowRight size={16} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {STATS_CONFIG.map(({ title, value, change, isPositive, Icon }) => (
          <StatsCard
            key={title}
            title={title}
            value={value}
            change={change}
            isPositive={isPositive}
            icon={<Icon size={20} />}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2 minimal-card p-6">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold text-slate-900">
              Audience Growth
            </h3>
            <select className="bg-slate-50 border border-slate-200 text-slate-600 text-sm rounded-lg px-3 py-1.5 outline-none focus:border-indigo-500">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>

          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={CHART_DATA} margin={CHART_MARGIN}>
                <defs>
                  <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#f1f5f9"
                  vertical={false}
                />
                <XAxis
                  dataKey="name"
                  stroke="#94a3b8"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12 }}
                  dy={10}
                />
                <YAxis
                  stroke="#94a3b8"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={TOOLTIP_STYLE}
                  itemStyle={{ color: "#0f172a" }}
                />
                <Area
                  type="monotone"
                  dataKey="visits"
                  stroke="#4f46e5"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorVisits)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="minimal-card p-6 flex flex-col">
          <h3 className="text-lg font-bold text-slate-900 mb-6">
            Recent Activity
          </h3>
          <div className="space-y-1 flex-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <ActivityItem key={i} index={i} />
            ))}
          </div>
          <button
            onClick={handleViewActivity}
            className="w-full mt-6 py-2.5 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 font-medium border border-slate-200 rounded-lg transition-all"
          >
            View All Activity
          </button>
        </div>
      </div>
    </div>
  );
};
