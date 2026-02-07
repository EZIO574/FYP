import React from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";

interface CampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: any;
  setFormData: (v: any) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const CampaignModal: React.FC<CampaignModalProps> = ({
  isOpen,
  onClose,
  formData,
  setFormData,
  onSubmit,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Setup Marketing Campaign"
      maxWidth="max-w-lg"
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <Input
          label="Campaign Name"
          required
          placeholder="e.g. Q4 Growth Initiative"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="!bg-white !border-slate-300 !text-slate-900"
        />

        <div className="grid grid-cols-2 gap-4">
          <Select
            label="Platform Channel"
            value={formData.platform}
            onChange={(e) =>
              setFormData({ ...formData, platform: e.target.value as any })
            }
            options={[
              { label: "Facebook Ads", value: "Facebook" },
              { label: "Google Search", value: "Google" },
              { label: "Instagram", value: "Instagram" },
              { label: "LinkedIn Ads", value: "LinkedIn" },
              { label: "Email Marketing", value: "Email" },
            ]}
            className="!bg-white !border-slate-300 !text-slate-900"
          />
          <Select
            label="Initial Status"
            value={formData.status}
            onChange={(e) =>
              setFormData({ ...formData, status: e.target.value as any })
            }
            options={[
              { label: "Draft Only", value: "draft" },
              { label: "Active Start", value: "active" },
              { label: "Start Paused", value: "paused" },
            ]}
            className="!bg-white !border-slate-300 !text-slate-900"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Allocated Budget"
            type="number"
            min="0"
            required
            placeholder="e.g. 1000"
            value={formData.budget}
            onChange={(e) =>
              setFormData({ ...formData, budget: e.target.value })
            }
            className="!bg-white !border-slate-300 !text-slate-900"
          />
          <Input
            label="Campaign Launch Date"
            type="date"
            required
            value={formData.startDate}
            onChange={(e) =>
              setFormData({ ...formData, startDate: e.target.value })
            }
            className="!bg-white !border-slate-300 !text-slate-900"
          />
        </div>
        <div className="pt-6 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2.5 rounded-lg border border-slate-300 text-slate-600 font-semibold hover:bg-slate-50 transition-colors"
          >
            Discard
          </button>
          <button
            type="submit"
            className="flex-1 px-4 py-2.5 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors shadow-sm"
          >
            Launch Campaign
          </button>
        </div>
      </form>
    </Modal>
  );
};
