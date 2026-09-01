import React, { useState } from "react";
import { useApp } from "../../context/AppContext.jsx";
import { StatusBadge } from "../common/StatusBadge.jsx";
import { WorkflowProgressBar } from "../common/WorkflowProgressBar.jsx";
import {
  FileText,
  MapPin,
  Clock,
  CheckCircle,
  AlertTriangle,
  Building,
  Layers,
  Award,
  CreditCard,
  HeartHandshake,
  ClipboardList,
  Eye,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Send,
  Lock,
  ArrowRight
} from "lucide-react";

export const Page06ProjectDetailWorkflow = () => {
  const {
    currentProject,
    workflowActiveTab,
    setWorkflowActiveTab,
    parcels,
    objections,
    siaTasks,
    rnrSchemes,
    rnrFamilies,
    gazetteNotifications,
    dbtPayments,
    possessionMemos,
    currentUser,
    navigateTo,
    handleStateApproval
  } = useApp();

  const [stateApprovalRemarks, setStateApprovalRemarks] = useState("");
  const [approvalFeedback, setApprovalFeedback] = useState("");

  const projectParcels = parcels.filter((p) => p.projectId === currentProject.id);
  const projectObjections = objections.filter((o) => o.projectId === currentProject.id);
  const projectSiaTasks = siaTasks.filter((s) => s.projectId === currentProject.id);
  const projectNotifs = gazetteNotifications.filter((n) => n.projectId === currentProject.id);
  const projectRnR = rnrSchemes.filter((r) => r.projectId === currentProject.id);
  const projectPayments = dbtPayments.filter((p) => projectParcels.some((prc) => prc.awardId === p.awardId));
  const projectPossessions = possessionMemos.filter((p) => p.projectId === currentProject.id);

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "state-approval", label: "State Approval" },
    { id: "parcels", label: "Parcels" },
    { id: "land-verification", label: "Land Verification" },
    { id: "sia-status", label: "SIA Status" },
    { id: "notifications", label: "Notifications" },
    { id: "objections", label: "Objections" },
    { id: "rnr", label: "R&R Scheme" },
    { id: "compensation", label: "Compensation" },
    { id: "award", label: "Award" },
    { id: "payment", label: "Payment" },
    { id: "possession", label: "Possession" }
  ];

  return (
    <div className="space-y-6 pb-12">
      {currentUser.role === "central" && (
        <div className="bg-slate-900 text-white px-4 py-2.5 rounded-md border border-slate-800 flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-2 text-xs">
            <span className="bg-[#C5A059] text-slate-950 font-bold px-2 py-0.5 rounded text-[10px] uppercase tracking-wider">
              Central Monitoring Mode
            </span>
            <span className="text-slate-200">
              National Oversight View • Read-only inspection of District & State operational workflow
            </span>
          </div>
          <button
            onClick={() => navigateTo("central-dashboard")}
            className="text-xs text-amber-400 hover:text-amber-300 font-semibold underline underline-offset-2"
          >
            ← Return to National Dashboard
          </button>
        </div>
      )}

      {/* 1. Project Detail Header */}
      <div className="bg-white border border-slate-300 rounded p-5 shadow-xs space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 border-b border-slate-200 pb-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="text-xs font-mono font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                {currentProject.id}
              </span>
              <StatusBadge status={currentProject.status} size="md" />
              <StatusBadge status={currentProject.riskLevel} size="md" />
              <span className="text-xs bg-blue-50 text-blue-800 font-semibold px-2 py-0.5 rounded border border-blue-200">
                {currentProject.type}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
              {currentProject.name}
            </h1>
            <div className="text-xs text-slate-600 mt-1 flex flex-wrap items-center gap-3">
              <span><strong>State:</strong> {currentProject.state}</span>
              <span>•</span>
              <span><strong>District:</strong> {currentProject.district} ({currentProject.taluka})</span>
              <span>•</span>
              <span><strong>Requiring Body:</strong> {currentProject.requiringBody}</span>
            </div>
          </div>

          {/* Countdown & Deadline Box */}
          <div className="bg-slate-900 text-white p-3.5 rounded border border-slate-800 flex items-center gap-4 shrink-0">
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                Statutory Target Date
              </div>
              <div className="text-sm font-bold text-amber-400 font-mono">
                {currentProject.targetPossessionDate}
              </div>
            </div>
            <div className="border-l border-slate-700 pl-3">
              <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                Time Remaining
              </div>
              <div className="text-base font-bold text-emerald-400 font-mono">
                {currentProject.daysToDeadline} Days
              </div>
            </div>
          </div>
        </div>

        {/* Land & Progress Stats Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="bg-slate-50 border p-2.5 rounded">
            <span className="text-slate-500 block text-[11px]">Land Required / Selected</span>
            <span className="text-sm font-bold text-slate-900">{currentProject.landRequired} Acres</span>
          </div>
          <div className="bg-slate-50 border p-2.5 rounded">
            <span className="text-slate-500 block text-[11px]">Land Possessed</span>
            <span className="text-sm font-bold text-emerald-800">{currentProject.landAcquired} Acres</span>
          </div>
          <div className="bg-slate-50 border p-2.5 rounded">
            <span className="text-slate-500 block text-[11px]">Overall Stage Progress</span>
            <span className="text-sm font-bold text-[#1e3a8a]">{currentProject.progressPercentage}%</span>
          </div>
          <div className="bg-slate-50 border p-2.5 rounded">
            <span className="text-slate-500 block text-[11px]">Disbursed / Budget</span>
            <span className="text-sm font-bold text-amber-800">{currentProject.disbursedCost}</span>
          </div>
        </div>
      </div>

      {/* 2. Horizontal Statutory Workflow Progress Bar */}
      <WorkflowProgressBar
        currentStageIndex={currentProject.currentStageIndex}
        onSelectStage={(tabName) => {
          const matchedTab = tabs.find((t) => t.label.toLowerCase().includes(tabName.toLowerCase()));
          if (matchedTab) setWorkflowActiveTab(matchedTab.id);
        }}
      />

      {/* 3. 12 Tabs Navigation */}
      <div className="bg-white border border-slate-300 rounded shadow-xs overflow-hidden">
        {/* Tab Headers */}
        <div className="flex border-b border-slate-200 overflow-x-auto bg-slate-50 text-xs font-semibold">
          {tabs.map((tab) => {
            const isActive = workflowActiveTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setWorkflowActiveTab(tab.id)}
                className={`py-3 px-4 whitespace-nowrap transition-colors border-b-2 ${
                  isActive
                    ? "border-[#1e3a8a] bg-white text-[#1e3a8a] font-bold shadow-2xs"
                    : "border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100/60"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content Area */}
        <div className="p-5 text-xs text-slate-800 space-y-4">
          {/* TAB 1: OVERVIEW */}
          {workflowActiveTab === "overview" && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Project Details Table */}
                <div className="border border-slate-200 rounded p-4 space-y-3">
                  <h3 className="font-bold text-sm text-slate-900 border-b pb-2">
                    Project Master Metadata
                  </h3>
                  <table className="w-full text-xs">
                    <tbody className="divide-y divide-slate-100">
                      <tr>
                        <td className="py-1.5 font-semibold text-slate-500 w-1/3">Project ID</td>
                        <td className="py-1.5 font-mono font-bold text-slate-900">{currentProject.id}</td>
                      </tr>
                      <tr>
                        <td className="py-1.5 font-semibold text-slate-500">Ministry</td>
                        <td className="py-1.5 text-slate-900">{currentProject.ministry}</td>
                      </tr>
                      <tr>
                        <td className="py-1.5 font-semibold text-slate-500">Requiring Body</td>
                        <td className="py-1.5 text-slate-900">{currentProject.requiringBody}</td>
                      </tr>
                      <tr>
                        <td className="py-1.5 font-semibold text-slate-500">Officer in Charge</td>
                        <td className="py-1.5 text-slate-900">{currentProject.requiringBodyUser}</td>
                      </tr>
                      <tr>
                        <td className="py-1.5 font-semibold text-slate-500">Villages Covered</td>
                        <td className="py-1.5 text-slate-900">{currentProject.villages.join(", ")}</td>
                      </tr>
                      <tr>
                        <td className="py-1.5 font-semibold text-slate-500">Statutory Justification</td>
                        <td className="py-1.5 text-slate-700 leading-relaxed">{currentProject.justification}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Statutory Timeline Table */}
                <div className="border border-slate-200 rounded p-4 space-y-3">
                  <h3 className="font-bold text-sm text-slate-900 border-b pb-2">
                    Statutory Timelines & Milestones
                  </h3>
                  <table className="w-full text-xs">
                    <thead className="bg-slate-50 text-slate-600 font-semibold uppercase text-[10px]">
                      <tr>
                        <th className="py-1.5 px-2 text-left">Stage</th>
                        <th className="py-1.5 px-2 text-left">Status</th>
                        <th className="py-1.5 px-2 text-left">Target Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr>
                        <td className="py-1.5 px-2 font-medium">1. Project Proposal & State Approval</td>
                        <td className="py-1.5 px-2"><StatusBadge status="Approved" size="xs" /></td>
                        <td className="py-1.5 px-2 font-mono">2026-03-02</td>
                      </tr>
                      <tr>
                        <td className="py-1.5 px-2 font-medium">2. Land Selection (GIS Parcels)</td>
                        <td className="py-1.5 px-2"><StatusBadge status="Completed" size="xs" /></td>
                        <td className="py-1.5 px-2 font-mono">2026-03-20</td>
                      </tr>
                      <tr>
                        <td className="py-1.5 px-2 font-medium">3. Land Verification (Collector)</td>
                        <td className="py-1.5 px-2"><StatusBadge status="Verified" size="xs" /></td>
                        <td className="py-1.5 px-2 font-mono">2026-04-10</td>
                      </tr>
                      <tr>
                        <td className="py-1.5 px-2 font-medium">4. Social Impact Assessment (SIA)</td>
                        <td className="py-1.5 px-2"><StatusBadge status="Completed" size="xs" /></td>
                        <td className="py-1.5 px-2 font-mono">2026-05-30</td>
                      </tr>
                      <tr>
                        <td className="py-1.5 px-2 font-medium">5. Section 11(1) Preliminary Gazette</td>
                        <td className="py-1.5 px-2"><StatusBadge status="Published" size="xs" /></td>
                        <td className="py-1.5 px-2 font-mono">2026-03-15</td>
                      </tr>
                      <tr>
                        <td className="py-1.5 px-2 font-medium">6. Objections & Section 15 Hearings</td>
                        <td className="py-1.5 px-2"><StatusBadge status="Hearing Scheduled" size="xs" /></td>
                        <td className="py-1.5 px-2 font-mono text-amber-700 font-bold">2026-08-28</td>
                      </tr>
                      <tr>
                        <td className="py-1.5 px-2 font-medium">7. Final Possession & Handover</td>
                        <td className="py-1.5 px-2"><StatusBadge status="Pending" size="xs" /></td>
                        <td className="py-1.5 px-2 font-mono">{currentProject.targetPossessionDate}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: STATE APPROVAL */}
          {workflowActiveTab === "state-approval" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b pb-3">
                <div>
                  <h3 className="font-bold text-sm text-slate-900">State Administrative Approval Status</h3>
                  <div className="text-slate-500">Approval under State Revenue & Land Allocation Rules</div>
                </div>
                <StatusBadge status={currentProject.stateApprovalStatus} size="md" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded border border-slate-200 space-y-2">
                  <div className="font-semibold text-slate-800">Proposal Submission Record</div>
                  <div>• <strong>Submitted By:</strong> {currentProject.requiringBodyUser} ({currentProject.requiringBody})</div>
                  <div>• <strong>Submission Date:</strong> {currentProject.submittedDate}</div>
                  <div>• <strong>Approval Date:</strong> {currentProject.stateApprovalDate || "Under Review"}</div>
                  <div>• <strong>State Remarks:</strong> {currentProject.stateRemarks || "Pending State Nodal Officer review."}</div>
                </div>

                {/* State Authority Action Box */}
                <div className="bg-white p-4 rounded border border-slate-300 space-y-3">
                  <h4 className="font-bold text-slate-900">State Authority Review Action</h4>
                  <p className="text-slate-600 text-[11px]">
                    State Nodal Officers have statutory authority to grant in-principle administrative clearance or return proposals with queries.
                  </p>

                  <textarea
                    rows={2}
                    value={stateApprovalRemarks}
                    onChange={(e) => setStateApprovalRemarks(e.target.value)}
                    placeholder="Enter official review remarks / conditions..."
                    className="w-full p-2 border border-slate-300 rounded text-xs"
                  />

                  {approvalFeedback && (
                    <div className="text-emerald-700 font-semibold text-xs">{approvalFeedback}</div>
                  )}

                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        handleStateApproval(currentProject.id, "Approved", stateApprovalRemarks || "Approved by State Nodal Officer");
                        setApprovalFeedback("Proposal marked as Approved.");
                      }}
                      className="bg-emerald-700 hover:bg-emerald-800 text-white px-3 py-1.5 rounded font-semibold text-xs"
                    >
                      Approve Proposal
                    </button>
                    <button
                      onClick={() => {
                        handleStateApproval(currentProject.id, "Rejected", stateApprovalRemarks || "Returned for revised alignment");
                        setApprovalFeedback("Proposal returned to Requiring Body.");
                      }}
                      className="bg-rose-700 hover:bg-rose-800 text-white px-3 py-1.5 rounded font-semibold text-xs"
                    >
                      Return / Reject
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PARCELS */}
          {workflowActiveTab === "parcels" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b pb-3">
                <div>
                  <h3 className="font-bold text-sm text-slate-900">Selected Revenue Land Parcels</h3>
                  <div className="text-slate-500">
                    Total Required: {currentProject.landRequired} Acres • Total Selected: {currentProject.landSelected} Acres
                  </div>
                </div>
                <button
                  onClick={() => navigateTo("gis-parcels")}
                  className="bg-[#1e3a8a] text-white px-3 py-1.5 rounded font-semibold text-xs flex items-center gap-1.5"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  View GIS Parcel Selection
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border border-slate-200">
                  <thead className="bg-slate-100 text-slate-800 font-semibold border-b uppercase text-[10px]">
                    <tr>
                      <th className="py-2.5 px-3 border-r">Survey No</th>
                      <th className="py-2.5 px-3 border-r">Village</th>
                      <th className="py-2.5 px-3 border-r">Area (Acres)</th>
                      <th className="py-2.5 px-3 border-r">Land Type</th>
                      <th className="py-2.5 px-3 border-r">Landowner / Khatedar</th>
                      <th className="py-2.5 px-3 border-r">Status</th>
                      <th className="py-2.5 px-3 border-r">Risk</th>
                      <th className="py-2.5 px-3 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {projectParcels.map((prc) => (
                      <tr key={prc.id} className="hover:bg-slate-50">
                        <td className="py-2 px-3 border-r font-mono font-bold text-slate-900">{prc.surveyNumber}</td>
                        <td className="py-2 px-3 border-r">{prc.village}</td>
                        <td className="py-2 px-3 border-r font-semibold">{prc.areaAcres}</td>
                        <td className="py-2 px-3 border-r text-slate-600">{prc.landType}</td>
                        <td className="py-2 px-3 border-r font-medium text-slate-900">{prc.ownerName}</td>
                        <td className="py-2 px-3 border-r"><StatusBadge status={prc.status} size="xs" /></td>
                        <td className="py-2 px-3 border-r"><StatusBadge status={prc.aiRiskLevel} size="xs" /></td>
                        <td className="py-2 px-3 text-center">
                          <button
                            onClick={() => navigateTo("compensation")}
                            className="text-[#1e3a8a] font-semibold hover:underline"
                          >
                            Valuation →
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: LAND VERIFICATION */}
          {workflowActiveTab === "land-verification" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b pb-3">
                <div>
                  <h3 className="font-bold text-sm text-slate-900">Revenue Record Verification Summary</h3>
                  <div className="text-slate-500">Cross-verified against e-Dhara RoR database & mutation registers</div>
                </div>
                <button
                  onClick={() => navigateTo("land-verification")}
                  className="bg-[#1e3a8a] text-white px-3 py-1.5 rounded font-semibold text-xs flex items-center gap-1"
                >
                  Open Land Verification Module →
                </button>
              </div>

              <div className="grid grid-cols-4 gap-3 text-xs">
                <div className="border p-2 rounded bg-slate-50">
                  <span className="text-slate-500 block text-[10px]">Total Parcels</span>
                  <span className="font-bold text-sm">{projectParcels.length}</span>
                </div>
                <div className="border p-2 rounded bg-emerald-50 text-emerald-900">
                  <span className="block text-[10px]">Verified Clear Title</span>
                  <span className="font-bold text-sm">
                    {projectParcels.filter((p) => p.verificationStatus === "Verified").length}
                  </span>
                </div>
                <div className="border p-2 rounded bg-amber-50 text-amber-900">
                  <span className="block text-[10px]">Pending Verification</span>
                  <span className="font-bold text-sm">0</span>
                </div>
                <div className="border p-2 rounded bg-rose-50 text-rose-900">
                  <span className="block text-[10px]">Flagged / Dispute</span>
                  <span className="font-bold text-sm">
                    {projectParcels.filter((p) => p.verificationStatus === "Flagged").length}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: SIA STATUS */}
          {workflowActiveTab === "sia-status" && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b pb-3">
                <div>
                  <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                    <ClipboardList className="w-4 h-4 text-[#1B365D]" />
                    <span>Social Impact Assessment (SIA) Review & Status (RFCTLARR Section 4)</span>
                  </h3>
                  <div className="text-xs text-slate-500">Baseline Socio-Economic Survey of Affected Families & Public Hearings</div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => navigateTo("sia-tasks")}
                    className="bg-[#1B365D] hover:bg-[#12243f] text-white px-3 py-1.5 rounded font-semibold text-xs flex items-center gap-1.5 shadow-2xs"
                  >
                    <ClipboardList className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>Open SIA Tasks</span>
                  </button>
                  <button
                    onClick={() => navigateTo("sia-survey")}
                    className="bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 px-3 py-1.5 rounded font-semibold text-xs"
                  >
                    <span>SIA Survey Form</span>
                  </button>
                </div>
              </div>

              {/* SIA Metrics Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
                <div className="border border-slate-200 p-3 rounded bg-white shadow-2xs">
                  <span className="text-slate-500 block text-[10px] uppercase font-semibold">Total Families Surveyed</span>
                  <span className="font-bold text-slate-900 text-lg">145</span>
                  <div className="text-[10px] text-slate-500 mt-0.5">Across 4 Revenue Villages</div>
                </div>
                <div className="border border-slate-200 p-3 rounded bg-emerald-50 text-emerald-950 shadow-2xs">
                  <span className="block text-[10px] uppercase font-semibold text-emerald-700">Completed</span>
                  <span className="font-bold text-emerald-800 text-lg">132</span>
                  <div className="text-[10px] text-emerald-700 mt-0.5">GPS & Evidence Verified</div>
                </div>
                <div className="border border-slate-200 p-3 rounded bg-amber-50 text-amber-950 shadow-2xs">
                  <span className="block text-[10px] uppercase font-semibold text-amber-700">Pending Survey</span>
                  <span className="font-bold text-amber-800 text-lg">13</span>
                  <div className="text-[10px] text-amber-700 mt-0.5">Field Follow-up active</div>
                </div>
                <div className="border border-slate-200 p-3 rounded bg-blue-50 text-blue-950 shadow-2xs">
                  <span className="block text-[10px] uppercase font-semibold text-blue-700">Agriculture Dependent</span>
                  <span className="font-bold text-blue-900 text-lg">76</span>
                  <div className="text-[10px] text-blue-700 mt-0.5">Primary Livelihood</div>
                </div>
                <div className="border border-slate-200 p-3 rounded bg-purple-50 text-purple-950 shadow-2xs">
                  <span className="block text-[10px] uppercase font-semibold text-purple-700">Displacement Required</span>
                  <span className="font-bold text-purple-900 text-lg">84 Families</span>
                  <div className="text-[10px] text-purple-700 mt-0.5">R&R Housing Scheme</div>
                </div>
              </div>

              {/* Survey Summary Table */}
              <div className="bg-white border border-slate-300 rounded shadow-xs overflow-hidden">
                <div className="bg-slate-100 px-3.5 py-2 border-b flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-800 uppercase">Survey Summary Register</span>
                  <span className="text-[11px] text-slate-500 font-mono">Real-time SIA Officer Feed</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-50 text-slate-700 border-b text-[11px] uppercase font-semibold">
                      <tr>
                        <th className="py-2.5 px-3 border-r">Family</th>
                        <th className="py-2.5 px-3 border-r">Survey Officer</th>
                        <th className="py-2.5 px-3 border-r">Status</th>
                        <th className="py-2.5 px-3 border-r">Submitted Date</th>
                        <th className="py-2.5 px-3 text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      <tr className="hover:bg-slate-50">
                        <td className="py-2.5 px-3 border-r font-bold text-slate-900">
                          Patel Family
                          <div className="text-[10px] text-slate-500 font-normal">Survey 142/A (Rampura) • 5 Members</div>
                        </td>
                        <td className="py-2.5 px-3 border-r text-slate-700">Dr. Sunita Deshmukh</td>
                        <td className="py-2.5 px-3 border-r"><StatusBadge status="Completed" size="xs" /></td>
                        <td className="py-2.5 px-3 border-r font-mono text-slate-600">24-Aug-2026</td>
                        <td className="py-2.5 px-3 text-center">
                          <button onClick={() => navigateTo("sia-tasks")} className="text-[#1B365D] font-bold hover:underline">
                            Inspect →
                          </button>
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="py-2.5 px-3 border-r font-bold text-slate-900">
                          Shah Family
                          <div className="text-[10px] text-slate-500 font-normal">Survey 145/1 (Rampura) • 4 Members</div>
                        </td>
                        <td className="py-2.5 px-3 border-r text-slate-700">Dr. Sunita Deshmukh</td>
                        <td className="py-2.5 px-3 border-r"><StatusBadge status="Completed" size="xs" /></td>
                        <td className="py-2.5 px-3 border-r font-mono text-slate-600">24-Aug-2026</td>
                        <td className="py-2.5 px-3 text-center">
                          <button onClick={() => navigateTo("sia-tasks")} className="text-[#1B365D] font-bold hover:underline">
                            Inspect →
                          </button>
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="py-2.5 px-3 border-r font-bold text-slate-900">
                          Solanki Family
                          <div className="text-[10px] text-slate-500 font-normal">Survey 88 (Bandhani) • 6 Members</div>
                        </td>
                        <td className="py-2.5 px-3 border-r text-slate-700">Shri Arvind Patel</td>
                        <td className="py-2.5 px-3 border-r"><StatusBadge status="Completed" size="xs" /></td>
                        <td className="py-2.5 px-3 border-r font-mono text-slate-600">23-Aug-2026</td>
                        <td className="py-2.5 px-3 text-center">
                          <button onClick={() => navigateTo("sia-tasks")} className="text-[#1B365D] font-bold hover:underline">
                            Inspect →
                          </button>
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="py-2.5 px-3 border-r font-bold text-slate-900">
                          Vaghela Family
                          <div className="text-[10px] text-slate-500 font-normal">Survey 105/A (Agas) • 3 Members</div>
                        </td>
                        <td className="py-2.5 px-3 border-r text-slate-700">Dr. Sunita Deshmukh</td>
                        <td className="py-2.5 px-3 border-r"><StatusBadge status="Pending" size="xs" /></td>
                        <td className="py-2.5 px-3 border-r font-mono text-slate-600">22-Aug-2026</td>
                        <td className="py-2.5 px-3 text-center">
                          <button onClick={() => navigateTo("sia-tasks")} className="text-[#1B365D] font-bold hover:underline">
                            Inspect →
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Collector Actions on SIA */}
              <div className="bg-slate-50 border border-slate-300 rounded p-4 space-y-3">
                <div className="font-bold text-xs text-slate-900 flex items-center justify-between">
                  <span>Collector Statutory SIA Actions (Section 7 Appraisal)</span>
                  <span className="text-[11px] text-emerald-700 font-semibold">Status: SIA Accepted & Forwarded</span>
                </div>
                <div className="flex flex-wrap gap-2 text-xs">
                  <button
                    onClick={() => navigateTo("sia-tasks")}
                    className="bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 px-3 py-1.5 rounded font-semibold"
                  >
                    View SIA Report
                  </button>
                  <button
                    onClick={() => navigateTo("sia-tasks")}
                    className="bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 px-3 py-1.5 rounded font-semibold"
                  >
                    Review Summary
                  </button>
                  <button
                    onClick={() => {
                      alert("Clarification request sent to SIA Survey Unit.");
                    }}
                    className="bg-amber-100 border border-amber-300 text-amber-900 hover:bg-amber-200 px-3 py-1.5 rounded font-semibold"
                  >
                    Send Back for Clarification
                  </button>
                  <button
                    onClick={() => {
                      alert("SIA Report approved and accepted by District Collector.");
                    }}
                    className="bg-emerald-700 hover:bg-emerald-800 text-white px-3.5 py-1.5 rounded font-semibold shadow-2xs"
                  >
                    ✓ Accept SIA Status
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: NOTIFICATIONS */}
          {workflowActiveTab === "notifications" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b pb-3">
                <div>
                  <h3 className="font-bold text-sm text-slate-900">Section 11 & Section 19 Notifications</h3>
                  <div className="text-slate-500">Official Gazette publications and public proclamations</div>
                </div>
                <button
                  onClick={() => navigateTo("gazette-notifications")}
                  className="bg-[#1e3a8a] text-white px-3 py-1.5 rounded font-semibold text-xs flex items-center gap-1"
                >
                  Section 11/19 Gazette Module →
                </button>
              </div>

              <div className="space-y-2">
                {projectNotifs.map((n) => (
                  <div key={n.id} className="p-3 border rounded bg-slate-50 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-900">{n.notificationType}</div>
                      <div className="text-[11px] text-slate-600 font-mono">Gazette No: {n.gazetteNumber} • Issued: {n.dateOfIssue}</div>
                    </div>
                    <StatusBadge status={n.status} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: OBJECTIONS */}
          {workflowActiveTab === "objections" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b pb-3">
                <div>
                  <h3 className="font-bold text-sm text-slate-900">Section 15 Objections & Collector Hearings</h3>
                  <div className="text-slate-500">Claims submitted regarding land valuation and field severance</div>
                </div>
                <button
                  onClick={() => navigateTo("objections")}
                  className="bg-[#1e3a8a] text-white px-3 py-1.5 rounded font-semibold text-xs flex items-center gap-1"
                >
                  Manage Objections →
                </button>
              </div>

              <div className="space-y-2">
                {projectObjections.map((obj) => (
                  <div key={obj.id} className="p-3 border rounded bg-white flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-900">{obj.objectorName} (Survey {obj.surveyNumber}, {obj.village})</div>
                      <div className="text-[11px] text-slate-600">{obj.objectionType}</div>
                      <div className="text-[10px] text-amber-700 font-semibold mt-0.5">Hearing: {obj.hearingDate} at {obj.hearingTime}</div>
                    </div>
                    <StatusBadge status={obj.status} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 8: R&R */}
          {workflowActiveTab === "rnr" && (
            <div className="space-y-5">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b pb-3">
                <div>
                  <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                    <HeartHandshake className="w-4 h-4 text-[#1B365D]" />
                    <span>Rehabilitation & Resettlement Scheme (RFCTLARR Sec 16)</span>
                  </h3>
                  <div className="text-xs text-slate-500">Project-level R&R entitlements, statutory timeline and fund status</div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => navigateTo("rnr-entitlements")}
                    className="bg-[#1B365D] hover:bg-[#142946] text-white px-3 py-1.5 rounded font-semibold text-xs flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
                  >
                    <HeartHandshake className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>Manage R&R Scheme</span>
                  </button>
                  <button
                    onClick={() => navigateTo("rnr-dashboard")}
                    className="bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 px-3 py-1.5 rounded font-semibold text-xs shadow-2xs transition-colors cursor-pointer"
                  >
                    <span>R&R Dashboard</span>
                  </button>
                </div>
              </div>

              {/* 1. Project R&R Summary Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
                <div className="p-3 border border-[#D1D5DB] rounded bg-white shadow-2xs">
                  <span className="text-slate-500 block text-[10px] uppercase font-semibold">Affected Families</span>
                  <span className="font-bold text-slate-900 text-lg">250</span>
                </div>
                <div className="p-3 border border-[#D1D5DB] rounded bg-white shadow-2xs">
                  <span className="text-slate-500 block text-[10px] uppercase font-semibold">Families Assessed</span>
                  <span className="font-bold text-blue-900 text-lg">210</span>
                </div>
                <div className="p-3 border border-[#D1D5DB] rounded bg-white shadow-2xs">
                  <span className="text-slate-500 block text-[10px] uppercase font-semibold">Eligible Families</span>
                  <span className="font-bold text-emerald-800 text-lg">185</span>
                </div>
                <div className="p-3 border border-[#D1D5DB] rounded bg-white shadow-2xs">
                  <span className="text-slate-500 block text-[10px] uppercase font-semibold">Entitlements Approved</span>
                  <span className="font-bold text-emerald-700 text-lg">143</span>
                </div>
                <div className="p-3 border border-[#D1D5DB] rounded bg-white shadow-2xs">
                  <span className="text-slate-500 block text-[10px] uppercase font-semibold">Pending</span>
                  <span className="font-bold text-amber-700 text-lg">42</span>
                </div>
              </div>

              {/* 2. R&R Workflow Timeline */}
              <div className="bg-slate-50 border border-[#D1D5DB] rounded p-4 space-y-2 text-xs">
                <div className="font-bold text-slate-900 uppercase text-[10px] tracking-wider border-b border-slate-200 pb-1">
                  R&R Statutory Workflow Timeline
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 text-center pt-1">
                  <div className="p-2 bg-emerald-50 border border-emerald-200 rounded text-emerald-900">
                    <div className="font-bold text-[11px]">SIA Completed</div>
                    <div className="text-[10px] text-emerald-700 font-bold">✓ Done</div>
                  </div>
                  <div className="p-2 bg-emerald-50 border border-emerald-200 rounded text-emerald-900">
                    <div className="font-bold text-[11px]">Families Identified</div>
                    <div className="text-[10px] text-emerald-700 font-bold">✓ Done</div>
                  </div>
                  <div className="p-2 bg-emerald-50 border border-emerald-200 rounded text-emerald-900">
                    <div className="font-bold text-[11px]">R&R Assessment</div>
                    <div className="text-[10px] text-emerald-700 font-bold">✓ Done</div>
                  </div>
                  <div className="p-2 bg-emerald-50 border border-emerald-200 rounded text-emerald-900">
                    <div className="font-bold text-[11px]">Scheme Drafted</div>
                    <div className="text-[10px] text-emerald-700 font-bold">✓ Done</div>
                  </div>
                  <div className="p-2 bg-amber-50 border-2 border-amber-400 rounded text-amber-950 font-bold">
                    <div className="text-[11px]">Scheme Under Approval</div>
                    <div className="text-[10px] text-amber-800">● In Progress</div>
                  </div>
                  <div className="p-2 bg-white border border-slate-200 rounded text-slate-400">
                    <div className="text-[11px] font-semibold">Entitlement Disbursal</div>
                    <div className="text-[10px]">○ Pending</div>
                  </div>
                </div>
              </div>

              {/* 3. Family Entitlement Summary Table */}
              <div className="border border-[#D1D5DB] rounded bg-white shadow-2xs overflow-hidden text-xs">
                <div className="p-3 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
                  <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                    Family Entitlement Summary Table
                  </h4>
                  <button
                    onClick={() => navigateTo("rnr-entitlements")}
                    className="text-xs font-bold text-[#1B365D] hover:underline"
                  >
                    View All 250 Families →
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead className="bg-[#e2e8f0] text-slate-800 font-semibold border-b uppercase text-[10px]">
                      <tr>
                        <th className="py-2.5 px-3 border-r">Family</th>
                        <th className="py-2.5 px-3 border-r">Entitlement Amount</th>
                        <th className="py-2.5 px-3 border-r text-center">Approval</th>
                        <th className="py-2.5 px-3 border-r text-center">Fund Request</th>
                        <th className="py-2.5 px-3 text-center">Payment Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      <tr className="hover:bg-slate-50">
                        <td className="py-2.5 px-3 border-r font-bold text-slate-900">
                          Patel Family (Ramesh Patel)
                          <div className="text-[10px] text-slate-500 font-normal">FAM-101 • Rampura</div>
                        </td>
                        <td className="py-2.5 px-3 border-r font-mono font-bold text-slate-900">₹ 4,36,000</td>
                        <td className="py-2.5 px-3 border-r text-center">
                          <span className="bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 rounded text-[10px] border border-emerald-200">
                            Approved
                          </span>
                        </td>
                        <td className="py-2.5 px-3 border-r text-center">
                          <span className="bg-blue-50 text-blue-800 font-bold px-2 py-0.5 rounded text-[10px]">
                            Sent (RRF-2026-101)
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-center">
                          <span className="bg-amber-50 text-amber-800 font-bold px-2 py-0.5 rounded text-[10px] border border-amber-200">
                            Pending
                          </span>
                        </td>
                      </tr>

                      <tr className="hover:bg-slate-50">
                        <td className="py-2.5 px-3 border-r font-bold text-slate-900">
                          Shah Family (Suresh Shah)
                          <div className="text-[10px] text-slate-500 font-normal">FAM-102 • Rampura</div>
                        </td>
                        <td className="py-2.5 px-3 border-r font-mono font-bold text-slate-900">₹ 3,20,000</td>
                        <td className="py-2.5 px-3 border-r text-center">
                          <span className="bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 rounded text-[10px] border border-emerald-200">
                            Approved
                          </span>
                        </td>
                        <td className="py-2.5 px-3 border-r text-center">
                          <span className="bg-blue-50 text-blue-800 font-bold px-2 py-0.5 rounded text-[10px]">
                            Sent (RRF-2026-098)
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-center">
                          <span className="bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 rounded text-[10px] border border-emerald-200">
                            Processed
                          </span>
                        </td>
                      </tr>

                      <tr className="hover:bg-slate-50">
                        <td className="py-2.5 px-3 border-r font-bold text-slate-900">
                          Kumar Family (Meena Devi)
                          <div className="text-[10px] text-slate-500 font-normal">FAM-103 • Village A</div>
                        </td>
                        <td className="py-2.5 px-3 border-r font-mono font-bold text-slate-900">₹ 2,75,000</td>
                        <td className="py-2.5 px-3 border-r text-center">
                          <span className="bg-amber-50 text-amber-800 font-bold px-2 py-0.5 rounded text-[10px] border border-amber-200">
                            Pending
                          </span>
                        </td>
                        <td className="py-2.5 px-3 border-r text-center text-slate-400 font-bold">—</td>
                        <td className="py-2.5 px-3 text-center text-slate-400 font-bold">—</td>
                      </tr>

                      <tr className="hover:bg-slate-50">
                        <td className="py-2.5 px-3 border-r font-bold text-slate-900">
                          Rathod Family (Devendra Rathod)
                          <div className="text-[10px] text-slate-500 font-normal">FAM-104 • Bandhani</div>
                        </td>
                        <td className="py-2.5 px-3 border-r font-mono font-bold text-slate-900">₹ 1,11,000</td>
                        <td className="py-2.5 px-3 border-r text-center">
                          <span className="bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 rounded text-[10px] border border-emerald-200">
                            Approved
                          </span>
                        </td>
                        <td className="py-2.5 px-3 border-r text-center">
                          <span className="bg-blue-50 text-blue-800 font-bold px-2 py-0.5 rounded text-[10px]">
                            Sent (RRF-2026-095)
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-center">
                          <span className="bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 rounded text-[10px] border border-emerald-200">
                            Processed
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 4. R&R Fund Status & Actions */}
              <div className="bg-white border border-[#D1D5DB] rounded p-4 space-y-3 text-xs shadow-2xs">
                <div className="border-b border-slate-200 pb-2 flex items-center justify-between">
                  <h4 className="font-bold text-slate-900 uppercase text-xs tracking-wider">
                    R&R Fund Status
                  </h4>
                  <span className="text-[11px] text-slate-500 font-medium">
                    Escrow Head: 8443-Civil Deposits (R&R Corpus)
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
                  <div className="p-2.5 bg-slate-50 border border-slate-200 rounded">
                    <span className="text-slate-500 block text-[10px] uppercase">Total Approved Budget</span>
                    <span className="font-bold text-slate-900 text-sm">₹ 12.50 Cr</span>
                  </div>
                  <div className="p-2.5 bg-blue-50 border border-blue-200 rounded">
                    <span className="text-blue-700 block text-[10px] uppercase">Allocated</span>
                    <span className="font-bold text-blue-900 text-sm">₹ 8.20 Cr</span>
                  </div>
                  <div className="p-2.5 bg-amber-50 border border-amber-200 rounded">
                    <span className="text-amber-800 block text-[10px] uppercase">Requested for Release</span>
                    <span className="font-bold text-amber-900 text-sm">₹ 1.50 Cr</span>
                  </div>
                  <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded">
                    <span className="text-emerald-700 block text-[10px] uppercase">Disbursed</span>
                    <span className="font-bold text-emerald-900 text-sm">₹ 6.80 Cr</span>
                  </div>
                  <div className="p-2.5 bg-purple-50 border border-purple-200 rounded">
                    <span className="text-purple-700 block text-[10px] uppercase">Remaining</span>
                    <span className="font-bold text-purple-900 text-sm">₹ 5.70 Cr</span>
                  </div>
                </div>

                {/* R&R Officer Action Buttons */}
                <div className="pt-2 flex flex-wrap items-center justify-end gap-2 border-t border-slate-100">
                  <button
                    onClick={() => navigateTo("rnr-entitlements")}
                    className="bg-[#1B365D] hover:bg-[#142946] text-white px-3.5 py-1.5 rounded font-bold text-xs shadow-2xs transition-colors cursor-pointer"
                  >
                    + Create Fund Request
                  </button>
                  <button
                    onClick={() => navigateTo("rnr-entitlements")}
                    className="bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 px-3.5 py-1.5 rounded font-semibold text-xs shadow-2xs transition-colors cursor-pointer"
                  >
                    View Pending Requests
                  </button>
                  <button
                    onClick={() => navigateTo("rnr-dashboard")}
                    className="bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 px-3.5 py-1.5 rounded font-semibold text-xs shadow-2xs transition-colors cursor-pointer"
                  >
                    View Disbursal Status
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 9: COMPENSATION */}
          {workflowActiveTab === "compensation" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b pb-3">
                <div>
                  <h3 className="font-bold text-sm text-slate-900">Statutory Compensation Determination (RFCTLARR 2013)</h3>
                  <div className="text-slate-500">Base Land Value + 1.5x Multiplier + 100% Solatium + Assets</div>
                </div>
                <button
                  onClick={() => navigateTo("compensation")}
                  className="bg-[#1e3a8a] text-white px-3 py-1.5 rounded font-semibold text-xs flex items-center gap-1"
                >
                  Open Compensation Calculator →
                </button>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="border p-2.5 rounded bg-slate-50">
                  <span className="text-slate-500 block text-[10px]">Estimated Compensation</span>
                  <span className="font-bold text-slate-900 text-sm">₹ 345.50 Cr</span>
                </div>
                <div className="border p-2.5 rounded bg-blue-50">
                  <span className="text-blue-800 block text-[10px]">Approved & Locked</span>
                  <span className="font-bold text-blue-900 text-sm">₹ 280.40 Cr</span>
                </div>
                <div className="border p-2.5 rounded bg-emerald-50">
                  <span className="text-emerald-800 block text-[10px]">Disbursed (PFMS)</span>
                  <span className="font-bold text-emerald-900 text-sm">₹ 212.80 Cr</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 10: AWARD */}
          {workflowActiveTab === "award" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b pb-3">
                <div>
                  <h3 className="font-bold text-sm text-slate-900">Land Acquisition Award Declarations (Section 23 & 31)</h3>
                  <div className="text-slate-500">Collector signed award certificates and entitlement orders</div>
                </div>
                <button
                  onClick={() => navigateTo("awards")}
                  className="bg-[#1e3a8a] text-white px-3 py-1.5 rounded font-semibold text-xs flex items-center gap-1"
                >
                  <Award className="w-3.5 h-3.5" />
                  Generate Award Module
                </button>
              </div>

              <div className="space-y-2">
                {projectParcels.map((prc) => (
                  <div key={prc.id} className="p-3 border rounded bg-slate-50 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-900">Award ID: {prc.awardId}</div>
                      <div className="text-[11px] text-slate-600">Survey {prc.surveyNumber} ({prc.ownerName}) • Final Amount: ₹ {(prc.finalCompensationAmount / 10000000).toFixed(2)} Cr</div>
                    </div>
                    <StatusBadge status={prc.awardStatus} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 11: PAYMENT */}
          {workflowActiveTab === "payment" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b pb-3">
                <div>
                  <h3 className="font-bold text-sm text-slate-900">PFMS Direct Benefit Transfer (DBT) Status</h3>
                  <div className="text-slate-500">Electronic treasury transfers directly into verified beneficiary accounts</div>
                </div>
                <button
                  onClick={() => navigateTo("payment")}
                  className="bg-[#1e3a8a] text-white px-3 py-1.5 rounded font-semibold text-xs flex items-center gap-1"
                >
                  <CreditCard className="w-3.5 h-3.5" />
                  Initiate Payment Module
                </button>
              </div>

              <div className="space-y-2">
                {projectPayments.map((pay) => (
                  <div key={pay.id} className="p-3 border rounded bg-white flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-900">{pay.beneficiaryName} (Survey {pay.surveyNumber})</div>
                      <div className="text-[11px] text-slate-600">PFMS Ref: {pay.pfmsReference} • Amount: ₹ {(pay.amount / 10000000).toFixed(2)} Cr</div>
                    </div>
                    <StatusBadge status={pay.status} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 12: POSSESSION */}
          {workflowActiveTab === "possession" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b pb-3">
                <div>
                  <h3 className="font-bold text-sm text-slate-900">Possession Memos & Land Handover (Section 38)</h3>
                  <div className="text-slate-500">DGPS boundary demarcation, Panchnama, and possession certificates</div>
                </div>
                <button
                  onClick={() => navigateTo("possession")}
                  className="bg-[#1e3a8a] text-white px-3 py-1.5 rounded font-semibold text-xs flex items-center gap-1"
                >
                  <Building className="w-3.5 h-3.5" />
                  Open Possession Memo Module
                </button>
              </div>

              <div className="space-y-2">
                {projectPossessions.map((pos) => (
                  <div key={pos.id} className="p-3 border rounded bg-slate-50 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-900">Memo No: {pos.id} (Survey {pos.surveyNumber}, {pos.village})</div>
                      <div className="text-[11px] text-slate-600">Field Officer: {pos.fieldOfficer} • Handover Date: {pos.actualPossessionDate}</div>
                    </div>
                    <StatusBadge status={pos.status} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
