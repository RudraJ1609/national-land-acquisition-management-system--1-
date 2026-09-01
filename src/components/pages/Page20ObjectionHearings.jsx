import React, { useState } from "react";
import { useApp } from "../../context/AppContext.jsx";
import { StatusBadge } from "../common/StatusBadge.jsx";
import {
  AlertCircle,
  Calendar,
  CheckCircle,
  Clock,
  Eye,
  FileText,
  Search,
  Filter,
  X,
  ShieldCheck,
  UserCheck,
  Upload,
  Send,
  HelpCircle,
  Check,
  Ban,
  Bell,
  Download
} from "lucide-react";

export const Page20ObjectionHearings = () => {
  const { objections, resolveObjection, updateObjectionHearing, projects, currentProject } = useApp();

  const [searchQuery, setSearchQuery] = useState("");
  const [projectFilter, setProjectFilter] = useState("All");
  const [villageFilter, setVillageFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateRange, setDateRange] = useState("");

  const [selectedObjection, setSelectedObjection] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  // Hearing & Decision Form State inside modal
  const [hearingDate, setHearingDate] = useState("2026-08-28");
  const [collectorDecision, setCollectorDecision] = useState("Under Review");
  const [decisionRemarks, setDecisionRemarks] = useState("");
  const [uploadedOrderFile, setUploadedOrderFile] = useState(null);
  const [feedback, setFeedback] = useState("");

  const filteredObjections = objections.filter((o) => {
    const matchesSearch =
      o.objectorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.surveyNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.objectionType.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesProject = projectFilter === "All" || o.projectId === projectFilter;
    const matchesVillage = villageFilter === "All" || o.village === villageFilter;
    const matchesType = typeFilter === "All" || o.objectionType === typeFilter;
    const matchesStatus = statusFilter === "All" || o.status === statusFilter;
    return matchesSearch && matchesProject && matchesVillage && matchesType && matchesStatus;
  });

  const handleOpenDetail = (obj) => {
    setSelectedObjection(obj);
    setHearingDate(obj.hearingDate || "2026-08-28");
    setCollectorDecision(obj.status === "Resolved" ? "Accepted" : obj.status === "Dismissed" ? "Rejected" : "Under Review");
    setDecisionRemarks(obj.decisionRemarks || obj.collectorRemarks || "");
    setShowDetailModal(true);
  };

  const handleScheduleHearing = () => {
    if (!selectedObjection) return;
    updateObjectionHearing(selectedObjection.id, hearingDate, "11:00 AM");
    setFeedback(`Section 15 Hearing scheduled for ${selectedObjection.objectorName} on ${hearingDate}. Summons issued.`);
    setTimeout(() => setFeedback(""), 2500);
  };

  const handleAcceptObjection = () => {
    if (!selectedObjection) return;
    resolveObjection(
      selectedObjection.id,
      "Resolved",
      decisionRemarks || "Objection Accepted. Joint inspection ordered and compensation adjusted under RFCTLARR Act."
    );
    setFeedback(`Objection #${selectedObjection.id} ACCEPTED by District Collector.`);
    setTimeout(() => {
      setShowDetailModal(false);
      setFeedback("");
    }, 1500);
  };

  const handleRejectObjection = () => {
    if (!selectedObjection) return;
    resolveObjection(
      selectedObjection.id,
      "Dismissed",
      decisionRemarks || "Objection Rejected after quasi-judicial inquiry under Section 15(2). Grounds not substantiated."
    );
    setFeedback(`Objection #${selectedObjection.id} REJECTED / DISMISSED by District Collector.`);
    setTimeout(() => {
      setShowDetailModal(false);
      setFeedback("");
    }, 1500);
  };

  const handleRequestInfo = () => {
    setFeedback(`Additional revenue documentation requested from Objector ${selectedObjection?.objectorName}.`);
    setTimeout(() => setFeedback(""), 2500);
  };

  const handleNotifyCitizen = () => {
    setFeedback(`SMS & e-Notice dispatched to Citizen ${selectedObjection?.objectorName} (${selectedObjection?.contactNumber || "+91 98250 44192"}).`);
    setTimeout(() => setFeedback(""), 2500);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Title */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div>
          <div className="text-xs text-slate-500 font-medium">
            District Authority • Quasi-Judicial Land Acquisition Hearings (Section 15)
          </div>
          <h1 className="text-xl font-bold text-slate-900 leading-tight flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-[#1B365D]" />
            Objection Management & Collector Hearing Proceedings
          </h1>
        </div>
      </div>

      {feedback && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs rounded font-semibold flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-700 shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="bg-white border border-slate-300 rounded p-3.5 shadow-2xs">
          <div className="text-slate-500 font-semibold uppercase text-[10px]">Total Objections Received</div>
          <div className="text-xl font-bold text-slate-900 mt-1">{objections.length}</div>
        </div>
        <div className="bg-white border border-slate-300 rounded p-3.5 shadow-2xs">
          <div className="text-slate-500 font-semibold uppercase text-[10px]">Hearings Scheduled</div>
          <div className="text-xl font-bold text-amber-700 mt-1">
            {objections.filter((o) => o.status === "Hearing Scheduled").length}
          </div>
        </div>
        <div className="bg-white border border-slate-300 rounded p-3.5 shadow-2xs">
          <div className="text-slate-500 font-semibold uppercase text-[10px]">Accepted / Resolved</div>
          <div className="text-xl font-bold text-emerald-700 mt-1">
            {objections.filter((o) => o.status === "Resolved").length}
          </div>
        </div>
        <div className="bg-white border border-slate-300 rounded p-3.5 shadow-2xs">
          <div className="text-slate-500 font-semibold uppercase text-[10px]">Rejected / Dismissed</div>
          <div className="text-xl font-bold text-rose-700 mt-1">
            {objections.filter((o) => o.status === "Dismissed").length}
          </div>
        </div>
      </div>

      {/* Comprehensive Multi-Filters Bar */}
      <div className="bg-white border border-slate-300 rounded p-4 shadow-2xs space-y-3 text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Search Objector / Parcel</label>
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Name or Survey No..."
                className="w-full pl-8 pr-2.5 py-1.5 border border-slate-300 rounded"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Project</label>
            <select
              value={projectFilter}
              onChange={(e) => setProjectFilter(e.target.value)}
              className="w-full p-1.5 border border-slate-300 rounded bg-white"
            >
              <option value="All">All Projects</option>
              <option value="PRJ-GJ-2026-01">WDFC Freight Corridor</option>
              <option value="PRJ-GJ-2026-101">Ahmedabad Highway</option>
              <option value="PRJ-GJ-2026-102">Surat Metro Phase 2</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Village</label>
            <select
              value={villageFilter}
              onChange={(e) => setVillageFilter(e.target.value)}
              className="w-full p-1.5 border border-slate-300 rounded bg-white"
            >
              <option value="All">All Villages</option>
              <option value="Sunav">Sunav</option>
              <option value="Bandhani">Bandhani</option>
              <option value="Rampura">Rampura</option>
              <option value="Agas">Agas</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Objection Type</label>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full p-1.5 border border-slate-300 rounded bg-white"
            >
              <option value="All">All Types</option>
              <option value="Valuation Discrepancy (Market Rate)">Valuation Discrepancy</option>
              <option value="Severance of Agricultural Holding">Land Severance</option>
              <option value="Title Ownership & Partition Dispute">Ownership Dispute</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full p-1.5 border border-slate-300 rounded bg-white"
            >
              <option value="All">All Statuses</option>
              <option value="Hearing Scheduled">Hearing Scheduled</option>
              <option value="Pending">Pending Review</option>
              <option value="Resolved">Accepted / Resolved</option>
              <option value="Dismissed">Rejected / Dismissed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Citizen Objections Table: Objector | Parcel | Type | Submitted Date | Status */}
      <div className="bg-white border border-slate-300 rounded shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-100 text-slate-800 font-semibold border-b uppercase text-[11px]">
              <tr>
                <th className="py-3 px-3.5 border-r">Objector</th>
                <th className="py-3 px-3.5 border-r">Parcel</th>
                <th className="py-3 px-3.5 border-r">Type</th>
                <th className="py-3 px-3.5 border-r">Submitted Date</th>
                <th className="py-3 px-3.5 border-r">Status</th>
                <th className="py-3 px-3.5 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredObjections.map((obj) => (
                <tr key={obj.id} className="hover:bg-slate-50">
                  <td className="py-3 px-3.5 border-r font-bold text-slate-900">
                    {obj.objectorName}
                    <div className="text-[10px] text-slate-500 font-mono font-normal">ID: {obj.id}</div>
                  </td>
                  <td className="py-3 px-3.5 border-r font-mono font-bold text-slate-800">
                    Survey {obj.surveyNumber}
                    <div className="text-[10px] text-slate-500 font-sans font-normal">{obj.village}</div>
                  </td>
                  <td className="py-3 px-3.5 border-r text-slate-700 font-medium">
                    {obj.objectionType}
                  </td>
                  <td className="py-3 px-3.5 border-r font-mono text-slate-600">
                    {obj.dateFiled || "2026-08-18"}
                  </td>
                  <td className="py-3 px-3.5 border-r">
                    <StatusBadge status={obj.status} size="xs" />
                  </td>
                  <td className="py-3 px-3.5 text-center">
                    <button
                      onClick={() => handleOpenDetail(obj)}
                      className="bg-[#1B365D] hover:bg-[#12243f] text-white px-3 py-1 rounded text-[11px] font-semibold transition-colors shadow-2xs"
                    >
                      Hearing Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Hearing Detail Modal / Drawer */}
      {showDetailModal && selectedObjection && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded border border-slate-400 shadow-2xl max-w-2xl w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <div className="text-[10px] font-bold uppercase text-slate-500">
                  Quasi-Judicial Hearing Proceedings • Section 15(2)
                </div>
                <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#1B365D]" />
                  Objection Hearing: {selectedObjection.objectorName}
                </h3>
              </div>
              <button
                onClick={() => setShowDetailModal(false)}
                className="p-1 hover:bg-slate-100 rounded text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              {/* Objection Fields Grid */}
              <div className="grid grid-cols-2 gap-3 bg-slate-50 border border-slate-200 rounded p-3.5">
                <div>
                  <span className="text-slate-500 block text-[10px]">Objector Name:</span>
                  <span className="font-bold text-slate-900 text-sm">{selectedObjection.objectorName}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Parcel Number:</span>
                  <span className="font-mono font-bold text-slate-900 text-sm">
                    Survey {selectedObjection.surveyNumber} ({selectedObjection.village})
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Objection Type:</span>
                  <span className="font-semibold text-slate-800">{selectedObjection.objectionType}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Filing Date:</span>
                  <span className="font-mono text-slate-700">{selectedObjection.dateFiled || "2026-08-18"}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-slate-500 block text-[10px]">Objection Description / Grounds:</span>
                  <p className="p-2 bg-white border border-slate-300 rounded text-slate-800 font-serif leading-relaxed mt-0.5">
                    "{selectedObjection.details || selectedObjection.reason || "The acquisition divides the agricultural parcel into two non-viable fragments, destroying access to the tube-well irrigation channel. Requesting either complete acquisition or compensation at 2.0x market rate."}"
                  </p>
                </div>
                <div className="col-span-2">
                  <span className="text-slate-500 block text-[10px]">Submitted Documents:</span>
                  <div className="flex gap-2 mt-1">
                    <span className="bg-blue-50 border border-blue-200 text-blue-800 px-2 py-0.5 rounded font-mono text-[10px] flex items-center gap-1">
                      <FileText className="w-3 h-3" /> 7_12_RoR_Copy.pdf
                    </span>
                    <span className="bg-blue-50 border border-blue-200 text-blue-800 px-2 py-0.5 rounded font-mono text-[10px] flex items-center gap-1">
                      <FileText className="w-3 h-3" /> Valuation_Grievance_Affidavit.pdf
                    </span>
                  </div>
                </div>
              </div>

              {/* Hearing Date & Quasi-Judicial Parameters */}
              <div className="grid grid-cols-2 gap-3 border p-3 rounded bg-white">
                <div>
                  <label className="block font-semibold text-slate-800 mb-1">Hearing Date</label>
                  <input
                    type="date"
                    value={hearingDate}
                    onChange={(e) => setHearingDate(e.target.value)}
                    className="w-full p-2 border border-slate-300 rounded font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-800 mb-1">Collector Decision</label>
                  <select
                    value={collectorDecision}
                    onChange={(e) => setCollectorDecision(e.target.value)}
                    className="w-full p-2 border border-slate-300 rounded bg-white font-semibold"
                  >
                    <option value="Under Review">Under Review / Hearing Pending</option>
                    <option value="Accepted">Accept Objection (Adjust Valuation / Survey)</option>
                    <option value="Rejected">Reject Objection (Grounds not established)</option>
                  </select>
                </div>
              </div>

              {/* Decision Remarks */}
              <div>
                <label className="block font-semibold text-slate-800 mb-1">
                  Decision Remarks / Statutory Reasoning (Section 15(2)):
                </label>
                <textarea
                  rows={3}
                  value={decisionRemarks}
                  onChange={(e) => setDecisionRemarks(e.target.value)}
                  placeholder="Record Collector's formal quasi-judicial reasons regarding land valuation, tree count, or severance adjustment..."
                  className="w-full p-2 border border-slate-300 rounded font-sans"
                />
              </div>

              {/* Upload Hearing Order */}
              <div className="border border-dashed border-slate-300 rounded p-3 bg-slate-50 text-center">
                <Upload className="w-4 h-4 text-slate-500 mx-auto mb-1" />
                <span className="text-[11px] font-semibold text-slate-700 block">
                  Upload Signed Collector Hearing Order (PDF)
                </span>
                <input
                  type="file"
                  onChange={(e) => setUploadedOrderFile(e.target.files?.[0]?.name || "Order_Signed.pdf")}
                  className="text-[10px] text-slate-500 mt-1 cursor-pointer"
                />
                {uploadedOrderFile && (
                  <span className="text-[11px] text-emerald-700 font-bold block mt-1">
                    ✓ Attached: {uploadedOrderFile}
                  </span>
                )}
              </div>

              {/* Action Buttons: Schedule Hearing, Accept Objection, Reject Objection, Request Additional Information, Notify Citizen */}
              <div className="pt-3 border-t space-y-2">
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={handleScheduleHearing}
                    className="bg-amber-600 hover:bg-amber-700 text-white py-1.5 px-2 rounded font-bold transition-colors shadow-2xs flex items-center justify-center gap-1 text-[11px]"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Schedule Hearing</span>
                  </button>

                  <button
                    onClick={handleAcceptObjection}
                    className="bg-emerald-700 hover:bg-emerald-800 text-white py-1.5 px-2 rounded font-bold transition-colors shadow-2xs flex items-center justify-center gap-1 text-[11px]"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Accept Objection</span>
                  </button>

                  <button
                    onClick={handleRejectObjection}
                    className="bg-rose-700 hover:bg-rose-800 text-white py-1.5 px-2 rounded font-bold transition-colors shadow-2xs flex items-center justify-center gap-1 text-[11px]"
                  >
                    <Ban className="w-3.5 h-3.5" />
                    <span>Reject Objection</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={handleRequestInfo}
                    className="bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 py-1.5 px-2 rounded font-semibold transition-colors flex items-center justify-center gap-1 text-[11px]"
                  >
                    <HelpCircle className="w-3.5 h-3.5 text-slate-600" />
                    <span>Request Additional Info</span>
                  </button>

                  <button
                    onClick={handleNotifyCitizen}
                    className="bg-[#1B365D] hover:bg-[#12243f] text-white py-1.5 px-2 rounded font-bold transition-colors flex items-center justify-center gap-1 text-[11px] shadow-2xs"
                  >
                    <Bell className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>Notify Citizen (SMS/Portal)</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
