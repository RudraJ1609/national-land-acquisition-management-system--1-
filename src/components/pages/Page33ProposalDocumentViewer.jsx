import React, { useState } from "react";
import { useApp } from "../../context/AppContext.jsx";
import {
  FileText,
  Download,
  Printer,
  CheckCircle2,
  Building,
  MapPin,
  FileCheck,
  Calendar,
  Layers,
  Share2,
  FileCode
} from "lucide-react";
import { StatusBadge } from "../common/StatusBadge.jsx";

export const Page33ProposalDocumentViewer = () => {
  const { projects, currentProject, setSelectedProjectId, navigateTo } = useApp();
  const [activeTab, setActiveTab] = useState("dpr-summary");
  const [downloadMsg, setDownloadMsg] = useState("");

  const proj = currentProject || projects[0];

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    setDownloadMsg(`Downloading Certified Proposal Document Pack for ${proj.id}...`);
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
            Requiring Body Portal • Formal DPR & Section 3(u) Proposal Docket
          </div>
          <h1 className="text-xl font-bold text-slate-900 leading-tight flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#1B365D]" />
            Land Acquisition Proposal & Detailed Project Report (DPR)
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleDownload}
            className="bg-[#1B365D] hover:bg-[#142946] text-white px-3.5 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Download Signed Proposal (PDF)</span>
          </button>
          <button
            onClick={handlePrint}
            className="bg-white hover:bg-slate-100 text-slate-800 border border-[#D1D5DB] px-3.5 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Docket</span>
          </button>
        </div>
      </div>

      {/* Project Selector Ribbon */}
      <div className="bg-white border border-[#D1D5DB] rounded-lg p-4 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full md:w-auto flex-1 min-w-0">
          <label className="font-semibold text-slate-700 shrink-0 whitespace-nowrap">Selected Proposal:</label>
          <select
            value={proj.id}
            onChange={(e) => setSelectedProjectId(e.target.value)}
            className="w-full flex-1 min-w-0 max-w-full p-2 border border-[#D1D5DB] rounded bg-white text-slate-900 font-semibold focus:border-[#1B365D] focus:outline-none truncate"
          >
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.id} - {p.name} ({p.requiringBody})
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-slate-500 font-medium whitespace-nowrap">State Clearance Status:</span>
          <StatusBadge status={proj.stateApprovalStatus === "Approved" ? "Approved" : "Under Review"} />
        </div>
      </div>

      {/* Docket Tabs */}
      <div className="flex items-center gap-2 border-b border-[#D1D5DB]">
        <button
          onClick={() => setActiveTab("dpr-summary")}
          className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-colors cursor-pointer ${
            activeTab === "dpr-summary"
              ? "border-[#1B365D] text-[#1B365D]"
              : "border-transparent text-slate-500 hover:text-slate-900"
          }`}
        >
          Detailed Project Report (DPR) Executive Brief
        </button>
        <button
          onClick={() => setActiveTab("justification")}
          className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-colors cursor-pointer ${
            activeTab === "justification"
              ? "border-[#1B365D] text-[#1B365D]"
              : "border-transparent text-slate-500 hover:text-slate-900"
          }`}
        >
          Section 3(u) Public Purpose Justification
        </button>
        <button
          onClick={() => setActiveTab("officer-signatures")}
          className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-colors cursor-pointer ${
            activeTab === "officer-signatures"
              ? "border-[#1B365D] text-[#1B365D]"
              : "border-transparent text-slate-500 hover:text-slate-900"
          }`}
        >
          Authorizations & Digital DSC Endorsements
        </button>
      </div>

      {/* Main Document Content */}
      <div className="bg-white border border-[#D1D5DB] rounded-lg p-6 shadow-xs space-y-6 text-xs text-slate-800">
        {activeTab === "dpr-summary" && (
          <div className="space-y-6">
            <div className="text-center border-b pb-4 space-y-1">
              <div className="text-[11px] font-bold text-[#C5A059] uppercase tracking-widest">
                Government of India • Ministry of Railways
              </div>
              <h2 className="text-lg font-bold text-[#1B365D]">
                LAND ACQUISITION PROPOSAL MEMORANDUM & DPR EXECUTIVE SUMMARY
              </h2>
              <div className="text-xs text-slate-500">
                Statutory Submission under Section 3(u) of the RFCTLARR Act, 2013
              </div>
            </div>

            {/* Structured Spec Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border border-slate-200 rounded-lg p-4 bg-slate-50/50">
              <div>
                <span className="font-semibold text-slate-500 block text-[10px] uppercase">Project Title</span>
                <span className="font-bold text-slate-900 text-sm">{proj.name}</span>
              </div>
              <div>
                <span className="font-semibold text-slate-500 block text-[10px] uppercase">Proposal Reference Number</span>
                <span className="font-mono font-bold text-[#1B365D]">{proj.id}-DPR-REV2</span>
              </div>
              <div>
                <span className="font-semibold text-slate-500 block text-[10px] uppercase">Requiring Department / Agency</span>
                <span className="font-bold text-slate-800">{proj.requiringBody}</span>
              </div>
              <div>
                <span className="font-semibold text-slate-500 block text-[10px] uppercase">Designated Chief Representative</span>
                <span className="font-bold text-slate-800">{proj.requiringBodyUser}</span>
              </div>
              <div>
                <span className="font-semibold text-slate-500 block text-[10px] uppercase">Jurisdiction & Revenue Extent</span>
                <span className="font-bold text-slate-800">
                  Taluka {proj.taluka}, District {proj.district}, {proj.state}
                </span>
              </div>
              <div>
                <span className="font-semibold text-slate-500 block text-[10px] uppercase">Total Land Required</span>
                <span className="font-bold text-emerald-800">{proj.landRequired} Acres (Estimated 85 Private Parcels)</span>
              </div>
            </div>

            {/* Land Breakdown Table */}
            <div>
              <h3 className="font-bold text-slate-900 mb-2 text-sm">Classification of Requested Land</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border border-slate-200">
                  <thead className="bg-slate-100 font-semibold border-b">
                    <tr>
                      <th className="p-2.5 border-r">Land Classification</th>
                      <th className="p-2.5 border-r">Area (Acres)</th>
                      <th className="p-2.5 border-r">Estimated Base Value</th>
                      <th className="p-2.5">Clearance Needed</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr>
                      <td className="p-2.5 border-r font-medium">Private Agricultural Land (Irrigated / Non-irrigated)</td>
                      <td className="p-2.5 border-r font-mono">150.00 Ac</td>
                      <td className="p-2.5 border-r font-bold text-[#C5A059]">₹ 180.00 Cr</td>
                      <td className="p-2.5 text-emerald-700 font-semibold">Consent & SIA under Sec 4</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 border-r font-medium">Government / Panchayat Wasteland</td>
                      <td className="p-2.5 border-r font-mono">20.00 Ac</td>
                      <td className="p-2.5 border-r font-bold text-[#C5A059]">₹ 24.00 Cr</td>
                      <td className="p-2.5 text-blue-700 font-semibold">Inter-departmental Transfer</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 border-r font-medium">Reserve / Protected Forest Land</td>
                      <td className="p-2.5 border-r font-mono">10.00 Ac</td>
                      <td className="p-2.5 border-r font-bold text-[#C5A059]">₹ 12.00 Cr</td>
                      <td className="p-2.5 text-amber-700 font-semibold">Stage-1 Forest Clearance (MoEFCC)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === "justification" && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900">Statutory Public Purpose & Minimum Land Justification</h3>
            <p className="leading-relaxed text-slate-700">
              {proj.justification}
            </p>
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg space-y-2">
              <div className="font-bold text-blue-900">Certificate of Minimum Land Requirement</div>
              <p className="text-[11px] text-blue-800 leading-relaxed">
                It is hereby certified by the Chief Engineer / Project Director that the total area of {proj.landRequired} acres proposed for acquisition represents the bare absolute minimum required for the safe geometry, double-line broad gauge tracks, and statutory electrified right-of-way. No unutilized land previously acquired is lying idle in this sector.
              </p>
            </div>
          </div>
        )}

        {activeTab === "officer-signatures" && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900">Digital Signatures & Administrative Approvals</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border border-slate-200 rounded-lg bg-slate-50 space-y-2">
                <div className="flex items-center gap-2 text-emerald-700 font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Requiring Body Submitter (DSC Signed)</span>
                </div>
                <div className="font-semibold text-slate-900">{proj.requiringBodyUser}</div>
                <div className="text-[11px] text-slate-500 font-mono">
                  Digital Certificate ID: NIC-DSC-994821-2026<br />
                  Timestamp: 12-Jul-2026 14:22:10 IST
                </div>
              </div>

              <div className="p-4 border border-slate-200 rounded-lg bg-slate-50 space-y-2">
                <div className="flex items-center gap-2 text-blue-700 font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>State Revenue Nodal Clearance</span>
                </div>
                <div className="font-semibold text-slate-900">Smt. Sunita Rao, IAS (Principal Secretary)</div>
                <div className="text-[11px] text-slate-500 font-mono">
                  In-Principle Sanction Order: GOG/REV/LA-2026/88<br />
                  Timestamp: 18-Jul-2026 11:05:44 IST
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
