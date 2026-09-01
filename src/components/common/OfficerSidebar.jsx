import React, { useState } from "react";
import { useApp } from "../../context/AppContext.jsx";
import {
  LayoutDashboard,
  Map,
  Layers,
  FolderPlus,
  FileCheck,
  AlertTriangle,
  Calculator,
  Award,
  CreditCard,
  Building,
  Users,
  ClipboardList,
  HeartHandshake,
  FileSpreadsheet,
  History,
  Bell,
  Search,
  ChevronRight,
  ShieldCheck,
  CheckSquare,
  Sparkles,
  ChevronDown,
  Coins,
  Gavel,
  Home,
  FileText,
  Clock,
  Compass,
  CheckCircle2,
  FolderOpen,
  Briefcase,
  HelpCircle,
  TrendingUp,
  Landmark,
  Scale,
  Send
} from "lucide-react";

export const OfficerSidebar = () => {
  const { currentUser, activePage, navigateTo, openContextDrawer } = useApp();
  const [openGroups, setOpenGroups] = useState({
    "group-0": true,
    "group-1": true
  });

  const toggleGroup = (groupId) => {
    setOpenGroups((prev) => ({
      ...prev,
      [groupId]: !prev[groupId]
    }));
  };

  if (!currentUser) return null;

  const role = currentUser.role || "Central Authority";
  const desig = currentUser.designation || "";
  const roleId = currentUser.roleId || "";

  // Helper to build consolidated 8 groups per designation
  const getDesignationSidebarGroups = () => {
    // 1. Joint Secretary (MoRD / DoLR)
    if (desig.includes("Joint Secretary") || desig.includes("MoRD")) {
      return [
        { id: "g1", label: "Command Dashboard", icon: Home, page: "central-dashboard" },
        {
          id: "g2",
          label: "Acquisition Oversight",
          icon: CheckSquare,
          items: [
            { id: "project-workflow", label: "National Acquisition Pipeline" },
            { id: "project-progress", label: "Project Monitoring" },
            { id: "project-approvals", label: "Statutory Approvals" }
          ]
        },
        {
          id: "g3",
          label: "National GIS & Projects",
          icon: Map,
          items: [
            { id: "public-gis-map", label: "National Strategic Corridors" },
            { id: "gis-parcels", label: "Inter-State Project Boundaries" }
          ]
        },
        {
          id: "g4",
          label: "Finance & Fund Monitoring",
          icon: Coins,
          items: [
            { id: "central-approvals", label: "National Fund Allocations" },
            { id: "payment-disbursement", label: "Expenditure & DBT Variance" }
          ]
        },
        {
          id: "g5",
          label: "R&R & Social Monitoring",
          icon: HeartHandshake,
          items: [
            { id: "rnr-fund-requests", label: "National R&R Entitlements" },
            { id: "rnr-benefits", label: "Resettlement Progress" }
          ]
        },
        {
          id: "g6",
          label: "National Monitoring",
          icon: FileSpreadsheet,
          items: [
            { id: "state-progress", label: "State-wise Performance" },
            { id: "analytics", label: "SLA Heatmap & Escalations" }
          ]
        },
        {
          id: "g7",
          label: "Documents & Compliance",
          icon: FileText,
          items: [
            { id: "proposal-doc-viewer", label: "National Repository" },
            { id: "audit-logs", label: "Audit & Compliance Log" }
          ]
        },
        { id: "g8", label: "Search & Records", icon: Search, page: "public-project-search" }
      ];
    }

    // 2. Central Director (Projects & Finance)
    if (desig.includes("Central Director") || desig.includes("Projects & Finance")) {
      return [
        { id: "g1", label: "Command Dashboard", icon: Home, page: "central-approvals" },
        {
          id: "g2",
          label: "National Project Portfolio",
          icon: Layers,
          items: [
            { id: "project-progress", label: "Portfolio Overview" },
            { id: "project-workflow", label: "Physical Execution" }
          ]
        },
        {
          id: "g3",
          label: "Financial Management",
          icon: Coins,
          items: [
            { id: "central-approvals", label: "Expenditure & Budget" },
            { id: "payment-disbursement", label: "Compensation Costs" }
          ]
        },
        {
          id: "g4",
          label: "Funds & Disbursement",
          icon: Landmark,
          items: [
            { id: "rnr-fund-requests", label: "Fund Releases" },
            { id: "state-fund-allocation", label: "Utilization & Reconciliation" }
          ]
        },
        {
          id: "g5",
          label: "Cost & Performance",
          icon: TrendingUp,
          items: [
            { id: "analytics", label: "Cost & Time Variance" },
            { id: "state-reports", label: "Performance Analytics" }
          ]
        },
        {
          id: "g6",
          label: "Project GIS",
          icon: Map,
          items: [
            { id: "public-gis-map", label: "Project Alignments Map" }
          ]
        },
        {
          id: "g7",
          label: "Documents & Compliance",
          icon: FileText,
          items: [
            { id: "proposal-doc-viewer", label: "Financial Sanctions & UCs" },
            { id: "audit-logs", label: "Audit Trail" }
          ]
        },
        { id: "g8", label: "Search & Records", icon: Search, page: "public-project-search" }
      ];
    }

    // 3. Central Nodal / Monitoring Officer
    if (desig.includes("Central Nodal") || desig.includes("Monitoring Officer")) {
      return [
        { id: "g1", label: "Command Dashboard", icon: Home, page: "central-analytics" },
        {
          id: "g2",
          label: "State Coordination",
          icon: Building,
          items: [
            { id: "state-progress", label: "State Directory & Feed Health" },
            { id: "district-monitoring", label: "Inter-State Dependencies" }
          ]
        },
        {
          id: "g3",
          label: "State Submissions",
          icon: FileCheck,
          items: [
            { id: "central-approvals", label: "Validation Desk" },
            { id: "proposal-doc-viewer", label: "Monthly Reports" }
          ]
        },
        {
          id: "g4",
          label: "SLA & Escalations",
          icon: Clock,
          items: [
            { id: "analytics", label: "Statutory SLA Engine" }
          ]
        },
        {
          id: "g5",
          label: "National Monitoring",
          icon: FileSpreadsheet,
          items: [
            { id: "state-reports", label: "Data Quality & KPIs" }
          ]
        },
        {
          id: "g6",
          label: "Inter-State Coordination",
          icon: Layers,
          items: [
            { id: "project-progress", label: "Corridor Linear Feeds" }
          ]
        },
        {
          id: "g7",
          label: "Compliance & Documents",
          icon: FileText,
          items: [
            { id: "audit-logs", label: "Validation Logs" }
          ]
        },
        { id: "g8", label: "Search & Records", icon: Search, page: "public-project-search" }
      ];
    }

    // 4. Principal Secretary (Revenue)
    if (desig.includes("Principal Secretary") || desig.includes("Secretary (Revenue)")) {
      return [
        { id: "g1", label: "Command Dashboard", icon: Home, page: "state-dashboard" },
        {
          id: "g2",
          label: "Acquisition Governance",
          icon: CheckSquare,
          items: [
            { id: "state-approvals", label: "New Project Proposals" },
            { id: "project-workflow", label: "Active Acquisitions" }
          ]
        },
        {
          id: "g3",
          label: "Project Sanctions",
          icon: FileCheck,
          items: [
            { id: "proposal-doc-viewer", label: "In-Principle Sanctions" },
            { id: "land-requirement-summary", label: "Land Requisition Review" }
          ]
        },
        {
          id: "g4",
          label: "Authority & Administration",
          icon: Building,
          items: [
            { id: "district-monitoring", label: "District Collectors & SLAOs" }
          ]
        },
        {
          id: "g5",
          label: "Statutory Compliance",
          icon: ShieldCheck,
          items: [
            { id: "gazette-notifications", label: "Section 10 Multi-Crop Ceiling" },
            { id: "analytics", label: "Statutory Timeline Monitor" }
          ]
        },
        {
          id: "g6",
          label: "Finance & R&R Oversight",
          icon: Coins,
          items: [
            { id: "state-fund-allocation", label: "Project Fund Allocation" },
            { id: "state-fund-rnr", label: "R&R Sanction & Oversight" }
          ]
        },
        {
          id: "g7",
          label: "State Monitoring",
          icon: FileSpreadsheet,
          items: [
            { id: "state-reports", label: "District Performance & SLA" }
          ]
        },
        { id: "g8", label: "Documents & Search", icon: Search, page: "public-project-search" }
      ];
    }

    // 5. Commissioner for R&R
    if (desig.includes("Commissioner") && desig.includes("R&R")) {
      return [
        { id: "g1", label: "Command Dashboard", icon: Home, page: "state-fund-rnr" },
        {
          id: "g2",
          label: "Affected Families",
          icon: Users,
          items: [
            { id: "rnr-entitlements", label: "State Family Registry" },
            { id: "rnr-benefits", label: "Eligibility Verification" }
          ]
        },
        {
          id: "g3",
          label: "R&R Schemes & Planning",
          icon: FileCheck,
          items: [
            { id: "rnr-dashboard", label: "Scheme Sanctions" },
            { id: "proposal-doc-viewer", label: "Scheme Drafts & Approvals" }
          ]
        },
        {
          id: "g4",
          label: "Entitlements & Benefits",
          icon: Coins,
          items: [
            { id: "state-fund-allocation", label: "Entitlements Delivery Status" }
          ]
        },
        {
          id: "g5",
          label: "Resettlement & Amenities",
          icon: Building,
          items: [
            { id: "public-gis-map", label: "Resettlement Site Infrastructure" }
          ]
        },
        {
          id: "g6",
          label: "Grievances & Hearings",
          icon: Gavel,
          items: [
            { id: "objection-hearings", label: "R&R Grievance Inquiries" }
          ]
        },
        {
          id: "g7",
          label: "R&R Monitoring",
          icon: FileSpreadsheet,
          items: [
            { id: "state-reports", label: "District R&R Progress" }
          ]
        },
        { id: "g8", label: "Documents & Search", icon: Search, page: "public-project-search" }
      ];
    }

    // 6. Independent Expert Group (IEG) Reviewer
    if (desig.includes("IEG") || desig.includes("Expert Group")) {
      return [
        { id: "g1", label: "Command Dashboard", icon: Home, page: "state-proposals" },
        {
          id: "g2",
          label: "SIA Cases & Projects",
          icon: ClipboardList,
          items: [
            { id: "project-progress", label: "Assigned SIA Dossiers" }
          ]
        },
        {
          id: "g3",
          label: "SIA Documents & Evidence",
          icon: FileText,
          items: [
            { id: "proposal-doc-viewer", label: "SIMP & Baseline Surveys" },
            { id: "sia-form", label: "Gram Sabha Records" }
          ]
        },
        {
          id: "g4",
          label: "Independent Appraisal",
          icon: Scale,
          items: [
            { id: "land-requirement-summary", label: "Public Purpose & Alternatives" }
          ]
        },
        {
          id: "g5",
          label: "IEG Review & Decision",
          icon: CheckSquare,
          items: [
            { id: "state-approvals", label: "6-Parameter Digital Vote" }
          ]
        },
        {
          id: "g6",
          label: "Public Consultation",
          icon: Users,
          items: [
            { id: "sia-tasks", label: "Consultation Hearing Logs" }
          ]
        },
        {
          id: "g7",
          label: "Monitoring & Risk",
          icon: FileSpreadsheet,
          items: [
            { id: "analytics", label: "Social Impact Risk Matrix" }
          ]
        },
        { id: "g8", label: "Documents & Search", icon: Search, page: "public-project-search" }
      ];
    }

    // 7. District Collector & DM
    if (desig.includes("Collector") || desig.includes("DM")) {
      return [
        { id: "g1", label: "Command Dashboard", icon: Home, page: "district-dashboard" },
        {
          id: "g2",
          label: "Acquisition Case Management",
          icon: Layers,
          items: [
            { id: "land-verification", label: "District Case Registry" },
            { id: "project-workflow", label: "Statutory Milestone Lifecycle" }
          ]
        },
        {
          id: "g3",
          label: "Notifications & Gazette",
          icon: FileText,
          items: [
            { id: "gazette-notifications", label: "Section 11(1) & 19(1) Desk" }
          ]
        },
        {
          id: "g4",
          label: "Objections & Hearings",
          icon: Gavel,
          items: [
            { id: "objection-hearings", label: "Section 15 Hearing Court" }
          ]
        },
        {
          id: "g5",
          label: "Award & Compensation",
          icon: Award,
          items: [
            { id: "award-generation", label: "Section 23 Award Approvals" },
            { id: "payment-disbursement", label: "PFMS DBT Authorizations" }
          ]
        },
        {
          id: "g6",
          label: "Possession & Handover",
          icon: Building,
          items: [
            { id: "possession-memo", label: "Section 38 Panchnama Orders" }
          ]
        },
        {
          id: "g7",
          label: "District Monitoring",
          icon: FileSpreadsheet,
          items: [
            { id: "district-reports", label: "Taluka SLA & Village Analytics" }
          ]
        },
        { id: "g8", label: "Documents & Audit", icon: History, page: "audit-logs" }
      ];
    }

    // 8. Special Land Acquisition Officer (SLAO / LAO)
    if (desig.includes("SLAO") || desig.includes("LAO")) {
      return [
        { id: "g1", label: "Command Dashboard", icon: Home, page: "land-verification" },
        {
          id: "g2",
          label: "Acquisition Case Management",
          icon: Layers,
          items: [
            { id: "project-workflow", label: "Case Docket & Workflow" }
          ]
        },
        {
          id: "g3",
          label: "Notices & Statutory Process",
          icon: FileText,
          items: [
            { id: "gazette-notifications", label: "Notice Service Register" }
          ]
        },
        {
          id: "g4",
          label: "Claims, Objections & Hearings",
          icon: Gavel,
          items: [
            { id: "objection-hearings", label: "Section 15 Inquiry Proceedings" }
          ]
        },
        {
          id: "g5",
          label: "Field Verification & Land Records",
          icon: Map,
          items: [
            { id: "gis-parcels", label: "7/12 RoR & Cadastral Overlay" }
          ]
        },
        {
          id: "g6",
          label: "Valuation & Award Preparation",
          icon: Calculator,
          items: [
            { id: "compensation-calculator", label: "Base Rate + Solatium Calculation" },
            { id: "award-generation", label: "Section 23 Draft Award" }
          ]
        },
        {
          id: "g7",
          label: "Monitoring & Case Analytics",
          icon: FileSpreadsheet,
          items: [
            { id: "district-reports", label: "Office Case Progress & SLA" }
          ]
        },
        { id: "g8", label: "Documents & Audit", icon: History, page: "audit-logs" }
      ];
    }

    // 9. Competent Authority for Land Acquisition (CALA)
    if (desig.includes("CALA")) {
      return [
        { id: "g1", label: "Command Dashboard", icon: Home, page: "compensation-calculator" },
        {
          id: "g2",
          label: "Acquisition & Case Registry",
          icon: Layers,
          items: [
            { id: "land-verification", label: "Statutory Case Registry" }
          ]
        },
        {
          id: "g3",
          label: "Statutory Process & Notices",
          icon: FileText,
          items: [
            { id: "gazette-notifications", label: "Process Timeline & Notices" }
          ]
        },
        {
          id: "g4",
          label: "Claims, Objections & Hearings",
          icon: Gavel,
          items: [
            { id: "objection-hearings", label: "Claims & Interested Persons" }
          ]
        },
        {
          id: "g5",
          label: "Land Records & GIS",
          icon: Map,
          items: [
            { id: "gis-parcels", label: "Parcel Registry & Studio" }
          ]
        },
        {
          id: "g6",
          label: "Compensation & Valuation",
          icon: Award,
          items: [
            { id: "award-generation", label: "Compensation Determination" }
          ]
        },
        {
          id: "g7",
          label: "Monitoring & Analytics",
          icon: FileSpreadsheet,
          items: [
            { id: "district-reports", label: "Case Progress & Risk" }
          ]
        },
        { id: "g8", label: "Documents & Audit", icon: History, page: "audit-logs" }
      ];
    }

    // 10. Administrator for R&R (Section 43)
    if (desig.includes("Administrator") && desig.includes("R&R")) {
      return [
        { id: "g1", label: "Command Dashboard", icon: Home, page: "rnr-benefits" },
        {
          id: "g2",
          label: "Affected Families & Cases",
          icon: Users,
          items: [
            { id: "rnr-entitlements", label: "Household R&R Profiles" }
          ]
        },
        {
          id: "g3",
          label: "R&R Scheme Management",
          icon: ClipboardList,
          items: [
            { id: "rnr-dashboard", label: "Project R&R Scheme" }
          ]
        },
        {
          id: "g4",
          label: "Entitlements & R&R Passbook",
          icon: Coins,
          items: [
            { id: "payment-disbursement", label: "2nd Schedule Passbook Delivery" }
          ]
        },
        {
          id: "g5",
          label: "Resettlement & Relocation",
          icon: Building,
          items: [
            { id: "public-gis-map", label: "Resettlement Colony Plots" }
          ]
        },
        {
          id: "g6",
          label: "Infrastructure & Amenities",
          icon: Landmark,
          items: [
            { id: "proposal-doc-viewer", label: "3rd Schedule 25 Amenities" }
          ]
        },
        {
          id: "g7",
          label: "Monitoring & R&R Analytics",
          icon: FileSpreadsheet,
          items: [
            { id: "district-reports", label: "Delivery Progress & SLA" }
          ]
        },
        { id: "g8", label: "Documents & Audit", icon: History, page: "audit-logs" }
      ];
    }

    // 11. Lead Director, SIA Survey Unit
    if (desig.includes("SIA") || desig.includes("Social Impact")) {
      return [
        { id: "g1", label: "Command Dashboard", icon: Home, page: "sia-tasks" },
        {
          id: "g2",
          label: "SIA Project & Survey Registry",
          icon: Layers,
          items: [
            { id: "project-progress", label: "Survey Scope & Coverage" }
          ]
        },
        {
          id: "g3",
          label: "Household & Socio-Economic Census",
          icon: Users,
          items: [
            { id: "sia-form", label: "Digital Census Questionnaire" }
          ]
        },
        {
          id: "g4",
          label: "Field Survey & GIS",
          icon: Map,
          items: [
            { id: "gis-parcels", label: "GPS Household Geo-Tagging" }
          ]
        },
        {
          id: "g5",
          label: "Community Resources & Livelihood",
          icon: Landmark,
          items: [
            { id: "land-requirement-summary", label: "Common Property Resources" }
          ]
        },
        {
          id: "g6",
          label: "Social Impact Assessment",
          icon: Scale,
          items: [
            { id: "analytics", label: "Impact & Severity Matrix" }
          ]
        },
        {
          id: "g7",
          label: "SIA Report & Recommendations",
          icon: FileText,
          items: [
            { id: "proposal-doc-viewer", label: "SIMP Formulation & Draft" }
          ]
        },
        { id: "g8", label: "Documents & Audit", icon: History, page: "audit-logs" }
      ];
    }

    // 12. Revenue Surveyor / Patwari / Talati
    if (desig.includes("Surveyor") || desig.includes("Patwari") || desig.includes("Talati")) {
      return [
        { id: "g1", label: "Command Dashboard", icon: Home, page: "gis-parcel-selection" },
        {
          id: "g2",
          label: "Land Records & RoR",
          icon: FileText,
          items: [
            { id: "land-verification", label: "7/12 RoR Register & Mutation" }
          ]
        },
        {
          id: "g3",
          label: "GIS & Parcel Survey",
          icon: Map,
          items: [
            { id: "public-gis-map", label: "Cadastral Plot Boundaries" }
          ]
        },
        {
          id: "g4",
          label: "Demarcation & Ground Verification",
          icon: Compass,
          items: [
            { id: "gis-parcels", label: "DGPS Survey & Boundary Points" }
          ]
        },
        {
          id: "g5",
          label: "Assets & Crop Inventory",
          icon: Landmark,
          items: [
            { id: "land-requirement-summary", label: "Standing Crops & Structures" }
          ]
        },
        {
          id: "g6",
          label: "Field Evidence & Inspection",
          icon: FileCheck,
          items: [
            { id: "possession-memo", label: "Geo-Tagged Photos & Notes" }
          ]
        },
        {
          id: "g7",
          label: "Damage & Valuation Records",
          icon: Calculator,
          items: [
            { id: "compensation-calculator", label: "Field Damage Vouchers" }
          ]
        },
        { id: "g8", label: "Reports, Documents & Audit", icon: History, page: "audit-logs" }
      ];
    }

    // 13. CPM / Project Director (Requiring Body)
    if (desig.includes("CPM") || desig.includes("Project Director") || (role === "Requiring Body" && !desig.includes("Finance"))) {
      return [
        { id: "g1", label: "Command Dashboard", icon: Home, page: "my-projects" },
        {
          id: "g2",
          label: "Requisitions & Projects",
          icon: FolderPlus,
          items: [
            { id: "create-project", label: "New Project Requisition" },
            { id: "project-workflow", label: "Requisition Pipeline" }
          ]
        },
        {
          id: "g3",
          label: "GIS Corridor & Alignment",
          icon: Map,
          items: [
            { id: "gis-parcels", label: "RoW Buffer & Parcel Intersect" }
          ]
        },
        {
          id: "g4",
          label: "Statutory Notifications",
          icon: FileText,
          items: [
            { id: "gazette-notifications", label: "Gazette & Declaration Status" }
          ]
        },
        {
          id: "g5",
          label: "Project Cost & Deposits",
          icon: Coins,
          items: [
            { id: "payment-disbursement", label: "Section 31 Escrow Deposits" }
          ]
        },
        {
          id: "g6",
          label: "Handover & Physical Possession",
          icon: Building,
          items: [
            { id: "possession-memo", label: "Handover Tracker & Panchnama" }
          ]
        },
        {
          id: "g7",
          label: "Project Progress & SLA",
          icon: FileSpreadsheet,
          items: [
            { id: "land-requirement-summary", label: "Land Milestone Tracker" }
          ]
        },
        { id: "g8", label: "Documents & DPR", icon: FileCheck, page: "proposal-doc-viewer" }
      ];
    }

    // 14. Finance & Accounts Officer (Requiring Body)
    if (desig.includes("Finance") && (role === "Requiring Body" || desig.includes("Accounts"))) {
      return [
        { id: "g1", label: "Command Dashboard", icon: Home, page: "payment-disbursement" },
        {
          id: "g2",
          label: "Project & Financial Registry",
          icon: Layers,
          items: [
            { id: "my-projects", label: "Active Project Accounts" }
          ]
        },
        {
          id: "g3",
          label: "Acquisition Cost & Budget",
          icon: Calculator,
          items: [
            { id: "land-requirement-summary", label: "Cost Structure & Budget" }
          ]
        },
        {
          id: "g4",
          label: "Funds & Escrow Management",
          icon: Landmark,
          items: [
            { id: "state-fund-allocation", label: "Sec 31 Escrow & Challans" }
          ]
        },
        {
          id: "g5",
          label: "Compensation & DBT Monitoring",
          icon: Coins,
          items: [
            { id: "award-generation", label: "PFMS / e-Kuber Batches" }
          ]
        },
        {
          id: "g6",
          label: "Ledger & Reconciliation",
          icon: FileSpreadsheet,
          items: [
            { id: "district-reports", label: "Treasury Reconciliation" }
          ]
        },
        {
          id: "g7",
          label: "Financial Monitoring & Reports",
          icon: TrendingUp,
          items: [
            { id: "analytics", label: "Variance Analysis & MIS" }
          ]
        },
        { id: "g8", label: "Documents & Audit", icon: History, page: "audit-logs" }
      ];
    }

    // 15 & 16. Citizen (Landowner or Tenant)
    if (role === "Citizen" || desig.includes("Citizen") || desig.includes("Khatedar") || desig.includes("Tenant")) {
      return [
        { id: "g1", label: "My Dashboard", icon: Home, page: "citizen-my-land" },
        { id: "g2", label: "My Land & Acquisition", icon: Map, page: "public-gis-map" },
        { id: "g3", label: "Notices & Timeline", icon: FileText, page: "gazette-notifications" },
        { id: "g4", label: "Objections & Hearings", icon: Gavel, page: "citizen-grievance" },
        { id: "g5", label: "Compensation Explainer", icon: Award, page: "compensation-calculator" },
        { id: "g6", label: "R&R Passbook", icon: HeartHandshake, page: "rnr-entitlements" },
        { id: "g7", label: "Documents & Certificates", icon: FileCheck, page: "proposal-doc-viewer" },
        { id: "g8", label: "Help & Voice Assistant", icon: HelpCircle, page: "citizen-grievance" }
      ];
    }

    // 17. Presiding Judicial Officer (LARR Tribunal)
    if (desig.includes("Judge") || desig.includes("Presiding Judicial")) {
      return [
        { id: "g1", label: "Tribunal Command", icon: Home, page: "objection-hearings" },
        {
          id: "g2",
          label: "Case Docket & References",
          icon: Gavel,
          items: [
            { id: "land-verification", label: "Section 64 Reference Inbox" }
          ]
        },
        {
          id: "g3",
          label: "Case Files & Evidence",
          icon: FileText,
          items: [
            { id: "proposal-doc-viewer", label: "Digital Case Files & RoR" }
          ]
        },
        {
          id: "g4",
          label: "Hearings & Cause List",
          icon: Clock,
          items: [
            { id: "gazette-notifications", label: "Daily Cause List & Rooms" }
          ]
        },
        {
          id: "g5",
          label: "Compensation & Award Review",
          icon: Scale,
          items: [
            { id: "compensation-calculator", label: "Enhancement Assessment" }
          ]
        },
        {
          id: "g6",
          label: "Orders & Judgments",
          icon: ShieldCheck,
          items: [
            { id: "award-generation", label: "Decrees & DSC Signed Orders" }
          ]
        },
        {
          id: "g7",
          label: "Execution & Recovery",
          icon: Coins,
          items: [
            { id: "possession-memo", label: "RRC & Recovery Monitoring" }
          ]
        },
        { id: "g8", label: "Reports & Judicial MIS", icon: FileSpreadsheet, page: "district-reports" }
      ];
    }

    // 18. Tribunal Registrar / Docket Clerk
    if (desig.includes("Registrar") || desig.includes("Docket Clerk")) {
      return [
        { id: "g1", label: "Registry Command", icon: Home, page: "gazette-notifications" },
        {
          id: "g2",
          label: "Filing & Scrutiny Desk",
          icon: FileCheck,
          items: [
            { id: "land-verification", label: "New References & Scrutiny" }
          ]
        },
        {
          id: "g3",
          label: "Case Docket",
          icon: Gavel,
          items: [
            { id: "objection-hearings", label: "Case Registration & Bench" }
          ]
        },
        {
          id: "g4",
          label: "Case Files & Documents",
          icon: FileText,
          items: [
            { id: "proposal-doc-viewer", label: "Document Indexing & Vault" }
          ]
        },
        {
          id: "g5",
          label: "Cause List & Hearings",
          icon: Clock,
          items: [
            { id: "district-reports", label: "Daily Cause List Builder" }
          ]
        },
        {
          id: "g6",
          label: "Notices & Service",
          icon: Send,
          items: [
            { id: "notifications", label: "Summons & Electronic Service" }
          ]
        },
        {
          id: "g7",
          label: "Parties & Case Registry",
          icon: Users,
          items: [
            { id: "user-management", label: "Advocates & Party Profiles" }
          ]
        },
        { id: "g8", label: "Reports & Audit", icon: History, page: "audit-logs" }
      ];
    }

    // 19. System Administrator
    return [
      { id: "g1", label: "System Command Center", icon: Home, page: "user-management" },
      {
        id: "g2",
        label: "User & Access Management",
        icon: Users,
        items: [
          { id: "user-management", label: "User Directory & Activation" }
        ]
      },
      {
        id: "g3",
        label: "Roles & Designations",
        icon: ShieldCheck,
        items: [
          { id: "analytics", label: "7 Roles & 18 Designation RBAC" }
        ]
      },
      {
        id: "g4",
        label: "Workflow & Process Control",
        icon: CheckSquare,
        items: [
          { id: "project-workflow", label: "Statutory Workflow Editor" }
        ]
      },
      {
        id: "g5",
        label: "GIS & Master Data",
        icon: Map,
        items: [
          { id: "public-gis-map", label: "Spatial Hierarchy & Layers" }
        ]
      },
      {
        id: "g6",
        label: "Documents & Templates",
        icon: FileText,
        items: [
          { id: "proposal-doc-viewer", label: "Gazette & Award Templates" }
        ]
      },
      {
        id: "g7",
        label: "AI & System Intelligence",
        icon: Sparkles,
        items: [
          { id: "district-reports", label: "AI Microservice Gateways" }
        ]
      },
      { id: "g8", label: "Security & Audit", icon: History, page: "audit-logs" }
    ];
  };

  const groups = getDesignationSidebarGroups();

  return (
    <aside className="w-64 bg-gov-navy text-slate-200 flex flex-col shrink-0 min-h-[calc(100vh-4rem)] border-r border-gov-navy-dark select-none shadow-md">
      {/* Officer Jurisdiction Context Header */}
      <div className="p-3.5 bg-gov-navy-dark border-b border-white/10">
        <div className="text-[10px] font-bold uppercase tracking-wider text-gov-accent flex items-center justify-between">
          <span>{currentUser.role}</span>
          <span className="bg-white/10 px-1.5 py-0.5 rounded text-[9px] text-white">GovNet</span>
        </div>
        <div className="text-xs font-bold text-white mt-1 truncate" title={currentUser.designation}>
          {currentUser.designation}
        </div>
        <div className="text-[10px] text-slate-300 mt-0.5 truncate flex items-center gap-1">
          <Map className="w-3 h-3 text-gov-accent shrink-0" />
          {currentUser.district || currentUser.state || "National"}
        </div>
      </div>

      {/* 8 Consolidated Sidebar Groups */}
      <div className="flex-1 overflow-y-auto py-2 px-2 space-y-1 text-xs">
        {groups.map((grp, idx) => {
          const IconComponent = grp.icon;
          const isDirectPage = Boolean(grp.page);

          if (isDirectPage) {
            const isActive = activePage === grp.page;
            return (
              <button
                key={grp.id}
                onClick={() => navigateTo(grp.page)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded text-left transition-all ${
                  isActive
                    ? "bg-gov-accent text-gov-navy font-bold shadow-sm"
                    : "text-slate-200 hover:bg-white/10 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <IconComponent className={`w-4 h-4 shrink-0 ${isActive ? "text-gov-navy" : "text-gov-accent"}`} />
                  <span className="truncate">{grp.label}</span>
                </div>
              </button>
            );
          }

          const isGroupOpen = openGroups[grp.id] !== false; // open by default
          const hasActiveChild = grp.items?.some((it) => it.id === activePage);

          return (
            <div key={grp.id} className="rounded overflow-hidden">
              <button
                onClick={() => toggleGroup(grp.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded text-left transition-all ${
                  hasActiveChild
                    ? "bg-white/15 text-white font-semibold"
                    : "text-slate-200 hover:bg-white/10 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <IconComponent className="w-4 h-4 text-gov-accent shrink-0" />
                  <span className="truncate">{grp.label}</span>
                </div>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 shrink-0 ${
                    isGroupOpen ? "rotate-180 text-white" : ""
                  }`}
                />
              </button>

              {isGroupOpen && grp.items && (
                <div className="ml-5 pl-2 border-l border-white/20 py-1 space-y-0.5 mt-0.5">
                  {grp.items.map((subItem) => {
                    const isSubActive = activePage === subItem.id;
                    return (
                      <button
                        key={subItem.id}
                        onClick={() => navigateTo(subItem.id)}
                        className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded text-left text-[11px] transition-colors ${
                          isSubActive
                            ? "bg-gov-accent text-gov-navy font-bold shadow-xs"
                            : "text-slate-300 hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        <span className="truncate">{subItem.label}</span>
                        {isSubActive && <div className="w-1.5 h-1.5 rounded-full bg-gov-navy shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Quick AI & Drawer Trigger Bar at bottom of sidebar */}
      <div className="p-3 bg-gov-navy-dark/90 border-t border-white/10 space-y-2">
        <button
          onClick={() =>
            openContextDrawer({
              id: "AI-QUICK-INSIGHTS",
              name: "National Statutory Risk & OCR Assistant",
              stage: "System Monitoring",
              requiringBody: "NLAMS Intelligent Core"
            })
          }
          className="w-full bg-purple-900/60 hover:bg-purple-900 border border-purple-400/30 text-purple-200 px-3 py-2 rounded text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5 text-purple-300" />
          <span>Contextual AI Assistant</span>
        </button>

        <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            NIC Encrypted
          </span>
          <span>v3.4.0-Gov</span>
        </div>
      </div>
    </aside>
  );
};
