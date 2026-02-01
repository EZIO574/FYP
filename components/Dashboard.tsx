import React from "react";
import { StatsCard } from "./StatsCard";
import {
  Users,
  Eye,
  MousePointerClick,
  TrendingUp,
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
import { useNavigate } from "react-router-dom";

const data = [
  { name: "Mon", visits: 4000, clicks: 2400 },
  { name: "Tue", visits: 3000, clicks: 1398 },
  { name: "Wed", visits: 2000, clicks: 9800 },
  { name: "Thu", visits: 2780, clicks: 3908 },
  { name: "Fri", visits: 1890, clicks: 4800 },
  { name: "Sat", visits: 2390, clicks: 3800 },
  { name: "Sun", visits: 3490, clicks: 4300 },
];

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Dashboard Overview
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            Track your marketing performance and key metrics
          </p>
        </div>
        <button
          onClick={() => navigate("/reports")}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg font-medium transition-colors text-sm"
        >
          View Reports
          <ArrowRight size={16} />
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Reach"
          value="12,450"
          change="12%"
          isPositive={true}
          icon={<Users size={20} />}
        />
        <StatsCard
          title="Impressions"
          value="84.3k"
          change="8.1%"
          isPositive={true}
          icon={<Eye size={20} />}
        />
        <StatsCard
          title="Click Rate"
          value="4,203"
          change="2.4%"
          isPositive={false}
          icon={<MousePointerClick size={20} />}
        />
        <StatsCard
          title="Conversion"
          value="98.2%"
          change="1.2%"
          isPositive={true}
          icon={<TrendingUp size={20} />}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-12 gap-6">
        {/* Main Chart */}
        <div className="col-span-12 lg:col-span-8 bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">
                Traffic Overview
              </h3>
              <p className="text-sm text-slate-500">Website visits over time</p>
            </div>
            <select className="px-3 py-2 text-sm border border-slate-200 rounded-lg text-slate-600 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>Last 90 Days</option>
            </select>
          </div>

          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={data}
                margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#E2E8F0"
                  vertical={false}
                />
                <XAxis
                  dataKey="name"
                  stroke="#94A3B8"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12 }}
                />
                <YAxis
                  stroke="#94A3B8"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #E2E8F0",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  }}
                  itemStyle={{ color: "#0F172A", fontSize: "13px" }}
                />
                <Area
                  type="monotone"
                  dataKey="visits"
                  stroke="#2563EB"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorVisits)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="col-span-12 lg:col-span-4 bg-white rounded-xl border border-slate-200 p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-slate-900">
              Recent Activity
            </h3>
            <p className="text-sm text-slate-500">Latest updates</p>
          </div>

          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900 truncate">
                    Campaign #{100 + i} active
                  </p>
                  <p className="text-xs text-slate-500 truncate">
                    Performance: High engagement
                  </p>
                </div>
                <span className="text-xs text-slate-400">2h ago</span>
              </div>
            ))}
          </div>

          <button
            onClick={() => navigate("/activity")}
            className="w-full mt-4 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-slate-200 rounded-lg transition-colors"
          >
            View All Activity
          </button>
        </div>
      </div>
    </div>
  );
};
