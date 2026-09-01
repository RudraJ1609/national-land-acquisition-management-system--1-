import React, { useState } from "react";
import { useApp } from "../../context/AppContext.jsx";
import { GovEmblem } from "../common/GovEmblem.jsx";
import { StatusBadge } from "../common/StatusBadge.jsx";
import {
  FileText,
  Download,
  Printer,
  Filter,
  Building2,
  Coins,
  MapPin,
  FileSpreadsheet,
  Calendar,
  Layers,
  ShieldAlert,
  HeartHandshake,
  CheckCircle2,
  AlertTriangle,
  Search,
  FileDown,
  Bell,
  Eye,
  ShieldCheck
} from "lucide-react";

export const Page40DistrictReports = () => {
  const { projects, parcels, objections, gazetteNotifications, disbursements, stateRnRRequests, currentUser, currentProject } = useApp();

  const [selectedReportType, setSelectedReportType] = useState("Land Acquisition Progress Report");
  const [projectFilter, setProjectFilter] = useState("All");
  const [districtFilter, setDistrictFilter] = useState(currentUser?.district || "Ahmedabad");
  const [villageFilter, setVillageFilter] = useState("All");
  const [dateRange, setDateRange] = useState("FY 2026-27");
  const [statusFilter, setStatusFilter] = useState("All");
  const [feedback, setFeedback] = useState("");

  const reportTypes = [
    { id: "Land Acquisition Progress Report", label: "1. Land Acquisition Progress Report", icon: Layers },
    { id: "Compensation Disbursement Summary", label: "2. Compensation Disbursement Summary", icon: Coins },
    { id: "Objection & Hearing Status Report", label: "3. Objection & Hearing Status Report", icon: ShieldAlert },
    { id: "R&R Implementation Report", label: "4. R&R Implementation Report", icon: HeartHandshake },
    { id: "Gazette Publication Register", label: "5. Gazette Publication Register", icon: Bell },
    { id: "Village-wise Acquisition Status", label: "6. Village-wise Acquisition Status", icon: MapPin }
  ];

  const handleExport = (format) => {
    setFeedback(`Report "${selectedReportType}" successfully exported as ${format.toUpperCase()} with official Collectorate authentication.`);
    setTimeout(() => setFeedback(""), 3500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div>
          <div className="text-xs text-slate-500 font-medium">
            District Collectorate • Statutory MIS Reporting & Land Records Synthesis
          </div>
          <h1 className="text-xl font-bold text-slate-900 leading-tight flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-[#1B365D]" />
            District Reports & Statutory Returns Desk
          </h1>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {feedback && (
            <span className="text-xs bg-emerald-100 text-emerald-800 font-semibold px-2.5 py-1 rounded border border-emerald-300">
              ✓ {feedback}
            </span>
          )}
          <button
            onClick={() => handleExport("Excel")}
            className="bg-emerald-700 hover:bg-emerald-800 text-white px-3 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition-colors"
          >
            <FileDown className="w-3.5 h-3.5" />
            <span>Excel (.XLSX)</span>
          </button>
          <button
            onClick={() => handleExport("PDF")}
            className="bg-[#1B365D] hover:bg-[#12243f] text-white px-3 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Official PDF</span>
          </button>
          <button
            onClick={handlePrint}
            className="bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 px-3 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition-colors"
          >
            <Printer className="w-3.5 h-3.5 text-slate-600" />
            <span>Print Report</span>
          </button>
        </div>
      </div>

      {/* Grid: Report Types Selector & Multi-Filters (Left 4 cols) vs Report Preview Area (Right 8 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Selector & Filters (Left 4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Report Types List */}
          <div className="bg-white border border-slate-300 rounded p-4 shadow-xs space-y-2">
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-700 border-b pb-2">
              Select Statutory Report Type
            </h3>
            <div className="space-y-1.5">
              {reportTypes.map((rt) => {
                const isSelected = selectedReportType === rt.id;
                const IconComponent = rt.icon;
                return (
                  <button
                    key={rt.id}
                    onClick={() => setSelectedReportType(rt.id)}
                    className={`w-full text-left p-2.5 rounded text-xs font-semibold flex items-center gap-2.5 transition-all ${
                      isSelected
                        ? "bg-[#1B365D] text-white shadow-xs"
                        : "text-slate-700 hover:bg-slate-100 border border-slate-200"
                    }`}
                  >
                    <IconComponent className={`w-4 h-4 ${isSelected ? "text-[#C5A059]" : "text-slate-500"}`} />
                    <span>{rt.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Filter Parameters */}
          <div className="bg-white border border-slate-300 rounded p-4 shadow-xs space-y-3 text-xs">
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-700 border-b pb-2 flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-[#1B365D]" />
              <span>Report Filters</span>
            </h3>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Project</label>
              <select
                value={projectFilter}
                onChange={(e) => setProjectFilter(e.target.value)}
                className="w-full p-2 border border-slate-300 rounded bg-white"
              >
                <option value="All">All District Projects</option>
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">District</label>
              <input
                type="text"
                disabled
                value={districtFilter}
                className="w-full p-2 border border-slate-200 bg-slate-100 rounded text-slate-600 font-bold"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Revenue Village</label>
              <select
                value={villageFilter}
                onChange={(e) => setVillageFilter(e.target.value)}
                className="w-full p-2 border border-slate-300 rounded bg-white"
              >
                <option value="All">All Villages</option>
                <option value="Sunav">Sunav</option>
                <option value="Bandhani">Bandhani</option>
                <option value="Rampura">Rampura</option>
                <option value="Agas">Agas</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Date Range</label>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full p-2 border border-slate-300 rounded bg-white"
              >
                <option value="FY 2026-27">Financial Year 2026-27</option>
                <option value="Current Quarter (Q2 2026)">Current Quarter (Q2 2026)</option>
                <option value="Last 30 Days">Last 30 Days</option>
                <option value="All Time">All Time Project Inception</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full p-2 border border-slate-300 rounded bg-white"
              >
                <option value="All">All Statuses</option>
                <option value="Completed">Completed / Disbursed</option>
                <option value="In Progress">In Progress</option>
                <option value="Pending">Pending Action</option>
              </select>
            </div>
          </div>
        </div>

        {/* Report Preview Area (Right 8 cols) */}
        <div className="lg:col-span-8 bg-white border border-slate-400 rounded p-6 shadow-md space-y-5 text-xs">
          {/* Government Header */}
          <div className="text-center border-b-2 border-slate-900 pb-3 space-y-1">
            <GovEmblem className="w-10 h-12 mx-auto" color="text-slate-900" />
            <div className="font-bold text-xs uppercase tracking-widest text-slate-900 font-serif">
              OFFICE OF THE DISTRICT COLLECTOR & MAGISTRATE
            </div>
            <div className="text-[10px] uppercase text-slate-600 font-sans">
              DISTRICT {districtFilter.toUpperCase()} • REVENUE & LAND ACQUISITION WING
            </div>
            <div className="text-xs font-bold text-[#1B365D] uppercase mt-1 font-sans">
              {selectedReportType.toUpperCase()}
            </div>
            <div className="text-[10px] font-mono text-slate-500">
              Generated On: {new Date().toLocaleDateString("en-IN", { dateStyle: "long" })} • Period: {dateRange}
            </div>
          </div>

          {/* Filter Criteria Metadata Strip */}
          <div className="p-2.5 bg-slate-50 border border-slate-200 rounded grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px] text-slate-700 font-mono">
            <div>• Project: {projectFilter === "All" ? "All Projects" : "WDFC Corridor"}</div>
            <div>• District: {districtFilter}</div>
            <div>• Village: {villageFilter}</div>
            <div>• Status: {statusFilter}</div>
          </div>

          {/* Summary Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 border border-slate-200 rounded bg-white">
              <span className="text-slate-500 block text-[10px] font-semibold uppercase">Total Parcels</span>
              <span className="font-bold text-slate-900 text-base">{parcels.length} Units</span>
            </div>
            <div className="p-3 border border-slate-200 rounded bg-white">
              <span className="text-slate-500 block text-[10px] font-semibold uppercase">Total Acquired Area</span>
              <span className="font-bold text-blue-900 text-base">34.8 Acres</span>
            </div>
            <div className="p-3 border border-slate-200 rounded bg-white">
              <span className="text-slate-500 block text-[10px] font-semibold uppercase">Compensation Awarded</span>
              <span className="font-bold text-emerald-800 text-base">₹ 42.50 Cr</span>
            </div>
            <div className="p-3 border border-slate-200 rounded bg-white">
              <span className="text-slate-500 block text-[10px] font-semibold uppercase">Disbursed (PFMS)</span>
              <span className="font-bold text-purple-900 text-base">₹ 36.12 Cr (85%)</span>
            </div>
          </div>

          {/* Detailed Data Table */}
          <div className="border border-slate-300 rounded overflow-hidden">
            <div className="bg-slate-100 px-3 py-2 border-b font-bold text-slate-800 text-xs flex justify-between">
              <span>Detailed Record Register</span>
              <span className="font-mono text-[10px] text-slate-500">Showing {parcels.length} Active Records</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-700 font-semibold border-b text-[10px] uppercase">
                  <tr>
                    <th className="py-2.5 px-3 border-r">Survey No</th>
                    <th className="py-2.5 px-3 border-r">Village</th>
                    <th className="py-2.5 px-3 border-r">Landowner</th>
                    <th className="py-2.5 px-3 border-r">Area (Acres)</th>
                    <th className="py-2.5 px-3 border-r">Compensation (₹)</th>
                    <th className="py-2.5 px-3 border-r">Award ID</th>
                    <th className="py-2.5 px-3 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {parcels.map((prc) => (
                    <tr key={prc.id} className="hover:bg-slate-50">
                      <td className="py-2 px-3 border-r font-mono font-bold text-slate-900">{prc.surveyNumber}</td>
                      <td className="py-2 px-3 border-r">{prc.village}</td>
                      <td className="py-2 px-3 border-r font-medium text-slate-800">{prc.ownerName}</td>
                      <td className="py-2 px-3 border-r font-bold text-slate-700">{prc.areaAcres}</td>
                      <td className="py-2 px-3 border-r font-mono font-bold text-emerald-800">
                        ₹ {((Number(prc.finalCompensationAmount) || 2450000) / 100000).toFixed(2)} L
                      </td>
                      <td className="py-2 px-3 border-r font-mono text-slate-600">{prc.awardId || "AWD-2026-01"}</td>
                      <td className="py-2 px-3 text-center">
                        <StatusBadge status={prc.status || "Completed"} size="xs" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Digital Signature / Verification Stamp */}
          <div className="pt-4 border-t border-slate-300 flex items-center justify-between font-sans text-xs">
            <div>
              <div className="font-bold text-slate-900">District Collector & Competent Land Authority</div>
              <div className="text-[10px] text-slate-500">Government of Gujarat • Official Seal</div>
              <div className="text-[10px] text-emerald-700 font-mono flex items-center gap-1 mt-0.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>NIC-CA Digital Signature: AUTHENTICATED</span>
              </div>
            </div>
            <div className="text-right border border-slate-300 p-2 rounded bg-slate-50 font-mono text-[10px]">
              <div className="font-bold text-slate-800">BARCODE / HASH</div>
              <div className="text-slate-500">GJ-REV-RPT-2026-8942-OK</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
