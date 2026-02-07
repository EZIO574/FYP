import React from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from "recharts";
import {
  Download,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Share2,
  FileText,
} from "lucide-react";

const performanceData = [
  { date: "Oct 1", revenue: 4000, spend: 2400, roas: 1.6 },
  { date: "Oct 5", revenue: 3000, spend: 1398, roas: 2.1 },
  { date: "Oct 10", revenue: 9800, spend: 2000, roas: 4.9 },
  { date: "Oct 15", revenue: 3908, spend: 2780, roas: 1.4 },
  { date: "Oct 20", revenue: 4800, spend: 1890, roas: 2.5 },
  { date: "Oct 25", revenue: 3800, spend: 2390, roas: 1.5 },
  { date: "Oct 30", revenue: 4300, spend: 3490, roas: 1.2 },
];

const channelData = [
  { name: "Facebook", value: 45, color: "#2563EB" },
  { name: "Instagram", value: 30, color: "#F43F5E" },
  { name: "LinkedIn", value: 15, color: "#0EA5E9" },
  { name: "Email", value: 10, color: "#10B981" },
];

export const Reports: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 pb-6 border-b border-slate-200">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Performance Reports
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            Detailed business analytics and data exports
          </p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white border border-slate-200 text-slate-600 px-4 py-2.5 rounded-lg flex items-center gap-2 text-sm font-medium hover:bg-slate-50 transition-colors">
            <Calendar size={18} className="text-slate-400" />
            Select Date Range
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors">
            <Download size={18} />
            Export Data
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Total Revenue",
            value: "$33,608",
            change: "12.5%",
            positive: true,
          },
          {
            label: "Total Spend",
            value: "$16,348",
            change: "4.2%",
            positive: false,
          },
          {
            label: "Average ROAS",
            value: "2.05x",
            change: "8.1%",
            positive: true,
          },
          {
            label: "Conversion Rate",
            value: "3.2%",
            change: "1.1%",
            positive: false,
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-white border border-slate-200 p-5 rounded-xl hover:shadow-sm transition-shadow"
          >
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
              {stat.label}
            </p>
            <div className="flex items-end justify-between">
              <h3 className="text-2xl font-bold text-slate-900">
                {stat.value}
              </h3>
              <div
                className={`flex items-center gap-1 text-xs font-bold ${
                  stat.positive
                    ? "text-emerald-600 bg-emerald-50"
                    : "text-red-600 bg-red-50"
                } px-2 py-1 rounded-md`}
              >
                {stat.positive ? (
                  <ArrowUpRight size={14} />
                ) : (
                  <ArrowDownRight size={14} />
                )}
                {stat.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Chart */}
      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-slate-900">
            Financial Performance
          </h3>
          <button className="p-2 rounded-lg hover:bg-slate-50 text-slate-400 hover:text-slate-600 transition-colors">
            <Share2 size={20} />
          </button>
        </div>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={performanceData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#E2E8F0"
                vertical={false}
              />
              <XAxis
                dataKey="date"
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
                itemStyle={{
                  color: "#0F172A",
                  fontSize: "13px",
                }}
              />
              <Legend
                iconType="circle"
                wrapperStyle={{
                  paddingTop: "20px",
                  fontSize: "12px",
                }}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#2563EB"
                strokeWidth={2}
                dot={{ r: 4, fill: "#2563EB" }}
                activeDot={{ r: 6, stroke: "#fff", strokeWidth: 2 }}
                name="Revenue"
              />
              <Line
                type="monotone"
                dataKey="spend"
                stroke="#F43F5E"
                strokeWidth={2}
                dot={{ r: 4, fill: "#F43F5E" }}
                activeDot={{ r: 6, stroke: "#fff", strokeWidth: 2 }}
                name="Spend"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Channel Breakdown */}
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-6 font-display">
            Channel Distribution
          </h3>
          <div className="space-y-5">
            {channelData.map((channel, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm font-medium mb-2">
                  <span className="text-slate-600">{channel.name}</span>
                  <span className="text-slate-900 font-semibold">
                    {channel.value}%
                  </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{
                      width: `${channel.value}%`,
                      backgroundColor: channel.color,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Latest Exports */}
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-6">
            Latest Reports
          </h3>
          <div className="space-y-2">
            {[
              {
                name: "Q3 Financial Overview",
                date: "Oct 15, 2023",
                size: "2.4 MB",
              },
              {
                name: "Summer Campaign Results",
                date: "Sep 30, 2023",
                size: "1.1 MB",
              },
              {
                name: "Lead Quality Report",
                date: "Sep 15, 2023",
                size: "856 KB",
              },
              {
                name: "Social Engagement Audit",
                date: "Sep 01, 2023",
                size: "3.2 MB",
              },
            ].map((file, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200 group"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-blue-50 p-2.5 rounded-lg text-blue-600 group-hover:bg-blue-100 transition-colors">
                    <FileText size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900 group-hover:text-blue-700 transition-colors">
                      {file.name}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {file.date} • {file.size}
                    </p>
                  </div>
                </div>
                <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors">
                  <Download size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
