import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  X,
  Calendar as CalendarIcon,
  Clock,
  MoreHorizontal,
} from "lucide-react";

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const dates = Array.from({ length: 35 }, (_, i) => i + 1);

export const Scheduler: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);

  const handleDateClick = (date: number) => {
    if (date <= 31) {
      setSelectedDate(date);
      setShowModal(true);
    }
  };

  return (
    <div className="h-full flex flex-col relative animate-fade-in">
      <div className="flex justify-between items-center mb-6 pb-2">
        <p className="text-slate-500">Manage and schedule your content.</p>
        <div className="flex gap-3">
          <div className="flex bg-slate-100 p-1 rounded-lg">
            <button className="px-4 py-1.5 rounded-md bg-white text-slate-900 text-sm font-semibold shadow-sm border border-slate-200">
              Month
            </button>
            <button className="px-4 py-1.5 rounded-md text-slate-500 text-sm font-medium hover:text-slate-900">
              Week
            </button>
          </div>
          <button
            onClick={() => {
              setSelectedDate(24);
              setShowModal(true);
            }}
            className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-all shadow-sm text-sm"
          >
            <Plus size={16} /> New Post
          </button>
        </div>
      </div>

      <div className="minimal-card flex-1 flex flex-col overflow-hidden">
        {/* Calendar Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-white">
          <div className="flex items-center gap-4">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              October 2023
            </h3>
            <div className="flex items-center gap-1">
              <button className="p-1 hover:bg-slate-100 rounded text-slate-500 transition-colors">
                <ChevronLeft size={18} />
              </button>
              <button className="p-1 hover:bg-slate-100 rounded text-slate-500 transition-colors">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
          <button className="text-slate-400 hover:text-slate-900 transition-colors">
            <MoreHorizontal size={20} />
          </button>
        </div>

        {/* Days Header */}
        <div className="grid grid-cols-7 border-b border-slate-200 bg-slate-50">
          {days.map((day) => (
            <div
              key={day}
              className="py-3 text-center text-xs font-semibold text-slate-500 uppercase tracking-widest"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 flex-1 bg-white">
          {dates.map((date, idx) => {
            const isToday = date === 24;
            const hasEvent = [2, 5, 12, 15, 24, 28].includes(date);
            const eventType = date % 2 === 0 ? "twitter" : "instagram";
            const isNextMonth = date > 31;

            return (
              <div
                key={idx}
                onClick={() => handleDateClick(date)}
                className={`border-r border-b border-slate-100 p-2 min-h-[100px] relative transition-all group cursor-pointer
                  ${isNextMonth ? "bg-slate-50 text-slate-300" : "hover:bg-slate-50"}
                `}
              >
                <div className="flex justify-between items-start mb-1">
                  <span
                    className={`text-xs font-semibold w-6 h-6 flex items-center justify-center rounded-full ${isToday ? "bg-slate-900 text-white" : "text-slate-500"}`}
                  >
                    {isNextMonth ? date - 31 : date}
                  </span>
                  {!isNextMonth && (
                    <Plus
                      size={14}
                      className="text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  )}
                </div>

                {hasEvent && !isNextMonth && (
                  <div
                    className={`mt-1 p-1.5 rounded text-[10px] font-semibold border-l-2 truncate
                    ${
                      eventType === "twitter"
                        ? "bg-sky-50 text-sky-700 border-sky-500"
                        : "bg-pink-50 text-pink-700 border-pink-500"
                    }
                  `}
                  >
                    {eventType === "twitter" ? "Twitter" : "Instagram"}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Mock Modal */}
      {showModal && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-900/10 backdrop-blur-sm animate-fade-in p-4">
          <div className="minimal-card w-full max-w-md p-6 shadow-xl transform transition-all scale-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-slate-900">
                Schedule Post
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-slate-900"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  Date
                </label>
                <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-lg text-slate-900 border border-slate-200">
                  <CalendarIcon size={16} className="text-slate-400" />
                  <span className="text-sm font-medium">
                    October {selectedDate}, 2023
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  Content Preview
                </label>
                <textarea
                  className="minimal-input w-full rounded-lg p-3 h-24 text-sm resize-none"
                  placeholder="Write your post content here..."
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                    Time
                  </label>
                  <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-lg text-slate-900 border border-slate-200">
                    <Clock size={16} className="text-slate-400" />
                    <span className="text-sm font-medium">10:00 AM</span>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                    Platform
                  </label>
                  <select className="minimal-input w-full rounded-lg p-3 text-sm appearance-none cursor-pointer">
                    <option>Twitter</option>
                    <option>Instagram</option>
                    <option>LinkedIn</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-2.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium text-sm transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-2.5 rounded-lg bg-slate-900 text-white hover:bg-slate-800 font-medium text-sm transition-all"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
