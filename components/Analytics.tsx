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

const COLORS = ["#6366f1", "#a5b4fc", "#e2e8f0", "#f1f5f9"];

export const Analytics: React.FC = () => {
  return (
    <div className="space-y-8 animate-fade-in pb-8">
      <p className="text-slate-500">Deep dive into your performance metrics.</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Engagement Chart */}
        <div className="minimal-card p-6">
          <h3 className="text-base font-bold text-slate-900 mb-6">
            Platform Engagement
          </h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={engagementData}>
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
                />
                <YAxis
                  stroke="#94a3b8"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    borderColor: "#e2e8f0",
                    borderRadius: "8px",
                    color: "#0f172a",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  }}
                  cursor={{ fill: "#f8fafc" }}
                />
                <Legend iconType="circle" />
                <Bar
                  dataKey="twitter"
                  fill="#6366f1"
                  radius={[4, 4, 0, 0]}
                  name="Twitter"
                  barSize={30}
                />
                <Bar
                  dataKey="instagram"
                  fill="#cbd5e1"
                  radius={[4, 4, 0, 0]}
                  name="Instagram"
                  barSize={30}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Demographics */}
        <div className="minimal-card p-6">
          <h3 className="text-base font-bold text-slate-900 mb-6">
            Audience Demographics
          </h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={demographicData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={110}
                  fill="#8884d8"
                  paddingAngle={2}
                  dataKey="value"
                  stroke="none"
                >
                  {demographicData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    borderColor: "#e2e8f0",
                    borderRadius: "8px",
                    color: "#0f172a",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
