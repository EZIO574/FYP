import React from "react";
import { BrainCircuit } from "lucide-react";

interface StudioHeaderProps {
  isThinkingMode: boolean;
}

export const StudioHeader: React.FC<StudioHeaderProps> = ({
  isThinkingMode,
}) => {
  return (
    <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 pb-6 border-b border-slate-200 mb-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">
          Marketing Content Studio
        </h2>
        <div className="flex items-center gap-3 mt-1">
          <p className="text-slate-500 text-sm">
            AI-powered content generation and strategy
          </p>
          {isThinkingMode && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-bold uppercase tracking-wider border border-blue-100">
              <BrainCircuit size={12} /> Advanced AI Active
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
