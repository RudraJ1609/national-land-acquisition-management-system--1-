import React, { useState } from "react";
import { useApp } from "../../context/AppContext.jsx";
import { AccessRestricted } from "../common/AccessRestricted.jsx";
import {
  History,
  Search,
  Filter,
  Download,
  X,
  ShieldCheck,
  Calendar,
  Layers,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

export const Page08AuditLogViewer = () => {
  const { auditLogs, currentUser } = useApp();

  const [searchQuery, setSearchQuery] = useState("");
  const [moduleFilter, setModuleFilter] = useState("All");
  const [roleFilter, setRoleFilter] = useState("All");
  const [selectedLog, setSelectedLog] = useState(null);

  // Access check: Only Central Authority & State Authority can inspect system-wide audit logs
  if (currentUser && currentUser.role !== "Central Authority" && currentUser.role !== "State Authority") {
    return (
      <AccessRestricted
        requiredRole="Central Authority or State Authority"
        pageName="System Audit Trail & Security Logs"
      />
    );
  }

  const filteredLogs = auditLogs.filter((log) => {
    const matchesSearch =
      log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesModule = moduleFilter === "All" || log.module === moduleFilter;
    const matchesRole = roleFilter === "All" || log.role === roleFilter;

    return matchesSearch && matchesModule && matchesRole;
  });

  const exportCsv = () => {
    const headers = "Timestamp,User,Role,Action,Module,Reference,Details,IP Address\n";
    const rows = filteredLogs
      .map(
        (l) =>
          `"${l.timestamp}","${l.user}","${l.role}","${l.action}","${l.module}","${l.reference}","${l.details}","${l.ipAddress}"`
      )
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `NLAMS_System_Audit_Log_${new Date().toISOString().substring(0, 10)}.csv`;
    a.click();
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div>
          <div className="text-xs text-slate-500 font-medium">
            Central Authority • IT & Compliance Security
          </div>
          <h1 className="text-xl font-bold text-slate-900 leading-tight flex items-center gap-2">
            <History className="w-5 h-5 text-[#1e3a8a]" />
            Statutory Digital Audit Trail
          </h1>
        </div>
        <button
          onClick={exportCsv}
          className="bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 px-3 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Audit Log (CSV)</span>
        </button>
      </div>

      {/* Filters Bar */}
      <div className="bg-white border border-slate-300 rounded p-4 shadow-2xs space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          {/* Keyword Search */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Search Keywords</label>
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="User, Reference, Action..."
                className="w-full pl-8 pr-2.5 py-1.5 border border-slate-300 rounded text-slate-900 focus:ring-1 focus:ring-[#1e3a8a]"
              />
            </div>
          </div>

          {/* Module Filter */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">System Module</label>
            <select
              value={moduleFilter}
              onChange={(e) => setModuleFilter(e.target.value)}
              className="w-full px-2.5 py-1.5 border border-slate-300 rounded bg-white text-slate-900 focus:ring-1 focus:ring-[#1e3a8a]"
            >
              <option value="All">All Modules</option>
              <option value="Project Management">Project Management</option>
              <option value="Land Verification">Land Verification</option>
              <option value="SIA">SIA Module</option>
              <option value="Notification">Notification (Sec 11/19)</option>
              <option value="Objection">Objections (Sec 15)</option>
              <option value="Compensation">Compensation</option>
              <option value="Award">Award Declaration</option>
              <option value="Payment">PFMS Payment</option>
              <option value="Possession">Possession Memo</option>
              <option value="User Management">User Management</option>
            </select>
          </div>

          {/* Role Filter */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Actor Role</label>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="w-full px-2.5 py-1.5 border border-slate-300 rounded bg-white text-slate-900 focus:ring-1 focus:ring-[#1e3a8a]"
            >
              <option value="All">All Roles</option>
              <option value="Central Authority">Central Authority</option>
              <option value="State Authority">State Authority</option>
              <option value="Requiring Body">Requiring Body</option>
              <option value="District Authority">District Authority</option>
              <option value="Citizen">Citizen / Khatedar</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
          <span className="text-slate-500">
            Displaying <strong>{filteredLogs.length}</strong> immutable audit entries
          </span>
          <button
            onClick={() => {
              setSearchQuery("");
              setModuleFilter("All");
              setRoleFilter("All");
            }}
            className="text-[#1e3a8a] hover:underline font-semibold"
          >
            Reset Filters
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-300 rounded shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-100 text-slate-800 font-semibold border-b border-slate-200 uppercase text-[11px]">
              <tr>
                <th className="py-3 px-3.5 border-r">Timestamp</th>
                <th className="py-3 px-3 border-r">User / Officer</th>
                <th className="py-3 px-3 border-r">Role</th>
                <th className="py-3 px-3 border-r">Action Performed</th>
                <th className="py-3 px-3 border-r">Module</th>
                <th className="py-3 px-3 border-r">Reference ID</th>
                <th className="py-3 px-3 border-r">Audit Details</th>
                <th className="py-3 px-3 text-center">Detail</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredLogs.map((log) => (
                <tr
                  key={log.id}
                  onClick={() => setSelectedLog(log)}
                  className="hover:bg-blue-50/60 cursor-pointer transition-colors"
                >
                  <td className="py-2.5 px-3.5 border-r font-mono text-[11px] text-slate-600 whitespace-nowrap">
                    {log.timestamp}
                  </td>
                  <td className="py-2.5 px-3 border-r font-semibold text-slate-900">
                    {log.user}
                  </td>
                  <td className="py-2.5 px-3 border-r text-slate-700 font-medium">
                    {log.role}
                  </td>
                  <td className="py-2.5 px-3 border-r font-semibold text-[#1e3a8a]">
                    {log.action}
                  </td>
                  <td className="py-2.5 px-3 border-r text-slate-600">
                    <span className="bg-slate-100 px-1.5 py-0.5 rounded border text-[10px]">
                      {log.module}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 border-r font-mono text-[11px] text-slate-700">
                    {log.reference}
                  </td>
                  <td className="py-2.5 px-3 border-r text-slate-600 max-w-[260px] truncate">
                    {log.details}
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedLog(log);
                      }}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 px-2 py-0.5 rounded text-[11px] font-semibold"
                    >
                      Inspect
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
          <div>Showing 1 to {filteredLogs.length} of {filteredLogs.length} entries</div>
          <div className="flex items-center gap-1">
            <button className="px-2 py-1 border border-slate-300 rounded bg-white text-slate-400 cursor-not-allowed">
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <span className="px-2 py-1 bg-[#1e3a8a] text-white font-bold rounded">1</span>
            <button className="px-2 py-1 border border-slate-300 rounded bg-white text-slate-400 cursor-not-allowed">
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Detail Modal / Drawer */}
      {selectedLog && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded border border-slate-400 shadow-2xl max-w-lg w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-700" />
                <h3 className="font-bold text-sm text-slate-900">
                  Immutable Audit Log Record #{selectedLog.id}
                </h3>
              </div>
              <button
                onClick={() => setSelectedLog(null)}
                className="p-1 hover:bg-slate-100 rounded text-slate-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="grid grid-cols-3 gap-1 py-1 border-b">
                <span className="font-semibold text-slate-500">Timestamp:</span>
                <span className="col-span-2 font-mono text-slate-900">{selectedLog.timestamp}</span>
              </div>
              <div className="grid grid-cols-3 gap-1 py-1 border-b">
                <span className="font-semibold text-slate-500">Officer Name:</span>
                <span className="col-span-2 font-bold text-slate-900">{selectedLog.user}</span>
              </div>
              <div className="grid grid-cols-3 gap-1 py-1 border-b">
                <span className="font-semibold text-slate-500">Role / Clearance:</span>
                <span className="col-span-2 text-slate-800">{selectedLog.role}</span>
              </div>
              <div className="grid grid-cols-3 gap-1 py-1 border-b">
                <span className="font-semibold text-slate-500">Action:</span>
                <span className="col-span-2 font-bold text-[#1e3a8a]">{selectedLog.action}</span>
              </div>
              <div className="grid grid-cols-3 gap-1 py-1 border-b">
                <span className="font-semibold text-slate-500">System Module:</span>
                <span className="col-span-2 text-slate-800">{selectedLog.module}</span>
              </div>
              <div className="grid grid-cols-3 gap-1 py-1 border-b">
                <span className="font-semibold text-slate-500">Entity Reference:</span>
                <span className="col-span-2 font-mono text-slate-900">{selectedLog.reference}</span>
              </div>
              <div className="grid grid-cols-3 gap-1 py-1 border-b">
                <span className="font-semibold text-slate-500">Client IP Address:</span>
                <span className="col-span-2 font-mono text-slate-700">{selectedLog.ipAddress}</span>
              </div>
              <div className="py-1">
                <span className="font-semibold text-slate-500 block mb-1">Detailed Description:</span>
                <div className="p-2.5 bg-slate-50 border rounded text-slate-800 font-mono text-[11px] leading-relaxed">
                  {selectedLog.details}
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedLog(null)}
                className="bg-[#1e3a8a] text-white px-4 py-1.5 rounded text-xs font-semibold hover:bg-blue-900"
              >
                Close Record
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
