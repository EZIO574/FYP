import React, { useState } from 'react';
import { EmailCampaign } from '../types';
import { Mail, Send, Plus, Clock, Calendar, Play } from 'lucide-react';
import { Modal } from './common/Modal';
import { Input } from './common/Input';
import { Button } from './common/Button';

const mockCampaigns: EmailCampaign[] = [
  { id: '1', name: 'October Newsletter', subject: 'Trends in 2024', status: 'Sent', sentCount: 1250, openRate: 24.5 },
  { id: '2', name: 'Product Launch', subject: 'Introducing AutoMarketer', status: 'Draft', sentCount: 0, openRate: 0 },
  { id: '3', name: 'Webinar Invite', subject: 'Join us live!', status: 'Scheduled', sentCount: 0, openRate: 0, scheduledDate: '2023-10-28' },
];

export const EmailMarketing: React.FC = () => {
  const [campaigns, setCampaigns] = useState<EmailCampaign[]>(mockCampaigns);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  
  // Form States
  const [newCampaign, setNewCampaign] = useState({ name: '', subject: '' });
  const [scheduleData, setScheduleData] = useState({ id: '', date: '' });

  // Create new draft
  const handleCreate = (e: React.FormEvent) => {
      e.preventDefault();
      const campaign: EmailCampaign = {
          id: Date.now().toString(),
          name: newCampaign.name,
          subject: newCampaign.subject,
          status: 'Draft',
          sentCount: 0,
          openRate: 0
      };
      setCampaigns([campaign, ...campaigns]);
      setNewCampaign({ name: '', subject: '' });
      setIsCreateModalOpen(false);
  };

  // Open schedule modal
  const openScheduleModal = (id: string) => {
      setScheduleData({ id, date: '' });
      setIsScheduleModalOpen(true);
  };

  // Confirm schedule
  const handleScheduleConfirm = (e: React.FormEvent) => {
      e.preventDefault();
      if (!scheduleData.id || !scheduleData.date) return;

      setCampaigns(prev => prev.map(c => {
          if (c.id === scheduleData.id) {
              return { ...c, status: 'Scheduled', scheduledDate: scheduleData.date };
          }
          return c;
      }));
      setIsScheduleModalOpen(false);
  };

  // Send Immediately (from Scheduled or Draft)
  const handleSendNow = (id: string) => {
      setCampaigns(prev => prev.map(c => {
          if (c.id === id) {
              return { 
                  ...c, 
                  status: 'Sent', 
                  scheduledDate: undefined, // Remove scheduled date
                  sentCount: Math.floor(Math.random() * 2000) + 500 // Mock sent count
              };
          }
          return c;
      }));
  };

  return (
    <div className="space-y-6 animate-fade-in relative">
       <div className="flex justify-between items-end border-b border-slate-200 pb-6">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 font-display">Email Campaigns</h2>
          <p className="text-slate-500 mt-1">Manage bulk email automation.</p>
        </div>
        <Button 
            onClick={() => setIsCreateModalOpen(true)}
            icon={<Plus size={16} />}
            variant="primary"
        >
          Create Campaign
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaigns.map(camp => (
          <div key={camp.id} className="minimal-card p-6 flex flex-col justify-between hover:shadow-md transition-shadow group">
            <div>
                <div className="flex justify-between items-start mb-4">
                <div className={`p-2.5 rounded-lg border ${
                    camp.status === 'Sent' ? 'bg-emerald-50 border-emerald-100 text-emerald-600' :
                    camp.status === 'Scheduled' ? 'bg-amber-50 border-amber-100 text-amber-600' :
                    'bg-slate-50 border-slate-100 text-slate-500'
                }`}>
                    {camp.status === 'Sent' ? <Send size={18} /> : camp.status === 'Scheduled' ? <Clock size={18} /> : <Mail size={18} />}
                </div>
                <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase border ${
                    camp.status === 'Sent' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                    camp.status === 'Scheduled' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                    'bg-slate-50 text-slate-500 border-slate-100'
                }`}>
                    {camp.status}
                </span>
                </div>
                
                <h3 className="text-base font-bold text-slate-900 mb-1">{camp.name}</h3>
                <p className="text-sm text-slate-500 mb-2 truncate">{camp.subject}</p>
                
                {camp.scheduledDate && camp.status === 'Scheduled' && (
                    <p className="text-xs text-amber-600 font-medium flex items-center gap-1 bg-amber-50 p-1.5 rounded w-fit">
                        <Calendar size={12} /> Scheduled: {camp.scheduledDate}
                    </p>
                )}
            </div>
            
            <div>
                <div className="border-t border-slate-100 pt-4 grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Recipients</p>
                        <p className="text-lg font-bold text-slate-800">{camp.sentCount > 0 ? camp.sentCount.toLocaleString() : '-'}</p>
                    </div>
                    <div>
                        <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Open Rate</p>
                        <p className="text-lg font-bold text-slate-800">{camp.openRate > 0 ? `${camp.openRate}%` : '-'}</p>
                    </div>
                </div>

                <div className="flex gap-2">
                    {camp.status === 'Draft' && (
                        <>
                            <Button variant="outline" size="sm" fullWidth onClick={() => openScheduleModal(camp.id)}>
                                Schedule
                            </Button>
                            <Button variant="primary" size="sm" fullWidth onClick={() => handleSendNow(camp.id)}>
                                Send Now
                            </Button>
                        </>
                    )}
                    
                    {camp.status === 'Scheduled' && (
                        <Button variant="primary" size="sm" fullWidth icon={<Play size={14} />} onClick={() => handleSendNow(camp.id)}>
                            Send Now
                        </Button>
                    )}

                    {camp.status === 'Sent' && (
                        <Button variant="outline" size="sm" fullWidth>
                            View Report
                        </Button>
                    )}
                </div>
            </div>
          </div>
        ))}
      </div>

       {/* Create Campaign Modal */}
       <Modal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} title="New Email Campaign">
            <form onSubmit={handleCreate} className="space-y-4">
               <Input 
                 label="Campaign Name"
                 required
                 placeholder="e.g. Winter Sale 2024"
                 value={newCampaign.name}
                 onChange={(e) => setNewCampaign({...newCampaign, name: e.target.value})}
               />

               <Input 
                 label="Email Subject Line"
                 required
                 placeholder="Subject..."
                 value={newCampaign.subject}
                 onChange={(e) => setNewCampaign({...newCampaign, subject: e.target.value})}
               />

               <div className="pt-4 flex gap-3">
                 <Button type="button" variant="outline" fullWidth onClick={() => setIsCreateModalOpen(false)}>
                    Cancel
                 </Button>
                 <Button type="submit" variant="primary" fullWidth>
                    Create Draft
                 </Button>
               </div>
            </form>
       </Modal>

       {/* Schedule Modal */}
       <Modal isOpen={isScheduleModalOpen} onClose={() => setIsScheduleModalOpen(false)} title="Schedule Campaign">
            <form onSubmit={handleScheduleConfirm} className="space-y-4">
                <p className="text-sm text-slate-500 mb-4">
                    Choose a date to automatically send this campaign.
                </p>
                <Input 
                    type="date"
                    required
                    label="Send Date"
                    value={scheduleData.date}
                    onChange={(e) => setScheduleData({...scheduleData, date: e.target.value})}
                />
                <div className="pt-4 flex gap-3">
                    <Button type="button" variant="outline" fullWidth onClick={() => setIsScheduleModalOpen(false)}>
                        Cancel
                    </Button>
                    <Button type="submit" variant="primary" fullWidth icon={<Clock size={16} />}>
                        Confirm Schedule
                    </Button>
                </div>
            </form>
       </Modal>
    </div>
  );
};