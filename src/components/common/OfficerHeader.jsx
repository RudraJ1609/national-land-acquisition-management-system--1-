import React, { useState } from "react";
import { useApp } from "../../context/AppContext.jsx";
import { GovEmblem } from "./GovEmblem.jsx";
import { DEMO_USERS, ROLE_GROUPS, DESIGNATIONS_MASTER } from "../../data/mockData.js";
import {
  Bell,
  LogOut,
  User,
  Shield,
  ChevronDown,
  Check,
  Building2,
  MapPin,
  Sparkles,
  Layers,
  Search,
  SlidersHorizontal,
  ExternalLink
} from "lucide-react";

export const OfficerHeader = () => {
  const {
    currentUser,
    logoutUser,
    navigateTo,
    notifications,
    loginUser,
    projects,
    selectedProjectId,
    setSelectedProjectId,
    fontSize,
    setFontSize,
    language,
    setLanguage,
    openContextDrawer
  } = useApp();

  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [showProjectDropdown, setShowProjectDropdown] = useState(false);
  const [selectedRoleGroupFilter, setSelectedRoleGroupFilter] = useState("all");

  if (!currentUser) return null;

  // Unread notifications count for current user
  const unreadCount = notifications.filter(
    (n) =>
      !n.isRead &&
      (n.roleTarget === currentUser.role ||
        n.roleTarget.includes(currentUser.designation) ||
        n.roleTarget === "Central Authority")
  ).length;

  const currentProject = projects.find((p) => p.id === selectedProjectId) || projects[0];

  return (
    <header className="bg-gov-navy text-white border-b-2 border-gov-accent sticky top-0 z-[100] shadow-md select-none">
      <div className="w-full px-4 sm:px-6 py-2 flex items-center justify-between gap-3">
        {/* Left Side: Emblem & Portal Name */}
        <div className="flex items-center gap-3">
          <div
            onClick={() => navigateTo(currentUser.defaultPage || "central-dashboard")}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <GovEmblem className="w-8 h-9" color="text-gov-accent" />
            <div>
              <div className="text-[9px] uppercase tracking-wider text-slate-300 font-semibold flex items-center gap-1.5">
                <span>Government of India</span>
                <span className="text-slate-500">•</span>
                <span className="text-gov-accent font-bold">DoLR / MoRD Portal</span>
              </div>
              <div className="text-sm sm:text-base font-bold tracking-tight text-white flex items-center gap-2">
                <span>NLAMS</span>
                <span className="hidden md:inline text-xs font-medium text-slate-300">
                  | National Land Acquisition Management System
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Center: Active Project Switcher (Essential for multi-project statutory context) */}
        <div className="hidden xl:flex items-center gap-2 bg-gov-navy-dark px-3 py-1 rounded border border-white/10 text-xs">
          <Layers className="w-3.5 h-3.5 text-gov-accent" />
          <span className="text-slate-400 text-[11px]">Active Project:</span>
          <div className="relative">
            <button
              onClick={() => setShowProjectDropdown(!showProjectDropdown)}
              className="font-bold text-white flex items-center gap-1 hover:text-gov-accent transition-colors max-w-[280px] truncate"
            >
              <span className="truncate">{currentProject ? currentProject.name : "Select Project"}</span>
              <ChevronDown className="w-3 h-3 text-slate-400 shrink-0" />
            </button>

            {showProjectDropdown && (
              <div className="absolute left-0 mt-2 w-80 bg-white text-slate-800 rounded-md shadow-2xl border border-slate-300 py-1.5 z-[110] text-xs">
                <div className="px-3 py-1.5 font-bold text-gov-navy border-b border-slate-200 bg-slate-50 flex items-center justify-between">
                  <span>Switch Statutory Project Context</span>
                  <span className="text-[10px] text-slate-500 font-normal">{projects.length} Active</span>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {projects.map((p) => {
                    const isSelected = p.id === selectedProjectId;
                    return (
                      <button
                        key={p.id}
                        onClick={() => {
                          setSelectedProjectId(p.id);
                          setShowProjectDropdown(false);
                        }}
                        className={`w-full text-left px-3 py-2 border-b border-slate-100 hover:bg-slate-50 flex items-start justify-between ${
                          isSelected ? "bg-amber-50/80 font-bold" : ""
                        }`}
                      >
                        <div>
                          <div className="text-slate-900 text-xs">{p.name}</div>
                          <div className="text-[10px] text-slate-500">
                            {p.id} • {p.state} • {p.currentStage}
                          </div>
                        </div>
                        {isSelected && <Check className="w-3.5 h-3.5 text-gov-navy shrink-0 mt-1" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Role Badge + Switcher + AI Drawer Trigger + Notifications + Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Contextual AI Drawer Trigger */}
          <button
            onClick={() =>
              openContextDrawer(currentProject, "project")
            }
            className="hidden sm:flex items-center gap-1.5 bg-purple-900/60 hover:bg-purple-900 border border-purple-400/40 text-purple-200 text-xs px-2.5 py-1 rounded transition-colors shadow-xs"
            title="Open Contextual AI & DSC Action Drawer"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-300" />
            <span className="text-[11px] font-semibold">Action Drawer</span>
          </button>

          {/* Designation & Role Badge */}
          <div className="hidden lg:flex flex-col items-end text-right">
            <div className="flex items-center gap-1.5">
              <span className="bg-gov-accent/20 text-gov-accent border border-gov-accent/40 text-xs px-2 py-0.5 rounded font-semibold">
                {currentUser.designation || currentUser.role}
              </span>
            </div>
            <div className="text-[10px] text-slate-300 flex items-center gap-1 mt-0.5">
              <MapPin className="w-2.5 h-2.5 text-gov-accent" />
              <span>
                {currentUser.state} {currentUser.district && currentUser.district !== "All Districts" ? `• ${currentUser.district}` : ""}
              </span>
            </div>
          </div>

          {/* 18-Designation & 7-Role Group Master Switcher */}
          <div className="relative">
            <button
              onClick={() => setShowRoleDropdown(!showRoleDropdown)}
              className="bg-gov-navy-dark hover:bg-slate-800 text-slate-200 text-xs px-2.5 py-1.5 rounded border border-white/20 flex items-center gap-1.5 transition-colors"
              title="Switch between 18 Statutory Designations across 7 Role Groups"
            >
              <Shield className="w-3.5 h-3.5 text-gov-accent" />
              <span className="hidden sm:inline font-medium">18 Designations</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {showRoleDropdown && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white text-slate-800 rounded-md shadow-2xl border border-slate-300 py-1.5 z-[110] text-xs">
                <div className="px-3 py-2 font-bold text-gov-navy border-b border-slate-200 bg-slate-50 flex items-center justify-between">
                  <div>
                    <div className="text-xs">Statutory Designation Switcher</div>
                    <div className="text-[10px] text-slate-500 font-normal">7 Role Groups • 18 Designations</div>
                  </div>
                  <span className="text-[10px] bg-gov-navy text-white px-2 py-0.5 rounded">GovNet RBAC</span>
                </div>

                {/* Role Group Filter Pills */}
                <div className="px-2 py-1.5 bg-slate-100/70 border-b border-slate-200 flex flex-wrap gap-1">
                  <button
                    onClick={() => setSelectedRoleGroupFilter("all")}
                    className={`px-2 py-0.5 rounded text-[10px] font-medium transition-colors ${
                      selectedRoleGroupFilter === "all" ? "bg-gov-navy text-white" : "bg-white text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    All (18)
                  </button>
                  {Object.values(ROLE_GROUPS).map((rg) => (
                    <button
                      key={rg.id}
                      onClick={() => setSelectedRoleGroupFilter(rg.id)}
                      className={`px-2 py-0.5 rounded text-[10px] font-medium transition-colors ${
                        selectedRoleGroupFilter === rg.id ? "bg-gov-navy text-white" : "bg-white text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      {rg.name.replace("Authority", "").replace("Group", "")}
                    </button>
                  ))}
                </div>

                {/* Designation List */}
                <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                  {DEMO_USERS.filter((u) =>
                    selectedRoleGroupFilter === "all" ? true : u.roleId === selectedRoleGroupFilter
                  ).map((u) => {
                    const isCurrent = u.id === currentUser.id || u.designationId === currentUser.designationId;
                    return (
                      <button
                        key={u.id}
                        onClick={() => {
                          loginUser(u);
                          setShowRoleDropdown(false);
                        }}
                        className={`w-full text-left px-3 py-2 flex items-start justify-between hover:bg-slate-50 transition-colors ${
                          isCurrent ? "bg-amber-50 font-bold border-l-4 border-gov-navy" : ""
                        }`}
                      >
                        <div className="pr-2">
                          <div className="text-slate-900 font-semibold flex items-center gap-1.5">
                            <span className="text-[11px]">{u.designation || u.role}</span>
                          </div>
                          <div className="text-[10px] text-slate-500 mt-0.5">
                            <span className="text-gov-navy font-medium">{u.name}</span> • {u.role} ({u.state})
                          </div>
                        </div>
                        {isCurrent && <Check className="w-4 h-4 text-gov-navy shrink-0 mt-1" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Notification Bell */}
          <button
            onClick={() => navigateTo("notifications")}
            className="relative p-1.5 rounded hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
            title="Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-0.5 right-0.5 bg-rose-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {/* User Profile Avatar */}
          <div className="flex items-center gap-2 bg-gov-navy-dark px-2.5 py-1 rounded border border-white/10">
            <div className="w-6 h-6 rounded-full bg-gov-accent text-gov-navy font-bold text-xs flex items-center justify-center shadow-xs">
              {currentUser.avatarInitial || currentUser.name.charAt(0) || "G"}
            </div>
            <div className="hidden md:block text-left">
              <div className="text-xs font-semibold text-white leading-tight truncate max-w-[120px]">
                {currentUser.name}
              </div>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={logoutUser}
            className="p-1.5 rounded hover:bg-rose-950/60 text-slate-300 hover:text-rose-400 border border-white/10 hover:border-rose-700/50 transition-colors flex items-center gap-1 text-xs"
            title="Secure Logout"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};
