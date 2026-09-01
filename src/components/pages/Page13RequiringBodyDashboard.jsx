import React from "react";
import { useApp } from "../../context/AppContext.jsx";
import { StatusBadge } from "../common/StatusBadge.jsx";
import {
  Layers,
  MapPin,
  Clock,
  CheckCircle,
  FileText,
  Compass,
  ArrowRight,
  TrendingUp,
  Building
} from "lucide-react";

export const Page13RequiringBodyDashboard = () => {
  const { projects, navigateTo, setSelectedProjectId, currentUser } = useApp();

  const requiringAgency = currentUser?.agency || "Dedicated Freight Corridor Corporation (DFCCIL)";
  const projectList = projects || [];
  const myProjects = projectList.filter(
    (p) => (p.requiringBody || "").includes("DFCCIL") || p.requiringBody === requiringAgency
  );

  const totalArea = myProjects.reduce((acc, p) => acc + (Number(p.landRequired) || 0), 0);
  const possessedArea = myProjects.reduce((acc, p) => acc + (Number(p.landAcquired) || 0), 0);

  return (
    <div className="space-y-6 pb-12">
      {/* Title */}
      <div className="border-b border-slate-200 pb-3">
        <div className="text-xs text-slate-500 font-medium">
          Requiring Body Portal • Infrastructure Development Authority
        </div>
        <h1 className="text-xl font-bold text-slate-900 leading-tight flex items-center gap-2">
          <Building className="w-5 h-5 text-[#1e3a8a]" />
          Requiring Body Project Dashboard ({requiringAgency})
        </h1>
      </div>

      {/* 4 KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white border border-slate-300 rounded p-4 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-semibold uppercase">Submitted Projects</span>
            <Layers className="w-4 h-4 text-[#1e3a8a]" />
          </div>
          <div className="text-2xl font-bold text-slate-900">{myProjects.length}</div>
          <div className="text-[11px] text-slate-600 mt-1">Under Active Acquisition</div>
        </div>

        <div className="bg-white border border-slate-300 rounded p-4 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-semibold uppercase">Land Required</span>
            <MapPin className="w-4 h-4 text-blue-700" />
          </div>
          <div className="text-2xl font-bold text-slate-900">
            {totalArea} <span className="text-xs font-normal">Acres</span>
          </div>
          <div className="text-[11px] text-slate-600 mt-1">Alignment Verified</div>
        </div>

        <div className="bg-white border border-slate-300 rounded p-4 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-semibold uppercase">Land Handed Over</span>
            <CheckCircle className="w-4 h-4 text-emerald-700" />
          </div>
          <div className="text-2xl font-bold text-emerald-800">
            {possessedArea} <span className="text-xs font-normal">Acres</span>
          </div>
          <div className="text-[11px] text-emerald-700 font-semibold mt-1">
            {Math.round((possessedArea / totalArea) * 100)}% Total Possession
          </div>
        </div>

        <div className="bg-white border border-slate-300 rounded p-4 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-semibold uppercase">Deposit Funds Balance</span>
            <Clock className="w-4 h-4 text-amber-700" />
          </div>
          <div className="text-2xl font-bold text-amber-800">₹ 380 Cr</div>
          <div className="text-[11px] text-slate-600 mt-1">Deposited with Collectors</div>
        </div>
      </div>

      {/* Requiring Body Projects Table */}
      <div className="bg-white border border-slate-300 rounded p-4 shadow-xs space-y-3">
        <div className="flex items-center justify-between border-b border-slate-200 pb-2">
          <h2 className="text-sm font-bold text-slate-900">
            Active Acquisition Corridors & Handover Tracking
          </h2>
          <button
            onClick={() => navigateTo("gis-parcels")}
            className="text-xs font-semibold text-[#1e3a8a] hover:underline flex items-center gap-1"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Open Spatial GIS Editor →</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border border-slate-200">
            <thead className="bg-slate-100 text-slate-800 font-semibold border-b uppercase text-[11px]">
              <tr>
                <th className="py-2.5 px-3 border-r">Project Name & ID</th>
                <th className="py-2.5 px-3 border-r">State / District</th>
                <th className="py-2.5 px-3 border-r">Current Stage</th>
                <th className="py-2.5 px-3 border-r">Land Progress (Acres)</th>
                <th className="py-2.5 px-3 border-r">Timeline Days</th>
                <th className="py-2.5 px-3 border-r">State Clearance</th>
                <th className="py-2.5 px-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {myProjects.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50">
                  <td className="py-2.5 px-3 border-r font-semibold text-slate-900">
                    <div>{p.name}</div>
                    <div className="text-[10px] text-slate-500 font-mono">{p.id} • {p.type}</div>
                  </td>
                  <td className="py-2.5 px-3 border-r text-slate-700">
                    {p.state} ({p.district})
                  </td>
                  <td className="py-2.5 px-3 border-r font-semibold text-[#1e3a8a]">
                    Stage {p.currentStageIndex}: {p.currentStage}
                  </td>
                  <td className="py-2.5 px-3 border-r">
                    <div className="font-semibold text-slate-900">{p.landAcquired} / {p.landRequired} Ac</div>
                    <div className="w-24 bg-slate-200 h-1.5 rounded-full overflow-hidden mt-1">
                      <div
                        className="bg-emerald-600 h-full"
                        style={{ width: `${(p.landAcquired / p.landRequired) * 100}%` }}
                      ></div>
                    </div>
                  </td>
                  <td className="py-2.5 px-3 border-r font-mono text-slate-700">
                    {p.daysToDeadline} Days
                  </td>
                  <td className="py-2.5 px-3 border-r">
                    <StatusBadge status={p.stateApprovalStatus} />
                  </td>
                  <td className="py-2.5 px-3 text-center space-x-1.5">
                    <button
                      onClick={() => {
                        setSelectedProjectId(p.id);
                        navigateTo("project-workflow");
                      }}
                      className="bg-[#1e3a8a] text-white px-2.5 py-1 rounded text-[11px] font-semibold hover:bg-blue-900"
                    >
                      Hub →
                    </button>
                    <button
                      onClick={() => navigateTo("handover-tracker")}
                      className="bg-slate-100 text-slate-700 border border-slate-300 px-2 py-1 rounded text-[11px] font-semibold hover:bg-slate-200"
                    >
                      Handover
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
