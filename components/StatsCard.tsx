import React, { memo } from "react";
import { StatCardProps } from "../types";

export const StatsCard: React.FC<StatCardProps> = memo(
  ({ title, value, change, isPositive, icon }) => {
    return (
      <div className="minimal-card p-6 flex flex-col justify-between h-full">
        <div className="flex justify-between items-start mb-4">
          <div className="p-2.5 bg-slate-50 rounded-lg text-slate-500 border border-slate-100">
            {icon}
          </div>
          <div
            className={`px-2 py-0.5 rounded-full text-xs font-medium flex items-center ${isPositive ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"}`}
          >
            {isPositive ? "↑" : "↓"} {change}
          </div>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-slate-900 font-display tracking-tight">
            {value}
          </h3>
          <p className="text-slate-500 text-sm font-medium mt-1">{title}</p>
        </div>
      </div>
    );
  },
);

StatsCard.displayName = "StatsCard";
