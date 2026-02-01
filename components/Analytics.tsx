import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { TrendingUp, Users, BarChart3, Activity } from "lucide-react";

const engagementData = [
  { name: "Jan", twitter: 4000, instagram: 2400 },
  { name: "Feb", twitter: 3000, instagram: 1398 },
  { name: "Mar", twitter: 2000, instagram: 9800 },
  { name: "Apr", twitter: 2780, instagram: 3908 },
  { name: "May", twitter: 1890, instagram: 4800 },
  { name: "Jun", twitter: 2390, instagram: 3800 },
];

const demographicData = [
  { name: "18-24", value: 400 },
  { name: "25-34", value: 300 },
  { name: "35-44", value: 300 },
  { name: "45+", value: 200 },
];

const BLUE_PALETTE = ["#2563EB", "#3B82F6", "#60A5FA", "#93C5FD"];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white px-4 py-3 border border-slate-200 shadow-lg rounded-lg">
        <p className="text-xs font-semibold text-slate-500 mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p
            key={index}
            className="text-sm font-medium"
            style={{
              color: entry.dataKey === "twitter" ? "#2563EB" : "#94A3B8",
            }}
          >
            {entry.name}: {entry.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const QuickStat = ({
  label,
  value,
  change,
  icon: Icon,
}: {
  label: string;
  value: string;
  change: string;
  icon: React.ElementType;
}) => (
  <div className="bg-white border border-slate-200 p-5 rounded-xl flex items-center gap-4 hover:shadow-md transition-shadow">
    <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center">
      <Icon className="w-5 h-5 text-blue-600" />
    </div>
    <div className="flex-1">
      <p className="text-xs font-medium text-slate-500">{label}</p>
      <p className="text-xl font-bold text-slate-900 mt-0.5">{value}</p>
    </div>
    <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
      +{change}
    </span>
  </div>
);

export const Analytics: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in pb-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 pb-6 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Analytics Overview
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              Comprehensive performance metrics across platforms
            </p>
          </div>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <QuickStat
          label="Total Impressions"
          value="2.4M"
          change="18%"
          icon={TrendingUp}
        />
        <QuickStat
          label="Active Audience"
          value="847K"
          change="12%"
          icon={Users}
        />
        <QuickStat
          label="Engagement Rate"
          value="4.8%"
          change="0.6%"
          icon={BarChart3}
        />
        <QuickStat
          label="Growth Index"
          value="94.2"
          change="3.1"
          icon={Activity}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Engagement Chart */}
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">
                Engagement by Platform
              </h3>
              <p className="text-sm text-slate-500">
                Monthly performance comparison
              </p>
            </div>
            <select className="bg-white border border-slate-200 text-slate-600 text-sm rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500/20">
              <option>Last 6 Months</option>
              <option>Last 12 Months</option>
            </select>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={engagementData} barGap={4}>
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
                  dy={8}
                />
                <YAxis
                  stroke="#94A3B8"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12 }}
                  width={45}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  iconType="circle"
                  wrapperStyle={{
                    paddingTop: "16px",
                    fontSize: "12px",
                  }}
                />
                <Bar
                  dataKey="twitter"
                  fill="#2563EB"
                  radius={[4, 4, 0, 0]}
                  name="X / Twitter"
                  barSize={24}
                />
                <Bar
                  dataKey="instagram"
                  fill="#94A3B8"
                  radius={[4, 4, 0, 0]}
                  name="Instagram"
                  barSize={24}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Audience Analysis */}
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">
                Audience Analysis
              </h3>
              <p className="text-sm text-slate-500">
                Demographic user distribution
              </p>
            </div>
          </div>
          <div className="h-72 w-full relative">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center -mt-4">
                <p className="text-3xl font-bold text-slate-900">1.2M</p>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-widest">
                  Total Users
                </p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={demographicData}
                  cx="50%"
                  cy="45%"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={4}
                  dataKey="value"
                  stroke="#fff"
                  strokeWidth={2}
                >
                  {demographicData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={BLUE_PALETTE[index]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  verticalAlign="bottom"
                  height={40}
                  iconType="circle"
                  iconSize={8}
                  wrapperStyle={{
                    fontSize: "12px",
                  }}
                  formatter={(value) => (
                    <span className="text-slate-600">{value}</span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
