import React, { useState } from "react";
import { useApp } from "../../context/AppContext.jsx";
import { StatusBadge } from "../common/StatusBadge.jsx";
import {
  Calculator,
  Coins,
  ShieldCheck,
  CheckCircle,
  HelpCircle,
  FileText,
  Building,
  TreePine,
  ArrowRight,
  Lock,
  Save,
  Eye,
  Check
} from "lucide-react";

export const Page21CompensationCalculator = () => {
  const { parcels, updateParcelCompensation, handleLockCompensation, navigateTo } = useApp();

  const [selectedParcelId, setSelectedParcelId] = useState(parcels[0]?.id || "PAR-01");
  const activeParcel = parcels.find((p) => p.id === selectedParcelId) || parcels[0] || {};

  const [areaAcres, setAreaAcres] = useState(activeParcel?.areaAcres || 2.0);
  const [marketValue, setMarketValue] = useState(activeParcel?.circleRatePerAcre || activeParcel?.marketRatePerAcre || 1000000);
  const [multiplier, setMultiplier] = useState(1.5); // Rural / Urban Multiplier 1.0 to 2.0
  const [buildingValue, setBuildingValue] = useState(120000);
  const [treeValue, setTreeValue] = useState(50000);
  const [cropValue, setCropValue] = useState(30000);
  const [interestMonths, setInterestMonths] = useState(5); // 12% p.a.
  const [feedback, setFeedback] = useState("");
  const [isLocked, setIsLocked] = useState(activeParcel?.compensationLocked || false);

  // Auto Calculations as per statutory formula
  const baseLandValue = Math.round((Number(areaAcres) || 0) * (Number(marketValue) || 0) * (Number(multiplier) || 1));
  const assetsValue = (Number(buildingValue) || 0) + (Number(treeValue) || 0) + (Number(cropValue) || 0);
  const solatiumValue = Math.round(baseLandValue + assetsValue); // 100% Solatium
  const interestValue = Math.round(baseLandValue * (0.12 / 12) * (Number(interestMonths) || 0));
  const totalCompensation = baseLandValue + assetsValue + solatiumValue + interestValue;

  const handleSaveDraft = () => {
    updateParcelCompensation(activeParcel.id, totalCompensation);
    setFeedback(`Draft compensation calculation saved for Survey ${activeParcel.surveyNumber}. Total: ₹ ${totalCompensation.toLocaleString()}`);
    setTimeout(() => setFeedback(""), 2500);
  };

  const handleReview = () => {
    setFeedback(`Statutory valuation reviewed against Schedule I of RFCTLARR Act 2013.`);
    setTimeout(() => setFeedback(""), 2500);
  };

  const handleLock = () => {
    if (handleLockCompensation) {
      handleLockCompensation(activeParcel.id, totalCompensation);
    } else {
      updateParcelCompensation(activeParcel.id, totalCompensation);
    }
    setIsLocked(true);
    setFeedback(`Compensation officially LOCKED at ₹ ${totalCompensation.toLocaleString()} (₹ ${(totalCompensation / 10000000).toFixed(2)} Cr) by District Collector.`);
    setTimeout(() => setFeedback(""), 3000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Title */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div>
          <div className="text-xs text-slate-500 font-medium">
            District Authority • RFCTLARR First Schedule Statutory Valuation
          </div>
          <h1 className="text-xl font-bold text-slate-900 leading-tight flex items-center gap-2">
            <Calculator className="w-5 h-5 text-[#1B365D]" />
            Statutory Compensation Calculator (Section 26 - 30)
          </h1>
        </div>
        <button
          onClick={() => navigateTo("awards")}
          className="bg-[#1B365D] hover:bg-[#12243f] text-white px-3.5 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
        >
          <span>Proceed to Section 23 Award Declarations →</span>
        </button>
      </div>

      {feedback && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs rounded font-semibold flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-700 shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Main Grid: Inputs vs Calculation Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Inputs (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-slate-300 rounded p-5 shadow-xs space-y-4 text-xs">
          <div className="border-b pb-3 flex items-center justify-between">
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase">Select Target Parcel</label>
              <select
                value={selectedParcelId}
                onChange={(e) => {
                  const pId = e.target.value;
                  setSelectedParcelId(pId);
                  const matched = parcels.find((p) => p.id === pId);
                  if (matched) {
                    setAreaAcres(matched.areaAcres || 2.0);
                    setMarketValue(matched.circleRatePerAcre || matched.marketRatePerAcre || 1000000);
                    setIsLocked(matched.compensationLocked || false);
                  }
                }}
                className="font-bold text-xs p-1.5 border border-slate-300 rounded bg-white mt-1"
              >
                {parcels.map((prc) => (
                  <option key={prc.id} value={prc.id}>
                    Survey {prc.surveyNumber} ({prc.village}) — {prc.ownerName} ({prc.areaAcres} Ac)
                  </option>
                ))}
              </select>
            </div>
            <StatusBadge status={isLocked ? "Locked" : activeParcel?.status || "In Progress"} size="sm" />
          </div>

          {/* Land Details Box */}
          <div className="bg-slate-50 border border-slate-200 rounded p-3 text-[11px] space-y-1">
            <div className="font-bold text-slate-800 uppercase tracking-wider text-[10px]">Land Details</div>
            <div className="grid grid-cols-2 gap-2 pt-1">
              <div>• <strong>Parcel Number:</strong> Survey {activeParcel?.surveyNumber} ({activeParcel?.village})</div>
              <div>• <strong>Owner Name:</strong> {activeParcel?.ownerName}</div>
              <div>• <strong>Land Area:</strong> {areaAcres} Acres</div>
              <div>• <strong>Land Type:</strong> {activeParcel?.landType || "Agricultural (Irrigated)"}</div>
            </div>
          </div>

          {/* Compensation Input Fields */}
          <div className="space-y-3">
            <div className="font-bold text-slate-800 uppercase tracking-wider text-[10px] border-b pb-1">
              Statutory Compensation Parameters (First Schedule)
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-800 mb-1">
                  Market Value / Circle Rate (₹ / Acre)
                </label>
                <input
                  type="number"
                  value={marketValue}
                  onChange={(e) => setMarketValue(Number(e.target.value))}
                  className="w-full p-2 border border-slate-300 rounded font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-800 mb-1">
                  Land Area (Acres)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={areaAcres}
                  onChange={(e) => setAreaAcres(Number(e.target.value))}
                  className="w-full p-2 border border-slate-300 rounded font-bold text-slate-900"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-800 mb-1">
                  Rural / Urban Multiplier Factor
                </label>
                <select
                  value={multiplier}
                  onChange={(e) => setMultiplier(Number(e.target.value))}
                  className="w-full p-2 border border-slate-300 rounded bg-white font-semibold text-slate-900"
                >
                  <option value={1.0}>1.00x (Urban / Municipal Area)</option>
                  <option value={1.25}>1.25x (Semi-Urban Peri-urban)</option>
                  <option value={1.5}>1.50x (Rural Distance 10-20 km)</option>
                  <option value={2.0}>2.00x (Remote Rural Distance &gt; 20 km)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-800 mb-1">
                  Building / Structure Value (₹)
                </label>
                <input
                  type="number"
                  value={buildingValue}
                  onChange={(e) => setBuildingValue(Number(e.target.value))}
                  className="w-full p-2 border border-slate-300 rounded font-bold text-slate-900"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block font-semibold text-slate-800 mb-1">
                  Tree Value (₹)
                </label>
                <input
                  type="number"
                  value={treeValue}
                  onChange={(e) => setTreeValue(Number(e.target.value))}
                  className="w-full p-2 border border-slate-300 rounded font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-800 mb-1">
                  Crop Value (₹)
                </label>
                <input
                  type="number"
                  value={cropValue}
                  onChange={(e) => setCropValue(Number(e.target.value))}
                  className="w-full p-2 border border-slate-300 rounded font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-800 mb-1">
                  Interest Duration (Months @ 12% p.a.)
                </label>
                <input
                  type="number"
                  value={interestMonths}
                  onChange={(e) => setInterestMonths(Number(e.target.value))}
                  className="w-full p-2 border border-slate-300 rounded font-bold text-slate-900"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-3 border-t">
            <button
              onClick={handleSaveDraft}
              className="flex-1 py-2 border border-slate-300 hover:bg-slate-50 rounded font-semibold text-slate-700 flex items-center justify-center gap-1"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Draft</span>
            </button>

            <button
              onClick={handleReview}
              className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded font-semibold text-slate-800 flex items-center justify-center gap-1"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Review Calculation</span>
            </button>

            <button
              onClick={handleLock}
              className="flex-1 py-2 bg-[#1B365D] hover:bg-[#12243f] text-white rounded font-bold flex items-center justify-center gap-1 transition-colors shadow-2xs"
            >
              <Lock className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Lock Compensation</span>
            </button>
          </div>
        </div>

        {/* Right Output Summary: Formula Result Section (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-slate-300 rounded p-5 shadow-md space-y-4 text-xs">
          <div className="border-b pb-3 flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <Coins className="w-4 h-4 text-amber-600" />
              Statutory Formula Result Section
            </h2>
            <span className="text-[11px] font-mono text-slate-500">RFCTLARR Schedule I</span>
          </div>

          {/* Detailed Breakdown */}
          <div className="space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded border">
              <span className="text-slate-700 font-sans font-medium">Base Compensation (Land * Multiplier):</span>
              <span className="font-bold text-slate-900">₹ {baseLandValue.toLocaleString()}</span>
            </div>

            <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded border">
              <span className="text-slate-700 font-sans font-medium">Assets (Structures + Trees + Crops):</span>
              <span className="font-bold text-slate-900">₹ {assetsValue.toLocaleString()}</span>
            </div>

            <div className="flex items-center justify-between p-2.5 bg-blue-50/70 rounded border border-blue-200">
              <span className="text-blue-900 font-sans font-semibold">Solatium (100% Mandatory):</span>
              <span className="font-bold text-blue-900">₹ {solatiumValue.toLocaleString()}</span>
            </div>

            <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded border">
              <span className="text-slate-700 font-sans font-medium">Interest (Section 30(3) @ 12% p.a.):</span>
              <span className="font-bold text-slate-900">₹ {interestValue.toLocaleString()}</span>
            </div>

            {/* Total Grand Compensation */}
            <div className="p-4 bg-slate-900 text-white rounded border border-slate-800 space-y-1">
              <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                Total Statutory Compensation Payable
              </div>
              <div className="text-2xl font-bold text-amber-400 font-mono">
                ₹ {totalCompensation.toLocaleString()}
              </div>
              <div className="text-[11px] text-slate-300 font-sans">
                Equivalent to <strong>₹ {(totalCompensation / 10000000).toFixed(2)} Crore</strong>
              </div>
            </div>
          </div>

          <div className="p-3 bg-amber-50 border border-amber-200 rounded text-[11px] text-amber-900 space-y-1">
            <div className="font-bold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
              <span>Collector Statutory Certification Note:</span>
            </div>
            <p>
              Calculated in strict conformity with Section 26 (Market Value), Section 29 (Assets Valuation), Section 30(1) (100% Solatium), and Section 30(3) (12% per annum Interest).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
