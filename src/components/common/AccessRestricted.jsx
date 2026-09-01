import React from "react";
import { useApp } from "../../context/AppContext.jsx";
import { ShieldAlert, ArrowLeft, Lock } from "lucide-react";
import { GovEmblem } from "./GovEmblem.jsx";

export const AccessRestricted = ({ requiredRole = "Authorized Officer" }) => {
  const { currentUser, navigateTo } = useApp();

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <div className="bg-white border-2 border-rose-300 rounded max-w-lg w-full p-8 text-center shadow-lg space-y-4">
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-full bg-rose-100 border border-rose-300 flex items-center justify-center text-rose-700">
            <ShieldAlert className="w-9 h-9" />
          </div>
        </div>

        <div className="space-y-1">
          <div className="text-xs font-bold uppercase tracking-wider text-rose-700">
            Security Authorization Notice
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            Access Restricted
          </h2>
        </div>

        <p className="text-sm text-slate-600 leading-relaxed">
          You do not have permission to access this module. Your current role{" "}
          <strong className="text-slate-900">
            ({currentUser ? `${currentUser.role} - ${currentUser.designation || ""}` : "Public User"})
          </strong>{" "}
          does not possess required clearance for this administrative workspace.
        </p>

        <div className="bg-slate-50 border border-slate-200 p-3 rounded text-xs text-left space-y-1 text-slate-600">
          <div>• Required Role Group: <span className="font-semibold text-slate-800">{requiredRole}</span></div>
          <div>• IP / Access Attempt: <span className="font-mono text-slate-800">10.45.18.92 (Logged)</span></div>
          <div>• Statutory Authority: <span className="font-semibold text-slate-800">RFCTLARR Access Control Matrix</span></div>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => {
              if (currentUser) {
                navigateTo(currentUser.defaultPage || "central-dashboard");
              } else {
                navigateTo("landing");
              }
            }}
            className="w-full sm:w-auto px-5 py-2 bg-[#1e3a8a] hover:bg-[#172554] text-white font-semibold rounded text-xs flex items-center justify-center gap-2 shadow-xs transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Go to My Dashboard
          </button>
          {!currentUser && (
            <button
              onClick={() => navigateTo("login")}
              className="w-full sm:w-auto px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded text-xs flex items-center justify-center gap-2 shadow-xs transition-colors"
            >
              <Lock className="w-4 h-4" />
              Officer / Citizen Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
