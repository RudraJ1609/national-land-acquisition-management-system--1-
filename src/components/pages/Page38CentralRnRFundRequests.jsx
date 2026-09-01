import React, { useState } from "react";
import { useApp } from "../../context/AppContext.jsx";
import { StatusBadge } from "../common/StatusBadge.jsx";
import {
  HeartHandshake,
  Building,
  Coins,
  Users,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Search,
  Filter,
  ArrowRight,
  ShieldCheck,
  FileSpreadsheet,
  AlertTriangle,
  Info
} from "lucide-react";

export const Page38CentralRnRFundRequests = () => {
  const {
    centralRnRFundRequests,
    handleCentralRnRFundDecision,
    navigateTo,
    setSelectedProjectId
  } = useApp();

  const [searchQuery, setSearchQuery] = useState("");
  const [stateFilter, setStateFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [approvedAmount, setApprovedAmount] = useState("");
  const [decision, setDecision] = useState("Approved");
  const [scheme, setScheme] = useState("Centrally Sponsored RFCTLARR R&R Corpus");
  const [financialYear, setFinancialYear] = useState("2026-27");
  const [remarks, setRemarks] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const filteredRequests = (centralRnRFundRequests || []).filter((req) => {
    const matchesSearch =
      req.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.rnrOfficer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesState = stateFilter === "All" || req.state === stateFilter;
    const matchesStatus = statusFilter === "All" || req.status === statusFilter;
    return matchesSearch && matchesState && matchesStatus;
  });

  const handleOpenModal = (req) => {
    setSelectedRequest(req);
    setApprovedAmount(req.approvedAmount || req.amountRequested);
    setDecision(req.status === "Approved" ? "Approved" : "Approved");
    setScheme(req.fundingScheme || "Centrally Sponsored RFCTLARR R&R Corpus");
    setFinancialYear(req.financialYear || "2026-27");
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

    handleCentralRnRFundDecision(
      selectedRequest.id,
      decision,
      approvedAmount ? Number(approvedAmount) : null,
      remarks,
      scheme,
      financialYear
    );

    setSuccessMessage(
      `R&R Sanction of ₹ ${(Number(approvedAmount || selectedRequest.amountRequested) / 10000000).toFixed(2)} Cr successfully recorded.`
    );

    setTimeout(() => {
      handleCloseModal();
    }, 1200);
  };

  // Metric totals
  const totalRequestedCrores = (centralRnRFundRequests || []).reduce(
    (acc, cur) => acc + (cur.amountRequested || 0),
    0
  ) / 10000000;

  const totalSanctionedCrores = (centralRnRFundRequests || []).reduce(
    (acc, cur) => acc + (cur.approvedAmount || (cur.status === "Approved" ? cur.amountRequested : 0)),
    0
  ) / 10000000;

  const pendingRequestsCount = (centralRnRFundRequests || []).filter(
    (r) => r.status === "Pending Approval" || r.status === "Under Review"
  ).length;

  const totalFamiliesCovered = (centralRnRFundRequests || []).reduce(
    (acc, cur) => acc + (cur.totalAffectedFamilies || 0),
    0
  );

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div>
          <div className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
            <span>Central Authority</span>
            <span>•</span>
            <span className="text-[#1B365D] font-bold">R&R Corpus Allocation Division</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 leading-tight">
            Central R&R Fund Release Requests
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Sanction and release Centrally Sponsored RFCTLARR 2013 Rehabilitation & Resettlement grants to District Collectors.
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
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-white border border-slate-300 rounded p-3 shadow-2xs">
          <div className="text-[11px] font-bold uppercase text-slate-500">Total Requested Corpus</div>
          <div className="text-2xl font-bold text-slate-900 mt-1">₹ {totalRequestedCrores.toFixed(2)} Cr</div>
          <div className="text-[11px] text-slate-600 mt-0.5">Across {centralRnRFundRequests.length} National Projects</div>
        </div>

        <div className="bg-emerald-50 border border-emerald-300 rounded p-3 shadow-2xs">
          <div className="text-[11px] font-bold uppercase text-emerald-800">Sanctioned & Released</div>
          <div className="text-2xl font-bold text-emerald-900 mt-1">₹ {totalSanctionedCrores.toFixed(2)} Cr</div>
          <div className="text-[11px] text-emerald-700 mt-0.5">Disbursed via PFMS R&R Account</div>
        </div>

        <div className="bg-amber-50 border border-amber-300 rounded p-3 shadow-2xs">
          <div className="text-[11px] font-bold uppercase text-amber-800">Pending Release</div>
          <div className="text-2xl font-bold text-amber-900 mt-1">{pendingRequestsCount} Requests</div>
          <div className="text-[11px] text-amber-700 mt-0.5">Awaiting Central Authority Sanction</div>
        </div>

        <div className="bg-blue-50 border border-blue-300 rounded p-3 shadow-2xs">
          <div className="text-[11px] font-bold uppercase text-[#1B365D]">Families Benefited</div>
          <div className="text-2xl font-bold text-[#1B365D] mt-1">{totalFamiliesCovered.toLocaleString()}</div>
          <div className="text-[11px] text-slate-600 mt-0.5">Entitled displaced & affected families</div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white border border-slate-300 rounded p-3 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search project name, request ID, officer..."
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
            <option value="Uttar Pradesh">Uttar Pradesh</option>
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
            <option value="Pending Approval">Pending Approval</option>
            <option value="Under Review">Under Review</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
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
                <th className="py-2.5 px-3 border-r">State / District</th>
                <th className="py-2.5 px-3 border-r">R&R Officer In-Charge</th>
                <th className="py-2.5 px-3 border-r text-center">Affected Families</th>
                <th className="py-2.5 px-3 border-r text-right">Requested Corpus</th>
                <th className="py-2.5 px-3 border-r text-center">Status</th>
                <th className="py-2.5 px-3 text-center">Central Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredRequests.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-8 text-center text-slate-500">
                    No R&R fund requests found matching the current filters.
                  </td>
                </tr>
              ) : (
                filteredRequests.map((req) => (
                  <tr key={req.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-2.5 px-3 border-r font-semibold text-slate-900 max-w-[260px]">
                      <div className="font-bold text-[#1B365D]">{req.projectName}</div>
                      <div className="text-[10px] text-slate-500 font-mono mt-0.5">{req.id}</div>
                      <div className="text-[10px] text-slate-600 mt-0.5 font-sans">
                        Scheme: {req.fundingScheme}
                      </div>
                    </td>
                    <td className="py-2.5 px-3 border-r text-slate-700 whitespace-nowrap">
                      <div className="font-semibold text-slate-900">{req.state}</div>
                      <div className="text-[10px] text-slate-500">{req.district} District</div>
                    </td>
                    <td className="py-2.5 px-3 border-r text-slate-700 max-w-[180px]">
                      <div className="font-medium text-slate-900">{req.rnrOfficer}</div>
                      <div className="text-[10px] text-slate-500">Req Date: {req.requestDate}</div>
                    </td>
                    <td className="py-2.5 px-3 border-r text-center whitespace-nowrap">
                      <span className="font-bold text-slate-900 text-sm">
                        {req.totalAffectedFamilies}
                      </span>
                      <div className="text-[10px] text-emerald-700">
                        {req.familiesSupported} Supported
                      </div>
                    </td>
                    <td className="py-2.5 px-3 border-r text-right whitespace-nowrap">
                      <div className="font-bold text-amber-800 text-sm">
                        ₹ {(req.amountRequested / 10000000).toFixed(2)} Cr
                      </div>
                      {req.approvedAmount && (
                        <div className="text-[10px] text-emerald-700 font-semibold">
                          Sanctioned: ₹ {(req.approvedAmount / 10000000).toFixed(2)} Cr
                        </div>
                      )}
                    </td>
                    <td className="py-2.5 px-3 border-r text-center whitespace-nowrap">
                      <StatusBadge status={req.status} />
                    </td>
                    <td className="py-2.5 px-3 text-center whitespace-nowrap">
                      <button
                        onClick={() => handleOpenModal(req)}
                        className="bg-[#1B365D] hover:bg-[#142642] text-white px-3 py-1 rounded text-xs font-semibold shadow-2xs transition-colors"
                      >
                        Review & Sanction
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* R&R Fund Detail & Sanction Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-md shadow-2xl border border-slate-300 w-full max-w-3xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="bg-[#1B365D] text-white px-5 py-3.5 flex items-center justify-between">
              <div>
                <div className="text-[10px] font-extrabold uppercase text-[#C5A059] tracking-wider">
                  RFCTLARR Section 16/31 R&R Corpus Sanction
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

              {/* Top Details Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-slate-50 p-3 rounded border border-slate-200 text-xs">
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-semibold">Request ID:</span>
                  <span className="font-mono font-bold text-slate-800">{selectedRequest.id}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-semibold">State / District:</span>
                  <span className="font-bold text-slate-800">{selectedRequest.state} ({selectedRequest.district})</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-semibold">R&R Officer:</span>
                  <span className="font-bold text-slate-800 truncate block">{selectedRequest.rnrOfficer}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-semibold">Status:</span>
                  <StatusBadge status={selectedRequest.status} />
                </div>
              </div>

              {/* Family Census Status */}
              <div className="grid grid-cols-4 gap-2 text-center text-xs">
                <div className="bg-slate-100 p-2 rounded border">
                  <span className="text-slate-500 block text-[10px]">Total Affected</span>
                  <span className="font-bold text-slate-900 text-sm">{selectedRequest.totalAffectedFamilies}</span>
                </div>
                <div className="bg-blue-50 p-2 rounded border border-blue-200">
                  <span className="text-[#1B365D] block text-[10px]">Eligible Census</span>
                  <span className="font-bold text-[#1B365D] text-sm">{selectedRequest.eligibleFamilies}</span>
                </div>
                <div className="bg-emerald-50 p-2 rounded border border-emerald-200">
                  <span className="text-emerald-800 block text-[10px]">Already Supported</span>
                  <span className="font-bold text-emerald-800 text-sm">{selectedRequest.familiesSupported}</span>
                </div>
                <div className="bg-amber-50 p-2 rounded border border-amber-200">
                  <span className="text-amber-800 block text-[10px]">Pending Support</span>
                  <span className="font-bold text-amber-800 text-sm">{selectedRequest.familiesPending}</span>
                </div>
              </div>

              {/* Entitlement Breakdown Table */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800 block">
                  Rehabilitation & Resettlement Package Breakdown:
                </label>
                <table className="w-full text-xs text-left border border-slate-200 rounded">
                  <thead className="bg-slate-100 uppercase text-[10px] font-bold text-slate-700">
                    <tr>
                      <th className="p-2 border-r">Entitlement / Benefit Type</th>
                      <th className="p-2 border-r text-center">Beneficiary Families</th>
                      <th className="p-2 text-right">Requested Allocation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {selectedRequest.fundBreakdown.map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="p-2 border-r font-medium text-slate-800">{item.benefitType}</td>
                        <td className="p-2 border-r text-center font-bold text-slate-700">
                          {item.beneficiaries} Families
                        </td>
                        <td className="p-2 text-right font-bold text-slate-900">
                          ₹ {(item.amount / 10000000).toFixed(2)} Cr
                        </td>
                      </tr>
                    ))}
                    <tr className="bg-slate-100 font-bold">
                      <td colSpan="2" className="p-2 text-right border-r">
                        Total Requested Amount:
                      </td>
                      <td className="p-2 text-right text-[#1B365D] text-sm">
                        ₹ {(selectedRequest.amountRequested / 10000000).toFixed(2)} Cr
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Central Approval Form */}
              <form onSubmit={handleSubmitDecision} className="border-t border-slate-200 pt-4 space-y-3">
                <div className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#1B365D]" />
                  <span>Central Sanction & Fund Release Determination:</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                      Approved Amount (₹):
                    </label>
                    <input
                      type="number"
                      value={approvedAmount}
                      onChange={(e) => setApprovedAmount(e.target.value)}
                      placeholder="e.g. 120000000"
                      className="w-full p-2 border border-slate-300 rounded text-xs font-mono font-bold focus:ring-1 focus:ring-[#1B365D] focus:outline-none"
                      required
                    />
                    <span className="text-[10px] text-slate-500">
                      = ₹ {approvedAmount ? (Number(approvedAmount) / 10000000).toFixed(2) : 0} Cr
                    </span>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                      Funding Scheme:
                    </label>
                    <input
                      type="text"
                      value={scheme}
                      onChange={(e) => setScheme(e.target.value)}
                      className="w-full p-2 border border-slate-300 rounded text-xs focus:ring-1 focus:ring-[#1B365D] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                      Financial Year:
                    </label>
                    <input
                      type="text"
                      value={financialYear}
                      onChange={(e) => setFinancialYear(e.target.value)}
                      className="w-full p-2 border border-slate-300 rounded text-xs focus:ring-1 focus:ring-[#1B365D] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                      Decision:
                    </label>
                    <select
                      value={decision}
                      onChange={(e) => setDecision(e.target.value)}
                      className="w-full p-2 border border-slate-300 rounded text-xs font-semibold focus:ring-1 focus:ring-[#1B365D] focus:outline-none bg-white"
                    >
                      <option value="Approved">Approved</option>
                      <option value="Under Review">Under Review</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Central Sanction Order Remarks / Audit Note:
                  </label>
                  <textarea
                    rows="2"
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                    placeholder="Enter sanction reference number, conditions for disbursement, or compliance directions..."
                    className="w-full p-2.5 border border-slate-300 rounded text-xs focus:ring-1 focus:ring-[#1B365D] focus:outline-none"
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
                    Approve & Sanction Fund
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
