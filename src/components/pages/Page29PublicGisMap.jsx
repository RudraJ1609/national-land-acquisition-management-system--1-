import React, { useState } from "react";
import { useApp } from "../../context/AppContext.jsx";
import { LeafletGisMap } from "../common/LeafletGisMap.jsx";
import { StatusBadge } from "../common/StatusBadge.jsx";
import {
  Compass,
  Search,
  MapPin,
  FileText,
  Download,
  Layers,
  ShieldCheck,
  Building,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ExternalLink,
  Info
} from "lucide-react";

export const Page29PublicGisMap = () => {
  const { parcels, projects, navigateTo } = useApp();
  const [selectedVillage, setSelectedVillage] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatusFilter, setSelectedStatusFilter] = useState("All");
  const parcelList = parcels || [];
  const [activeParcel, setActiveParcel] = useState((parcelList && parcelList[0]) || null);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Filter parcels
  const filteredParcels = parcelList.filter((p) => {
    const matchesVillage = selectedVillage === "All" || p.village === selectedVillage;
    const matchesStatus =
      selectedStatusFilter === "All" ||
      (selectedStatusFilter === "Verified" && p.verificationStatus === "Verified") ||
      (selectedStatusFilter === "Flagged" && p.verificationStatus === "Flagged") ||
      (selectedStatusFilter === "Awarded" && (p.status || "").includes("Award"));
    const matchesQuery =
      searchQuery === "" ||
      (p.surveyNumber || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.ownerName || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.village || "").toLowerCase().includes(searchQuery.toLowerCase());
    return matchesVillage && matchesStatus && matchesQuery;
  });

  const totalAcresInView = filteredParcels.reduce((acc, p) => acc + (Number(p.areaAcres) || 0), 0);
  const totalValueInView = filteredParcels.reduce((acc, p) => acc + (Number(p.finalCompensationAmount || p.totalValuation || p.baseLandValue) || 0), 0);

  const handleDownloadGeoExtract = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-white border border-[#D1D5DB] rounded-lg p-5 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-[#C5A059] mb-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>National Spatial Data Infrastructure (NSDI) • NIC GovNet</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#1B365D] tracking-tight flex items-center gap-2">
            <Compass className="w-6 h-6 text-[#C5A059]" />
            Public Cadastral GIS Land Acquisition Portal
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Real-time interactive cadastral land parcel boundaries, alignment corridors, and statutory compensation schedules under RFCTLARR Act 2013.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleDownloadGeoExtract}
            className="bg-white hover:bg-slate-50 text-[#1B365D] border border-[#D1D5DB] px-3.5 py-2 rounded-md font-semibold text-xs flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4 text-[#C5A059]" />
            <span>Download Cadastral Shapefile / GeoJSON</span>
          </button>
          <button
            onClick={() => navigateTo("citizen-my-land")}
            className="bg-[#1B365D] hover:bg-[#142946] text-white px-3.5 py-2 rounded-md font-semibold text-xs flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
          >
            <MapPin className="w-4 h-4 text-[#C5A059]" />
            <span>Track My Survey No</span>
          </button>
        </div>
      </div>

      {downloadSuccess && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 p-3 rounded-md text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-700" />
          <span>Cadastral GIS GeoJSON bundle (EPSG:4326 WGS84) downloaded successfully for offline QGIS / ArcGIS mapping.</span>
        </div>
      )}

      {/* Filter & Search Bar */}
      <div className="bg-white border border-[#D1D5DB] rounded-lg p-3.5 shadow-xs grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
        <div className="sm:col-span-4 relative">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search Survey No (e.g. 142/A), Landowner, Village..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-[#fafafa] border border-[#D1D5DB] rounded focus:bg-white focus:outline-none focus:border-[#1B365D] focus:ring-1 focus:ring-[#1B365D]"
          />
        </div>

        <div className="sm:col-span-3">
          <select
            value={selectedVillage}
            onChange={(e) => setSelectedVillage(e.target.value)}
            className="w-full py-2 px-3 text-xs bg-[#fafafa] border border-[#D1D5DB] rounded focus:bg-white focus:outline-none focus:border-[#1B365D]"
          >
            <option value="All">All Villages (Anand Corridor)</option>
            <option value="Rampura">Rampura Village</option>
            <option value="Navli">Navli Village</option>
            <option value="Mogar">Mogar Village</option>
            <option value="Gamdi">Gamdi Village</option>
          </select>
        </div>

        <div className="sm:col-span-3">
          <select
            value={selectedStatusFilter}
            onChange={(e) => setSelectedStatusFilter(e.target.value)}
            className="w-full py-2 px-3 text-xs bg-[#fafafa] border border-[#D1D5DB] rounded focus:bg-white focus:outline-none focus:border-[#1B365D]"
          >
            <option value="All">All Acquisition Stages</option>
            <option value="Verified">e-Dhara Verified Parcels</option>
            <option value="Awarded">Section 23 Award Made</option>
            <option value="Flagged">High Risk / Disputed</option>
          </select>
        </div>

        <div className="sm:col-span-2 text-right">
          <span className="text-[11px] font-bold text-[#1B365D]">
            {filteredParcels.length} Parcels Listed
          </span>
          <span className="text-[10px] text-slate-500 block">
            {totalAcresInView.toFixed(1)} Acres Total
          </span>
        </div>
      </div>

      {/* Main Map & Interactive Inspector Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Leaflet GIS Map Canvas (8 Columns) */}
        <div className="lg:col-span-8 space-y-3">
          <LeafletGisMap
            parcels={filteredParcels}
            selectedParcelIds={activeParcel ? [activeParcel.id] : []}
            activeParcel={activeParcel}
            onSetActiveParcel={setActiveParcel}
            height="560px"
            filterVillage={selectedVillage}
          />

          <div className="bg-slate-50 border border-[#D1D5DB] rounded-md p-3 text-[11px] text-slate-600 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-[#1B365D] shrink-0" />
              <span>Click on any parcel polygon to view cadastral land records, solatium, and court status.</span>
            </div>
            <span className="font-mono text-slate-400 text-[10px]">DGPS Base: WGS-84 / UTM 43N</span>
          </div>
        </div>

        {/* Selected Parcel Inspector & Legal Dossier (4 Columns) */}
        <div className="lg:col-span-4 space-y-4">
          {activeParcel ? (
            <div className="bg-white border border-[#D1D5DB] rounded-lg shadow-xs overflow-hidden">
              <div className="bg-[#1B365D] text-white p-4 border-b-2 border-[#C5A059]">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] uppercase font-bold text-[#C5A059] tracking-wider">
                    Cadastral Land Dossier
                  </span>
                  <StatusBadge status={activeParcel.verificationStatus} size="xs" />
                </div>
                <h3 className="text-lg font-bold text-white">
                  Survey No: {activeParcel.surveyNumber}
                </h3>
                <div className="text-xs text-slate-200">
                  Village: {activeParcel.village}, District Anand (Gujarat)
                </div>
              </div>

              <div className="p-4 space-y-3 text-xs">
                <div className="space-y-2 border-b border-slate-200 pb-3">
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-semibold">Khatedar (Landowner):</span>
                    <span className="font-bold text-slate-900 text-right">{activeParcel.ownerName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-semibold">Father / Husband:</span>
                    <span className="text-slate-800 text-right">{activeParcel.fatherName || "N/A"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-semibold">Land Classification:</span>
                    <span className="text-slate-800 font-medium">{activeParcel.landType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-semibold">Acquisition Area:</span>
                    <span className="font-bold text-[#1B365D]">{activeParcel.areaAcres} Acres ({(activeParcel.areaAcres * 0.404686).toFixed(2)} Ha)</span>
                  </div>
                </div>

                {/* Statutory Compensation Breakdown */}
                <div className="space-y-1.5 border-b border-slate-200 pb-3 bg-slate-50 p-2.5 rounded">
                  <div className="text-[10px] font-bold uppercase text-[#1B365D] tracking-wide mb-1">
                    First Schedule Valuation (RFCTLARR Act)
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-600">Circle Rate / Base Value:</span>
                    <span className="font-mono">₹ {(activeParcel.baseLandValue / 100000).toFixed(2)} Lakh</span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-600">Rural Multiplier (1.5x):</span>
                    <span className="font-mono">₹ {(activeParcel.adjustedLandValue / 100000).toFixed(2)} Lakh</span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-600">Assets & Trees Value:</span>
                    <span className="font-mono">₹ {(activeParcel.totalAssetsValue / 100000).toFixed(2)} Lakh</span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-600">100% Solatium (Sec 30):</span>
                    <span className="font-mono text-emerald-700">₹ {(activeParcel.solatiumAmount / 100000).toFixed(2)} Lakh</span>
                  </div>
                  <div className="flex justify-between text-xs font-bold pt-1 border-t border-slate-200 text-[#1B365D]">
                    <span>Total Award Payable:</span>
                    <span className="text-[#C5A059]">₹ {(activeParcel.finalCompensationAmount / 10000000).toFixed(2)} Cr</span>
                  </div>
                </div>

                {/* R&R Entitlements */}
                <div className="space-y-1 text-[11px]">
                  <div className="font-bold text-slate-800">Second Schedule R&R Benefits:</div>
                  <ul className="space-y-1 text-slate-600">
                    {(activeParcel.rnrEntitlements || ["Livelihood Assistance: ₹ 5,00,000", "Transportation Allowance: ₹ 50,000"]).map((ent, idx) => (
                      <li key={idx} className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                        <span>{ent}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2 flex flex-col gap-2">
                  <button
                    onClick={() => navigateTo("citizen-my-land")}
                    className="w-full bg-[#1B365D] hover:bg-[#142946] text-white py-2 rounded font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>Open Citizen Self-Service Page</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C5A059]" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white border border-[#D1D5DB] rounded-lg p-6 text-center text-slate-400 text-xs">
              Select a parcel from the map to inspect records.
            </div>
          )}

          {/* Quick Statistics Card */}
          <div className="bg-white border border-[#D1D5DB] rounded-lg p-4 shadow-xs space-y-3">
            <h4 className="text-xs font-bold text-[#1B365D] uppercase tracking-wider border-b pb-2">
              Corridor Alignment Summary
            </h4>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-2.5 bg-slate-50 rounded border border-slate-200">
                <span className="text-[10px] text-slate-500 block">Total Corridor Land</span>
                <span className="text-sm font-bold text-[#1B365D]">{totalAcresInView.toFixed(1)} Acres</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded border border-slate-200">
                <span className="text-[10px] text-slate-500 block">Total Compensation</span>
                <span className="text-sm font-bold text-emerald-700">₹ {(totalValueInView / 10000000).toFixed(2)} Cr</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
