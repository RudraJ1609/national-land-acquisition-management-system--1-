import React, { useState } from "react";
import { useApp } from "../../context/AppContext.jsx";
import {
  HeartHandshake,
  Users,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileCheck,
  Building,
  ArrowRight,
  Filter,
  Calendar,
  Layers,
  ChevronRight,
  FileText,
  DollarSign,
  Briefcase,
  Home
} from "lucide-react";
import { StatusBadge } from "../common/StatusBadge.jsx";

export const Page28RAndRBenefits = () => {
  const { currentProject, navigateTo } = useApp();

  const [selectedProject, setSelectedProject] = useState("National Highway Development");
  const [selectedFinYear, setSelectedFinYear] = useState("2026-27");

  // Project-wise R&R mock data
  const projectList = [
    {
      id: "PRJ-NH-01",
      name: "National Highway Development",
      district: "Ahmedabad",
      totalFamilies: 250,
      assessed: 210,
      eligible: 185,
      pending: 42,
      approved: 143,
      disbursed: 120,
      underReview: 23,
      schemeStatus: "Approved"
    },
    {
      id: "PRJ-RW-02",
      name: "Railway Project",
      district: "Ahmedabad",
      totalFamilies: 120,
      assessed: 95,
      eligible: 80,
      pending: 15,
      approved: 65,
      disbursed: 50,
      underReview: 15,
      schemeStatus: "Under Review"
    },
    {
      id: "PRJ-MT-03",
      name: "Metro Corridor Phase-2",
      district: "Ahmedabad",
      totalFamilies: 65,
      assessed: 50,
      eligible: 45,
      pending: 15,
      approved: 30,
      disbursed: 20,
      underReview: 10,
      schemeStatus: "Draft Created"
    }
  ];

  const currentStats =
    projectList.find((p) => p.name === selectedProject) || projectList[0];

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div>
          <div className="text-xs text-slate-500 font-medium flex items-center gap-1.5 mb-1">
            <span
              onClick={() => navigateTo("rnr-dashboard")}
              className="hover:text-[#1B365D] cursor-pointer"
            >
              Home
            </span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#1B365D] font-semibold">R&R Dashboard</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 leading-tight flex items-center gap-2">
            <HeartHandshake className="w-5 h-5 text-[#1B365D]" />
            Rehabilitation & Resettlement Dashboard
          </h1>
          <div className="flex items-center gap-3 text-xs text-slate-600 mt-1">
            <span>
              District: <strong className="text-slate-800">Ahmedabad</strong>
            </span>
            <span>•</span>
            <span>
              Officer: <strong className="text-[#1B365D]">R&R Officer (Section 43 Administrator)</strong>
            </span>
          </div>
        </div>

        {/* Right side dropdown filters */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 bg-white border border-[#D1D5DB] rounded px-2.5 py-1.5 text-xs shadow-2xs">
            <Layers className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-slate-500 font-medium">Project:</span>
            <select
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
              className="font-semibold text-slate-800 bg-transparent outline-none cursor-pointer"
            >
              <option value="National Highway Development">National Highway Development</option>
              <option value="Railway Project">Railway Project</option>
              <option value="Metro Corridor Phase-2">Metro Corridor Phase-2</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 bg-white border border-[#D1D5DB] rounded px-2.5 py-1.5 text-xs shadow-2xs">
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-slate-500 font-medium">FY:</span>
            <select
              value={selectedFinYear}
              onChange={(e) => setSelectedFinYear(e.target.value)}
              className="font-semibold text-slate-800 bg-transparent outline-none cursor-pointer"
            >
              <option value="2026-27">2026-27</option>
              <option value="2025-26">2025-26</option>
              <option value="2024-25">2024-25</option>
            </select>
          </div>
        </div>
      </div>

      {/* KPI Summary (Simple rectangular government-style cards) */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
        <div className="bg-white border border-[#D1D5DB] rounded p-3.5 shadow-2xs">
          <div className="text-slate-500 text-[11px] font-semibold uppercase tracking-wider">
            Total Affected Families
          </div>
          <div className="text-2xl font-bold text-[#1B365D] mt-1">
            {currentStats.totalFamilies}
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">Across all revenue villages</div>
        </div>

        <div className="bg-white border border-[#D1D5DB] rounded p-3.5 shadow-2xs">
          <div className="text-slate-500 text-[11px] font-semibold uppercase tracking-wider">
            Families Assessed
          </div>
          <div className="text-2xl font-bold text-blue-900 mt-1">
            {currentStats.assessed} / {currentStats.totalFamilies}
          </div>
          <div className="text-[10px] text-blue-700 font-semibold mt-0.5">
            {Math.round((currentStats.assessed / currentStats.totalFamilies) * 100)}% Completed
          </div>
        </div>

        <div className="bg-white border border-[#D1D5DB] rounded p-3.5 shadow-2xs">
          <div className="text-slate-500 text-[11px] font-semibold uppercase tracking-wider">
            Eligible for R&R
          </div>
          <div className="text-2xl font-bold text-emerald-800 mt-1">
            {currentStats.eligible} Families
          </div>
          <div className="text-[10px] text-emerald-700 font-semibold mt-0.5">
            Second Schedule Qualified
          </div>
        </div>

        <div className="bg-white border border-[#D1D5DB] rounded p-3.5 shadow-2xs">
          <div className="text-slate-500 text-[11px] font-semibold uppercase tracking-wider">
            Entitlements Pending
          </div>
          <div className="text-2xl font-bold text-amber-700 mt-1">
            {currentStats.pending} Families
          </div>
          <div className="text-[10px] text-amber-800 font-medium mt-0.5">
            Requires Assessment / Review
          </div>
        </div>

        <div className="bg-white border border-[#D1D5DB] rounded p-3.5 shadow-2xs col-span-2 sm:col-span-1">
          <div className="text-slate-500 text-[11px] font-semibold uppercase tracking-wider">
            Entitlements Approved
          </div>
          <div className="text-2xl font-bold text-emerald-700 mt-1">
            {currentStats.approved} Families
          </div>
          <div className="text-[10px] text-emerald-800 font-medium mt-0.5">
            Sanctioned by Admin
          </div>
        </div>
      </div>

      {/* Census / Assessment Progress Bar & Disbursal Status Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Census Progress (2 Cols) */}
        <div className="lg:col-span-2 bg-white border border-[#D1D5DB] rounded p-4 shadow-2xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <div>
              <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Census / Assessment Progress
              </h2>
              <p className="text-[11px] text-slate-500">
                Baseline family enumeration against surveyed project alignment
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-[#1B365D]">
                Overall Progress: {Math.round((currentStats.assessed / currentStats.totalFamilies) * 100)}%
              </span>
            </div>
          </div>

          <div className="space-y-2 pt-1">
            <div className="flex items-center justify-between text-xs font-medium">
              <span className="text-slate-700">Total Families: <strong>{currentStats.totalFamilies}</strong></span>
              <span className="text-slate-600">
                Assessed: <strong className="text-emerald-700">{currentStats.assessed}</strong> | Pending:{" "}
                <strong className="text-amber-700">{currentStats.totalFamilies - currentStats.assessed}</strong>
              </span>
            </div>

            {/* Visual Bar */}
            <div className="h-6 w-full bg-slate-100 rounded overflow-hidden flex border border-slate-300">
              <div
                style={{
                  width: `${(currentStats.assessed / currentStats.totalFamilies) * 100}%`
                }}
                className="bg-[#1B365D] text-white text-[11px] font-bold flex items-center justify-center transition-all duration-500"
              >
                Assessed ({currentStats.assessed})
              </div>
              <div
                style={{
                  width: `${((currentStats.totalFamilies - currentStats.assessed) / currentStats.totalFamilies) * 100}%`
                }}
                className="bg-amber-400 text-amber-950 text-[11px] font-bold flex items-center justify-center"
              >
                Pending ({currentStats.totalFamilies - currentStats.assessed})
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#1B365D] inline-block" />
                <span>Assessed Families ({currentStats.assessed})</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-amber-400 inline-block" />
                <span>Pending Field Enumeration ({currentStats.totalFamilies - currentStats.assessed})</span>
              </div>
            </div>
          </div>
        </div>

        {/* Entitlement Disbursal Status (1 Col) */}
        <div className="bg-white border border-[#D1D5DB] rounded p-4 shadow-2xs space-y-3">
          <div className="border-b border-slate-200 pb-2">
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Entitlement Disbursal Status
            </h2>
            <p className="text-[11px] text-slate-500">
              Benefit sanctions and payment lifecycle
            </p>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between py-1 border-b border-slate-100">
              <span className="text-slate-600 font-medium">Approved</span>
              <span className="font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                {currentStats.approved}
              </span>
            </div>

            <div className="flex items-center justify-between py-1 border-b border-slate-100">
              <span className="text-slate-600 font-medium">Pending</span>
              <span className="font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                {currentStats.pending}
              </span>
            </div>

            <div className="flex items-center justify-between py-1 border-b border-slate-100">
              <span className="text-slate-600 font-medium">Disbursed</span>
              <span className="font-bold text-blue-900 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                {currentStats.disbursed}
              </span>
            </div>

            <div className="flex items-center justify-between py-1">
              <span className="text-slate-600 font-medium">Under Review</span>
              <span className="font-bold text-purple-900 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                {currentStats.underReview}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Project-wise R&R Status Table */}
      <div className="bg-white border border-[#D1D5DB] rounded shadow-2xs p-4 space-y-3">
        <div className="flex items-center justify-between border-b border-slate-200 pb-2">
          <div>
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Project-wise R&R Status Table
            </h2>
            <p className="text-[11px] text-slate-500">
              Comparative progress across all infrastructure acquisition schemes in Ahmedabad District
            </p>
          </div>
          <button
            onClick={() => navigateTo("rnr-entitlements")}
            className="bg-[#1B365D] hover:bg-[#142946] text-white px-3 py-1 rounded text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
          >
            <span>Open Family Entitlements</span>
            <ArrowRight className="w-3 h-3 text-[#C5A059]" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border border-slate-200">
            <thead className="bg-[#e2e8f0] text-slate-800 font-semibold border-b uppercase text-[10px]">
              <tr>
                <th className="py-2.5 px-3 border-r">Project</th>
                <th className="py-2.5 px-3 border-r text-center">Affected Families</th>
                <th className="py-2.5 px-3 border-r text-center">Assessed</th>
                <th className="py-2.5 px-3 border-r text-center">Eligible</th>
                <th className="py-2.5 px-3 border-r text-center">Pending</th>
                <th className="py-2.5 px-3 border-r text-center">Scheme Status</th>
                <th className="py-2.5 px-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700 font-medium">
              {projectList.map((prj) => (
                <tr key={prj.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-2.5 px-3 border-r font-bold text-slate-900">
                    <div className="flex items-center gap-1.5">
                      <Building className="w-3.5 h-3.5 text-[#1B365D]" />
                      <span>{prj.name}</span>
                    </div>
                  </td>
                  <td className="py-2.5 px-3 border-r text-center font-semibold text-slate-800">
                    {prj.totalFamilies}
                  </td>
                  <td className="py-2.5 px-3 border-r text-center text-blue-900 font-bold">
                    {prj.assessed}
                  </td>
                  <td className="py-2.5 px-3 border-r text-center text-emerald-800 font-bold">
                    {prj.eligible}
                  </td>
                  <td className="py-2.5 px-3 border-r text-center text-amber-700 font-bold">
                    {prj.pending}
                  </td>
                  <td className="py-2.5 px-3 border-r text-center">
                    <StatusBadge status={prj.schemeStatus} />
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    <button
                      onClick={() => navigateTo("rnr-entitlements")}
                      className="bg-white border border-[#1B365D] text-[#1B365D] hover:bg-[#1B365D] hover:text-white px-3 py-1 rounded text-[11px] font-bold transition-colors shadow-2xs cursor-pointer"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pending Action Queue (Important Section) */}
      <div className="bg-white border border-[#D1D5DB] rounded shadow-2xs p-4 space-y-3">
        <div className="border-b border-slate-200 pb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600" />
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Pending R&R Actions
            </h2>
          </div>
          <span className="text-[11px] text-amber-700 font-semibold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
            Action Required
          </span>
        </div>

        <div className="divide-y divide-slate-100 text-xs">
          {/* Item 1 */}
          <div className="py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 hover:bg-slate-50/70 px-2 rounded transition-colors">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span className="font-semibold text-slate-800">
                12 families require entitlement verification
              </span>
              <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                National Highway Development
              </span>
            </div>
            <button
              onClick={() => navigateTo("rnr-entitlements")}
              className="bg-[#1B365D] hover:bg-[#142946] text-white px-3 py-1 rounded text-[11px] font-bold shadow-2xs transition-colors cursor-pointer"
            >
              View
            </button>
          </div>

          {/* Item 2 */}
          <div className="py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 hover:bg-slate-50/70 px-2 rounded transition-colors">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              <span className="font-semibold text-slate-800">
                8 families have missing documents
              </span>
              <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                National Highway Development
              </span>
            </div>
            <button
              onClick={() => navigateTo("rnr-entitlements")}
              className="bg-[#1B365D] hover:bg-[#142946] text-white px-3 py-1 rounded text-[11px] font-bold shadow-2xs transition-colors cursor-pointer"
            >
              View
            </button>
          </div>

          {/* Item 3 */}
          <div className="py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 hover:bg-slate-50/70 px-2 rounded transition-colors">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              <span className="font-semibold text-slate-800">
                R&R Scheme for Railway Project is pending approval
              </span>
              <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                Railway Project
              </span>
            </div>
            <button
              onClick={() => navigateTo("project-workflow", { workflowTab: "rnr" })}
              className="bg-[#1B365D] hover:bg-[#142946] text-white px-3 py-1 rounded text-[11px] font-bold shadow-2xs transition-colors cursor-pointer"
            >
              View
            </button>
          </div>

          {/* Item 4 */}
          <div className="py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 hover:bg-slate-50/70 px-2 rounded transition-colors">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="font-semibold text-slate-800">
                15 approved entitlements are pending fund release
              </span>
              <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                National Highway Development
              </span>
            </div>
            <button
              onClick={() => navigateTo("rnr-entitlements")}
              className="bg-[#1B365D] hover:bg-[#142946] text-white px-3 py-1 rounded text-[11px] font-bold shadow-2xs transition-colors cursor-pointer"
            >
              View
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
