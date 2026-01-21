import React, { useState } from "react";
import { AutomationWorkflow } from "../types";
import {
  Workflow,
  Play,
  Pause,
  ExternalLink,
  Activity,
  Plus,
  X,
} from "lucide-react";

const mockWorkflows: AutomationWorkflow[] = [
  {
    id: "1",
    name: "Lead to CRM Sync",
    tool: "n8n",
    trigger: "New Form Entry",
    action: "Update Database",
    status: "Active",
    lastRun: "2 mins ago",
  },
  {
    id: "2",
    name: "Welcome Email Series",
    tool: "n8n",
    trigger: "New Lead",
    action: "Send Email",
    status: "Active",
    lastRun: "1 hour ago",
  },
  {
    id: "3",
    name: "Social Sentiment Alert",
    tool: "Zapier",
    trigger: "Twitter Mention",
    action: "Slack Notify",
    status: "Paused",
    lastRun: "2 days ago",
  },
];

export const AutomationHub: React.FC = () => {
  const [workflows, setWorkflows] =
    useState<AutomationWorkflow[]>(mockWorkflows);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newFlow, setNewFlow] = useState<{
    name: string;
    tool: "n8n" | "Zapier";
    trigger: string;
    action: string;
  }>({ name: "", tool: "n8n", trigger: "", action: "" });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const flow: AutomationWorkflow = {
      id: Date.now().toString(),
      name: newFlow.name,
      tool: newFlow.tool,
      trigger: newFlow.trigger,
      action: newFlow.action,
      status: "Active",
      lastRun: "Just now",
    };
    setWorkflows([flow, ...workflows]);
    setNewFlow({ name: "", tool: "n8n", trigger: "", action: "" });
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-fade-in relative">
      <div className="flex justify-between items-end pb-2">
        <p className="text-slate-500">Configure n8n and Zapier workflows.</p>
        <div className="flex gap-2">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 text-sm shadow-sm"
          >
            <Plus size={16} /> New Workflow
          </button>
          <button className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 text-sm shadow-sm">
            <ExternalLink size={16} /> Open Editor
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {workflows.map((flow) => (
          <div
            key={flow.id}
            className="minimal-card p-5 flex items-center justify-between hover:border-slate-300 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div
                className={`p-3 rounded-xl border ${flow.tool === "n8n" ? "bg-rose-50 border-rose-100 text-rose-500" : "bg-orange-50 border-orange-100 text-orange-500"}`}
              >
                <Workflow size={20} />
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-900">
                  {flow.name}
                </h4>
                <div className="flex items-center gap-2 text-sm text-slate-500 mt-0.5">
                  <span className="font-semibold text-slate-700">
                    {flow.tool}
                  </span>
                  <span className="text-slate-300">•</span>
                  <span>
                    {flow.trigger} → {flow.action}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-8">
              <div className="text-right hidden md:block">
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                  Last Run
                </p>
                <p className="text-sm text-slate-700 flex items-center justify-end gap-1">
                  <Activity size={14} /> {flow.lastRun}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border uppercase ${flow.status === "Active" ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-slate-50 text-slate-500 border-slate-200"}`}
                >
                  {flow.status}
                </div>
                <button className="p-2 rounded-lg bg-white border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-colors">
                  {flow.status === "Active" ? (
                    <Pause size={16} />
                  ) : (
                    <Play size={16} />
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* New Workflow Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/10 backdrop-blur-sm animate-fade-in p-4">
          <div className="bg-white border border-slate-200 w-full max-w-md p-6 rounded-2xl shadow-xl transform transition-all scale-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-slate-900">
                Configure Workflow
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-900"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  Workflow Name
                </label>
                <input
                  required
                  type="text"
                  className="minimal-input w-full rounded-lg p-3 text-sm"
                  placeholder="e.g. Sync Leads"
                  value={newFlow.name}
                  onChange={(e) =>
                    setNewFlow({ ...newFlow, name: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  Automation Tool
                </label>
                <select
                  className="minimal-input w-full rounded-lg p-3 text-sm appearance-none"
                  value={newFlow.tool}
                  onChange={(e) =>
                    setNewFlow({
                      ...newFlow,
                      tool: e.target.value as "n8n" | "Zapier",
                    })
                  }
                >
                  <option value="n8n">n8n</option>
                  <option value="Zapier">Zapier</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                    Trigger Event
                  </label>
                  <input
                    required
                    type="text"
                    className="minimal-input w-full rounded-lg p-3 text-sm"
                    placeholder="e.g. New Lead"
                    value={newFlow.trigger}
                    onChange={(e) =>
                      setNewFlow({ ...newFlow, trigger: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                    Action Event
                  </label>
                  <input
                    required
                    type="text"
                    className="minimal-input w-full rounded-lg p-3 text-sm"
                    placeholder="e.g. Send Email"
                    value={newFlow.action}
                    onChange={(e) =>
                      setNewFlow({ ...newFlow, action: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-2.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium text-sm transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-lg bg-slate-900 text-white hover:bg-slate-800 font-medium text-sm transition-all"
                >
                  Save Workflow
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
