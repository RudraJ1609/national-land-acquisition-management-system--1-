import React, { useState } from "react";
import { useApp } from "../../context/AppContext.jsx";
import { StatusBadge } from "../common/StatusBadge.jsx";
import { LeafletGisMap } from "../common/LeafletGisMap.jsx";
import {
  Users,
  FileText,
  Calendar,
  CheckCircle,
  Download,
  AlertCircle,
  Video,
  ShieldCheck,
  MapPin,
  Map
} from "lucide-react";

export const Page27SocialImpactAssessment = () => {
  const { currentProject, navigateTo, parcels } = useApp();
  const [downloadMsg, setDownloadMsg] = useState("");
  const [showGisMap, setShowGisMap] = useState(true);

  const triggerDownload = (msg) => {
    setDownloadMsg(msg);
    setTimeout(() => setDownloadMsg(""), 3500);
  };

  return (
    <div className="space-y-6 pb-12">
      {downloadMsg && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 px-4 py-2 rounded text-xs font-semibold flex items-center justify-between shadow-2xs animate-fade-in">
          <span>✓ {downloadMsg}</span>
          <button onClick={() => setDownloadMsg("")} className="text-emerald-700 hover:text-emerald-950 font-bold">✕</button>
        </div>
      )}

      {/* Title */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div>
          <div className="text-xs text-slate-500 font-medium">
            Public Disclosure • RFCTLARR Section 4 to Section 9 SIA Mandate
          </div>
          <h1 className="text-xl font-bold text-slate-900 leading-tight flex items-center gap-2">
            <Users className="w-5 h-5 text-[#1e3a8a]" />
            Social Impact Assessment (SIA) & Public Hearing Records
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigateTo("sia-tasks")}
            className="bg-[#1B365D] hover:bg-[#142946] text-white px-3.5 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
          >
            <Users className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Open SIA Field Survey & Tasks</span>
          </button>
          <button
            onClick={() => triggerDownload("Downloading certified SIA Study Report Volume I-IV (PDF)...")}
            className="bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 px-3.5 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Certified SIA Report (PDF)</span>
          </button>
        </div>
      </div>

      {/* SIA Key Findings Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 text-xs">
        <div className="bg-white border border-slate-300 rounded p-4 shadow-2xs">
          <span className="text-slate-500 block uppercase text-[11px] font-semibold">Total Affected Families</span>
          <span className="text-2xl font-bold text-slate-900">142</span>
          <span className="text-[11px] text-slate-600 block mt-1">Across 4 Revenue Villages</span>
        </div>

        <div className="bg-white border border-slate-300 rounded p-4 shadow-2xs">
          <span className="text-slate-500 block uppercase text-[11px] font-semibold">Physically Displaced</span>
          <span className="text-2xl font-bold text-amber-700">18</span>
          <span className="text-[11px] text-amber-800 block mt-1">Eligible for Second Schedule Housing</span>
        </div>

        <div className="bg-white border border-slate-300 rounded p-4 shadow-2xs">
          <span className="text-slate-500 block uppercase text-[11px] font-semibold">Agricultural Livelihoods</span>
          <span className="text-2xl font-bold text-slate-900">124</span>
          <span className="text-[11px] text-slate-600 block mt-1">Compensated at 2.0x Rural Factor</span>
        </div>

        <div className="bg-white border border-slate-300 rounded p-4 shadow-2xs">
          <span className="text-slate-500 block uppercase text-[11px] font-semibold">Expert Committee Appraisal</span>
          <span className="text-2xl font-bold text-emerald-700">Approved</span>
          <span className="text-[11px] text-emerald-700 block mt-1">Section 7 Statutory Recommendation</span>
        </div>
      </div>

      {/* SIA GIS Spatial Demographic & Cadastral Buffer Map */}
      <div className="bg-white border border-slate-300 rounded-lg p-4 shadow-xs space-y-3">
        <div className="flex items-center justify-between border-b pb-2">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#C5A059] block">
              Spatial Demographic Footprint
            </span>
            <h2 className="text-sm font-bold text-[#1B365D] flex items-center gap-1.5">
              <Map className="w-4 h-4 text-[#1B365D]" />
              SIA Affected Village Cadastral Boundary & Buffer Zone
            </h2>
          </div>
          <span className="text-xs text-slate-500 font-medium">
            100m Corridor Impact Boundary • 8 Survey Plots Mapped
          </span>
        </div>

        <LeafletGisMap
          parcels={parcels}
          height="380px"
        />
      </div>

      {/* SIA Study Overview & Findings */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Study Details (Left 7 cols) */}
        <div className="lg:col-span-7 bg-white border border-slate-300 rounded p-5 shadow-xs space-y-4 text-xs leading-relaxed">
          <div className="border-b pb-2">
            <h2 className="text-sm font-bold text-slate-900">
              Executive Summary of SIA Study (Section 4)
            </h2>
            <div className="text-[11px] text-slate-500 font-mono">
              Conducted by: Gujarat Institute of Development Research (GIDR), Ahmedabad
            </div>
          </div>

          <div className="space-y-3 text-slate-700">
            <p>
              <strong>1. Public Purpose Assessment:</strong> The proposed Western Dedicated Freight Corridor provides high-speed rail connectivity to western ports, reducing national logistics costs by 32% and serving crucial national defense and commercial transportation needs.
            </p>
            <p>
              <strong>2. Minimization of Land Requirement:</strong> Alternative alignment options were appraised. The selected alignment avoids heavy residential settlements in Sunav and utilizes 20 Acres of uncultivated government revenue wasteland.
            </p>
            <p>
              <strong>3. Environmental & Social Feasibility:</strong> Social benefits significantly outweigh temporary displacement costs. No scheduled tribe (ST) sacred groves or primary drinking water sources are affected.
            </p>
          </div>

          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded text-emerald-950 space-y-1">
            <div className="font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              Independent Multi-Disciplinary Expert Group Recommendation (Sec 7)
            </div>
            <p className="text-[11px]">
              "The Expert Group hereby recommends that the project serves legitimate public purpose and land acquisition may proceed subject to full implementation of the Social Impact Management Plan (SIMP)."
            </p>
          </div>
        </div>

        {/* Public Hearing Records (Right 5 cols) */}
        <div className="lg:col-span-5 bg-white border border-slate-300 rounded p-5 shadow-xs space-y-4 text-xs">
          <div className="border-b pb-2 flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-[#1e3a8a]" />
              Public Hearing Proceedings (Section 5)
            </h2>
          </div>

          <div className="space-y-3">
            <div className="p-3 bg-slate-50 border rounded space-y-1.5">
              <div className="flex justify-between font-bold text-slate-900">
                <span>Sunav Village Gram Panchayat Hall</span>
                <span className="text-emerald-700">Completed</span>
              </div>
              <div className="text-slate-600">Date: 14-Jul-2026 • Attendees: 210 Villagers</div>
              <div className="text-[11px] text-slate-500">
                Chaired by: SLAO Vadodara & District SIA Officer. Video recorded and signed by Sarpanch.
              </div>
              <div className="pt-1 flex gap-2">
                <button
                  onClick={() => triggerDownload("Downloading Public Hearing Minutes PDF...")}
                  className="text-[#1e3a8a] font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <FileText className="w-3 h-3" /> Minutes PDF
                </button>
                <button
                  onClick={() => triggerDownload("Accessing NIC Video Recording archive...")}
                  className="text-slate-700 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Video className="w-3 h-3" /> Video Archive
                </button>
              </div>
            </div>

            <div className="p-3 bg-slate-50 border rounded space-y-1.5">
              <div className="flex justify-between font-bold text-slate-900">
                <span>Bandhani Community Center</span>
                <span className="text-emerald-700">Completed</span>
              </div>
              <div className="text-slate-600">Date: 18-Jul-2026 • Attendees: 165 Villagers</div>
              <div className="text-[11px] text-slate-500">
                All verbal and written submissions cataloged and integrated into final SIMP report.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
