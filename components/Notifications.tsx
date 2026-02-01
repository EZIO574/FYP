import React, { useState } from "react";
import {
  Bell,
  Check,
  Clock,
  AlertTriangle,
  Info,
  X,
  CheckCheck,
} from "lucide-react";

const mockNotifications = [
  {
    id: 1,
    title: 'Campaign "Summer Sale" budget reached',
    message: "Your campaign has reached 90% of its daily budget.",
    time: "10 mins ago",
    type: "warning",
    read: false,
  },
  {
    id: 2,
    title: "New Lead Qualified",
    message: "Tech Solutions Inc. has been marked as Qualified.",
    time: "1 hour ago",
    type: "success",
    read: false,
  },
  {
    id: 3,
    title: "System Maintenance",
    message: "AutoMarketer will undergo maintenance at 2 AM.",
    time: "5 hours ago",
    type: "info",
    read: true,
  },
  {
    id: 4,
    title: "Export Ready",
    message: "Your Q3 Report is ready for download.",
    time: "1 day ago",
    type: "success",
    read: true,
  },
  {
    id: 5,
    title: "Payment Failed",
    message: "We could not process your payment for the subscription.",
    time: "2 days ago",
    type: "error",
    read: true,
  },
];

export const Notifications: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"all" | "unread">("all");
  const [notifications, setNotifications] = useState(mockNotifications);

  const filteredNotifications =
    activeTab === "all" ? notifications : notifications.filter((n) => !n.read);

  const markAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "warning":
        return <AlertTriangle size={18} className="text-amber-500" />;
      case "success":
        return <Check size={18} className="text-emerald-500" />;
      case "error":
        return <AlertTriangle size={18} className="text-red-500" />;
      default:
        return <Info size={18} className="text-blue-500" />;
    }
  };

  const getStatusStyle = (type: string) => {
    switch (type) {
      case "warning":
        return "bg-amber-50 border-amber-200";
      case "success":
        return "bg-emerald-50 border-emerald-200";
      case "error":
        return "bg-red-50 border-red-200";
      default:
        return "bg-blue-50 border-blue-200";
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Notifications</h2>
          <p className="text-slate-500 text-sm mt-1">
            Stay updated with your latest alerts
          </p>
        </div>
        <button
          onClick={markAllRead}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-4 py-2 rounded-lg hover:bg-slate-50 transition-colors"
        >
          <CheckCheck size={16} />
          Mark all as read
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-slate-100 rounded-lg w-fit">
        <button
          onClick={() => setActiveTab("all")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === "all"
              ? "bg-white text-slate-900 shadow-sm"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          All
        </button>
        <button
          onClick={() => setActiveTab("unread")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === "unread"
              ? "bg-white text-slate-900 shadow-sm"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          Unread
        </button>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border border-slate-200">
            <div className="w-12 h-12 mx-auto rounded-full bg-slate-100 flex items-center justify-center mb-4">
              <Bell size={24} className="text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-1">
              All caught up!
            </h3>
            <p className="text-sm text-slate-500">
              No notifications to display
            </p>
          </div>
        ) : (
          filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`bg-white rounded-xl border p-4 flex items-start gap-4 transition-all hover:shadow-sm ${
                !notification.read
                  ? "border-blue-200 bg-blue-50/30"
                  : "border-slate-200"
              }`}
            >
              <div
                className={`p-2.5 rounded-lg border ${getStatusStyle(notification.type)}`}
              >
                {getIcon(notification.type)}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start gap-2">
                  <h4
                    className={`text-sm font-semibold ${
                      !notification.read ? "text-slate-900" : "text-slate-700"
                    }`}
                  >
                    {notification.title}
                  </h4>
                  <span className="text-xs text-slate-400 whitespace-nowrap flex items-center gap-1">
                    <Clock size={12} />
                    {notification.time}
                  </span>
                </div>
                <p className="text-sm text-slate-500 mt-1">
                  {notification.message}
                </p>
              </div>

              <button
                onClick={() => deleteNotification(notification.id)}
                className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
