import React from "react";
import { useApp } from "../../context/AppContext.jsx";
import { StatusBadge } from "../common/StatusBadge.jsx";
import {
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  FileText,
  Calendar,
  Layers,
  Award,
  CreditCard,
  Building2,
  ArrowRight,
  Clock,
  ExternalLink,
  ChevronRight
} from "lucide-react";

export const Page17DistrictDashboard = () => {
  const { currentProject, parcels, objections, navigateTo, currentUser, setSelectedProjectId } = useApp();

  const districtName = currentUser?.district || "Ahmedabad";
  const verifiedCount = parcels.filter((p) => p.verificationStatus === "Verified").length;
  const flaggedCount = parcels.filter((p) => p.verificationStatus === "Flagged").length;
  const pendingObjections = objections.filter((o) => o.status === "Hearing Scheduled" || o.status === "Pending" || o.status === "Under Review").length;

  // Static/dynamic Pending Action Queue
  const pendingActionQueue = [
    {
      id: "ACT-01",
      action: "Verify Land Record",
      project: "Highway Project",
      projectId: "PRJ-GJ-2026-101",
      pendingSince: "3 Days",
      priority: "High",
      targetPage: "land-verification"
    },
    {
      id: "ACT-02",
      action: "Objection Hearing",
      project: "Metro Project",
      projectId: "PRJ-GJ-2026-102",
      pendingSince: "2 Days",
      priority: "High",
      targetPage: "objections"
    },
    {
      id: "ACT-03",
      action: "Generate Award",
      project: "Industrial Park",
      projectId: "PRJ-GJ-2026-104",
      pendingSince: "5 Days",
      priority: "Medium",
      targetPage: "awards"
    },
    {
      id: "ACT-04",
      action: "Execute Possession Memo",
      project: "WDFC Freight Corridor",
      projectId: "PRJ-GJ-2026-01",
      pendingSince: "1 Day",
      priority: "High",
      targetPage: "possession"
    }
  ];

  // District Project Progress table
  const districtProjectProgress = [
    {
      id: "PRJ-GJ-2026-101",
      project: "NH Highway Extension",
      currentStage: "Compensation",
      progress: 75,
      risk: "Low"
    },
    {
      id: "PRJ-GJ-2026-102",
      project: "Metro Phase 2 Corridor",
      currentStage: "Objections",
      progress: 42,
      risk: "Medium"
    },
    {
      id: "PRJ-GJ-2026-104",
      project: "Sanand Industrial Park Phase 3",
      currentStage: "SIA",
      progress: 30,
      risk: "High"
    },
    {
      id: "PRJ-GJ-2026-01",
      project: "Western Dedicated Freight Corridor",
      currentStage: "Award Declaration",
      progress: 88,
      risk: "Low"
    }
  ];

  const handleOpenProject = (projectId) => {
    setSelectedProjectId(projectId);
    navigateTo("project-workflow", { projectId });
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header */}
      <div className="bg-white border border-slate-300 rounded p-4 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
          <div>
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              National Land Acquisition & Management System
            </div>
            <div className="text-xs text-[#1B365D] font-semibold">
              District Authority
            </div>
            <h1 className="text-xl font-bold text-slate-900 leading-tight flex items-center gap-2 mt-0.5">
              <ShieldCheck className="w-5 h-5 text-[#1B365D]" />
              Collector – {districtName} District
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigateTo("land-verification")}
              className="bg-[#1B365D] hover:bg-[#12243f] text-white px-3.5 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Verify Land Record</span>
            </button>
            <button
              onClick={() => navigateTo("project-workflow")}
              className="bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 px-3.5 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Layers className="w-3.5 h-3.5 text-slate-600" />
              <span>Project Workflow Hub</span>
            </button>
          </div>
        </div>
      </div>

      {/* 5 KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
        {/* Card 1 — Active Projects */}
        <div className="bg-white border border-slate-300 rounded p-3.5 shadow-2xs hover:border-[#1B365D] transition-colors">
          <div className="text-[11px] font-bold uppercase text-slate-500 mb-1">
            Total Active Projects
          </div>
          <div className="text-2xl font-bold text-[#1B365D]">12</div>
          <div className="text-[10px] text-slate-500 mt-1">Across District Jurisdiction</div>
        </div>

        {/* Card 2 — Parcels Pending Verification */}
        <div className="bg-white border border-slate-300 rounded p-3.5 shadow-2xs hover:border-amber-600 transition-colors">
          <div className="text-[11px] font-bold uppercase text-slate-500 mb-1">
            Pending Land Verification
          </div>
          <div className="text-2xl font-bold text-amber-700">34 Parcels</div>
          <div className="text-[10px] text-amber-800 font-semibold mt-1">e-Dhara RoR 7/12 Queue</div>
        </div>

        {/* Card 3 — Pending Objections */}
        <div className="bg-white border border-slate-300 rounded p-3.5 shadow-2xs hover:border-rose-600 transition-colors">
          <div className="text-[11px] font-bold uppercase text-slate-500 mb-1">
            Objections Pending
          </div>
          <div className="text-2xl font-bold text-rose-700">18</div>
          <div className="text-[10px] text-rose-800 font-semibold mt-1">Section 15 Citizen Claims</div>
        </div>

        {/* Card 4 — Awards Pending */}
        <div className="bg-white border border-slate-300 rounded p-3.5 shadow-2xs hover:border-blue-600 transition-colors">
          <div className="text-[11px] font-bold uppercase text-slate-500 mb-1">
            Awards Pending
          </div>
          <div className="text-2xl font-bold text-blue-900">7</div>
          <div className="text-[10px] text-blue-700 font-semibold mt-1">Section 23/31 Sanctions</div>
        </div>

        {/* Card 5 — Possession Pending */}
        <div className="bg-white border border-slate-300 rounded p-3.5 shadow-2xs hover:border-emerald-600 transition-colors">
          <div className="text-[11px] font-bold uppercase text-slate-500 mb-1">
            Possession Pending
          </div>
          <div className="text-2xl font-bold text-emerald-800">15 Parcels</div>
          <div className="text-[10px] text-emerald-700 font-semibold mt-1">Section 38 Panchnama</div>
        </div>
      </div>

      {/* Main Grid: Pending Action Queue & District Project Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (7 Cols): Pending Action Queue */}
        <div className="lg:col-span-7 bg-white border border-slate-300 rounded p-4 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b pb-2">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600" />
              Pending Action Queue
            </h2>
            <button
              onClick={() => navigateTo("land-verification")}
              className="text-xs font-semibold text-[#1B365D] hover:underline flex items-center gap-1"
            >
              <span>View All Pending Actions</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-100 text-slate-800 font-semibold border-b text-[11px] uppercase">
                <tr>
                  <th className="py-2.5 px-3 border-r">Action</th>
                  <th className="py-2.5 px-3 border-r">Project</th>
                  <th className="py-2.5 px-3 border-r">Pending Since</th>
                  <th className="py-2.5 px-3 border-r">Priority</th>
                  <th className="py-2.5 px-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {pendingActionQueue.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50">
                    <td className="py-3 px-3 border-r font-bold text-slate-900">
                      {item.action}
                    </td>
                    <td className="py-3 px-3 border-r text-slate-700 font-medium">
                      {item.project}
                    </td>
                    <td className="py-3 px-3 border-r text-slate-600 font-mono">
                      {item.pendingSince}
                    </td>
                    <td className="py-3 px-3 border-r">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          item.priority === "High"
                            ? "bg-rose-100 text-rose-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {item.priority}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-center">
                      <button
                        onClick={() => {
                          if (item.projectId) setSelectedProjectId(item.projectId);
                          navigateTo(item.targetPage);
                        }}
                        className="bg-[#1B365D] hover:bg-[#12243f] text-white px-3 py-1 rounded text-[11px] font-semibold transition-colors shadow-2xs"
                      >
                        Open
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column (5 Cols): District Project Progress */}
        <div className="lg:col-span-5 bg-white border border-slate-300 rounded p-4 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b pb-2">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#1B365D]" />
              District Project Progress
            </h2>
            <span className="text-[11px] text-slate-500 font-mono">Real-time Stage Tracking</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-100 text-slate-800 font-semibold border-b text-[11px] uppercase">
                <tr>
                  <th className="py-2.5 px-3 border-r">Project</th>
                  <th className="py-2.5 px-3 border-r">Current Stage</th>
                  <th className="py-2.5 px-3 border-r">Progress</th>
                  <th className="py-2.5 px-3 text-center">Risk</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {districtProjectProgress.map((proj) => (
                  <tr
                    key={proj.id}
                    onClick={() => handleOpenProject(proj.id)}
                    className="hover:bg-blue-50/50 cursor-pointer transition-colors"
                    title="Click to Open Project Workflow"
                  >
                    <td className="py-3 px-3 border-r font-bold text-slate-900">
                      <div className="hover:text-[#1B365D] flex items-center gap-1">
                        <span>{proj.project}</span>
                        <ExternalLink className="w-3 h-3 text-slate-400" />
                      </div>
                    </td>
                    <td className="py-3 px-3 border-r font-semibold text-slate-700">
                      {proj.currentStage}
                    </td>
                    <td className="py-3 px-3 border-r">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-slate-200 rounded-full h-1.5 overflow-hidden">
                          <div
                            className="bg-[#1B365D] h-full rounded-full"
                            style={{ width: `${proj.progress}%` }}
                          ></div>
                        </div>
                        <span className="font-mono font-bold text-[11px]">{proj.progress}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-center">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          proj.risk === "Low"
                            ? "bg-emerald-100 text-emerald-800"
                            : proj.risk === "Medium"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-rose-100 text-rose-800"
                        }`}
                      >
                        {proj.risk}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button
            onClick={() => navigateTo("project-workflow")}
            className="w-full py-2 bg-slate-50 hover:bg-slate-100 border border-slate-300 rounded text-xs font-bold text-[#1B365D] flex items-center justify-center gap-2 transition-colors"
          >
            <span>Open Project Workflow Hub</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Collector Complete Lifecycle Action Bar */}
      <div className="bg-white border border-slate-300 rounded p-4 shadow-xs">
        <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
          Collector Statutory Acquisition Workflow Stages
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
          <button
            onClick={() => navigateTo("land-verification")}
            className="p-3 border border-slate-200 rounded bg-slate-50 hover:bg-blue-50 hover:border-[#1B365D] text-left transition-all"
          >
            <div className="font-bold text-slate-900">1. Land Verification</div>
            <div className="text-[10px] text-slate-500 mt-0.5">e-Dhara 7/12 & RoR</div>
          </button>

          <button
            onClick={() => navigateTo("gazette-notifications")}
            className="p-3 border border-slate-200 rounded bg-slate-50 hover:bg-blue-50 hover:border-[#1B365D] text-left transition-all"
          >
            <div className="font-bold text-slate-900">2. Gazette Sec 11/19</div>
            <div className="text-[10px] text-slate-500 mt-0.5">Statutory Notifications</div>
          </button>

          <button
            onClick={() => navigateTo("objections")}
            className="p-3 border border-slate-200 rounded bg-slate-50 hover:bg-blue-50 hover:border-[#1B365D] text-left transition-all"
          >
            <div className="font-bold text-slate-900">3. Sec 15 Objections</div>
            <div className="text-[10px] text-slate-500 mt-0.5">Hearings & Decisions</div>
          </button>

          <button
            onClick={() => navigateTo("compensation")}
            className="p-3 border border-slate-200 rounded bg-slate-50 hover:bg-blue-50 hover:border-[#1B365D] text-left transition-all"
          >
            <div className="font-bold text-slate-900">4. Compensation</div>
            <div className="text-[10px] text-slate-500 mt-0.5">Solatium 100% & Interest</div>
          </button>

          <button
            onClick={() => navigateTo("awards")}
            className="p-3 border border-slate-200 rounded bg-slate-50 hover:bg-blue-50 hover:border-[#1B365D] text-left transition-all"
          >
            <div className="font-bold text-slate-900">5. Award Generation</div>
            <div className="text-[10px] text-slate-500 mt-0.5">Sec 23/31 & OTP e-Sign</div>
          </button>

          <button
            onClick={() => navigateTo("possession")}
            className="p-3 border border-slate-200 rounded bg-slate-50 hover:bg-blue-50 hover:border-[#1B365D] text-left transition-all"
          >
            <div className="font-bold text-slate-900">6. Possession Memo</div>
            <div className="text-[10px] text-slate-500 mt-0.5">Sec 38 GPS & Panchnama</div>
          </button>
        </div>
      </div>
    </div>
  );
};
