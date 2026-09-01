import React, { useState } from "react";
import { useApp } from "../../context/AppContext.jsx";
import { GovEmblem } from "../common/GovEmblem.jsx";
import { StatusBadge } from "../common/StatusBadge.jsx";
import {
  FileCheck,
  CheckCircle,
  Building,
  Upload,
  UserCheck,
  Download,
  Printer,
  ShieldCheck,
  CheckSquare,
  AlertCircle,
  Save,
  Eye,
  Lock
} from "lucide-react";

export const Page24PossessionMemo = () => {
  const { currentProject, possessionMemos, recordPossessionMemo, parcels, projects } = useApp();

  const [selectedProjectId, setSelectedProjectId] = useState(currentProject?.id || "PRJ-GJ-2026-01");
  const [selectedParcelId, setSelectedParcelId] = useState("142/A");

  const [form, setForm] = useState({
    handoverDate: new Date().toISOString().substring(0, 10),
    possessionOfficer: "Shri Rajesh M. Patel, IAS (District Collector)",
    receivingOfficer: "Shri Alok Verma (Chief Project Manager, DFCCIL)",
    encroachmentStatus: "Clear & Unencumbered",
    policeAssistance: "Not Required (Peaceful Handover)",
    remarks: "Boundary stones embedded. Site cleared of all temporary agricultural crops. No pending claims or litigation."
  });

  const [prerequisites, setPrerequisites] = useState({
    fullCompensation: true,
    rnrDisbursed: true,
    noticeExpired: true,
    noCourtStay: true
  });

  const [feedback, setFeedback] = useState("");
  const [isHandedOver, setIsHandedOver] = useState(false);

  const activeParcel = parcels.find((p) => p.surveyNumber === selectedParcelId) || parcels[0] || {};

  const handleSaveDraft = () => {
    setFeedback("Draft possession memorandum saved in revenue register.");
    setTimeout(() => setFeedback(""), 2500);
  };

  const handlePreviewMemo = () => {
    setFeedback("Official Section 38 Possession certificate preview refreshed.");
    setTimeout(() => setFeedback(""), 2000);
  };

  const handleGenerateAndSign = (e) => {
    e.preventDefault();
    recordPossessionMemo({
      projectId: selectedProjectId,
      surveyNumber: selectedParcelId,
      village: activeParcel.village || "Sunav",
      areaAcres: Number(activeParcel.areaAcres || 4.5),
      actualPossessionDate: form.handoverDate,
      status: "Possession Taken",
      fieldOfficer: form.possessionOfficer,
      receivingOfficer: form.receivingOfficer,
      panchnamaPdf: "POS_MEMO_SECTION38_SIGNED.pdf"
    });
    setIsHandedOver(true);
    setFeedback(`Section 38 Land Possession Memo officially GENERATED & SIGNED. Status: Possession Taken. Physical handover to Requiring Body completed.`);
    setTimeout(() => setFeedback(""), 3500);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Title */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div>
          <div className="text-xs text-slate-500 font-medium">
            District Authority • Physical Land Takeover & Handover (RFCTLARR Section 38 & 40)
          </div>
          <h1 className="text-xl font-bold text-slate-900 leading-tight flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-[#1B365D]" />
            Section 38 Statutory Land Possession Memo
          </h1>
        </div>
      </div>

      {feedback && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs rounded font-semibold flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-700 shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Prerequisites Checklist Banner */}
      <div className="bg-white border border-slate-300 rounded p-4 shadow-2xs space-y-2 text-xs">
        <div className="font-bold text-slate-900 flex items-center justify-between border-b pb-2">
          <span className="flex items-center gap-1.5 text-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            Statutory Prerequisites Checklist (RFCTLARR Section 38 Mandatory Compliance)
          </span>
          <span className="text-[10px] text-emerald-800 font-bold bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">
            ✓ 100% Compliant for Handover
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
          <label className="flex items-center gap-2 p-2 rounded border border-emerald-200 bg-emerald-50 text-emerald-900 cursor-pointer">
            <input
              type="checkbox"
              checked={prerequisites.fullCompensation}
              onChange={(e) => setPrerequisites({ ...prerequisites, fullCompensation: e.target.checked })}
              className="rounded text-emerald-700"
            />
            <span className="font-semibold text-[11px]">Full Compensation Paid (100%)</span>
          </label>

          <label className="flex items-center gap-2 p-2 rounded border border-emerald-200 bg-emerald-50 text-emerald-900 cursor-pointer">
            <input
              type="checkbox"
              checked={prerequisites.rnrDisbursed}
              onChange={(e) => setPrerequisites({ ...prerequisites, rnrDisbursed: e.target.checked })}
              className="rounded text-emerald-700"
            />
            <span className="font-semibold text-[11px]">R&R Entitlements Disbursed</span>
          </label>

          <label className="flex items-center gap-2 p-2 rounded border border-emerald-200 bg-emerald-50 text-emerald-900 cursor-pointer">
            <input
              type="checkbox"
              checked={prerequisites.noticeExpired}
              onChange={(e) => setPrerequisites({ ...prerequisites, noticeExpired: e.target.checked })}
              className="rounded text-emerald-700"
            />
            <span className="font-semibold text-[11px]">60 Days Notice Expired</span>
          </label>

          <label className="flex items-center gap-2 p-2 rounded border border-emerald-200 bg-emerald-50 text-emerald-900 cursor-pointer">
            <input
              type="checkbox"
              checked={prerequisites.noCourtStay}
              onChange={(e) => setPrerequisites({ ...prerequisites, noCourtStay: e.target.checked })}
              className="rounded text-emerald-700"
            />
            <span className="font-semibold text-[11px]">No Pending Court Stay</span>
          </label>
        </div>
      </div>

      {/* Grid: Possession Form (Left 6 Cols) vs Official Possession Memo Preview (Right 6 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Possession Form (Left 6 Cols) */}
        <div className="lg:col-span-6 bg-white border border-slate-300 rounded p-5 shadow-xs space-y-4 text-xs">
          <div className="border-b pb-2 flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900">
              Possession Execution Form
            </h2>
            <span className="text-[11px] font-mono text-slate-500">Section 38 Protocol</span>
          </div>

          <form onSubmit={handleGenerateAndSign} className="space-y-3.5">
            {/* Project Selection */}
            <div>
              <label className="block font-semibold text-slate-800 mb-1">Project</label>
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

            {/* Parcel Selection */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-800 mb-1">Parcel Selection</label>
                <select
                  value={selectedParcelId}
                  onChange={(e) => setSelectedParcelId(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded bg-white font-mono font-bold"
                >
                  <option value="142/A">Survey 142/A (Sunav) - 4.5 Ac</option>
                  <option value="142/B">Survey 142/B (Sunav) - 3.2 Ac</option>
                  <option value="88">Survey 88 (Bandhani) - 5.0 Ac</option>
                  <option value="105/A">Survey 105/A (Agas) - 2.8 Ac</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-800 mb-1">Handover Date</label>
                <input
                  type="date"
                  value={form.handoverDate}
                  onChange={(e) => setForm({ ...form, handoverDate: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded font-mono"
                />
              </div>
            </div>

            {/* Possession Officer & Receiving Officer */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-800 mb-1">Possession Officer (Collectorate)</label>
                <input
                  type="text"
                  value={form.possessionOfficer}
                  onChange={(e) => setForm({ ...form, possessionOfficer: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded font-medium"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-800 mb-1">Receiving Officer (Requiring Body)</label>
                <input
                  type="text"
                  value={form.receivingOfficer}
                  onChange={(e) => setForm({ ...form, receivingOfficer: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded font-medium"
                />
              </div>
            </div>

            {/* Encroachment Status & Police Assistance */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-800 mb-1">Encroachment Clearance Status</label>
                <select
                  value={form.encroachmentStatus}
                  onChange={(e) => setForm({ ...form, encroachmentStatus: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded bg-white"
                >
                  <option value="Clear & Unencumbered">Clear & Unencumbered</option>
                  <option value="Partial Crops Harvested">Partial Crops Harvested</option>
                  <option value="Demolition Completed">Demolition Completed</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-800 mb-1">Police Escort / Assistance Required</label>
                <select
                  value={form.policeAssistance}
                  onChange={(e) => setForm({ ...form, policeAssistance: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded bg-white"
                >
                  <option value="Not Required (Peaceful Handover)">Not Required (Peaceful Handover)</option>
                  <option value="Precautionary Revenue Escort Provided">Precautionary Revenue Escort Provided</option>
                  <option value="Section 38(2) Special Police Deployed">Section 38(2) Special Police Deployed</option>
                </select>
              </div>
            </div>

            {/* Remarks */}
            <div>
              <label className="block font-semibold text-slate-800 mb-1">Statutory Handover Remarks</label>
              <textarea
                rows={2}
                value={form.remarks}
                onChange={(e) => setForm({ ...form, remarks: e.target.value })}
                className="w-full p-2 border border-slate-300 rounded font-sans"
              />
            </div>

            {/* Actions: Save Draft, Preview Memo, Generate & Sign Possession Memo */}
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
                onClick={handlePreviewMemo}
                className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded font-semibold text-slate-800 flex items-center justify-center gap-1"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Preview Memo</span>
              </button>

              <button
                type="submit"
                className="flex-1 py-2 bg-[#1B365D] hover:bg-[#12243f] text-white rounded font-bold flex items-center justify-center gap-1 transition-colors shadow-2xs"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Sign & Handover</span>
              </button>
            </div>
          </form>
        </div>

        {/* Official Possession Memo Document Preview (Right 6 Cols) */}
        <div className="lg:col-span-6 bg-white border border-slate-400 rounded p-6 shadow-md space-y-4 text-xs font-serif leading-relaxed">
          {/* Header */}
          <div className="text-center border-b-2 border-slate-900 pb-3 space-y-1">
            <GovEmblem className="w-10 h-12 mx-auto" color="text-slate-900" />
            <div className="font-bold text-xs uppercase tracking-widest text-slate-900 font-serif">
              REVENUE DEPARTMENT • DISTRICT MAGISTRATE
            </div>
            <div className="text-[10px] uppercase text-slate-600 font-sans">
              DISTRICT ANAND • GOVERNMENT OF GUJARAT
            </div>
            <div className="text-[10px] font-mono text-slate-800 font-sans">
              STATUTORY POSSESSION & HANDOVER MEMORANDUM (SECTION 38 & 40)
            </div>
          </div>

          {/* Body */}
          <div className="space-y-3 text-slate-900 text-justify text-[11px]">
            <div className="font-bold text-center uppercase tracking-wide text-xs">
              MEMO REF NO: POS-MEMO/REV/2026/{selectedParcelId.replace("/", "-")}
            </div>

            <p>
              This Memorandum of Possession witnesses that in pursuance of Award declared under Section 23 of RFCTLARR Act 2013, and upon full satisfaction and disbursal of compensation to recorded landholders, physical possession of the undermentioned land has been formally taken over and delivered to the Requiring Body.
            </p>

            <div className="p-3 bg-slate-50 border border-slate-300 rounded font-sans text-xs space-y-1">
              <div>• <strong>Acquired Parcel:</strong> Survey {selectedParcelId} ({activeParcel.village || "Sunav"})</div>
              <div>• <strong>Total Land Quantum:</strong> {activeParcel.areaAcres || 4.5} Acres</div>
              <div>• <strong>Requiring Body:</strong> Western Dedicated Freight Corridor (DFCCIL)</div>
              <div>• <strong>Delivering Authority:</strong> {form.possessionOfficer}</div>
              <div>• <strong>Receiving Authority:</strong> {form.receivingOfficer}</div>
              <div>• <strong>Encroachment Condition:</strong> {form.encroachmentStatus}</div>
            </div>

            <p>
              The delivered land now vests absolutely in the Requiring Body free from all encumbrances, charges, tenancies, or easements whatsoever.
            </p>
          </div>

          {/* Dual Signature Block */}
          <div className="pt-4 border-t border-slate-300 grid grid-cols-2 gap-4 font-sans text-xs">
            <div>
              <div className="font-bold text-slate-900">Handed Over By:</div>
              <div className="text-[10px] text-slate-700">{form.possessionOfficer}</div>
              <div className="text-[10px] text-slate-500">District Collectorate</div>
              <div className="text-[10px] text-emerald-700 font-mono mt-1">DSC: SIGNED & SEALED</div>
            </div>

            <div className="text-right">
              <div className="font-bold text-slate-900">Taken Over By:</div>
              <div className="text-[10px] text-slate-700">{form.receivingOfficer}</div>
              <div className="text-[10px] text-slate-500">Authorized Requiring Body Rep</div>
              <div className="text-[10px] text-emerald-700 font-mono mt-1">Status: Possession Taken</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
