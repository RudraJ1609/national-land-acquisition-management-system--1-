import React, { useState } from "react";
import { useApp } from "../../context/AppContext.jsx";
import {
  ClipboardList,
  Calendar,
  MapPin,
  CheckCircle2,
  Clock,
  FileText,
  AlertTriangle,
  Users,
  Search,
  Filter,
  ArrowRight,
  ArrowLeft,
  Save,
  Send,
  Camera,
  Upload,
  Check,
  Eye,
  Crosshair,
  Map,
  ShieldCheck,
  Sparkles,
  Building,
  Home,
  Briefcase,
  Layers,
  FileCheck,
  ChevronRight,
  X,
  Download,
  Phone,
  UserCheck,
  Activity,
  CheckCircle
} from "lucide-react";

export const Page35SiaSurveyTasks = () => {
  const { currentProject, navigateTo, currentUser } = useApp();

  // Active view mode: "tasks" | "form" | "review"
  const [viewMode, setViewMode] = useState("tasks");
  const [activeStep, setActiveStep] = useState(1);
  const [selectedTask, setSelectedTask] = useState(null);
  const [reviewTab, setReviewTab] = useState("survey-details");
  const [feedbackMsg, setFeedbackMsg] = useState("");
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [submittedTaskData, setSubmittedTaskData] = useState(null);

  // Search & Filters in Tasks view
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedVillageFilter, setSelectedVillageFilter] = useState("All");

  // Initial Survey Tasks Data
  const [tasks, setTasks] = useState([
    {
      id: "SIA-101",
      project: "Western Dedicated Freight Corridor (Highway & Rail Alignment)",
      district: "Ahmedabad / Anand",
      village: "Rampura",
      family: "Patel Family",
      familyHead: "Rameshwar Laljibhai Patel",
      spouseOrFather: "Laljibhai V. Patel",
      mobile: "+91 98250 44192",
      address: "House No. 42, Patel Vas, Rampura, Dist. Anand - 388350",
      membersCount: 5,
      maleMembers: 2,
      femaleMembers: 2,
      children: 1,
      elderly: 1,
      specialCategories: ["Senior Citizen"],
      surveyNumber: "142/A",
      landArea: "2.40 Acres",
      landType: "Agricultural",
      ownershipType: "Owner",
      propertyAffected: ["Agricultural land affected", "Trees affected", "Crops affected"],
      primaryOccupation: "Agriculture",
      landDependency: "Fully dependent",
      incomeSources: ["Agriculture", "Livestock"],
      monthlyIncome: "₹25,000–₹50,000",
      socialImpacts: ["Livelihood loss", "Agricultural land loss"],
      relocationRequired: "No",
      familyConcerns: "Family requests compensation at market rate with 100% solatium and direct job allotment for eldest son.",
      nearbyFacilities: ["School", "Road", "Electricity", "Water Supply"],
      communityAssets: ["Temple / Religious Place", "Water Body"],
      officerObservation: "Agricultural parcel under active cotton/tobacco cultivation. Tube-well operational on parcel border.",
      familyPhoto: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=400&auto=format&fit=crop&q=60",
      landPhoto: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&auto=format&fit=crop&q=60",
      propertyPhoto: "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?w=400&auto=format&fit=crop&q=60",
      gpsLat: "22.5645° N",
      gpsLong: "72.9288° E",
      gpsAccuracy: "± 2.8 meters",
      verifiedConfirmed: false,
      status: "Pending", // Pending, In Progress, Completed
      completedStep: 0,
      syncStatus: "Pending Sync",
      lastUpdated: "24-Aug-2026 10:15 AM",
      stepProgress: {
        familyDetails: "pending", // done, in_progress, pending
        landDetails: "pending",
        livelihood: "pending",
        socialImpact: "pending",
        infrastructure: "pending",
        submission: "pending"
      }
    },
    {
      id: "SIA-102",
      project: "Western Dedicated Freight Corridor (Section 4 - Anand Bypass)",
      district: "Ahmedabad / Anand",
      village: "Rampura",
      family: "Shah Family",
      familyHead: "Jayantilal Manilal Shah",
      spouseOrFather: "Manilal C. Shah",
      mobile: "+91 94280 19384",
      address: "Bazaar Road, Nr. Old Post Office, Rampura",
      membersCount: 4,
      maleMembers: 2,
      femaleMembers: 2,
      children: 0,
      elderly: 2,
      specialCategories: ["Senior Citizen"],
      surveyNumber: "145/1",
      landArea: "1.80 Acres",
      landType: "Agricultural",
      ownershipType: "Joint Ownership",
      propertyAffected: ["Agricultural land affected", "House affected"],
      primaryOccupation: "Business",
      landDependency: "Partially dependent",
      incomeSources: ["Business", "Agriculture"],
      monthlyIncome: "Above ₹50,000",
      socialImpacts: ["House displacement", "Livelihood loss"],
      relocationRequired: "Yes",
      familyConcerns: "Requested alternative residential plot near village periphery with municipal road connection.",
      nearbyFacilities: ["School", "Hospital", "Road", "Public Transport"],
      communityAssets: ["Road"],
      officerObservation: "Boundary wall and residential outhouse partly falls within 45m ROW.",
      familyPhoto: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=60",
      landPhoto: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&auto=format&fit=crop&q=60",
      propertyPhoto: null,
      gpsLat: "22.5689° N",
      gpsLong: "72.9341° E",
      gpsAccuracy: "± 3.1 meters",
      verifiedConfirmed: false,
      status: "In Progress",
      completedStep: 3,
      syncStatus: "Pending Sync",
      lastUpdated: "24-Aug-2026 11:30 AM",
      stepProgress: {
        familyDetails: "done",
        landDetails: "done",
        livelihood: "done",
        socialImpact: "in_progress",
        infrastructure: "pending",
        submission: "pending"
      }
    },
    {
      id: "SIA-103",
      project: "National High Speed Railway (Bullet Train Package C-4)",
      district: "Ahmedabad / Anand",
      village: "Navli (Village X)",
      family: "Kumar Family",
      familyHead: "Smt. Shantaben Dahyabhai Parmar (Kumar)",
      spouseOrFather: "Late Dahyabhai Parmar",
      mobile: "+91 97120 63810",
      address: "Station Road, Navli, Anand",
      membersCount: 3,
      maleMembers: 1,
      femaleMembers: 2,
      children: 0,
      elderly: 1,
      specialCategories: ["Female Headed Family", "Senior Citizen"],
      surveyNumber: "148/2",
      landArea: "3.10 Acres",
      landType: "Agricultural",
      ownershipType: "Owner",
      propertyAffected: ["Agricultural land affected", "Crops affected"],
      primaryOccupation: "Labour",
      landDependency: "Fully dependent",
      incomeSources: ["Agriculture", "Employment", "Pension"],
      monthlyIncome: "₹10,000–₹25,000",
      socialImpacts: ["Livelihood loss", "Agricultural land loss"],
      relocationRequired: "No",
      familyConcerns: "Subsistence allowance and monthly annuity requested under Second Schedule.",
      nearbyFacilities: ["School", "Hospital", "Water Supply", "Electricity"],
      communityAssets: ["Water Body", "Temple / Religious Place"],
      officerObservation: "Eligible for Female Headed Family special grant and priority PFMS DBT credit.",
      familyPhoto: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=60",
      landPhoto: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&auto=format&fit=crop&q=60",
      propertyPhoto: "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?w=400&auto=format&fit=crop&q=60",
      gpsLat: "22.5804° N",
      gpsLong: "72.9441° E",
      gpsAccuracy: "± 2.4 meters",
      verifiedConfirmed: true,
      status: "Completed",
      completedStep: 6,
      syncStatus: "Synced",
      lastUpdated: "23-Aug-2026 04:45 PM",
      stepProgress: {
        familyDetails: "done",
        landDetails: "done",
        livelihood: "done",
        socialImpact: "done",
        infrastructure: "done",
        submission: "done"
      }
    },
    {
      id: "SIA-104",
      project: "Vadodara-Mumbai Expressway Connector Corridor",
      district: "Ahmedabad / Anand",
      village: "Bandhani",
      family: "Rathod Family",
      familyHead: "Devendra M. Rathod",
      spouseOrFather: "Manubhai Rathod",
      mobile: "+91 99041 87291",
      address: "Plot 12, Kumbhar Vas, Bandhani",
      membersCount: 6,
      maleMembers: 3,
      femaleMembers: 3,
      children: 2,
      elderly: 1,
      specialCategories: ["Other Vulnerable Category"],
      surveyNumber: "155/3",
      landArea: "1.25 Acres",
      landType: "Residential",
      ownershipType: "Owner",
      propertyAffected: ["House affected", "Shop affected"],
      primaryOccupation: "Business",
      landDependency: "Fully dependent",
      incomeSources: ["Business"],
      monthlyIncome: "₹10,000–₹25,000",
      socialImpacts: ["House displacement", "Business loss"],
      relocationRequired: "Yes",
      familyConcerns: "Pottery shed and artisan workshop will need commercial relocation grant.",
      nearbyFacilities: ["School", "Road", "Water Supply"],
      communityAssets: ["Community Hall"],
      officerObservation: "Artisan family. Second Schedule Item 5 (Artisan Relocation Grant ₹25,000) applicable.",
      familyPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60",
      landPhoto: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&auto=format&fit=crop&q=60",
      propertyPhoto: "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?w=400&auto=format&fit=crop&q=60",
      gpsLat: "22.5921° N",
      gpsLong: "72.9512° E",
      gpsAccuracy: "± 3.0 meters",
      verifiedConfirmed: false,
      status: "Pending",
      completedStep: 0,
      syncStatus: "Pending Sync",
      lastUpdated: "24-Aug-2026 09:00 AM",
      stepProgress: {
        familyDetails: "pending",
        landDetails: "pending",
        livelihood: "pending",
        socialImpact: "pending",
        infrastructure: "pending",
        submission: "pending"
      }
    }
  ]);

  // Form State
  const [formData, setFormData] = useState({
    // Step 1: Family Details
    familyHead: "",
    spouseOrFather: "",
    mobile: "",
    address: "",
    membersCount: 4,
    maleMembers: 2,
    femaleMembers: 2,
    children: 0,
    elderly: 0,
    specialCategories: [],

    // Step 2: Land & Property Details
    surveyNumber: "",
    landArea: "",
    landType: "Agricultural",
    ownershipType: "Owner",
    propertyAffected: [],

    // Step 3: Livelihood & Income
    primaryOccupation: "Agriculture",
    landDependency: "Fully dependent",
    incomeSources: ["Agriculture"],
    monthlyIncome: "₹25,000–₹50,000",

    // Step 4: Social Impact Assessment
    socialImpacts: ["Agricultural land loss"],
    relocationRequired: "No",
    familyConcerns: "",

    // Step 5: Infrastructure & Community Impact
    nearbyFacilities: ["School", "Road", "Electricity"],
    communityAssets: ["Road"],
    officerObservation: "",

    // Step 6: Photo, GPS & Final Submission
    familyPhoto: null,
    landPhoto: null,
    propertyPhoto: null,
    gpsLat: "22.5645° N",
    gpsLong: "72.9288° E",
    gpsAccuracy: "± 2.8 meters",
    verifiedConfirmed: false
  });

  // Calculate Summary metrics
  const totalAssigned = tasks.length;
  const completedCount = tasks.filter((t) => t.status === "Completed").length;
  const pendingCount = tasks.filter((t) => t.status === "Pending").length;
  const pendingSyncCount = tasks.filter((t) => t.syncStatus === "Pending Sync").length;

  // Filter tasks
  const filteredTasks = tasks.filter((t) => {
    const matchesSearch =
      t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.family.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.familyHead.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.village.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.project.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All" || t.status === statusFilter;
    const matchesVillage = selectedVillageFilter === "All" || t.village === selectedVillageFilter;
    return matchesSearch && matchesStatus && matchesVillage;
  });

  // Start / Continue Survey
  const handleStartSurvey = (task) => {
    setSelectedTask(task);
    setFormData({
      familyHead: task.familyHead || "",
      spouseOrFather: task.spouseOrFather || "",
      mobile: task.mobile || "",
      address: task.address || "",
      membersCount: task.membersCount || 4,
      maleMembers: task.maleMembers || 2,
      femaleMembers: task.femaleMembers || 2,
      children: task.children || 0,
      elderly: task.elderly || 0,
      specialCategories: task.specialCategories || [],

      surveyNumber: task.surveyNumber || "142/A",
      landArea: task.landArea || "2.40 Acres",
      landType: task.landType || "Agricultural",
      ownershipType: task.ownershipType || "Owner",
      propertyAffected: task.propertyAffected || ["Agricultural land affected"],

      primaryOccupation: task.primaryOccupation || "Agriculture",
      landDependency: task.landDependency || "Fully dependent",
      incomeSources: task.incomeSources || ["Agriculture"],
      monthlyIncome: task.monthlyIncome || "₹25,000–₹50,000",

      socialImpacts: task.socialImpacts || ["Agricultural land loss"],
      relocationRequired: task.relocationRequired || "No",
      familyConcerns: task.familyConcerns || "",

      nearbyFacilities: task.nearbyFacilities || ["School", "Road", "Electricity"],
      communityAssets: task.communityAssets || ["Road"],
      officerObservation: task.officerObservation || "",

      familyPhoto: task.familyPhoto || null,
      landPhoto: task.landPhoto || null,
      propertyPhoto: task.propertyPhoto || null,
      gpsLat: task.gpsLat || "22.5645° N",
      gpsLong: task.gpsLong || "72.9288° E",
      gpsAccuracy: task.gpsAccuracy || "± 2.8 meters",
      verifiedConfirmed: task.verifiedConfirmed || false
    });

    if (task.status === "Pending") {
      setActiveStep(1);
    } else if (task.status === "In Progress") {
      setActiveStep(Math.max(1, Math.min(6, (task.completedStep || 2) + 1)));
    } else {
      setActiveStep(1);
    }

    setViewMode("form");
  };

  // View completed survey review
  const handleViewReview = (task) => {
    setSelectedTask(task);
    setReviewTab("survey-details");
    setViewMode("review");
  };

  // Checkbox helpers
  const handleCheckboxToggle = (field, value) => {
    setFormData((prev) => {
      const currentList = prev[field] || [];
      if (currentList.includes(value)) {
        return { ...prev, [field]: currentList.filter((item) => item !== value) };
      } else {
        return { ...prev, [field]: [...currentList, value] };
      }
    });
  };

  // Mock GPS Capture
  const handleCaptureGps = () => {
    const lat = (22.564 + Math.random() * 0.03).toFixed(4);
    const lng = (72.928 + Math.random() * 0.03).toFixed(4);
    setFormData((prev) => ({
      ...prev,
      gpsLat: `${lat}° N`,
      gpsLong: `${lng}° E`,
      gpsAccuracy: `± ${(2.0 + Math.random() * 1.5).toFixed(1)} meters`
    }));
    setFeedbackMsg("Live GPS coordinates locked via GNSS Satellite Fix.");
    setTimeout(() => setFeedbackMsg(""), 3500);
  };

  // Mock Photo Upload / Camera simulation
  const handleSimulatePhoto = (field) => {
    const mockPhotos = {
      familyPhoto: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=400&auto=format&fit=crop&q=60",
      landPhoto: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&auto=format&fit=crop&q=60",
      propertyPhoto: "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?w=400&auto=format&fit=crop&q=60"
    };
    setFormData((prev) => ({
      ...prev,
      [field]: mockPhotos[field]
    }));
    setFeedbackMsg("Geo-tagged field photo attached successfully.");
    setTimeout(() => setFeedbackMsg(""), 3000);
  };

  // Save Draft at any step
  const handleSaveDraft = () => {
    if (!selectedTask) return;
    const stepNames = ["familyDetails", "landDetails", "livelihood", "socialImpact", "infrastructure", "submission"];
    const updatedStepProgress = { ...selectedTask.stepProgress };
    
    for (let i = 0; i < activeStep - 1; i++) {
      updatedStepProgress[stepNames[i]] = "done";
    }
    updatedStepProgress[stepNames[activeStep - 1]] = "in_progress";

    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === selectedTask.id) {
          return {
            ...t,
            ...formData,
            status: "In Progress",
            completedStep: activeStep,
            stepProgress: updatedStepProgress,
            lastUpdated: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })
          };
        }
        return t;
      })
    );

    setFeedbackMsg(`Draft progress saved for Step ${activeStep} (${selectedTask.id}). Stored in secure local cache.`);
    setTimeout(() => setFeedbackMsg(""), 3500);
  };

  // Step Next button
  const handleNextStep = () => {
    if (activeStep < 6) {
      // Mark current step as done in local progress
      handleSaveDraft();
      setActiveStep(activeStep + 1);
    }
  };

  // Step Previous button
  const handlePrevStep = () => {
    if (activeStep > 1) {
      setActiveStep(activeStep - 1);
    }
  };

  // Final Submit
  const handleFinalSubmit = (e) => {
    e?.preventDefault();
    if (!formData.verifiedConfirmed) {
      setFeedbackMsg("⚠️ Please check the declaration checkbox confirming that survey information has been verified on-ground.");
      setTimeout(() => setFeedbackMsg(""), 4000);
      return;
    }

    const updatedTask = {
      ...selectedTask,
      ...formData,
      status: "Completed",
      completedStep: 6,
      syncStatus: "Synced",
      lastUpdated: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }),
      stepProgress: {
        familyDetails: "done",
        landDetails: "done",
        livelihood: "done",
        socialImpact: "done",
        infrastructure: "done",
        submission: "done"
      }
    };

    setTasks((prev) =>
      prev.map((t) => (t.id === selectedTask.id ? updatedTask : t))
    );

    setSubmittedTaskData(updatedTask);
    setShowSubmitModal(true);
  };

  // Helper to compute progress percentage for a task
  const calculateTaskProgress = (task) => {
    if (task.status === "Completed") return 100;
    if (task.status === "Pending") return 0;
    const p = task.stepProgress;
    let doneCount = 0;
    if (p.familyDetails === "done") doneCount++;
    if (p.landDetails === "done") doneCount++;
    if (p.livelihood === "done") doneCount++;
    if (p.socialImpact === "done") doneCount++;
    if (p.infrastructure === "done") doneCount++;
    if (p.submission === "done") doneCount++;
    return Math.round((doneCount / 6) * 100) || 40;
  };

  const stepsList = [
    { num: 1, label: "Family Details", id: "familyDetails" },
    { num: 2, label: "Land Details", id: "landDetails" },
    { num: 3, label: "Livelihood", id: "livelihood" },
    { num: 4, label: "Social Impact", id: "socialImpact" },
    { num: 5, label: "Infrastructure", id: "infrastructure" },
    { num: 6, label: "Review & Submit", id: "submission" }
  ];

  return (
    <div className="space-y-6 pb-16">
      {/* Toast Feedback Notification */}
      {feedbackMsg && (
        <div className="fixed bottom-5 right-5 z-50 bg-[#1B365D] text-white border border-[#C5A059] px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 text-xs font-semibold animate-fade-in">
          <CheckCircle className="w-4 h-4 text-[#C5A059] shrink-0" />
          <span>{feedbackMsg}</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 1. SIA OFFICER DASHBOARD / MY SURVEY TASKS VIEW                            */}
      {/* ========================================================================= */}
      {viewMode === "tasks" && (
        <div className="space-y-6">
          {/* Top Header Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
            <div>
              <div className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
                District Authority • Social Impact Assessment (SIA) Unit
              </div>
              <h1 className="text-xl font-bold text-slate-900 leading-tight flex items-center gap-2 mt-0.5">
                <ClipboardList className="w-5 h-5 text-[#1B365D]" />
                SIA Officer Dashboard & Assigned Survey Tasks
              </h1>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setFeedbackMsg("All local field records synchronized with National Portal Cloud.");
                  setTimeout(() => setFeedbackMsg(""), 3500);
                }}
                className="bg-white border border-[#D1D5DB] hover:bg-slate-50 text-slate-700 px-3 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
              >
                <Activity className="w-3.5 h-3.5 text-blue-600" />
                <span>Sync Offline Data</span>
              </button>

              <button
                onClick={() => handleStartSurvey(tasks[0])}
                className="bg-[#1B365D] hover:bg-[#142946] text-white px-3.5 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
              >
                <FileCheck className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Start Next Pending Survey</span>
              </button>
            </div>
          </div>

          {/* 4 Summary Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div className="bg-white border border-[#D1D5DB] rounded-lg p-4 shadow-2xs">
              <span className="text-slate-500 font-semibold text-[10px] uppercase block">Total Assigned Surveys</span>
              <div className="text-2xl font-bold text-[#1B365D] mt-1">{totalAssigned} Families</div>
              <span className="text-[11px] text-slate-600 block mt-1">Across 3 Revenue Villages</span>
            </div>

            <div className="bg-white border border-[#D1D5DB] rounded-lg p-4 shadow-2xs">
              <span className="text-slate-500 font-semibold text-[10px] uppercase block">Completed Surveys</span>
              <div className="text-2xl font-bold text-emerald-700 mt-1">{completedCount} Surveys</div>
              <span className="text-[11px] text-emerald-800 font-medium block mt-1">Verified on Ground & Signed</span>
            </div>

            <div className="bg-white border border-[#D1D5DB] rounded-lg p-4 shadow-2xs">
              <span className="text-slate-500 font-semibold text-[10px] uppercase block">Pending Surveys</span>
              <div className="text-2xl font-bold text-amber-700 mt-1">{pendingCount} Surveys</div>
              <span className="text-[11px] text-amber-800 font-medium block mt-1">Field Enumeration Required</span>
            </div>

            <div className="bg-white border border-[#D1D5DB] rounded-lg p-4 shadow-2xs">
              <span className="text-slate-500 font-semibold text-[10px] uppercase block">Pending Sync</span>
              <div className="text-2xl font-bold text-blue-700 mt-1">{pendingSyncCount} Records</div>
              <span className="text-[11px] text-blue-800 font-medium block mt-1">Stored in Device Cache</span>
            </div>
          </div>

          {/* Filter & Search Bar */}
          <div className="bg-white border border-[#D1D5DB] rounded-lg p-4 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex-1 w-full relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by Survey ID, Family Name, Head of Family, Village, or Project..."
                className="w-full pl-9 pr-3 py-2 border border-[#D1D5DB] rounded text-slate-900 focus:border-[#1B365D] focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="flex items-center gap-1.5 shrink-0">
                <label className="font-semibold text-slate-700">Village:</label>
                <select
                  value={selectedVillageFilter}
                  onChange={(e) => setSelectedVillageFilter(e.target.value)}
                  className="p-2 border border-[#D1D5DB] rounded bg-white text-slate-900 font-medium focus:border-[#1B365D] focus:outline-none"
                >
                  <option value="All">All Villages</option>
                  <option value="Rampura">Rampura</option>
                  <option value="Navli (Village X)">Navli (Village X)</option>
                  <option value="Bandhani">Bandhani</option>
                </select>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <label className="font-semibold text-slate-700">Status:</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="p-2 border border-[#D1D5DB] rounded bg-white text-slate-900 font-medium focus:border-[#1B365D] focus:outline-none"
                >
                  <option value="All">All Statuses</option>
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>
          </div>

          {/* Survey Task Table with Interactive Step Progress Breakdown */}
          <div className="bg-white border border-[#D1D5DB] rounded-lg shadow-xs overflow-hidden">
            <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-sm font-bold text-[#1B365D]">
                  Assigned SIA Household Survey Tasks
                </h2>
                <p className="text-[11px] text-slate-500">
                  Direct socio-economic field enumeration under RFCTLARR Section 4 to Section 9
                </p>
              </div>
              <span className="text-xs text-slate-500 font-medium">
                Showing {filteredTasks.length} of {tasks.length} Surveys
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border border-slate-200">
                <thead className="bg-[#e2e8f0] text-[#475569] font-semibold border-b border-[#cbd5e1] uppercase text-[11px]">
                  <tr>
                    <th className="py-2.5 px-3 border-r border-[#cbd5e1]">Survey ID</th>
                    <th className="py-2.5 px-3 border-r border-[#cbd5e1]">Project</th>
                    <th className="py-2.5 px-3 border-r border-[#cbd5e1]">Village</th>
                    <th className="py-2.5 px-3 border-r border-[#cbd5e1]">Family / Head</th>
                    <th className="py-2.5 px-3 border-r border-[#cbd5e1] min-w-[220px]">Step-by-Step Progress</th>
                    <th className="py-2.5 px-3 border-r border-[#cbd5e1] text-center">Status</th>
                    <th className="py-2.5 px-3 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {filteredTasks.map((t) => {
                    const progressPct = calculateTaskProgress(t);
                    return (
                      <tr key={t.id} className="hover:bg-slate-50 transition-colors">
                        {/* Survey ID */}
                        <td className="py-3 px-3 border-r border-slate-200 font-mono font-bold text-[#1B365D]">
                          {t.id}
                        </td>

                        {/* Project */}
                        <td className="py-3 px-3 border-r border-slate-200 max-w-[200px]">
                          <div className="font-semibold text-slate-800 line-clamp-1">{t.project}</div>
                          <div className="text-[10px] text-slate-500">Dist: {t.district}</div>
                        </td>

                        {/* Village */}
                        <td className="py-3 px-3 border-r border-slate-200">
                          <span className="font-medium text-slate-800">{t.village}</span>
                          <div className="text-[10px] text-slate-500 font-mono">Survey #{t.surveyNumber}</div>
                        </td>

                        {/* Family */}
                        <td className="py-3 px-3 border-r border-slate-200">
                          <div className="font-bold text-slate-900">{t.family}</div>
                          <div className="text-[11px] text-slate-600">{t.familyHead}</div>
                          <div className="text-[10px] text-slate-500">{t.membersCount} Members ({t.landArea})</div>
                        </td>

                        {/* Progress Tracking (Tick Tick Visual breakdown) */}
                        <td className="py-3 px-3 border-r border-slate-200 bg-slate-50/50">
                          <div className="space-y-1.5">
                            <div className="flex items-center justify-between text-[11px]">
                              <span className="font-semibold text-slate-700">Survey Checklist</span>
                              <span className="font-bold text-[#1B365D]">{progressPct}%</span>
                            </div>

                            {/* Progress bar */}
                            <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                              <div
                                className={`h-1.5 rounded-full transition-all duration-300 ${
                                  t.status === "Completed"
                                    ? "bg-emerald-600"
                                    : t.status === "In Progress"
                                    ? "bg-blue-600"
                                    : "bg-slate-300"
                                }`}
                                style={{ width: `${progressPct}%` }}
                              ></div>
                            </div>

                            {/* Micro Step Badges */}
                            <div className="grid grid-cols-6 gap-1 text-[9px] text-center pt-0.5 font-medium">
                              <span
                                title="Family Details"
                                className={`py-0.5 rounded px-0.5 truncate ${
                                  t.stepProgress.familyDetails === "done"
                                    ? "bg-emerald-100 text-emerald-800 font-bold"
                                    : t.stepProgress.familyDetails === "in_progress"
                                    ? "bg-blue-100 text-blue-800 font-bold"
                                    : "bg-slate-100 text-slate-500"
                                }`}
                              >
                                {t.stepProgress.familyDetails === "done" ? "✓ Fam" : "Fam"}
                              </span>

                              <span
                                title="Land Details"
                                className={`py-0.5 rounded px-0.5 truncate ${
                                  t.stepProgress.landDetails === "done"
                                    ? "bg-emerald-100 text-emerald-800 font-bold"
                                    : t.stepProgress.landDetails === "in_progress"
                                    ? "bg-blue-100 text-blue-800 font-bold"
                                    : "bg-slate-100 text-slate-500"
                                }`}
                              >
                                {t.stepProgress.landDetails === "done" ? "✓ Lnd" : "Lnd"}
                              </span>

                              <span
                                title="Livelihood"
                                className={`py-0.5 rounded px-0.5 truncate ${
                                  t.stepProgress.livelihood === "done"
                                    ? "bg-emerald-100 text-emerald-800 font-bold"
                                    : t.stepProgress.livelihood === "in_progress"
                                    ? "bg-blue-100 text-blue-800 font-bold"
                                    : "bg-slate-100 text-slate-500"
                                }`}
                              >
                                {t.stepProgress.livelihood === "done" ? "✓ Liv" : "Liv"}
                              </span>

                              <span
                                title="Social Impact"
                                className={`py-0.5 rounded px-0.5 truncate ${
                                  t.stepProgress.socialImpact === "done"
                                    ? "bg-emerald-100 text-emerald-800 font-bold"
                                    : t.stepProgress.socialImpact === "in_progress"
                                    ? "bg-blue-100 text-blue-800 font-bold"
                                    : "bg-slate-100 text-slate-500"
                                }`}
                              >
                                {t.stepProgress.socialImpact === "done" ? "✓ Soc" : "Soc"}
                              </span>

                              <span
                                title="Infrastructure"
                                className={`py-0.5 rounded px-0.5 truncate ${
                                  t.stepProgress.infrastructure === "done"
                                    ? "bg-emerald-100 text-emerald-800 font-bold"
                                    : t.stepProgress.infrastructure === "in_progress"
                                    ? "bg-blue-100 text-blue-800 font-bold"
                                    : "bg-slate-100 text-slate-500"
                                }`}
                              >
                                {t.stepProgress.infrastructure === "done" ? "✓ Inf" : "Inf"}
                              </span>

                              <span
                                title="Final Submission"
                                className={`py-0.5 rounded px-0.5 truncate ${
                                  t.stepProgress.submission === "done"
                                    ? "bg-emerald-100 text-emerald-800 font-bold"
                                    : "bg-slate-100 text-slate-500"
                                }`}
                              >
                                {t.stepProgress.submission === "done" ? "✓ Sub" : "Sub"}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Status Badge */}
                        <td className="py-3 px-3 border-r border-slate-200 text-center">
                          <span
                            className={`inline-block px-2.5 py-1 rounded text-[11px] font-bold ${
                              t.status === "Completed"
                                ? "bg-emerald-50 text-emerald-800 border border-emerald-300"
                                : t.status === "In Progress"
                                ? "bg-blue-50 text-blue-800 border border-blue-300"
                                : "bg-amber-50 text-amber-800 border border-amber-300"
                            }`}
                          >
                            {t.status}
                          </span>
                        </td>

                        {/* Action Buttons */}
                        <td className="py-3 px-3 text-center">
                          {t.status === "Pending" && (
                            <button
                              onClick={() => handleStartSurvey(t)}
                              className="bg-[#1B365D] hover:bg-[#142946] text-white px-3 py-1.5 rounded text-xs font-semibold flex items-center justify-center gap-1 w-full transition-colors shadow-2xs cursor-pointer"
                            >
                              <span>Start Survey</span>
                              <ArrowRight className="w-3 h-3 text-[#C5A059]" />
                            </button>
                          )}

                          {t.status === "In Progress" && (
                            <button
                              onClick={() => handleStartSurvey(t)}
                              className="bg-blue-700 hover:bg-blue-800 text-white px-3 py-1.5 rounded text-xs font-semibold flex items-center justify-center gap-1 w-full transition-colors shadow-2xs cursor-pointer"
                            >
                              <span>Continue</span>
                              <ChevronRight className="w-3 h-3" />
                            </button>
                          )}

                          {t.status === "Completed" && (
                            <button
                              onClick={() => handleViewReview(t)}
                              className="bg-white border border-[#1B365D] hover:bg-slate-50 text-[#1B365D] px-3 py-1.5 rounded text-xs font-semibold flex items-center justify-center gap-1 w-full transition-colors cursor-pointer shadow-2xs"
                            >
                              <Eye className="w-3.5 h-3.5 text-[#1B365D]" />
                              <span>View</span>
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. SIA SURVEY FORM – ACTUAL STEP-BY-STEP QUESTIONNAIRE                    */}
      {/* ========================================================================= */}
      {viewMode === "form" && selectedTask && (
        <div className="space-y-6">
          {/* Top Form Header */}
          <div className="bg-white border border-[#D1D5DB] rounded-lg p-4 shadow-2xs space-y-3">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
              <div>
                <div className="text-[11px] text-slate-500 font-semibold uppercase flex items-center gap-1">
                  <span>RFCTLARR Section 4 SIA Questionnaire</span>
                  <span>•</span>
                  <span className="text-[#1B365D] font-bold">Survey ID: {selectedTask.id}</span>
                </div>
                <h1 className="text-lg font-bold text-slate-900 leading-tight flex items-center gap-2 mt-0.5">
                  <ClipboardList className="w-5 h-5 text-[#1B365D]" />
                  Household Social Impact Assessment Questionnaire
                </h1>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setViewMode("tasks")}
                  className="bg-white border border-[#D1D5DB] hover:bg-slate-50 text-slate-700 px-3 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Tasks</span>
                </button>

                <button
                  type="button"
                  onClick={handleSaveDraft}
                  className="bg-white border border-[#1B365D] hover:bg-slate-50 text-[#1B365D] px-3.5 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Save Draft</span>
                </button>
              </div>
            </div>

            {/* Project & Household Metadata Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-slate-50 p-3 rounded border border-slate-200">
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-semibold">Project</span>
                <span className="font-bold text-slate-900 line-clamp-1">{selectedTask.project}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-semibold">District & Village</span>
                <span className="font-bold text-slate-900">{selectedTask.district} • {selectedTask.village}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-semibold">Assigned Family</span>
                <span className="font-bold text-slate-900">{selectedTask.family} ({formData.familyHead || selectedTask.familyHead})</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-semibold">Current Progress</span>
                <span className="font-bold text-[#1B365D]">Step {activeStep} of 6</span>
              </div>
            </div>

            {/* Progress Indicator Stepper */}
            <div className="pt-2">
              <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
                {stepsList.map((st) => {
                  const isCompleted = st.num < activeStep;
                  const isCurrent = st.num === activeStep;
                  return (
                    <button
                      key={st.num}
                      type="button"
                      onClick={() => setActiveStep(st.num)}
                      className={`p-2 rounded text-left border transition-all text-xs flex items-center gap-2 cursor-pointer ${
                        isCurrent
                          ? "bg-[#1B365D] text-white border-[#1B365D] shadow-xs"
                          : isCompleted
                          ? "bg-emerald-50 text-emerald-900 border-emerald-300"
                          : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 font-bold text-[10px] ${
                          isCurrent
                            ? "bg-[#C5A059] text-slate-900"
                            : isCompleted
                            ? "bg-emerald-600 text-white"
                            : "bg-slate-300 text-slate-700"
                        }`}
                      >
                        {isCompleted ? "✓" : isCurrent ? "→" : st.num}
                      </div>
                      <span className="font-semibold truncate text-[11px]">{st.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Step Form Container */}
          <div className="bg-white border border-[#D1D5DB] rounded-lg p-5 shadow-xs">
            {/* STEP 1: FAMILY DETAILS */}
            {activeStep === 1 && (
              <div className="space-y-4">
                <div className="border-b border-slate-200 pb-2">
                  <h2 className="text-sm font-bold text-[#1B365D] flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#1B365D]" />
                    Step 1: Family Details & Demographic Profile
                  </h2>
                  <p className="text-xs text-slate-500">
                    Record head of household, family size, vulnerable person categorization
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">
                      Family Head Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.familyHead}
                      onChange={(e) => setFormData({ ...formData, familyHead: e.target.value })}
                      placeholder="e.g. Rameshwar Laljibhai Patel"
                      className="w-full p-2 border border-[#D1D5DB] rounded text-slate-900 focus:border-[#1B365D] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">
                      Father's / Spouse Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.spouseOrFather}
                      onChange={(e) => setFormData({ ...formData, spouseOrFather: e.target.value })}
                      placeholder="e.g. Laljibhai V. Patel"
                      className="w-full p-2 border border-[#D1D5DB] rounded text-slate-900 focus:border-[#1B365D] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">
                      Mobile Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.mobile}
                      onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                      placeholder="+91 98250 XXXXX"
                      className="w-full p-2 border border-[#D1D5DB] rounded text-slate-900 focus:border-[#1B365D] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">
                      Residential Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="House No, Street, Village, Taluka"
                      className="w-full p-2 border border-[#D1D5DB] rounded text-slate-900 focus:border-[#1B365D] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Family Members Breakdown */}
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-3">
                  <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wide">
                    Family Size Breakdown
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
                    <div>
                      <label className="font-semibold text-slate-600 block mb-1">Total Members</label>
                      <input
                        type="number"
                        min="1"
                        value={formData.membersCount}
                        onChange={(e) => setFormData({ ...formData, membersCount: Number(e.target.value) })}
                        className="w-full p-2 border border-[#D1D5DB] rounded text-slate-900 bg-white"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-slate-600 block mb-1">Male Members</label>
                      <input
                        type="number"
                        min="0"
                        value={formData.maleMembers}
                        onChange={(e) => setFormData({ ...formData, maleMembers: Number(e.target.value) })}
                        className="w-full p-2 border border-[#D1D5DB] rounded text-slate-900 bg-white"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-slate-600 block mb-1">Female Members</label>
                      <input
                        type="number"
                        min="0"
                        value={formData.femaleMembers}
                        onChange={(e) => setFormData({ ...formData, femaleMembers: Number(e.target.value) })}
                        className="w-full p-2 border border-[#D1D5DB] rounded text-slate-900 bg-white"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-slate-600 block mb-1">Children (&lt; 18 Yrs)</label>
                      <input
                        type="number"
                        min="0"
                        value={formData.children}
                        onChange={(e) => setFormData({ ...formData, children: Number(e.target.value) })}
                        className="w-full p-2 border border-[#D1D5DB] rounded text-slate-900 bg-white"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-slate-600 block mb-1">Elderly (&gt; 60 Yrs)</label>
                      <input
                        type="number"
                        min="0"
                        value={formData.elderly}
                        onChange={(e) => setFormData({ ...formData, elderly: Number(e.target.value) })}
                        className="w-full p-2 border border-[#D1D5DB] rounded text-slate-900 bg-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Special Category Checkboxes */}
                <div className="space-y-2 pt-1">
                  <label className="font-bold text-slate-800 text-xs block">
                    Special Category / Vulnerable Demographics:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {[
                      "Senior Citizen",
                      "Person with Disability",
                      "Female Headed Family",
                      "Other Vulnerable Category"
                    ].map((cat) => (
                      <label
                        key={cat}
                        className={`flex items-center gap-2 p-2.5 rounded border cursor-pointer transition-colors ${
                          formData.specialCategories.includes(cat)
                            ? "bg-blue-50 border-blue-300 text-blue-900 font-semibold"
                            : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={formData.specialCategories.includes(cat)}
                          onChange={() => handleCheckboxToggle("specialCategories", cat)}
                          className="w-4 h-4 text-[#1B365D] rounded border-slate-300 focus:ring-0"
                        />
                        <span>{cat}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: LAND AND PROPERTY DETAILS */}
            {activeStep === 2 && (
              <div className="space-y-4">
                <div className="border-b border-slate-200 pb-2">
                  <h2 className="text-sm font-bold text-[#1B365D] flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#1B365D]" />
                    Step 2: Land and Property Details
                  </h2>
                  <p className="text-xs text-slate-500">
                    Specify parcel number, extent of acquisition, classification and affected assets
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">
                      Survey Number / Parcel Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.surveyNumber}
                      onChange={(e) => setFormData({ ...formData, surveyNumber: e.target.value })}
                      placeholder="e.g. 142/A"
                      className="w-full p-2 border border-[#D1D5DB] rounded text-slate-900 focus:border-[#1B365D] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">
                      Land Area Under Acquisition <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.landArea}
                      onChange={(e) => setFormData({ ...formData, landArea: e.target.value })}
                      placeholder="e.g. 2.40 Acres"
                      className="w-full p-2 border border-[#D1D5DB] rounded text-slate-900 focus:border-[#1B365D] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">
                      Land Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.landType}
                      onChange={(e) => setFormData({ ...formData, landType: e.target.value })}
                      className="w-full p-2 border border-[#D1D5DB] rounded text-slate-900 bg-white focus:border-[#1B365D] focus:outline-none"
                    >
                      <option value="Agricultural">Agricultural</option>
                      <option value="Residential">Residential</option>
                      <option value="Commercial">Commercial</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">
                      Ownership Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.ownershipType}
                      onChange={(e) => setFormData({ ...formData, ownershipType: e.target.value })}
                      className="w-full p-2 border border-[#D1D5DB] rounded text-slate-900 bg-white focus:border-[#1B365D] focus:outline-none"
                    >
                      <option value="Owner">Owner</option>
                      <option value="Tenant">Tenant</option>
                      <option value="Joint Ownership">Joint Ownership</option>
                      <option value="Government Lease">Government Lease</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                {/* Property Affected Checkboxes */}
                <div className="space-y-2 pt-2">
                  <label className="font-bold text-slate-800 text-xs block">
                    Property / Assets Affected by Acquisition:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-xs">
                    {[
                      "House affected",
                      "Shop affected",
                      "Agricultural land affected",
                      "Trees affected",
                      "Crops affected"
                    ].map((prop) => (
                      <label
                        key={prop}
                        className={`flex items-center gap-2 p-2.5 rounded border cursor-pointer transition-colors ${
                          formData.propertyAffected.includes(prop)
                            ? "bg-blue-50 border-blue-300 text-blue-900 font-semibold"
                            : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={formData.propertyAffected.includes(prop)}
                          onChange={() => handleCheckboxToggle("propertyAffected", prop)}
                          className="w-4 h-4 text-[#1B365D] rounded border-slate-300 focus:ring-0"
                        />
                        <span>{prop}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: LIVELIHOOD & INCOME */}
            {activeStep === 3 && (
              <div className="space-y-5">
                <div className="border-b border-slate-200 pb-2">
                  <h2 className="text-sm font-bold text-[#1B365D] flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-[#1B365D]" />
                    Step 3: Livelihood & Income Profile
                  </h2>
                  <p className="text-xs text-slate-500">
                    Capture primary occupation, dependency on land and monthly income range
                  </p>
                </div>

                {/* Primary Occupation (Radio) */}
                <div className="space-y-2">
                  <label className="font-bold text-slate-800 text-xs block">
                    Primary Occupation <span className="text-red-500">*</span>:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                    {["Agriculture", "Labour", "Business", "Government Job", "Private Job", "Other"].map((occ) => (
                      <label
                        key={occ}
                        className={`flex items-center gap-2 p-2.5 rounded border cursor-pointer transition-colors ${
                          formData.primaryOccupation === occ
                            ? "bg-[#1B365D]/10 border-[#1B365D] text-[#1B365D] font-bold"
                            : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        <input
                          type="radio"
                          name="primaryOccupation"
                          checked={formData.primaryOccupation === occ}
                          onChange={() => setFormData({ ...formData, primaryOccupation: occ })}
                          className="w-4 h-4 text-[#1B365D] focus:ring-0"
                        />
                        <span>{occ}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Land Dependency (Radio) */}
                <div className="space-y-2">
                  <label className="font-bold text-slate-800 text-xs block">
                    Land Dependency: How dependent is the family on this land? <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                    {["Fully dependent", "Partially dependent", "Not dependent"].map((dep) => (
                      <label
                        key={dep}
                        className={`flex items-center gap-2 p-2.5 rounded border cursor-pointer transition-colors ${
                          formData.landDependency === dep
                            ? "bg-[#1B365D]/10 border-[#1B365D] text-[#1B365D] font-bold"
                            : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        <input
                          type="radio"
                          name="landDependency"
                          checked={formData.landDependency === dep}
                          onChange={() => setFormData({ ...formData, landDependency: dep })}
                          className="w-4 h-4 text-[#1B365D] focus:ring-0"
                        />
                        <span>{dep}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Income Source (Checkboxes) */}
                <div className="space-y-2">
                  <label className="font-bold text-slate-800 text-xs block">
                    Income Source(s) (Select all applicable):
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                    {["Agriculture", "Livestock", "Business", "Employment", "Pension", "Other"].map((src) => (
                      <label
                        key={src}
                        className={`flex items-center gap-2 p-2.5 rounded border cursor-pointer transition-colors ${
                          formData.incomeSources.includes(src)
                            ? "bg-blue-50 border-blue-300 text-blue-900 font-semibold"
                            : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={formData.incomeSources.includes(src)}
                          onChange={() => handleCheckboxToggle("incomeSources", src)}
                          className="w-4 h-4 text-[#1B365D] rounded border-slate-300 focus:ring-0"
                        />
                        <span>{src}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Estimated Monthly Income (Dropdown) */}
                <div className="max-w-md text-xs">
                  <label className="font-bold text-slate-800 block mb-1">
                    Estimated Monthly Household Income <span className="text-red-500">*</span>:
                  </label>
                  <select
                    value={formData.monthlyIncome}
                    onChange={(e) => setFormData({ ...formData, monthlyIncome: e.target.value })}
                    className="w-full p-2.5 border border-[#D1D5DB] rounded text-slate-900 bg-white font-medium focus:border-[#1B365D] focus:outline-none"
                  >
                    <option value="Below ₹10,000">Below ₹10,000</option>
                    <option value="₹10,000–₹25,000">₹10,000–₹25,000</option>
                    <option value="₹25,000–₹50,000">₹25,000–₹50,000</option>
                    <option value="Above ₹50,000">Above ₹50,000</option>
                  </select>
                </div>
              </div>
            )}

            {/* STEP 4: SOCIAL IMPACT ASSESSMENT */}
            {activeStep === 4 && (
              <div className="space-y-5">
                <div className="border-b border-slate-200 pb-2">
                  <h2 className="text-sm font-bold text-[#1B365D] flex items-center gap-2">
                    <HeartHandshake className="w-4 h-4 text-[#1B365D]" />
                    Step 4: Social Impact Assessment & Relocation Assessment
                  </h2>
                  <p className="text-xs text-slate-500">
                    Evaluate post-acquisition household impacts, displacement necessity and family concerns
                  </p>
                </div>

                {/* Acquisition Impact Checkboxes */}
                <div className="space-y-2">
                  <label className="font-bold text-slate-800 text-xs block">
                    Acquisition ke baad family par kya impact hoga? (Select all that apply):
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {[
                      "House displacement",
                      "Livelihood loss",
                      "Agricultural land loss",
                      "Business loss",
                      "Access road affected",
                      "School access affected",
                      "Healthcare access affected",
                      "Religious/Cultural site affected"
                    ].map((imp) => (
                      <label
                        key={imp}
                        className={`flex items-center gap-2 p-2.5 rounded border cursor-pointer transition-colors ${
                          formData.socialImpacts.includes(imp)
                            ? "bg-amber-50 border-amber-300 text-amber-900 font-semibold"
                            : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={formData.socialImpacts.includes(imp)}
                          onChange={() => handleCheckboxToggle("socialImpacts", imp)}
                          className="w-4 h-4 text-[#1B365D] rounded border-slate-300 focus:ring-0"
                        />
                        <span>{imp}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Relocation Required (Radio) */}
                <div className="space-y-2">
                  <label className="font-bold text-slate-800 text-xs block">
                    Relocation Required? <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-3 gap-2 text-xs max-w-lg">
                    {["Yes", "No", "Not Sure"].map((reloc) => (
                      <label
                        key={reloc}
                        className={`flex items-center gap-2 p-2.5 rounded border cursor-pointer transition-colors ${
                          formData.relocationRequired === reloc
                            ? "bg-[#1B365D]/10 border-[#1B365D] text-[#1B365D] font-bold"
                            : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        <input
                          type="radio"
                          name="relocationRequired"
                          checked={formData.relocationRequired === reloc}
                          onChange={() => setFormData({ ...formData, relocationRequired: reloc })}
                          className="w-4 h-4 text-[#1B365D] focus:ring-0"
                        />
                        <span>{reloc}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Family Concern Textarea */}
                <div className="space-y-1 text-xs">
                  <label className="font-bold text-slate-800 block">
                    Family Concern / Representations:
                  </label>
                  <textarea
                    rows={4}
                    value={formData.familyConcerns}
                    onChange={(e) => setFormData({ ...formData, familyConcerns: e.target.value })}
                    placeholder="Write family concerns, specific requests or survey observations recorded during public hearing / field meeting..."
                    className="w-full p-2.5 border border-[#D1D5DB] rounded text-slate-900 focus:border-[#1B365D] focus:outline-none"
                  ></textarea>
                </div>
              </div>
            )}

            {/* STEP 5: INFRASTRUCTURE & COMMUNITY IMPACT */}
            {activeStep === 5 && (
              <div className="space-y-5">
                <div className="border-b border-slate-200 pb-2">
                  <h2 className="text-sm font-bold text-[#1B365D] flex items-center gap-2">
                    <Building className="w-4 h-4 text-[#1B365D]" />
                    Step 5: Infrastructure & Community Asset Impact
                  </h2>
                  <p className="text-xs text-slate-500">
                    Document nearby public utilities, common property resources (CPR) and officer notes
                  </p>
                </div>

                {/* Nearby Facilities Checkboxes */}
                <div className="space-y-2">
                  <label className="font-bold text-slate-800 text-xs block">
                    Nearby Facilities within 1 km Radius:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                    {["School", "Hospital", "Road", "Water Supply", "Electricity", "Public Transport"].map((fac) => (
                      <label
                        key={fac}
                        className={`flex items-center gap-2 p-2.5 rounded border cursor-pointer transition-colors ${
                          formData.nearbyFacilities.includes(fac)
                            ? "bg-blue-50 border-blue-300 text-blue-900 font-semibold"
                            : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={formData.nearbyFacilities.includes(fac)}
                          onChange={() => handleCheckboxToggle("nearbyFacilities", fac)}
                          className="w-4 h-4 text-[#1B365D] rounded border-slate-300 focus:ring-0"
                        />
                        <span>{fac}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Community Assets Affected Checkboxes */}
                <div className="space-y-2">
                  <label className="font-bold text-slate-800 text-xs block">
                    Community Assets / Common Property Resources (CPR) Affected:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    {[
                      "Temple / Religious Place",
                      "Community Hall",
                      "School",
                      "Water Body",
                      "Road",
                      "Forest Area",
                      "None"
                    ].map((asset) => (
                      <label
                        key={asset}
                        className={`flex items-center gap-2 p-2.5 rounded border cursor-pointer transition-colors ${
                          formData.communityAssets.includes(asset)
                            ? "bg-amber-50 border-amber-300 text-amber-900 font-semibold"
                            : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={formData.communityAssets.includes(asset)}
                          onChange={() => handleCheckboxToggle("communityAssets", asset)}
                          className="w-4 h-4 text-[#1B365D] rounded border-slate-300 focus:ring-0"
                        />
                        <span>{asset}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Officer Observation Textarea */}
                <div className="space-y-1 text-xs">
                  <label className="font-bold text-slate-800 block">
                    SIA Field Officer Observation & Recommendation:
                  </label>
                  <textarea
                    rows={4}
                    value={formData.officerObservation}
                    onChange={(e) => setFormData({ ...formData, officerObservation: e.target.value })}
                    placeholder="Provide professional remarks regarding alignment feasibility, social feasibility, SIMP mitigation measures..."
                    className="w-full p-2.5 border border-[#D1D5DB] rounded text-slate-900 focus:border-[#1B365D] focus:outline-none"
                  ></textarea>
                </div>
              </div>
            )}

            {/* STEP 6: PHOTO, GPS & FINAL SUBMISSION */}
            {activeStep === 6 && (
              <div className="space-y-5">
                <div className="border-b border-slate-200 pb-2">
                  <h2 className="text-sm font-bold text-[#1B365D] flex items-center gap-2">
                    <Camera className="w-4 h-4 text-[#1B365D]" />
                    Step 6: Field Evidence, GPS & Final Confirmation
                  </h2>
                  <p className="text-xs text-slate-500">
                    Upload geo-tagged photographs, capture device GNSS coordinates and confirm statutory submission
                  </p>
                </div>

                {/* Photo Evidence Upload Cards */}
                <div className="space-y-2">
                  <label className="font-bold text-slate-800 text-xs block">
                    Upload Evidence / Field Photographs:
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                    {/* Family Photo */}
                    <div className="border border-slate-300 rounded-lg p-3 bg-slate-50 flex flex-col items-center justify-center text-center space-y-2">
                      <span className="font-bold text-slate-800">Upload Family Photo</span>
                      {formData.familyPhoto ? (
                        <div className="w-full relative">
                          <img
                            src={formData.familyPhoto}
                            alt="Family Head"
                            className="w-full h-32 object-cover rounded border border-slate-300"
                          />
                          <button
                            type="button"
                            onClick={() => setFormData({ ...formData, familyPhoto: null })}
                            className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full text-xs shadow hover:bg-red-700"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ) : (
                        <div className="h-32 w-full border-2 border-dashed border-slate-300 rounded flex flex-col items-center justify-center p-2 text-slate-500">
                          <Users className="w-6 h-6 text-slate-400 mb-1" />
                          <span>No Family Photo</span>
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={() => handleSimulatePhoto("familyPhoto")}
                        className="w-full bg-[#1B365D] hover:bg-[#142946] text-white py-1.5 px-3 rounded text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                      >
                        <Camera className="w-3.5 h-3.5" />
                        <span>{formData.familyPhoto ? "Retake Photo" : "Capture Family Photo"}</span>
                      </button>
                    </div>

                    {/* Land Photo */}
                    <div className="border border-slate-300 rounded-lg p-3 bg-slate-50 flex flex-col items-center justify-center text-center space-y-2">
                      <span className="font-bold text-slate-800">Upload Land Photo</span>
                      {formData.landPhoto ? (
                        <div className="w-full relative">
                          <img
                            src={formData.landPhoto}
                            alt="Land Parcel"
                            className="w-full h-32 object-cover rounded border border-slate-300"
                          />
                          <button
                            type="button"
                            onClick={() => setFormData({ ...formData, landPhoto: null })}
                            className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full text-xs shadow hover:bg-red-700"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ) : (
                        <div className="h-32 w-full border-2 border-dashed border-slate-300 rounded flex flex-col items-center justify-center p-2 text-slate-500">
                          <Map className="w-6 h-6 text-slate-400 mb-1" />
                          <span>No Land Photo</span>
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={() => handleSimulatePhoto("landPhoto")}
                        className="w-full bg-[#1B365D] hover:bg-[#142946] text-white py-1.5 px-3 rounded text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                      >
                        <Camera className="w-3.5 h-3.5" />
                        <span>{formData.landPhoto ? "Retake Photo" : "Capture Land Photo"}</span>
                      </button>
                    </div>

                    {/* Property Photo */}
                    <div className="border border-slate-300 rounded-lg p-3 bg-slate-50 flex flex-col items-center justify-center text-center space-y-2">
                      <span className="font-bold text-slate-800">Upload Property Photo</span>
                      {formData.propertyPhoto ? (
                        <div className="w-full relative">
                          <img
                            src={formData.propertyPhoto}
                            alt="Property Asset"
                            className="w-full h-32 object-cover rounded border border-slate-300"
                          />
                          <button
                            type="button"
                            onClick={() => setFormData({ ...formData, propertyPhoto: null })}
                            className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full text-xs shadow hover:bg-red-700"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ) : (
                        <div className="h-32 w-full border-2 border-dashed border-slate-300 rounded flex flex-col items-center justify-center p-2 text-slate-500">
                          <Home className="w-6 h-6 text-slate-400 mb-1" />
                          <span>No Structure Photo</span>
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={() => handleSimulatePhoto("propertyPhoto")}
                        className="w-full bg-[#1B365D] hover:bg-[#142946] text-white py-1.5 px-3 rounded text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                      >
                        <Camera className="w-3.5 h-3.5" />
                        <span>{formData.propertyPhoto ? "Retake Photo" : "Capture Property Photo"}</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* GPS Coordinates Section */}
                <div className="bg-slate-50 border border-slate-300 rounded-lg p-4 space-y-3 text-xs">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                    <div>
                      <span className="font-bold text-slate-900 flex items-center gap-1.5">
                        <Crosshair className="w-4 h-4 text-emerald-700" />
                        GNSS Field Geo-Coordinates (GPS)
                      </span>
                      <p className="text-[11px] text-slate-500">Auto-captured device telemetry timestamp</p>
                    </div>
                    <button
                      type="button"
                      onClick={handleCaptureGps}
                      className="bg-emerald-700 hover:bg-emerald-800 text-white px-3 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-2xs"
                    >
                      <Crosshair className="w-3.5 h-3.5" />
                      <span>Capture Location</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="bg-white p-2.5 rounded border border-slate-200">
                      <span className="text-slate-500 block text-[10px] uppercase font-semibold">Latitude</span>
                      <span className="font-mono font-bold text-slate-900 text-sm">{formData.gpsLat}</span>
                    </div>
                    <div className="bg-white p-2.5 rounded border border-slate-200">
                      <span className="text-slate-500 block text-[10px] uppercase font-semibold">Longitude</span>
                      <span className="font-mono font-bold text-slate-900 text-sm">{formData.gpsLong}</span>
                    </div>
                    <div className="bg-white p-2.5 rounded border border-slate-200">
                      <span className="text-slate-500 block text-[10px] uppercase font-semibold">Accuracy</span>
                      <span className="font-mono font-bold text-emerald-700 text-sm">{formData.gpsAccuracy}</span>
                    </div>
                  </div>
                </div>

                {/* Final Statutory Declaration */}
                <div className="p-3 bg-amber-50 border border-amber-300 rounded-lg text-xs space-y-2">
                  <label className="flex items-start gap-2.5 cursor-pointer text-amber-950 font-medium">
                    <input
                      type="checkbox"
                      checked={formData.verifiedConfirmed}
                      onChange={(e) => setFormData({ ...formData, verifiedConfirmed: e.target.checked })}
                      className="w-4 h-4 mt-0.5 text-[#1B365D] rounded border-amber-400 focus:ring-0"
                    />
                    <span>
                      <strong>I confirm that the survey information has been verified on-ground</strong> in presence of the affected family and local Gram Panchayat representatives in accordance with the RFCTLARR Act 2013 Social Impact Assessment statutory standards.
                    </span>
                  </label>
                </div>
              </div>
            )}

            {/* Bottom Nav Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t border-slate-200 mt-6">
              <div>
                {activeStep > 1 && (
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="bg-white border border-[#D1D5DB] hover:bg-slate-50 text-slate-700 px-4 py-2 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Previous</span>
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleSaveDraft}
                  className="bg-white border border-[#1B365D] hover:bg-slate-50 text-[#1B365D] px-4 py-2 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Save Draft</span>
                </button>

                {activeStep < 6 ? (
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="bg-[#1B365D] hover:bg-[#142946] text-white px-5 py-2 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
                  >
                    <span>Next →</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleFinalSubmit}
                    className="bg-emerald-700 hover:bg-emerald-800 text-white px-6 py-2 rounded text-xs font-bold flex items-center gap-2 transition-colors shadow-sm cursor-pointer"
                  >
                    <Send className="w-4 h-4 text-[#C5A059]" />
                    <span>Submit Survey</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. SIA SURVEY REVIEW / SUBMITTED SURVEY VIEW                              */}
      {/* ========================================================================= */}
      {viewMode === "review" && selectedTask && (
        <div className="space-y-6">
          {/* Top Bar with Status & Timestamp */}
          <div className="bg-white border border-[#D1D5DB] rounded-lg p-4 shadow-2xs space-y-3">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
              <div>
                <div className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
                  <span className="bg-emerald-600 text-white px-2 py-0.5 rounded text-[10px] font-bold uppercase">
                    Status: Submitted
                  </span>
                  <span>•</span>
                  <span className="font-mono font-bold text-[#1B365D]">Survey ID: {selectedTask.id}</span>
                </div>
                <h1 className="text-lg font-bold text-slate-900 leading-tight mt-1 flex items-center gap-2">
                  <FileCheck className="w-5 h-5 text-emerald-700" />
                  Certified SIA Household Survey Record
                </h1>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode("tasks")}
                  className="bg-white border border-[#D1D5DB] hover:bg-slate-50 text-slate-700 px-3.5 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Survey Tasks</span>
                </button>

                <button
                  onClick={() => {
                    setFeedbackMsg(`Downloading Certified SIA Dossier for ${selectedTask.family} (${selectedTask.id})...`);
                    setTimeout(() => setFeedbackMsg(""), 3500);
                  }}
                  className="bg-[#1B365D] hover:bg-[#142946] text-white px-3.5 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Download SIA Dossier (PDF)</span>
                </button>
              </div>
            </div>

            {/* Quick Metadata Banner */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-slate-50 p-3 rounded border border-slate-200">
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-semibold">Household Name</span>
                <span className="font-bold text-slate-900">{selectedTask.family}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-semibold">Village & Taluka</span>
                <span className="font-bold text-slate-900">{selectedTask.village}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-semibold">Last Updated</span>
                <span className="font-bold text-slate-900">{selectedTask.lastUpdated || "24-Aug-2026 11:30 AM"}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-semibold">DSC Verification</span>
                <span className="font-bold text-emerald-700 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Signed Digitally
                </span>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-1 overflow-x-auto border-b border-slate-200 pt-1 text-xs font-semibold">
              {[
                { id: "survey-details", label: "Survey Details" },
                { id: "family-details", label: "Family Details" },
                { id: "land-details", label: "Land Details" },
                { id: "livelihood-impact", label: "Livelihood Impact" },
                { id: "social-impact", label: "Social Impact" },
                { id: "documents", label: "Documents & Evidence" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setReviewTab(tab.id)}
                  className={`py-2 px-3.5 border-b-2 whitespace-nowrap cursor-pointer transition-colors ${
                    reviewTab === tab.id
                      ? "border-[#1B365D] text-[#1B365D] font-bold"
                      : "border-transparent text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content Box */}
          <div className="bg-white border border-[#D1D5DB] rounded-lg p-5 shadow-xs text-xs">
            {/* TAB: SURVEY DETAILS */}
            {reviewTab === "survey-details" && (
              <div className="space-y-4">
                <h3 className="font-bold text-slate-900 text-sm border-b pb-2">
                  Statutory Administrative Record
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex justify-between py-1 border-b">
                      <span className="text-slate-500">Survey ID:</span>
                      <span className="font-mono font-bold text-[#1B365D]">{selectedTask.id}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b">
                      <span className="text-slate-500">Associated Project:</span>
                      <span className="font-semibold text-slate-800 text-right">{selectedTask.project}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b">
                      <span className="text-slate-500">Revenue District:</span>
                      <span className="font-semibold text-slate-800">{selectedTask.district}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b">
                      <span className="text-slate-500">Revenue Village:</span>
                      <span className="font-semibold text-slate-800">{selectedTask.village}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between py-1 border-b">
                      <span className="text-slate-500">SIA Enumerator:</span>
                      <span className="font-semibold text-slate-800">Shri K. G. Vaghela (Field Lead)</span>
                    </div>
                    <div className="flex justify-between py-1 border-b">
                      <span className="text-slate-500">Sync Status:</span>
                      <span className="font-bold text-emerald-700">100% Synced (NIC Server)</span>
                    </div>
                    <div className="flex justify-between py-1 border-b">
                      <span className="text-slate-500">Gram Sabha Hearing:</span>
                      <span className="font-semibold text-slate-800">Verified & Recorded</span>
                    </div>
                    <div className="flex justify-between py-1 border-b">
                      <span className="text-slate-500">Legal Reference:</span>
                      <span className="font-semibold text-slate-800">RFCTLARR Sec 4(1) & Sec 7</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: FAMILY DETAILS */}
            {reviewTab === "family-details" && (
              <div className="space-y-4">
                <h3 className="font-bold text-slate-900 text-sm border-b pb-2">
                  Household Head & Demographic Breakdown
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex justify-between py-1 border-b">
                      <span className="text-slate-500">Family Head Name:</span>
                      <span className="font-bold text-slate-900">{selectedTask.familyHead}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b">
                      <span className="text-slate-500">Father / Spouse:</span>
                      <span className="font-semibold text-slate-800">{selectedTask.spouseOrFather}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b">
                      <span className="text-slate-500">Contact Number:</span>
                      <span className="font-mono font-semibold text-slate-800">{selectedTask.mobile}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b">
                      <span className="text-slate-500">Full Address:</span>
                      <span className="font-semibold text-slate-800 text-right">{selectedTask.address}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between py-1 border-b">
                      <span className="text-slate-500">Total Members:</span>
                      <span className="font-bold text-[#1B365D]">{selectedTask.membersCount} Persons</span>
                    </div>
                    <div className="flex justify-between py-1 border-b">
                      <span className="text-slate-500">Male / Female:</span>
                      <span className="font-semibold text-slate-800">{selectedTask.maleMembers} Male / {selectedTask.femaleMembers} Female</span>
                    </div>
                    <div className="flex justify-between py-1 border-b">
                      <span className="text-slate-500">Children / Elderly:</span>
                      <span className="font-semibold text-slate-800">{selectedTask.children} Children / {selectedTask.elderly} Elderly</span>
                    </div>
                    <div className="flex justify-between py-1 border-b">
                      <span className="text-slate-500">Vulnerable Categories:</span>
                      <span className="font-semibold text-amber-800">
                        {selectedTask.specialCategories?.join(", ") || "None"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: LAND DETAILS */}
            {reviewTab === "land-details" && (
              <div className="space-y-4">
                <h3 className="font-bold text-slate-900 text-sm border-b pb-2">
                  Acquired Parcel & Affected Real Estate
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex justify-between py-1 border-b">
                      <span className="text-slate-500">Survey / Parcel No:</span>
                      <span className="font-mono font-bold text-[#1B365D]">{selectedTask.surveyNumber}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b">
                      <span className="text-slate-500">Land Area:</span>
                      <span className="font-bold text-slate-900">{selectedTask.landArea}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b">
                      <span className="text-slate-500">Land Classification:</span>
                      <span className="font-semibold text-slate-800">{selectedTask.landType}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b">
                      <span className="text-slate-500">Ownership Title:</span>
                      <span className="font-semibold text-slate-800">{selectedTask.ownershipType}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between py-1 border-b">
                      <span className="text-slate-500">Affected Assets:</span>
                      <span className="font-semibold text-amber-800 text-right">
                        {selectedTask.propertyAffected?.join(", ") || "Agricultural land"}
                      </span>
                    </div>
                    <div className="flex justify-between py-1 border-b">
                      <span className="text-slate-500">RoR 7/12 Match:</span>
                      <span className="font-bold text-emerald-700">Verified & Clean</span>
                    </div>
                    <div className="flex justify-between py-1 border-b">
                      <span className="text-slate-500">Title Dispute:</span>
                      <span className="font-semibold text-emerald-700">No Civil Dispute</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: LIVELIHOOD IMPACT */}
            {reviewTab === "livelihood-impact" && (
              <div className="space-y-4">
                <h3 className="font-bold text-slate-900 text-sm border-b pb-2">
                  Livelihood Loss & Income Dependency Analysis
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex justify-between py-1 border-b">
                      <span className="text-slate-500">Primary Occupation:</span>
                      <span className="font-bold text-slate-900">{selectedTask.primaryOccupation}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b">
                      <span className="text-slate-500">Land Dependency Level:</span>
                      <span className="font-bold text-amber-800">{selectedTask.landDependency}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b">
                      <span className="text-slate-500">Income Sources:</span>
                      <span className="font-semibold text-slate-800">{selectedTask.incomeSources?.join(", ")}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b">
                      <span className="text-slate-500">Estimated Monthly Income:</span>
                      <span className="font-bold text-[#1B365D]">{selectedTask.monthlyIncome}</span>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 rounded border border-slate-200 space-y-1">
                    <span className="font-bold text-slate-800 block">Second Schedule Entitlement Trigger:</span>
                    <p className="text-slate-600 text-[11px] leading-relaxed">
                      Family is eligible for Mandatory Subsistence Grant of ₹36,000 (₹3,000/mo × 12 months) and Choice of Annuity / Job / Lump-Sum Assistance (₹5,00,000).
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: SOCIAL IMPACT */}
            {reviewTab === "social-impact" && (
              <div className="space-y-4">
                <h3 className="font-bold text-slate-900 text-sm border-b pb-2">
                  Socio-Economic Disruptions & Family Representations
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between py-1 border-b">
                    <span className="text-slate-500">Identified Impacts:</span>
                    <span className="font-semibold text-amber-800">
                      {selectedTask.socialImpacts?.join(", ") || "Livelihood loss"}
                    </span>
                  </div>

                  <div className="flex justify-between py-1 border-b">
                    <span className="text-slate-500">Physical Relocation Required:</span>
                    <span className={`font-bold ${selectedTask.relocationRequired === "Yes" ? "text-red-700" : "text-emerald-700"}`}>
                      {selectedTask.relocationRequired}
                    </span>
                  </div>

                  <div className="p-3 bg-blue-50 border border-blue-200 rounded space-y-1">
                    <span className="font-bold text-[#1B365D] block">Family Concern / Grievance Statement:</span>
                    <p className="text-slate-800 text-[11px] leading-relaxed">
                      "{selectedTask.familyConcerns || "Family requests compensation at market rate with 100% solatium and direct job allotment."}"
                    </p>
                  </div>

                  <div className="p-3 bg-slate-50 border border-slate-200 rounded space-y-1">
                    <span className="font-bold text-slate-800 block">SIA Officer Recommendation:</span>
                    <p className="text-slate-700 text-[11px] leading-relaxed">
                      {selectedTask.officerObservation || "Agricultural parcel under active cultivation. SIMP recommendations approved."}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: DOCUMENTS & EVIDENCE */}
            {reviewTab === "documents" && (
              <div className="space-y-4">
                <h3 className="font-bold text-slate-900 text-sm border-b pb-2">
                  Geo-Tagged Field Photographs & Coordinates
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {selectedTask.familyPhoto && (
                    <div className="border border-slate-200 rounded-lg p-2 bg-slate-50 space-y-1">
                      <span className="font-bold text-slate-800 text-[11px] block">Family Photo Evidence</span>
                      <img
                        src={selectedTask.familyPhoto}
                        alt="Family Evidence"
                        className="w-full h-36 object-cover rounded border border-slate-300"
                      />
                    </div>
                  )}

                  {selectedTask.landPhoto && (
                    <div className="border border-slate-200 rounded-lg p-2 bg-slate-50 space-y-1">
                      <span className="font-bold text-slate-800 text-[11px] block">Land Parcel Evidence</span>
                      <img
                        src={selectedTask.landPhoto}
                        alt="Land Evidence"
                        className="w-full h-36 object-cover rounded border border-slate-300"
                      />
                    </div>
                  )}

                  {selectedTask.propertyPhoto && (
                    <div className="border border-slate-200 rounded-lg p-2 bg-slate-50 space-y-1">
                      <span className="font-bold text-slate-800 text-[11px] block">Property Asset Evidence</span>
                      <img
                        src={selectedTask.propertyPhoto}
                        alt="Property Evidence"
                        className="w-full h-36 object-cover rounded border border-slate-300"
                      />
                    </div>
                  )}
                </div>

                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <div>
                    <span className="font-bold text-emerald-950 block">GPS Telemetry Coordinates:</span>
                    <span className="font-mono text-emerald-800 text-xs font-semibold">
                      Lat: {selectedTask.gpsLat} | Long: {selectedTask.gpsLong} ({selectedTask.gpsAccuracy})
                    </span>
                  </div>
                  <span className="text-[11px] text-emerald-900 bg-white border border-emerald-300 px-2.5 py-1 rounded font-bold">
                    NIC Geotag Authenticated
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. MODAL: SUBMISSION CONFIRMATION MODAL                                    */}
      {/* ========================================================================= */}
      {showSubmitModal && submittedTaskData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 animate-fade-in backdrop-blur-xs">
          <div className="bg-white border border-slate-300 rounded-xl shadow-2xl max-w-md w-full p-6 space-y-5 text-center">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Survey Submitted Successfully
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                The household social impact assessment questionnaire has been verified and registered on the central repository.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs text-left space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-500">Survey ID:</span>
                <span className="font-mono font-bold text-[#1B365D]">{submittedTaskData.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Family Head:</span>
                <span className="font-bold text-slate-900">{submittedTaskData.familyHead}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Status:</span>
                <span className="font-bold text-emerald-700">Completed (100%)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Digital Token:</span>
                <span className="font-mono text-slate-600">NIC-SIA-2026-GJ-{Math.floor(100000 + Math.random() * 900000)}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => {
                  setShowSubmitModal(false);
                  handleViewReview(submittedTaskData);
                }}
                className="flex-1 bg-white border border-[#1B365D] hover:bg-slate-50 text-[#1B365D] py-2 px-3 rounded text-xs font-bold transition-colors cursor-pointer"
              >
                View Submitted Review
              </button>

              <button
                onClick={() => {
                  setShowSubmitModal(false);
                  setViewMode("tasks");
                }}
                className="flex-1 bg-[#1B365D] hover:bg-[#142946] text-white py-2 px-3 rounded text-xs font-bold transition-colors shadow-2xs cursor-pointer"
              >
                Back to My Survey Tasks
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
