import React, { useState } from "react";
import { AutomationWorkflow } from "@/types";
import {
  Workflow,
  Play,
  Pause,
  ExternalLink,
  Activity,
  Plus,
  X,
  Download,
  ArrowRight,
} from "lucide-react";

const mockWorkflows: AutomationWorkflow[] = [
  {
    id: "1",
    name: "Lead Synchronization",
    tool: "n8n",
    trigger: "New Prospect Record",
    action: "CRM Database Update",
    status: "Active",
    lastRun: "2 mins ago",
  },
  {
    id: "2",
    name: "Welcome Onboarding Sequence",
    tool: "n8n",
    trigger: "Confirmed Signup",
    action: "Send Multi-stage Email",
    status: "Active",
    lastRun: "1 hour ago",
  },
  {
    id: "3",
    name: "Social Sentiment Monitor",
    tool: "Zapier",
    trigger: "X / Twitter Interaction",
    action: "Internal Slack Alert",
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

  const handleDownloadTemplate = () => {
    // Standard template data for enterprise automation
    const workflowData = {
      name: "AutoMarketer Corporate Workflow",
      nodes: [
        /* ... nodes as previously defined ... */
      ],
      connections: {
        /* ... connections ... */
      },
    };

    const blob = new Blob([JSON.stringify(workflowData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "enterprise-marketing-flow.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col animate-fade-in pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 pb-6 border-b border-slate-200 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Automation Hub</h2>
          <p className="text-slate-500 text-sm mt-1">
            Monitor and coordinate multi-channel marketing workflows
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleDownloadTemplate}
            className="bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-slate-50 transition-colors"
          >
            <Download size={18} />
            Export Templates
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors shadow-sm"
          >
            <Plus size={18} />
            New Workflow
          </button>
        </div>
      </div>

      {/* Workflow List */}
      <div className="space-y-3">
        {workflows.map((flow) => (
          <div
            key={flow.id}
            className="bg-white border border-slate-200 p-5 rounded-xl flex flex-col md:flex-row md:items-center justify-between hover:shadow-md transition-shadow group"
          >
            <div className="flex items-center gap-5">
              <div
                className={`w-14 h-14 rounded-xl border flex items-center justify-center transition-colors ${
                  flow.tool === "n8n"
                    ? "bg-red-50 border-red-100 text-red-600"
                    : "bg-orange-50 border-orange-100 text-orange-600"
                }`}
              >
                <Workflow size={28} />
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-900 mb-0.5">
                  {flow.name}
                </h4>
                <div className="flex items-center gap-3 text-xs font-medium">
                  <span
                    className={`uppercase font-bold tracking-wider ${
                      flow.tool === "n8n" ? "text-red-500" : "text-orange-500"
                    }`}
                  >
                    {flow.tool}
                  </span>
                  <span className="text-slate-300">|</span>
                  <span className="text-slate-500 flex items-center gap-1.5">
                    {flow.trigger}{" "}
                    <ArrowRight size={10} className="text-slate-400" />{" "}
                    {flow.action}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-8 mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-t-0 border-slate-100">
              <div className="text-right hidden lg:block">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">
                  Latest Activity
                </p>
                <p className="text-sm text-slate-700 font-semibold flex items-center justify-end gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  {flow.lastRun}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <span
                  className={`px-2.5 py-1 rounded-full text-[10px] font-bold border uppercase tracking-wide ${
                    flow.status === "Active"
                      ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                      : "bg-slate-50 text-slate-500 border-slate-200"
                  }`}
                >
                  {flow.status}
                </span>
                <button className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-400 hover:text-blue-600 hover:bg-slate-100 transition-all">
                  {flow.status === "Active" ? (
                    <Pause size={18} />
                  ) : (
                    <Play size={18} />
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* New Workflow Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm animate-fade-in p-4">
          <div className="bg-white w-full max-w-lg rounded-xl shadow-2xl overflow-hidden border border-slate-200">
            <div className="flex justify-between items-center p-6 border-b border-slate-100">
              <h3 className="text-xl font-bold text-slate-900">
                Setup Integration Workflow
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-md hover:bg-slate-100 text-slate-500 hover:text-slate-700 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreate} className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Workflow Title
                </label>
                <input
                  required
                  type="text"
                  className="w-full text-sm p-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                  placeholder="e.g. Inbound Lead Router"
                  value={newFlow.name}
                  onChange={(e) =>
                    setNewFlow({ ...newFlow, name: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Automation Tool
                </label>
                <select
                  className="w-full text-sm p-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none bg-white cursor-pointer"
                  value={newFlow.tool}
                  onChange={(e) =>
                    setNewFlow({
                      ...newFlow,
                      tool: e.target.value as "n8n" | "Zapier",
                    })
                  }
                >
                  <option value="n8n">n8n - Self-hosted / Cloud</option>
                  <option value="Zapier">Zapier - Integration Engine</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Inbound Trigger
                  </label>
                  <input
                    required
                    type="text"
                    className="w-full text-sm p-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                    placeholder="e.g. New Webhook"
                    value={newFlow.trigger}
                    onChange={(e) =>
                      setNewFlow({ ...newFlow, trigger: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    System Action
                  </label>
                  <input
                    required
                    type="text"
                    className="w-full text-sm p-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                    placeholder="e.g. Notify Team"
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
                  className="flex-1 py-2.5 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-50 font-semibold text-sm transition-colors"
                >
                  Discard
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-semibold text-sm transition-colors shadow-sm"
                >
                  Enable Workflow
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
