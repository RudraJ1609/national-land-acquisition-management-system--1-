import React, { useState } from "react";
import { useApp } from "../../context/AppContext.jsx";
import {
  HeartHandshake,
  Users,
  Home,
  Briefcase,
  Coins,
  ShieldCheck,
  CheckCircle2,
  HelpCircle,
  Search,
  Filter,
  Download,
  Plus,
  ArrowRight,
  FileCheck,
  Building,
  CheckSquare,
  AlertCircle,
  Clock,
  X,
  Send,
  Edit3,
  ChevronRight,
  Info
} from "lucide-react";
import { StatusBadge } from "../common/StatusBadge.jsx";

export const Page36RnREntitlements = () => {
  const { currentProject, projects, navigateTo } = useApp();

  const [activeTab, setActiveTab] = useState("family-entitlements"); // "family-entitlements", "project-scheme", "scheme-approval"
  const [selectedProject, setSelectedProject] = useState("National Highway Development");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Family List State
  const [families, setFamilies] = useState([
    {
      id: "FAM-101",
      familyHead: "Ramesh Patel",
      fatherSpouse: "Laljibhai Patel",
      village: "Rampura",
      members: 5,
      primaryOccupation: "Agriculture",
      incomeSource: "Agriculture",
      dependency: "Agriculture",
      landDependency: "Fully Dependent",
      displacement: "Yes",
      houseAffected: "Yes",
      agriculturalLandAffected: "Yes",
      livelihoodImpact: "High",
      relocationRequired: "Yes",
      eligibility: "Eligible",
      status: "Pending",
      vulnerable: true,
      entitlements: {
        housingSupport: { eligible: true, type: "Alternative Housing", amount: 250000 },
        subsistence: { eligible: true, monthly: 3000, durationMonths: 12, total: 36000 },
        transport: { eligible: true, amount: 50000 },
        livelihood: { eligible: true, type: "One-time Grant", amount: 100000 },
        annuity: { applicable: false, annualAmount: 0 }
      },
      override: { active: false, newAmount: 0, reason: "" },
      fundRequest: null
    },
    {
      id: "FAM-102",
      familyHead: "Suresh Shah",
      fatherSpouse: "Chandrakant Shah",
      village: "Rampura",
      members: 4,
      primaryOccupation: "Business",
      incomeSource: "Grocery Store",
      dependency: "Business",
      landDependency: "Partially Dependent",
      displacement: "Yes",
      houseAffected: "Yes",
      agriculturalLandAffected: "No",
      livelihoodImpact: "High",
      relocationRequired: "Yes",
      eligibility: "Eligible",
      status: "Approved",
      vulnerable: false,
      entitlements: {
        housingSupport: { eligible: true, type: "Housing Assistance", amount: 250000 },
        subsistence: { eligible: true, monthly: 3000, durationMonths: 12, total: 36000 },
        transport: { eligible: true, amount: 50000 },
        livelihood: { eligible: true, type: "Skill Development", amount: 100000 },
        annuity: { applicable: false, annualAmount: 0 }
      },
      override: { active: false, newAmount: 0, reason: "" },
      fundRequest: { id: "RRF-2026-098", date: "2026-08-20", status: "Sent" }
    },
    {
      id: "FAM-103",
      familyHead: "Meena Devi",
      fatherSpouse: "W/o Late Rajesh Kumar",
      village: "Village A",
      members: 3,
      primaryOccupation: "Agriculture",
      incomeSource: "Daily Labour",
      dependency: "Agriculture",
      landDependency: "Partially Dependent",
      displacement: "No",
      houseAffected: "No",
      agriculturalLandAffected: "Yes",
      livelihoodImpact: "Medium",
      relocationRequired: "No",
      eligibility: "Under Review",
      status: "Pending",
      vulnerable: true,
      entitlements: {
        housingSupport: { eligible: false, type: "Housing Assistance", amount: 0 },
        subsistence: { eligible: true, monthly: 3000, durationMonths: 12, total: 36000 },
        transport: { eligible: false, amount: 0 },
        livelihood: { eligible: true, type: "One-time Grant", amount: 100000 },
        annuity: { applicable: false, annualAmount: 0 }
      },
      override: { active: false, newAmount: 0, reason: "" },
      fundRequest: null
    },
    {
      id: "FAM-104",
      familyHead: "Jaswantbhai Parmar",
      fatherSpouse: "Govindbhai Parmar",
      village: "Petlad",
      members: 6,
      primaryOccupation: "Artisan",
      incomeSource: "Rural Pottery & Agriculture",
      dependency: "Artisan / Labourer",
      landDependency: "Fully Dependent",
      displacement: "Yes",
      houseAffected: "Yes",
      agriculturalLandAffected: "Yes",
      livelihoodImpact: "High",
      relocationRequired: "Yes",
      eligibility: "Eligible",
      status: "Approved",
      vulnerable: true,
      entitlements: {
        housingSupport: { eligible: true, type: "Alternative Housing", amount: 250000 },
        subsistence: { eligible: true, monthly: 3000, durationMonths: 12, total: 36000 },
        transport: { eligible: true, amount: 50000 },
        livelihood: { eligible: true, type: "Employment", amount: 100000 },
        annuity: { applicable: false, annualAmount: 0 }
      },
      override: { active: false, newAmount: 0, reason: "" },
      fundRequest: { id: "RRF-2026-099", date: "2026-08-22", status: "Sent" }
    }
  ]);

  // Selected family for Assessment Modal
  const [activeFamily, setActiveFamily] = useState(null);
  const [assessmentForm, setAssessmentForm] = useState(null);
  const [fundRequestSuccess, setFundRequestSuccess] = useState(null);

  // Scheme Builder State
  const [schemeBenefits, setSchemeBenefits] = useState([
    { id: 1, benefit: "Housing", category: "Displaced Family", amount: "₹ 2,50,000", status: "Active" },
    { id: 2, benefit: "Subsistence", category: "Eligible Family", amount: "₹ 3,000/month", status: "Active" },
    { id: 3, benefit: "Transport", category: "Relocated Family", amount: "₹ 50,000", status: "Active" },
    { id: 4, benefit: "Livelihood", category: "Dependent Family", amount: "₹ 1,000,000", status: "Active" }
  ]);
  const [newBenefit, setNewBenefit] = useState({ benefit: "", category: "", amount: "" });
  const [showAddBenefit, setShowAddBenefit] = useState(false);

  // Scheme Approval Tracking State
  const [approvalDetails, setApprovalDetails] = useState({
    gramSabhaDate: "2026-03-12",
    committeeReviewStatus: "Under Review",
    remarks: "SIA verification completed, R&R Commissioner review scheduled for final gazette publication.",
    approvalStatus: "Under Review"
  });
  const [toastFeedback, setToastFeedback] = useState("");

  const triggerToast = (msg) => {
    setToastFeedback(msg);
    setTimeout(() => setToastFeedback(""), 3500);
  };

  const openAssessment = (family) => {
    setActiveFamily(family);
    setAssessmentForm(JSON.parse(JSON.stringify(family)));
  };

  const calculateTotal = (form) => {
    if (!form) return 0;
    if (form.override && form.override.active && Number(form.override.newAmount) > 0) {
      return Number(form.override.newAmount);
    }
    let sum = 0;
    if (form.entitlements.housingSupport.eligible) sum += Number(form.entitlements.housingSupport.amount || 0);
    if (form.entitlements.subsistence.eligible) sum += Number(form.entitlements.subsistence.total || 36000);
    if (form.entitlements.transport.eligible) sum += Number(form.entitlements.transport.amount || 0);
    if (form.entitlements.livelihood.eligible) sum += Number(form.entitlements.livelihood.amount || 0);
    if (form.entitlements.annuity.applicable) sum += Number(form.entitlements.annuity.annualAmount || 0);
    return sum;
  };

  const handleSaveDraft = () => {
    setFamilies((prev) =>
      prev.map((f) => (f.id === assessmentForm.id ? { ...assessmentForm, status: "Draft Saved" } : f))
    );
    triggerToast(`✓ Draft assessment for ${assessmentForm.familyHead} (${assessmentForm.id}) saved successfully.`);
    setActiveFamily(null);
  };

  const handleApproveEntitlement = () => {
    setFamilies((prev) =>
      prev.map((f) => (f.id === assessmentForm.id ? { ...assessmentForm, status: "Approved" } : f))
    );
    triggerToast(`✓ R&R Entitlements for ${assessmentForm.familyHead} (${assessmentForm.id}) approved successfully.`);
    setActiveFamily(null);
  };

  const handleRequestFundRelease = () => {
    const newRequestId = `RRF-2026-${Math.floor(100 + Math.random() * 900)}`;
    const totalAmt = calculateTotal(assessmentForm);
    const updatedFamily = {
      ...assessmentForm,
      status: "Approved",
      fundRequest: {
        id: newRequestId,
        date: new Date().toISOString().substring(0, 10),
        amount: totalAmt,
        status: "Sent"
      }
    };

    setFamilies((prev) =>
      prev.map((f) => (f.id === assessmentForm.id ? updatedFamily : f))
    );

    setFundRequestSuccess({
      requestId: newRequestId,
      familyHead: assessmentForm.familyHead,
      familyId: assessmentForm.id,
      project: selectedProject,
      amount: totalAmt
    });

    setActiveFamily(null);
  };

  const filteredFamilies = families.filter((f) => {
    const matchesSearch =
      f.familyHead.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.village.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All" || f.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 pb-12">
      {toastFeedback && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 px-4 py-2 rounded text-xs font-semibold flex items-center justify-between shadow-2xs animate-fade-in">
          <span>{toastFeedback}</span>
          <button onClick={() => setToastFeedback("")} className="text-emerald-700 hover:text-emerald-950 font-bold cursor-pointer">✕</button>
        </div>
      )}

      {/* Top Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div>
          <div className="text-xs text-slate-500 font-medium flex items-center gap-1.5 mb-1">
            <span
              onClick={() => navigateTo("rnr-dashboard")}
              className="hover:text-[#1B365D] cursor-pointer"
            >
              R&R Dashboard
            </span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#1B365D] font-semibold">Family Entitlements & R&R Scheme</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 leading-tight flex items-center gap-2">
            <Users className="w-5 h-5 text-[#1B365D]" />
            Family Entitlements & Statutory R&R Scheme
          </h1>
          <div className="text-xs text-slate-600 mt-1">
            RFCTLARR Act 2013 • Second Schedule Beneficiary Ledger & Scheme Formulation
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => triggerToast("Downloading Approved Statutory R&R Scheme PDF...")}
            className="bg-white border border-[#D1D5DB] hover:bg-slate-50 text-slate-700 px-3.5 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-[#1B365D]" />
            <span>Download Scheme PDF</span>
          </button>
        </div>
      </div>

      {/* Section A — Project Selection Strip */}
      <div className="bg-white border border-[#D1D5DB] rounded p-4 shadow-2xs">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Building className="w-4 h-4 text-[#1B365D]" />
            <span className="text-xs font-bold text-slate-700 uppercase">Select Project:</span>
            <select
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
              className="border border-[#D1D5DB] rounded px-3 py-1.5 text-xs font-bold text-[#1B365D] bg-[#F8F9FA] focus:bg-white outline-none cursor-pointer"
            >
              <option value="National Highway Development">National Highway Development</option>
              <option value="Railway Project">Railway Project</option>
              <option value="Metro Corridor Phase-2">Metro Corridor Phase-2</option>
            </select>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs">
            <div className="bg-slate-50 border border-slate-200 px-3 py-1.5 rounded">
              <span className="text-slate-500">District: </span>
              <strong className="text-slate-800">Ahmedabad</strong>
            </div>
            <div className="bg-blue-50 border border-blue-200 px-3 py-1.5 rounded">
              <span className="text-blue-700">Affected Families: </span>
              <strong className="text-blue-900">250</strong>
            </div>
            <div className="bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded">
              <span className="text-emerald-700">Eligible Families: </span>
              <strong className="text-emerald-900">185</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-300 pb-0 text-xs font-bold">
        <button
          onClick={() => setActiveTab("family-entitlements")}
          className={`pb-2.5 px-4 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
            activeTab === "family-entitlements"
              ? "border-[#1B365D] text-[#1B365D]"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Family Entitlements</span>
        </button>

        <button
          onClick={() => setActiveTab("project-scheme")}
          className={`pb-2.5 px-4 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
            activeTab === "project-scheme"
              ? "border-[#1B365D] text-[#1B365D]"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <FileCheck className="w-4 h-4" />
          <span>Project R&R Scheme</span>
        </button>

        <button
          onClick={() => setActiveTab("scheme-approval")}
          className={`pb-2.5 px-4 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
            activeTab === "scheme-approval"
              ? "border-[#1B365D] text-[#1B365D]"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Scheme Approval Tracking</span>
        </button>
      </div>

      {/* TAB 1: FAMILY ENTITLEMENTS */}
      {activeTab === "family-entitlements" && (
        <div className="space-y-4">
          {/* Search & Filter Bar */}
          <div className="bg-white border border-[#D1D5DB] rounded shadow-2xs p-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="relative w-full sm:w-80">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search by Family Head, ID or Village..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 border border-[#D1D5DB] rounded text-xs text-slate-800 focus:outline-none focus:border-[#1B365D]"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <span className="text-slate-500 font-medium">Status Filter:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-[#D1D5DB] rounded px-2.5 py-1 text-xs text-slate-700 bg-white cursor-pointer"
              >
                <option value="All">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Draft Saved">Draft Saved</option>
              </select>
            </div>
          </div>

          {/* Section B — Family List Table */}
          <div className="bg-white border border-[#D1D5DB] rounded shadow-2xs overflow-hidden">
            <div className="p-3.5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
              <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Affected Families & R&R Census Register
              </h2>
              <span className="text-[11px] text-slate-500">
                Total Shown: <strong>{filteredFamilies.length}</strong> Families
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead className="bg-[#e2e8f0] text-slate-800 font-semibold border-b uppercase text-[10px]">
                  <tr>
                    <th className="py-2.5 px-3 border-r">Family ID</th>
                    <th className="py-2.5 px-3 border-r">Family Head</th>
                    <th className="py-2.5 px-3 border-r">Village</th>
                    <th className="py-2.5 px-3 border-r">Dependency</th>
                    <th className="py-2.5 px-3 border-r text-center">Displacement</th>
                    <th className="py-2.5 px-3 border-r text-center">Eligibility</th>
                    <th className="py-2.5 px-3 border-r text-center">Status</th>
                    <th className="py-2.5 px-3 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-700">
                  {filteredFamilies.map((fam) => (
                    <tr key={fam.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-2.5 px-3 border-r font-mono font-bold text-[#1B365D]">
                        {fam.id}
                      </td>
                      <td className="py-2.5 px-3 border-r font-bold text-slate-900">
                        {fam.familyHead}
                        <div className="text-[10px] text-slate-500 font-normal">
                          S/o {fam.fatherSpouse} • {fam.members} Members
                        </div>
                      </td>
                      <td className="py-2.5 px-3 border-r">{fam.village}</td>
                      <td className="py-2.5 px-3 border-r font-medium">{fam.dependency}</td>
                      <td className="py-2.5 px-3 border-r text-center">
                        {fam.displacement === "Yes" ? (
                          <span className="bg-rose-50 text-rose-700 font-bold px-2 py-0.5 rounded border border-rose-200 text-[10px]">
                            Displaced (Yes)
                          </span>
                        ) : (
                          <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-[10px]">
                            No
                          </span>
                        )}
                      </td>
                      <td className="py-2.5 px-3 border-r text-center">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            fam.eligibility === "Eligible"
                              ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                              : "bg-amber-50 text-amber-800 border border-amber-200"
                          }`}
                        >
                          {fam.eligibility}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 border-r text-center">
                        <StatusBadge status={fam.status} />
                      </td>
                      <td className="py-2.5 px-3 text-center">
                        <button
                          onClick={() => openAssessment(fam)}
                          className={`px-3 py-1 rounded text-[11px] font-bold shadow-2xs transition-colors cursor-pointer ${
                            fam.status === "Approved"
                              ? "bg-white border border-[#1B365D] text-[#1B365D] hover:bg-slate-50"
                              : "bg-[#1B365D] hover:bg-[#142946] text-white"
                          }`}
                        >
                          {fam.status === "Approved" ? "View" : "Assess"}
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

      {/* TAB 2: PROJECT R&R SCHEME BUILDER (Section C) */}
      {activeTab === "project-scheme" && (
        <div className="space-y-6">
          <div className="bg-white border border-[#D1D5DB] rounded shadow-2xs p-5 space-y-4 text-xs">
            <div className="border-b border-slate-200 pb-2 flex items-center justify-between">
              <div>
                <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Project R&R Scheme Formulation (RFCTLARR Sec 16)
                </h2>
                <p className="text-[11px] text-slate-500">
                  Basic administrative definitions and statutory financial allocations
                </p>
              </div>
              <span className="text-[11px] text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Scheme Active
              </span>
            </div>

            {/* Basic Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">
                  Scheme Name
                </label>
                <input
                  type="text"
                  readOnly
                  value={`R&R Scheme – ${selectedProject}`}
                  className="w-full p-2 bg-slate-50 border border-slate-300 rounded font-semibold text-slate-800"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">
                  Project Name
                </label>
                <input
                  type="text"
                  readOnly
                  value={selectedProject}
                  className="w-full p-2 bg-slate-50 border border-slate-300 rounded font-semibold text-slate-800"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">
                  District
                </label>
                <input
                  type="text"
                  readOnly
                  value="Ahmedabad"
                  className="w-full p-2 bg-slate-50 border border-slate-300 rounded font-semibold text-slate-800"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">
                  Effective Date
                </label>
                <input
                  type="date"
                  defaultValue="2026-04-15"
                  className="w-full p-2 bg-white border border-slate-300 rounded font-semibold text-slate-800"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">
                  Estimated Total Budget
                </label>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-base text-[#1B365D] bg-slate-100 px-3 py-1.5 rounded border border-slate-300">
                    ₹ 12,50,00,000
                  </span>
                  <span className="text-[11px] text-slate-500 font-medium">
                    (₹ 12.50 Crores deposited in District R&R Escrow Account)
                  </span>
                </div>
              </div>
            </div>

            {/* Define Entitlement Categories Table */}
            <div className="pt-4 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <h3 className="text-xs font-bold text-slate-900 uppercase">
                  Define Entitlement Categories
                </h3>
                <button
                  onClick={() => setShowAddBenefit(!showAddBenefit)}
                  className="bg-[#1B365D] text-white px-2.5 py-1 rounded text-[11px] font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3 h-3 text-[#C5A059]" />
                  <span>+ Add Benefit</span>
                </button>
              </div>

              {showAddBenefit && (
                <div className="p-3 bg-slate-50 border border-[#D1D5DB] rounded space-y-2">
                  <div className="font-bold text-[11px] text-slate-700">Add New Entitlement Category</div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <input
                      type="text"
                      placeholder="Benefit (e.g. Cattle Grant)"
                      value={newBenefit.benefit}
                      onChange={(e) => setNewBenefit({ ...newBenefit, benefit: e.target.value })}
                      className="p-1.5 border border-slate-300 rounded text-xs"
                    />
                    <input
                      type="text"
                      placeholder="Eligibility Category"
                      value={newBenefit.category}
                      onChange={(e) => setNewBenefit({ ...newBenefit, category: e.target.value })}
                      className="p-1.5 border border-slate-300 rounded text-xs"
                    />
                    <input
                      type="text"
                      placeholder="Amount / Support"
                      value={newBenefit.amount}
                      onChange={(e) => setNewBenefit({ ...newBenefit, amount: e.target.value })}
                      className="p-1.5 border border-slate-300 rounded text-xs"
                    />
                  </div>
                  <div className="flex justify-end gap-2 pt-1">
                    <button
                      onClick={() => setShowAddBenefit(false)}
                      className="px-2.5 py-1 border border-slate-300 rounded text-[11px]"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        if (!newBenefit.benefit) return;
                        setSchemeBenefits([
                          ...schemeBenefits,
                          {
                            id: Date.now(),
                            benefit: newBenefit.benefit,
                            category: newBenefit.category || "General",
                            amount: newBenefit.amount || "₹ 25,000",
                            status: "Active"
                          }
                        ]);
                        setNewBenefit({ benefit: "", category: "", amount: "" });
                        setShowAddBenefit(false);
                      }}
                      className="bg-[#1B365D] text-white px-3 py-1 rounded text-[11px] font-bold"
                    >
                      Save Category
                    </button>
                  </div>
                </div>
              )}

              <table className="w-full text-xs text-left border border-slate-200">
                <thead className="bg-[#e2e8f0] text-slate-800 font-semibold border-b uppercase text-[10px]">
                  <tr>
                    <th className="py-2 px-3 border-r">Benefit</th>
                    <th className="py-2 px-3 border-r">Eligibility Category</th>
                    <th className="py-2 px-3 border-r">Amount / Support</th>
                    <th className="py-2 px-3 border-r text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {schemeBenefits.map((b) => (
                    <tr key={b.id} className="hover:bg-slate-50">
                      <td className="py-2 px-3 border-r font-bold text-[#1B365D]">{b.benefit}</td>
                      <td className="py-2 px-3 border-r">{b.category}</td>
                      <td className="py-2 px-3 border-r font-semibold text-slate-900">{b.amount}</td>
                      <td className="py-2 px-3 border-r text-center">
                        <span className="bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 rounded text-[10px] border border-emerald-200">
                          {b.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Scheme Action Buttons */}
            <div className="border-t border-slate-200 pt-4 flex items-center justify-end gap-2">
              <button
                onClick={() => triggerToast("R&R Scheme draft saved successfully.")}
                className="bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 px-4 py-2 rounded text-xs font-semibold transition-colors cursor-pointer"
              >
                Save Scheme
              </button>
              <button
                onClick={() => {
                  triggerToast("R&R Scheme submitted to State R&R Commissioner for Section 45 Statutory Approval.");
                  setActiveTab("scheme-approval");
                }}
                className="bg-[#1B365D] hover:bg-[#142946] text-white px-4 py-2 rounded text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
              >
                <Send className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Submit for Approval</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SCHEME APPROVAL TRACKING (Section D) */}
      {activeTab === "scheme-approval" && (
        <div className="space-y-6">
          <div className="bg-white border border-[#D1D5DB] rounded shadow-2xs p-5 space-y-6 text-xs">
            <div className="border-b border-slate-200 pb-2">
              <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                R&R Scheme Approval Progress
              </h2>
              <p className="text-[11px] text-slate-500">
                Statutory milestones under RFCTLARR Section 16, 17, 18 and 45
              </p>
            </div>

            {/* Approval Progress Stepper */}
            <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 text-center text-xs">
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded text-emerald-900">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 mx-auto mb-1" />
                <div className="font-bold text-[11px]">✓ Draft Created</div>
                <div className="text-[9px] text-emerald-700">10-Jan-2026</div>
              </div>

              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded text-emerald-900">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 mx-auto mb-1" />
                <div className="font-bold text-[11px]">✓ Family Assessment</div>
                <div className="text-[9px] text-emerald-700">210 Completed</div>
              </div>

              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded text-emerald-900">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 mx-auto mb-1" />
                <div className="font-bold text-[11px]">✓ Gram Sabha</div>
                <div className="text-[9px] text-emerald-700">12-Mar-2026</div>
              </div>

              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded text-emerald-900">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 mx-auto mb-1" />
                <div className="font-bold text-[11px]">✓ Committee Review</div>
                <div className="text-[9px] text-emerald-700">Sec 43 Comm.</div>
              </div>

              <div className="p-3 bg-amber-50 border-2 border-amber-400 rounded text-amber-950 font-bold">
                <Clock className="w-4 h-4 text-amber-700 mx-auto mb-1 animate-pulse" />
                <div className="text-[11px]">● State Approval</div>
                <div className="text-[9px] text-amber-800">Under Review</div>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded text-slate-400">
                <div className="w-4 h-4 rounded-full border border-slate-300 mx-auto mb-1 flex items-center justify-center text-[10px]">○</div>
                <div className="font-semibold text-[11px]">Final Approved</div>
                <div className="text-[9px]">Gazette Issue</div>
              </div>
            </div>

            {/* Form Fields */}
            <div className="border-t border-slate-200 pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">
                  Gram Sabha Hearing Date
                </label>
                <input
                  type="date"
                  value={approvalDetails.gramSabhaDate}
                  onChange={(e) => setApprovalDetails({ ...approvalDetails, gramSabhaDate: e.target.value })}
                  className="w-full p-2 bg-white border border-slate-300 rounded font-semibold text-slate-800"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">
                  Committee Review Status
                </label>
                <select
                  value={approvalDetails.committeeReviewStatus}
                  onChange={(e) => setApprovalDetails({ ...approvalDetails, committeeReviewStatus: e.target.value })}
                  className="w-full p-2 bg-white border border-slate-300 rounded font-semibold text-slate-800 cursor-pointer"
                >
                  <option value="Under Review">Under Review</option>
                  <option value="Approved">Approved</option>
                  <option value="Pending Hearing">Pending Hearing</option>
                  <option value="Returned for Revision">Returned for Revision</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">
                  Remarks / Status Observations
                </label>
                <textarea
                  rows={3}
                  value={approvalDetails.remarks}
                  onChange={(e) => setApprovalDetails({ ...approvalDetails, remarks: e.target.value })}
                  className="w-full p-2.5 bg-white border border-slate-300 rounded text-slate-800 text-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">
                  Overall Approval Status
                </label>
                <div className="flex items-center gap-2">
                  <span className="bg-amber-100 text-amber-900 border border-amber-300 font-bold px-3 py-1.5 rounded text-xs">
                    Pending State Commissioner Approval
                  </span>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
              <button
                onClick={() => triggerToast("Approval tracking records updated.")}
                className="bg-[#1B365D] text-white px-4 py-2 rounded text-xs font-bold shadow-2xs hover:bg-[#142946] transition-colors cursor-pointer"
              >
                Update Tracking Details
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FAMILY ASSESSMENT & ENTITLEMENT DETAIL MODAL */}
      {activeFamily && assessmentForm && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 overflow-y-auto">
          <div className="bg-white rounded-lg border border-slate-300 shadow-xl w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden text-xs">
            {/* Modal Header */}
            <div className="bg-[#1B365D] text-white p-3.5 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#C5A059]" />
                  Family Assessment & Statutory R&R Entitlement Detail
                </h2>
                <div className="text-[11px] text-slate-300 mt-0.5">
                  Family ID: <strong className="text-white">{assessmentForm.id}</strong> • Head:{" "}
                  <strong className="text-white">{assessmentForm.familyHead}</strong>
                </div>
              </div>
              <button
                onClick={() => setActiveFamily(null)}
                className="p-1 hover:bg-white/20 rounded text-slate-300 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-4 overflow-y-auto space-y-4 flex-1">
              {/* 1. Family Information (Auto-filled) */}
              <div className="bg-slate-50 border border-slate-200 rounded p-3 space-y-2">
                <div className="font-bold text-slate-900 uppercase text-[10px] tracking-wider border-b pb-1">
                  Family Information (Auto-filled from Census)
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
                  <div>
                    <span className="text-slate-500 block">Family Head:</span>
                    <strong className="text-slate-800">{assessmentForm.familyHead}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Family ID:</span>
                    <strong className="text-[#1B365D] font-mono">{assessmentForm.id}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Village:</span>
                    <strong className="text-slate-800">{assessmentForm.village}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Family Members:</span>
                    <strong className="text-slate-800">{assessmentForm.members} Persons</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Primary Occupation:</span>
                    <strong className="text-slate-800">{assessmentForm.primaryOccupation}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Income Source:</span>
                    <strong className="text-slate-800">{assessmentForm.incomeSource}</strong>
                  </div>
                  <div className="col-span-2">
                    <span className="text-slate-500 block">Land Dependency:</span>
                    <strong className="text-emerald-800">{assessmentForm.landDependency}</strong>
                  </div>
                </div>
              </div>

              {/* 2. Impact Information (Auto-filled from SIA survey) */}
              <div className="bg-amber-50/50 border border-amber-200 rounded p-3 space-y-2">
                <div className="font-bold text-amber-950 uppercase text-[10px] tracking-wider border-b border-amber-200 pb-1">
                  Impact Information (Auto-filled from SIA Survey)
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
                  <div>
                    <span className="text-amber-800 block">House Affected:</span>
                    <strong className="text-slate-900">{assessmentForm.houseAffected}</strong>
                  </div>
                  <div>
                    <span className="text-amber-800 block">Agricultural Land Affected:</span>
                    <strong className="text-slate-900">{assessmentForm.agriculturalLandAffected}</strong>
                  </div>
                  <div>
                    <span className="text-amber-800 block">Livelihood Impact:</span>
                    <strong className="text-rose-700">{assessmentForm.livelihoodImpact}</strong>
                  </div>
                  <div>
                    <span className="text-amber-800 block">Relocation Required:</span>
                    <strong className="text-slate-900">{assessmentForm.relocationRequired}</strong>
                  </div>
                </div>
              </div>

              {/* 3. R&R Eligibility Checklist */}
              <div className="bg-white border border-slate-300 rounded p-3 space-y-2">
                <div className="font-bold text-slate-900 uppercase text-[10px] tracking-wider border-b pb-1">
                  R&R Eligibility Checklist (Officer Review)
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1 text-[11px]">
                  <label className="flex items-center gap-2 text-slate-700 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded text-[#1B365D]" />
                    <span>Residential Displacement</span>
                  </label>
                  <label className="flex items-center gap-2 text-slate-700 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded text-[#1B365D]" />
                    <span>Livelihood Loss</span>
                  </label>
                  <label className="flex items-center gap-2 text-slate-700 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded text-[#1B365D]" />
                    <span>Agricultural Dependency</span>
                  </label>
                  <label className="flex items-center gap-2 text-slate-700 cursor-pointer">
                    <input type="checkbox" className="rounded text-[#1B365D]" />
                    <span>Commercial Property Loss</span>
                  </label>
                  <label className="flex items-center gap-2 text-slate-700 cursor-pointer">
                    <input type="checkbox" defaultChecked={assessmentForm.vulnerable} className="rounded text-[#1B365D]" />
                    <span>Vulnerable Family</span>
                  </label>
                  <label className="flex items-center gap-2 text-slate-700 cursor-pointer">
                    <input type="checkbox" className="rounded text-[#1B365D]" />
                    <span>Other Special Category</span>
                  </label>
                </div>
              </div>

              {/* 4. Statutory Entitlements Configuration */}
              <div className="border border-slate-300 rounded p-3.5 space-y-3 bg-white">
                <div className="font-bold text-slate-900 uppercase text-[10px] tracking-wider border-b pb-1 flex items-center justify-between">
                  <span>Second Schedule Entitlements Configuration</span>
                  <span className="text-emerald-700 font-bold text-[10px]">Statutory Minimum</span>
                </div>

                <div className="space-y-3 text-xs">
                  {/* Housing Support */}
                  <div className="p-2.5 bg-slate-50 border border-slate-200 rounded space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-2 font-bold text-slate-800 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={assessmentForm.entitlements.housingSupport.eligible}
                          onChange={(e) =>
                            setAssessmentForm({
                              ...assessmentForm,
                              entitlements: {
                                ...assessmentForm.entitlements,
                                housingSupport: {
                                  ...assessmentForm.entitlements.housingSupport,
                                  eligible: e.target.checked
                                }
                              }
                            })
                          }
                          className="rounded text-[#1B365D]"
                        />
                        <span>Housing Support (Mandatory for displaced)</span>
                      </label>
                      <span className="font-mono font-bold text-slate-900">
                        ₹ {Number(assessmentForm.entitlements.housingSupport.amount || 0).toLocaleString("en-IN")}
                      </span>
                    </div>
                    {assessmentForm.entitlements.housingSupport.eligible && (
                      <div className="pl-6 flex flex-wrap items-center gap-4 text-[11px] text-slate-600">
                        <label className="flex items-center gap-1.5 cursor-pointer">
                          <input
                            type="radio"
                            name="housingType"
                            checked={assessmentForm.entitlements.housingSupport.type === "Alternative Housing"}
                            onChange={() =>
                              setAssessmentForm({
                                ...assessmentForm,
                                entitlements: {
                                  ...assessmentForm.entitlements,
                                  housingSupport: { ...assessmentForm.entitlements.housingSupport, type: "Alternative Housing" }
                                }
                              })
                            }
                          />
                          <span>Alternative Housing Unit</span>
                        </label>
                        <label className="flex items-center gap-1.5 cursor-pointer">
                          <input
                            type="radio"
                            name="housingType"
                            checked={assessmentForm.entitlements.housingSupport.type === "Housing Assistance"}
                            onChange={() =>
                              setAssessmentForm({
                                ...assessmentForm,
                                entitlements: {
                                  ...assessmentForm.entitlements,
                                  housingSupport: { ...assessmentForm.entitlements.housingSupport, type: "Housing Assistance" }
                                }
                              })
                            }
                          />
                          <span>Housing Assistance Cash Grant</span>
                        </label>
                      </div>
                    )}
                  </div>

                  {/* Subsistence Allowance */}
                  <div className="p-2.5 bg-slate-50 border border-slate-200 rounded space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-2 font-bold text-slate-800 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={assessmentForm.entitlements.subsistence.eligible}
                          onChange={(e) =>
                            setAssessmentForm({
                              ...assessmentForm,
                              entitlements: {
                                ...assessmentForm.entitlements,
                                subsistence: {
                                  ...assessmentForm.entitlements.subsistence,
                                  eligible: e.target.checked
                                }
                              }
                            })
                          }
                          className="rounded text-[#1B365D]"
                        />
                        <span>Subsistence Allowance</span>
                      </label>
                      <span className="font-mono font-bold text-slate-900">
                        ₹ {Number(assessmentForm.entitlements.subsistence.total || 36000).toLocaleString("en-IN")}
                      </span>
                    </div>
                    {assessmentForm.entitlements.subsistence.eligible && (
                      <div className="pl-6 flex items-center gap-4 text-[11px] text-slate-600">
                        <span>Monthly Amount: <strong>₹ 3,000</strong></span>
                        <span>•</span>
                        <div className="flex items-center gap-1.5">
                          <span>Duration:</span>
                          <select
                            value={assessmentForm.entitlements.subsistence.durationMonths}
                            onChange={(e) => {
                              const months = Number(e.target.value);
                              setAssessmentForm({
                                ...assessmentForm,
                                entitlements: {
                                  ...assessmentForm.entitlements,
                                  subsistence: {
                                    ...assessmentForm.entitlements.subsistence,
                                    durationMonths: months,
                                    total: months * 3000
                                  }
                                }
                              });
                            }}
                            className="border border-slate-300 rounded px-2 py-0.5 text-xs bg-white cursor-pointer"
                          >
                            <option value={12}>12 Months (₹ 36,000)</option>
                            <option value={6}>6 Months (₹ 18,000)</option>
                            <option value={18}>18 Months (₹ 54,000)</option>
                            <option value={24}>24 Months (₹ 72,000)</option>
                          </select>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Transportation Allowance */}
                  <div className="p-2.5 bg-slate-50 border border-slate-200 rounded space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-2 font-bold text-slate-800 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={assessmentForm.entitlements.transport.eligible}
                          onChange={(e) =>
                            setAssessmentForm({
                              ...assessmentForm,
                              entitlements: {
                                ...assessmentForm.entitlements,
                                transport: {
                                  ...assessmentForm.entitlements.transport,
                                  eligible: e.target.checked
                                }
                              }
                            })
                          }
                          className="rounded text-[#1B365D]"
                        />
                        <span>Transportation Allowance (Shifting Grant)</span>
                      </label>
                      <span className="font-mono font-bold text-slate-900">
                        ₹ {Number(assessmentForm.entitlements.transport.amount || 0).toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>

                  {/* Livelihood / Employment Support */}
                  <div className="p-2.5 bg-slate-50 border border-slate-200 rounded space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-2 font-bold text-slate-800 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={assessmentForm.entitlements.livelihood.eligible}
                          onChange={(e) =>
                            setAssessmentForm({
                              ...assessmentForm,
                              entitlements: {
                                ...assessmentForm.entitlements,
                                livelihood: {
                                  ...assessmentForm.entitlements.livelihood,
                                  eligible: e.target.checked
                                }
                              }
                            })
                          }
                          className="rounded text-[#1B365D]"
                        />
                        <span>Livelihood / Employment Support</span>
                      </label>
                      <span className="font-mono font-bold text-slate-900">
                        ₹ {Number(assessmentForm.entitlements.livelihood.amount || 0).toLocaleString("en-IN")}
                      </span>
                    </div>
                    {assessmentForm.entitlements.livelihood.eligible && (
                      <div className="pl-6 flex flex-wrap items-center gap-4 text-[11px] text-slate-600">
                        {["Employment", "One-time Grant", "Skill Development", "Annuity"].map((st) => (
                          <label key={st} className="flex items-center gap-1.5 cursor-pointer">
                            <input
                              type="radio"
                              name="livelihoodType"
                              checked={assessmentForm.entitlements.livelihood.type === st}
                              onChange={() =>
                                setAssessmentForm({
                                  ...assessmentForm,
                                  entitlements: {
                                    ...assessmentForm.entitlements,
                                    livelihood: { ...assessmentForm.entitlements.livelihood, type: st }
                                  }
                                })
                              }
                            />
                            <span>{st}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Annuity / Financial Support */}
                  <div className="p-2.5 bg-slate-50 border border-slate-200 rounded space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-2 font-bold text-slate-800 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={assessmentForm.entitlements.annuity.applicable}
                          onChange={(e) =>
                            setAssessmentForm({
                              ...assessmentForm,
                              entitlements: {
                                ...assessmentForm.entitlements,
                                annuity: {
                                  ...assessmentForm.entitlements.annuity,
                                  applicable: e.target.checked
                                }
                              }
                            })
                          }
                          className="rounded text-[#1B365D]"
                        />
                        <span>Annuity / Additional Financial Support</span>
                      </label>
                      <span className="font-mono font-bold text-slate-700">
                        {assessmentForm.entitlements.annuity.applicable
                          ? `₹ ${Number(assessmentForm.entitlements.annuity.annualAmount || 0).toLocaleString("en-IN")}`
                          : "Not Applicable"}
                      </span>
                    </div>
                    {assessmentForm.entitlements.annuity.applicable && (
                      <div className="pl-6 flex items-center gap-2 pt-1">
                        <span className="text-[11px] text-slate-600">Annual Amount (₹):</span>
                        <input
                          type="number"
                          placeholder="e.g. 24000"
                          value={assessmentForm.entitlements.annuity.annualAmount || ""}
                          onChange={(e) =>
                            setAssessmentForm({
                              ...assessmentForm,
                              entitlements: {
                                ...assessmentForm.entitlements,
                                annuity: {
                                  ...assessmentForm.entitlements.annuity,
                                  annualAmount: Number(e.target.value)
                                }
                              }
                            })
                          }
                          className="p-1 border border-slate-300 rounded text-xs w-36"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* 5. Auto-Calculated Summary Box */}
              <div className="bg-[#1B365D] text-white p-4 rounded space-y-2">
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#C5A059] border-b border-white/20 pb-1">
                  R&R Entitlement Summary
                </div>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between text-slate-200">
                    <span>Housing Assistance:</span>
                    <span className="font-mono">
                      ₹ {Number(assessmentForm.entitlements.housingSupport.eligible ? assessmentForm.entitlements.housingSupport.amount : 0).toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-200">
                    <span>Subsistence Allowance:</span>
                    <span className="font-mono">
                      ₹ {Number(assessmentForm.entitlements.subsistence.eligible ? assessmentForm.entitlements.subsistence.total : 0).toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-200">
                    <span>Transportation:</span>
                    <span className="font-mono">
                      ₹ {Number(assessmentForm.entitlements.transport.eligible ? assessmentForm.entitlements.transport.amount : 0).toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-200">
                    <span>Livelihood Support:</span>
                    <span className="font-mono">
                      ₹ {Number(assessmentForm.entitlements.livelihood.eligible ? assessmentForm.entitlements.livelihood.amount : 0).toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="border-t border-white/30 pt-1 flex justify-between font-bold text-sm text-[#C5A059]">
                    <span>Total R&R Support:</span>
                    <span className="font-mono">
                      ₹ {calculateTotal(assessmentForm).toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              </div>

              {/* 6. Override Option */}
              <div className="border border-slate-300 rounded p-3 bg-slate-50 space-y-2">
                <label className="flex items-center gap-2 font-bold text-slate-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={assessmentForm.override.active}
                    onChange={(e) =>
                      setAssessmentForm({
                        ...assessmentForm,
                        override: { ...assessmentForm.override, active: e.target.checked }
                      })
                    }
                    className="rounded text-[#1B365D]"
                  />
                  <span>Override Auto-Calculated Amount (Exceptional Circumstances)</span>
                </label>

                {assessmentForm.override.active && (
                  <div className="pl-6 space-y-2 pt-1">
                    <div>
                      <span className="text-[11px] text-slate-600 block mb-0.5">New Amount (₹):</span>
                      <input
                        type="number"
                        placeholder="Enter adjusted amount"
                        value={assessmentForm.override.newAmount || ""}
                        onChange={(e) =>
                          setAssessmentForm({
                            ...assessmentForm,
                            override: { ...assessmentForm.override, newAmount: Number(e.target.value) }
                          })
                        }
                        className="p-1.5 border border-slate-300 rounded text-xs w-48 bg-white"
                      />
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-600 block mb-0.5">
                        Reason / Statutory Justification:
                      </span>
                      <textarea
                        rows={2}
                        placeholder="State legal justification for entitlement modification..."
                        value={assessmentForm.override.reason}
                        onChange={(e) =>
                          setAssessmentForm({
                            ...assessmentForm,
                            override: { ...assessmentForm.override, reason: e.target.value }
                          })
                        }
                        className="w-full p-2 border border-slate-300 rounded text-xs bg-white"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="bg-slate-100 p-3.5 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2">
              <button
                onClick={handleSaveDraft}
                className="bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 px-3.5 py-1.5 rounded text-xs font-semibold cursor-pointer"
              >
                Save Draft
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleApproveEntitlement}
                  className="bg-emerald-700 hover:bg-emerald-800 text-white px-3.5 py-1.5 rounded text-xs font-bold shadow-2xs cursor-pointer"
                >
                  Approve Entitlement
                </button>

                <button
                  onClick={handleRequestFundRelease}
                  className="bg-[#1B365D] hover:bg-[#142946] text-white px-4 py-1.5 rounded text-xs font-bold flex items-center gap-1.5 shadow-2xs cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Request Fund Release</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FUND REQUEST SUCCESS BANNER / MODAL */}
      {fundRequestSuccess && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3">
          <div className="bg-white rounded-lg border border-slate-300 shadow-2xl w-full max-w-md p-5 space-y-4 text-xs">
            <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm border-b pb-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>Fund Release Request Dispatched</span>
            </div>

            <div className="p-3 bg-blue-50 border border-blue-200 rounded space-y-1.5 text-[11px]">
              <div className="flex justify-between">
                <span className="text-slate-600">Fund Request ID:</span>
                <strong className="font-mono text-[#1B365D]">{fundRequestSuccess.requestId}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Family:</span>
                <strong className="text-slate-900">{fundRequestSuccess.familyHead} ({fundRequestSuccess.familyId})</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Project:</span>
                <strong className="text-slate-900">{fundRequestSuccess.project}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Approved R&R Amount:</span>
                <strong className="text-emerald-800 font-mono text-xs">
                  ₹ {Number(fundRequestSuccess?.amount || 0).toLocaleString("en-IN")}
                </strong>
              </div>
              <div className="flex justify-between border-t border-blue-200 pt-1 mt-1">
                <span className="text-slate-600">Payment Status:</span>
                <span className="bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded text-[10px]">
                  Pending Financial Processing
                </span>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 leading-relaxed">
              The R&R Entitlement recommendation has been submitted to the Acquisition Finance & PFMS DBT module. Actual fund disbursement will be executed through the Treasury Payment Workflow.
            </p>

            <button
              onClick={() => setFundRequestSuccess(null)}
              className="w-full bg-[#1B365D] hover:bg-[#142946] text-white py-2 rounded text-xs font-bold transition-colors cursor-pointer"
            >
              Acknowledge & Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
