import React from "react";
import { useApp } from "../../context/AppContext.jsx";
import { StatusBadge } from "../common/StatusBadge.jsx";
import {
  Building2,
  FileCheck,
  MapPin,
  Clock,
  Coins,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Layers,
  ChevronRight,
  TrendingUp,
  Landmark,
  FileSpreadsheet,
  AlertCircle
} from "lucide-react";

export const Page09StateDashboard = () => {
  const {
    projects,
    navigateTo,
    setSelectedProjectId,
    setSelectedDistrictFilter,
    currentUser
  } = useApp();

  const projectList = projects || [];
  const stateName = currentUser?.state || "Gujarat";
  const stateProjects = projectList.filter((p) => p.state === stateName || p.state === "Gujarat");
  const pendingApprovals = stateProjects.filter(
    (p) => p.stateApprovalStatus === "Pending" || p.status === "Pending State Approval"
  );

  // District Progress Data for Gujarat State
  const districtProgressData = [
    {
      name: "Ahmedabad",
      projectsCount: 12,
      completion: 72,
      pendingWork: 5,
      landAcquired: "3,410 / 4,730 Ac",
      compensation: "₹ 480.50 Cr",
      risk: "Low"
    },
    {
      name: "Vadodara",
      projectsCount: 10,
      completion: 80,
      pendingWork: 2,
      landAcquired: "2,980 / 3,720 Ac",
      compensation: "₹ 390.20 Cr",
      risk: "Low"
    },
    {
      name: "Surat",
      projectsCount: 8,
      completion: 64,
      pendingWork: 3,
      landAcquired: "2,150 / 3,360 Ac",
      compensation: "₹ 310.40 Cr",
      risk: "Moderate"
    },
    {
      name: "Rajkot",
      projectsCount: 6,
      completion: 68,
      pendingWork: 3,
      landAcquired: "1,520 / 2,240 Ac",
      compensation: "₹ 215.00 Cr",
      risk: "Moderate"
    },
    {
      name: "Bharuch",
      projectsCount: 5,
      completion: 70,
      pendingWork: 2,
      landAcquired: "1,240 / 1,770 Ac",
      compensation: "₹ 165.80 Cr",
      risk: "Low"
    },
    {
      name: "Anand",
      projectsCount: 4,
      completion: 75,
      pendingWork: 2,
      landAcquired: "890 / 1,180 Ac",
      compensation: "₹ 142.60 Cr",
      risk: "Low"
    },
    {
      name: "Kheda",
      projectsCount: 3,
      completion: 60,
      pendingWork: 4,
      landAcquired: "480 / 800 Ac",
      compensation: "₹ 78.40 Cr",
      risk: "High"
    }
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header */}
      <div className="bg-[#1B365D] text-white p-5 rounded-lg shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#C5A059] font-semibold uppercase tracking-wider">
              <Landmark className="w-4 h-4 text-[#C5A059]" />
              Government of Gujarat • Revenue Department
            </div>
            <h1 className="text-xl md:text-2xl font-bold mt-1 tracking-tight">
              State Land Acquisition Management Dashboard
            </h1>
            <p className="text-xs text-slate-200 mt-1 max-w-2xl">
              State Authority Oversight • District Collectorate Monitoring • Project Proposal Approvals & R&R Fund Coordination
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => navigateTo("state-approvals")}
              className="bg-[#C5A059] hover:bg-[#b08d48] text-[#1B365D] font-bold px-3.5 py-2 rounded text-xs flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer"
            >
              <FileCheck className="w-4 h-4" />
              <span>Pending Approvals ({pendingApprovals.length > 0 ? pendingApprovals.length : 8})</span>
            </button>
            <button
              onClick={() => navigateTo("state-fund-allocation")}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-3.5 py-2 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Coins className="w-4 h-4 text-[#C5A059]" />
              <span>Fund Allocation</span>
            </button>
          </div>
        </div>
      </div>

      {/* 6 State KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-white border border-[#D1D5DB] rounded-lg p-3.5 shadow-2xs hover:border-[#1B365D] transition-colors">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600">Total Projects</span>
            <Building2 className="w-3.5 h-3.5 text-[#1B365D]" />
          </div>
          <div className="text-xl font-bold text-[#1B365D]">48</div>
          <div className="text-[10px] text-slate-500 mt-0.5">Across 14 Districts</div>
        </div>

        <div className="bg-white border border-[#D1D5DB] rounded-lg p-3.5 shadow-2xs hover:border-emerald-500 transition-colors">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">On Track</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          </div>
          <div className="text-xl font-bold text-emerald-700">35</div>
          <div className="text-[10px] text-emerald-600 font-medium mt-0.5">Within SLA timelines</div>
        </div>

        <div className="bg-white border border-[#D1D5DB] rounded-lg p-3.5 shadow-2xs hover:border-rose-500 transition-colors">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700">Delayed Projects</span>
            <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
          </div>
          <div className="text-xl font-bold text-rose-700">6</div>
          <div className="text-[10px] text-rose-600 font-medium mt-0.5">Requires Collector push</div>
        </div>

        <div className="bg-white border border-[#D1D5DB] rounded-lg p-3.5 shadow-2xs hover:border-[#1B365D] transition-colors">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600">Land Acquired</span>
            <MapPin className="w-3.5 h-3.5 text-[#1B365D]" />
          </div>
          <div className="text-xl font-bold text-slate-900">12,450 <span className="text-xs font-normal">Ac</span></div>
          <div className="text-[10px] text-emerald-700 font-semibold mt-0.5">73.6% Possession</div>
        </div>

        <div className="bg-white border border-[#D1D5DB] rounded-lg p-3.5 shadow-2xs hover:border-amber-500 transition-colors">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#C5A059]">Disbursed</span>
            <Coins className="w-3.5 h-3.5 text-[#C5A059]" />
          </div>
          <div className="text-xl font-bold text-slate-900">₹ 1,250 <span className="text-xs font-normal">Cr</span></div>
          <div className="text-[10px] text-slate-500 mt-0.5">PFMS DBT Settled</div>
        </div>

        <div className="bg-white border border-amber-300 bg-amber-50/40 rounded-lg p-3.5 shadow-2xs hover:border-amber-500 transition-colors">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">Pending Approvals</span>
            <Clock className="w-3.5 h-3.5 text-amber-600" />
          </div>
          <div className="text-xl font-bold text-amber-700">8</div>
          <div className="text-[10px] text-amber-800 font-semibold mt-0.5">Awaiting State Review</div>
        </div>
      </div>

      {/* Quick Actions Bar */}
      <div className="bg-white border border-[#D1D5DB] rounded-lg p-3 shadow-2xs flex flex-wrap items-center justify-between gap-2">
        <span className="text-xs font-bold text-slate-700 uppercase tracking-wider px-2">
          State Authority Quick Actions:
        </span>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => navigateTo("district-monitoring")}
            className="px-3 py-1.5 bg-slate-100 hover:bg-[#1B365D] hover:text-white text-slate-800 rounded text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>View District Progress</span>
          </button>
          <button
            onClick={() => navigateTo("project-progress")}
            className="px-3 py-1.5 bg-slate-100 hover:bg-[#1B365D] hover:text-white text-slate-800 rounded text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>View All State Projects</span>
          </button>
          <button
            onClick={() => navigateTo("state-approvals")}
            className="px-3 py-1.5 bg-amber-50 hover:bg-amber-600 hover:text-white text-amber-800 border border-amber-200 rounded text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <FileCheck className="w-3.5 h-3.5" />
            <span>Pending Approvals Queue</span>
          </button>
          <button
            onClick={() => navigateTo("state-fund-allocation")}
            className="px-3 py-1.5 bg-slate-100 hover:bg-[#1B365D] hover:text-white text-slate-800 rounded text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Coins className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Fund Allocation & R&R</span>
          </button>
          <button
            onClick={() => navigateTo("state-reports")}
            className="px-3 py-1.5 bg-slate-100 hover:bg-[#1B365D] hover:text-white text-slate-800 rounded text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>State Reports</span>
          </button>
        </div>
      </div>

      {/* District-wise Progress Monitoring Section */}
      <div className="bg-white border border-[#D1D5DB] rounded-lg shadow-2xs p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-[#1B365D]" />
              District-wise Land Acquisition Progress & Workload
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Monitoring operational execution across District Collectorates in Gujarat
            </p>
          </div>
          <button
            onClick={() => navigateTo("district-monitoring")}
            className="text-xs font-semibold text-[#1B365D] hover:underline flex items-center gap-1 cursor-pointer"
          >
            Detailed District Drilldown →
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border border-slate-200">
            <thead className="bg-slate-50 text-slate-800 font-semibold border-b uppercase text-[11px]">
              <tr>
                <th className="py-2.5 px-3 border-r">District</th>
                <th className="py-2.5 px-3 border-r text-center">Active Projects</th>
                <th className="py-2.5 px-3 border-r">Progress Rate</th>
                <th className="py-2.5 px-3 border-r text-center">Pending Tasks</th>
                <th className="py-2.5 px-3 border-r">Land Acquired</th>
                <th className="py-2.5 px-3 border-r">Compensation</th>
                <th className="py-2.5 px-3 border-r text-center">Risk</th>
                <th className="py-2.5 px-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {districtProgressData.map((d) => (
                <tr key={d.name} className="hover:bg-slate-50">
                  <td className="py-2.5 px-3 border-r font-bold text-slate-900">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#1B365D]" />
                      <span>{d.name}</span>
                    </div>
                  </td>
                  <td className="py-2.5 px-3 border-r text-center font-bold text-slate-800">
                    {d.projectsCount}
                  </td>
                  <td className="py-2.5 px-3 border-r">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-slate-200 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-2 rounded-full ${
                            d.completion >= 75
                              ? "bg-emerald-600"
                              : d.completion >= 65
                              ? "bg-blue-600"
                              : "bg-amber-600"
                          }`}
                          style={{ width: `${d.completion}%` }}
                        />
                      </div>
                      <span className="font-bold text-slate-900 w-9 text-right">
                        {d.completion}%
                      </span>
                    </div>
                  </td>
                  <td className="py-2.5 px-3 border-r text-center font-semibold text-amber-800">
                    {d.pendingWork} tasks
                  </td>
                  <td className="py-2.5 px-3 border-r font-medium text-slate-700">
                    {d.landAcquired}
                  </td>
                  <td className="py-2.5 px-3 border-r font-semibold text-slate-900">
                    {d.compensation}
                  </td>
                  <td className="py-2.5 px-3 border-r text-center">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold ${
                        d.risk === "Low"
                          ? "bg-emerald-100 text-emerald-800"
                          : d.risk === "Moderate"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-rose-100 text-rose-800"
                      }`}
                    >
                      {d.risk}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    <button
                      onClick={() => {
                        if (setSelectedDistrictFilter) setSelectedDistrictFilter(d.name);
                        navigateTo("district-monitoring");
                      }}
                      className="bg-[#1B365D] hover:bg-[#142946] text-white px-2.5 py-1 rounded text-[11px] font-semibold cursor-pointer"
                    >
                      View District
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pending Acquisition Proposals for Review */}
      <div className="bg-white border border-[#D1D5DB] rounded-lg p-5 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
          <div className="flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-amber-600" />
            <div>
              <h2 className="text-base font-bold text-slate-900">
                New Project Proposals Submitted for State-Level Approval
              </h2>
              <p className="text-xs text-slate-500">
                Proposals submitted by Requiring Bodies awaiting State Revenue Department clearance
              </p>
            </div>
          </div>
          <button
            onClick={() => navigateTo("state-approvals")}
            className="text-xs font-semibold text-[#1B365D] hover:underline flex items-center gap-1 cursor-pointer"
          >
            Open Approval Desk →
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border border-slate-200">
            <thead className="bg-slate-50 text-slate-800 font-semibold border-b uppercase text-[11px]">
              <tr>
                <th className="py-2.5 px-3 border-r">Project ID & Name</th>
                <th className="py-2.5 px-3 border-r">Requiring Body</th>
                <th className="py-2.5 px-3 border-r">District / Taluka</th>
                <th className="py-2.5 px-3 border-r">Land Area</th>
                <th className="py-2.5 px-3 border-r">Submission Date</th>
                <th className="py-2.5 px-3 border-r">State Status</th>
                <th className="py-2.5 px-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {stateProjects.slice(0, 4).map((p) => (
                <tr key={p.id} className="hover:bg-slate-50">
                  <td className="py-2.5 px-3 border-r font-semibold text-slate-900">
                    <div>{p.name}</div>
                    <div className="text-[10px] text-slate-500 font-mono">{p.id}</div>
                  </td>
                  <td className="py-2.5 px-3 border-r text-slate-700">
                    {p.requiringBody}
                  </td>
                  <td className="py-2.5 px-3 border-r text-slate-700">
                    {p.district} {p.taluka ? `(${p.taluka})` : ""}
                  </td>
                  <td className="py-2.5 px-3 border-r font-semibold">
                    {p.landRequired} Acres
                  </td>
                  <td className="py-2.5 px-3 border-r font-mono text-slate-600">
                    {p.submittedDate}
                  </td>
                  <td className="py-2.5 px-3 border-r">
                    <StatusBadge status={p.stateApprovalStatus || p.status} />
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    <button
                      onClick={() => {
                        setSelectedProjectId(p.id);
                        navigateTo("state-approvals");
                      }}
                      className="bg-[#1B365D] hover:bg-[#142946] text-white px-3 py-1 rounded text-[11px] font-semibold cursor-pointer"
                    >
                      Review Proposal
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
