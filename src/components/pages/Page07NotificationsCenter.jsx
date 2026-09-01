import React, { useState } from "react";
import { useApp } from "../../context/AppContext.jsx";
import { Bell, CheckCheck, Eye, Clock, AlertTriangle, ArrowRight, Filter } from "lucide-react";

export const Page07NotificationsCenter = () => {
  const { notifications, markAllNotificationsRead, navigateTo, currentUser } = useApp();
  const [filterTab, setFilterTab] = useState("all"); // all, unread

  const userRole = currentUser ? currentUser.role : "Public";

  // Role scoped filter
  const relevantNotifications = notifications.filter((n) => {
    if (!currentUser) return true;
    if (filterTab === "unread" && n.isRead) return false;
    return (
      n.roleTarget === userRole ||
      n.roleTarget.includes(currentUser.designation || "") ||
      n.roleTarget === "Central Authority"
    );
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div>
          <div className="text-xs text-slate-500 font-medium">
            Official System Communications
          </div>
          <h1 className="text-xl font-bold text-slate-900 leading-tight flex items-center gap-2">
            <Bell className="w-5 h-5 text-[#1e3a8a]" />
            Notifications & System Alerts Center
          </h1>
        </div>
        <button
          onClick={markAllNotificationsRead}
          className="bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 px-3 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors"
        >
          <CheckCheck className="w-4 h-4 text-emerald-700" />
          <span>Mark All as Read</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 text-xs font-semibold">
        <button
          onClick={() => setFilterTab("all")}
          className={`px-3 py-1.5 rounded transition-colors ${
            filterTab === "all"
              ? "bg-[#1e3a8a] text-white font-bold"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          All Notifications ({notifications.length})
        </button>
        <button
          onClick={() => setFilterTab("unread")}
          className={`px-3 py-1.5 rounded transition-colors ${
            filterTab === "unread"
              ? "bg-[#1e3a8a] text-white font-bold"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          Unread Only ({notifications.filter((n) => !n.isRead).length})
        </button>
      </div>

      {/* Notification List */}
      <div className="bg-white border border-slate-300 rounded shadow-xs divide-y divide-slate-100">
        {relevantNotifications.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-xs">
            No notifications found in this view.
          </div>
        ) : (
          relevantNotifications.map((n) => (
            <div
              key={n.id}
              onClick={() => n.targetPage && navigateTo(n.targetPage)}
              className={`p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:bg-slate-50 cursor-pointer transition-colors ${
                !n.isRead ? "bg-blue-50/40 font-medium" : ""
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                    !n.isRead
                      ? "bg-[#1e3a8a] text-white"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  <Bell className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">{n.title}</span>
                    {!n.isRead && (
                      <span className="w-2 h-2 rounded-full bg-rose-600 inline-block" />
                    )}
                    <span className="text-[10px] bg-slate-100 text-slate-700 px-1.5 py-0.2 rounded border">
                      {n.type}
                    </span>
                  </div>
                  <div className="text-xs text-slate-600 mt-0.5">
                    Project Reference: <strong>{n.project}</strong>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{n.date}</span>
                    <span>• Target Audience: {n.roleTarget}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (n.targetPage) navigateTo(n.targetPage);
                  }}
                  className="bg-[#1e3a8a] hover:bg-[#172554] text-white px-3 py-1 rounded text-xs font-semibold flex items-center gap-1 shadow-2xs"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
