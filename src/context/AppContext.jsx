import React, { createContext, useContext, useState, useEffect } from "react";
import {
  DEMO_USERS,
  NATIONAL_KPIS,
  STATES_PROGRESS,
  TIMELINE_BREACH_ALERTS,
  PROJECTS_LIST,
  PARCELS_DATA,
  OBJECTIONS_DATA,
  SIA_TASKS,
  RNR_SCHEMES,
  RNR_FAMILIES,
  GAZETTE_NOTIFICATIONS,
  DBT_PAYMENTS_DATA,
  POSSESSION_MEMOS,
  AUDIT_LOGS,
  SYSTEM_USERS_DIRECTORY,
  NOTIFICATIONS_POOL,
  CITIZEN_DOCUMENTS,
  CENTRAL_PROJECT_APPROVAL_REQUESTS,
  CENTRAL_RNR_FUND_REQUESTS,
  STATE_FUND_ALLOCATIONS,
  STATE_RNR_REVIEW_REQUESTS
} from "../data/mockData.js";

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  // Authentication & Current User
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem("nlams_user");
    return saved ? JSON.parse(saved) : null;
  });

  // Current Active Page
  const [activePage, setActivePage] = useState(() => {
    return localStorage.getItem("nlams_active_page") || "landing";
  });

  // Selected entities for deep-linking
  const [selectedProjectId, setSelectedProjectId] = useState("PRJ-GJ-2026-01");
  const [selectedParcelId, setSelectedParcelId] = useState("PAR-01");
  const [selectedStateFilter, setSelectedStateFilter] = useState("All");
  const [selectedDistrictFilter, setSelectedDistrictFilter] = useState("All");
  const [workflowActiveTab, setWorkflowActiveTab] = useState("overview");

  // UI preferences
  const [fontSize, setFontSize] = useState("normal"); // normal, large, xlarge
  const [language, setLanguage] = useState("en"); // en, hi
  const [globalSearchQuery, setGlobalSearchQuery] = useState("");

  // Contextual Action Drawer State
  const [contextDrawer, setContextDrawer] = useState({
    isOpen: false,
    data: null,
    type: "project"
  });

  const openContextDrawer = (data, type = "project") => {
    setContextDrawer({
      isOpen: true,
      data: data || currentProject,
      type
    });
  };

  const closeContextDrawer = () => {
    setContextDrawer((prev) => ({ ...prev, isOpen: false }));
  };

  // Demo user designation switcher
  const switchDemoDesignation = (designationId) => {
    const targetUser = DEMO_USERS.find((u) => u.designationId === designationId) || DEMO_USERS.find((u) => u.id === designationId);
    if (targetUser) {
      loginUser(targetUser);
    }
  };
  // Dynamic Data Stores
  const [projects, setProjects] = useState(PROJECTS_LIST);
  const [parcels, setParcels] = useState(PARCELS_DATA);
  const [objections, setObjections] = useState(OBJECTIONS_DATA);
  const [siaTasks, setSiaTasks] = useState(SIA_TASKS);
  const [rnrSchemes, setRnrSchemes] = useState(RNR_SCHEMES);
  const [rnrFamilies, setRnrFamilies] = useState(RNR_FAMILIES);
  const [gazetteNotifications, setGazetteNotifications] = useState(GAZETTE_NOTIFICATIONS);
  const [dbtPayments, setDbtPayments] = useState(DBT_PAYMENTS_DATA);
  const [possessionMemos, setPossessionMemos] = useState(POSSESSION_MEMOS);
  const [auditLogs, setAuditLogs] = useState(AUDIT_LOGS);
  const [systemUsers, setSystemUsers] = useState(SYSTEM_USERS_DIRECTORY);
  const [notifications, setNotifications] = useState(NOTIFICATIONS_POOL);
  const [citizenDocs, setCitizenDocs] = useState(CITIZEN_DOCUMENTS);
  const [centralProjectApprovals, setCentralProjectApprovals] = useState(CENTRAL_PROJECT_APPROVAL_REQUESTS);
  const [centralRnRFundRequests, setCentralRnRFundRequests] = useState(CENTRAL_RNR_FUND_REQUESTS);
  const [stateFundAllocations, setStateFundAllocations] = useState(STATE_FUND_ALLOCATIONS);
  const [stateRnRRequests, setStateRnRRequests] = useState(STATE_RNR_REVIEW_REQUESTS);

  // Sync user and page to localStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("nlams_user", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("nlams_user");
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem("nlams_active_page", activePage);
  }, [activePage]);

  // Navigate with validation
  const navigateTo = (pageId, params = {}) => {
    if (params.projectId) setSelectedProjectId(params.projectId);
    if (params.parcelId) setSelectedParcelId(params.parcelId);
    if (params.workflowTab) setWorkflowActiveTab(params.workflowTab);
    if (params.stateFilter) setSelectedStateFilter(params.stateFilter);

    setActivePage(pageId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Login handler
  const loginUser = (userObject) => {
    setCurrentUser(userObject);
    const redirectPage = userObject.defaultPage || "central-dashboard";
    navigateTo(redirectPage);
    addAuditLog("Authentication", "User Login", `Logged into portal as ${userObject.role} (${userObject.designation})`);
  };

  // Logout handler
  const logoutUser = () => {
    if (currentUser) {
      addAuditLog("Authentication", "User Logout", `${currentUser.name} logged out.`);
    }
    setCurrentUser(null);
    navigateTo("landing");
  };

  // Audit Logger Helper
  const addAuditLog = (module, action, details) => {
    const newLog = {
      id: `LOG-${Math.floor(10000 + Math.random() * 90000)}`,
      timestamp: new Date().toISOString().replace("T", " ").substring(0, 19),
      user: currentUser ? currentUser.name : "Public User",
      role: currentUser ? (currentUser.designation || currentUser.role) : "Citizen/Public",
      module,
      action,
      entity: details.substring(0, 40),
      details,
      ipAddress: "10.45.18.92 (GovNet)"
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  // Project Creation (Requiring Body)
  const createProject = (projectData) => {
    const newProj = {
      id: `PRJ-GJ-2026-${String(projects.length + 1).padStart(2, "0")}`,
      ...projectData,
      submittedDate: new Date().toISOString().substring(0, 10),
      landSelected: projectData.landRequired,
      landVerified: 0,
      landAcquired: 0,
      currentStage: "Project Proposal",
      currentStageIndex: 1,
      progressPercentage: 10,
      daysToDeadline: 365,
      riskLevel: "Low",
      status: "Pending State Approval",
      stateApprovalStatus: "Pending",
      stateApprovalDate: null,
      stateRemarks: null,
      affectedFamilies: 0,
      totalParcels: 0,
      verifiedParcels: 0,
      flaggedParcels: 0
    };

    setProjects((prev) => [newProj, ...prev]);
    addAuditLog("Project Management", "Create Project Proposal", `Submitted proposal for ${newProj.name}`);
    return newProj;
  };

  // State Approval Decision
  const handleStateApproval = (projectId, decision, remarks) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === projectId) {
          const isApproved = decision === "Approved";
          return {
            ...p,
            stateApprovalStatus: decision,
            stateApprovalDate: new Date().toISOString().substring(0, 10),
            stateRemarks: remarks,
            currentStage: isApproved ? "Land Selection (GIS)" : "Proposal Rejected",
            currentStageIndex: isApproved ? 2 : 1,
            status: isApproved ? "In Progress" : "Rejected by State",
            progressPercentage: isApproved ? 20 : p.progressPercentage
          };
        }
        return p;
      })
    );
    addAuditLog("State Approval Queue", `${decision} Proposal`, `Project ${projectId}: ${remarks}`);
  };

  // Land Verification (Collector)
  const handleVerifyLand = (surveyNumberOrId, status, remarks) => {
    setParcels((prev) =>
      prev.map((p) => {
        if (p.surveyNumber === surveyNumberOrId || p.id === surveyNumberOrId) {
          return {
            ...p,
            verificationStatus: status,
            disputeStatus: status === "Verified" ? "Clear Title" : "Flagged Issue",
            status: status === "Verified" ? "Verified & Ready for Valuation" : "Flagged for Inquiry"
          };
        }
        return p;
      })
    );
    addAuditLog("Land Verification", `${status} Parcel`, `Survey/ID: ${surveyNumberOrId} - ${remarks}`);
  };

  const updateParcelVerification = (parcelIdOrSurvey, status, remarks) => {
    handleVerifyLand(parcelIdOrSurvey, status, remarks);
  };

  // Objection Hearing & Decision (Collector)
  const handleObjectionDecision = (objectionId, decision, remarks, hearingDate, hearingTime) => {
    setObjections((prev) =>
      prev.map((obj) => {
        if (obj.id === objectionId) {
          return {
            ...obj,
            status: decision === "Pending Hearing" ? "Hearing Scheduled" : decision === "Resolved" || decision === "Dismissed" ? decision : obj.status,
            decision: decision || obj.decision,
            decisionRemarks: remarks || obj.decisionRemarks,
            hearingDate: hearingDate || obj.hearingDate,
            hearingTime: hearingTime || obj.hearingTime
          };
        }
        return obj;
      })
    );
    addAuditLog("Objection Management", `Decision: ${decision}`, `Objection ID ${objectionId}: ${remarks}`);
  };

  const resolveObjection = (objectionId, finalStatus, decisionRemarks) => {
    handleObjectionDecision(objectionId, finalStatus, decisionRemarks);
  };

  const updateObjectionHearing = (objectionId, date, time) => {
    handleObjectionDecision(objectionId, "Pending Hearing", "Hearing Scheduled", date, time);
  };

  // Submit Objection (Citizen)
  const submitCitizenObjection = (objectionData) => {
    const newObj = {
      id: `OBJ-2026-${String(objections.length + 85).padStart(3, "0")}`,
      objectorName: objectionData.objectorName || (currentUser ? currentUser.name : "Rameshwar Laljibhai Patel"),
      surveyNumber: objectionData.surveyNumber || "142/A",
      village: objectionData.village || "Rampura",
      district: objectionData.district || "Anand",
      projectId: objectionData.projectId || selectedProjectId,
      objectionType: objectionData.objectionType || "Valuation Dispute",
      submissionDate: new Date().toISOString().substring(0, 10),
      description: objectionData.details || objectionData.description || "Dispute submitted via Citizen Portal.",
      status: "Under Review",
      hearingDate: "To be announced",
      hearingTime: "--",
      hearingVenue: "Collectorate Anand",
      hearingOfficer: "Shri Vikramaditya Solanki, IAS",
      officerRemarks: "Initial scrutiny in progress",
      decision: "Pending Scrutiny",
      decisionRemarks: "",
      documentsUploaded: ["Citizen_Objection_Statement.pdf"]
    };

    setObjections((prev) => [newObj, ...prev]);
    addAuditLog("Citizen Portal", "Submit Section 15 Objection", `Submitted objection for Survey ${newObj.surveyNumber}`);
    return newObj;
  };

  const registerCitizenGrievance = (grievanceData) => {
    return submitCitizenObjection(grievanceData);
  };

  // Lock Compensation
  const handleLockCompensation = (parcelId, compensationDetails) => {
    setParcels((prev) =>
      prev.map((p) => {
        if (p.id === parcelId) {
          const isNumeric = typeof compensationDetails === "number";
          const finalAmount = isNumeric ? compensationDetails : (compensationDetails.finalCompensationAmount || p.finalCompensationAmount);
          return {
            ...p,
            ...(isNumeric ? {} : compensationDetails),
            finalCompensationAmount: finalAmount,
            awardStatus: "Compensation Determined & Locked",
            status: "Compensation Locked"
          };
        }
        return p;
      })
    );
    addAuditLog("Compensation Calculator", "Lock Compensation", `Locked compensation for ${parcelId}`);
  };

  const updateParcelCompensation = (parcelId, finalStatutoryTotal) => {
    handleLockCompensation(parcelId, finalStatutoryTotal);
  };

  // Award Generation (Collector)
  const handleGenerateAward = (parcelId, awardId) => {
    setParcels((prev) =>
      prev.map((p) => {
        if (p.id === parcelId) {
          return {
            ...p,
            awardId: awardId || p.awardId || `AWD-GJ-AND-2026-${String(Math.floor(100 + Math.random() * 900))}`,
            awardStatus: "Award Generated & Signed",
            status: "Award Completed"
          };
        }
        return p;
      })
    );
    addAuditLog("Award Generation", "Generate Award Certificate", `Award generated for parcel ${parcelId} under Section 23/31`);
  };

  const generateAwardOrder = (parcelId, awardId) => {
    handleGenerateAward(parcelId, awardId);
  };

  // SIA Survey Submission (SIA Officer)
  const handleSubmitSiaSurvey = (surveyData) => {
    const updatedTasks = siaTasks.map((t) => {
      if (t.id === surveyData.taskId) {
        return {
          ...t,
          ...surveyData,
          status: "Completed",
          surveyDate: new Date().toISOString().substring(0, 10),
          syncStatus: "Synced"
        };
      }
      return t;
    });
    setSiaTasks(updatedTasks);
    addAuditLog("SIA Module", "Submit Family Survey", `Survey submitted for ${surveyData.familyHead} (${surveyData.surveyNumber})`);
  };

  // R&R Scheme Approval
  const handleApproveRnRScheme = (schemeId) => {
    setRnrSchemes((prev) =>
      prev.map((s) => (s.id === schemeId ? { ...s, status: "Approved", approvalDate: new Date().toISOString().substring(0, 10) } : s))
    );
    addAuditLog("R&R Module", "Approve R&R Scheme", `Scheme ${schemeId} approved under RFCTLARR Section 16/18`);
  };

  // Gazette Notification Publication
  const handlePublishNotification = (notifData) => {
    const newNotif = {
      id: `NOTIF-${(notifData.notificationType || notifData.type || "Section 11(1)").includes("11") ? "SEC11" : "SEC19"}-2026-${Math.floor(100 + Math.random() * 900)}`,
      type: notifData.notificationType || notifData.type || "Section 19(1) Declaration",
      ...notifData,
      dateOfIssue: notifData.dateOfIssue || new Date().toISOString().substring(0, 10),
      status: "Published in Gazette",
      pdfDocumentName: `Gazette_Notification_${notifData.district || 'Anand'}_${(notifData.notificationType || '').includes("11") ? "Sec11" : "Sec19"}.pdf`
    };
    setGazetteNotifications((prev) => [newNotif, ...prev]);
    addAuditLog("Gazette Module", "Publish Gazette Notification", `${newNotif.type} published for ${notifData.projectName || 'Project'}`);
    return newNotif;
  };

  const createGazetteNotification = (notifData) => {
    return handlePublishNotification(notifData);
  };

  // PFMS DBT Payment Initiation
  const handleInitiatePayment = (awardIdOrPaymentId, paymentDetails = {}) => {
    if (typeof awardIdOrPaymentId === "string" && !paymentDetails.amount) {
      // Direct disburse of existing payment record by ID
      setDbtPayments((prev) =>
        prev.map((p) =>
          p.id === awardIdOrPaymentId || p.pfmsRef === awardIdOrPaymentId
            ? { ...p, status: "Disbursed", settledDate: new Date().toISOString().substring(0, 10) }
            : p
        )
      );
      addAuditLog("Payment Module", "Execute PFMS DBT Disbursal", `Disbursed payment ID ${awardIdOrPaymentId}`);
      return;
    }

    const newPayment = {
      id: `PAY-2026-${Math.floor(10000 + Math.random() * 90000)}`,
      pfmsRef: `PFMS-2026-GJ-${Math.floor(10000 + Math.random() * 90000)}`,
      awardId: awardIdOrPaymentId,
      beneficiaryName: paymentDetails.beneficiaryName || "Beneficiary",
      surveyNumber: paymentDetails.surveyNumber || "142/A",
      village: paymentDetails.village || "Sunav",
      district: paymentDetails.district || "Anand",
      bankName: paymentDetails.bankName || "State Bank of India",
      accountNumberMasked: paymentDetails.accountNumberMasked || "XXXX-XXXX-4819",
      ifsc: paymentDetails.ifsc || "SBIN0000312",
      aadhaarStatus: "Verified",
      bankStatus: "Bank Matched 100%",
      amount: paymentDetails.amount || 24900400,
      paymentMode: "Direct Benefit Transfer (PFMS - e-Kuber)",
      pfmsReference: `PFMS/NLAMS/GJ/2026/${Math.floor(10000000 + Math.random() * 90000000)}`,
      initiatedDate: new Date().toISOString().replace("T", " ").substring(0, 16),
      settledDate: new Date().toISOString().replace("T", " ").substring(0, 16),
      status: "Disbursed",
      utrNumber: `RBI202608${Math.floor(10000000 + Math.random() * 90000000)}`
    };

    setDbtPayments((prev) => [newPayment, ...prev]);
    addAuditLog("Payment Module", "Initiate PFMS DBT Payment", `Transferred ₹ ${newPayment.amount} to ${newPayment.beneficiaryName}`);
    return newPayment;
  };

  const initiatePfmsDisbursement = (paymentId) => {
    handleInitiatePayment(paymentId);
  };

  // Record Possession Memo
  const handleRecordPossession = (memoData) => {
    const newMemo = {
      id: `POS-MEMO-2026-${String(possessionMemos.length + 90).padStart(4, "0")}`,
      ...memoData,
      actualPossessionDate: new Date().toISOString().substring(0, 10),
      status: "Possession Completed",
      panchnamaRecorded: "Yes - Signed by 5 independent Panchas",
      demarcationCompleted: "Yes - Demarcation stones fixed"
    };

    setPossessionMemos((prev) => [newMemo, ...prev]);
    addAuditLog("Possession Module", "Record Possession Memo", `Possession completed for Survey ${memoData.surveyNumber}, Village ${memoData.village}`);
    return newMemo;
  };

  // Add User (Central User Management)
  const handleAddUser = (userData) => {
    const newUser = {
      id: `USR-${String(systemUsers.length + 1).padStart(3, "0")}`,
      ...userData,
      status: "Active",
      lastLogin: "Never"
    };
    setSystemUsers((prev) => [...prev, newUser]);
    addAuditLog("User Management", "Create System User", `Created user account for ${userData.name} (${userData.role})`);
  };

  // Central Project Approval Decision Handler
  const handleCentralProjectApprovalDecision = (requestId, decision, remarks = "") => {
    setCentralProjectApprovals((prev) =>
      prev.map((req) => {
        if (req.id === requestId) {
          return {
            ...req,
            status: decision,
            remarks: remarks || req.remarks,
            decisionDate: new Date().toISOString().substring(0, 10)
          };
        }
        return req;
      })
    );
    addAuditLog(
      "Central Approvals",
      `Project Proposal ${decision}`,
      `Central Authority recorded ${decision} on Request ${requestId}. Remarks: ${remarks || "None"}`
    );
  };

  // Central R&R Fund Release Decision Handler
  const handleCentralRnRFundDecision = (
    requestId,
    decision,
    approvedAmount = null,
    remarks = "",
    fundingScheme = "Centrally Sponsored RFCTLARR R&R Corpus",
    financialYear = "2026-27"
  ) => {
    setCentralRnRFundRequests((prev) =>
      prev.map((req) => {
        if (req.id === requestId) {
          const finalAmt =
            approvedAmount !== null
              ? Number(approvedAmount)
              : decision === "Approved"
              ? req.amountRequested
              : null;
          return {
            ...req,
            status: decision,
            approvedAmount: finalAmt,
            remarks: remarks || req.remarks,
            fundingScheme: fundingScheme || req.fundingScheme,
            financialYear: financialYear || req.financialYear,
            sanctionDate: new Date().toISOString().substring(0, 10)
          };
        }
        return req;
      })
    );
    addAuditLog(
      "R&R Fund Allocation",
      `R&R Fund ${decision}`,
      `Central Authority ${decision} R&R Request ${requestId} (Sanctioned: ₹ ${approvedAmount ? (Number(approvedAmount) / 10000000).toFixed(2) + " Cr" : "N/A"}). Remarks: ${remarks || "None"}`
    );
  };

  // State Fund Allocation Release Handler
  const handleStateReleaseFund = (allocationId, releaseAmountCr, purpose, remarks, fundCategory) => {
    setStateFundAllocations((prev) =>
      prev.map((item) => {
        if (item.id === allocationId) {
          const addedAlloc = Number(releaseAmountCr);
          return {
            ...item,
            allocatedCr: +(item.allocatedCr + addedAlloc).toFixed(2),
            fundCategory: fundCategory || item.fundCategory,
            lastReleaseDate: new Date().toISOString().substring(0, 10),
            remarks: remarks || item.remarks
          };
        }
        return item;
      })
    );
    addAuditLog(
      "State Fund Allocation",
      "Release Budget Fund",
      `State Authority sanctioned ₹ ${releaseAmountCr} Cr for allocation ${allocationId}. Purpose: ${purpose}`
    );
  };

  // State R&R Review and Forwarding to Central Handler
  const handleStateRnRDecision = (requestId, decision, stateRemarks = "") => {
    setStateRnRRequests((prev) =>
      prev.map((item) => {
        if (item.id === requestId) {
          return {
            ...item,
            status: decision,
            stateRemarks: stateRemarks || item.stateRemarks,
            forwardedDate: decision === "Forwarded to Central" ? new Date().toISOString().substring(0, 10) : item.forwardedDate
          };
        }
        return item;
      })
    );
    addAuditLog(
      "State R&R Review",
      `R&R Request ${decision}`,
      `State Authority marked ${decision} for Request ${requestId}. Remarks: ${stateRemarks || "None"}`
    );
  };

  // District R&R Officer: Submit Fund Requirement Request to State & Central
  const submitRnRFundRequest = (fundRequestData) => {
    const requestId = `RNR-REQ-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newRequest = {
      id: requestId,
      projectId: fundRequestData.projectId || selectedProjectId,
      projectName: fundRequestData.projectName || "Western Dedicated Freight Corridor",
      district: fundRequestData.district || "Ahmedabad",
      state: fundRequestData.state || "Gujarat",
      rnrOfficer: fundRequestData.rnrOfficer || (currentUser ? `${currentUser.name} (${currentUser.designation})` : "Shri Harishankar Dave, GAS (R&R Officer)"),
      totalAffectedFamilies: Number(fundRequestData.totalAffectedFamilies) || 145,
      eligibleFamilies: Number(fundRequestData.eligibleFamilies || fundRequestData.totalAffectedFamilies) || 145,
      familiesSupported: Number(fundRequestData.familiesSupported) || 0,
      familiesPending: Number(fundRequestData.familiesPending || fundRequestData.totalAffectedFamilies) || 145,
      amountRequested: Number(fundRequestData.amountRequested) || 250000000,
      requestedAmountCr: Number(fundRequestData.requestedAmountCr) || ((Number(fundRequestData.amountRequested) || 250000000) / 10000000),
      purpose: fundRequestData.purpose || "RFCTLARR Second Schedule Statutory Family Entitlements & Relocation",
      breakdown: fundRequestData.breakdown || {
        housing: { families: 50, amount: 100000000 },
        livelihood: { families: 80, amount: 80000000 },
        relocation: { families: 45, amount: 45000000 },
        specialSupport: { families: 20, amount: 25000000 }
      },
      status: "Under State Review",
      submissionDate: new Date().toISOString().substring(0, 10),
      forwardedDate: null,
      fundingScheme: fundRequestData.fundingScheme || "Centrally Sponsored RFCTLARR R&R Corpus",
      benefitCategories: [
        "Housing Assistance (Constructed House / Cash)",
        "Livelihood Support / One-time Grant",
        "Transport Allowance & Shifting Cost",
        "Subsistence Grant & Annuity"
      ],
      supportingDocuments: [
        "SIA_R_and_R_Master_Census.pdf",
        "Panchayat_Resolution.pdf",
        "Collectorate_Scrutiny_Certificate.pdf"
      ],
      remarks: fundRequestData.remarks || "Submitted by District R&R Officer for State Scrutiny and Central Corpus Sanction.",
      stateRemarks: ""
    };

    // Add to State R&R Requests Store
    setStateRnRRequests((prev) => [newRequest, ...prev]);

    // Also add to Central R&R Fund Requests Store so Central Authority can see it once forwarded
    setCentralRnRFundRequests((prev) => [
      {
        ...newRequest,
        status: "Submitted to State"
      },
      ...prev
    ]);

    addAuditLog(
      "District R&R Module",
      "Submit R&R Fund Requirement",
      `District R&R Officer submitted ₹ ${(newRequest.amountRequested / 10000000).toFixed(2)} Cr fund request for ${newRequest.projectName}`
    );

    return newRequest;
  };

  // District R&R Officer: Disburse entitlement to family
  const handleDistributeRnRBenefit = (familyId, entitlementType, amount, refNo, remarks) => {
    setRnrFamilies((prev) =>
      prev.map((fam) => {
        if (fam.id === familyId) {
          return {
            ...fam,
            status: "Distributed",
            disbursedAmount: (fam.disbursedAmount || 0) + Number(amount),
            disbursementDate: new Date().toISOString().substring(0, 10),
            disbursementRef: refNo || `RNR-DBT-${Math.floor(100000 + Math.random() * 900000)}`,
            disbursementRemarks: remarks || "Direct Benefit Transfer processed"
          };
        }
        return fam;
      })
    );
    addAuditLog(
      "District R&R Module",
      "Distribute Entitlement Benefit",
      `Disbursed ₹ ${amount} (${entitlementType}) to Family ID: ${familyId}. Ref: ${refNo}`
    );
  };

  // District Collector: Review and Accept SIA Status
  const handleCollectorSiaReview = (projectId, decision, remarks) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === projectId) {
          return {
            ...p,
            siaReviewStatus: decision,
            siaCollectorRemarks: remarks,
            siaApprovalDate: new Date().toISOString().substring(0, 10)
          };
        }
        return p;
      })
    );
    addAuditLog(
      "Collector SIA Review",
      `SIA Status: ${decision}`,
      `Collector recorded decision: ${decision}. Remarks: ${remarks}`
    );
  };

  // Mark all notifications read
  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  // Current selected project object
  const currentProject = projects.find((p) => p.id === selectedProjectId) || projects[0] || PROJECTS_LIST[0];

  return (
    <AppContext.Provider
      value={{
        // Auth & Navigation
        currentUser,
        loginUser,
        logoutUser,
        activePage,
        navigateTo,
        selectedProjectId,
        setSelectedProjectId,
        selectedParcelId,
        setSelectedParcelId,
        selectedStateFilter,
        setSelectedStateFilter,
        selectedDistrictFilter,
        setSelectedDistrictFilter,
        workflowActiveTab,
        setWorkflowActiveTab,
        currentProject,

        // Preferences
        fontSize,
        setFontSize,
        language,
        setLanguage,
        globalSearchQuery,
        setGlobalSearchQuery,

        // Contextual Action Drawer & Role Switcher
        contextDrawer,
        openContextDrawer,
        closeContextDrawer,
        switchDemoDesignation,

        // Data Stores
        nationalKpis: NATIONAL_KPIS,
        statesProgress: STATES_PROGRESS,
        timelineBreachAlerts: TIMELINE_BREACH_ALERTS,
        projects: projects || [],
        parcels: parcels || [],
        objections: objections || [],
        siaTasks: siaTasks || [],
        rnrSchemes: rnrSchemes || [],
        rnrFamilies: rnrFamilies || [],
        gazetteNotifications: gazetteNotifications || [],
        dbtPayments: dbtPayments || [],
        disbursements: dbtPayments || [],
        possessionMemos: possessionMemos || [],
        auditLogs: auditLogs || [],
        systemUsers: systemUsers || [],
        notifications: notifications || [],
        citizenDocs: citizenDocs || [],
        centralProjectApprovals: centralProjectApprovals || [],
        centralRnRFundRequests: centralRnRFundRequests || [],
        stateFundAllocations: stateFundAllocations || [],
        stateRnRRequests: stateRnRRequests || [],

        // Action Handlers & Aliases
        createProject,
        handleStateApproval,
        handleCentralProjectApprovalDecision,
        handleCentralRnRFundDecision,
        handleStateReleaseFund,
        handleStateRnRDecision,
        handleVerifyLand,
        updateParcelVerification,
        handleObjectionDecision,
        resolveObjection,
        updateObjectionHearing,
        submitCitizenObjection,
        registerCitizenGrievance,
        handleLockCompensation,
        updateParcelCompensation,
        handleGenerateAward,
        generateAwardOrder,
        handleSubmitSiaSurvey,
        handleApproveRnRScheme,
        handlePublishNotification,
        createGazetteNotification,
        handleInitiatePayment,
        initiatePfmsDisbursement,
        handleRecordPossession,
        recordPossessionMemo: handleRecordPossession,
        submitRnRFundRequest,
        handleDistributeRnRBenefit,
        handleCollectorSiaReview,
        handleAddUser,
        markAllNotificationsRead,
        addAuditLog
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
