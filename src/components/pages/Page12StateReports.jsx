import React, { useState } from "react";
import { useApp } from "../../context/AppContext.jsx";
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
  FileDown
} from "lucide-react";

export const Page12StateReports = () => {
  const { projects, stateFundAllocations, stateRnRRequests, navigateTo } = useApp();

  // Filters
  const [reportType, setReportType] = useState("Project Progress Report");
  const [districtFilter, setDistrictFilter] = useState("All");
  const [projectTypeFilter, setProjectTypeFilter] = useState("All");
  const [stageFilter, setStageFilter] = useState("All");
  const [riskFilter, setRiskFilter] = useState("All");
  const [dateRange, setDateRange] = useState("FY 2026-27");
  const [downloadSuccess, setDownloadSuccess] = useState(null);

  const reportTypes = [
    { id: "Project Progress Report", label: "1. Project Progress Report", icon: Layers },
    { id: "District Performance Report", label: "2. District Performance Report", icon: Building2 },
    { id: "Land Acquisition Report", label: "3. Land Acquisition & Possession Report", icon: MapPin },
    { id: "Compensation Report", label: "4. Compensation Determination & PFMS Report", icon: Coins },
    { id: "R&R Status Report", label: "5. R&R Scheme & Entitlements Status Report", icon: HeartHandshake },
    { id: "Fund Utilization Report", label: "6. State Fund Utilization & Treasury Report", icon: FileSpreadsheet },
    { id: "Delay Risk Report", label: "7. Statutory Timeline Delay & Risk Report", icon: ShieldAlert }
  ];

  const exportReport = (format) => {
    setDownloadSuccess(`Generated and exported ${reportType} (${format.toUpperCase()}) successfully.`);
    setTimeout(() => setDownloadSuccess(null), 4000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div>
          <div className="text-xs text-slate-500 font-medium">
            State Revenue Department • Statutory MIS Reporting & Analytics Desk
          </div>
          <h1 className="text-xl font-bold text-slate-900 leading-tight flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-[#1B365D]" />
            State Reports & Statutory Analytics Hub
          </h1>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {downloadSuccess && (
            <span className="text-xs bg-emerald-100 text-emerald-800 font-semibold px-2.5 py-1 rounded border border-emerald-300 animate-fade-in">
              ✓ {downloadSuccess}
            </span>
          )}
          <button
            onClick={() => exportReport("excel")}
            className="bg-emerald-700 hover:bg-emerald-800 text-white px-3 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
          >
            <FileDown className="w-3.5 h-3.5" />
            <span>Export Excel (.XLSX)</span>
          </button>
          <button
            onClick={() => exportReport("pdf")}
            className="bg-[#1B365D] hover:bg-[#142946] text-white px-3 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Export Official PDF Report</span>
          </button>
        </div>
      </div>

      {/* Report Type Selector Pills */}
      <div className="bg-white border border-[#D1D5DB] rounded-lg p-3 shadow-2xs space-y-2">
        <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
          Select Statutory Report Module:
        </div>
        <div className="flex flex-wrap gap-2">
          {reportTypes.map((rt) => {
            const Icon = rt.icon;
            const isSelected = reportType === rt.id;
            return (
              <button
                key={rt.id}
                onClick={() => setReportType(rt.id)}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#1B365D] text-white shadow-2xs"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? "text-[#C5A059]" : "text-slate-600"}`} />
                <span>{rt.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 6 Comprehensive Filters */}
      <div className="bg-white border border-[#D1D5DB] rounded-lg p-4 shadow-2xs space-y-3">
        <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5 border-b pb-2">
          <Filter className="w-3.5 h-3.5 text-[#1B365D]" />
          <span>Report Configuration & Filtering Criteria</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
          {/* 1. District */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">1. Revenue District</label>
            <select
              value={districtFilter}
              onChange={(e) => setDistrictFilter(e.target.value)}
              className="w-full px-2.5 py-1.5 border border-slate-300 rounded bg-white text-slate-900 focus:ring-1 focus:ring-[#1B365D]"
            >
              <option value="All">All Districts</option>
              <option value="Ahmedabad">Ahmedabad</option>
              <option value="Vadodara">Vadodara</option>
              <option value="Surat">Surat</option>
              <option value="Rajkot">Rajkot</option>
              <option value="Bharuch">Bharuch</option>
              <option value="Anand">Anand</option>
              <option value="Kheda">Kheda</option>
            </select>
          </div>

          {/* 2. Project Type */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">2. Project Sector</label>
            <select
              value={projectTypeFilter}
              onChange={(e) => setProjectTypeFilter(e.target.value)}
              className="w-full px-2.5 py-1.5 border border-slate-300 rounded bg-white text-slate-900 focus:ring-1 focus:ring-[#1B365D]"
            >
              <option value="All">All Sectors</option>
              <option value="Railway Infrastructure">Railway / Freight</option>
              <option value="National Highway">National Expressway</option>
              <option value="Metro Rail">Urban Metro</option>
              <option value="Renewable Energy">Renewable Energy</option>
              <option value="Industrial Corridor">Industrial Hub</option>
            </select>
          </div>

          {/* 3. Stage Filter */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">3. Current Stage</label>
            <select
              value={stageFilter}
              onChange={(e) => setStageFilter(e.target.value)}
              className="w-full px-2.5 py-1.5 border border-slate-300 rounded bg-white text-slate-900 focus:ring-1 focus:ring-[#1B365D]"
            >
              <option value="All">All 11 Stages</option>
              <option value="Project Proposal">1. Proposal</option>
              <option value="Land Selection (GIS)">2. Land Selection</option>
              <option value="Land Verification">3. Verification</option>
              <option value="Social Impact Assessment">4. SIA</option>
              <option value="Section 11/19 Notification">5. Gazette Notification</option>
              <option value="Objections & Hearings">6. Objections</option>
              <option value="R&R Scheme Approval">7. R&R Scheme</option>
              <option value="Compensation Determination">8. Compensation</option>
              <option value="Award Declaration">9. Award (Sec 23)</option>
              <option value="PFMS DBT Payment">10. Payment</option>
              <option value="Possession & Handover">11. Possession</option>
            </select>
          </div>

          {/* 4. Risk Level */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">4. Risk Level</label>
            <select
              value={riskFilter}
              onChange={(e) => setRiskFilter(e.target.value)}
              className="w-full px-2.5 py-1.5 border border-slate-300 rounded bg-white text-slate-900 focus:ring-1 focus:ring-[#1B365D]"
            >
              <option value="All">All Risks</option>
              <option value="Low">Low Risk (On Track)</option>
              <option value="Moderate">Moderate Delay</option>
              <option value="High">High Risk (Lapsing Threat)</option>
            </select>
          </div>

          {/* 5. Date Range */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">5. Date Range</label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full px-2.5 py-1.5 border border-slate-300 rounded bg-white text-slate-900 focus:ring-1 focus:ring-[#1B365D]"
            >
              <option value="FY 2026-27">FY 2026-27 (Current)</option>
              <option value="Q2 2026">Q2 2026 (Jul - Sep)</option>
              <option value="Q1 2026">Q1 2026 (Apr - Jun)</option>
              <option value="FY 2025-26">FY 2025-26 (Full Year)</option>
            </select>
          </div>

          {/* 6. Action Button */}
          <div className="flex items-end">
            <button
              onClick={() => setDownloadSuccess(`Filter refreshed for ${reportType}`)}
              className="w-full bg-[#1B365D] hover:bg-[#142946] text-white py-1.5 px-3 rounded font-bold transition-colors cursor-pointer text-xs"
            >
              Generate Statement
            </button>
          </div>
        </div>
      </div>

      {/* Generated Report Statement Preview Table */}
      <div className="bg-white border border-[#D1D5DB] rounded-lg shadow-xs p-5 space-y-4">
        <div className="border-b pb-3 text-center space-y-1">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            Government of Gujarat • Revenue Department (Land Acquisition MIS)
          </div>
          <h2 className="text-base font-bold text-[#1B365D]">
            {reportType} — Performance Statement ({dateRange})
          </h2>
          <div className="text-[11px] text-slate-500 font-mono">
            Generated on: {new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })} • RFCTLARR Rule Compliance
          </div>
        </div>

        {/* Dynamic Table Content based on Report Type */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border border-slate-200">
            <thead className="bg-slate-100 text-slate-800 font-semibold border-b uppercase text-[11px]">
              <tr>
                <th className="py-2.5 px-3 border-r">Revenue District</th>
                <th className="py-2.5 px-3 border-r">Active Projects</th>
                <th className="py-2.5 px-3 border-r">Notified Land (Ac)</th>
                <th className="py-2.5 px-3 border-r">Possessed Land (Ac)</th>
                <th className="py-2.5 px-3 border-r">Compensation Disbursed</th>
                <th className="py-2.5 px-3 border-r">R&R Families</th>
                <th className="py-2.5 px-3 text-center">Compliance Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              <tr className="hover:bg-slate-50">
                <td className="py-2.5 px-3 border-r font-bold text-slate-900">Ahmedabad</td>
                <td className="py-2.5 px-3 border-r">12</td>
                <td className="py-2.5 px-3 border-r">4,730.0</td>
                <td className="py-2.5 px-3 border-r font-semibold text-emerald-700">3,410.0</td>
                <td className="py-2.5 px-3 border-r font-semibold text-[#C5A059]">₹ 480.50 Cr</td>
                <td className="py-2.5 px-3 border-r">1,840</td>
                <td className="py-2.5 px-3 text-center text-emerald-700 font-bold">On Schedule</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="py-2.5 px-3 border-r font-bold text-slate-900">Vadodara</td>
                <td className="py-2.5 px-3 border-r">10</td>
                <td className="py-2.5 px-3 border-r">3,720.0</td>
                <td className="py-2.5 px-3 border-r font-semibold text-emerald-700">2,980.0</td>
                <td className="py-2.5 px-3 border-r font-semibold text-[#C5A059]">₹ 390.20 Cr</td>
                <td className="py-2.5 px-3 border-r">1,420</td>
                <td className="py-2.5 px-3 text-center text-emerald-700 font-bold">On Schedule</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="py-2.5 px-3 border-r font-bold text-slate-900">Surat</td>
                <td className="py-2.5 px-3 border-r">8</td>
                <td className="py-2.5 px-3 border-r">3,360.0</td>
                <td className="py-2.5 px-3 border-r font-semibold text-amber-700">2,150.0</td>
                <td className="py-2.5 px-3 border-r font-semibold text-[#C5A059]">₹ 310.40 Cr</td>
                <td className="py-2.5 px-3 border-r">1,260</td>
                <td className="py-2.5 px-3 text-center text-amber-700 font-bold">Moderate Delay</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="py-2.5 px-3 border-r font-bold text-slate-900">Rajkot</td>
                <td className="py-2.5 px-3 border-r">6</td>
                <td className="py-2.5 px-3 border-r">2,240.0</td>
                <td className="py-2.5 px-3 border-r font-semibold text-emerald-700">1,520.0</td>
                <td className="py-2.5 px-3 border-r font-semibold text-[#C5A059]">₹ 215.00 Cr</td>
                <td className="py-2.5 px-3 border-r">890</td>
                <td className="py-2.5 px-3 text-center text-emerald-700 font-bold">On Schedule</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="py-2.5 px-3 border-r font-bold text-slate-900">Bharuch</td>
                <td className="py-2.5 px-3 border-r">5</td>
                <td className="py-2.5 px-3 border-r">1,770.0</td>
                <td className="py-2.5 px-3 border-r font-semibold text-emerald-700">1,240.0</td>
                <td className="py-2.5 px-3 border-r font-semibold text-[#C5A059]">₹ 165.80 Cr</td>
                <td className="py-2.5 px-3 border-r">640</td>
                <td className="py-2.5 px-3 text-center text-emerald-700 font-bold">On Schedule</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="py-2.5 px-3 border-r font-bold text-slate-900">Anand</td>
                <td className="py-2.5 px-3 border-r">4</td>
                <td className="py-2.5 px-3 border-r">1,180.0</td>
                <td className="py-2.5 px-3 border-r font-semibold text-emerald-700">890.0</td>
                <td className="py-2.5 px-3 border-r font-semibold text-[#C5A059]">₹ 142.60 Cr</td>
                <td className="py-2.5 px-3 border-r">520</td>
                <td className="py-2.5 px-3 text-center text-emerald-700 font-bold">On Schedule</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="py-2.5 px-3 border-r font-bold text-slate-900">Kheda</td>
                <td className="py-2.5 px-3 border-r">3</td>
                <td className="py-2.5 px-3 border-r">800.0</td>
                <td className="py-2.5 px-3 border-r font-semibold text-rose-700">480.0</td>
                <td className="py-2.5 px-3 border-r font-semibold text-[#C5A059]">₹ 78.40 Cr</td>
                <td className="py-2.5 px-3 border-r">310</td>
                <td className="py-2.5 px-3 text-center text-rose-700 font-bold">High Risk Delay</td>
              </tr>
            </tbody>
            <tfoot className="bg-slate-100 font-bold text-slate-900 border-t border-slate-300">
              <tr>
                <td className="py-2.5 px-3 border-r">State Aggregate</td>
                <td className="py-2.5 px-3 border-r">48</td>
                <td className="py-2.5 px-3 border-r">17,800.0</td>
                <td className="py-2.5 px-3 border-r text-emerald-700">12,670.0</td>
                <td className="py-2.5 px-3 border-r text-[#C5A059]">₹ 1,782.90 Cr</td>
                <td className="py-2.5 px-3 border-r">6,880</td>
                <td className="py-2.5 px-3 text-center text-emerald-700">71.2% Possession Rate</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};
