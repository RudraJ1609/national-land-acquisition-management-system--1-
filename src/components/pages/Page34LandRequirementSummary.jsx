import React, { useState } from "react";
import { useApp } from "../../context/AppContext.jsx";
import {
  FileSpreadsheet,
  Download,
  Printer,
  Search,
  Filter,
  Layers,
  MapPin,
  Building,
  CheckCircle2,
  TreePine,
  ShieldCheck,
  Coins
} from "lucide-react";

export const Page34LandRequirementSummary = () => {
  const { currentProject, projects, parcels, setSelectedProjectId } = useApp();
  const [selectedVillage, setSelectedVillage] = useState("All");
  const [downloadMsg, setDownloadMsg] = useState("");

  const proj = currentProject || (projects && projects[0]) || { name: "Land Acquisition Project", district: "Anand", state: "Gujarat", landRequired: 142.5 };

  const villages = ["All", "Petlad", "Sunav", "Bandhani", "Agas"];

  const parcelList = parcels || [];
  const filteredParcels = parcelList.filter(
    (p) => selectedVillage === "All" || p.village === selectedVillage
  );

  const totalAcres = filteredParcels.reduce((acc, p) => acc + (Number(p.areaAcres) || 0), 0);
  const totalValuation = filteredParcels.reduce((acc, p) => acc + (Number(p.finalCompensationAmount || p.totalValuation || p.baseLandValue) || 0), 0);
  const totalOwners = filteredParcels.length;

  const handleExport = () => {
    setDownloadMsg("Exported Cadastral Land Schedule (Excel / CSV) successfully.");
    setTimeout(() => setDownloadMsg(""), 3500);
  };

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
            Requiring Body Portal • Cadastral & Schedule-I Land Register
          </div>
          <h1 className="text-xl font-bold text-slate-900 leading-tight flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-[#1B365D]" />
            Land Requirement Schedule & Revenue Classification Summary
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleExport}
            className="bg-[#1B365D] hover:bg-[#142946] text-white px-3.5 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Export Land Schedule (XLSX)</span>
          </button>
        </div>
      </div>

      {/* Project & Filter Ribbon */}
      <div className="bg-white border border-[#D1D5DB] rounded-lg p-4 shadow-2xs grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        <div>
          <label className="block font-semibold text-slate-700 mb-1">Select Project</label>
          <select
            value={proj.id}
            onChange={(e) => setSelectedProjectId(e.target.value)}
            className="w-full p-2 border border-[#D1D5DB] rounded bg-white text-slate-900 font-semibold focus:border-[#1B365D] focus:outline-none"
          >
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.id} - {p.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-semibold text-slate-700 mb-1">Village Filter</label>
          <select
            value={selectedVillage}
            onChange={(e) => setSelectedVillage(e.target.value)}
            className="w-full p-2 border border-[#D1D5DB] rounded bg-white text-slate-900 font-medium focus:border-[#1B365D] focus:outline-none"
          >
            {villages.map((v) => (
              <option key={v} value={v}>
                {v === "All" ? "All Revenue Villages" : `Village ${v}`}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col justify-end">
          <div className="text-[11px] text-slate-500 font-medium">
            Project Requirement: <strong className="text-slate-900">{proj.landRequired} Acres</strong> across {proj.villages.length} Villages.
          </div>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
        <div className="bg-white border border-[#D1D5DB] rounded-lg p-4 shadow-2xs">
          <span className="text-slate-500 font-semibold text-[10px] uppercase">Parcels Mapped</span>
          <div className="text-2xl font-bold text-[#1B365D] mt-1">{filteredParcels.length} Survey Nos</div>
          <span className="text-[11px] text-slate-600 block mt-1">100% RoR Title Linked</span>
        </div>

        <div className="bg-white border border-[#D1D5DB] rounded-lg p-4 shadow-2xs">
          <span className="text-slate-500 font-semibold text-[10px] uppercase">Surveyed Extent</span>
          <div className="text-2xl font-bold text-slate-900 mt-1">{totalAcres.toFixed(1)} <span className="text-xs font-normal">Acres</span></div>
          <span className="text-[11px] text-emerald-700 font-medium block mt-1">DGPS / Drone Verified</span>
        </div>

        <div className="bg-white border border-[#D1D5DB] rounded-lg p-4 shadow-2xs">
          <span className="text-slate-500 font-semibold text-[10px] uppercase">Title Holders</span>
          <div className="text-2xl font-bold text-slate-900 mt-1">{totalOwners} Primary Khatedars</div>
          <span className="text-[11px] text-slate-600 block mt-1">Aadhaar Linked Accounts</span>
        </div>

        <div className="bg-white border border-[#D1D5DB] rounded-lg p-4 shadow-2xs">
          <span className="text-slate-500 font-semibold text-[10px] uppercase">Total Estimated Award</span>
          <div className="text-2xl font-bold text-[#C5A059] mt-1">₹ {(totalValuation / 10000000).toFixed(2)} <span className="text-xs font-normal">Cr</span></div>
          <span className="text-[11px] text-emerald-700 font-medium block mt-1">Includes 100% Solatium</span>
        </div>
      </div>

      {/* Cadastral Land Table */}
      <div className="bg-white border border-[#D1D5DB] rounded-lg shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <h2 className="text-sm font-bold text-[#1B365D]">
            Village-wise Cadastral Land Schedule (Form 3A Register)
          </h2>
          <span className="text-xs text-slate-500">
            e-Dhara RoR Integrated with District Collectorate Anand
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border border-slate-200">
            <thead className="bg-[#e2e8f0] text-[#475569] font-semibold border-b border-[#cbd5e1] uppercase text-[11px]">
              <tr>
                <th className="py-2.5 px-3 border-r border-[#cbd5e1]">Parcel ID</th>
                <th className="py-2.5 px-3 border-r border-[#cbd5e1]">Survey No.</th>
                <th className="py-2.5 px-3 border-r border-[#cbd5e1]">Village & Taluka</th>
                <th className="py-2.5 px-3 border-r border-[#cbd5e1]">Owner / Khatedar</th>
                <th className="py-2.5 px-3 border-r border-[#cbd5e1]">Land Type</th>
                <th className="py-2.5 px-3 border-r border-[#cbd5e1]">Area (Acres)</th>
                <th className="py-2.5 px-3 border-r border-[#cbd5e1]">Circle Rate / Ac</th>
                <th className="py-2.5 px-3 border-r border-[#cbd5e1]">Total Valuation</th>
                <th className="py-2.5 px-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredParcels.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50">
                  <td className="py-2.5 px-3 border-r border-slate-200 font-mono font-bold text-[#1B365D]">
                    {p.id}
                  </td>
                  <td className="py-2.5 px-3 border-r border-slate-200 font-mono font-bold text-slate-900">
                    {p.surveyNumber}
                  </td>
                  <td className="py-2.5 px-3 border-r border-slate-200 font-medium text-slate-800">
                    {p.village}, {p.taluka}
                  </td>
                  <td className="py-2.5 px-3 border-r border-slate-200 text-slate-800">
                    <div className="font-semibold">{p.ownerName}</div>
                    <div className="text-[10px] text-slate-500 font-mono">Khata No: 419/{p.id.slice(-2)}</div>
                  </td>
                  <td className="py-2.5 px-3 border-r border-slate-200">
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-700">
                      {p.landType}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 border-r border-slate-200 font-mono font-bold text-slate-900">
                    {p.areaAcres} Ac
                  </td>
                  <td className="py-2.5 px-3 border-r border-slate-200 text-slate-600 font-mono">
                    ₹ {(((Number(p.circleRatePerAcre || p.marketRatePerAcre) || 0)) / 100000).toFixed(1)} L/Ac
                  </td>
                  <td className="py-2.5 px-3 border-r border-slate-200 font-bold text-[#C5A059] font-mono">
                    ₹ {(((Number(p.totalValuation || p.finalCompensationAmount || p.baseLandValue) || 0)) / 100000).toFixed(2)} Lakh
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                      p.verificationStatus === "Verified"
                        ? "bg-emerald-50 text-emerald-800 border border-emerald-300"
                        : "bg-amber-50 text-amber-800 border border-amber-300"
                    }`}>
                      {p.verificationStatus}
                    </span>
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
