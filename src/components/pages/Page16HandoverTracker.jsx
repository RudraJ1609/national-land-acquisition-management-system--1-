import React from "react";
import { useApp } from "../../context/AppContext.jsx";
import { StatusBadge } from "../common/StatusBadge.jsx";
import {
  Building,
  CheckCircle2,
  Clock,
  Download,
  FileCheck,
  MapPin,
  Calendar,
  Eye,
  ShieldCheck
} from "lucide-react";

export const Page16HandoverTracker = () => {
  const { currentProject, possessionMemos, navigateTo } = useApp();
  const [downloadMemoId, setDownloadMemoId] = React.useState(null);

  const totalReq = currentProject?.landRequired || 18.5;
  const possessed = currentProject?.landAcquired || 14.8;
  const percent = Math.round((possessed / totalReq) * 100);

  const downloadMemoPdf = (memoId) => {
    setDownloadMemoId(memoId);
    setTimeout(() => setDownloadMemoId(null), 3500);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Title */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div>
          <div className="text-xs text-slate-500 font-medium">
            Requiring Body Portal • Section 38 Physical Possession & Land Handover
          </div>
          <h1 className="text-xl font-bold text-slate-900 leading-tight flex items-center gap-2">
            <Building className="w-5 h-5 text-[#1e3a8a]" />
            Land Handover & Possession Tracker
          </h1>
        </div>
      </div>

      {/* Progress & Milestone Overview */}
      <div className="bg-white border border-slate-300 rounded p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-3">
          <div>
            <h2 className="font-bold text-sm text-slate-900">{currentProject.name}</h2>
            <div className="text-xs text-slate-500 font-mono">Project Reference: {currentProject.id}</div>
          </div>
          <div className="text-right">
            <span className="text-xs font-semibold text-slate-600">Target Handover Date: </span>
            <span className="text-xs font-mono font-bold text-[#1e3a8a]">{currentProject.targetPossessionDate}</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs font-semibold text-slate-800">
            <span>Possession Handover Status:</span>
            <span>{possessed} of {totalReq} Acres Handed Over ({percent}%)</span>
          </div>
          <div className="w-full bg-slate-200 h-3.5 rounded-full overflow-hidden">
            <div
              className="bg-emerald-600 h-full transition-all duration-500"
              style={{ width: `${percent}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-[11px] text-slate-500 pt-1">
            <span>• 120 Acres: Section 38 Panchnama Complete</span>
            <span>• 32 Acres: DGPS Demarcation In Progress</span>
            <span>• 28 Acres: Pending Compensation PFMS Clearance</span>
          </div>
        </div>
      </div>

      {/* Possession Memos Table */}
      <div className="bg-white border border-slate-300 rounded shadow-xs p-4 space-y-3">
        <div className="flex items-center justify-between border-b pb-2">
          <h3 className="font-bold text-xs uppercase tracking-wider text-slate-900">
            Executed Possession Memos & Panchnama Certificates
          </h3>
          <span className="text-xs text-emerald-700 font-semibold">
            {possessionMemos.length} Official Memos Registered
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border border-slate-200">
            <thead className="bg-slate-100 text-slate-800 font-semibold border-b uppercase text-[10px]">
              <tr>
                <th className="py-2.5 px-3 border-r">Memo ID</th>
                <th className="py-2.5 px-3 border-r">Survey No</th>
                <th className="py-2.5 px-3 border-r">Village</th>
                <th className="py-2.5 px-3 border-r">Area (Acres)</th>
                <th className="py-2.5 px-3 border-r">Handover Date</th>
                <th className="py-2.5 px-3 border-r">Field Revenue Officer</th>
                <th className="py-2.5 px-3 border-r">Panchnama Status</th>
                <th className="py-2.5 px-3 text-center">Certificate PDF</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {possessionMemos.map((pos) => (
                <tr key={pos.id} className="hover:bg-slate-50">
                  <td className="py-2.5 px-3 border-r font-mono font-bold text-slate-900">{pos.id}</td>
                  <td className="py-2.5 px-3 border-r font-mono text-slate-900 font-bold">{pos.surveyNumber}</td>
                  <td className="py-2.5 px-3 border-r">{pos.village}</td>
                  <td className="py-2.5 px-3 border-r font-semibold">{pos.areaAcres}</td>
                  <td className="py-2.5 px-3 border-r font-mono text-slate-700">{pos.actualPossessionDate}</td>
                  <td className="py-2.5 px-3 border-r text-slate-700">{pos.fieldOfficer}</td>
                  <td className="py-2.5 px-3 border-r"><StatusBadge status={pos.status} size="xs" /></td>
                  <td className="py-2.5 px-3 text-center">
                    <button
                      onClick={() => downloadMemoPdf(pos.id)}
                      className="bg-[#1e3a8a] text-white px-2.5 py-1 rounded text-[11px] font-semibold hover:bg-blue-900 inline-flex items-center gap-1 shadow-2xs"
                    >
                      <Download className="w-3 h-3" />
                      <span>PDF Memo</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Joint Site Inspection Schedules */}
      <div className="bg-white border border-slate-300 rounded shadow-xs p-4 space-y-3">
        <div className="flex items-center justify-between border-b pb-2">
          <h3 className="font-bold text-xs uppercase tracking-wider text-slate-900 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#1e3a8a]" />
            Joint Site Demarcation & Inspection Schedule
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="border p-3 rounded bg-slate-50 space-y-1">
            <div className="font-bold text-slate-900">Sunav Village Boundary Pillars</div>
            <div className="text-slate-600">Surveys: 142/A, 142/B (DGPS Fixation)</div>
            <div className="text-amber-800 font-semibold text-[11px]">Inspection: 28-Aug-2026 at 10:00 AM</div>
            <div className="text-[10px] text-slate-500">Officers: SLAO Vadodara & DFCCIL Survey Team</div>
          </div>

          <div className="border p-3 rounded bg-slate-50 space-y-1">
            <div className="font-bold text-slate-900">Bandhani Railway Crossing Stretch</div>
            <div className="text-slate-600">Surveys: 88, 89/1, 89/2 (Structure Inventory)</div>
            <div className="text-amber-800 font-semibold text-[11px]">Inspection: 02-Sep-2026 at 11:30 AM</div>
            <div className="text-[10px] text-slate-500">Officers: Dy. Collector Anand & R&R Officer</div>
          </div>

          <div className="border p-3 rounded bg-slate-50 space-y-1">
            <div className="font-bold text-slate-900">Agas Industrial Linkage Line</div>
            <div className="text-slate-600">Surveys: 104, 105/A (Final Panchnama)</div>
            <div className="text-emerald-700 font-semibold text-[11px]">Inspection Completed (08-Aug-2026)</div>
            <div className="text-[10px] text-slate-500">Possession Memo Signed & Dispatched</div>
          </div>
        </div>
      </div>
    </div>
  );
};
