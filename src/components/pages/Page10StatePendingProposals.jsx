import React, { useState } from "react";
import { useApp } from "../../context/AppContext.jsx";
import { StatusBadge } from "../common/StatusBadge.jsx";
import {
  FileCheck,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Eye,
  Building,
  AlertCircle,
  X,
  FileText,
  HelpCircle,
  Layers,
  MapPin,
  Clock,
  Download,
  ArrowRight,
  ShieldCheck,
  Building2,
  Check
} from "lucide-react";

export const Page10StatePendingProposals = () => {
  const { projects, handleStateApproval, navigateTo, setSelectedProjectId } = useApp();

  const [searchQuery, setSearchQuery] = useState("");
  const [districtFilter, setDistrictFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedProposal, setSelectedProposal] = useState(null);
  const [reviewRemarks, setReviewRemarks] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const filteredProposals = (projects || []).filter((p) => {
    const matchesSearch =
      (p.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.id || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.requiringBody || "").toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDistrict = districtFilter === "All" || p.district === districtFilter;
    const matchesStatus =
      statusFilter === "All" ||
      (p.stateApprovalStatus || "Pending") === statusFilter ||
      (statusFilter === "Pending" && p.status === "Pending State Approval");
    return matchesSearch && matchesDistrict && matchesStatus;
  });

  const executeDecision = (projId, decision) => {
    let defaultRemark = "";
    if (decision === "Approved") {
      defaultRemark = "In-principle statutory clearance approved by State Revenue Authority. Proceed with GIS cadastral survey.";
    } else if (decision === "Returned for Clarification") {
      defaultRemark = "Clarification sought on environmental buffer zone and Gram Sabha consultation records.";
    } else {
      defaultRemark = "Returned for realignment and revised revenue survey submission.";
    }

    const finalRemarks = reviewRemarks.trim() || defaultRemark;
    handleStateApproval(projId, decision, finalRemarks);

    setFeedbackMessage(`Proposal ${projId} has been successfully updated: ${decision.toUpperCase()}.`);
    setTimeout(() => {
      setSelectedProposal(null);
      setFeedbackMessage("");
      setReviewRemarks("");
    }, 1500);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div>
          <div className="text-xs text-slate-500 font-medium">
            State Revenue Authority • Statutory Project Appraisal Desk
          </div>
          <h1 className="text-xl font-bold text-slate-900 leading-tight flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-[#1B365D]" />
            State Project Proposal Approval Requests
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

      {/* Filter Bar */}
      <div className="bg-white border border-[#D1D5DB] rounded-lg p-4 shadow-2xs space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          {/* Keyword Search */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Search Proposal</label>
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by Project Name, ID, Requiring Body..."
                className="w-full pl-8 pr-2.5 py-1.5 border border-slate-300 rounded text-slate-900 focus:ring-1 focus:ring-[#1B365D]"
              />
            </div>
          </div>

          {/* District Filter */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">District</label>
            <select
              value={districtFilter}
              onChange={(e) => setDistrictFilter(e.target.value)}
              className="w-full px-2.5 py-1.5 border border-slate-300 rounded bg-white text-slate-900 focus:ring-1 focus:ring-[#1B365D]"
            >
              <option value="All">All Districts</option>
              <option value="Ahmedabad">Ahmedabad</option>
              <option value="Vadodara">Vadodara</option>
              <option value="Surat">Surat</option>
              <option value="Rajkot">Rajkot</option>
              <option value="Bharuch">Bharuch</option>
              <option value="Anand">Anand</option>
              <option value="Kheda">Kheda</option>
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Approval Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-2.5 py-1.5 border border-slate-300 rounded bg-white text-slate-900 focus:ring-1 focus:ring-[#1B365D]"
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending Review</option>
              <option value="Approved">Approved</option>
              <option value="Returned for Clarification">Clarification Requested</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      {/* Proposals Table */}
      <div className="bg-white border border-[#D1D5DB] rounded-lg shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-800 font-semibold border-b border-slate-200 uppercase text-[11px]">
              <tr>
                <th className="py-3 px-3.5 border-r">Project ID</th>
                <th className="py-3 px-3 border-r">Project Name</th>
                <th className="py-3 px-3 border-r">Requiring Body</th>
                <th className="py-3 px-3 border-r">District</th>
                <th className="py-3 px-3 border-r">Land Required</th>
                <th className="py-3 px-3 border-r">Submitted Date</th>
                <th className="py-3 px-3 border-r">Status</th>
                <th className="py-3 px-3 text-center">State Review Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredProposals.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-slate-500">
                    No project proposals found matching criteria.
                  </td>
                </tr>
              ) : (
                filteredProposals.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-3.5 border-r font-mono font-bold text-[#1B365D]">
                      {p.id}
                    </td>
                    <td className="py-3 px-3 border-r font-bold text-slate-900">
                      <div>{p.name}</div>
                      <div className="text-[10px] text-slate-500 font-normal">{p.type}</div>
                    </td>
                    <td className="py-3 px-3 border-r text-slate-700 font-medium">
                      {p.requiringBody}
                      <div className="text-[10px] text-slate-500">{p.requiringBodyUser}</div>
                    </td>
                    <td className="py-3 px-3 border-r text-slate-700">
                      {p.district} {p.taluka ? `(${p.taluka})` : ""}
                    </td>
                    <td className="py-3 px-3 border-r font-semibold text-slate-900">
                      {p.landRequired} Acres
                    </td>
                    <td className="py-3 px-3 border-r font-mono text-slate-600">
                      {p.submittedDate}
                    </td>
                    <td className="py-3 px-3 border-r">
                      <StatusBadge status={p.stateApprovalStatus || p.status} />
                    </td>
                    <td className="py-3 px-3 text-center space-x-1.5 whitespace-nowrap">
                      <button
                        onClick={() => {
                          setSelectedProposal(p);
                          setReviewRemarks(p.stateRemarks || "");
                        }}
                        className="bg-[#1B365D] hover:bg-[#142946] text-white px-3 py-1.5 rounded text-[11px] font-semibold cursor-pointer shadow-2xs"
                      >
                        Review Proposal
                      </button>
                      <button
                        onClick={() => {
                          setSelectedProjectId(p.id);
                          navigateTo("project-workflow");
                        }}
                        className="bg-slate-100 text-slate-700 border border-slate-300 px-2.5 py-1.5 rounded text-[11px] font-semibold hover:bg-slate-200 cursor-pointer"
                      >
                        View Full Workflow →
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detailed Review & Approval Modal */}
      {selectedProposal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-lg border border-slate-300 shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col my-auto animate-fade-in">
            {/* Modal Header */}
            <div className="bg-[#1B365D] text-white p-4 rounded-t-lg flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-[#C5A059]" />
                <div>
                  <h3 className="font-bold text-sm">
                    State Level Project Appraisal & Statutory Approval
                  </h3>
                  <div className="text-[11px] text-slate-200 font-mono">
                    Proposal ID: {selectedProposal.id} • Submitted: {selectedProposal.submittedDate}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedProposal(null)}
                className="p-1 hover:bg-white/10 rounded text-slate-200 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content (Scrollable) */}
            <div className="p-5 overflow-y-auto space-y-4 text-xs">
              {feedbackMessage && (
                <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs rounded-md font-semibold flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-700" />
                  <span>{feedbackMessage}</span>
                </div>
              )}

              {/* Status Flow Stepper */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <div className="text-[10px] font-bold uppercase text-slate-500 tracking-wider mb-2">
                  State Approval Flow Stage
                </div>
                <div className="flex items-center justify-between text-center">
                  <div className="flex-1">
                    <div className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center mx-auto text-xs">
                      ✓
                    </div>
                    <div className="text-[11px] font-bold text-slate-900 mt-1">Proposal Submitted</div>
                    <div className="text-[10px] text-slate-500">{selectedProposal.submittedDate}</div>
                  </div>
                  <div className="h-0.5 w-12 bg-emerald-600" />
                  <div className="flex-1">
                    <div className="w-6 h-6 rounded-full bg-[#1B365D] text-white font-bold flex items-center justify-center mx-auto text-xs">
                      2
                    </div>
                    <div className="text-[11px] font-bold text-[#1B365D] mt-1">Under State Review</div>
                    <div className="text-[10px] text-slate-500">Revenue Nodal Desk</div>
                  </div>
                  <div className="h-0.5 w-12 bg-slate-300" />
                  <div className="flex-1">
                    <div className={`w-6 h-6 rounded-full font-bold flex items-center justify-center mx-auto text-xs ${
                      selectedProposal.stateApprovalStatus === "Approved"
                        ? "bg-emerald-600 text-white"
                        : selectedProposal.stateApprovalStatus === "Rejected"
                        ? "bg-rose-600 text-white"
                        : "bg-slate-200 text-slate-600"
                    }`}>
                      3
                    </div>
                    <div className="text-[11px] font-bold text-slate-700 mt-1">
                      {selectedProposal.stateApprovalStatus === "Approved"
                        ? "Approved"
                        : selectedProposal.stateApprovalStatus === "Rejected"
                        ? "Rejected"
                        : "Final Decision"}
                    </div>
                    <div className="text-[10px] text-slate-500">In-Principle Clear</div>
                  </div>
                </div>
              </div>

              {/* Section 1: Basic Information */}
              <div className="border border-slate-200 rounded-lg p-3 space-y-2">
                <h4 className="font-bold text-slate-900 text-xs flex items-center gap-1.5 border-b pb-1.5">
                  <Building2 className="w-3.5 h-3.5 text-[#1B365D]" />
                  1. Basic Project Information
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-slate-500 text-[11px] block">Project Name</span>
                    <span className="font-bold text-slate-900 text-xs">{selectedProposal.name}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[11px] block">Project Type / Sector</span>
                    <span className="font-semibold text-slate-800">{selectedProposal.type}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-slate-500 text-[11px] block">Purpose & Description</span>
                    <span className="text-slate-700 leading-relaxed">
                      {selectedProposal.description || "Linear infrastructure development requiring contiguous private and government land parcels for multi-modal corridor."}
                    </span>
                  </div>
                </div>
              </div>

              {/* Section 2: Requiring Body Details */}
              <div className="border border-slate-200 rounded-lg p-3 space-y-2">
                <h4 className="font-bold text-slate-900 text-xs flex items-center gap-1.5 border-b pb-1.5">
                  <Building className="w-3.5 h-3.5 text-[#1B365D]" />
                  2. Requiring Body & Department
                </h4>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <span className="text-slate-500 text-[11px] block">Organization / Authority</span>
                    <span className="font-bold text-slate-900">{selectedProposal.requiringBody}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[11px] block">Ministry / Department</span>
                    <span className="font-semibold text-slate-800">{selectedProposal.ministry || "Ministry of Railways / MoRTH"}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[11px] block">Contact Officer</span>
                    <span className="font-semibold text-slate-800">{selectedProposal.requiringBodyUser || "Shri Alok N. Sharma (CPM)"}</span>
                  </div>
                </div>
              </div>

              {/* Section 3: Land Requirement Details */}
              <div className="border border-slate-200 rounded-lg p-3 space-y-2">
                <h4 className="font-bold text-slate-900 text-xs flex items-center gap-1.5 border-b pb-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#1B365D]" />
                  3. Land Requirement & Location
                </h4>
                <div className="grid grid-cols-4 gap-3">
                  <div>
                    <span className="text-slate-500 text-[11px] block">Total Land Required</span>
                    <span className="font-bold text-slate-900 text-sm text-[#1B365D]">
                      {selectedProposal.landRequired} Acres
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[11px] block">District</span>
                    <span className="font-semibold text-slate-800">{selectedProposal.district}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[11px] block">Taluka / Sub-division</span>
                    <span className="font-semibold text-slate-800">{selectedProposal.taluka || "All Talukas"}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[11px] block">Estimated Parcels</span>
                    <span className="font-semibold text-slate-800">{selectedProposal.totalParcels || 84} Parcels</span>
                  </div>
                  <div className="col-span-4">
                    <span className="text-slate-500 text-[11px] block">Notified Villages</span>
                    <span className="font-medium text-slate-700">
                      {Array.isArray(selectedProposal.villages)
                        ? selectedProposal.villages.join(", ")
                        : "Rampura, Navli, Mogar, Vasad, Samarkha"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Section 4: Justification & Public Benefit */}
              <div className="border border-slate-200 rounded-lg p-3 space-y-2">
                <h4 className="font-bold text-slate-900 text-xs flex items-center gap-1.5 border-b pb-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#1B365D]" />
                  4. Project Justification & Public Purpose (Section 2/4 RFCTLARR)
                </h4>
                <div className="space-y-1.5 text-slate-700">
                  <div>
                    <span className="text-slate-500 text-[11px] block">Detailed Justification</span>
                    <p className="leading-relaxed">
                      {selectedProposal.justification ||
                        "Strategic high-density freight rail link bypassing urban bottlenecks, eliminating road level crossings, and boosting regional industrial cargo handling capacity."}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <div>
                      <span className="text-slate-500 text-[11px] block">Public Benefit Category</span>
                      <span className="font-semibold text-slate-800">Priority National Infrastructure</span>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[11px] block">Expected Project Cost</span>
                      <span className="font-bold text-[#C5A059]">{selectedProposal.estimatedCost || "₹ 345.50 Cr"}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 5: Attached Documents */}
              <div className="border border-slate-200 rounded-lg p-3 space-y-2">
                <h4 className="font-bold text-slate-900 text-xs flex items-center gap-1.5 border-b pb-1.5">
                  <FileText className="w-3.5 h-3.5 text-[#1B365D]" />
                  5. Statutory Attachments & Documents
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center justify-between p-2 bg-slate-50 border rounded text-[11px]">
                    <span className="font-medium text-slate-800 truncate">Detailed_Project_Report_DPR.pdf</span>
                    <button className="text-[#1B365D] hover:underline flex items-center gap-0.5 cursor-pointer">
                      <Download className="w-3 h-3" /> View
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-slate-50 border rounded text-[11px]">
                    <span className="font-medium text-slate-800 truncate">Cadastral_Alignment_Map.pdf</span>
                    <button className="text-[#1B365D] hover:underline flex items-center gap-0.5 cursor-pointer">
                      <Download className="w-3 h-3" /> View
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-slate-50 border rounded text-[11px]">
                    <span className="font-medium text-slate-800 truncate">Land_Requirement_Matrix.xlsx</span>
                    <button className="text-[#1B365D] hover:underline flex items-center gap-0.5 cursor-pointer">
                      <Download className="w-3 h-3" /> View
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-slate-50 border rounded text-[11px]">
                    <span className="font-medium text-slate-800 truncate">Administrative_Sanction_Order.pdf</span>
                    <button className="text-[#1B365D] hover:underline flex items-center gap-0.5 cursor-pointer">
                      <Download className="w-3 h-3" /> View
                    </button>
                  </div>
                </div>
              </div>

              {/* State Officer Remarks Box */}
              <div>
                <label className="block font-bold text-slate-800 mb-1">
                  State Nodal Officer Official Remarks & Instructions <span className="text-rose-600">*</span>
                </label>
                <textarea
                  rows={3}
                  value={reviewRemarks}
                  onChange={(e) => setReviewRemarks(e.target.value)}
                  placeholder="Enter statutory clearance remarks, revenue alignment conditions, or clarifications required from Requiring Body..."
                  className="w-full p-2.5 border border-slate-300 rounded-lg text-xs text-slate-900 focus:ring-2 focus:ring-[#1B365D]"
                />
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="bg-slate-50 p-4 border-t border-slate-200 rounded-b-lg flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setSelectedProposal(null)}
                className="text-xs text-slate-600 hover:text-slate-900 font-semibold cursor-pointer"
              >
                Cancel / Close
              </button>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => executeDecision(selectedProposal.id, "Rejected")}
                  className="bg-rose-700 hover:bg-rose-800 text-white px-3.5 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 shadow-2xs cursor-pointer"
                >
                  <XCircle className="w-3.5 h-3.5" />
                  <span>Reject Proposal</span>
                </button>

                <button
                  type="button"
                  onClick={() => executeDecision(selectedProposal.id, "Returned for Clarification")}
                  className="bg-amber-600 hover:bg-amber-700 text-white px-3.5 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 shadow-2xs cursor-pointer"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Return for Clarification</span>
                </button>

                <button
                  type="button"
                  onClick={() => executeDecision(selectedProposal.id, "Approved")}
                  className="bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-1.5 rounded text-xs font-bold flex items-center gap-1.5 shadow-2xs cursor-pointer"
                >
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Approve Proposal</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
