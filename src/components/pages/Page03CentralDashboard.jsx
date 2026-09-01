import React, { useState } from "react";
import { useApp } from "../../context/AppContext.jsx";
import { StatusBadge } from "../common/StatusBadge.jsx";
import {
  Layers,
  MapPin,
  TrendingUp,
  AlertTriangle,
  FileSpreadsheet,
  History,
  ArrowRight,
  ShieldAlert,
  Building,
  CheckCircle,
  Clock,
  Coins
} from "lucide-react";

export const Page03CentralDashboard = () => {
  const {
    nationalKpis,
    statesProgress,
    timelineBreachAlerts,
    centralProjectApprovals,
    centralRnRFundRequests,
    navigateTo,
    setSelectedProjectId,
    setSelectedStateFilter
  } = useApp();

  const [selectedState, setSelectedState] = useState(statesProgress[0] || {
    id: "GJ",
    name: "Gujarat",
    totalProjects: 38,
    completedProjects: 21,
    inProgress: 14,
    delayed: 3,
    areaRequired: 2840,
    areaAcquired: 2310,
    fundsAllocated: 1850.0,
    fundsDisbursed: 1620.4,
    riskLevel: "Low",
    performance: "Top Performing",
    complianceRate: "94.2%"
  });

  const pendingApprovalsCount = (centralProjectApprovals || []).filter(
    (p) => p.status === "Pending Review" || p.status === "Under Scrutiny"
  ).length;

  const pendingRnRCount = (centralRnRFundRequests || []).filter(
    (r) => r.status === "Pending Approval" || r.status === "Under Review"
  ).length;

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner & Header */}
      <div className="bg-[#1B365D] text-white p-4 rounded-md shadow-xs border border-[#142642] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-[#C5A059] text-[#1B365D] text-[10px] font-extrabold uppercase rounded tracking-wider">
              Central Authority • National Level
            </span>
            <span className="text-xs text-slate-300">Statutory Oversight & Allocation Portal</span>
          </div>
          <h1 className="text-xl font-bold text-white mt-1">
            National Land Acquisition & Management System (NLAMS)
          </h1>
          <p className="text-xs text-slate-300 mt-0.5">
            Pan-India monitoring of RFCTLARR 2013 compliance, state acquisitions, and R&R fund approvals.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => navigateTo("project-approvals")}
            className="bg-[#C5A059] hover:bg-[#b08d48] text-[#1B365D] font-bold px-3 py-1.5 rounded text-xs flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <span>Project Approvals</span>
            <span className="bg-[#1B365D] text-white px-1.5 py-0.2 rounded-full text-[10px]">
              {pendingApprovalsCount}
            </span>
          </button>
          <button
            onClick={() => navigateTo("rnr-fund-requests")}
            className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-3 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <span>R&R Fund Requests</span>
            <span className="bg-amber-400 text-slate-900 px-1.5 py-0.2 rounded-full text-[10px] font-bold">
              {pendingRnRCount}
            </span>
          </button>
          <button
            onClick={() => navigateTo("analytics")}
            className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-3 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>MIS Reports</span>
          </button>
        </div>
      </div>

      {/* 6 KPI Cards Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* KPI 1: Total Projects */}
        <div className="bg-white border border-slate-300 rounded p-3 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600">Total Projects</span>
            <Layers className="w-4 h-4 text-[#1B365D]" />
          </div>
          <div className="text-2xl font-bold text-slate-900">{nationalKpis.totalProjects || 248}</div>
          <div className="text-[11px] text-slate-600 mt-1 flex items-center justify-between font-medium">
            <span>On Track: <strong className="text-emerald-700">{nationalKpis.projectsOnTrack || 168}</strong></span>
            <span>Delayed: <strong className="text-rose-700">{nationalKpis.projectsDelayed || 56}</strong></span>
          </div>
        </div>

        {/* KPI 2: Land Acquired */}
        <div className="bg-white border border-slate-300 rounded p-3 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600">Land Acquired</span>
            <CheckCircle className="w-4 h-4 text-emerald-700" />
          </div>
          <div className="text-2xl font-bold text-emerald-800">
            {(nationalKpis?.areaAcquired || 12870).toLocaleString()} <span className="text-xs font-normal text-slate-500">Ac</span>
          </div>
          <div className="text-[11px] text-emerald-700 font-semibold mt-1">
            69.4% of Notified Area
          </div>
        </div>

        {/* KPI 3: Families Affected */}
        <div className="bg-white border border-slate-300 rounded p-3 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600">Families Affected</span>
            <Building className="w-4 h-4 text-purple-700" />
          </div>
          <div className="text-2xl font-bold text-slate-900">
            {(nationalKpis?.familiesAffected || 42350).toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-600 mt-1">
            SIA Census Surveyed
          </div>
        </div>

        {/* KPI 4: Compensation Disbursed */}
        <div className="bg-white border border-slate-300 rounded p-3 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600">Disbursed (PFMS)</span>
            <Coins className="w-4 h-4 text-amber-700" />
          </div>
          <div className="text-2xl font-bold text-amber-800">
            ₹ {nationalKpis.compensationDisbursed || "8,240.50"} <span className="text-xs font-normal text-slate-500">Cr</span>
          </div>
          <div className="text-[11px] text-emerald-700 font-semibold mt-1">
            100% DBT Bank Transfer
          </div>
        </div>

        {/* KPI 5: Pending R&R Requests */}
        <div className="bg-white border border-slate-300 rounded p-3 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600">Pending R&R</span>
            <AlertTriangle className="w-4 h-4 text-orange-600" />
          </div>
          <div className="text-2xl font-bold text-orange-800">
            {pendingRnRCount} <span className="text-xs font-normal text-slate-500">Requests</span>
          </div>
          <div className="text-[11px] text-slate-600 mt-1">
            ₹ 43.0 Cr Under Review
          </div>
        </div>

        {/* KPI 6: Projects at High Delay Risk */}
        <div className="bg-white border border-slate-300 rounded p-3 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600">High Delay Risk</span>
            <ShieldAlert className="w-4 h-4 text-rose-600" />
          </div>
          <div className="text-2xl font-bold text-rose-800">
            {nationalKpis.projectsHighRisk || 24} <span className="text-xs font-normal text-slate-500">Projects</span>
          </div>
          <div className="text-[11px] text-rose-700 font-semibold mt-1">
            Sec 25 Deadline Critical
          </div>
        </div>
      </div>

      {/* Interactive State Risk Matrix & Selection Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Heat Map Left (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-slate-300 rounded p-4 shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                National State Risk & Compliance Heat-Map
              </h2>
              <div className="text-[11px] text-slate-500">
                Click any State to inspect jurisdiction performance & filter projects
              </div>
            </div>
            <button
              onClick={() => navigateTo("state-progress")}
              className="text-xs font-bold text-[#1B365D] hover:underline flex items-center gap-1"
            >
              <span>View All States</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
            {statesProgress.map((st) => {
              const isSelected = selectedState.id === st.id;
              const isGreen = st.riskLevel === "Low";
              const isOrange = st.riskLevel === "Moderate";
              const isRed = st.riskLevel === "High";

              return (
                <button
                  key={st.id}
                  onClick={() => setSelectedState(st)}
                  className={`p-3 rounded border text-left transition-all ${
                    isSelected
                      ? "ring-2 ring-[#1B365D] bg-blue-50/70 border-[#1B365D] shadow-xs"
                      : "bg-slate-50 hover:bg-white border-slate-200"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-900">{st.name}</span>
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${
                        isGreen ? "bg-emerald-600" : isOrange ? "bg-amber-500" : "bg-rose-600"
                      }`}
                    />
                  </div>
                  <div className="text-[11px] text-slate-600 mt-1">
                    Projects: <strong>{st.totalProjects}</strong>
                  </div>
                  <div className="text-[10px] text-slate-500">
                    Acquired: {st.areaAcquired} / {st.areaRequired} Ac
                  </div>
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-600 pt-3 border-t border-slate-100 gap-2">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block"></span>
                Low Risk ({statesProgress.filter((s) => s.riskLevel === "Low").length})
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span>
                Moderate Risk ({statesProgress.filter((s) => s.riskLevel === "Moderate").length})
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-600 inline-block"></span>
                High Risk ({statesProgress.filter((s) => s.riskLevel === "High").length})
              </span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">DILRMP Live Sync Active</span>
          </div>
        </div>

        {/* Selected State Drill-down Card (Right 5 cols) */}
        <div className="lg:col-span-5 bg-white border border-slate-300 rounded p-4 shadow-xs space-y-3">
          <div className="border-b border-slate-200 pb-2 flex items-center justify-between">
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                Selected State Overview
              </div>
              <h3 className="font-bold text-base text-slate-900">
                {selectedState.name} State Jurisdiction
              </h3>
            </div>
            <StatusBadge status={selectedState.riskLevel} size="md" />
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-slate-50 border p-2 rounded">
              <span className="text-slate-500 block text-[11px]">Total State Projects:</span>
              <span className="font-bold text-slate-900 text-sm">{selectedState.totalProjects}</span>
              <div className="text-[10px] text-slate-500">
                Completed: {selectedState.completedProjects || 0} • Delayed: {selectedState.delayed || 0}
              </div>
            </div>
            <div className="bg-slate-50 border p-2 rounded">
              <span className="text-slate-500 block text-[11px]">Compliance Rate:</span>
              <span className="font-bold text-emerald-700 text-sm">{selectedState.complianceRate}</span>
              <div className="text-[10px] text-slate-500">{selectedState.performance}</div>
            </div>
            <div className="bg-slate-50 border p-2 rounded">
              <span className="text-slate-500 block text-[11px]">Funds Disbursed:</span>
              <span className="font-bold text-amber-800 text-sm">₹ {selectedState.fundsDisbursed} Cr</span>
              <div className="text-[10px] text-slate-500">Allocated: ₹ {selectedState.fundsAllocated} Cr</div>
            </div>
            <div className="bg-slate-50 border p-2 rounded">
              <span className="text-slate-500 block text-[11px]">Acquisition Rate:</span>
              <span className="font-bold text-slate-900 text-sm">
                {Math.round((selectedState.areaAcquired / (selectedState.areaRequired || 1)) * 100)}%
              </span>
              <div className="text-[10px] text-slate-500">
                {selectedState.areaAcquired} of {selectedState.areaRequired} Ac
              </div>
            </div>
          </div>

          <div className="pt-2 text-xs space-y-1">
            <div className="flex justify-between text-slate-700">
              <span>Land Handover Ratio:</span>
              <span className="font-bold">
                {selectedState.areaAcquired} of {selectedState.areaRequired} Acres
              </span>
            </div>
            <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-[#1B365D] h-full transition-all duration-500"
                style={{ width: `${Math.min(100, Math.round((selectedState.areaAcquired / (selectedState.areaRequired || 1)) * 100))}%` }}
              ></div>
            </div>
          </div>

          <div className="pt-2 flex gap-2">
            <button
              onClick={() => {
                if (setSelectedStateFilter) setSelectedStateFilter(selectedState.name);
                navigateTo("project-progress", { stateFilter: selectedState.name });
              }}
              className="flex-1 bg-[#1B365D] hover:bg-[#142642] text-white py-2 px-3 rounded font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
            >
              <span>View {selectedState.name} Projects</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => {
                if (setSelectedStateFilter) setSelectedStateFilter(selectedState.name);
                navigateTo("state-progress", { stateFilter: selectedState.name });
              }}
              className="bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 py-2 px-3 rounded font-semibold text-xs"
            >
              State Details
            </button>
          </div>
        </div>
      </div>

      {/* National Alerts Table */}
      <div className="bg-white border border-slate-300 rounded p-4 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-200 pb-2">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-600" />
            <h2 className="text-sm font-bold text-slate-900">
              National Alerts & Statutory Delay Risks
            </h2>
          </div>
          <span className="text-[11px] text-slate-500 font-medium">
            Projects exceeding RFCTLARR Act 2013 statutory timelines
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border border-slate-200">
            <thead className="bg-slate-100 text-slate-800 font-semibold border-b border-slate-200 uppercase text-[11px]">
              <tr>
                <th className="py-2.5 px-3 border-r">Project ID & Name</th>
                <th className="py-2.5 px-3 border-r">State / District</th>
                <th className="py-2.5 px-3 border-r">Current Stage</th>
                <th className="py-2.5 px-3 border-r">Issue / Root Cause</th>
                <th className="py-2.5 px-3 border-r">Statutory Deadline</th>
                <th className="py-2.5 px-3 border-r">Risk Level</th>
                <th className="py-2.5 px-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {timelineBreachAlerts.map((b) => (
                <tr key={b.id} className="hover:bg-slate-50">
                  <td className="py-2.5 px-3 border-r font-semibold text-slate-900 max-w-[260px]">
                    <div>{b.projectName}</div>
                    <div className="text-[10px] text-slate-500 font-mono">{b.projectId}</div>
                  </td>
                  <td className="py-2.5 px-3 border-r text-slate-700 whitespace-nowrap">
                    {b.state} • {b.district}
                  </td>
                  <td className="py-2.5 px-3 border-r font-medium text-[#1B365D]">
                    {b.currentStage}
                  </td>
                  <td className="py-2.5 px-3 border-r text-slate-600 max-w-[200px]">
                    {b.issue || `Exceeded deadline by +${b.delayDays} days (Pending Inquiry)`}
                  </td>
                  <td className="py-2.5 px-3 border-r font-mono text-slate-600 whitespace-nowrap">
                    {b.deadline}
                  </td>
                  <td className="py-2.5 px-3 border-r">
                    <StatusBadge status={b.riskLevel} />
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    <button
                      onClick={() => {
                        setSelectedProjectId(b.projectId);
                        navigateTo("project-workflow");
                      }}
                      className="bg-[#1B365D] text-white px-2.5 py-1 rounded text-[11px] font-semibold hover:bg-[#142642] shadow-2xs"
                    >
                      View Details →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          onClick={() => navigateTo("state-progress")}
          className="bg-white border border-slate-300 hover:border-[#1B365D] p-4 rounded shadow-2xs hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-[#1B365D] flex items-center justify-between">
            <span>State-wise Progress</span>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Compare all 28 States & UTs on land acquisition velocity and fund absorption.
          </p>
        </div>

        <div
          onClick={() => navigateTo("project-progress")}
          className="bg-white border border-slate-300 hover:border-[#1B365D] p-4 rounded shadow-2xs hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-[#1B365D] flex items-center justify-between">
            <span>Project-wise Progress</span>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Filter 248 projects by 12 stages, ministry, district, and breach risk.
          </p>
        </div>

        <div
          onClick={() => navigateTo("project-approvals")}
          className="bg-white border border-slate-300 hover:border-[#1B365D] p-4 rounded shadow-2xs hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-[#1B365D] flex items-center justify-between">
            <span>Project Approvals ({pendingApprovalsCount})</span>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Review and grant statutory clearance to major inter-state infrastructure proposals.
          </p>
        </div>

        <div
          onClick={() => navigateTo("rnr-fund-requests")}
          className="bg-white border border-slate-300 hover:border-[#1B365D] p-4 rounded shadow-2xs hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-[#1B365D] flex items-center justify-between">
            <span>R&R Fund Requests ({pendingRnRCount})</span>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Sanction centrally sponsored rehabilitation corpus funds for displaced families.
          </p>
        </div>
      </div>
    </div>
  );
};
