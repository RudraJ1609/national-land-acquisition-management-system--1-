import React, { useState } from "react";
import { useApp } from "../../context/AppContext.jsx";
import { StatusBadge } from "../common/StatusBadge.jsx";
import { LeafletGisMap } from "../common/LeafletGisMap.jsx";
import {
  Search,
  MapPin,
  FileText,
  Coins,
  ShieldCheck,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  Download,
  Building,
  Compass,
  CheckCircle2
} from "lucide-react";

export const Page25CitizenSearch = () => {
  const { parcels, currentProject, navigateTo } = useApp();
  const [searchSurvey, setSearchSurvey] = useState("142/A");
  const [selectedVillage, setSelectedVillage] = useState("All");
  const [hasSearched, setHasSearched] = useState(true);
  const [searchedResult, setSearchedResult] = useState(parcels[0]);

  const handleSearch = (e) => {
    e.preventDefault();
    const found = parcels.find(
      (p) =>
        p.surveyNumber.toLowerCase().trim() === searchSurvey.toLowerCase().trim() ||
        p.ownerName.toLowerCase().includes(searchSurvey.toLowerCase().trim())
    );
    setSearchedResult(found || null);
    setHasSearched(true);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Public Banner */}
      <div className="bg-[#1B365D] text-white p-6 rounded-lg shadow-sm space-y-2 border-b-4 border-[#C5A059]">
        <div className="text-xs text-[#C5A059] uppercase tracking-widest font-semibold flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
          <span>National Land Acquisition Transparency & Citizen Self-Service Portal</span>
        </div>
        <h1 className="text-2xl font-bold text-white">
          Public Land Status, Valuation & Entitlement Tracker
        </h1>
        <p className="text-xs text-slate-200 max-w-2xl">
          Search revenue records, preliminary notifications (Section 11), compensation awards (Section 23), and direct benefit transfer status under RFCTLARR Act 2013.
        </p>
      </div>

      {/* Citizen Search Form */}
      <div className="bg-white border border-[#D1D5DB] rounded-lg p-5 shadow-2xs space-y-4">
        <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
          <div>
            <label className="block font-semibold text-slate-800 mb-1">State</label>
            <select className="w-full p-2 border border-[#D1D5DB] rounded bg-slate-50 text-slate-700">
              <option>Gujarat</option>
              <option>Maharashtra</option>
              <option>Rajasthan</option>
              <option>Uttar Pradesh</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-800 mb-1">District & Taluka</label>
            <select className="w-full p-2 border border-[#D1D5DB] rounded bg-slate-50 text-slate-700">
              <option>Anand (Petlad)</option>
              <option>Vadodara (Padra)</option>
              <option>Kheda (Nadiad)</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-800 mb-1">Revenue Village</label>
            <select
              value={selectedVillage}
              onChange={(e) => setSelectedVillage(e.target.value)}
              className="w-full p-2 border border-[#D1D5DB] rounded bg-white text-slate-900"
            >
              <option value="All">All Villages</option>
              <option value="Rampura">Rampura</option>
              <option value="Navli">Navli</option>
              <option value="Mogar">Mogar</option>
              <option value="Gamdi">Gamdi</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-800 mb-1">Survey No. or Owner Name</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={searchSurvey}
                onChange={(e) => setSearchSurvey(e.target.value)}
                placeholder="e.g. 142/A or Patel"
                className="w-full p-2 border border-[#D1D5DB] rounded text-slate-900 font-bold focus:border-[#1B365D] focus:outline-none"
              />
              <button
                type="submit"
                className="bg-[#1B365D] hover:bg-[#142946] text-white px-4 py-2 rounded font-bold shrink-0 flex items-center gap-1 shadow-2xs cursor-pointer transition-colors"
              >
                <Search className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Search</span>
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Search Result Card */}
      {hasSearched && searchedResult ? (
        <div className="bg-white border border-[#D1D5DB] rounded-lg p-6 shadow-xs space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#D1D5DB] pb-4">
            <div>
              <div className="text-xs text-slate-500 font-medium">
                Official Revenue Parcel Schedule • Anand Collectorate (e-Dhara RoR 7/12)
              </div>
              <h2 className="text-lg font-bold text-[#1B365D] flex items-center gap-2">
                Survey Number: <span className="font-mono text-[#1B365D]">{searchedResult.surveyNumber}</span> ({searchedResult.village})
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <StatusBadge status={searchedResult.status} />
              <StatusBadge status={searchedResult.verificationStatus} />
            </div>
          </div>

          {/* GIS Map of the Land Parcel */}
          <div className="space-y-2">
            <div className="text-xs font-bold text-[#1B365D] uppercase tracking-wider flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-[#C5A059]" />
                DGPS Cadastral Boundary of Survey No. {searchedResult.surveyNumber}
              </span>
              <span className="text-[10px] text-slate-500 font-mono">Center: {searchedResult.coordinates ? `${searchedResult.coordinates[0][0]}, ${searchedResult.coordinates[0][1]}` : "EPSG:4326"}</span>
            </div>
            <LeafletGisMap
              parcels={[searchedResult]}
              selectedParcelIds={[searchedResult.id]}
              activeParcel={searchedResult}
              height="360px"
            />
          </div>

          {/* 3 Column Data Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded space-y-1.5">
              <span className="text-[11px] font-bold text-slate-500 uppercase block">Landowner Details</span>
              <div className="font-bold text-sm text-slate-900">{searchedResult.ownerName}</div>
              <div className="text-slate-600">e-Dhara Khata No: <strong>KH-8821</strong></div>
              <div className="text-slate-600">Category: <strong>{searchedResult.landType}</strong></div>
              <div className="text-slate-600">Cadastral Area: <strong>{searchedResult.areaAcres} Acres</strong></div>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded space-y-1.5">
              <span className="text-[11px] font-bold text-slate-500 uppercase block">Statutory Compensation</span>
              <div className="font-bold text-base text-[#C5A059]">
                ₹ {(searchedResult.finalCompensationAmount / 10000000).toFixed(2)} Crores
              </div>
              <div className="text-slate-600">Base Circle Rate: <strong>₹ {(searchedResult.circleRatePerAcre || searchedResult.marketRatePerAcre)?.toLocaleString()} / Ac</strong></div>
              <div className="text-slate-600">Solatium (100%): <strong>Mandatory 100% (Sec 30)</strong></div>
              <div className="text-emerald-700 font-semibold">PFMS DBT Status: {searchedResult.awardStatus}</div>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded space-y-1.5">
              <span className="text-[11px] font-bold text-slate-500 uppercase block">Associated Project</span>
              <div className="font-bold text-slate-900">{currentProject.name}</div>
              <div className="text-slate-600">Requiring Agency: {currentProject.requiringBody}</div>
              <div className="text-slate-600">Public Purpose: National Railway Freight Corridor</div>
            </div>
          </div>

          {/* Citizen Actions */}
          <div className="pt-3 border-t border-[#D1D5DB] flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="text-slate-600 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>Certified under Government of Gujarat Revenue e-Dhara System.</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => navigateTo("rr-benefits")}
                className="bg-slate-100 hover:bg-slate-200 text-slate-800 border border-[#D1D5DB] px-3 py-1.5 rounded font-semibold cursor-pointer transition-colors"
              >
                Check R&R Entitlements
              </button>
              <button
                onClick={() => navigateTo("objections")}
                className="bg-[#1B365D] hover:bg-[#142946] text-white px-3.5 py-1.5 rounded font-semibold flex items-center gap-1 shadow-2xs cursor-pointer transition-colors"
              >
                <AlertCircle className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>File Objection (Sec 15) →</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white border border-[#D1D5DB] rounded p-8 text-center text-slate-500 text-xs shadow-2xs">
          No records found matching your search query. Please verify Survey Number or Village.
        </div>
      )}
    </div>
  );
};
