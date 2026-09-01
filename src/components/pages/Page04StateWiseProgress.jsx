import React, { useState } from "react";
import { useApp } from "../../context/AppContext.jsx";
import { StatusBadge } from "../common/StatusBadge.jsx";
import {
  Search,
  Filter,
  Download,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  FileSpreadsheet,
  CheckCircle2,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

export const Page04StateWiseProgress = () => {
  const { statesProgress, navigateTo, setSelectedStateFilter } = useApp();

  const [searchQuery, setSearchQuery] = useState("");
  const [riskFilter, setRiskFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("projects_desc");
  const [currentPage, setCurrentPage] = useState(1);

  // Filter logic
  let filteredStates = statesProgress.filter((st) => {
    const matchesSearch = st.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRisk = riskFilter === "All" || st.riskLevel === riskFilter;
    const matchesStatus =
      statusFilter === "All" ||
      (statusFilter === "Top" && st.performance.includes("Top")) ||
      (statusFilter === "Attention" && st.performance.includes("Attention"));
    return matchesSearch && matchesRisk && matchesStatus;
  });

  // Sorting
  filteredStates.sort((a, b) => {
    if (sortBy === "projects_desc") return b.totalProjects - a.totalProjects;
    if (sortBy === "acquired_desc") return b.areaAcquired - a.areaAcquired;
    if (sortBy === "funds_desc") return b.fundsDisbursed - a.fundsDisbursed;
    if (sortBy === "name_asc") return a.name.localeCompare(b.name);
    return 0;
  });

  const handleRowClick = (stateName) => {
    setSelectedStateFilter(stateName);
    navigateTo("project-progress", { stateFilter: stateName });
  };

  const exportCsv = () => {
    const headers = "State,Total Projects,Completed,In Progress,Delayed,Area Required (Acres),Area Acquired (Acres),Funds Disbursed (Cr),Risk Level\n";
    const rows = filteredStates
      .map(
        (s) =>
          `"${s.name}",${s.totalProjects},${s.completedProjects},${s.inProgress},${s.delayed},${s.areaRequired},${s.areaAcquired},${s.fundsDisbursed},"${s.riskLevel}"`
      )
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `State_Wise_Land_Acquisition_Progress_${new Date().toISOString().substring(0, 10)}.csv`;
    a.click();
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div>
          <div className="text-xs text-slate-500 font-medium">
            Central Authority • National Oversight
          </div>
          <h1 className="text-xl font-bold text-slate-900 leading-tight">
            State-wise Land Acquisition Progress
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={exportCsv}
            className="bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 px-3 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export State CSV</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white border border-slate-300 rounded p-4 shadow-2xs space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          {/* Search */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Search State / UT</label>
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="e.g. Gujarat, Maharashtra..."
                className="w-full pl-8 pr-2.5 py-1.5 border border-slate-300 rounded text-slate-900 focus:ring-1 focus:ring-[#1e3a8a]"
              />
            </div>
          </div>

          {/* Risk Level Filter */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">AI Risk Level</label>
            <select
              value={riskFilter}
              onChange={(e) => setRiskFilter(e.target.value)}
              className="w-full px-2.5 py-1.5 border border-slate-300 rounded bg-white text-slate-900 focus:ring-1 focus:ring-[#1e3a8a]"
            >
              <option value="All">All Risk Levels</option>
              <option value="Low">Low Risk (On Track)</option>
              <option value="Moderate">Moderate Delay</option>
              <option value="High">High Risk / Breached</option>
            </select>
          </div>

          {/* Performance Classification */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Performance Category</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-2.5 py-1.5 border border-slate-300 rounded bg-white text-slate-900 focus:ring-1 focus:ring-[#1e3a8a]"
            >
              <option value="All">All Categories</option>
              <option value="Top">Top Performing States</option>
              <option value="Attention">States Requiring Attention</option>
            </select>
          </div>

          {/* Sort By */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Sort States By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-2.5 py-1.5 border border-slate-300 rounded bg-white text-slate-900 focus:ring-1 focus:ring-[#1e3a8a]"
            >
              <option value="projects_desc">Total Projects (High to Low)</option>
              <option value="acquired_desc">Land Acquired (Acres)</option>
              <option value="funds_desc">Funds Disbursed (₹ Cr)</option>
              <option value="name_asc">State Name (A - Z)</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
          <span className="text-slate-500">
            Showing <strong>{filteredStates.length}</strong> states matching criteria
          </span>
          <button
            onClick={() => {
              setSearchQuery("");
              setRiskFilter("All");
              setStatusFilter("All");
              setSortBy("projects_desc");
            }}
            className="text-[#1e3a8a] hover:underline font-semibold"
          >
            Reset Filters
          </button>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white border border-slate-300 rounded shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-100 text-slate-800 font-semibold border-b border-slate-200 uppercase text-[11px]">
              <tr>
                <th className="py-3 px-3.5 border-r">State / UT</th>
                <th className="py-3 px-3 border-r text-center">Total Projects</th>
                <th className="py-3 px-3 border-r">Acquisition Progress (%)</th>
                <th className="py-3 px-3 border-r">Area Acquired / Required</th>
                <th className="py-3 px-3 border-r">Funds Disbursed (₹ Cr)</th>
                <th className="py-3 px-3 border-r">Compliance Rate</th>
                <th className="py-3 px-3 border-r">Delay Risk</th>
                <th className="py-3 px-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredStates.map((st) => {
                const percent = Math.round((st.areaAcquired / st.areaRequired) * 100);
                return (
                  <tr
                    key={st.id}
                    onClick={() => handleRowClick(st.name)}
                    className="hover:bg-blue-50/60 cursor-pointer transition-colors"
                  >
                    <td className="py-3 px-3.5 border-r font-bold text-slate-900">
                      <div className="flex items-center gap-1.5">
                        <span>{st.name}</span>
                        <span className="text-[10px] text-slate-400 font-mono">({st.id})</span>
                      </div>
                      <div className="text-[10px] text-slate-500 font-normal">
                        {st.completedProjects} Completed • {st.delayed} Delayed
                      </div>
                    </td>
                    <td className="py-3 px-3 border-r text-center font-bold text-slate-800 text-sm">
                      {st.totalProjects}
                    </td>
                    <td className="py-3 px-3 border-r max-w-[180px]">
                      <div className="flex items-center justify-between text-[11px] mb-1">
                        <span className="font-semibold">{percent}%</span>
                        <span className="text-slate-500">{st.inProgress} active</span>
                      </div>
                      <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${
                            percent >= 80 ? "bg-emerald-600" : percent >= 60 ? "bg-[#1e3a8a]" : "bg-amber-500"
                          }`}
                          style={{ width: `${percent}%` }}
                        ></div>
                      </div>
                    </td>
                    <td className="py-3 px-3 border-r text-slate-700">
                      <span className="font-semibold text-slate-900">{(st.areaAcquired || 0).toLocaleString()}</span> / {(st.areaRequired || 0).toLocaleString()} Acres
                    </td>
                    <td className="py-3 px-3 border-r font-semibold text-amber-800">
                      ₹ {(st.fundsDisbursed || 0).toLocaleString()} <span className="text-[10px] text-slate-500 font-normal">/ ₹ {st.fundsAllocated}</span>
                    </td>
                    <td className="py-3 px-3 border-r font-semibold text-slate-800">
                      {st.complianceRate}
                    </td>
                    <td className="py-3 px-3 border-r">
                      <StatusBadge status={st.riskLevel} />
                    </td>
                    <td className="py-3 px-3 text-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRowClick(st.name);
                        }}
                        className="bg-[#1e3a8a] hover:bg-[#172554] text-white px-2.5 py-1 rounded text-[11px] font-semibold inline-flex items-center gap-1 shadow-2xs"
                      >
                        <span>View Projects</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
          <div>Showing 1 to {filteredStates.length} of {filteredStates.length} entries</div>
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

      {/* Bottom Performance Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Top Performing States */}
        <div className="bg-white border border-slate-300 rounded p-4 shadow-2xs space-y-3">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-900">
              Top Performing States (Highest Acquisition Velocity)
            </h3>
          </div>
          <div className="space-y-2">
            {statesProgress
              .filter((s) => s.performance === "Top Performing")
              .slice(0, 3)
              .map((st) => (
                <div
                  key={st.id}
                  onClick={() => handleRowClick(st.name)}
                  className="p-2.5 bg-emerald-50/50 border border-emerald-200 rounded flex items-center justify-between text-xs cursor-pointer hover:bg-emerald-100/60"
                >
                  <div>
                    <span className="font-bold text-slate-900">{st.name}</span>
                    <span className="text-slate-500 ml-2">({st.totalProjects} Projects)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-emerald-800">
                      {Math.round((st.areaAcquired / st.areaRequired) * 100)}% Acquired
                    </span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded font-bold">
                      {st.complianceRate}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* States Requiring Attention */}
        <div className="bg-white border border-slate-300 rounded p-4 shadow-2xs space-y-3">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
            <AlertTriangle className="w-4 h-4 text-rose-700" />
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-900">
              States Requiring Central Attention & Advisory
            </h3>
          </div>
          <div className="space-y-2">
            {statesProgress
              .filter((s) => s.performance === "Requires Attention" || s.riskLevel === "High")
              .slice(0, 3)
              .map((st) => (
                <div
                  key={st.id}
                  onClick={() => handleRowClick(st.name)}
                  className="p-2.5 bg-rose-50/50 border border-rose-200 rounded flex items-center justify-between text-xs cursor-pointer hover:bg-rose-100/60"
                >
                  <div>
                    <span className="font-bold text-slate-900">{st.name}</span>
                    <span className="text-slate-500 ml-2">({st.delayed} Projects Delayed)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-rose-800">
                      {Math.round((st.areaAcquired / st.areaRequired) * 100)}% Acquired
                    </span>
                    <StatusBadge status={st.riskLevel} />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
