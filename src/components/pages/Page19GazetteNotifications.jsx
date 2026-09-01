import React, { useState } from "react";
import { useApp } from "../../context/AppContext.jsx";
import { GovEmblem } from "../common/GovEmblem.jsx";
import { StatusBadge } from "../common/StatusBadge.jsx";
import {
  Bell,
  FileText,
  Eye,
  Download,
  Plus,
  CheckCircle,
  X,
  Printer,
  Send,
  Radio,
  Share2,
  Globe,
  RadioTower,
  Smartphone,
  Newspaper
} from "lucide-react";

export const Page19GazetteNotifications = () => {
  const { gazetteNotifications, createGazetteNotification, currentProject, currentUser } = useApp();
  const [selectedGazette, setSelectedGazette] = useState(gazetteNotifications[0]);
  const [feedback, setFeedback] = useState("");
  const [notificationType, setNotificationType] = useState("Section 11(1) Preliminary Notification");
  const [publishChannels, setPublishChannels] = useState({
    gazette: true,
    newspaper: true,
    sms: true,
    publicPortal: true
  });

  const [form, setForm] = useState({
    projectName: currentProject.name || "Western Dedicated Freight Corridor",
    district: currentProject.district || currentUser?.district || "Ahmedabad",
    village: "Rampura, Bandhani, Sunav, Agas",
    surveyNumbers: "142/A, 142/B, 88, 105/A, 144/B",
    totalLandArea: `${currentProject.landRequired || 34.8} Acres`,
    purposeOfAcquisition: "Construction of Dedicated Rail-Freight Track & Multimodal Corridor for Public Infrastructure",
    notificationDate: new Date().toISOString().substring(0, 10),
    gazetteNumber: `GJ-EXTRA-2026-${Math.floor(100 + Math.random() * 900)}`
  });

  const handlePublish = (e) => {
    e.preventDefault();
    const created = createGazetteNotification({
      projectId: currentProject.id,
      projectName: form.projectName,
      state: currentProject.state || "Gujarat",
      district: form.district,
      notificationType: notificationType,
      gazetteNumber: form.gazetteNumber,
      dateOfIssue: form.notificationDate,
      status: "Published",
      proclamationSummary: `${notificationType} published for ${form.totalLandArea} in Villages (${form.village}). Channels: Gazette, Vernacular Newspapers, SMS alerts, & State Portal.`
    });
    setFeedback(`Notification ID: ${created.id || "NOTIF-SEC11-2026-482"} successfully published on ${form.notificationDate}. Status: Published in Gazette & Public Portals.`);
    setSelectedGazette(created);
    setTimeout(() => {
      setFeedback("");
    }, 3500);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div>
          <div className="text-xs text-slate-500 font-medium">
            District Authority • Statutory Proclamations & Notifications (RFCTLARR Section 11 & 19)
          </div>
          <h1 className="text-xl font-bold text-slate-900 leading-tight flex items-center gap-2">
            <Bell className="w-5 h-5 text-[#1B365D]" />
            Section 11 & Section 19 Gazette Notifications
          </h1>
        </div>
      </div>

      {feedback && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs rounded font-semibold flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-700 shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Grid: Notification Form (Left 6 Cols) & Government Gazette Paper Preview (Right 6 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Notification Drafter & Publish Channels (Left 6 Cols) */}
        <div className="lg:col-span-6 bg-white border border-slate-300 rounded p-5 shadow-xs space-y-4 text-xs">
          <div className="border-b pb-2 flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900">
              Statutory Notification Drafter & Publisher
            </h2>
            <span className="text-[11px] text-slate-500 font-mono">Form 4 / 7 RFCTLARR</span>
          </div>

          <form onSubmit={handlePublish} className="space-y-3.5">
            {/* Notification Type Selector */}
            <div>
              <label className="block font-bold text-slate-800 mb-1.5">Select Notification Type:</label>
              <div className="grid grid-cols-2 gap-2">
                <label
                  className={`p-2.5 rounded border cursor-pointer flex items-center gap-2 font-medium ${
                    notificationType === "Section 11(1) Preliminary Notification"
                      ? "border-[#1B365D] bg-blue-50/70 text-[#1B365D] ring-1 ring-[#1B365D]"
                      : "border-slate-300 bg-slate-50 text-slate-700 hover:bg-white"
                  }`}
                >
                  <input
                    type="radio"
                    name="notifType"
                    checked={notificationType === "Section 11(1) Preliminary Notification"}
                    onChange={() => setNotificationType("Section 11(1) Preliminary Notification")}
                    className="text-[#1B365D]"
                  />
                  <span>Section 11(1) Preliminary</span>
                </label>

                <label
                  className={`p-2.5 rounded border cursor-pointer flex items-center gap-2 font-medium ${
                    notificationType === "Section 19(1) Declaration"
                      ? "border-[#1B365D] bg-blue-50/70 text-[#1B365D] ring-1 ring-[#1B365D]"
                      : "border-slate-300 bg-slate-50 text-slate-700 hover:bg-white"
                  }`}
                >
                  <input
                    type="radio"
                    name="notifType"
                    checked={notificationType === "Section 19(1) Declaration"}
                    onChange={() => setNotificationType("Section 19(1) Declaration")}
                    className="text-[#1B365D]"
                  />
                  <span>Section 19(1) Declaration</span>
                </label>
              </div>
            </div>

            {/* Auto-filled Information Fields */}
            <div className="bg-slate-50 border border-slate-200 rounded p-3 space-y-2.5">
              <div className="font-bold text-slate-800 border-b pb-1 text-[11px] uppercase tracking-wider">
                Auto-filled Project & Land Parameters
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] text-slate-500 font-semibold">Project Name</label>
                  <input
                    type="text"
                    value={form.projectName}
                    onChange={(e) => setForm({ ...form, projectName: e.target.value })}
                    className="w-full p-1.5 border border-slate-300 rounded bg-white font-medium"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-slate-500 font-semibold">District</label>
                  <input
                    type="text"
                    value={form.district}
                    onChange={(e) => setForm({ ...form, district: e.target.value })}
                    className="w-full p-1.5 border border-slate-300 rounded bg-white font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] text-slate-500 font-semibold">Revenue Villages</label>
                  <input
                    type="text"
                    value={form.village}
                    onChange={(e) => setForm({ ...form, village: e.target.value })}
                    className="w-full p-1.5 border border-slate-300 rounded bg-white font-medium"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-slate-500 font-semibold">Total Land Area</label>
                  <input
                    type="text"
                    value={form.totalLandArea}
                    onChange={(e) => setForm({ ...form, totalLandArea: e.target.value })}
                    className="w-full p-1.5 border border-slate-300 rounded bg-white font-medium font-bold text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] text-slate-500 font-semibold">Notified Survey Numbers</label>
                <input
                  type="text"
                  value={form.surveyNumbers}
                  onChange={(e) => setForm({ ...form, surveyNumbers: e.target.value })}
                  className="w-full p-1.5 border border-slate-300 rounded bg-white font-mono"
                />
              </div>

              <div>
                <label className="block text-[10px] text-slate-500 font-semibold">Purpose of Acquisition</label>
                <textarea
                  rows={2}
                  value={form.purposeOfAcquisition}
                  onChange={(e) => setForm({ ...form, purposeOfAcquisition: e.target.value })}
                  className="w-full p-1.5 border border-slate-300 rounded bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] text-slate-500 font-semibold">Notification Date</label>
                  <input
                    type="date"
                    value={form.notificationDate}
                    onChange={(e) => setForm({ ...form, notificationDate: e.target.value })}
                    className="w-full p-1.5 border border-slate-300 rounded bg-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-500 font-semibold">Gazette Number</label>
                  <input
                    type="text"
                    value={form.gazetteNumber}
                    onChange={(e) => setForm({ ...form, gazetteNumber: e.target.value })}
                    className="w-full p-1.5 border border-slate-300 rounded bg-white font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Publish Channels Section */}
            <div>
              <label className="block font-bold text-slate-800 mb-1.5">
                Statutory Publication & Dispatch Channels:
              </label>
              <div className="grid grid-cols-2 gap-2">
                <label className="flex items-center gap-2 p-2 border border-slate-200 rounded bg-slate-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={publishChannels.gazette}
                    onChange={(e) => setPublishChannels({ ...publishChannels, gazette: e.target.checked })}
                    className="rounded text-[#1B365D]"
                  />
                  <FileText className="w-3.5 h-3.5 text-slate-600" />
                  <span className="font-medium text-slate-800">State Official Gazette</span>
                </label>

                <label className="flex items-center gap-2 p-2 border border-slate-200 rounded bg-slate-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={publishChannels.newspaper}
                    onChange={(e) => setPublishChannels({ ...publishChannels, newspaper: e.target.checked })}
                    className="rounded text-[#1B365D]"
                  />
                  <Newspaper className="w-3.5 h-3.5 text-slate-600" />
                  <span className="font-medium text-slate-800">2 Daily Newspapers</span>
                </label>

                <label className="flex items-center gap-2 p-2 border border-slate-200 rounded bg-slate-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={publishChannels.sms}
                    onChange={(e) => setPublishChannels({ ...publishChannels, sms: e.target.checked })}
                    className="rounded text-[#1B365D]"
                  />
                  <Smartphone className="w-3.5 h-3.5 text-slate-600" />
                  <span className="font-medium text-slate-800">Khatedar SMS Alerts</span>
                </label>

                <label className="flex items-center gap-2 p-2 border border-slate-200 rounded bg-slate-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={publishChannels.publicPortal}
                    onChange={(e) => setPublishChannels({ ...publishChannels, publicPortal: e.target.checked })}
                    className="rounded text-[#1B365D]"
                  />
                  <Globe className="w-3.5 h-3.5 text-slate-600" />
                  <span className="font-medium text-slate-800">Public Portal (e-Land)</span>
                </label>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-2 border-t">
              <button
                type="button"
                onClick={() => {
                  setFeedback("Draft notification saved successfully.");
                  setTimeout(() => setFeedback(""), 2000);
                }}
                className="flex-1 py-2 border border-slate-300 hover:bg-slate-50 rounded font-semibold text-slate-700"
              >
                Save Draft
              </button>
              <button
                type="button"
                onClick={() => {
                  setFeedback("Official PDF preview ready in inspection viewer.");
                  setTimeout(() => setFeedback(""), 2000);
                }}
                className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded font-semibold text-slate-800"
              >
                Preview Notification
              </button>
              <button
                type="submit"
                className="flex-1 py-2 bg-[#1B365D] hover:bg-[#12243f] text-white rounded font-bold transition-colors shadow-2xs"
              >
                Publish Notification
              </button>
            </div>
          </form>
        </div>

        {/* Gazette Official Paper Preview (Right 6 Cols) */}
        <div className="lg:col-span-6 bg-white border border-slate-400 rounded p-6 shadow-md space-y-4 text-xs font-serif leading-relaxed">
          {/* Official Gazette Header */}
          <div className="text-center border-b-2 border-slate-900 pb-3 space-y-1">
            <GovEmblem className="w-10 h-12 mx-auto" color="text-slate-900" />
            <div className="font-bold text-xs uppercase tracking-widest text-slate-900 font-serif">
              THE GUJARAT GOVERNMENT GAZETTE
            </div>
            <div className="text-[10px] uppercase text-slate-600 font-sans">
              EXTRAORDINARY • PUBLISHED BY AUTHORITY
            </div>
            <div className="text-[10px] font-mono text-slate-800 font-sans">
              GAZETTE NO: {form.gazetteNumber} • DATE: {form.notificationDate}
            </div>
          </div>

          {/* Notification Body */}
          <div className="space-y-3 text-slate-900 text-justify text-[11px]">
            <div className="font-bold text-center uppercase tracking-wide text-xs">
              REVENUE DEPARTMENT • NOTIFICATION
            </div>
            <div className="text-center font-sans text-[10px] text-slate-700 font-semibold">
              {notificationType.toUpperCase()}
            </div>
            <div className="text-center font-sans text-[10px] text-slate-500">
              [Under the Right to Fair Compensation and Transparency in Land Acquisition, Rehabilitation and Resettlement Act, 2013]
            </div>

            <p className="pt-2">
              <strong>No. REV/LAQ/{form.district.toUpperCase()}/2026—</strong> Whereas it appears to the Appropriate Government / Collector, District <strong>{form.district}</strong>, that land admeasuring approximately <strong>{form.totalLandArea}</strong> is required for a public purpose, namely for <strong>{form.projectName}</strong> ({form.purposeOfAcquisition}).
            </p>

            <div className="p-3 bg-slate-50 border border-slate-300 rounded font-sans text-xs space-y-1">
              <div>• <strong>District:</strong> {form.district} • <strong>Villages:</strong> {form.village}</div>
              <div>• <strong>Notified Survey Numbers:</strong> <span className="font-mono">{form.surveyNumbers}</span></div>
              <div>• <strong>Total Acquired Quantum:</strong> {form.totalLandArea}</div>
              <div>• <strong>Land Administrator:</strong> District Collector & Competent Land Acquisition Authority</div>
            </div>

            <p>
              Now, therefore, in exercise of powers conferred by Section 11(1) / Section 19(1) of the Act, it is hereby notified that all persons interested in the aforesaid land are entitled to submit their claims or objections within sixty (60) days to the Office of the District Collector.
            </p>

            <p className="italic text-[10px] text-slate-600">
              No person shall make any transaction or cause any encumbrances on the land specified in this notification without prior approval of the Collector.
            </p>
          </div>

          {/* Signature Block */}
          <div className="pt-4 border-t border-slate-300 flex items-center justify-between font-sans text-xs">
            <div>
              <div className="font-bold text-slate-900">Collector & District Magistrate</div>
              <div className="text-slate-500 text-[10px]">District {form.district} • State of Gujarat</div>
            </div>
            <div className="text-right">
              <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 px-2 py-0.5 rounded text-[10px] font-bold">
                ✓ Published
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
