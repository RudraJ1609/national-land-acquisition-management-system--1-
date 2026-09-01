import React, { useState } from "react";
import { useApp } from "../../context/AppContext.jsx";
import { StatusBadge } from "../common/StatusBadge.jsx";
import { GovEmblem } from "../common/GovEmblem.jsx";
import {
  Award,
  FileCheck,
  Download,
  Eye,
  CheckCircle,
  X,
  Printer,
  Coins,
  ArrowRight,
  Save,
  ShieldCheck,
  Check
} from "lucide-react";

export const Page22AwardGeneration = () => {
  const { parcels, projects, generateAwardOrder, navigateTo, currentProject, currentUser } = useApp();

  const [selectedProjectId, setSelectedProjectId] = useState(currentProject?.id || "PRJ-GJ-2026-01");
  const [selectedParcelId, setSelectedParcelId] = useState(parcels[0]?.id || "PAR-01");
  const activeParcel = parcels.find((p) => p.id === selectedParcelId) || parcels[0] || {};

  const [awardDate, setAwardDate] = useState(new Date().toISOString().substring(0, 10));
  const [awardNumber, setAwardNumber] = useState(`AWD-REV-2026-${activeParcel.surveyNumber?.replace("/", "-") || "142-A"}`);
  const [rnrEntitlement, setRnrEntitlement] = useState(500000); // R&R lump-sum grant
  const [feedback, setFeedback] = useState("");
  const [showSignatureNotice, setShowSignatureNotice] = useState(false);

  // Compensation amounts
  const baseLandAmount = Math.round(Number(activeParcel.areaAcres || 2) * Number(activeParcel.circleRatePerAcre || activeParcel.marketRatePerAcre || 1000000) * 1.5);
  const solatiumAmount = baseLandAmount;
  const interestAmount = Math.round(baseLandAmount * 0.06);
  const totalCompensation = baseLandAmount + solatiumAmount + interestAmount;
  const grandTotalPayable = totalCompensation + Number(rnrEntitlement);

  const handleSaveDraft = () => {
    setFeedback(`Draft award order saved for Award ID: ${awardNumber}`);
    setTimeout(() => setFeedback(""), 2500);
  };

  const handlePreview = () => {
    setFeedback("Statutory Form 11 certificate preview refreshed.");
    setTimeout(() => setFeedback(""), 2000);
  };

  const handleFinalApproval = () => {
    generateAwardOrder(activeParcel.id);
    setShowSignatureNotice(true);
    setFeedback(`Award #${awardNumber} officially DECLARED & SIGNED by District Collector under Section 23/31. Disbursal status updated to 'Pending Payment'.`);
    setTimeout(() => {
      setFeedback("");
    }, 4000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Title */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div>
          <div className="text-xs text-slate-500 font-medium">
            District Authority • Statutory Award Declaration (RFCTLARR Section 23 & 31)
          </div>
          <h1 className="text-xl font-bold text-slate-900 leading-tight flex items-center gap-2">
            <Award className="w-5 h-5 text-[#1B365D]" />
            Land Acquisition Award Generation & Statutory Orders
          </h1>
        </div>
        <button
          onClick={() => navigateTo("payment")}
          className="bg-[#1B365D] hover:bg-[#12243f] text-white px-3.5 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
        >
          <span>Open PFMS Payment Disbursal →</span>
        </button>
      </div>

      {feedback && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs rounded font-semibold flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-700 shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Grid: Award Drafter Form (Left 6 Cols) & Legal Award Document Preview (Right 6 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Award Form (Left 6 Cols) */}
        <div className="lg:col-span-6 bg-white border border-slate-300 rounded p-5 shadow-xs space-y-4 text-xs">
          <div className="border-b pb-2 flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900">
              Section 23 & 31 Statutory Award Form
            </h2>
            <span className="text-[11px] font-mono text-slate-500">Form No. 11</span>
          </div>

          <div className="space-y-3.5">
            {/* Project Selection */}
            <div>
              <label className="block font-semibold text-slate-800 mb-1">Project Selection</label>
              <select
                value={selectedProjectId}
                onChange={(e) => setSelectedProjectId(e.target.value)}
                className="w-full p-2 border border-slate-300 rounded bg-white font-medium"
              >
                {projects.map((prj) => (
                  <option key={prj.id} value={prj.id}>
                    {prj.name} ({prj.district}, {prj.state})
                  </option>
                ))}
              </select>
            </div>

            {/* Beneficiary / Owner Selection */}
            <div>
              <label className="block font-semibold text-slate-800 mb-1">Beneficiary / Khatedar Selection</label>
              <select
                value={selectedParcelId}
                onChange={(e) => {
                  const pId = e.target.value;
                  setSelectedParcelId(pId);
                  const matched = parcels.find((p) => p.id === pId);
                  if (matched) {
                    setAwardNumber(`AWD-REV-2026-${matched.surveyNumber?.replace("/", "-") || "142-A"}`);
                  }
                }}
                className="w-full p-2 border border-slate-300 rounded bg-white font-bold"
              >
                {parcels.map((prc) => (
                  <option key={prc.id} value={prc.id}>
                    {prc.ownerName} — Survey {prc.surveyNumber} ({prc.village}) • {prc.areaAcres} Acres
                  </option>
                ))}
              </select>
            </div>

            {/* Land Area & Auto-generated Award Number */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-800 mb-1">Acquired Land Area</label>
                <input
                  type="text"
                  disabled
                  value={`${activeParcel.areaAcres || 2} Acres (${activeParcel.village})`}
                  className="w-full p-2 border border-slate-200 bg-slate-100 rounded font-bold text-slate-700"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-800 mb-1">Award Number (Auto-generated)</label>
                <input
                  type="text"
                  value={awardNumber}
                  onChange={(e) => setAwardNumber(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded font-mono font-bold text-slate-900"
                />
              </div>
            </div>

            {/* Award Date & R&R Entitlement */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-800 mb-1">Award Date</label>
                <input
                  type="date"
                  value={awardDate}
                  onChange={(e) => setAwardDate(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-800 mb-1">R&R Entitlement Amount (₹)</label>
                <input
                  type="number"
                  value={rnrEntitlement}
                  onChange={(e) => setRnrEntitlement(Number(e.target.value))}
                  className="w-full p-2 border border-slate-300 rounded font-bold text-slate-900"
                />
              </div>
            </div>

            {/* Compensation Breakdown Box */}
            <div className="bg-slate-50 border border-slate-300 rounded p-3 space-y-1.5">
              <div className="font-bold text-slate-800 uppercase tracking-wider text-[10px] border-b pb-1">
                Statutory Compensation Breakdown
              </div>
              <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                <div>• Base Land Value: <strong>₹ {baseLandAmount.toLocaleString()}</strong></div>
                <div>• Solatium (100%): <strong>₹ {solatiumAmount.toLocaleString()}</strong></div>
                <div>• Interest (Sec 30(3)): <strong>₹ {interestAmount.toLocaleString()}</strong></div>
                <div>• R&R Grant: <strong>₹ {Number(rnrEntitlement).toLocaleString()}</strong></div>
              </div>
              <div className="border-t pt-1.5 flex justify-between font-bold text-xs text-[#1B365D]">
                <span>Total Statutory Award Amount:</span>
                <span className="font-mono text-sm">₹ {grandTotalPayable.toLocaleString()}</span>
              </div>
            </div>

            {/* Action Buttons: Save Draft, Preview Award, Final Approval & Digital Signature */}
            <div className="flex gap-2 pt-2 border-t">
              <button
                type="button"
                onClick={handleSaveDraft}
                className="flex-1 py-2 border border-slate-300 hover:bg-slate-50 rounded font-semibold text-slate-700 flex items-center justify-center gap-1"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Draft</span>
              </button>

              <button
                type="button"
                onClick={handlePreview}
                className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded font-semibold text-slate-800 flex items-center justify-center gap-1"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Preview Award</span>
              </button>

              <button
                type="button"
                onClick={handleFinalApproval}
                className="flex-1 py-2 bg-[#1B365D] hover:bg-[#12243f] text-white rounded font-bold flex items-center justify-center gap-1 transition-colors shadow-2xs"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Final Approval & Sign</span>
              </button>
            </div>
          </div>
        </div>

        {/* Legal Award Document Preview (Right 6 Cols) */}
        <div className="lg:col-span-6 bg-white border border-slate-400 rounded p-6 shadow-md space-y-4 text-xs font-serif leading-relaxed">
          {/* Header */}
          <div className="text-center border-b-2 border-slate-900 pb-3 space-y-1">
            <GovEmblem className="w-10 h-12 mx-auto" color="text-slate-900" />
            <div className="font-bold text-xs uppercase tracking-widest text-slate-900 font-serif">
              OFFICE OF THE DISTRICT COLLECTOR & COMPETENT AUTHORITY
            </div>
            <div className="text-[10px] uppercase text-slate-600 font-sans">
              DISTRICT {activeParcel.district || "AHMEDABAD"} • STATE OF GUJARAT
            </div>
            <div className="text-[10px] font-mono text-slate-800 font-sans">
              FORM NO. 11 — STATUTORY AWARD UNDER SECTION 23 & 31 OF RFCTLARR ACT, 2013
            </div>
          </div>

          {/* Award Content */}
          <div className="space-y-3 text-slate-900 text-justify text-[11px]">
            <div className="font-bold text-center uppercase tracking-wide text-xs">
              FINAL LAND ACQUISITION AWARD ORDER NO: {awardNumber}
            </div>

            <p>
              Whereas the Preliminary Notification under Section 11(1) and Declaration under Section 19(1) were duly proclaimed for public purpose, namely for <strong>{currentProject.name}</strong>.
            </p>

            <div className="p-3 bg-slate-50 border border-slate-300 rounded font-sans text-xs space-y-1">
              <div>• <strong>Survey Number:</strong> {activeParcel.surveyNumber} (Village {activeParcel.village})</div>
              <div>• <strong>Recorded Landowner / Khatedar:</strong> {activeParcel.ownerName}</div>
              <div>• <strong>Acquired Land Quantum:</strong> {activeParcel.areaAcres} Acres</div>
              <div>• <strong>Base Land Valuation:</strong> ₹ {baseLandAmount.toLocaleString()}</div>
              <div>• <strong>100% Solatium (Sec 30(1)):</strong> ₹ {solatiumAmount.toLocaleString()}</div>
              <div>• <strong>Additional Interest (Sec 30(3)):</strong> ₹ {interestAmount.toLocaleString()}</div>
              <div>• <strong>R&R Scheme Entitlement:</strong> ₹ {Number(rnrEntitlement).toLocaleString()}</div>
              <div className="text-[#1B365D] font-bold border-t pt-1 flex justify-between">
                <span>Total Statutory Award Amount Payable:</span>
                <span className="font-mono">₹ {grandTotalPayable.toLocaleString()}</span>
              </div>
            </div>

            <p>
              The Collector hereby determines that the compensation assessed as above is true and fair. Upon deposit in the treasury/PFMS account, the land shall vest absolutely in the Government free from all encumbrances.
            </p>
          </div>

          {/* Signature Block */}
          <div className="pt-4 border-t border-slate-300 flex items-center justify-between font-sans text-xs">
            <div>
              <div className="font-bold text-slate-900">District Collector & Magistrate</div>
              <div className="text-[10px] text-slate-600">Competent Land Acquisition Authority</div>
              <div className="text-[10px] text-emerald-700 font-mono">DSC: NIC-CA-GUJ-2026-CERT-OK</div>
            </div>

            <div className="text-right">
              <div className="bg-emerald-100 text-emerald-900 border border-emerald-300 px-2.5 py-1 rounded text-[10px] font-bold">
                Status: Award Declared
              </div>
              <div className="text-[10px] text-amber-700 font-semibold mt-1">
                Disbursal: Pending Payment
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
