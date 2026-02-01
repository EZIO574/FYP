import React from "react";
import {
  Activity,
  User,
  Settings,
  Edit,
  Trash2,
  PlusCircle,
  Filter,
} from "lucide-react";

const activities = [
  {
    id: 1,
    user: "Alex Marketing",
    action: "Published Campaign",
    target: "Summer Sale 2024",
    time: "10 mins ago",
    type: "create",
  },
  {
    id: 2,
    user: "System",
    action: "Optimized Content",
    target: "LinkedIn Post #422",
    time: "45 mins ago",
    type: "update",
  },
  {
    id: 3,
    user: "Alex Marketing",
    action: "Updated Budget",
    target: "Q3 Brand Awareness",
    time: "2 hours ago",
    type: "update",
  },
  {
    id: 4,
    user: "Sarah Design",
    action: "Uploaded Asset",
    target: "hero-image-v2.png",
    time: "5 hours ago",
    type: "create",
  },
  {
    id: 5,
    user: "Alex Marketing",
    action: "Deleted Lead",
    target: "Spam User 01",
    time: "1 day ago",
    type: "delete",
  },
  {
    id: 6,
    user: "System",
    action: "Synced CRM",
    target: "Salesforce Integration",
    time: "1 day ago",
    type: "system",
  },
  {
    id: 7,
    user: "Alex Marketing",
    action: "Changed Password",
    target: "Account Settings",
    time: "2 days ago",
    type: "settings",
  },
];

export const ActivityLog: React.FC = () => {
  const getIcon = (type: string) => {
    switch (type) {
      case "create":
        return <PlusCircle size={16} className="text-emerald-500" />;
      case "update":
        return <Edit size={16} className="text-blue-500" />;
      case "delete":
        return <Trash2 size={16} className="text-red-500" />;
      case "settings":
        return <Settings size={16} className="text-slate-500" />;
      default:
        return <Activity size={16} className="text-blue-500" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Activity Log</h2>
          <p className="text-slate-500 text-sm mt-1">
            Track all changes and actions within the platform
          </p>
        </div>
        <button className="inline-flex items-center gap-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 px-4 py-2 rounded-lg font-medium transition-colors text-sm">
          <Filter size={16} />
          Filter
        </button>
      </div>

      {/* Activity Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-3 flex text-xs font-semibold text-slate-500 uppercase tracking-wider">
          <div className="w-1/4">User</div>
          <div className="w-1/2">Action</div>
          <div className="w-1/4 text-right">Time</div>
        </div>

        <div className="divide-y divide-slate-100">
          {activities.map((item) => (
            <div
              key={item.id}
              className="px-6 py-4 flex items-center hover:bg-slate-50 transition-colors"
            >
              <div className="w-1/4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-semibold text-xs">
                  {item.user.charAt(0)}
                </div>
                <span className="text-sm font-medium text-slate-900">
                  {item.user}
                </span>
              </div>

              <div className="w-1/2">
                <div className="flex items-center gap-2">
                  {getIcon(item.type)}
                  <span className="text-sm font-medium text-slate-900">
                    {item.action}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5 ml-6">
                  {item.target}
                </p>
              </div>

              <div className="w-1/4 text-right text-sm text-slate-500">
                {item.time}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Load More */}
      <div className="text-center">
        <button className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">
          Load older activity...
        </button>
      </div>
    </div>
  );
};
