import React from "react";
import { User, Globe, Save, Bell, Shield } from "lucide-react";

export const Settings: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900">Settings</h2>
        <p className="text-slate-500 text-sm mt-1">
          Manage your account and preferences
        </p>
      </div>

      {/* Profile Section */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
              <User size={18} />
            </div>
            <h3 className="font-semibold text-slate-900">
              Profile Information
            </h3>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                defaultValue="Alex Marketing"
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                defaultValue="alex@automarketer.com"
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Bio
              </label>
              <textarea
                defaultValue="Marketing Manager at Tech Startup"
                rows={3}
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 resize-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Preferences Section */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
              <Globe size={18} />
            </div>
            <h3 className="font-semibold text-slate-900">Preferences</h3>
          </div>
        </div>
        <div className="divide-y divide-slate-100">
          <div className="flex items-center justify-between p-6">
            <div>
              <p className="font-medium text-slate-900">
                Auto-generate hashtags
              </p>
              <p className="text-sm text-slate-500 mt-0.5">
                Automatically add relevant hashtags to posts
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-slate-200 peer-focus:ring-2 peer-focus:ring-blue-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <div className="flex items-center justify-between p-6">
            <div>
              <p className="font-medium text-slate-900">Email Notifications</p>
              <p className="text-sm text-slate-500 mt-0.5">
                Receive alerts for new leads and campaign updates
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-slate-200 peer-focus:ring-2 peer-focus:ring-blue-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end pt-4">
        <button className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors">
          <Save size={18} />
          Save Changes
        </button>
      </div>
    </div>
  );
};
