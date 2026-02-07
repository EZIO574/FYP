import React, { useState } from "react";

export interface Campaign {
  id: string;
  name: string;
  status: "active" | "paused" | "completed" | "draft";
  platform: "Facebook" | "Google" | "Instagram" | "LinkedIn" | "Email";
  budget: number;
  spent: number;
  clicks: number;
  impressions: number;
  startDate: string;
}

const mockCampaigns: Campaign[] = [
  {
    id: "1",
    name: "Summer Sale 2024",
    status: "active",
    platform: "Facebook",
    budget: 5000,
    spent: 2340,
    clicks: 1250,
    impressions: 45000,
    startDate: "2024-06-01",
  },
  {
    id: "2",
    name: "Enterprise Launch",
    status: "active",
    platform: "LinkedIn",
    budget: 10000,
    spent: 1500,
    clicks: 450,
    impressions: 12000,
    startDate: "2024-06-15",
  },
  {
    id: "3",
    name: "Q3 Awareness",
    status: "paused",
    platform: "Google",
    budget: 15000,
    spent: 8900,
    clicks: 3400,
    impressions: 89000,
    startDate: "2024-05-15",
  },
  {
    id: "4",
    name: "Newsletter Signup",
    status: "draft",
    platform: "Email",
    budget: 1000,
    spent: 0,
    clicks: 0,
    impressions: 0,
    startDate: "2024-07-01",
  },
  {
    id: "5",
    name: "Social Retargeting",
    status: "completed",
    platform: "Instagram",
    budget: 3000,
    spent: 2950,
    clicks: 980,
    impressions: 32000,
    startDate: "2024-04-01",
  },
];

export const useCampaigns = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>(mockCampaigns);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    platform: "Facebook",
    budget: "",
    status: "draft",
    startDate: new Date().toISOString().split("T")[0],
  });

  const handleCreateCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    const newCampaign: Campaign = {
      id: Date.now().toString(),
      name: formData.name || "Untitled Campaign",
      platform: formData.platform as any,
      status: formData.status as any,
      budget: Number(formData.budget) || 0,
      spent: 0,
      clicks: 0,
      impressions: 0,
      startDate: formData.startDate,
    };

    setCampaigns([newCampaign, ...campaigns]);
    setIsModalOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: "",
      platform: "Facebook",
      budget: "",
      status: "draft",
      startDate: new Date().toISOString().split("T")[0],
    });
  };

  const filteredCampaigns = campaigns.filter((campaign) => {
    return (
      (filter === "all" || campaign.status === filter) &&
      campaign.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const stats = {
    budget: campaigns.reduce((acc, c) => acc + c.budget, 0),
    spent: campaigns.reduce((acc, c) => acc + c.spent, 0),
    clicks: campaigns.reduce((acc, c) => acc + c.clicks, 0),
    impressions: campaigns.reduce((acc, c) => acc + c.impressions, 0),
  };

  return {
    state: {
      campaigns,
      filteredCampaigns,
      filter,
      searchTerm,
      isModalOpen,
      formData,
      stats,
    },
    actions: {
      setFilter,
      setSearchTerm,
      setIsModalOpen,
      setFormData,
      handleCreateCampaign,
    },
  };
};
