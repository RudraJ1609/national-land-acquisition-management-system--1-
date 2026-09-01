import React, { useState } from "react";
import { useApp } from "../../context/AppContext.jsx";
import { LeafletGisMap } from "../common/LeafletGisMap.jsx";
import { StatusBadge } from "../common/StatusBadge.jsx";
import {
  FilePlus,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Upload,
  MapPin,
  Building,
  FileText,
  DollarSign,
  AlertCircle,
  Compass,
  Layers,
  CheckCircle2,
  CheckSquare,
  Square,
  Maximize2,
  Minimize2,
  Sparkles,
  Info
} from "lucide-react";

export const Page14NewProposalForm = () => {
  const { createProject, navigateTo, parcels } = useApp();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [selectedParcels, setSelectedParcels] = useState(["PAR-01", "PAR-02", "PAR-03", "PAR-04"]);
  const [activeParcelDetails, setActiveParcelDetails] = useState(parcels?.[0] || null);
  const [gisVillageFilter, setGisVillageFilter] = useState("All");
  const [isMapExpanded, setIsMapExpanded] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    type: "Railway Infrastructure",
    ministry: "Ministry of Railways",
    requiringBody: "Dedicated Freight Corridor Corporation (DFCCIL)",
    requiringBodyUser: "Shri V. K. Sharma (Chief Project Manager)",
    justification: "",
    state: "Gujarat",
    district: "Anand",
    taluka: "Petlad",
    villages: "Petlad, Sunav, Bandhani, Agas",
    landRequired: 180,
    privateLand: 150,
    govtLand: 20,
    forestLand: 10,
    estimatedCost: "₹ 240.00 Cr",
    dprUploaded: true
  });

  const parcelList = parcels || [];
  const filteredGisList = parcelList.filter(
    (p) => gisVillageFilter === "All" || p.village === gisVillageFilter
  );

  const selectedTotalArea = parcelList
    .filter((p) => selectedParcels.includes(p.id))
    .reduce((acc, p) => acc + (Number(p.areaAcres) || 0), 0);

  const syncParcelsToFormData = (parcelIds) => {
    const matched = parcelList.filter((p) => parcelIds.includes(p.id));
    const totalArea = matched.reduce((acc, p) => acc + (Number(p.areaAcres) || 0), 0);
    const uniqueVillages = [...new Set(matched.map((p) => p.village))].filter(Boolean);

    setFormData((prev) => ({
      ...prev,
      landRequired: totalArea > 0 ? Number(totalArea.toFixed(1)) : prev.landRequired,
      privateLand: totalArea > 0 ? Number((totalArea * 0.85).toFixed(1)) : prev.privateLand,
      govtLand: totalArea > 0 ? Number((totalArea * 0.10).toFixed(1)) : prev.govtLand,
      forestLand: totalArea > 0 ? Number((totalArea * 0.05).toFixed(1)) : prev.forestLand,
      villages: uniqueVillages.length > 0 ? uniqueVillages.join(", ") : prev.villages
    }));
  };

  const toggleSelectParcel = (id) => {
    let updated;
    if (selectedParcels.includes(id)) {
      updated = selectedParcels.filter((p) => p !== id);
    } else {
      updated = [...selectedParcels, id];
    }
    setSelectedParcels(updated);
    syncParcelsToFormData(updated);
  };

  const selectAllParcels = () => {
    const allIds = parcelList.map((p) => p.id);
    setSelectedParcels(allIds);
    syncParcelsToFormData(allIds);
  };

  const clearAllParcels = () => {
    setSelectedParcels([]);
    syncParcelsToFormData([]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const newProj = {
      name: formData.name || "Western Dedicated Freight Corridor (Section 4 Expansion)",
      type: formData.type,
      state: formData.state,
      district: formData.district,
      taluka: formData.taluka,
      ministry: formData.ministry,
      requiringBody: formData.requiringBody,
      requiringBodyUser: formData.requiringBodyUser,
      villages: typeof formData.villages === "string" ? formData.villages.split(",").map((v) => v.trim()) : formData.villages,
      landRequired: Number(formData.landRequired) || 180,
      privateLand: Number(formData.privateLand) || 150,
      govtLand: Number(formData.govtLand) || 20,
      forestLand: Number(formData.forestLand) || 10,
      estimatedCost: formData.estimatedCost || "₹ 240.00 Cr",
      justification: formData.justification || "Strategic freight capacity expansion connecting industrial hubs.",
      selectedParcelIds: selectedParcels,
      totalParcels: selectedParcels.length
    };

    const created = createProject(newProj);
    setIsSubmitting(false);
    setSuccessMessage(`Project Proposal #${created.id} successfully submitted to State Revenue Authority.`);

    setTimeout(() => {
      navigateTo("requiring-body-dashboard");
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="border-b border-slate-200 pb-3">
        <div className="text-xs text-slate-500 font-medium">
          Requiring Body Portal • Section 3(u) Land Acquisition Proposal
        </div>
        <h1 className="text-xl font-bold text-slate-900 leading-tight flex items-center gap-2">
          <FilePlus className="w-5 h-5 text-[#1e3a8a]" />
          Submit New Land Acquisition Proposal
        </h1>
      </div>

      {successMessage && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs rounded font-semibold flex items-center gap-2 shadow-xs">
          <CheckCircle className="w-5 h-5 text-emerald-700 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* 4-Step Indicator */}
      <div className="bg-white border border-slate-300 rounded p-4 shadow-2xs">
        <div className="grid grid-cols-4 gap-2 text-center text-xs">
          <div
            className={`p-2 rounded font-semibold transition-colors ${
              currentStep >= 1 ? "bg-[#1e3a8a] text-white" : "bg-slate-100 text-slate-500"
            }`}
          >
            1. Basic Information
          </div>
          <div
            className={`p-2 rounded font-semibold transition-colors ${
              currentStep >= 2 ? "bg-[#1e3a8a] text-white" : "bg-slate-100 text-slate-500"
            }`}
          >
            2. Location & Alignment
          </div>
          <div
            className={`p-2 rounded font-semibold transition-colors ${
              currentStep >= 3 ? "bg-[#1e3a8a] text-white" : "bg-slate-100 text-slate-500"
            }`}
          >
            3. Land Quantum & Cost
          </div>
          <div
            className={`p-2 rounded font-semibold transition-colors ${
              currentStep >= 4 ? "bg-[#1e3a8a] text-white" : "bg-slate-100 text-slate-500"
            }`}
          >
            4. DPR & Review Submit
          </div>
        </div>
      </div>

      {/* Step Content Form */}
      <div className="bg-white border border-slate-300 rounded p-6 shadow-xs">
        {/* STEP 1: Basic Information */}
        {currentStep === 1 && (
          <div className="space-y-4 text-xs">
            <h2 className="font-bold text-sm text-slate-900 border-b pb-2">
              Step 1: Statutory Project Details
            </h2>

            <div>
              <label className="block font-semibold text-slate-800 mb-1">
                Project Title <span className="text-rose-600">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., Western Dedicated Freight Corridor (Section 4 Feeder Link)"
                className="w-full p-2.5 border border-slate-300 rounded text-slate-900 focus:ring-2 focus:ring-[#1e3a8a]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-800 mb-1">Infrastructure Sector</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full p-2.5 border border-slate-300 rounded bg-white text-slate-900"
                >
                  <option value="Railway Infrastructure">Railway Infrastructure</option>
                  <option value="Highways & Expressways">Highways & Expressways</option>
                  <option value="Renewable Energy">Renewable Energy</option>
                  <option value="Civil Aviation">Civil Aviation</option>
                  <option value="Urban Mass Transit">Urban Mass Transit</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-800 mb-1">Administrative Ministry</label>
                <input
                  type="text"
                  name="ministry"
                  value={formData.ministry}
                  onChange={handleChange}
                  className="w-full p-2.5 border border-slate-300 rounded text-slate-900"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-800 mb-1">Requiring Body Organization</label>
                <input
                  type="text"
                  name="requiringBody"
                  value={formData.requiringBody}
                  onChange={handleChange}
                  className="w-full p-2.5 border border-slate-300 rounded text-slate-900"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-800 mb-1">Authorized Project Officer</label>
                <input
                  type="text"
                  name="requiringBodyUser"
                  value={formData.requiringBodyUser}
                  onChange={handleChange}
                  className="w-full p-2.5 border border-slate-300 rounded text-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-800 mb-1">
                Statutory Public Purpose & Justification (RFCTLARR Section 2) <span className="text-rose-600">*</span>
              </label>
              <textarea
                rows={3}
                name="justification"
                value={formData.justification}
                onChange={handleChange}
                placeholder="State the strategic national importance and lack of non-agricultural alternative sites..."
                className="w-full p-2.5 border border-slate-300 rounded text-slate-900 focus:ring-2 focus:ring-[#1e3a8a]"
              />
            </div>
          </div>
        )}

        {/* STEP 2: Location & Alignment + Interactive GIS Parcel Selection */}
        {currentStep === 2 && (
          <div className="space-y-4 text-xs">
            <h2 className="font-bold text-sm text-slate-900 border-b pb-2">
              Step 2: Geographic Location & Corridor Alignment
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block font-semibold text-slate-800 mb-1">State</label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full p-2.5 border border-slate-300 rounded bg-white text-slate-900"
                >
                  <option value="Gujarat">Gujarat</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Rajasthan">Rajasthan</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-800 mb-1">District</label>
                <input
                  type="text"
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  className="w-full p-2.5 border border-slate-300 rounded text-slate-900"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-800 mb-1">Taluka / Sub-Division</label>
                <input
                  type="text"
                  name="taluka"
                  value={formData.taluka}
                  onChange={handleChange}
                  className="w-full p-2.5 border border-slate-300 rounded text-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-800 mb-1">
                Affected Revenue Villages (Auto-updated from selected GIS parcels)
              </label>
              <input
                type="text"
                name="villages"
                value={formData.villages}
                onChange={handleChange}
                placeholder="e.g. Petlad, Sunav, Bandhani, Agas"
                className="w-full p-2.5 border border-slate-300 rounded text-slate-900"
              />
            </div>

            {/* Alignment Upload Strip */}
            <div className="border border-dashed border-slate-300 bg-slate-50 p-3.5 rounded text-center space-y-1.5">
              <div className="flex items-center justify-center gap-2">
                <Upload className="w-4 h-4 text-[#1e3a8a]" />
                <span className="font-semibold text-slate-800">Upload Corridor KML / GeoJSON / Shapefile</span>
              </div>
              <div className="text-[11px] text-slate-500">Supports .kml, .geojson, .shp for automated village parcel clipping</div>
              <div className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 font-bold px-2.5 py-0.5 rounded text-[10px]">
                <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                <span>Sample alignment file pre-loaded: DFCCIL_Sec4_Align.kml (14.2 km)</span>
              </div>
            </div>

            {/* INTERACTIVE GIS PARCEL SELECTION COMPONENT */}
            <div className="border border-slate-300 rounded-lg p-4 bg-slate-50/60 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-2.5">
                <div className="flex items-center gap-2">
                  <Compass className="w-4 h-4 text-[#1e3a8a]" />
                  <div>
                    <h3 className="font-bold text-xs text-slate-900">
                      Interactive GIS Cadastral Parcel Selection
                    </h3>
                    <span className="text-[10px] text-slate-500">
                      Click parcels on map to select/deselect them for acquisition
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <select
                    value={gisVillageFilter}
                    onChange={(e) => setGisVillageFilter(e.target.value)}
                    className="p-1 border border-slate-300 rounded bg-white text-[11px] font-medium"
                  >
                    <option value="All">All Villages</option>
                    <option value="Sunav">Sunav</option>
                    <option value="Bandhani">Bandhani</option>
                    <option value="Rampura">Rampura</option>
                    <option value="Agas">Agas</option>
                  </select>

                  <button
                    type="button"
                    onClick={selectAllParcels}
                    className="px-2 py-1 bg-white hover:bg-slate-100 border border-slate-300 rounded text-[11px] font-semibold text-slate-700 cursor-pointer"
                  >
                    Select All
                  </button>
                  <button
                    type="button"
                    onClick={clearAllParcels}
                    className="px-2 py-1 bg-white hover:bg-slate-100 border border-slate-300 rounded text-[11px] font-semibold text-slate-700 cursor-pointer"
                  >
                    Clear
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsMapExpanded(!isMapExpanded)}
                    className="p-1 bg-white hover:bg-slate-100 border border-slate-300 rounded text-slate-600 cursor-pointer"
                    title={isMapExpanded ? "Collapse Map" : "Expand Map"}
                  >
                    {isMapExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Selection Stat Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                <div className="p-2 bg-white border border-slate-200 rounded">
                  <span className="text-[10px] text-slate-500 block">Selected Parcels</span>
                  <span className="font-bold text-[#1e3a8a] text-sm">
                    {selectedParcels.length} / {parcelList.length}
                  </span>
                </div>
                <div className="p-2 bg-white border border-slate-200 rounded">
                  <span className="text-[10px] text-slate-500 block">Total Area</span>
                  <span className="font-bold text-emerald-700 text-sm">
                    {selectedTotalArea.toFixed(1)} Acres
                  </span>
                </div>
                <div className="p-2 bg-white border border-slate-200 rounded">
                  <span className="text-[10px] text-slate-500 block">Affected Villages</span>
                  <span className="font-semibold text-slate-800 text-[11px] truncate block">
                    {formData.villages || "None"}
                  </span>
                </div>
                <div className="p-2 bg-white border border-slate-200 rounded">
                  <span className="text-[10px] text-slate-500 block">Alignment Match</span>
                  <span className="font-bold text-emerald-700 text-[11px] flex items-center justify-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> 100% Clipped
                  </span>
                </div>
              </div>

              {/* GIS Map Container */}
              <div className="border border-slate-300 rounded overflow-hidden shadow-2xs">
                <LeafletGisMap
                  parcels={filteredGisList}
                  selectedParcelIds={selectedParcels}
                  onSelectParcel={toggleSelectParcel}
                  activeParcel={activeParcelDetails}
                  onSetActiveParcel={setActiveParcelDetails}
                  height={isMapExpanded ? "520px" : "360px"}
                  filterVillage={gisVillageFilter}
                />
              </div>

              {/* Active Parcel Inspector Strip */}
              {activeParcelDetails && (
                <div className="bg-white border border-slate-200 rounded p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 font-mono text-sm">
                        Survey No: {activeParcelDetails.surveyNumber}
                      </span>
                      <span className="text-slate-500">({activeParcelDetails.village})</span>
                      <StatusBadge status={activeParcelDetails.verificationStatus || "Verified"} size="xs" />
                    </div>
                    <div className="text-[11px] text-slate-600 flex flex-wrap items-center gap-x-3">
                      <span><strong>Khatedar:</strong> {activeParcelDetails.ownerName}</span>
                      <span><strong>Area:</strong> {activeParcelDetails.areaAcres} Ac</span>
                      <span><strong>Type:</strong> {activeParcelDetails.landType}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={() => toggleSelectParcel(activeParcelDetails.id)}
                      className={`flex-1 sm:flex-initial px-3.5 py-1.5 rounded text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                        selectedParcels.includes(activeParcelDetails.id)
                          ? "bg-rose-100 text-rose-800 hover:bg-rose-200 border border-rose-300"
                          : "bg-[#1e3a8a] text-white hover:bg-[#172554]"
                      }`}
                    >
                      {selectedParcels.includes(activeParcelDetails.id) ? (
                        <>
                          <Square className="w-3.5 h-3.5" />
                          <span>Deselect Parcel</span>
                        </>
                      ) : (
                        <>
                          <CheckSquare className="w-3.5 h-3.5" />
                          <span>Select for Acquisition</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        syncParcelsToFormData(selectedParcels);
                        setCurrentStep(3);
                      }}
                      className="flex-1 sm:flex-initial px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded text-xs font-bold flex items-center justify-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
                    >
                      <span>Confirm & Next →</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* STEP 3: Land Quantum & Cost */}
        {currentStep === 3 && (
          <div className="space-y-4 text-xs">
            <h2 className="font-bold text-sm text-slate-900 border-b pb-2">
              Step 3: Land Quantum Assessment & Financial Provision
            </h2>

            {selectedParcels.length > 0 && (
              <div className="p-3 bg-blue-50 border border-blue-200 rounded text-blue-900 flex items-center justify-between">
                <span className="font-medium">
                  ✓ Land quantum automatically populated from <strong>{selectedParcels.length} GIS parcels</strong> ({selectedTotalArea.toFixed(1)} Acres).
                </span>
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="text-[#1e3a8a] hover:underline font-bold text-[11px]"
                >
                  Edit GIS Selection
                </button>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div>
                <label className="block font-semibold text-slate-800 mb-1">Total Land (Acres)</label>
                <input
                  type="number"
                  name="landRequired"
                  value={formData.landRequired}
                  onChange={handleChange}
                  className="w-full p-2.5 border border-slate-300 rounded text-slate-900 font-bold"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-800 mb-1">Private Agricultural</label>
                <input
                  type="number"
                  name="privateLand"
                  value={formData.privateLand}
                  onChange={handleChange}
                  className="w-full p-2.5 border border-slate-300 rounded text-slate-900"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-800 mb-1">Govt Revenue Land</label>
                <input
                  type="number"
                  name="govtLand"
                  value={formData.govtLand}
                  onChange={handleChange}
                  className="w-full p-2.5 border border-slate-300 rounded text-slate-900"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-800 mb-1">Forest / Sanctuary</label>
                <input
                  type="number"
                  name="forestLand"
                  value={formData.forestLand}
                  onChange={handleChange}
                  className="w-full p-2.5 border border-slate-300 rounded text-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-800 mb-1">Estimated Acquisition & R&R Budget</label>
              <input
                type="text"
                name="estimatedCost"
                value={formData.estimatedCost}
                onChange={handleChange}
                placeholder="e.g. ₹ 240.00 Cr"
                className="w-full p-2.5 border border-slate-300 rounded text-slate-900"
              />
              <span className="text-[11px] text-slate-500 mt-1 block">
                Must include 100% Solatium, 1.5x-2.0x rural factor, tree/structure valuations, and administrative charges.
              </span>
            </div>
          </div>
        )}

        {/* STEP 4: DPR & Review Submit */}
        {currentStep === 4 && (
          <div className="space-y-4 text-xs">
            <h2 className="font-bold text-sm text-slate-900 border-b pb-2">
              Step 4: Statutory Document Upload & Final Submission Review
            </h2>

            <div className="space-y-2">
              <div className="p-3 bg-slate-50 border rounded flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900">1. Detailed Project Report (DPR) Volume I & II</div>
                  <div className="text-[11px] text-slate-500">PDF • 14.8 MB • Uploaded & SHA-256 Signed</div>
                </div>
                <span className="text-emerald-700 font-bold flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" /> Ready
                </span>
              </div>

              <div className="p-3 bg-slate-50 border rounded flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900">2. In-Principle Ministry Sanction Letter</div>
                  <div className="text-[11px] text-slate-500">PDF • 2.1 MB • Railway Board Sanction #2026/RB/LA/04</div>
                </div>
                <span className="text-emerald-700 font-bold flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" /> Ready
                </span>
              </div>

              <div className="p-3 bg-slate-50 border rounded flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900">3. GIS Alignment Cadastral Schedule</div>
                  <div className="text-[11px] text-slate-500">GeoJSON & Cadastral Overlay • {selectedParcels.length} Parcels ({selectedTotalArea.toFixed(1)} Ac)</div>
                </div>
                <span className="text-emerald-700 font-bold flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" /> Ready
                </span>
              </div>
            </div>

            <div className="p-4 bg-amber-50 border border-amber-300 rounded text-amber-950 space-y-1">
              <div className="font-bold flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-amber-800" />
                Statutory Declaration by Requiring Body Officer
              </div>
              <p className="text-[11px]">
                I hereby certify that the proposed land acquisition satisfies all criteria under RFCTLARR Act 2013, the alignment minimizes displacement, and financial deposit is sanctioned in corporate budget.
              </p>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between pt-5 border-t border-slate-200 mt-6">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={() => setCurrentStep(currentStep - 1)}
              className="bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 px-4 py-2 rounded text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Previous Step</span>
            </button>
          ) : (
            <div></div>
          )}

          {currentStep < 4 ? (
            <button
              type="button"
              onClick={() => {
                if (currentStep === 2) {
                  syncParcelsToFormData(selectedParcels);
                }
                setCurrentStep(currentStep + 1);
              }}
              className="bg-[#1e3a8a] hover:bg-[#172554] text-white px-5 py-2 rounded text-xs font-semibold flex items-center gap-1.5 shadow-2xs cursor-pointer"
            >
              <span>Next Step</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleFinalSubmit}
              disabled={isSubmitting}
              className="bg-emerald-700 hover:bg-emerald-800 text-white px-6 py-2.5 rounded text-xs font-bold flex items-center gap-2 shadow-md cursor-pointer"
            >
              <CheckCircle className="w-4 h-4" />
              <span>{isSubmitting ? "Submitting to State..." : "Submit Proposal to State Authority"}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

