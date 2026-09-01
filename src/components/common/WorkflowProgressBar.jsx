import React from "react";
import { Check } from "lucide-react";

export const WorkflowProgressBar = ({ currentStageIndex = 6, onSelectStage }) => {
  const stages = [
    { index: 1, label: "Proposal", tab: "State Approval" },
    { index: 2, label: "Land Selection", tab: "Parcels" },
    { index: 3, label: "Verification", tab: "Land Verification" },
    { index: 4, label: "SIA", tab: "SIA Status" },
    { index: 5, label: "Notification", tab: "Notifications" },
    { index: 6, label: "Objection", tab: "Objections" },
    { index: 7, label: "R&R Scheme", tab: "R&R" },
    { index: 8, label: "Compensation", tab: "Compensation" },
    { index: 9, label: "Award", tab: "Award" },
    { index: 10, label: "Payment", tab: "Payment" },
    { index: 11, label: "Possession", tab: "Possession" }
  ];

  return (
    <div className="w-full bg-white border border-slate-300 rounded p-4 shadow-2xs overflow-x-auto">
      <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3 flex items-center justify-between">
        <span>RFCTLARR Act 2013 Statutory Workflow Stages</span>
        <span className="text-[11px] font-normal text-slate-500">
          Stage {currentStageIndex} of 11: {stages[currentStageIndex - 1]?.label}
        </span>
      </div>

      <div className="min-w-[840px] flex items-center justify-between relative">
        {/* Connecting Track Line */}
        <div className="absolute top-4 left-4 right-4 h-1 bg-slate-200 z-0" />

        {stages.map((st) => {
          const isCompleted = st.index < currentStageIndex;
          const isCurrent = st.index === currentStageIndex;

          return (
            <div
              key={st.index}
              onClick={() => onSelectStage && onSelectStage(st.tab)}
              className="flex flex-col items-center relative z-10 cursor-pointer group"
              title={`Click to view ${st.label} tab`}
            >
              {/* Step Circle */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  isCompleted
                    ? "bg-emerald-600 text-white shadow-xs"
                    : isCurrent
                    ? "bg-[#1e3a8a] text-white ring-4 ring-blue-100 shadow-md"
                    : "bg-white border-2 border-slate-300 text-slate-500 group-hover:border-slate-400"
                }`}
              >
                {isCompleted ? <Check className="w-4 h-4" /> : st.index}
              </div>

              {/* Step Label */}
              <div
                className={`mt-2 text-[11px] text-center max-w-[72px] leading-tight font-medium ${
                  isCurrent
                    ? "text-[#1e3a8a] font-bold"
                    : isCompleted
                    ? "text-emerald-800 font-semibold"
                    : "text-slate-500"
                }`}
              >
                {st.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
