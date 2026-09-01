import React from "react";
import { useApp } from "../../context/AppContext.jsx";
import { Globe, Type, ExternalLink } from "lucide-react";

export const PublicTopUtilityBar = () => {
  const { fontSize, setFontSize, language, setLanguage, currentUser, logoutUser, navigateTo } = useApp();

  return (
    <div className="bg-[#1e293b] text-slate-200 text-xs py-1.5 px-4 sm:px-8 border-b border-slate-700">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        {/* Left side: India title & skip links */}
        <div className="flex items-center gap-3">
          <span className="font-semibold text-amber-400">
            {language === "hi" ? "भारत सरकार" : "भारत सरकार"} | Government of India
          </span>
          <span className="text-slate-500 hidden sm:inline">|</span>
          <a
            href="#main-content"
            className="text-slate-300 hover:text-white underline underline-offset-2 hidden md:inline"
          >
            Skip to Main Content
          </a>
        </div>

        {/* Right side: Accessibility & Controls */}
        <div className="flex items-center gap-3 flex-wrap">
          {/* Font Resizing */}
          <div className="flex items-center gap-1 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
            <Type className="w-3.5 h-3.5 text-slate-400" />
            <button
              onClick={() => setFontSize("normal")}
              className={`px-1 hover:text-white ${fontSize === "normal" ? "font-bold text-amber-400" : "text-slate-300"}`}
              title="Standard Font Size"
            >
              A
            </button>
            <button
              onClick={() => setFontSize("large")}
              className={`px-1 hover:text-white ${fontSize === "large" ? "font-bold text-amber-400" : "text-slate-300"}`}
              title="Large Font Size"
            >
              A+
            </button>
            <button
              onClick={() => setFontSize("xlarge")}
              className={`px-1 hover:text-white ${fontSize === "xlarge" ? "font-bold text-amber-400" : "text-slate-300"}`}
              title="Extra Large Font Size"
            >
              A++
            </button>
          </div>

          {/* Language Toggle */}
          <button
            onClick={() => setLanguage(language === "en" ? "hi" : "en")}
            className="flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-slate-200 px-2 py-0.5 rounded border border-slate-700 transition-colors"
          >
            <Globe className="w-3.5 h-3.5 text-amber-400" />
            <span>{language === "en" ? "हिन्दी" : "English"}</span>
          </button>

          {/* Logged in status indication if any */}
          {currentUser && (
            <div className="flex items-center gap-2 pl-2 border-l border-slate-700">
              <span className="text-emerald-400 font-medium hidden sm:inline">
                Logged in: {currentUser.role}
              </span>
              <button
                onClick={() => navigateTo(currentUser.defaultPage || "central-dashboard")}
                className="bg-amber-600 hover:bg-amber-700 text-white px-2 py-0.5 rounded text-xs"
              >
                Dashboard
              </button>
              <button
                onClick={logoutUser}
                className="text-slate-400 hover:text-rose-300 text-xs underline"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
