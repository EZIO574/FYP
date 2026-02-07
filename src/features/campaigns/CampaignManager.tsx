import React from "react";
import { useCampaigns } from "./hooks/useCampaigns";
import { CampaignHeader } from "./components/CampaignHeader";
import { CampaignStats } from "./components/CampaignStats";
import { CampaignTable } from "./components/CampaignTable";
import { CampaignModal } from "./components/CampaignModal";

export const CampaignManager: React.FC = () => {
  const { state, actions } = useCampaigns();

  return (
    <div className="space-y-6 animate-fade-in relative pb-10">
      <CampaignHeader
        searchTerm={state.searchTerm}
        setSearchTerm={actions.setSearchTerm}
        filter={state.filter}
        setFilter={actions.setFilter}
        onNewCampaign={() => actions.setIsModalOpen(true)}
      />

      <CampaignStats stats={state.stats} />

      <CampaignTable campaigns={state.filteredCampaigns} />

      <CampaignModal
        isOpen={state.isModalOpen}
        onClose={() => actions.setIsModalOpen(false)}
        formData={state.formData}
        setFormData={actions.setFormData}
        onSubmit={actions.handleCreateCampaign}
      />
    </div>
  );
};
