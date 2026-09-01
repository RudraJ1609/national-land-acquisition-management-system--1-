import React, { useState } from "react";
import { useApp } from "../../context/AppContext.jsx";
import {
  Building2,
  MapPin,
  TrendingUp,
  AlertTriangle,
  FileSpreadsheet,
  CheckCircle2,
  Clock,
  Coins,
  Search,
  Filter,
  ArrowRight,
  ShieldAlert,
  Calendar,
  Layers,
  FileCheck,
  Users
} from "lucide-react";
import { StatusBadge } from "../common/StatusBadge.jsx";

export const Page32StateDistrictMonitoring = () => {
  const { statesProgress, projects, navigateTo, setSelectedDistrictFilter } = useApp();

  const [selectedDistrict, setSelectedDistrict] = useState("Ahmedabad");
  const [searchDistrict, setSearchDistrict] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [riskFilter, setRiskFilter] = useState("All");
  const [dateRange, setDateRange] = useState("FY 2026-27");

  const districtsData = [
    {
      name: "Ahmedabad",
      collector: "Smt. Shreya Verma, IAS",
      totalProjects: 12,
      completionRate: 72,
      landRequired: 4730.0,
      landPossessed: 3410.0,
      pendingObjections: 16,
      pendingAwards: 3,
      rnrPendingFamilies: 42,
      disbursedCr: 480.5,
      allocatedCr: 600.0,
      slaoCount: 3,
      complianceRate: "92.0%",
      riskLevel: "Low",
      nextAwardDeadline: "20-Oct-2026",
      keyProjects: ["Ahmedabad-Vadodara Expressway Link", "Sanand Industrial Hub Expansion", "Ahmedabad Outer Ring Rail"]
    },
    {
      name: "Vadodara",
      collector: "Smt. Meera Iyer, GAS (SLAO Lead)",
      totalProjects: 10,
      completionRate: 80,
      landRequired: 3720.0,
      landPossessed: 2980.0,
      pendingObjections: 8,
      pendingAwards: 1,
      rnrPendingFamilies: 20,
      disbursedCr: 390.2,
      allocatedCr: 450.0,
      slaoCount: 3,
      complianceRate: "95.5%",
      riskLevel: "Low",
      nextAwardDeadline: "28-Oct-2026",
      keyProjects: ["Vadodara-Padra Industrial Rail Link", "Expressway Feeder Corridor", "Savli Multi-modal Logistics"]
    },
    {
      name: "Surat",
      collector: "Shri Sanjay Solanki, GAS",
      totalProjects: 8,
      completionRate: 64,
      landRequired: 3360.0,
      landPossessed: 2150.0,
      pendingObjections: 24,
      pendingAwards: 4,
      rnrPendingFamilies: 65,
      disbursedCr: 310.4,
      allocatedCr: 420.0,
      slaoCount: 2,
      complianceRate: "86.0%",
      riskLevel: "Moderate",
      nextAwardDeadline: "12-Nov-2026",
      keyProjects: ["Surat Metro Phase 2 Elevated Corridor", "Hazira Port Freight Link", "Diamond Bourse Bypass"]
    },
    {
      name: "Rajkot",
      collector: "Shri Arun K. Jadeja, IAS",
      totalProjects: 6,
      completionRate: 68,
      landRequired: 2240.0,
      landPossessed: 1520.0,
      pendingObjections: 18,
      pendingAwards: 2,
      rnrPendingFamilies: 35,
      disbursedCr: 215.0,
      allocatedCr: 300.0,
      slaoCount: 2,
      complianceRate: "88.0%",
      riskLevel: "Moderate",
      nextAwardDeadline: "05-Nov-2026",
      keyProjects: ["Rajkot Semi-High Speed Regional Link", "AIIMS Approach Highway", "Hirasar Airport Rail Spur"]
    },
    {
      name: "Bharuch",
      collector: "Dr. Nilesh Trivedi, GAS",
      totalProjects: 5,
      completionRate: 70,
      landRequired: 1770.0,
      landPossessed: 1240.0,
      pendingObjections: 11,
      pendingAwards: 2,
      rnrPendingFamilies: 28,
      disbursedCr: 165.8,
      allocatedCr: 230.0,
      slaoCount: 2,
      complianceRate: "90.2%",
      riskLevel: "Low",
      nextAwardDeadline: "18-Dec-2026",
      keyProjects: ["Dahej Port Freight Corridor", "PCPIR Industrial Road", "Ankleshwar Bypass"]
    },
    {
      name: "Anand",
      collector: "Shri Rajesh M. Patel, IAS",
      totalProjects: 4,
      completionRate: 75,
      landRequired: 1180.0,
      landPossessed: 890.0,
      pendingObjections: 14,
      pendingAwards: 1,
      rnrPendingFamilies: 18,
      disbursedCr: 142.6,
      allocatedCr: 190.0,
      slaoCount: 2,
      complianceRate: "94.2%",
      riskLevel: "Low",
      nextAwardDeadline: "15-Sep-2026",
      keyProjects: ["Western Dedicated Freight Corridor (Anand Bypass)", "Petlad Industrial Rail Spur"]
    },
    {
      name: "Kheda",
      collector: "Dr. Vikram Deshmukh, IAS",
      totalProjects: 3,
      completionRate: 60,
      landRequired: 800.0,
      landPossessed: 480.0,
      pendingObjections: 42,
      pendingAwards: 3,
      rnrPendingFamilies: 52,
      disbursedCr: 78.4,
      allocatedCr: 140.0,
      slaoCount: 1,
      complianceRate: "68.0%",
      riskLevel: "High",
      nextAwardDeadline: "10-Sep-2026 (Urgent)",
      keyProjects: ["Nadiad Western Bypass", "DILRMP Boundary Regularization"]
    }
  ];

  const filteredDistricts = districtsData.filter((d) => {
    const matchesSearch =
      d.name.toLowerCase().includes(searchDistrict.toLowerCase()) ||
      d.collector.toLowerCase().includes(searchDistrict.toLowerCase());
    const matchesRisk = riskFilter === "All" || d.riskLevel === riskFilter;
    return matchesSearch && matchesRisk;
  });

  const activeDistrictData =
    districtsData.find((d) => d.name === selectedDistrict) || districtsData[0];

  const handleViewDistrictProjects = (districtName) => {
    if (setSelectedDistrictFilter) {
      setSelectedDistrictFilter(districtName);
    }
    navigateTo("project-progress", { stateFilter: "Gujarat" });
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div>
          <div className="text-xs text-slate-500 font-medium">
            State Revenue Authority • District-wise Performance & Operational Monitoring
          </div>
          <h1 className="text-xl font-bold text-slate-900 leading-tight flex items-center gap-2">
            <Building2 className="w-5 h-5 text-[#1B365D]" />
            District-wise Acquisition Progress & Workload Hub
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigateTo("state-reports")}
            className="bg-[#1B365D] hover:bg-[#142946] text-white px-3.5 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Generate State MIS Report</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white border border-[#D1D5DB] rounded-lg p-4 shadow-2xs">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Search District / Officer</label>
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
              <input
                type="text"
                value={searchDistrict}
                onChange={(e) => setSearchDistrict(e.target.value)}
                placeholder="Search Ahmedabad, Vadodara, Collector..."
                className="w-full pl-8 pr-2.5 py-1.5 border border-slate-300 rounded text-slate-900 focus:ring-1 focus:ring-[#1B365D]"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Risk Level</label>
            <select
              value={riskFilter}
              onChange={(e) => setRiskFilter(e.target.value)}
              className="w-full px-2.5 py-1.5 border border-slate-300 rounded bg-white text-slate-900 focus:ring-1 focus:ring-[#1B365D]"
            >
              <option value="All">All Risk Levels</option>
              <option value="Low">Low Risk</option>
              <option value="Moderate">Moderate Risk</option>
              <option value="High">High Risk</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Project Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-2.5 py-1.5 border border-slate-300 rounded bg-white text-slate-900 focus:ring-1 focus:ring-[#1B365D]"
            >
              <option value="All">All Projects</option>
              <option value="In Progress">Active Execution</option>
              <option value="Delayed">Timeline Breach</option>
              <option value="Completed">Possession Handed Over</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Reporting Period</label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full px-2.5 py-1.5 border border-slate-300 rounded bg-white text-slate-900 focus:ring-1 focus:ring-[#1B365D]"
            >
              <option value="FY 2026-27">Current Financial Year (FY 2026-27)</option>
              <option value="Q2 2026">Quarter 2 (Jul - Sep 2026)</option>
              <option value="Q1 2026">Quarter 1 (Apr - Jun 2026)</option>
            </select>
          </div>
        </div>
      </div>

      {/* District Comparison Table */}
      <div className="bg-white border border-[#D1D5DB] rounded-lg shadow-2xs p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-[#1B365D]" />
              State-wide District Progress & Statutory Metrics Table
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Comparison across Collectorates in Gujarat
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border border-slate-200">
            <thead className="bg-slate-50 text-slate-800 font-semibold border-b uppercase text-[11px]">
              <tr>
                <th className="py-2.5 px-3 border-r">District</th>
                <th className="py-2.5 px-3 border-r text-center">Total Projects</th>
                <th className="py-2.5 px-3 border-r">% Complete</th>
                <th className="py-2.5 px-3 border-r text-center">Pending Objections</th>
                <th className="py-2.5 px-3 border-r text-center">Pending Awards</th>
                <th className="py-2.5 px-3 border-r text-center">R&R Pending Families</th>
                <th className="py-2.5 px-3 border-r text-center">Risk Level</th>
                <th className="py-2.5 px-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredDistricts.map((d) => (
                <tr
                  key={d.name}
                  onClick={() => setSelectedDistrict(d.name)}
                  className={`cursor-pointer transition-colors ${
                    selectedDistrict === d.name ? "bg-blue-50/70 font-semibold" : "hover:bg-slate-50"
                  }`}
                >
                  <td className="py-2.5 px-3 border-r font-bold text-slate-900">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#1B365D]" />
                      <span>{d.name}</span>
                    </div>
                    <div className="text-[10px] text-slate-500 font-normal">{d.collector}</div>
                  </td>
                  <td className="py-2.5 px-3 border-r text-center font-bold text-slate-800">
                    {d.totalProjects}
                  </td>
                  <td className="py-2.5 px-3 border-r">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-slate-200 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-2 rounded-full ${
                            d.completionRate >= 75
                              ? "bg-emerald-600"
                              : d.completionRate >= 65
                              ? "bg-blue-600"
                              : "bg-amber-600"
                          }`}
                          style={{ width: `${d.completionRate}%` }}
                        />
                      </div>
                      <span className="font-bold text-slate-900 w-9 text-right">
                        {d.completionRate}%
                      </span>
                    </div>
                  </td>
                  <td className="py-2.5 px-3 border-r text-center font-semibold text-amber-800">
                    {d.pendingObjections}
                  </td>
                  <td className="py-2.5 px-3 border-r text-center font-semibold text-slate-800">
                    {d.pendingAwards}
                  </td>
                  <td className="py-2.5 px-3 border-r text-center font-semibold text-purple-800">
                    {d.rnrPendingFamilies}
                  </td>
                  <td className="py-2.5 px-3 border-r text-center">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold ${
                        d.riskLevel === "Low"
                          ? "bg-emerald-100 text-emerald-800"
                          : d.riskLevel === "Moderate"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-rose-100 text-rose-800"
                      }`}
                    >
                      {d.riskLevel}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-center space-x-1.5 whitespace-nowrap">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedDistrict(d.name);
                      }}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-800 px-2.5 py-1 rounded text-[11px] font-semibold cursor-pointer border border-slate-300"
                    >
                      Inspect
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewDistrictProjects(d.name);
                      }}
                      className="bg-[#1B365D] hover:bg-[#142946] text-white px-2.5 py-1 rounded text-[11px] font-semibold cursor-pointer"
                    >
                      View District Projects →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selected District Deep-Dive Inspector */}
      <div className="bg-white border border-[#D1D5DB] rounded-lg p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
          <div>
            <div className="text-[10px] uppercase font-bold text-[#C5A059]">
              District Collectorate Deep-Dive Inspection
            </div>
            <h2 className="text-lg font-bold text-[#1B365D]">
              District {activeDistrictData.name} • Administrative Performance Hub
            </h2>
            <div className="text-xs text-slate-600 mt-0.5">
              District Magistrate / Collector: <strong>{activeDistrictData.collector}</strong> • Active SLAOs: <strong>{activeDistrictData.slaoCount} Units</strong>
            </div>
          </div>
          <button
            onClick={() => handleViewDistrictProjects(activeDistrictData.name)}
            className="bg-[#1B365D] hover:bg-[#142946] text-white px-3.5 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <span>View All {activeDistrictData.name} Projects</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#C5A059]" />
          </button>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
            <span className="text-[10px] text-slate-500 uppercase block font-semibold">Total Required Land</span>
            <span className="text-lg font-bold text-slate-900">{activeDistrictData.landRequired} Ac</span>
            <span className="text-[10px] text-slate-500 block mt-0.5">Notified Under Sec 11</span>
          </div>
          <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-lg">
            <span className="text-[10px] text-emerald-800 uppercase block font-semibold">Possession Handover</span>
            <span className="text-lg font-bold text-emerald-800">{activeDistrictData.landPossessed} Ac</span>
            <span className="text-[10px] text-emerald-700 font-medium block mt-0.5">
              {Math.round((activeDistrictData.landPossessed / activeDistrictData.landRequired) * 100)}% Possessed
            </span>
          </div>
          <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-lg">
            <span className="text-[10px] text-amber-800 uppercase block font-semibold">Section 15 Objections</span>
            <span className="text-lg font-bold text-amber-900">{activeDistrictData.pendingObjections} Pending</span>
            <span className="text-[10px] text-amber-700 font-medium block mt-0.5">Collector Hearing Schedule</span>
          </div>
          <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-lg">
            <span className="text-[10px] text-blue-800 uppercase block font-semibold">PFMS Compensation Settled</span>
            <span className="text-lg font-bold text-blue-900">₹ {activeDistrictData.disbursedCr} Cr</span>
            <span className="text-[10px] text-blue-700 font-medium block mt-0.5">
              of ₹ {activeDistrictData.allocatedCr} Cr Allocated
            </span>
          </div>
        </div>

        {/* Statutory Milestone Deadlines Notice */}
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-1.5 text-xs">
          <div className="font-bold text-slate-800 flex items-center justify-between">
            <span>Next Mandatory Statutory Award Declaration Deadline (Section 25 RFCTLARR)</span>
            <span className="font-mono text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200 font-bold">
              {activeDistrictData.nextAwardDeadline}
            </span>
          </div>
          <p className="text-slate-600 text-[11px]">
            Statutory Rule: Section 25 stipulates that Collector must pronounce awards within twelve months from the date of the publication of the declaration under Section 19. Failure leads to lapsing of the acquisition proceedings.
          </p>
        </div>

        {/* Priority Corridor Projects in this District */}
        <div className="space-y-2 text-xs">
          <div className="font-bold text-slate-800">
            Active Infrastructure Projects Under Execution in {activeDistrictData.name}:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {activeDistrictData.keyProjects.map((p, idx) => (
              <div
                key={idx}
                className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#1B365D]"></span>
                  <span className="font-semibold text-slate-800">{p}</span>
                </div>
                <button
                  onClick={() => handleViewDistrictProjects(activeDistrictData.name)}
                  className="text-[11px] text-[#1B365D] font-bold hover:underline cursor-pointer"
                >
                  Inspect →
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
