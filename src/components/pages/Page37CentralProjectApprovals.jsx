import React, { useState } from "react";
import { useApp } from "../../context/AppContext.jsx";
import { StatusBadge } from "../common/StatusBadge.jsx";
import {
  FileCheck,
  Building,
  MapPin,
  Calendar,
  Layers,
  FileText,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Search,
  Filter,
  ArrowRight,
  ShieldCheck,
  AlertCircle
} from "lucide-react";

export const Page37CentralProjectApprovals = () => {
  const {
    centralProjectApprovals,
    handleCentralProjectApprovalDecision,
    navigateTo,
    setSelectedProjectId
  } = useApp();

  const [searchQuery, setSearchQuery] = useState("");
  const [stateFilter, setStateFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [decision, setDecision] = useState("Approved");
  const [remarks, setRemarks] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const filteredRequests = (centralProjectApprovals || []).filter((req) => {
    const matchesSearch =
      req.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.requiringBody.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesState = stateFilter === "All" || req.state === stateFilter;
    const matchesStatus = statusFilter === "All" || req.status === statusFilter;
    return matchesSearch && matchesState && matchesStatus;
  });

  const handleOpenModal = (req) => {
    setSelectedRequest(req);
    setDecision(req.status === "Approved" ? "Approved" : "Approved");
    setRemarks(req.remarks || "");
    setSuccessMessage("");
  };

  const handleCloseModal = () => {
    setSelectedRequest(null);
    setSuccessMessage("");
  };

  const handleSubmitDecision = (e) => {
    e.preventDefault();
    if (!selectedRequest) return;

    handleCentralProjectApprovalDecision(selectedRequest.id, decision, remarks);
    setSuccessMessage(`Decision successfully recorded for ${selectedRequest.id} as "${decision}".`);
    setTimeout(() => {
      handleCloseModal();
    }, 1200);
  };

  const totalProposals = centralProjectApprovals.length;
  const pendingCount = centralProjectApprovals.filter(
    (p) => p.status === "Pending Review" || p.status === "Under Scrutiny"
  ).length;
  const approvedCount = centralProjectApprovals.filter((p) => p.status === "Approved").length;

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div>
          <div className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
            <span>Central Authority</span>
            <span>•</span>
            <span className="text-[#1B365D] font-bold">National Clearance Division</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 leading-tight">
            Central Project Approval Requests
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Statutory review and in-principle approval of major inter-state & national infrastructure proposals under RFCTLARR Act 2013.
          </p>
        </div>

        <button
          onClick={() => navigateTo("central-dashboard")}
          className="bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 px-3 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors"
        >
          <span>Back to National Dashboard</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-white border border-slate-300 rounded p-3 shadow-2xs">
          <div className="text-[11px] font-bold uppercase text-slate-500">Total Proposals Received</div>
          <div className="text-2xl font-bold text-slate-900 mt-1">{totalProposals}</div>
          <div className="text-[11px] text-slate-600 mt-0.5">Across all Central Ministries & NHAI/Railways</div>
        </div>

        <div className="bg-amber-50 border border-amber-300 rounded p-3 shadow-2xs">
          <div className="text-[11px] font-bold uppercase text-amber-800">Pending Central Review</div>
          <div className="text-2xl font-bold text-amber-900 mt-1">{pendingCount}</div>
          <div className="text-[11px] text-amber-700 mt-0.5">Awaiting Joint Secretary screening decision</div>
        </div>

        <div className="bg-emerald-50 border border-emerald-300 rounded p-3 shadow-2xs">
          <div className="text-[11px] font-bold uppercase text-emerald-800">Sanctioned & Cleared</div>
          <div className="text-2xl font-bold text-emerald-900 mt-1">{approvedCount}</div>
          <div className="text-[11px] text-emerald-700 mt-0.5">Section 2/3 Clearance Granted</div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white border border-slate-300 rounded p-3 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search project name, ID, or ministry..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 border border-slate-300 rounded text-xs focus:ring-1 focus:ring-[#1B365D] focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <div className="flex items-center gap-1.5 text-xs text-slate-600">
            <Filter className="w-3.5 h-3.5" />
            <span className="font-semibold">State:</span>
          </div>
          <select
            value={stateFilter}
            onChange={(e) => setStateFilter(e.target.value)}
            className="border border-slate-300 rounded px-2.5 py-1.5 text-xs focus:ring-1 focus:ring-[#1B365D] focus:outline-none bg-white"
          >
            <option value="All">All States</option>
            <option value="Gujarat">Gujarat</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Rajasthan">Rajasthan</option>
            <option value="Tamil Nadu">Tamil Nadu</option>
          </select>

          <div className="flex items-center gap-1.5 text-xs text-slate-600 ml-2">
            <span className="font-semibold">Status:</span>
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-slate-300 rounded px-2.5 py-1.5 text-xs focus:ring-1 focus:ring-[#1B365D] focus:outline-none bg-white"
          >
            <option value="All">All Statuses</option>
            <option value="Pending Review">Pending Review</option>
            <option value="Under Scrutiny">Under Scrutiny</option>
            <option value="Approved">Approved</option>
            <option value="Returned for Clarification">Returned for Clarification</option>
          </select>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white border border-slate-300 rounded shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-100 text-slate-800 font-semibold border-b border-slate-300 uppercase text-[11px]">
              <tr>
                <th className="py-2.5 px-3 border-r">Request ID & Project</th>
                <th className="py-2.5 px-3 border-r">Requiring Body & Ministry</th>
                <th className="py-2.5 px-3 border-r">State & District</th>
                <th className="py-2.5 px-3 border-r text-right">Land Required</th>
                <th className="py-2.5 px-3 border-r">Submitted Date</th>
                <th className="py-2.5 px-3 border-r text-center">Status</th>
                <th className="py-2.5 px-3 text-center">Statutory Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredRequests.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-8 text-center text-slate-500">
                    No approval requests found matching the selected filters.
                  </td>
                </tr>
              ) : (
                filteredRequests.map((req) => (
                  <tr key={req.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-2.5 px-3 border-r font-semibold text-slate-900 max-w-[260px]">
                      <div className="font-bold text-[#1B365D]">{req.projectName}</div>
                      <div className="text-[10px] text-slate-500 font-mono mt-0.5">{req.id}</div>
                      <div className="text-[10px] text-slate-600 mt-0.5">{req.projectType}</div>
                    </td>
                    <td className="py-2.5 px-3 border-r text-slate-700 max-w-[220px]">
                      <div className="font-medium text-slate-900">{req.requiringBody}</div>
                      <div className="text-[10px] text-slate-500">{req.ministry}</div>
                    </td>
                    <td className="py-2.5 px-3 border-r text-slate-700 whitespace-nowrap">
                      <div className="font-semibold text-slate-900">{req.state}</div>
                      <div className="text-[10px] text-slate-500">{req.district}</div>
                    </td>
                    <td className="py-2.5 px-3 border-r text-right font-bold text-slate-900 whitespace-nowrap">
                      {req.landRequired.toLocaleString()} <span className="font-normal text-slate-500 text-[10px]">Acres</span>
                    </td>
                    <td className="py-2.5 px-3 border-r text-slate-600 font-mono whitespace-nowrap">
                      {req.submittedOn}
                    </td>
                    <td className="py-2.5 px-3 border-r text-center whitespace-nowrap">
                      <StatusBadge status={req.status} />
                    </td>
                    <td className="py-2.5 px-3 text-center whitespace-nowrap">
                      <button
                        onClick={() => handleOpenModal(req)}
                        className="bg-[#1B365D] hover:bg-[#142642] text-white px-3 py-1 rounded text-xs font-semibold shadow-2xs transition-colors"
                      >
                        Review & Decision
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Review & Decision Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-md shadow-2xl border border-slate-300 w-full max-w-3xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="bg-[#1B365D] text-white px-5 py-3.5 flex items-center justify-between">
              <div>
                <div className="text-[10px] font-extrabold uppercase text-[#C5A059] tracking-wider">
                  Statutory Clearance Review
                </div>
                <h3 className="font-bold text-base text-white">{selectedRequest.projectName}</h3>
              </div>
              <button
                onClick={handleCloseModal}
                className="text-slate-300 hover:text-white text-lg font-bold p-1 leading-none"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 space-y-4 max-h-[78vh] overflow-y-auto">
              {successMessage && (
                <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded text-xs font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>{successMessage}</span>
                </div>
              )}

              {/* Summary Details Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 bg-slate-50 p-3 rounded border border-slate-200 text-xs">
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-semibold">Request ID:</span>
                  <span className="font-mono font-bold text-slate-800">{selectedRequest.id}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-semibold">Requiring Body:</span>
                  <span className="font-bold text-slate-800">{selectedRequest.requiringBody}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-semibold">Nodal Ministry:</span>
                  <span className="font-bold text-slate-800">{selectedRequest.ministry}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-semibold">State / Jurisdiction:</span>
                  <span className="font-bold text-slate-800">{selectedRequest.state} ({selectedRequest.district})</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-semibold">Land Requirement:</span>
                  <span className="font-bold text-[#1B365D] text-sm">{selectedRequest.landRequired} Acres</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-semibold">Current Status:</span>
                  <StatusBadge status={selectedRequest.status} />
                </div>
              </div>

              {/* Justification & Scope */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-800 block">
                  Public Purpose & National Justification:
                </label>
                <div className="p-3 bg-slate-50 border rounded text-xs text-slate-700 leading-relaxed">
                  {selectedRequest.justification}
                </div>
              </div>

              {/* Supporting Statutory Documents */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800 block">
                  Submitted DPR & Feasibility Annexures:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedRequest.supportingDocuments.map((doc, idx) => (
                    <div
                      key={idx}
                      className="p-2 border border-slate-200 bg-slate-50 rounded flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-2 truncate">
                        <FileText className="w-3.5 h-3.5 text-[#1B365D] shrink-0" />
                        <span className="truncate text-slate-700 font-medium">{doc}</span>
                      </div>
                      <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 shrink-0">
                        Verified
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Central Clearance Decision Box */}
              <form onSubmit={handleSubmitDecision} className="border-t border-slate-200 pt-4 space-y-3">
                <div className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#1B365D]" />
                  <span>Central Screening Committee Decision:</span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setDecision("Approved")}
                    className={`py-2 px-3 rounded text-xs font-bold border flex items-center justify-center gap-1.5 transition-all ${
                      decision === "Approved"
                        ? "bg-emerald-700 text-white border-emerald-800 ring-2 ring-emerald-300"
                        : "bg-slate-50 text-slate-700 border-slate-300 hover:bg-emerald-50"
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Approve Proposal</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDecision("Returned for Clarification")}
                    className={`py-2 px-3 rounded text-xs font-bold border flex items-center justify-center gap-1.5 transition-all ${
                      decision === "Returned for Clarification"
                        ? "bg-amber-600 text-white border-amber-700 ring-2 ring-amber-300"
                        : "bg-slate-50 text-slate-700 border-slate-300 hover:bg-amber-50"
                    }`}
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Return for Scrutiny</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDecision("Rejected")}
                    className={`py-2 px-3 rounded text-xs font-bold border flex items-center justify-center gap-1.5 transition-all ${
                      decision === "Rejected"
                        ? "bg-rose-700 text-white border-rose-800 ring-2 ring-rose-300"
                        : "bg-slate-50 text-slate-700 border-slate-300 hover:bg-rose-50"
                    }`}
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    <span>Reject Proposal</span>
                  </button>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Central Authority Remarks & Statutory Directions:
                  </label>
                  <textarea
                    rows="3"
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                    placeholder="Enter official directions, clearance conditions, or queries for State Revenue Dept / Requiring Body..."
                    className="w-full p-2.5 border border-slate-300 rounded text-xs focus:ring-1 focus:ring-[#1B365D] focus:outline-none"
                    required
                  ></textarea>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-4 py-2 border border-slate-300 rounded text-xs font-semibold text-slate-700 hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#1B365D] hover:bg-[#142642] text-white rounded text-xs font-bold shadow-xs transition-colors"
                  >
                    Submit Official Decision
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
