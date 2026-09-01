import React from "react";
import { AppProvider, useApp } from "./context/AppContext.jsx";
import { PublicHeader } from "./components/common/PublicHeader.jsx";
import { OfficerHeader } from "./components/common/OfficerHeader.jsx";
import { OfficerSidebar } from "./components/common/OfficerSidebar.jsx";
import { ContextualActionDrawer } from "./components/common/ContextualActionDrawer.jsx";

// Page Imports
import { Page01Landing } from "./components/pages/Page01Landing.jsx";
import { Page02Login } from "./components/pages/Page02Login.jsx";
import { Page03CentralDashboard } from "./components/pages/Page03CentralDashboard.jsx";
import { Page04StateWiseProgress } from "./components/pages/Page04StateWiseProgress.jsx";
import { Page05ProjectWiseProgress } from "./components/pages/Page05ProjectWiseProgress.jsx";
import { Page06ProjectDetailWorkflow } from "./components/pages/Page06ProjectDetailWorkflow.jsx";
import { Page07NotificationsCenter } from "./components/pages/Page07NotificationsCenter.jsx";
import { Page08AuditLogViewer } from "./components/pages/Page08AuditLogViewer.jsx";
import { Page09StateDashboard } from "./components/pages/Page09StateDashboard.jsx";
import { Page10StatePendingProposals } from "./components/pages/Page10StatePendingProposals.jsx";
import { Page11StateNodalOfficers } from "./components/pages/Page11StateNodalOfficers.jsx";
import { Page12StateReports } from "./components/pages/Page12StateReports.jsx";
import { Page13RequiringBodyDashboard } from "./components/pages/Page13RequiringBodyDashboard.jsx";
import { Page14NewProposalForm } from "./components/pages/Page14NewProposalForm.jsx";
import { Page15GisParcelSelection } from "./components/pages/Page15GisParcelSelection.jsx";
import { Page16HandoverTracker } from "./components/pages/Page16HandoverTracker.jsx";
import { Page17DistrictDashboard } from "./components/pages/Page17DistrictDashboard.jsx";
import { Page18LandVerification } from "./components/pages/Page18LandVerification.jsx";
import { Page19GazetteNotifications } from "./components/pages/Page19GazetteNotifications.jsx";
import { Page20ObjectionHearings } from "./components/pages/Page20ObjectionHearings.jsx";
import { Page21CompensationCalculator } from "./components/pages/Page21CompensationCalculator.jsx";
import { Page22AwardGeneration } from "./components/pages/Page22AwardGeneration.jsx";
import { Page23PaymentDisbursement } from "./components/pages/Page23PaymentDisbursement.jsx";
import { Page24PossessionMemo } from "./components/pages/Page24PossessionMemo.jsx";
import { Page25CitizenSearch } from "./components/pages/Page25CitizenSearch.jsx";
import { Page26OnlineGrievance } from "./components/pages/Page26OnlineGrievance.jsx";
import { Page27SocialImpactAssessment } from "./components/pages/Page27SocialImpactAssessment.jsx";
import { Page28RAndRBenefits } from "./components/pages/Page28RAndRBenefits.jsx";
import { Page29PublicGisMap } from "./components/pages/Page29PublicGisMap.jsx";
import { Page30CentralAnalyticsReports } from "./components/pages/Page30CentralAnalyticsReports.jsx";
import { Page31UserRoleManagement } from "./components/pages/Page31UserRoleManagement.jsx";
import { Page32StateDistrictMonitoring } from "./components/pages/Page32StateDistrictMonitoring.jsx";
import { Page33ProposalDocumentViewer } from "./components/pages/Page33ProposalDocumentViewer.jsx";
import { Page34LandRequirementSummary } from "./components/pages/Page34LandRequirementSummary.jsx";
import { Page35SiaSurveyTasks } from "./components/pages/Page35SiaSurveyTasks.jsx";
import { Page36RnREntitlements } from "./components/pages/Page36RnREntitlements.jsx";
import { Page37CentralProjectApprovals } from "./components/pages/Page37CentralProjectApprovals.jsx";
import { Page38CentralRnRFundRequests } from "./components/pages/Page38CentralRnRFundRequests.jsx";
import { Page39StateFundAndRnR } from "./components/pages/Page39StateFundAndRnR.jsx";
import { Page40DistrictReports } from "./components/pages/Page40DistrictReports.jsx";

const AppContent = () => {
  const { activePage, currentUser, contextDrawer, closeContextDrawer } = useApp();

  const renderActivePage = () => {
    switch (activePage) {
      // Group A
      case "landing":
        return <Page01Landing />;
      case "login":
        return <Page02Login />;
      case "public-gis-map":
      case "gis-map":
        return <Page29PublicGisMap />;

      // Group B: Central Authority
      case "central-dashboard":
        return <Page03CentralDashboard />;
      case "state-progress":
        return <Page04StateWiseProgress />;
      case "project-progress":
      case "public-project-search":
        return <Page05ProjectWiseProgress />;
      case "project-workflow":
        return <Page06ProjectDetailWorkflow />;
      case "project-approvals":
      case "central-approvals":
      case "central-project-approvals":
        return <Page37CentralProjectApprovals />;
      case "rnr-fund-requests":
      case "central-rnr-fund-requests":
        return <Page38CentralRnRFundRequests />;
      case "notifications":
        return <Page07NotificationsCenter />;
      case "audit-logs":
        return <Page08AuditLogViewer />;
      case "analytics":
      case "central-analytics":
      case "reports":
      case "analytics-reports":
        return <Page30CentralAnalyticsReports />;
      case "user-management":
      case "user-and-role-management":
      case "role-management":
        return <Page31UserRoleManagement />;

      // Group C: State Authority
      case "state-dashboard":
        return <Page09StateDashboard />;
      case "state-approvals":
      case "state-proposals":
      case "project-approval-queue":
      case "state-pending-proposals":
        return <Page10StatePendingProposals />;
      case "district-monitoring":
      case "state-district-monitoring":
        return <Page32StateDistrictMonitoring />;
      case "state-fund-allocation":
      case "fund-allocation":
      case "state-fund-management":
      case "state-fund-rnr":
      case "state-rnr-requests":
        return <Page39StateFundAndRnR />;
      case "state-nodal-officers":
        return <Page11StateNodalOfficers />;
      case "state-reports":
        return <Page12StateReports />;

      // Group D: Requiring Body
      case "requiring-body-dashboard":
      case "my-projects":
        return <Page13RequiringBodyDashboard />;
      case "create-project":
      case "new-proposal":
        return <Page14NewProposalForm />;
      case "project-proposal-view":
      case "proposal-doc-viewer":
      case "proposal-document-view":
      case "proposal-view":
        return <Page33ProposalDocumentViewer />;
      case "land-requirement-summary":
      case "land-requirement":
      case "requirement-summary":
        return <Page34LandRequirementSummary />;
      case "gis-parcels":
      case "gis-parcel-selection":
        return <Page15GisParcelSelection />;
      case "handover-tracker":
        return <Page16HandoverTracker />;

      // Group E: District Authority
      case "district-dashboard":
        return <Page17DistrictDashboard />;
      case "land-verification":
        return <Page18LandVerification />;
      case "gazette-notifications":
        return <Page19GazetteNotifications />;
      case "objections":
      case "objection-hearings":
        return <Page20ObjectionHearings />;

      // Group F: Compensation & Awards
      case "compensation":
      case "compensation-calculator":
        return <Page21CompensationCalculator />;
      case "awards":
      case "award-generation":
        return <Page22AwardGeneration />;
      case "payment":
      case "payment-disbursement":
        return <Page23PaymentDisbursement />;
      case "possession":
      case "possession-memo":
        return <Page24PossessionMemo />;
      case "district-reports":
        return <Page40DistrictReports />;

      // Group G: SIA & R&R
      case "sia-tasks":
      case "sia-survey-tasks":
        return <Page35SiaSurveyTasks />;
      case "sia-form":
      case "sia-portal":
        return <Page27SocialImpactAssessment />;
      case "rnr-entitlements":
      case "rr-scheme-entitlements":
      case "scheme-and-entitlements":
        return <Page36RnREntitlements />;
      case "rnr-dashboard":
      case "rnr-benefits":
      case "rr-benefits":
        return <Page28RAndRBenefits />;

      // Group H: Citizen & Public Portal
      case "citizen-search":
      case "citizen-my-land":
      case "track-my-land":
      case "citizen-documents":
        return <Page25CitizenSearch />;
      case "citizen-compensation":
        return <Page21CompensationCalculator />;
      case "citizen-grievance":
      case "grievance":
        return <Page26OnlineGrievance />;

      default:
        return <Page01Landing />;
    }
  };

  const isPublicView = !currentUser || activePage === "landing" || activePage === "login";

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans selection:bg-gov-navy selection:text-white">
      {/* Official Government Header */}
      {isPublicView ? <PublicHeader /> : <OfficerHeader />}

      {/* Main Container Layout */}
      {isPublicView ? (
        <main className="flex-1 w-full">
          {renderActivePage()}
        </main>
      ) : (
        <div className="flex-1 flex w-full">
          {/* Officer Navigation Sidebar for 18 Designations */}
          <OfficerSidebar />

          {/* Main Workspace Area */}
          <main className="flex-1 min-w-0 p-4 sm:p-6 overflow-y-auto max-w-[1600px] mx-auto">
            {renderActivePage()}
          </main>
        </div>
      )}

      {/* Global Contextual Action & AI Drawer */}
      <ContextualActionDrawer
        isOpen={contextDrawer.isOpen}
        onClose={closeContextDrawer}
        data={contextDrawer.data}
        type={contextDrawer.type}
      />

      {/* Official Government Portal Footer */}
      <footer className="bg-gov-navy text-white border-t-4 border-gov-accent text-xs mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-6 border-b border-slate-600/40">
            <div>
              <div className="font-bold text-sm text-gov-accent mb-2 uppercase tracking-wide">
                NLAMS Portal
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                National Land Acquisition Management System, Department of Land Resources, Ministry of Rural Development, Government of India.
              </p>
            </div>

            <div>
              <div className="font-bold text-sm text-slate-200 mb-2 uppercase tracking-wide">
                Statutory Framework
              </div>
              <ul className="space-y-1.5 text-slate-300 text-[11px]">
                <li>• RFCTLARR Act, 2013 (No. 30 of 2013)</li>
                <li>• First Schedule: Land Compensation & Solatium</li>
                <li>• Second Schedule: R&R Entitlements & Passbook</li>
                <li>• Third Schedule: 25 Resettlement Amenities</li>
              </ul>
            </div>

            <div>
              <div className="font-bold text-sm text-slate-200 mb-2 uppercase tracking-wide">
                External Integrations
              </div>
              <ul className="space-y-1.5 text-slate-300 text-[11px]">
                <li>• e-Dhara / DILRMP Land Records (7/12 RoR)</li>
                <li>• PFMS / e-Kuber Direct Benefit Transfer</li>
                <li>• State Government Printing Gazette API</li>
                <li>• PM GatiShakti NMP / ISRO Bhuvan GIS</li>
              </ul>
            </div>

            <div>
              <div className="font-bold text-sm text-slate-200 mb-2 uppercase tracking-wide">
                Helpdesk & Support
              </div>
              <div className="text-slate-300 text-[11px] space-y-1">
                <div>Toll Free: 1800-11-2026 (Mon-Sat, 9AM-6PM)</div>
                <div>Technical Support: helpdesk-nlams@nic.in</div>
                <div className="text-gov-accent font-semibold pt-1">
                  Portal Version: v3.4.0 (GovNet Production Release)
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between text-slate-300 text-[10px] gap-2">
            <div>
              © 2026 National Land Acquisition Management System. Designed, Developed and Hosted by National Informatics Centre (NIC).
            </div>
            <div className="flex items-center gap-4">
              <span>Security Audited (CERT-In)</span>
              <span>•</span>
              <span>ISO 9001:2015 & STQC Certified</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
