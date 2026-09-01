import React from "react";
import { useApp } from "../../context/AppContext.jsx";
import { GovEmblem } from "./GovEmblem.jsx";
import { MapPin, Search, UserCheck, Bell, Lock, Compass, ShieldCheck, Sparkles } from "lucide-react";

export const PublicHeader = () => {
  const { activePage, navigateTo, currentUser } = useApp();

  return (
    <header className="bg-gradient-to-r from-[#0b1b33] via-[#152e54] to-[#0c1f3b] text-white border-b-2 border-[#C5A059] shadow-lg sticky top-0 z-[100] backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-2.5 flex flex-col md:flex-row items-center justify-between gap-3.5">
        {/* Emblem & Portal Identity */}
        <div
          onClick={() => navigateTo("landing")}
          className="flex items-center gap-3.5 cursor-pointer select-none group"
        >
          <div className="w-11 h-11 bg-white/95 rounded-full flex items-center justify-center text-[#1B365D] border-2 border-[#C5A059] shadow-md shrink-0 group-hover:scale-105 transition-transform">
            <GovEmblem className="w-7 h-8" color="text-[#1B365D]" />
          </div>
          <div className="border-l border-white/20 pl-3.5">
            <div className="text-[10px] font-bold uppercase tracking-wider text-[#C5A059] flex items-center gap-1.5">
              <span>Government of India</span>
              <span className="text-white/40">•</span>
              <span>Ministry of Rural Development</span>
            </div>
            <h1 className="text-sm sm:text-base md:text-lg font-bold text-white uppercase tracking-wide leading-tight group-hover:text-amber-100 transition-colors">
              National Land Acquisition Management System
            </h1>
            <div className="text-[11px] text-slate-300 font-normal">
              Official Government Portal (NLAMS)
            </div>
          </div>
        </div>

        {/* Public Navigation Links */}
        <nav className="flex items-center flex-wrap gap-1.5 sm:gap-2 text-xs font-semibold text-slate-200">
          <button
            onClick={() => navigateTo("landing")}
            className={`px-3.5 py-1.5 rounded-md border transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
              activePage === "landing"
                ? "bg-[#C5A059] text-white border-[#d8b56d] shadow-sm font-bold"
                : "bg-white/5 hover:bg-white/15 text-slate-200 border-white/10 hover:border-white/25 hover:text-white"
            }`}
          >
            <span>Home</span>
          </button>

          <button
            onClick={() => navigateTo("public-gis-map")}
            className={`px-3.5 py-1.5 rounded-md border transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
              activePage === "public-gis-map"
                ? "bg-[#C5A059] text-white border-[#d8b56d] shadow-sm font-bold"
                : "bg-white/5 hover:bg-white/15 text-slate-200 border-white/10 hover:border-white/25 hover:text-white"
            }`}
          >
            <Compass className={`w-3.5 h-3.5 ${activePage === "public-gis-map" ? "text-white" : "text-[#C5A059]"}`} />
            <span>Public GIS Map</span>
          </button>

          <button
            onClick={() => navigateTo("public-project-search")}
            className={`px-3.5 py-1.5 rounded-md border transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
              activePage === "public-project-search"
                ? "bg-[#C5A059] text-white border-[#d8b56d] shadow-sm font-bold"
                : "bg-white/5 hover:bg-white/15 text-slate-200 border-white/10 hover:border-white/25 hover:text-white"
            }`}
          >
            <Search className="w-3.5 h-3.5 text-slate-300" />
            <span>Project Search</span>
          </button>

          <button
            onClick={() => {
              if (currentUser?.role === "Citizen") {
                navigateTo("citizen-my-land");
              } else {
                navigateTo("login");
              }
            }}
            className={`px-3.5 py-1.5 rounded-md border transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
              activePage === "citizen-my-land" || activePage === "track-my-land"
                ? "bg-[#C5A059] text-white border-[#d8b56d] shadow-sm font-bold"
                : "bg-white/5 hover:bg-white/15 text-slate-200 border-white/10 hover:border-white/25 hover:text-white"
            }`}
          >
            <MapPin className={`w-3.5 h-3.5 ${activePage === "citizen-my-land" ? "text-white" : "text-[#C5A059]"}`} />
            <span>Track My Land</span>
          </button>

          <button
            onClick={() => navigateTo("notifications")}
            className={`px-3.5 py-1.5 rounded-md border transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
              activePage === "notifications"
                ? "bg-[#C5A059] text-white border-[#d8b56d] shadow-sm font-bold"
                : "bg-white/5 hover:bg-white/15 text-slate-200 border-white/10 hover:border-white/25 hover:text-white"
            }`}
            title="Gazette & System Notifications"
          >
            <Bell className="w-3.5 h-3.5 text-slate-300" />
            <span>Notifications</span>
          </button>

          {/* Login or Dashboard Button with stylish prominent gold styling */}
          {currentUser ? (
            <button
              onClick={() => navigateTo(currentUser.defaultPage || "central-dashboard")}
              className="ml-2 bg-gradient-to-r from-[#C5A059] via-[#d4b068] to-[#b08d48] hover:from-[#d4b068] hover:to-[#9e7c3b] text-slate-950 font-bold px-4 py-1.5 rounded-md text-xs flex items-center gap-1.5 shadow-md hover:shadow-lg border border-[#f5e3ba]/60 transition-all transform active:scale-95 cursor-pointer"
            >
              <UserCheck className="w-3.5 h-3.5 text-slate-950" />
              <span>{currentUser.role} Dashboard</span>
            </button>
          ) : (
            <button
              onClick={() => navigateTo("login")}
              className="ml-2 bg-gradient-to-r from-[#C5A059] via-[#d8b46e] to-[#b8954d] hover:from-[#d8b46e] hover:to-[#a4823d] text-slate-950 font-bold px-4 py-1.5 rounded-md text-xs flex items-center gap-1.5 shadow-md hover:shadow-lg border border-[#fae8c6]/70 transition-all transform active:scale-95 cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5 text-slate-950" />
              <span>Secure Login</span>
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};

