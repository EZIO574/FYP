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
    <div className="flex flex-col animate-fade-in pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 pb-6 border-b border-slate-200 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Campaign Calendar
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            Schedule and manage your marketing content across channels
          </p>
        </div>
        <div className="flex gap-3">
          <div className="flex bg-slate-100 p-1 rounded-lg">
            <button className="px-4 py-2 rounded-md bg-white shadow-sm text-sm font-semibold text-slate-900">
              Month
            </button>
            <button className="px-4 py-2 rounded-md text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors">
              Week
            </button>
          </div>
          <button
            onClick={() => {
              setSelectedDate(24);
              setShowModal(true);
            }}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
          >
            <Plus size={18} /> New Entry
          </button>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm flex flex-col">
        {/* Calendar Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center gap-4">
            <h3 className="text-lg font-bold text-slate-900">October 2023</h3>
            <div className="flex items-center gap-1">
              <button className="p-1.5 hover:bg-white rounded-md text-slate-500 hover:text-slate-900 border border-transparent hover:border-slate-200 transition-colors">
                <ChevronLeft size={20} />
              </button>
              <button className="p-1.5 hover:bg-white rounded-md text-slate-500 hover:text-slate-900 border border-transparent hover:border-slate-200 transition-colors">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
          <button className="text-slate-400 hover:text-slate-600 transition-colors p-2">
            <MoreHorizontal size={20} />
          </button>
        </div>

        {/* Days Header */}
        <div className="grid grid-cols-7 border-b border-slate-100">
          {days.map((day) => (
            <div
              key={day}
              className="py-3 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 flex-1">
          {dates.map((date, idx) => {
            const isToday = date === 24;
            const hasEvent = [2, 5, 12, 15, 24, 28].includes(date);
            const eventType = date % 2 === 0 ? "twitter" : "instagram";
            const isNextMonth = date > 31;

            return (
              <div
                key={idx}
                onClick={() => handleDateClick(date)}
                className={`border-r border-b border-slate-100 p-3 min-h-[110px] relative transition-colors
                  ${isNextMonth ? "bg-slate-50 text-slate-300" : "hover:bg-slate-50 cursor-pointer group"}
                `}
              >
                <div className="flex justify-between items-center mb-1">
                  <span
                    className={`text-sm font-semibold w-7 h-7 flex items-center justify-center rounded-lg transition-colors ${
                      isToday
                        ? "bg-blue-600 text-white shadow-md shadow-blue-500/20 underline decoration-2 underline-offset-4"
                        : isNextMonth
                          ? "text-slate-400"
                          : "text-slate-700 group-hover:text-blue-600"
                    }`}
                  >
                    {isNextMonth ? date - 31 : date}
                  </span>
                  {!isNextMonth && (
                    <Plus
                      size={14}
                      className="text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  )}
                </div>

                {hasEvent && !isNextMonth && (
                  <div
                    className={`mt-1.5 p-1.5 rounded-lg text-[10px] font-semibold border transition-colors
                    ${
                      eventType === "twitter"
                        ? "bg-blue-50 text-blue-700 border-blue-100"
                        : "bg-pink-50 text-pink-700 border-pink-100"
                    }
                  `}
                  >
                    {eventType === "twitter" ? "X / Twitter" : "Instagram"}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Entry Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm animate-fade-in p-4">
          <div className="bg-white w-full max-w-lg rounded-xl shadow-2xl overflow-hidden transform transition-all border border-slate-200">
            <div className="flex justify-between items-center p-6 border-b border-slate-100">
              <h3 className="text-xl font-bold text-slate-900">
                Schedule Campaign Task
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-1.5 rounded-md hover:bg-slate-100 text-slate-500 hover:text-slate-700 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Scheduled Date
                </label>
                <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-lg border border-slate-200 text-slate-900">
                  <CalendarIcon size={18} className="text-blue-600" />
                  <span className="text-sm font-medium">
                    October {selectedDate}, 2023
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Content Draft
                </label>
                <textarea
                  className="w-full rounded-lg p-3 h-28 text-sm text-slate-900 border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 resize-none"
                  placeholder="Enter campaign content or details..."
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Start Time
                  </label>
                  <div className="flex items-center gap-3 bg-white p-3 rounded-lg border border-slate-300 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20">
                    <Clock size={18} className="text-blue-600" />
                    <input
                      type="text"
                      defaultValue="10:00 AM"
                      className="bg-transparent border-none outline-none text-sm font-medium text-slate-900 w-full"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Channel
                  </label>
                  <select className="w-full rounded-lg p-3 text-sm text-slate-900 border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none cursor-pointer font-medium bg-white">
                    <option>Twitter / X</option>
                    <option>Instagram</option>
                    <option>LinkedIn</option>
                    <option>Email</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-2.5 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-50 font-semibold text-sm transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-semibold text-sm transition-colors"
                >
                  Save Schedule
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
