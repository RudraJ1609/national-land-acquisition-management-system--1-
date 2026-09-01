import React, { useState } from "react";
import { useApp } from "../../context/AppContext.jsx";
import { StatusBadge } from "../common/StatusBadge.jsx";
import { LeafletGisMap } from "../common/LeafletGisMap.jsx";
import {
  Compass,
  MapPin,
  CheckSquare,
  Square,
  AlertTriangle,
  Send,
  Layers,
  CheckCircle2,
  Info,
  Layers as LayersIcon
} from "lucide-react";

export const Page15GisParcelSelection = () => {
  const { parcels, currentProject, navigateTo } = useApp();
  const [selectedParcels, setSelectedParcels] = useState(["PAR-01", "PAR-02", "PAR-03", "PAR-04"]);
  const [villageFilter, setVillageFilter] = useState("All");
  const [activeParcelDetails, setActiveParcelDetails] = useState(parcels[0]);
  const [feedback, setFeedback] = useState("");

  const toggleSelect = (id) => {
    if (selectedParcels.includes(id)) {
      setSelectedParcels(selectedParcels.filter((p) => p !== id));
    } else {
      setSelectedParcels([...selectedParcels, id]);
    }
  };

  const selectAll = () => {
    setSelectedParcels(parcels.map((p) => p.id));
  };

  const clearAll = () => {
    setSelectedParcels([]);
  };

  const parcelList = parcels || [];
  const filteredList = parcelList.filter(
    (p) => villageFilter === "All" || p.village === villageFilter
  );

  const selectedTotalArea = parcelList
    .filter((p) => selectedParcels.includes(p.id))
    .reduce((acc, p) => acc + (Number(p.areaAcres) || 0), 0);

  const handleSubmitToCollector = () => {
    setFeedback(`Batch of ${selectedParcels.length} parcels (${selectedTotalArea.toFixed(1)} Acres) submitted to District Collector Anand for RoR Title Verification.`);
    setTimeout(() => {
      navigateTo("land-verification");
    }, 1500);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[#D1D5DB] pb-3">
        <div>
          <div className="text-xs text-slate-500 font-medium">
            Requiring Body Spatial Workflow • GIS Alignment Engine
          </div>
          <h1 className="text-xl font-bold text-[#1B365D] leading-tight flex items-center gap-2">
            <Compass className="w-5 h-5 text-[#C5A059]" />
            GIS Land Parcel Selection & Boundary Clipping
          </h1>
        </div>
        <button
          onClick={handleSubmitToCollector}
          className="bg-[#1B365D] hover:bg-[#142946] text-white px-4 py-2 rounded text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
        >
          <Send className="w-3.5 h-3.5 text-[#C5A059]" />
          <span>Submit {selectedParcels.length} Parcels to Collector</span>
        </button>
      </div>

      {feedback && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs rounded font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Top Stat Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="bg-white border border-[#D1D5DB] rounded-md p-3 shadow-2xs">
          <span className="text-slate-500 block text-[11px]">Required by Alignment</span>
          <span className="text-base font-bold text-slate-900">{currentProject.landRequired} Acres</span>
        </div>
        <div className="bg-white border border-[#D1D5DB] rounded-md p-3 shadow-2xs">
          <span className="text-slate-500 block text-[11px]">Currently Selected</span>
          <span className="text-base font-bold text-[#1B365D]">{selectedTotalArea.toFixed(1)} Acres</span>
        </div>
        <div className="bg-white border border-[#D1D5DB] rounded-md p-3 shadow-2xs">
          <span className="text-slate-500 block text-[11px]">Parcels in Batch</span>
          <span className="text-base font-bold text-slate-900">{selectedParcels.length} / {parcels.length}</span>
        </div>
        <div className="bg-white border border-[#D1D5DB] rounded-md p-3 shadow-2xs">
          <span className="text-slate-500 block text-[11px]">Alignment Status</span>
          <span className="text-base font-bold text-emerald-700">100% Geometry Matched</span>
        </div>
      </div>

      {/* GIS Interactive Leaflet Canvas + Detail Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Spatial Map Canvas (Left 8 Cols) */}
        <div className="lg:col-span-8 space-y-3">
          <div className="flex items-center justify-between bg-white p-2.5 rounded-t-md border border-b-0 border-[#D1D5DB]">
            <div className="flex items-center gap-2">
              <span className="bg-[#1B365D] text-white text-[10px] px-2 py-0.5 rounded font-bold uppercase">
                GIS Cadastral Layer
              </span>
              <span className="text-xs text-slate-600 font-semibold">
                Corridor: Anand-Petlad WDFC Section
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <button
                onClick={selectAll}
                className="bg-slate-100 hover:bg-slate-200 text-slate-800 px-2.5 py-1 rounded border border-[#D1D5DB] text-[11px] font-semibold transition-colors cursor-pointer"
              >
                Select All
              </button>
              <button
                onClick={clearAll}
                className="bg-slate-100 hover:bg-slate-200 text-slate-800 px-2.5 py-1 rounded border border-[#D1D5DB] text-[11px] font-semibold transition-colors cursor-pointer"
              >
                Clear
              </button>
            </div>
          </div>

          <LeafletGisMap
            parcels={filteredList}
            selectedParcelIds={selectedParcels}
            onSelectParcel={toggleSelect}
            activeParcel={activeParcelDetails}
            onSetActiveParcel={setActiveParcelDetails}
            height="500px"
            filterVillage={villageFilter}
          />

          <div className="bg-slate-50 border border-[#D1D5DB] rounded-md p-2.5 text-[11px] text-slate-600 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-[#C5A059] shrink-0" />
              <span>Spatial Alignment: Click polygon to toggle selection or inspect revenue record attributes.</span>
            </div>
            <span className="text-[10px] text-[#1B365D] font-mono font-bold">Projection: EPSG:4326</span>
          </div>
        </div>

        {/* Selected Parcel Inspector (Right 4 Cols) */}
        <div className="lg:col-span-4 bg-white border border-[#D1D5DB] rounded-lg p-4 shadow-xs space-y-3">
          {activeParcelDetails ? (
            <div>
              <div className="border-b border-[#D1D5DB] pb-2 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#C5A059]">GIS Cadastral Inspector</span>
                  <h3 className="font-bold text-base text-[#1B365D]">
                    Survey No: {activeParcelDetails.surveyNumber}
                  </h3>
                </div>
                <StatusBadge status={activeParcelDetails.status} size="sm" />
              </div>

              <div className="space-y-2 text-xs pt-3">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500 font-semibold">Village / Taluka:</span>
                  <span className="text-slate-900">{activeParcelDetails.village}, Petlad</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500 font-semibold">Khatedar (Owner):</span>
                  <span className="font-bold text-slate-900">{activeParcelDetails.ownerName}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500 font-semibold">Land Category:</span>
                  <span className="text-slate-900">{activeParcelDetails.landType}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500 font-semibold">Cadastral Area:</span>
                  <span className="font-bold text-[#1B365D]">{activeParcelDetails.areaAcres} Acres</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500 font-semibold">Valuation Base:</span>
                  <span className="text-[#C5A059] font-bold">₹ {activeParcelDetails.marketRatePerAcre?.toLocaleString() || activeParcelDetails.circleRatePerAcre?.toLocaleString()} / Acre</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500 font-semibold">Title Verification:</span>
                  <span className="text-emerald-700 font-semibold">{activeParcelDetails.verificationStatus}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500 font-semibold">AI Delay Risk:</span>
                  <StatusBadge status={activeParcelDetails.aiRiskLevel} size="xs" />
                </div>
              </div>

              <div className="pt-4 flex flex-col gap-2">
                <button
                  onClick={() => toggleSelect(activeParcelDetails.id)}
                  className={`w-full py-2.5 rounded text-xs font-semibold transition-colors cursor-pointer ${
                    selectedParcels.includes(activeParcelDetails.id)
                      ? "bg-rose-100 text-rose-800 hover:bg-rose-200"
                      : "bg-[#1B365D] text-white hover:bg-[#142946]"
                  }`}
                >
                  {selectedParcels.includes(activeParcelDetails.id) ? "Deselect Parcel from Batch" : "Select for Acquisition Batch"}
                </button>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-slate-400 text-xs">
              Click any parcel on the map to inspect revenue record details.
            </div>
          )}
        </div>
      </div>

      {/* Bottom Table */}
      <div className="bg-white border border-[#D1D5DB] rounded-lg shadow-xs p-4 space-y-3">
        <div className="flex items-center justify-between border-b border-[#D1D5DB] pb-2">
          <h3 className="font-bold text-xs uppercase tracking-wider text-[#1B365D]">
            Selected Parcel Schedule (Cadastral Alignment Batch)
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">Filter Village:</span>
            <select
              value={villageFilter}
              onChange={(e) => setVillageFilter(e.target.value)}
              className="text-xs px-2.5 py-1 border border-[#D1D5DB] rounded bg-white"
            >
              <option value="All">All Villages</option>
              <option value="Rampura">Rampura</option>
              <option value="Navli">Navli</option>
              <option value="Mogar">Mogar</option>
              <option value="Gamdi">Gamdi</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border border-slate-200">
            <thead className="bg-[#e2e8f0] text-[#475569] font-semibold border-b border-[#cbd5e1] uppercase text-[10px]">
              <tr>
                <th className="py-2.5 px-3 border-r border-[#cbd5e1] text-center">Include</th>
                <th className="py-2.5 px-3 border-r border-[#cbd5e1]">Survey No</th>
                <th className="py-2.5 px-3 border-r border-[#cbd5e1]">Village</th>
                <th className="py-2.5 px-3 border-r border-[#cbd5e1]">Landowner</th>
                <th className="py-2.5 px-3 border-r border-[#cbd5e1]">Area (Acres)</th>
                <th className="py-2.5 px-3 border-r border-[#cbd5e1]">Land Type</th>
                <th className="py-2.5 px-3 border-r border-[#cbd5e1]">RoR Title Status</th>
                <th className="py-2.5 px-3 border-r border-[#cbd5e1]">Estimated Cost</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredList.map((prc) => {
                const isSelected = selectedParcels.includes(prc.id);
                return (
                  <tr key={prc.id} className={isSelected ? "bg-amber-50/40" : "hover:bg-slate-50"}>
                    <td className="py-2 px-3 border-r border-slate-200 text-center">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSelect(prc.id)}
                        className="rounded border-slate-300 text-[#1B365D] focus:ring-[#1B365D]"
                      />
                    </td>
                    <td className="py-2 px-3 border-r border-slate-200 font-mono font-bold text-[#1B365D]">{prc.surveyNumber}</td>
                    <td className="py-2 px-3 border-r border-slate-200">{prc.village}</td>
                    <td className="py-2 px-3 border-r border-slate-200 font-medium text-slate-900">{prc.ownerName}</td>
                    <td className="py-2 px-3 border-r border-slate-200 font-bold">{prc.areaAcres}</td>
                    <td className="py-2 px-3 border-r border-slate-200 text-slate-600">{prc.landType}</td>
                    <td className="py-2 px-3 border-r border-slate-200"><StatusBadge status={prc.verificationStatus} size="xs" /></td>
                    <td className="py-2 px-3 border-r border-slate-200 font-semibold text-[#1B365D]">₹ {(prc.finalCompensationAmount / 10000000).toFixed(2)} Cr</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
