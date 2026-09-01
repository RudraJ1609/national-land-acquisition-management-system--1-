import React, { useState } from "react";
import { useApp } from "../../context/AppContext.jsx";
import { StatusBadge } from "../common/StatusBadge.jsx";
import {
  Coins,
  HeartHandshake,
  Building2,
  FileCheck,
  Send,
  HelpCircle,
  CheckCircle2,
  XCircle,
  Eye,
  Download,
  AlertTriangle,
  ArrowRight,
  PlusCircle,
  X,
  Search,
  Filter,
  Check,
  ShieldCheck,
  MapPin,
  TrendingUp
} from "lucide-react";

export const Page39StateFundAndRnR = () => {
  const {
    stateFundAllocations,
    stateRnRRequests,
    handleStateReleaseFund,
    handleStateRnRDecision,
    navigateTo
  } = useApp();

  const [activeTab, setActiveTab] = useState("fund-allocation"); // 'fund-allocation' | 'rnr-requests'

  // Allocation Modal State
  const [selectedAllocation, setSelectedAllocation] = useState(null);
  const [releaseAmountCr, setReleaseAmountCr] = useState("");
  const [releasePurpose, setReleasePurpose] = useState("");
  const [releaseRemarks, setReleaseRemarks] = useState("");
  const [releaseFundCategory, setReleaseFundCategory] = useState("Land Compensation & Solatium");
  const [allocationFeedback, setAllocationFeedback] = useState("");

  // R&R Review Modal State
  const [selectedRnR, setSelectedRnR] = useState(null);
  const [rnrStateRemarks, setRnrStateRemarks] = useState("");
  const [rnrFeedback, setRnrFeedback] = useState("");

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState("");

  // Handler for Release Fund
  const submitFundRelease = (e) => {
    e.preventDefault();
    if (!selectedAllocation || !releaseAmountCr || Number(releaseAmountCr) <= 0) return;

    handleStateReleaseFund(
      selectedAllocation.id,
      Number(releaseAmountCr),
      releasePurpose || "Statutory Compensation Release",
      releaseRemarks || "Approved by State Finance & Revenue Committee",
      releaseFundCategory
    );

    setAllocationFeedback(`Successfully allocated ₹ ${releaseAmountCr} Cr to ${selectedAllocation.projectName}.`);
    setTimeout(() => {
      setSelectedAllocation(null);
      setReleaseAmountCr("");
      setReleasePurpose("");
      setReleaseRemarks("");
      setAllocationFeedback("");
    }, 1500);
  };

  // Handler for R&R State Decision
  const executeRnRDecision = (requestId, decision) => {
    let remark = rnrStateRemarks.trim();
    if (!remark) {
      if (decision === "Forwarded to Central") {
        remark = "Verified by State Revenue Department. Scrutiny passed. Recommended for Central RFCTLARR Corpus Grant.";
      } else if (decision === "Returned to R&R Officer") {
        remark = "Returned for re-verification of tenant family survey records.";
      } else {
        remark = "State preliminary verification approved.";
      }
    }

    handleStateRnRDecision(requestId, decision, remark);
    setRnrFeedback(`R&R Request ${requestId} has been updated: ${decision.toUpperCase()}`);
    setTimeout(() => {
      setSelectedRnR(null);
      setRnrFeedback("");
      setRnrStateRemarks("");
    }, 1500);
  };

  // Total KPIs
  const totalBudgetCr = stateFundAllocations.reduce((sum, a) => sum + (Number(a.totalBudgetCr) || 0), 0);
  const totalAllocatedCr = stateFundAllocations.reduce((sum, a) => sum + (Number(a.allocatedCr) || 0), 0);
  const totalDisbursedCr = stateFundAllocations.reduce((sum, a) => sum + (Number(a.disbursedCr) || 0), 0);
  const pendingRnRCount = stateRnRRequests.filter((r) => r.status === "Under State Review").length;

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div>
          <div className="text-xs text-slate-500 font-medium">
            State Revenue Department • State Financial & R&R Coordination Desk
          </div>
          <h1 className="text-xl font-bold text-slate-900 leading-tight flex items-center gap-2">
            <Coins className="w-5 h-5 text-[#C5A059]" />
            State Fund Allocation & R&R Fund Requests
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigateTo("state-dashboard")}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded text-xs font-semibold transition-colors cursor-pointer"
          >
            ← Back to State Dashboard
          </button>
        </div>
      </div>

      {/* High-Level State Fund KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
        <div className="bg-white border border-[#D1D5DB] rounded-lg p-4 shadow-2xs">
          <span className="text-slate-500 font-semibold text-[10px] uppercase">State Approved Budget</span>
          <div className="text-2xl font-bold text-[#1B365D] mt-1">
            ₹ {totalBudgetCr.toFixed(1)} <span className="text-xs font-normal">Cr</span>
          </div>
          <span className="text-[11px] text-slate-600 block mt-1">Across 6 Major Infrastructure Corridors</span>
        </div>

        <div className="bg-white border border-[#D1D5DB] rounded-lg p-4 shadow-2xs">
          <span className="text-slate-500 font-semibold text-[10px] uppercase">State Funds Allocated</span>
          <div className="text-2xl font-bold text-slate-900 mt-1">
            ₹ {totalAllocatedCr.toFixed(1)} <span className="text-xs font-normal">Cr</span>
          </div>
          <span className="text-[11px] text-emerald-700 font-medium block mt-1">
            {Math.round((totalAllocatedCr / totalBudgetCr) * 100)}% of Sanctioned Budget
          </span>
        </div>

        <div className="bg-white border border-[#D1D5DB] rounded-lg p-4 shadow-2xs">
          <span className="text-slate-500 font-semibold text-[10px] uppercase">PFMS Disbursed to Khatedars</span>
          <div className="text-2xl font-bold text-[#C5A059] mt-1">
            ₹ {totalDisbursedCr.toFixed(1)} <span className="text-xs font-normal">Cr</span>
          </div>
          <span className="text-[11px] text-emerald-700 font-medium block mt-1">Direct Bank Account Transfers</span>
        </div>

        <div className="bg-white border border-amber-300 bg-amber-50/40 rounded-lg p-4 shadow-2xs">
          <span className="text-amber-800 font-semibold text-[10px] uppercase">Pending R&R Scrutiny</span>
          <div className="text-2xl font-bold text-amber-700 mt-1">{pendingRnRCount} Requests</div>
          <span className="text-[11px] text-amber-800 font-medium block mt-1">Awaiting State Review / Forwarding</span>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex border-b border-slate-200 gap-4">
        <button
          onClick={() => setActiveTab("fund-allocation")}
          className={`pb-2.5 text-xs font-bold flex items-center gap-2 border-b-2 transition-colors cursor-pointer ${
            activeTab === "fund-allocation"
              ? "border-[#1B365D] text-[#1B365D]"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <Coins className="w-4 h-4 text-[#C5A059]" />
          <span>State Budget & Fund Allocation</span>
        </button>

        <button
          onClick={() => setActiveTab("rnr-requests")}
          className={`pb-2.5 text-xs font-bold flex items-center gap-2 border-b-2 transition-colors cursor-pointer ${
            activeTab === "rnr-requests"
              ? "border-[#1B365D] text-[#1B365D]"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <HeartHandshake className="w-4 h-4 text-purple-700" />
          <span>District R&R Fund Requests & Central Forwarding</span>
          {pendingRnRCount > 0 && (
            <span className="bg-amber-600 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">
              {pendingRnRCount}
            </span>
          )}
        </button>
      </div>

      {/* TAB 1: STATE FUND ALLOCATION */}
      {activeTab === "fund-allocation" && (
        <div className="space-y-4">
          <div className="bg-white border border-[#D1D5DB] rounded-lg shadow-xs overflow-hidden">
            <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/70">
              <div>
                <h3 className="font-bold text-sm text-slate-900">
                  State Project-wise Budget Allocation & Treasury Release
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Allocate and release State Treasury funds to District Special Land Acquisition accounts
                </p>
              </div>
              <div className="relative text-xs w-full sm:w-64">
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search project or district..."
                  className="w-full pl-8 pr-2.5 py-1.5 border border-slate-300 rounded bg-white text-slate-900 focus:ring-1 focus:ring-[#1B365D]"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-100 text-slate-800 font-semibold border-b uppercase text-[11px]">
                  <tr>
                    <th className="py-3 px-3.5 border-r">Project ID & Name</th>
                    <th className="py-3 px-3 border-r">District</th>
                    <th className="py-3 px-3 border-r">Fund Category</th>
                    <th className="py-3 px-3 border-r text-right">Total Budget</th>
                    <th className="py-3 px-3 border-r text-right">Allocated</th>
                    <th className="py-3 px-3 border-r text-right">Disbursed</th>
                    <th className="py-3 px-3 border-r text-right">Pending Release</th>
                    <th className="py-3 px-3 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {stateFundAllocations
                    .filter(
                      (item) =>
                        item.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        item.district.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3 px-3.5 border-r font-bold text-slate-900">
                          <div>{item.projectName}</div>
                          <div className="text-[10px] text-slate-500 font-mono">{item.projectId}</div>
                        </td>
                        <td className="py-3 px-3 border-r text-slate-700 font-medium">
                          {item.district}
                        </td>
                        <td className="py-3 px-3 border-r text-slate-600">
                          {item.fundCategory}
                        </td>
                        <td className="py-3 px-3 border-r text-right font-bold text-slate-900">
                          ₹ {item.totalBudgetCr.toFixed(1)} Cr
                        </td>
                        <td className="py-3 px-3 border-r text-right font-semibold text-blue-700">
                          ₹ {item.allocatedCr.toFixed(1)} Cr
                        </td>
                        <td className="py-3 px-3 border-r text-right font-semibold text-emerald-700">
                          ₹ {item.disbursedCr.toFixed(1)} Cr
                        </td>
                        <td className="py-3 px-3 border-r text-right font-bold text-amber-800">
                          ₹ {item.pendingCr.toFixed(1)} Cr
                        </td>
                        <td className="py-3 px-3 text-center">
                          <button
                            onClick={() => {
                              setSelectedAllocation(item);
                              setReleaseAmountCr(String(item.pendingCr > 30 ? 25 : item.pendingCr));
                              setReleasePurpose(`Quarterly Compensation Tranche for ${item.district}`);
                              setReleaseFundCategory(item.fundCategory);
                            }}
                            className="bg-[#1B365D] hover:bg-[#142946] text-white px-3 py-1.5 rounded text-[11px] font-semibold flex items-center gap-1 mx-auto cursor-pointer shadow-2xs"
                          >
                            <Coins className="w-3.5 h-3.5 text-[#C5A059]" />
                            <span>Release Fund</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: R&R FUND REQUESTS REVIEW & FORWARDING */}
      {activeTab === "rnr-requests" && (
        <div className="space-y-4">
          {/* Hierarchy Guide Banner */}
          <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg text-xs space-y-2">
            <div className="font-bold text-purple-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-purple-700" />
              Statutory R&R Multi-Tier Sanction Flow
            </div>
            <div className="flex flex-wrap items-center gap-2 text-[11px] text-purple-950 font-medium">
              <span className="bg-white px-2 py-1 rounded border border-purple-200">1. District R&R Officer Prepares Scheme</span>
              <span>→</span>
              <span className="bg-purple-700 text-white px-2 py-1 rounded font-bold">2. State Authority Review & Verify</span>
              <span>→</span>
              <span className="bg-white px-2 py-1 rounded border border-purple-200">3. Central Authority Final Sanction</span>
              <span>→</span>
              <span className="bg-white px-2 py-1 rounded border border-purple-200">4. Fund Released to District R&R Account</span>
            </div>
          </div>

          <div className="bg-white border border-[#D1D5DB] rounded-lg shadow-xs overflow-hidden">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
              <div>
                <h3 className="font-bold text-sm text-slate-900">
                  R&R Corpus Requests Submitted by District Collectorates
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Verify affected families survey, entitlement packages, and forward to Central Authority for sanction
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-100 text-slate-800 font-semibold border-b uppercase text-[11px]">
                  <tr>
                    <th className="py-3 px-3.5 border-r">Request ID & Project</th>
                    <th className="py-3 px-3 border-r">District & Officer</th>
                    <th className="py-3 px-3 border-r text-center">Affected Families</th>
                    <th className="py-3 px-3 border-r text-center">Supported</th>
                    <th className="py-3 px-3 border-r text-right">Requested Amount</th>
                    <th className="py-3 px-3 border-r">Submission Date</th>
                    <th className="py-3 px-3 border-r">Status</th>
                    <th className="py-3 px-3 text-center">State Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {stateRnRRequests.map((req) => (
                    <tr key={req.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-3.5 border-r font-bold text-slate-900">
                        <div>{req.projectName}</div>
                        <div className="text-[10px] text-slate-500 font-mono">{req.id}</div>
                      </td>
                      <td className="py-3 px-3 border-r text-slate-700 font-medium">
                        <div>District {req.district}</div>
                        <div className="text-[10px] text-slate-500">{req.rnrOfficer}</div>
                      </td>
                      <td className="py-3 px-3 border-r text-center font-bold text-slate-900">
                        {req.totalAffectedFamilies} Families
                      </td>
                      <td className="py-3 px-3 border-r text-center font-semibold text-emerald-700">
                        {req.familiesSupported} / {req.totalAffectedFamilies}
                      </td>
                      <td className="py-3 px-3 border-r text-right font-bold text-purple-900">
                        ₹ {req.requestedAmountCr.toFixed(2)} Cr
                      </td>
                      <td className="py-3 px-3 border-r font-mono text-slate-600">
                        {req.submissionDate}
                      </td>
                      <td className="py-3 px-3 border-r">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold ${
                            req.status === "Forwarded to Central"
                              ? "bg-blue-100 text-blue-800"
                              : req.status === "Central Approval Received"
                              ? "bg-emerald-100 text-emerald-800"
                              : req.status === "Returned to R&R Officer"
                              ? "bg-rose-100 text-rose-800"
                              : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {req.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-center">
                        <button
                          onClick={() => {
                            setSelectedRnR(req);
                            setRnrStateRemarks(req.stateRemarks || "");
                          }}
                          className="bg-[#1B365D] hover:bg-[#142946] text-white px-3 py-1.5 rounded text-[11px] font-semibold cursor-pointer shadow-2xs"
                        >
                          Review & Forward
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Release Fund Modal */}
      {selectedAllocation && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-lg border border-slate-300 shadow-2xl max-w-lg w-full p-5 space-y-4 animate-fade-in">
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2">
                <Coins className="w-5 h-5 text-[#C5A059]" />
                <h3 className="font-bold text-sm text-slate-900">
                  Release State Budgetary Allocation
                </h3>
              </div>
              <button
                onClick={() => setSelectedAllocation(null)}
                className="p-1 hover:bg-slate-100 rounded text-slate-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {allocationFeedback && (
              <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs rounded-md font-semibold flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-700" />
                <span>{allocationFeedback}</span>
              </div>
            )}

            <form onSubmit={submitFundRelease} className="space-y-3 text-xs">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1.5">
                <div className="font-bold text-slate-900 text-xs">{selectedAllocation.projectName}</div>
                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600">
                  <div>District: <strong>{selectedAllocation.district}</strong></div>
                  <div>Total Project Budget: <strong>₹ {selectedAllocation.totalBudgetCr} Cr</strong></div>
                  <div>Currently Allocated: <strong className="text-blue-700">₹ {selectedAllocation.allocatedCr} Cr</strong></div>
                  <div>Pending Allocation: <strong className="text-amber-800">₹ {selectedAllocation.pendingCr} Cr</strong></div>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Fund Category</label>
                <select
                  value={releaseFundCategory}
                  onChange={(e) => setReleaseFundCategory(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded text-slate-900 bg-white"
                >
                  <option value="Land Compensation & Statutory Solatium">Land Compensation & Statutory Solatium (Sec 30)</option>
                  <option value="R&R Corpus & Rehabilitation Grant">R&R Corpus & Rehabilitation Grant (Sec 31)</option>
                  <option value="Administrative & Legal Dispute Corpus">Administrative & SLAO Contingency Corpus</option>
                  <option value="SIA & Cadastral Ground Survey">SIA & Cadastral Ground Survey</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Amount to Release (in Crore INR) <span className="text-rose-600">*</span>
                </label>
                <input
                  type="number"
                  step="0.1"
                  max={selectedAllocation.pendingCr + 50}
                  value={releaseAmountCr}
                  onChange={(e) => setReleaseAmountCr(e.target.value)}
                  placeholder="e.g. 25.0"
                  className="w-full p-2 border border-slate-300 rounded text-slate-900 font-bold"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Purpose of Release</label>
                <input
                  type="text"
                  value={releasePurpose}
                  onChange={(e) => setReleasePurpose(e.target.value)}
                  placeholder="e.g. Disbursal of Section 23 Awards for Anand Section"
                  className="w-full p-2 border border-slate-300 rounded text-slate-900"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">State Treasury Remarks</label>
                <textarea
                  rows={2}
                  value={releaseRemarks}
                  onChange={(e) => setReleaseRemarks(e.target.value)}
                  placeholder="Sanction order reference, budget head code..."
                  className="w-full p-2 border border-slate-300 rounded text-slate-900"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setSelectedAllocation(null)}
                  className="px-3 py-1.5 text-slate-600 hover:text-slate-900 text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-1.5 rounded text-xs font-bold shadow-2xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Coins className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Sanction & Release Fund</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* R&R Review Modal */}
      {selectedRnR && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-lg border border-slate-300 shadow-2xl max-w-2xl w-full p-5 space-y-4 max-h-[90vh] overflow-y-auto animate-fade-in">
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2">
                <HeartHandshake className="w-5 h-5 text-purple-700" />
                <div>
                  <h3 className="font-bold text-sm text-slate-900">
                    State Level R&R Request Scrutiny
                  </h3>
                  <div className="text-[11px] text-slate-500 font-mono">{selectedRnR.id}</div>
                </div>
              </div>
              <button
                onClick={() => setSelectedRnR(null)}
                className="p-1 hover:bg-slate-100 rounded text-slate-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {rnrFeedback && (
              <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs rounded-md font-semibold flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-700" />
                <span>{rnrFeedback}</span>
              </div>
            )}

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
                <div className="font-bold text-slate-900 text-sm">{selectedRnR.projectName}</div>
                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-700">
                  <div>District: <strong>{selectedRnR.district}</strong></div>
                  <div>R&R Officer: <strong>{selectedRnR.rnrOfficer}</strong></div>
                  <div>Total Affected Families: <strong>{selectedRnR.totalAffectedFamilies}</strong></div>
                  <div>Eligible for Package: <strong>{selectedRnR.eligibleFamilies}</strong></div>
                  <div>Requested Corpus: <strong className="text-purple-900 text-sm">₹ {selectedRnR.requestedAmountCr} Crore</strong></div>
                  <div>Current Status: <strong className="text-amber-800">{selectedRnR.status}</strong></div>
                </div>
              </div>

              {/* Benefit Categories */}
              <div className="border border-slate-200 rounded-lg p-3 space-y-1.5">
                <div className="font-bold text-slate-800">Entitlement Packages Included in Scheme:</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {(selectedRnR.benefitCategories || []).map((cat, idx) => (
                    <div key={idx} className="p-1.5 bg-purple-50/60 border border-purple-200 rounded text-[11px] text-purple-950 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-700"></span>
                      <span>{cat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Supporting Documents */}
              <div className="border border-slate-200 rounded-lg p-3 space-y-1.5">
                <div className="font-bold text-slate-800">Submitted Verification Records:</div>
                <div className="space-y-1">
                  {(selectedRnR.supportingDocuments || []).map((doc, idx) => (
                    <div key={idx} className="p-2 bg-slate-50 border rounded flex items-center justify-between text-[11px]">
                      <span className="font-medium text-slate-800">{doc}</span>
                      <button className="text-[#1B365D] hover:underline flex items-center gap-1 cursor-pointer">
                        <Download className="w-3 h-3" /> View Document
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* State Officer Remarks */}
              <div>
                <label className="block font-bold text-slate-800 mb-1">
                  State Nodal Officer Scrutiny Remarks & Central Forwarding Note <span className="text-rose-600">*</span>
                </label>
                <textarea
                  rows={3}
                  value={rnrStateRemarks}
                  onChange={(e) => setRnrStateRemarks(e.target.value)}
                  placeholder="Enter state-level scrutiny observations, verification note for Central Authority..."
                  className="w-full p-2.5 border border-slate-300 rounded-lg text-slate-900"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t">
              <button
                type="button"
                onClick={() => setSelectedRnR(null)}
                className="text-xs text-slate-600 hover:text-slate-900 font-semibold cursor-pointer"
              >
                Close
              </button>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => executeRnRDecision(selectedRnR.id, "Returned to R&R Officer")}
                  className="bg-rose-700 hover:bg-rose-800 text-white px-3.5 py-1.5 rounded text-xs font-semibold flex items-center gap-1 cursor-pointer shadow-2xs"
                >
                  <XCircle className="w-3.5 h-3.5" />
                  <span>Return for Scrutiny</span>
                </button>

                <button
                  type="button"
                  onClick={() => executeRnRDecision(selectedRnR.id, "Forwarded to Central")}
                  className="bg-[#1B365D] hover:bg-[#142946] text-white px-4 py-1.5 rounded text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-2xs"
                >
                  <Send className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Forward to Central Authority for Final Approval</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
