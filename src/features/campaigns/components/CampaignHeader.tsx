import React from "react";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

interface CampaignHeaderProps {
  searchTerm: string;
  setSearchTerm: (v: string) => void;
  filter: string;
  setFilter: (v: string) => void;
  onNewCampaign: () => void;
}

export const CampaignHeader: React.FC<CampaignHeaderProps> = ({
  searchTerm,
  setSearchTerm,
  filter,
  setFilter,
  onNewCampaign,
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
      <div className="relative flex-1 max-w-md">
        <Input
          placeholder="Search campaigns..."
          icon={<Search size={18} className="text-slate-400" />}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full !bg-white !border-slate-200 !rounded-lg !py-2.5 !pl-10 !text-slate-900 shadow-sm"
        />
      </div>
      <div className="flex items-center gap-3">
        <select
          className="bg-white border border-slate-200 text-slate-600 text-sm font-medium rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer shadow-sm"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">Every Channel</option>
          <option value="active">Active Only</option>
          <option value="paused">Paused Only</option>
          <option value="completed">Completed Only</option>
          <option value="draft">Drafts Only</option>
        </select>
        <Button
          onClick={onNewCampaign}
          variant="primary"
          icon={<Plus size={18} />}
          className="!bg-blue-600 hover:!bg-blue-700 text-white font-semibold rounded-lg px-5 shadow-sm"
        >
          New Campaign
        </Button>
      </div>
    </div>
  );
};
