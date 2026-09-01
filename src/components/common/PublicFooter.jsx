import React from "react";
import { GovEmblem } from "./GovEmblem.jsx";
import { Phone, Shield, HelpCircle, FileText, Info } from "lucide-react";

export const PublicFooter = () => {
  return (
    <footer className="bg-[#0f172a] text-slate-300 border-t-4 border-amber-600 pt-10 pb-6 text-xs mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Top footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-slate-800">
          {/* Col 1: Portal Details */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <GovEmblem className="w-10 h-12" color="text-amber-400" />
              <div>
                <div className="font-bold text-sm text-white">National Land Acquisition</div>
                <div className="text-[11px] text-amber-400 font-medium">Management System</div>
              </div>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Unified digital platform engineered under the Right to Fair Compensation and Transparency in Land Acquisition, Rehabilitation and Resettlement Act (RFCTLARR), 2013.
            </p>
          </div>

          {/* Col 2: Useful Links */}
          <div>
            <h4 className="font-bold text-white uppercase text-[11px] tracking-wider mb-3 text-amber-400">
              Government Portals
            </h4>
            <ul className="space-y-2 text-[11px]">
              <li><a href="#" className="hover:text-amber-300 transition-colors">Department of Land Resources (DoLR)</a></li>
              <li><a href="#" className="hover:text-amber-300 transition-colors">Ministry of Rural Development</a></li>
              <li><a href="#" className="hover:text-amber-300 transition-colors">National Portal of India (india.gov.in)</a></li>
              <li><a href="#" className="hover:text-amber-300 transition-colors">Digital India Land Records Modernization (DILRMP)</a></li>
              <li><a href="#" className="hover:text-amber-300 transition-colors">Public Financial Management System (PFMS)</a></li>
            </ul>
          </div>

          {/* Col 3: Acts & Policies */}
          <div>
            <h4 className="font-bold text-white uppercase text-[11px] tracking-wider mb-3 text-amber-400">
              Acts & Legal Framework
            </h4>
            <ul className="space-y-2 text-[11px]">
              <li><a href="#" className="hover:text-amber-300 transition-colors">RFCTLARR Act 2013 (Gazette Copy)</a></li>
              <li><a href="#" className="hover:text-amber-300 transition-colors">National Rehabilitation & Resettlement Policy</a></li>
              <li><a href="#" className="hover:text-amber-300 transition-colors">Social Impact Assessment (SIA) Guidelines</a></li>
              <li><a href="#" className="hover:text-amber-300 transition-colors">Right to Information (RTI) Disclosures</a></li>
              <li><a href="#" className="hover:text-amber-300 transition-colors">Standard Operating Procedures for Collectors</a></li>
            </ul>
          </div>

          {/* Col 4: National Helpdesk */}
          <div className="bg-slate-900/90 p-4 rounded border border-slate-800 space-y-2.5">
            <h4 className="font-bold text-white text-xs flex items-center gap-1.5 text-amber-400">
              <Phone className="w-4 h-4" />
              National Land Helpdesk
            </h4>
            <div className="text-base font-bold text-white font-mono">
              1800-11-8920 (Toll Free)
            </div>
            <div className="text-[11px] text-slate-400">
              Hours: 09:30 AM to 06:00 PM (Monday - Saturday)
            </div>
            <div className="text-[11px] text-slate-300 pt-1 border-t border-slate-800">
              Email: <span className="text-amber-300 font-mono">helpdesk-nlams@gov.in</span>
            </div>
          </div>
        </div>

        {/* Bottom copyright & disclaimer */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-[11px] text-slate-400">
          <div>
            © 2026 Department of Land Resources, Ministry of Rural Development, Government of India. All Rights Reserved.
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-slate-200">Website Policies</a>
            <span>•</span>
            <a href="#" className="hover:text-slate-200">Terms of Use</a>
            <span>•</span>
            <a href="#" className="hover:text-slate-200">Help & Support</a>
            <span>•</span>
            <a href="#" className="hover:text-slate-200">Feedback</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
