import React, { useState } from "react";
import {
  X,
  FileText,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Download,
  ExternalLink,
  Send,
  Lock,
  ChevronRight,
  Eye,
  Key,
  RotateCcw
} from "lucide-react";
import { useApp } from "../../context/AppContext.jsx";

export const ContextualActionDrawer = ({
  isOpen,
  onClose,
  data = null,
  type = "project" // 'project' | 'parcel' | 'case' | 'alert' | 'submission' | 'family' | 'filing' | 'document'
}) => {
  const { addAuditLog, currentUser } = useApp();
  const [activeTab, setActiveTab] = useState("overview"); // 'overview' | 'ai' | 'docs' | 'action' | 'timeline'
  const [dscPin, setDscPin] = useState("");
  const [isDscSigned, setIsDscSigned] = useState(false);
  const [actionRemarks, setActionRemarks] = useState("");
  const [actionSubmitted, setActionSubmitted] = useState(false);

  if (!isOpen || !data) return null;

  const handleApplyDsc = (e) => {
    e.preventDefault();
    if (!dscPin) return;
    setIsDscSigned(true);
    addAuditLog(
      "Digital Signature",
      "DSC Applied",
      `DSC Digital Signature applied to ${data.name || data.id} by ${currentUser?.name}`
    );
  };

  const handleSubmitAction = (status) => {
    setActionSubmitted(true);
    addAuditLog(
      "Workflow Action",
      status,
      `${status} recorded for ${data.name || data.id} by ${currentUser?.name}. Remarks: ${actionRemarks || "None"}`
    );
    setTimeout(() => {
      setActionSubmitted(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[1200] overflow-hidden bg-slate-900/40 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-xl bg-white h-full shadow-2xl flex flex-col border-l border-gov-border animate-in slide-in-from-right duration-200">
        {/* Drawer Header */}
        <div className="bg-gov-navy text-white px-5 py-4 flex items-center justify-between border-b border-gov-navy-dark">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-gov-accent/20 text-gov-accent px-2 py-0.5 rounded border border-gov-accent/30">
                {type.toUpperCase()} CONTEXT
              </span>
              <span className="text-xs text-slate-300 font-mono">
                {data.id || data.caseNo || data.surveyNumber || "RECORD"}
              </span>
            </div>
            <h3 className="text-base font-bold text-white mt-1 line-clamp-1">
              {data.name || data.projectName || data.title || `Plot #${data.surveyNumber}` || "Details"}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Tab Navigation */}
        <div className="flex border-b border-gov-border bg-slate-50 px-4 text-xs font-semibold text-slate-600">
          <button
            onClick={() => setActiveTab("overview")}
            className={`py-2.5 px-3 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === "overview"
                ? "border-gov-navy text-gov-navy font-bold bg-white"
                : "border-transparent hover:text-slate-900"
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            Overview
          </button>
          <button
            onClick={() => setActiveTab("ai")}
            className={`py-2.5 px-3 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === "ai"
                ? "border-purple-600 text-purple-700 font-bold bg-white"
                : "border-transparent hover:text-purple-600"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            AI Intelligence
          </button>
          <button
            onClick={() => setActiveTab("docs")}
            className={`py-2.5 px-3 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === "docs"
                ? "border-gov-navy text-gov-navy font-bold bg-white"
                : "border-transparent hover:text-slate-900"
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            Documents
          </button>
          <button
            onClick={() => setActiveTab("action")}
            className={`py-2.5 px-3 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === "action"
                ? "border-gov-accent text-gov-navy font-bold bg-white"
                : "border-transparent hover:text-slate-900"
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-gov-accent" />
            Action & DSC
          </button>
        </div>

        {/* Drawer Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-4 text-xs">
              <div className="bg-slate-50 border border-slate-200 rounded-md p-3.5 space-y-2">
                <div className="font-bold text-gov-navy text-sm border-b border-slate-200 pb-1.5">
                  General Particulars
                </div>
                <div className="grid grid-cols-2 gap-3 text-slate-700">
                  <div>
                    <span className="text-slate-500 block text-[11px]">State & District:</span>
                    <span className="font-semibold text-slate-900">
                      {data.state || "Gujarat"} ({data.district || "Anand"})
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">Current Stage:</span>
                    <span className="font-semibold text-gov-navy">
                      {data.currentStage || data.stage || "Statutory In-Progress"}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">Requiring Body / Owner:</span>
                    <span className="font-semibold text-slate-900">
                      {data.requiringBody || data.ownerName || "DFCCIL (MoR)"}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">Land Area:</span>
                    <span className="font-semibold text-slate-900">
                      {data.landRequired || data.areaAcres || data.total_area || "420.5"} Ha
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">Statutory Deadline:</span>
                    <span className="font-semibold text-amber-700">
                      {data.deadline || "2026-09-30"} (42 Days Remaining)
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">SLA Risk Status:</span>
                    <span className="font-bold inline-flex items-center gap-1 text-emerald-700">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" /> On Track (Compliant)
                    </span>
                  </div>
                </div>
              </div>

              {/* Financial & Compensation Snapshot */}
              <div className="border border-slate-200 rounded-md p-3.5 bg-white space-y-2">
                <div className="font-bold text-gov-navy text-xs uppercase tracking-wider border-b border-slate-100 pb-1 flex justify-between">
                  <span>Financial & Escrow Position</span>
                  <span className="text-gov-accent">Section 31</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center pt-1">
                  <div className="bg-slate-50 p-2 rounded border border-slate-100">
                    <div className="text-[10px] text-slate-500">Estimated Cost</div>
                    <div className="font-bold text-gov-navy text-xs mt-0.5">₹ 142.50 Cr</div>
                  </div>
                  <div className="bg-slate-50 p-2 rounded border border-slate-100">
                    <div className="text-[10px] text-slate-500">Escrow Deposited</div>
                    <div className="font-bold text-emerald-700 text-xs mt-0.5">₹ 120.00 Cr</div>
                  </div>
                  <div className="bg-slate-50 p-2 rounded border border-slate-100">
                    <div className="text-[10px] text-slate-500">DBT Disbursed</div>
                    <div className="font-bold text-blue-700 text-xs mt-0.5">₹ 84.20 Cr</div>
                  </div>
                </div>
              </div>

              {/* R&R Entitlement Summary */}
              <div className="border border-slate-200 rounded-md p-3.5 bg-white space-y-2">
                <div className="font-bold text-gov-navy text-xs uppercase tracking-wider border-b border-slate-100 pb-1 flex justify-between">
                  <span>R&R 2nd & 3rd Schedule Status</span>
                  <span className="text-emerald-700">88% Disbursed</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-600 py-1 border-b border-slate-50">
                  <span>Affected Families Identified:</span>
                  <span className="font-bold text-slate-900">142 Families</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-600 py-1 border-b border-slate-50">
                  <span>Subsistence Allowance (₹36,000):</span>
                  <span className="font-bold text-emerald-700">128 Credited via PFMS</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-600 py-1">
                  <span>Resettlement Colony Infrastructure:</span>
                  <span className="font-bold text-blue-700">22 of 25 Amenities Ready</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: AI INTELLIGENCE */}
          {activeTab === "ai" && (
            <div className="space-y-3.5 text-xs">
              <div className="bg-purple-50 border border-purple-200 rounded-md p-3">
                <div className="font-bold text-purple-900 flex items-center gap-1.5 text-xs">
                  <Sparkles className="w-4 h-4 text-purple-700" />
                  AI Document Scrutiny & Stay Risk Engine (AI-1)
                </div>
                <p className="text-purple-800 text-[11px] mt-1 leading-relaxed">
                  PaddleOCR Legal NER scrutinized 7/12 RoR, registered sale deeds and civil court records.
                </p>
                <div className="mt-2.5 bg-white p-2.5 rounded border border-purple-100 space-y-1.5">
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="font-semibold text-slate-700">Injunction / Stay Risk:</span>
                    <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded text-[10px]">
                      LOW RISK (0.04)
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="font-semibold text-slate-700">Title Co-Sharer Clashes:</span>
                    <span className="text-slate-600">None detected in mutation index</span>
                  </div>
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="font-semibold text-slate-700">RoR vs Survey Measurement:</span>
                    <span className="text-slate-600">✓ 100% Geometry Matched (2.40 Ha)</span>
                  </div>
                </div>
              </div>

              {/* Satellite CV Anomaly Detection (AI-2) */}
              <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
                <div className="font-bold text-blue-900 flex items-center gap-1.5 text-xs">
                  <AlertTriangle className="w-4 h-4 text-blue-700" />
                  Bi-Temporal Satellite Anomaly Detection (AI-2)
                </div>
                <p className="text-blue-800 text-[11px] mt-1 leading-relaxed">
                  Comparing post-Section 11(1) satellite imagery baseline against latest High-Res Ortho-mosaic:
                </p>
                <div className="mt-2.5 bg-white p-2.5 rounded border border-blue-100 space-y-1 text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Post-Notification Structures:</span>
                    <span className="font-bold text-emerald-700">0 illegal structures detected</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Land Cover Drift:</span>
                    <span className="text-slate-800">Agricultural Multi-crop (Consistent)</span>
                  </div>
                </div>
              </div>

              {/* Predictive SLA Breach Model (AI-3) */}
              <div className="bg-amber-50 border border-amber-200 rounded-md p-3">
                <div className="font-bold text-amber-900 flex items-center gap-1.5 text-xs">
                  <Clock className="w-4 h-4 text-amber-700" />
                  Predictive Statutory SLA Model (AI-3)
                </div>
                <div className="mt-1.5 flex items-center justify-between text-[11px]">
                  <span className="text-amber-800">Predicted Section 19 Completion:</span>
                  <span className="font-bold text-slate-900">Within 34 Days (Legal Max: 72 Days)</span>
                </div>
                <div className="w-full bg-amber-200 h-2 rounded-full mt-2 overflow-hidden">
                  <div className="bg-amber-600 h-full rounded-full" style={{ width: "45%" }} />
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: DOCUMENTS */}
          {activeTab === "docs" && (
            <div className="space-y-2 text-xs">
              <div className="font-bold text-gov-navy text-xs mb-2">Verified Statutory Dossier</div>
              {[
                { title: "Form 4 - Section 11(1) Preliminary Gazette Notification.pdf", size: "2.4 MB", date: "12 Aug 2026", status: "Gazette Published" },
                { title: "SIMP - Social Impact Management Plan & Public Hearing Log.pdf", size: "8.1 MB", date: "28 Jul 2026", status: "IEG Endorsed" },
                { title: "Section 10 Multi-Crop Irrigated Land Compliance Certificate.pdf", size: "1.1 MB", date: "04 Aug 2026", status: "Revenue Verified" },
                { title: "Valuation Schedule - Base Rate + 100% Solatium + 12% AMV.xlsx", size: "640 KB", date: "18 Aug 2026", status: "Award Sealed" }
              ].map((doc, i) => (
                <div key={i} className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-200 rounded-md hover:bg-slate-100 transition-colors">
                  <div className="flex items-center gap-2 truncate pr-2">
                    <FileText className="w-4 h-4 text-gov-navy shrink-0" />
                    <div>
                      <div className="font-semibold text-slate-800 truncate text-[11px]">{doc.title}</div>
                      <div className="text-[10px] text-slate-500">{doc.date} • {doc.size} • <span className="text-emerald-700 font-medium">{doc.status}</span></div>
                    </div>
                  </div>
                  <button className="bg-white border border-slate-200 hover:bg-gov-navy hover:text-white text-slate-700 p-1.5 rounded transition-colors" title="Download Document">
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* TAB 4: ACTION & DSC SIGNING */}
          {activeTab === "action" && (
            <div className="space-y-4 text-xs">
              <div className="bg-slate-50 border border-slate-200 rounded-md p-3.5 space-y-3">
                <div className="font-bold text-gov-navy text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-gov-accent" />
                  Officer Statutory Endorsement & DSC
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 text-[11px] mb-1">
                    Official Remarks / Statutory Directives
                  </label>
                  <textarea
                    rows={3}
                    value={actionRemarks}
                    onChange={(e) => setActionRemarks(e.target.value)}
                    placeholder="Enter official observations, statutory conditions, or verification notes..."
                    className="w-full text-xs p-2 border border-slate-300 rounded focus:ring-2 focus:ring-gov-navy focus:outline-none bg-white"
                  />
                </div>

                {/* Digital Signature Pad */}
                <div className="border border-amber-200 bg-amber-50/60 p-3 rounded space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-800 text-[11px] flex items-center gap-1">
                      <Lock className="w-3.5 h-3.5 text-gov-accent" />
                      Class 3 Digital Signature Certificate (DSC)
                    </span>
                    {isDscSigned && (
                      <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded text-[10px] flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-700" /> Signed & Verified
                      </span>
                    )}
                  </div>

                  {!isDscSigned ? (
                    <form onSubmit={handleApplyDsc} className="flex gap-2 items-center">
                      <input
                        type="password"
                        placeholder="Enter USB Token / DSC PIN"
                        value={dscPin}
                        onChange={(e) => setDscPin(e.target.value)}
                        className="flex-1 bg-white border border-slate-300 rounded px-2.5 py-1.5 text-xs focus:ring-2 focus:ring-gov-navy focus:outline-none"
                      />
                      <button
                        type="submit"
                        disabled={!dscPin}
                        className="bg-gov-navy text-white px-3 py-1.5 rounded font-semibold text-xs hover:bg-gov-navy-dark disabled:opacity-50 transition-colors flex items-center gap-1"
                      >
                        <Key className="w-3 h-3 text-gov-accent" /> Apply DSC
                      </button>
                    </form>
                  ) : (
                    <div className="text-[11px] text-slate-600 bg-white p-2 rounded border border-emerald-200">
                      <div><b>Signer:</b> {currentUser?.name || "Dr. Rajesh Kumar Verma, IAS"}</div>
                      <div><b>Certificate SHA-256:</b> e8f4c2...91b0 (NIC GovCA)</div>
                      <div className="text-slate-400 text-[10px]">Timestamp: {new Date().toISOString()}</div>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="pt-2 border-t border-slate-200 flex items-center justify-between gap-2">
                  <button
                    onClick={() => handleSubmitAction("Returned for Clarification")}
                    className="flex-1 bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 py-2 rounded text-xs font-semibold transition-colors"
                  >
                    Return with Query
                  </button>
                  <button
                    onClick={() => handleSubmitAction("Sanctioned & Approved")}
                    disabled={actionSubmitted}
                    className="flex-1 bg-gov-navy text-white hover:bg-gov-navy-dark py-2 rounded text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    {actionSubmitted ? "Recording Action..." : "Sanction / Approve"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        <div className="p-3 bg-slate-100 border-t border-gov-border text-center text-[10px] text-slate-500">
          NLAMS Contextual Decision Workspace • GovNet Verified Secure Session
        </div>
      </div>
    </div>
  );
};
