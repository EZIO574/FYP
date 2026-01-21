import React from "react";
import { User, Globe, Save } from "lucide-react";

export const Settings: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-10">
      <p className="text-slate-500">Manage your account preferences.</p>

      <div className="minimal-card overflow-hidden">
        {/* Profile Section */}
        <div className="p-8 border-b border-slate-100">
          <h3 className="text-base font-bold text-slate-900 mb-6 flex items-center gap-3">
            <div className="bg-slate-100 p-1.5 rounded-lg text-slate-600">
              <User size={18} />
            </div>
            Profile Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Full Name
              </label>
              <input
                type="text"
                defaultValue="Alex Marketing"
                className="minimal-input w-full rounded-lg p-3 text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Email Address
              </label>
              <input
                type="email"
                defaultValue="alex@automarketer.ai"
                className="minimal-input w-full rounded-lg p-3 text-sm"
              />
            </div>
            <div className="md:col-span-2 space-y-1.5">
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Bio
              </label>
              <textarea
                defaultValue="Social Media Manager for Tech Startups."
                className="minimal-input w-full rounded-lg p-3 text-sm h-24 resize-none"
              />
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="p-8 border-b border-slate-100">
          <h3 className="text-base font-bold text-slate-900 mb-6 flex items-center gap-3">
            <div className="bg-slate-100 p-1.5 rounded-lg text-slate-600">
              <Globe size={18} />
            </div>
            Platform Preferences
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-100 hover:border-slate-200 transition-colors cursor-pointer">
              <div>
                <p className="text-slate-900 font-medium text-sm">
                  Auto-generate Hashtags
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Automatically append tags to posts.
                </p>
              </div>
              <div className="w-10 h-5 bg-indigo-600 rounded-full relative cursor-pointer">
                <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full shadow-sm"></div>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-100 hover:border-slate-200 transition-colors cursor-pointer">
              <div>
                <p className="text-slate-900 font-medium text-sm">
                  Notifications
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Receive email alerts for leads.
                </p>
              </div>
              <div className="w-10 h-5 bg-slate-200 rounded-full relative cursor-pointer">
                <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full shadow-sm"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 bg-slate-50 flex justify-end">
          <button className="bg-slate-900 text-white hover:bg-slate-800 px-5 py-2.5 rounded-lg font-bold flex items-center gap-2 transition-colors shadow-sm text-sm">
            <Save size={16} /> Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};
