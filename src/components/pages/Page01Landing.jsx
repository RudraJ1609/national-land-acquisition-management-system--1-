import React, { useState } from "react";
import { useApp } from "../../context/AppContext.jsx";
import { GovEmblem } from "../common/GovEmblem.jsx";
import { StatusBadge } from "../common/StatusBadge.jsx";
import { LeafletGisMap } from "../common/LeafletGisMap.jsx";
import landAcquisitionHeroImg from "../../assets/images/land_acquisition_hero_1787591493962.jpg";
import {
  Search,
  MapPin,
  FileText,
  Compass,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  HelpCircle,
  Bell,
  Download,
  Eye,
  TrendingUp,
  AlertCircle,
  Layers,
  Building,
  CheckCircle2
} from "lucide-react";

export const Page01Landing = () => {
  const { navigateTo, gazetteNotifications, statesProgress, nationalKpis, parcels } = useApp();
  const [searchTab, setSearchTab] = useState("project"); // project, survey, parcel
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMapState, setSelectedMapState] = useState(null);
  const [activeGisParcel, setActiveGisParcel] = useState(parcels[0]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTab === "survey" || searchTab === "parcel") {
      navigateTo("citizen-my-land");
    } else {
      navigateTo("public-project-search");
    }
  };

  return (
    <div className="space-y-10 pb-16">
      {/* 1. Official Hero Section with Land Acquisition Background Image */}
      <section className="relative overflow-hidden rounded-xl border border-[#D1D5DB] shadow-xl text-white">
        {/* Background Image Container */}
        <div className="absolute inset-0 z-0">
          <img
            src={landAcquisitionHeroImg}
            alt="National Land Acquisition and Infrastructure Corridor"
            className="w-full h-full object-cover object-center scale-100 filter brightness-100 contrast-105"
            referrerPolicy="no-referrer"
          />
          {/* Refined subtle blue overlay: reduced opacity so the land corridor image is clear and crisp */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b1d38]/65 via-[#1B365D]/45 to-[#0b1d38]/60" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/55" />
        </div>

        {/* Content Layer */}
        <div className="relative z-10 py-14 px-4 sm:px-8 max-w-6xl mx-auto text-center space-y-6">
          {/* Government Badge */}
          <div className="inline-flex items-center gap-2 bg-[#0b1d38]/85 backdrop-blur-md text-[#C5A059] border border-[#C5A059]/70 px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-lg">
            <GovEmblem className="w-4 h-4" color="text-[#C5A059]" />
            <span>Ministry of Rural Development • Department of Land Resources</span>
          </div>

          {/* Heading */}
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white max-w-4xl mx-auto leading-tight drop-shadow-md">
            National Land Acquisition Management Portal
          </h1>

          <p className="text-slate-100 text-sm sm:text-base max-w-3xl mx-auto leading-relaxed drop-shadow-md font-medium">
            Unified digital spatial governance and compensation lifecycle platform under the statutory framework of RFCTLARR Act, 2013. Integrated with DGPS Cadastral GIS & PFMS Direct Benefit Transfer.
          </p>

          {/* Central Government Search Box with Tabs */}
          <div className="max-w-3xl mx-auto bg-white/95 backdrop-blur-md text-slate-900 rounded-lg p-4 sm:p-5 shadow-2xl border border-white/60 text-left">
            {/* Search Tabs */}
            <div className="flex border-b border-slate-200 pb-2 mb-3 gap-2 sm:gap-4 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setSearchTab("project")}
                className={`pb-1.5 border-b-2 transition-all cursor-pointer ${
                  searchTab === "project"
                    ? "border-[#1B365D] text-[#1B365D] font-bold"
                    : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                Search by Project Name
              </button>
              <button
                type="button"
                onClick={() => setSearchTab("survey")}
                className={`pb-1.5 border-b-2 transition-all cursor-pointer ${
                  searchTab === "survey"
                    ? "border-[#1B365D] text-[#1B365D] font-bold"
                    : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                Search by Survey Number
              </button>
              <button
                type="button"
                onClick={() => setSearchTab("parcel")}
                className={`pb-1.5 border-b-2 transition-all cursor-pointer ${
                  searchTab === "parcel"
                    ? "border-[#1B365D] text-[#1B365D] font-bold"
                    : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                Search by Land Parcel ID
              </button>
            </div>

            {/* Search Input Bar */}
            <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={
                    searchTab === "project"
                      ? "Enter Project Name or Ministry (e.g., Western Dedicated Freight Corridor)..."
                      : searchTab === "survey"
                      ? "Enter Revenue Survey Number (e.g., 142/A Anand)..."
                      : "Enter Land Parcel ID (e.g., PAR-01)..."
                  }
                  className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm bg-[#f8fafc] border border-[#D1D5DB] rounded focus:outline-none focus:bg-white focus:border-[#1B365D] focus:ring-1 focus:ring-[#1B365D]"
                />
              </div>
              <button
                type="submit"
                className="bg-[#1B365D] hover:bg-[#142946] text-white px-6 py-2.5 rounded text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 shadow-xs transition-colors shrink-0 cursor-pointer"
              >
                <Search className="w-4 h-4 text-[#C5A059]" />
                Search Records
              </button>
            </form>

            <div className="mt-2.5 text-[11px] text-slate-500 flex items-center justify-between">
              <span>Popular searches: WDFC Gujarat, Jewar Airport Corridor, Survey 142/A Rampura</span>
              <span className="text-[#1B365D] font-semibold hidden sm:inline">248 Projects Online</span>
            </div>
          </div>

          {/* Quick CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => navigateTo("citizen-my-land")}
              className="bg-[#C5A059] hover:bg-[#b08d48] text-white px-5 py-2.5 rounded font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all cursor-pointer"
            >
              <MapPin className="w-4 h-4" />
              <span>Track Your Land Status</span>
            </button>
            <button
              onClick={() => navigateTo("public-gis-map")}
              className="bg-white/15 hover:bg-white/25 text-white border border-[#C5A059]/60 px-5 py-2.5 rounded font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all cursor-pointer backdrop-blur-sm"
            >
              <Compass className="w-4 h-4 text-[#C5A059]" />
              <span>View Interactive GIS Map</span>
            </button>
            <button
              onClick={() => navigateTo("login")}
              className="bg-white hover:bg-slate-100 text-[#1B365D] px-5 py-2.5 rounded font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-[#1B365D]" />
              <span>Officer / Citizen Login</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. Key National Acquisition Metrics Strip */}
      <section className="max-w-7xl mx-auto">
        <div className="bg-white border border-[#D1D5DB] rounded-lg p-5 shadow-xs">
          <div className="text-xs font-bold text-[#1B365D] uppercase tracking-wider mb-4 flex items-center justify-between border-b border-slate-200 pb-2.5">
            <span className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#C5A059]" />
              National Land Acquisition Status (RFCTLARR Act 2013)
            </span>
            <span className="text-[11px] text-slate-500 font-normal">Updated: Live Portal Aggregation</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 divide-y md:divide-y-0 md:divide-x divide-slate-200">
            <div className="pt-2 md:pt-0 px-3 text-center md:text-left">
              <div className="text-xs text-slate-500 font-medium">Total Projects</div>
              <div className="text-xl sm:text-2xl font-bold text-[#1B365D]">{nationalKpis.totalProjects}</div>
              <div className="text-[11px] text-emerald-700 font-medium">184 Active Districts</div>
            </div>

            <div className="pt-2 md:pt-0 px-3 text-center md:text-left">
              <div className="text-xs text-slate-500 font-medium">Area Notified</div>
              <div className="text-xl sm:text-2xl font-bold text-slate-900">{(nationalKpis?.areaNotified || 0).toLocaleString()} <span className="text-xs font-normal">Acres</span></div>
              <div className="text-[11px] text-slate-600">Sec 11(1) Gazette</div>
            </div>

            <div className="pt-2 md:pt-0 px-3 text-center md:text-left">
              <div className="text-xs text-slate-500 font-medium">Area Handed Over</div>
              <div className="text-xl sm:text-2xl font-bold text-emerald-700">{(nationalKpis?.areaAcquired || 0).toLocaleString()} <span className="text-xs font-normal">Acres</span></div>
              <div className="text-[11px] text-emerald-700 font-medium">69.4% Possession Done</div>
            </div>

            <div className="pt-2 md:pt-0 px-3 text-center md:text-left">
              <div className="text-xs text-slate-500 font-medium">Affected Families</div>
              <div className="text-xl sm:text-2xl font-bold text-slate-900">{(nationalKpis?.familiesAffected || 0).toLocaleString()}</div>
              <div className="text-[11px] text-[#1B365D] font-medium">SIA Census Done</div>
            </div>

            <div className="pt-2 md:pt-0 px-3 text-center md:text-left">
              <div className="text-xs text-slate-500 font-medium">Compensation Disbursed</div>
              <div className="text-xl sm:text-2xl font-bold text-[#C5A059]">₹ {nationalKpis.compensationDisbursed} <span className="text-xs font-normal">Cr</span></div>
              <div className="text-[11px] text-emerald-700 font-medium">PFMS Direct Bank Transfer</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Interactive GIS Map Spotlight Preview (New Middle Section Feature) */}
      <section className="max-w-7xl mx-auto space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-[#D1D5DB] pb-3">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#C5A059] flex items-center gap-1.5">
              <Compass className="w-4 h-4" />
              <span>Spatial Cadastral Infrastructure Layer</span>
            </div>
            <h2 className="text-lg font-bold text-[#1B365D]">
              Live GIS Parcel Alignment & Boundary Mapping
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Interactive Leaflet.js GIS map displaying DGPS surveyed land boundaries, corridor alignments, and statutory compensation schedules.
            </p>
          </div>
          <button
            onClick={() => navigateTo("public-gis-map")}
            className="bg-[#1B365D] hover:bg-[#142946] text-white px-4 py-2 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
          >
            <span>Open Full GIS Viewer</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#C5A059]" />
          </button>
        </div>

        {/* Embedded Leaflet GIS Map Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <div className="lg:col-span-8">
            <LeafletGisMap
              parcels={parcels}
              selectedParcelIds={activeGisParcel ? [activeGisParcel.id] : []}
              activeParcel={activeGisParcel}
              onSetActiveParcel={setActiveGisParcel}
              height="440px"
            />
          </div>

          <div className="lg:col-span-4 bg-white border border-[#D1D5DB] rounded-lg p-4 shadow-xs space-y-3 flex flex-col justify-between">
            {activeGisParcel ? (
              <div className="space-y-3">
                <div className="border-b border-[#D1D5DB] pb-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold text-[#C5A059]">Parcel Inspector</span>
                    <StatusBadge status={activeGisParcel.verificationStatus} size="xs" />
                  </div>
                  <h3 className="text-base font-bold text-[#1B365D]">
                    Survey No: {activeGisParcel.surveyNumber}
                  </h3>
                  <div className="text-xs text-slate-500">
                    {activeGisParcel.village}, Anand Corridor
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Landowner:</span>
                    <span className="font-bold text-slate-900">{activeGisParcel.ownerName}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Acquisition Area:</span>
                    <span className="font-bold text-[#1B365D]">{activeGisParcel.areaAcres} Acres</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Land Category:</span>
                    <span className="text-slate-800">{activeGisParcel.landType}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Total Compensation:</span>
                    <span className="font-bold text-[#C5A059]">₹ {(activeGisParcel.finalCompensationAmount / 10000000).toFixed(2)} Cr</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Current Stage:</span>
                    <span className="text-slate-800 font-semibold">{activeGisParcel.status}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-10 text-slate-400 text-xs">
                Select any parcel polygon on the map to inspect details.
              </div>
            )}

            <div className="pt-2">
              <button
                onClick={() => navigateTo("public-gis-map")}
                className="w-full bg-slate-100 hover:bg-slate-200 text-[#1B365D] py-2 rounded text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border border-[#D1D5DB] cursor-pointer"
              >
                <Compass className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Explore All Corridors in GIS Mode</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Four Core Public Service Cards */}
      <section className="max-w-7xl mx-auto">
        <h2 className="text-lg font-bold text-[#1B365D] mb-4 flex items-center gap-2">
          <span className="w-1.5 h-4 bg-[#C5A059] inline-block rounded-xs"></span>
          Citizen & Public Services
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1 */}
          <div
            onClick={() => navigateTo("citizen-my-land")}
            className="bg-white border border-[#D1D5DB] hover:border-[#1B365D] rounded-lg p-5 shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-md bg-[#1B365D]/10 border border-[#1B365D]/20 text-[#1B365D] flex items-center justify-center mb-3 group-hover:bg-[#1B365D] group-hover:text-[#C5A059] transition-colors">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-1 group-hover:text-[#1B365D]">
                Track Land Status
              </h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Check whether your survey number is notified under Section 11/19 and view the statutory timeline.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center text-xs font-semibold text-[#1B365D]">
              <span>Track Khatedar Status</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform text-[#C5A059]" />
            </div>
          </div>

          {/* Card 2 */}
          <div
            onClick={() => navigateTo("public-gis-map")}
            className="bg-white border border-[#D1D5DB] hover:border-[#1B365D] rounded-lg p-5 shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center justify-center mb-3 group-hover:bg-emerald-800 group-hover:text-white transition-colors">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-1 group-hover:text-emerald-800">
                Public GIS Parcel Map
              </h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Interactive spatial map of notified acquisition corridors with village and survey boundaries.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center text-xs font-semibold text-emerald-800">
              <span>Open Spatial Explorer</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 3 */}
          <div
            onClick={() => navigateTo("objections")}
            className="bg-white border border-[#D1D5DB] hover:border-[#1B365D] rounded-lg p-5 shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-md bg-amber-50 border border-amber-200 text-amber-800 flex items-center justify-center mb-3 group-hover:bg-amber-800 group-hover:text-white transition-colors">
                <AlertCircle className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-1 group-hover:text-amber-800">
                Submit / Track Objections
              </h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                File Section 15 objections regarding land valuation, area discrepancy, or severance within 60 days.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center text-xs font-semibold text-amber-800">
              <span>Lodge Section 15 Claim</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 4 */}
          <div
            onClick={() => navigateTo("compensation-calculator")}
            className="bg-white border border-[#D1D5DB] hover:border-[#1B365D] rounded-lg p-5 shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-md bg-purple-50 border border-purple-200 text-purple-800 flex items-center justify-center mb-3 group-hover:bg-purple-800 group-hover:text-white transition-colors">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-1 group-hover:text-purple-800">
                Compensation & R&R Info
              </h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Understand 100% Solatium, rural multiplier calculation, and Rehabilitation entitlements.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center text-xs font-semibold text-purple-800">
              <span>Calculate Award Value</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </section>

      {/* 5. India State-Wise Progress Geographic Overview */}
      <section className="max-w-7xl mx-auto">
        <div className="bg-white border border-[#D1D5DB] rounded-lg p-5 shadow-xs">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-200 pb-3 mb-4">
            <div>
              <h2 className="text-base font-bold text-[#1B365D] flex items-center gap-2">
                <span className="w-1.5 h-4 bg-[#1B365D] inline-block rounded-xs"></span>
                National Acquisition Geographic Performance
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Monitoring 28 States & 8 UTs for statutory timeline compliance & risk levels
              </p>
            </div>
            <button
              onClick={() => navigateTo("state-progress")}
              className="bg-[#1B365D] hover:bg-[#142946] text-white px-3.5 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>View Full State-wise Table</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#C5A059]" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* State Risk Matrix Grid */}
            <div className="lg:col-span-6 bg-[#fafafa] border border-slate-200 rounded p-4 flex flex-col items-center justify-center min-h-[320px]">
              <div className="text-xs font-bold text-slate-700 mb-2">Interactive State Risk Matrix</div>

              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 w-full max-w-md my-2">
                {statesProgress.map((st) => {
                  const isSelected = selectedMapState?.id === st.id;
                  const isGreen = st.riskLevel === "Low";
                  const isOrange = st.riskLevel === "Moderate";

                  return (
                    <button
                      key={st.id}
                      onClick={() => setSelectedMapState(st)}
                      className={`p-2 rounded border text-left transition-all cursor-pointer ${
                        isSelected
                          ? "ring-2 ring-[#1B365D] shadow-md bg-white border-[#1B365D]"
                          : "bg-white hover:bg-slate-100 border-[#D1D5DB]"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-slate-800">{st.name}</span>
                        <span
                          className={`w-2 h-2 rounded-full ${
                            isGreen ? "bg-emerald-500" : isOrange ? "bg-amber-500" : "bg-rose-500"
                          }`}
                        />
                      </div>
                      <div className="text-[10px] text-slate-500 mt-1">
                        {st.totalProjects} Projects
                      </div>
                      <div className="text-[10px] font-semibold text-slate-700">
                        {Math.round((st.areaAcquired / st.areaRequired) * 100)}% Acquired
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] text-slate-600 mt-3 pt-2 border-t border-slate-200 w-full">
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
                  Low Risk (On Track)
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span>
                  Moderate Delay
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block"></span>
                  High Risk (Timeline Breach)
                </span>
              </div>
            </div>

            {/* Selected State Detail Panel */}
            <div className="lg:col-span-6 bg-white border border-slate-200 rounded p-4 space-y-3">
              {selectedMapState ? (
                <div>
                  <div className="flex items-center justify-between border-b pb-2">
                    <div>
                      <h3 className="font-bold text-base text-[#1B365D] flex items-center gap-2">
                        <span>State of {selectedMapState.name}</span>
                        <StatusBadge status={selectedMapState.riskLevel} />
                      </h3>
                      <div className="text-xs text-slate-500">
                        Compliance Index: {selectedMapState.complianceRate} • Category: {selectedMapState.performance}
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        navigateTo("project-progress", { stateFilter: selectedMapState.name });
                      }}
                      className="bg-[#1B365D] text-white px-3 py-1 rounded text-xs font-semibold hover:bg-[#142946] transition-colors cursor-pointer"
                    >
                      View {selectedMapState.name} Projects
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs pt-3">
                    <div className="border p-2 rounded bg-slate-50">
                      <span className="text-slate-500 block text-[10px]">Total Projects</span>
                      <span className="text-base font-bold text-slate-900">{selectedMapState.totalProjects}</span>
                    </div>
                    <div className="border p-2 rounded bg-emerald-50">
                      <span className="text-emerald-800 block text-[10px]">Completed</span>
                      <span className="text-base font-bold text-emerald-800">{selectedMapState.completedProjects}</span>
                    </div>
                    <div className="border p-2 rounded bg-blue-50">
                      <span className="text-blue-800 block text-[10px]">In Progress</span>
                      <span className="text-base font-bold text-blue-800">{selectedMapState.inProgress}</span>
                    </div>
                    <div className="border p-2 rounded bg-rose-50">
                      <span className="text-rose-800 block text-[10px]">Delayed</span>
                      <span className="text-base font-bold text-rose-800">{selectedMapState.delayed}</span>
                    </div>
                  </div>

                  <div className="pt-2 text-xs space-y-1 text-slate-700">
                    <div className="flex justify-between">
                      <span>Area Handover Progress:</span>
                      <span className="font-bold">{selectedMapState.areaAcquired} / {selectedMapState.areaRequired} Acres</span>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-[#1B365D] h-full"
                        style={{ width: `${(selectedMapState.areaAcquired / selectedMapState.areaRequired) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-500 pt-2 border-t flex items-center justify-between">
                    <span>Funds Disbursed: ₹ {selectedMapState.fundsDisbursed} Cr / ₹ {selectedMapState.fundsAllocated} Cr</span>
                    <span className="text-emerald-700 font-medium">PFMS Live</span>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 space-y-2 text-slate-500">
                  <GovEmblem className="w-12 h-14 mx-auto" color="text-slate-400" />
                  <p className="text-xs font-semibold text-slate-700">Click any State card on the left to view detailed progress statistics</p>
                  <p className="text-[11px]">States are monitored for SIA completion, award declaration deadlines, and disbursement speed.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 6. Latest Gazette Notifications List */}
      <section className="max-w-7xl mx-auto">
        <div className="bg-white border border-[#D1D5DB] rounded-lg p-5 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
            <h2 className="text-base font-bold text-[#1B365D] flex items-center gap-2">
              <Bell className="w-4 h-4 text-[#C5A059]" />
              Latest Gazette Notifications & Statutory Declarations
            </h2>
            <button
              onClick={() => navigateTo("gazette-notifications")}
              className="text-xs text-[#1B365D] font-semibold hover:underline flex items-center gap-1 cursor-pointer"
            >
              View All Gazette Notifications →
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border border-slate-200">
              <thead className="bg-[#e2e8f0] text-[#475569] font-semibold border-b border-[#cbd5e1] uppercase text-[11px]">
                <tr>
                  <th className="py-2.5 px-3 border-r border-[#cbd5e1]">Notification Type</th>
                  <th className="py-2.5 px-3 border-r border-[#cbd5e1]">Gazette Reference</th>
                  <th className="py-2.5 px-3 border-r border-[#cbd5e1]">Project Name</th>
                  <th className="py-2.5 px-3 border-r border-[#cbd5e1]">State / District</th>
                  <th className="py-2.5 px-3 border-r border-[#cbd5e1]">Date of Issue</th>
                  <th className="py-2.5 px-3 border-r border-[#cbd5e1]">Status</th>
                  <th className="py-2.5 px-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {gazetteNotifications.slice(0, 4).map((n) => (
                  <tr key={n.id} className="hover:bg-slate-50">
                    <td className="py-2.5 px-3 border-r border-slate-200 font-semibold text-slate-900">
                      {n.notificationType}
                    </td>
                    <td className="py-2.5 px-3 border-r border-slate-200 font-mono text-[11px] text-slate-700">
                      {n.gazetteNumber}
                    </td>
                    <td className="py-2.5 px-3 border-r border-slate-200 text-[#1B365D] font-medium">
                      {n.projectName}
                    </td>
                    <td className="py-2.5 px-3 border-r border-slate-200 text-slate-600">
                      {n.state} ({n.district})
                    </td>
                    <td className="py-2.5 px-3 border-r border-slate-200 text-slate-600">
                      {n.dateOfIssue}
                    </td>
                    <td className="py-2.5 px-3 border-r border-slate-200">
                      <StatusBadge status={n.status} />
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <button
                        onClick={() => navigateTo("gazette-notifications")}
                        className="inline-flex items-center gap-1 bg-[#1B365D] text-white px-2.5 py-1 rounded text-[11px] font-medium hover:bg-[#142946] shadow-2xs transition-colors cursor-pointer"
                      >
                        <Eye className="w-3 h-3 text-[#C5A059]" />
                        View PDF
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};
