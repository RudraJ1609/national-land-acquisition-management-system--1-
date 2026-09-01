import React, { useState } from "react";
import { useApp } from "../../context/AppContext.jsx";
import {
  FileSpreadsheet,
  Download,
  Filter,
  BarChart3,
  PieChart,
  Calendar,
  Layers,
  MapPin,
  Coins,
  TrendingUp,
  Building,
  CheckCircle2,
  AlertTriangle,
  Clock
} from "lucide-react";

export const Page30CentralAnalyticsReports = () => {
  const { nationalKpis, statesProgress, projects, navigateTo } = useApp();
  const [selectedReportType, setSelectedReportType] = useState("statutory-summary");
  const [timePeriod, setTimePeriod] = useState("FY 2025-26");
  const [selectedMinistry, setSelectedMinistry] = useState("All");
  const [downloadMsg, setDownloadMsg] = useState("");

  const exportReport = (format) => {
    setDownloadMsg(`Generated Central Authority MIS Report (${format.toUpperCase()}) for ${timePeriod}`);
    setTimeout(() => setDownloadMsg(""), 3500);
  };

  const projectList = projects || [];
  const totalCompensationCr = projectList.reduce((acc, p) => {
    const costStr = p?.estimatedCost ? String(p.estimatedCost).replace(/[^\d.]/g, '') : "0";
    return acc + (parseFloat(costStr) || 0);
  }, 0);

  return (
    <div className="space-y-6 pb-12">
      {downloadMsg && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 px-4 py-2 rounded text-xs font-semibold flex items-center justify-between shadow-2xs animate-fade-in">
          <span>✓ {downloadMsg}</span>
          <button onClick={() => setDownloadMsg("")} className="text-emerald-700 hover:text-emerald-950 font-bold cursor-pointer">✕</button>
        </div>
      )}

      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div>
          <div className="text-xs text-slate-500 font-medium">
            Central Authority • National Land Acquisition Monitoring System (NLAMS)
          </div>
          <h1 className="text-xl font-bold text-slate-900 leading-tight flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-[#1B365D]" />
            National Analytics & Statutory Reports
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => exportReport("pdf")}
            className="bg-[#1B365D] hover:bg-[#142946] text-white px-3.5 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Export Official PDF</span>
          </button>
          <button
            onClick={() => exportReport("csv")}
            className="bg-white hover:bg-slate-100 text-slate-800 border border-[#D1D5DB] px-3.5 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-700" />
            <span>Export CSV / Excel</span>
          </button>
        </div>
      </div>

      {/* Filter Control Ribbon */}
      <div className="bg-white border border-[#D1D5DB] rounded-lg p-4 shadow-2xs grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        <div>
          <label className="block font-semibold text-slate-700 mb-1">Report Module</label>
          <select
            value={selectedReportType}
            onChange={(e) => setSelectedReportType(e.target.value)}
            className="w-full p-2 border border-[#D1D5DB] rounded bg-white text-slate-900 font-medium focus:border-[#1B365D] focus:outline-none"
          >
            <option value="statutory-summary">RFCTLARR Statutory Compliance Summary</option>
            <option value="timeline-audit">Statutory Timeline Compliance (12-Month Limit)</option>
            <option value="compensation-payouts">National Compensation & PFMS DBT Outflow</option>
            <option value="ministry-breakdown">Inter-Ministerial Infrastructure Alignment</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold text-slate-700 mb-1">Financial Year / Period</label>
          <select
            value={timePeriod}
            onChange={(e) => setTimePeriod(e.target.value)}
            className="w-full p-2 border border-[#D1D5DB] rounded bg-white text-slate-900 font-medium focus:border-[#1B365D] focus:outline-none"
          >
            <option value="FY 2025-26">FY 2025-26 (Current Operational Cycle)</option>
            <option value="FY 2024-25">FY 2024-25 (Audited Financial Year)</option>
            <option value="FY 2023-24">FY 2023-24 (Historical Benchmark)</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold text-slate-700 mb-1">Requiring Ministry</label>
          <select
            value={selectedMinistry}
            onChange={(e) => setSelectedMinistry(e.target.value)}
            className="w-full p-2 border border-[#D1D5DB] rounded bg-white text-slate-900 font-medium focus:border-[#1B365D] focus:outline-none"
          >
            <option value="All">All Ministries (MoRTH, Railways, MoCA, MoPNG)</option>
            <option value="Railways">Ministry of Railways (DFCCIL)</option>
            <option value="Roads">Ministry of Road Transport & Highways (NHAI)</option>
            <option value="Aviation">Ministry of Civil Aviation (AAI)</option>
          </select>
        </div>
      </div>

      {/* Analytics KPI Highlights */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
        <div className="bg-white border border-[#D1D5DB] rounded-lg p-4 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="font-semibold uppercase text-[10px]">National Projects</span>
            <Layers className="w-4 h-4 text-[#1B365D]" />
          </div>
          <div className="text-2xl font-bold text-[#1B365D]">{nationalKpis.totalProjects}</div>
          <div className="text-[11px] text-emerald-700 font-medium mt-1">
            {nationalKpis.projectsOnTrack} on statutory schedule
          </div>
        </div>

        <div className="bg-white border border-[#D1D5DB] rounded-lg p-4 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="font-semibold uppercase text-[10px]">Total Land Notified</span>
            <MapPin className="w-4 h-4 text-blue-700" />
          </div>
          <div className="text-2xl font-bold text-slate-900">
            {(nationalKpis?.areaNotified || 0).toLocaleString()} <span className="text-xs font-normal">Acres</span>
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Section 11(1) Gazette Published
          </div>
        </div>

        <div className="bg-white border border-[#D1D5DB] rounded-lg p-4 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="font-semibold uppercase text-[10px]">Possession Realized</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
          </div>
          <div className="text-2xl font-bold text-emerald-800">
            {(nationalKpis?.areaAcquired || 0).toLocaleString()} <span className="text-xs font-normal">Acres</span>
          </div>
          <div className="text-[11px] text-emerald-700 font-medium mt-1">
            69.4% Handover Completed
          </div>
        </div>

        <div className="bg-white border border-[#D1D5DB] rounded-lg p-4 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="font-semibold uppercase text-[10px]">Total Compensation Outlay</span>
            <Coins className="w-4 h-4 text-[#C5A059]" />
          </div>
          <div className="text-2xl font-bold text-[#C5A059]">
            ₹ {nationalKpis.compensationDisbursed} <span className="text-xs font-normal">Cr</span>
          </div>
          <div className="text-[11px] text-emerald-700 font-medium mt-1">
            100% PFMS DBT Verified
          </div>
        </div>
      </div>

      {/* Main Report Table Container */}
      <div className="bg-white border border-[#D1D5DB] rounded-lg shadow-xs p-5 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
          <div>
            <h2 className="text-base font-bold text-[#1B365D]">
              State-by-State Statutory Performance & Lapsing Risk Matrix
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Statutory 12-month mandate from Section 11(1) to Section 19(1) declaration compliance.
            </p>
          </div>
          <span className="text-xs text-[#C5A059] font-bold bg-amber-50 px-2.5 py-1 rounded border border-amber-200">
            Official Audit Period: {timePeriod}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border border-slate-200">
            <thead className="bg-[#e2e8f0] text-[#475569] font-semibold border-b border-[#cbd5e1] uppercase text-[11px]">
              <tr>
                <th className="py-2.5 px-3 border-r border-[#cbd5e1]">State / UT</th>
                <th className="py-2.5 px-3 border-r border-[#cbd5e1] text-center">Active Projects</th>
                <th className="py-2.5 px-3 border-r border-[#cbd5e1]">Area Required (Ac)</th>
                <th className="py-2.5 px-3 border-r border-[#cbd5e1]">Area Possessed (Ac)</th>
                <th className="py-2.5 px-3 border-r border-[#cbd5e1]">Completion %</th>
                <th className="py-2.5 px-3 border-r border-[#cbd5e1]">Compensation Disbursed</th>
                <th className="py-2.5 px-3 border-r border-[#cbd5e1]">Avg. Award Duration</th>
                <th className="py-2.5 px-3 text-center">Risk Level</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {statesProgress.map((st) => {
                const completionPct = Math.round((st.areaAcquired / st.areaRequired) * 100);
                return (
                  <tr key={st.id} className="hover:bg-slate-50">
                    <td className="py-2.5 px-3 border-r border-slate-200 font-bold text-slate-900">
                      {st.name}
                    </td>
                    <td className="py-2.5 px-3 border-r border-slate-200 text-center font-semibold text-[#1B365D]">
                      {st.totalProjects}
                    </td>
                    <td className="py-2.5 px-3 border-r border-slate-200 font-mono text-slate-700">
                      {(st.areaRequired || 0).toLocaleString()}
                    </td>
                    <td className="py-2.5 px-3 border-r border-slate-200 font-mono font-semibold text-emerald-700">
                      {(st.areaAcquired || 0).toLocaleString()}
                    </td>
                    <td className="py-2.5 px-3 border-r border-slate-200">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-slate-200 h-2 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${completionPct > 70 ? 'bg-emerald-600' : completionPct > 45 ? 'bg-blue-600' : 'bg-amber-500'}`}
                            style={{ width: `${completionPct}%` }}
                          />
                        </div>
                        <span className="font-bold text-[11px] text-slate-700 w-8 text-right">{completionPct}%</span>
                      </div>
                    </td>
                    <td className="py-2.5 px-3 border-r border-slate-200 font-semibold text-[#C5A059]">
                      ₹ {st.fundsDisbursed} Cr
                    </td>
                    <td className="py-2.5 px-3 border-r border-slate-200 text-slate-600 font-medium">
                      {st.riskLevel === "Low" ? "8.4 Months" : st.riskLevel === "Moderate" ? "11.2 Months" : "14.8 Months (Overdue)"}
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                        st.riskLevel === "Low"
                          ? "bg-emerald-50 text-emerald-800 border border-emerald-300"
                          : st.riskLevel === "Moderate"
                          ? "bg-amber-50 text-amber-800 border border-amber-300"
                          : "bg-rose-50 text-rose-800 border border-rose-300"
                      }`}>
                        {st.riskLevel}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
