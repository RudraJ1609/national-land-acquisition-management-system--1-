import React, { useState } from "react";
import { useApp } from "../../context/AppContext.jsx";
import { StatusBadge } from "../common/StatusBadge.jsx";
import {
  Search,
  Filter,
  Download,
  ArrowRight,
  Layers,
  CheckCircle,
  AlertTriangle,
  Clock,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

export const Page05ProjectWiseProgress = () => {
  const { projects, navigateTo, setSelectedProjectId, selectedStateFilter } = useApp();

  const [searchQuery, setSearchQuery] = useState("");
  const [stateFilter, setStateFilter] = useState(selectedStateFilter || "All");
  const [stageFilter, setStageFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [riskFilter, setRiskFilter] = useState("All");

  // Filtering
  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.requiringBody.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesState = stateFilter === "All" || p.state === stateFilter;
    const matchesStage = stageFilter === "All" || p.currentStage.includes(stageFilter);
    const matchesType = typeFilter === "All" || p.type === typeFilter;
    const matchesRisk = riskFilter === "All" || p.riskLevel === riskFilter;

    return matchesSearch && matchesState && matchesStage && matchesType && matchesRisk;
  });

  const onProjectClick = (projectId) => {
    setSelectedProjectId(projectId);
    navigateTo("project-workflow");
  };

  const exportCsv = () => {
    const headers = "Project ID,Project Name,State,District,Project Type,Requiring Body,Current Stage,Progress %,Land Required (Acres),Land Acquired,Days to Deadline,Risk Status\n";
    const rows = filteredProjects
      .map(
        (p) =>
          `"${p.id}","${p.name}","${p.state}","${p.district}","${p.type}","${p.requiringBody}","${p.currentStage}",${p.progressPercentage},${p.landRequired},${p.landAcquired},${p.daysToDeadline},"${p.riskLevel}"`
      )
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `National_Project_Progress_${new Date().toISOString().substring(0, 10)}.csv`;
    a.click();
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div>
          <div className="text-xs text-slate-500 font-medium">
            Central Authority • National Project Registry
          </div>
          <h1 className="text-xl font-bold text-slate-900 leading-tight">
            Project-wise Land Acquisition Progress
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={exportCsv}
            className="bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 px-3 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Projects CSV</span>
          </button>
        </div>
      </div>

      {/* KPI Row above table */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="bg-white border border-slate-300 rounded p-3 shadow-2xs">
          <div className="text-slate-500">Total Filtered Projects</div>
          <div className="text-xl font-bold text-slate-900">{filteredProjects.length}</div>
        </div>
        <div className="bg-white border border-slate-300 rounded p-3 shadow-2xs">
          <div className="text-slate-500">On Track (Low Risk)</div>
          <div className="text-xl font-bold text-emerald-700">
            {filteredProjects.filter((p) => p.riskLevel === "Low").length}
          </div>
        </div>
        <div className="bg-white border border-slate-300 rounded p-3 shadow-2xs">
          <div className="text-slate-500">Moderate Delay</div>
          <div className="text-xl font-bold text-amber-700">
            {filteredProjects.filter((p) => p.riskLevel === "Moderate").length}
          </div>
        </div>
        <div className="bg-white border border-slate-300 rounded p-3 shadow-2xs">
          <div className="text-slate-500">High Risk / Breached</div>
          <div className="text-xl font-bold text-rose-700">
            {filteredProjects.filter((p) => p.riskLevel === "High").length}
          </div>
        </div>
      </div>

      {/* Compact Filters */}
      <div className="bg-white border border-slate-300 rounded p-4 shadow-2xs space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
          {/* Keyword Search */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Search Project / ID</label>
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Name or ID..."
                className="w-full pl-8 pr-2.5 py-1.5 border border-slate-300 rounded text-slate-900 focus:ring-1 focus:ring-[#1e3a8a]"
              />
            </div>
          </div>

          {/* State Filter */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">State / UT</label>
            <select
              value={stateFilter}
              onChange={(e) => setStateFilter(e.target.value)}
              className="w-full px-2.5 py-1.5 border border-slate-300 rounded bg-white text-slate-900 focus:ring-1 focus:ring-[#1e3a8a]"
            >
              <option value="All">All States</option>
              <option value="Gujarat">Gujarat</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Rajasthan">Rajasthan</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Odisha">Odisha</option>
            </select>
          </div>

          {/* 12-Stage Dropdown Filter */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Current Stage</label>
            <select
              value={stageFilter}
              onChange={(e) => setStageFilter(e.target.value)}
              className="w-full px-2.5 py-1.5 border border-slate-300 rounded bg-white text-slate-900 focus:ring-1 focus:ring-[#1e3a8a]"
            >
              <option value="All">All 11 Stages</option>
              <option value="Proposal">Stage 1: Proposal</option>
              <option value="Land Selection">Stage 2: Land Selection</option>
              <option value="Verification">Stage 3: Verification</option>
              <option value="Social Impact">Stage 4: SIA</option>
              <option value="Notification">Stage 5: Sec 11/19 Notification</option>
              <option value="Objection">Stage 6: Objections</option>
              <option value="R&R">Stage 7: R&R Scheme</option>
              <option value="Compensation">Stage 8: Compensation</option>
              <option value="Award">Stage 9: Award</option>
              <option value="Payment">Stage 10: PFMS Payment</option>
              <option value="Possession">Stage 11: Possession</option>
            </select>
          </div>

          {/* Project Type */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Infrastructure Sector</label>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full px-2.5 py-1.5 border border-slate-300 rounded bg-white text-slate-900 focus:ring-1 focus:ring-[#1e3a8a]"
            >
              <option value="All">All Sectors</option>
              <option value="Railway Infrastructure">Railways</option>
              <option value="Highways & Expressways">Highways</option>
              <option value="Renewable Energy">Solar / Wind</option>
              <option value="Civil Aviation">Airports</option>
              <option value="Urban Mass Transit">Metro Rail</option>
              <option value="Industrial Corridor">Industrial Corridor</option>
              <option value="Ports & Shipping">Ports</option>
            </select>
          </div>

          {/* Risk Level */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Timeline Risk</label>
            <select
              value={riskFilter}
              onChange={(e) => setRiskFilter(e.target.value)}
              className="w-full px-2.5 py-1.5 border border-slate-300 rounded bg-white text-slate-900 focus:ring-1 focus:ring-[#1e3a8a]"
            >
              <option value="All">All Risks</option>
              <option value="Low">Low Risk</option>
              <option value="Moderate">Moderate</option>
              <option value="High">High Risk</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
          <span className="text-slate-500">
            Displaying <strong>{filteredProjects.length}</strong> matching projects
          </span>
          <button
            onClick={() => {
              setSearchQuery("");
              setStateFilter("All");
              setStageFilter("All");
              setTypeFilter("All");
              setRiskFilter("All");
            }}
            className="text-[#1e3a8a] hover:underline font-semibold"
          >
            Reset Filters
          </button>
        </div>
      </div>

      {/* Projects Table */}
      <div className="bg-white border border-slate-300 rounded shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-100 text-slate-800 font-semibold border-b border-slate-200 uppercase text-[11px]">
              <tr>
                <th className="py-3 px-3.5 border-r">Project ID & Name</th>
                <th className="py-3 px-3 border-r">State / District</th>
                <th className="py-3 px-3 border-r">Sector / Ministry</th>
                <th className="py-3 px-3 border-r">Current Stage</th>
                <th className="py-3 px-3 border-r">Progress</th>
                <th className="py-3 px-3 border-r">Land (Acquired / Req)</th>
                <th className="py-3 px-3 border-r">Deadline Remaining</th>
                <th className="py-3 px-3 border-r">Risk Level</th>
                <th className="py-3 px-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredProjects.map((p) => (
                <tr
                  key={p.id}
                  onClick={() => onProjectClick(p.id)}
                  className="hover:bg-blue-50/60 cursor-pointer transition-colors"
                >
                  <td className="py-3 px-3.5 border-r font-bold text-slate-900 max-w-[260px]">
                    <div className="text-slate-900 hover:text-[#1e3a8a]">{p.name}</div>
                    <div className="text-[10px] text-slate-500 font-mono mt-0.5">{p.id} • {p.requiringBody}</div>
                  </td>
                  <td className="py-3 px-3 border-r text-slate-700">
                    <span className="font-semibold">{p.state}</span>
                    <div className="text-[10px] text-slate-500">{p.district}</div>
                  </td>
                  <td className="py-3 px-3 border-r text-slate-700">
                    <span className="font-medium">{p.type}</span>
                    <div className="text-[10px] text-slate-500">{p.ministry}</div>
                  </td>
                  <td className="py-3 px-3 border-r font-semibold text-[#1e3a8a]">
                    Stage {p.currentStageIndex}: {p.currentStage}
                  </td>
                  <td className="py-3 px-3 border-r max-w-[140px]">
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className="font-bold">{p.progressPercentage}%</span>
                      <span className="text-[10px] text-slate-500">Stage {p.currentStageIndex}/11</span>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-[#1e3a8a] h-full"
                        style={{ width: `${p.progressPercentage}%` }}
                      ></div>
                    </div>
                  </td>
                  <td className="py-3 px-3 border-r text-slate-700">
                    <span className="font-semibold text-slate-900">{p.landAcquired}</span> / {p.landRequired} Ac
                  </td>
                  <td className="py-3 px-3 border-r font-mono text-slate-700">
                    <span className="font-bold text-slate-900">{p.daysToDeadline}</span> Days
                  </td>
                  <td className="py-3 px-3 border-r">
                    <StatusBadge status={p.riskLevel} />
                  </td>
                  <td className="py-3 px-3 text-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onProjectClick(p.id);
                      }}
                      className="bg-[#1e3a8a] hover:bg-[#172554] text-white px-2.5 py-1 rounded text-[11px] font-semibold inline-flex items-center gap-1 shadow-2xs"
                    >
                      <span>Workflow</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
          <div>Showing 1 to {filteredProjects.length} of {filteredProjects.length} entries</div>
          <div className="flex items-center gap-1">
            <button className="px-2 py-1 border border-slate-300 rounded bg-white text-slate-400 cursor-not-allowed">
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <span className="px-2 py-1 bg-[#1e3a8a] text-white font-bold rounded">1</span>
            <button className="px-2 py-1 border border-slate-300 rounded bg-white text-slate-400 cursor-not-allowed">
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
