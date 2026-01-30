import React, { useState } from 'react';
import { AutomationWorkflow } from '../types';
import { Workflow, Play, Pause, ExternalLink, Activity, Plus, X, Download } from 'lucide-react';

const mockWorkflows: AutomationWorkflow[] = [
  { id: '1', name: 'Lead to CRM Sync', tool: 'n8n', trigger: 'New Form Entry', action: 'Update Database', status: 'Active', lastRun: '2 mins ago' },
  { id: '2', name: 'Welcome Email Series', tool: 'n8n', trigger: 'New Lead', action: 'Send Email', status: 'Active', lastRun: '1 hour ago' },
  { id: '3', name: 'Social Sentiment Alert', tool: 'Zapier', trigger: 'Twitter Mention', action: 'Slack Notify', status: 'Paused', lastRun: '2 days ago' },
];

export const AutomationHub: React.FC = () => {
    const [workflows, setWorkflows] = useState<AutomationWorkflow[]>(mockWorkflows);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newFlow, setNewFlow] = useState<{name: string, tool: 'n8n' | 'Zapier', trigger: string, action: string}>({ name: '', tool: 'n8n', trigger: '', action: '' });

    const handleCreate = (e: React.FormEvent) => {
        e.preventDefault();
        const flow: AutomationWorkflow = {
            id: Date.now().toString(),
            name: newFlow.name,
            tool: newFlow.tool,
            trigger: newFlow.trigger,
            action: newFlow.action,
            status: 'Active',
            lastRun: 'Just now'
        };
        setWorkflows([flow, ...workflows]);
        setNewFlow({ name: '', tool: 'n8n', trigger: '', action: '' });
        setIsModalOpen(false);
    }

    const handleDownloadTemplate = () => {
        const workflowData = {
          "name": "AutoMarketer AI Backend (Gemini 3 Pro)",
          "nodes": [
            {
              "parameters": {
                "httpMethod": "POST",
                "path": "automarketer",
                "responseMode": "responseNode",
                "options": {}
              },
              "id": "webhook-trigger",
              "name": "Webhook",
              "type": "n8n-nodes-base.webhook",
              "typeVersion": 1,
              "position": [460, 340]
            },
            {
              "parameters": {
                "dataType": "string",
                "value1": "={{ $json.body.action }}",
                "rules": {
                  "rules": [
                    { "value2": "generate_copy" },
                    { "value2": "generate_strategy" },
                    { "value2": "generate_persona" },
                    { "value2": "analyze_lead" },
                    { "value2": "analyze_competitor" },
                    { "value2": "optimize_content" },
                    { "value2": "generate_seo" }
                  ]
                }
              },
              "id": "router",
              "name": "Route Action",
              "type": "n8n-nodes-base.switch",
              "typeVersion": 1,
              "position": [680, 340]
            },
            {
              "parameters": {
                "modelId": "gemini-1.5-flash",
                "messages": {
                  "values": [
                    {
                      "content": "=Generate 3 engaging social media posts for {{ $json.body.platform }} about \"{{ $json.body.topic }}\". \n\nTarget Audience: {{ $json.body.audience }}\nTone: {{ $json.body.tone }}\n\nOutput STRICTLY a JSON array of strings. Example: [\"Post 1 text\", \"Post 2 text\"]"
                    }
                  ]
                }
              },
              "id": "gemini-copy",
              "name": "Generate Copy",
              "type": "n8n-nodes-base.googleGemini",
              "typeVersion": 1,
              "position": [960, 60],
              "credentials": {
                "googlePalmApi": {
                  "id": "YOUR_CREDENTIAL_ID",
                  "name": "Google Gemini Api account"
                }
              }
            },
            {
              "parameters": {
                "modelId": "gemini-3-pro-preview",
                "messages": {
                  "values": [
                    {
                      "content": "=Create a comprehensive marketing strategy for \"{{ $json.body.productName }}\" with the goal: \"{{ $json.body.goal }}\". Use thinking to analyze the market constraints first.\n\nOutput STRICTLY valid JSON with this structure:\n{\n  \"overview\": \"string\",\n  \"targetAudience\": \"string\",\n  \"keyThemes\": [\"string\", \"string\"],\n  \"suggestedPosts\": [\n    {\n      \"platform\": \"Twitter|LinkedIn|Instagram\",\n      \"content\": \"string\",\n      \"hashtags\": [\"string\"],\n      \"bestTime\": \"string\"\n    }\n  ]\n}"
                    }
                  ]
                },
                "options": {
                  "thinkingConfig": {
                    "thinkingBudget": 32768
                  }
                }
              },
              "id": "gemini-strategy",
              "name": "Generate Strategy (Think)",
              "type": "n8n-nodes-base.googleGemini",
              "typeVersion": 1,
              "position": [960, 220],
              "credentials": {
                "googlePalmApi": {
                  "id": "YOUR_CREDENTIAL_ID",
                  "name": "Google Gemini Api account"
                }
              }
            },
            {
              "parameters": {
                "modelId": "gemini-3-pro-preview",
                "messages": {
                  "values": [
                    {
                      "content": "=Create a detailed psychological buyer persona for \"{{ $json.body.productName }}\" in the \"{{ $json.body.industry }}\" industry, located in \"{{ $json.body.region }}\".\n\nOutput STRICTLY valid JSON with this structure:\n{\n  \"name\": \"string\",\n  \"ageRange\": \"string\",\n  \"occupation\": \"string\",\n  \"incomeLevel\": \"string\",\n  \"bio\": \"string\",\n  \"goals\": [\"string\"],\n  \"frustrations\": [\"string\"],\n  \"motivations\": [\"string\"],\n  \"preferredChannels\": [\"string\"]\n}"
                    }
                  ]
                },
                "options": {
                  "thinkingConfig": {
                    "thinkingBudget": 32768
                  }
                }
              },
              "id": "gemini-persona",
              "name": "Generate Persona (Think)",
              "type": "n8n-nodes-base.googleGemini",
              "typeVersion": 1,
              "position": [960, 380],
              "credentials": {
                "googlePalmApi": {
                  "id": "YOUR_CREDENTIAL_ID",
                  "name": "Google Gemini Api account"
                }
              }
            },
            {
              "parameters": {
                "modelId": "gemini-3-pro-preview",
                "messages": {
                  "values": [
                    {
                      "content": "=Analyze this lead interaction data and assign a lead score (0-100). Differentiate between passive viewing and intent-driven actions.\n\nLead Name: {{ $json.body.name }}\nSource: {{ $json.body.source }}\nInteractions: {{ $json.body.interactions }}\n\nOutput STRICTLY valid JSON with this structure:\n{\n  \"score\": number,\n  \"reason\": \"string explanation\"\n}"
                    }
                  ]
                },
                "options": {
                  "thinkingConfig": {
                    "thinkingBudget": 32768
                  }
                }
              },
              "id": "gemini-lead",
              "name": "Analyze Lead (Think)",
              "type": "n8n-nodes-base.googleGemini",
              "typeVersion": 1,
              "position": [960, 540],
              "credentials": {
                "googlePalmApi": {
                  "id": "YOUR_CREDENTIAL_ID",
                  "name": "Google Gemini Api account"
                }
              }
            },
            {
              "parameters": {
                "modelId": "gemini-3-pro-preview",
                "messages": {
                  "values": [
                    {
                      "content": "=Perform a deep SWOT analysis for competitor \"{{ $json.body.competitorName }}\" in the \"{{ $json.body.industry }}\" industry.\n\nOutput STRICTLY valid JSON with this structure:\n{\n  \"strengths\": [\"string\"],\n  \"weaknesses\": [\"string\"],\n  \"opportunities\": [\"string\"],\n  \"threats\": [\"string\"],\n  \"strategicAdvice\": \"string\"\n}"
                    }
                  ]
                },
                "options": {
                  "thinkingConfig": {
                    "thinkingBudget": 32768
                  }
                }
              },
              "id": "gemini-competitor",
              "name": "Analyze Competitor (Think)",
              "type": "n8n-nodes-base.googleGemini",
              "typeVersion": 1,
              "position": [960, 700],
              "credentials": {
                "googlePalmApi": {
                  "id": "YOUR_CREDENTIAL_ID",
                  "name": "Google Gemini Api account"
                }
              }
            },
            {
              "parameters": {
                "modelId": "gemini-1.5-flash",
                "messages": {
                  "values": [
                    {
                      "content": "=Rewrite the following content to meet the goal: \"{{ $json.body.goal }}\".\n\nContent: \"{{ $json.body.originalText }}\"\n\nOutput STRICTLY valid JSON with this structure:\n{\n  \"original\": \"string (the input)\",\n  \"optimized\": \"string (the new text)\",\n  \"changesMade\": \"string (explanation of changes)\"\n}"
                    }
                  ]
                }
              },
              "id": "gemini-optimize",
              "name": "Optimize Content",
              "type": "n8n-nodes-base.googleGemini",
              "typeVersion": 1,
              "position": [960, 860],
              "credentials": {
                "googlePalmApi": {
                  "id": "YOUR_CREDENTIAL_ID",
                  "name": "Google Gemini Api account"
                }
              }
            },
            {
              "parameters": {
                "modelId": "gemini-3-pro-preview",
                "messages": {
                  "values": [
                    {
                      "content": "=Perform SEO research for Topic: \"{{ $json.body.topic }}\" in Niche: \"{{ $json.body.niche }}\".\n\nOutput STRICTLY valid JSON with this structure:\n{\n  \"keywords\": [{ \"term\": \"string\", \"volume\": \"string\", \"difficulty\": \"High|Medium|Low\" }],\n  \"contentIdeas\": [\"string\"],\n  \"competitorUrls\": [\"string\"]\n}"
                    }
                  ]
                },
                "options": {
                  "thinkingConfig": {
                    "thinkingBudget": 32768
                  }
                }
              },
              "id": "gemini-seo",
              "name": "Generate SEO (Think)",
              "type": "n8n-nodes-base.googleGemini",
              "typeVersion": 1,
              "position": [960, 1020],
              "credentials": {
                "googlePalmApi": {
                  "id": "YOUR_CREDENTIAL_ID",
                  "name": "Google Gemini Api account"
                }
              }
            },
            {
              "parameters": {
                "respondWith": "json",
                "responseBody": "={{ $json.content.replace(/```json/g, '').replace(/```/g, '') }}",
                "options": {}
              },
              "id": "respond",
              "name": "Respond to App",
              "type": "n8n-nodes-base.respondToWebhook",
              "typeVersion": 1,
              "position": [1380, 340]
            }
          ],
          "connections": {
            "Webhook": {
              "main": [[{ "node": "Route Action", "type": "main", "index": 0 }]]
            },
            "Route Action": {
              "main": [
                [{ "node": "Generate Copy", "type": "main", "index": 0 }],
                [{ "node": "Generate Strategy", "type": "main", "index": 0 }],
                [{ "node": "Generate Persona", "type": "main", "index": 0 }],
                [{ "node": "Analyze Lead", "type": "main", "index": 0 }],
                [{ "node": "Analyze Competitor", "type": "main", "index": 0 }],
                [{ "node": "Optimize Content", "type": "main", "index": 0 }],
                [{ "node": "Generate SEO", "type": "main", "index": 0 }]
              ]
            },
            "Generate Copy": { "main": [[{ "node": "Respond to App", "type": "main", "index": 0 }]] },
            "Generate Strategy": { "main": [[{ "node": "Respond to App", "type": "main", "index": 0 }]] },
            "Generate Persona": { "main": [[{ "node": "Respond to App", "type": "main", "index": 0 }]] },
            "Analyze Lead": { "main": [[{ "node": "Respond to App", "type": "main", "index": 0 }]] },
            "Analyze Competitor": { "main": [[{ "node": "Respond to App", "type": "main", "index": 0 }]] },
            "Optimize Content": { "main": [[{ "node": "Respond to App", "type": "main", "index": 0 }]] },
            "Generate SEO": { "main": [[{ "node": "Respond to App", "type": "main", "index": 0 }]] }
          }
        };

        const blob = new Blob([JSON.stringify(workflowData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'automarketer-n8n-workflow.json';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

  return (
    <div className="space-y-6 animate-fade-in relative">
      <div className="flex justify-between items-end border-b border-slate-200 pb-6">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 font-display">Automation Hub</h2>
          <p className="text-slate-500 mt-1">Configure n8n and Zapier workflows.</p>
        </div>
        <div className="flex gap-2">
            <button 
                onClick={handleDownloadTemplate}
                className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 text-sm shadow-sm"
            >
            <Download size={16} /> Download Template
            </button>
            <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 text-sm shadow-sm"
            >
            <Plus size={16} /> New Workflow
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {workflows.map((flow) => (
          <div key={flow.id} className="minimal-card p-5 flex items-center justify-between hover:border-slate-300 transition-colors">
            <div className="flex items-center gap-4">
               <div className={`p-3 rounded-xl border ${flow.tool === 'n8n' ? 'bg-rose-50 border-rose-100 text-rose-500' : 'bg-orange-50 border-orange-100 text-orange-500'}`}>
                 <Workflow size={20} />
               </div>
               <div>
                 <h4 className="text-base font-bold text-slate-900">{flow.name}</h4>
                 <div className="flex items-center gap-2 text-sm text-slate-500 mt-0.5">
                    <span className="font-semibold text-slate-700">{flow.tool}</span>
                    <span className="text-slate-300">•</span>
                    <span>{flow.trigger} → {flow.action}</span>
                 </div>
               </div>
            </div>

            <div className="flex items-center gap-8">
               <div className="text-right hidden md:block">
                  <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Last Run</p>
                  <p className="text-sm text-slate-700 flex items-center justify-end gap-1">
                    <Activity size={14} /> {flow.lastRun}
                  </p>
               </div>
               
               <div className="flex items-center gap-3">
                  <div className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border uppercase ${flow.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-slate-50 text-slate-500 border-slate-200'}`}>
                    {flow.status}
                  </div>
                  <button className="p-2 rounded-lg bg-white border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-colors">
                     {flow.status === 'Active' ? <Pause size={16} /> : <Play size={16} />}
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
              <h3 className="text-lg font-bold text-slate-900">Configure Workflow</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-900"><X size={18} /></button>
            </div>
            
            <form onSubmit={handleCreate} className="space-y-4">
               <div>
                 <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Workflow Name</label>
                 <input 
                    required
                    type="text" 
                    className="minimal-input w-full rounded-lg p-3 text-sm" 
                    placeholder="e.g. Sync Leads"
                    value={newFlow.name}
                    onChange={(e) => setNewFlow({...newFlow, name: e.target.value})}
                 />
               </div>

               <div>
                 <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Automation Tool</label>
                 <select 
                    className="minimal-input w-full rounded-lg p-3 text-sm appearance-none"
                    value={newFlow.tool}
                    onChange={(e) => setNewFlow({...newFlow, tool: e.target.value as 'n8n' | 'Zapier'})}
                 >
                    <option value="n8n">n8n</option>
                    <option value="Zapier">Zapier</option>
                 </select>
               </div>

               <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Trigger Event</label>
                    <input 
                        required
                        type="text" 
                        className="minimal-input w-full rounded-lg p-3 text-sm" 
                        placeholder="e.g. New Lead"
                        value={newFlow.trigger}
                        onChange={(e) => setNewFlow({...newFlow, trigger: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Action Event</label>
                    <input 
                        required
                        type="text" 
                        className="minimal-input w-full rounded-lg p-3 text-sm" 
                        placeholder="e.g. Send Email"
                        value={newFlow.action}
                        onChange={(e) => setNewFlow({...newFlow, action: e.target.value})}
                    />
                  </div>
               </div>

               <div className="pt-4 flex gap-3">
                 <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-2.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium text-sm transition-colors">Cancel</button>
                 <button type="submit" className="flex-1 py-2.5 rounded-lg bg-slate-900 text-white hover:bg-slate-800 font-medium text-sm transition-all">Save Workflow</button>
               </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};