import React, { useState } from "react";
import { useApp } from "../../context/AppContext.jsx";
import {
  AlertCircle,
  CheckCircle,
  FileText,
  Upload,
  Send,
  Download,
  Printer,
  ShieldCheck
} from "lucide-react";

export const Page26OnlineGrievance = () => {
  const { registerCitizenGrievance, currentProject, navigateTo } = useApp();

  const [form, setForm] = useState({
    objectorName: "",
    aadhaarLast4: "",
    mobile: "",
    village: "Sunav",
    surveyNumber: "142/A",
    objectionType: "Valuation & Tree Enumeration Dispute",
    details: ""
  });

  const [submittedReceipt, setSubmittedReceipt] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const created = registerCitizenGrievance({
      projectId: currentProject.id,
      objectorName: form.objectorName || "Patel Arvindbhai D.",
      surveyNumber: form.surveyNumber,
      village: form.village,
      objectionType: form.objectionType,
      details: form.details || "Requesting re-assessment of 24 fruit-bearing mango trees omitted in preliminary survey."
    });
    setSubmittedReceipt(created);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Title */}
      <div className="border-b border-slate-200 pb-3">
        <div className="text-xs text-slate-500 font-medium">
          Citizen Rights & Redressal • RFCTLARR Section 15 Statutory Objection
        </div>
        <h1 className="text-xl font-bold text-slate-900 leading-tight flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-amber-600" />
          File Online Objection or Grievance to District Collector
        </h1>
      </div>

      {submittedReceipt ? (
        <div className="bg-white border-2 border-emerald-600 rounded p-6 shadow-md space-y-5 text-xs">
          <div className="flex items-center gap-3 border-b pb-4">
            <CheckCircle className="w-8 h-8 text-emerald-600 shrink-0" />
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Objection Form Successfully Registered & Dispatched to Collector
              </h2>
              <div className="text-slate-600">
                Official Acknowledgement Receipt No: <strong className="text-[#1e3a8a] font-mono">{submittedReceipt.id}</strong>
              </div>
            </div>
          </div>

          <div className="p-4 bg-slate-50 border rounded space-y-2">
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div><strong>Objector Name:</strong> {submittedReceipt.objectorName}</div>
              <div><strong>Survey Number:</strong> {submittedReceipt.surveyNumber} ({submittedReceipt.village})</div>
              <div><strong>Filing Date:</strong> {submittedReceipt.filingDate}</div>
              <div><strong>Objection Category:</strong> {submittedReceipt.objectionType}</div>
            </div>
            <div className="border-t pt-2 text-slate-700">
              <strong>Grounds of Objection:</strong> {submittedReceipt.details}
            </div>
          </div>

          <div className="p-3 bg-amber-50 border border-amber-300 rounded text-amber-950 space-y-1">
            <div className="font-bold">Next Statutory Hearing Notice:</div>
            <p>
              Under RFCTLARR Section 15(2), the District Collector will afford you an opportunity of being heard in person. A formal SMS summons will be dispatched to your mobile.
            </p>
          </div>

          <div className="flex items-center justify-between pt-2 border-t">
            <button
              onClick={() => {
                setSubmittedReceipt(null);
                setForm({ objectorName: "", aadhaarLast4: "", mobile: "", village: "Sunav", surveyNumber: "142/A", objectionType: "Valuation & Tree Enumeration Dispute", details: "" });
              }}
              className="text-slate-600 hover:text-slate-900 font-semibold"
            >
              ← File Another Objection
            </button>
            <div className="flex gap-2">
              <button
                onClick={() => window.print()}
                className="bg-[#1e3a8a] hover:bg-[#172554] text-white px-3.5 py-1.5 rounded font-semibold flex items-center gap-1 cursor-pointer transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Receipt</span>
              </button>
              <button
                onClick={() => navigateTo("citizen-search")}
                className="bg-slate-800 text-white px-3.5 py-1.5 rounded font-semibold"
              >
                Return to Search
              </button>
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white border border-slate-300 rounded p-6 shadow-xs space-y-4 text-xs">
          <div className="border-b pb-2">
            <h2 className="font-bold text-sm text-slate-900">
              Citizen / Landowner Details
            </h2>
            <div className="text-[11px] text-slate-500">
              Project: {currentProject.name} (District Anand)
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold text-slate-800 mb-1">
                Full Name of Landowner <span className="text-rose-600">*</span>
              </label>
              <input
                type="text"
                required
                value={form.objectorName}
                onChange={(e) => setForm({ ...form, objectorName: e.target.value })}
                placeholder="e.g. Ramesh V. Patel"
                className="w-full p-2 border border-slate-300 rounded text-slate-900"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-800 mb-1">
                Aadhaar (Last 4 Digits)
              </label>
              <input
                type="text"
                maxLength={4}
                value={form.aadhaarLast4}
                onChange={(e) => setForm({ ...form, aadhaarLast4: e.target.value })}
                placeholder="XXXX"
                className="w-full p-2 border border-slate-300 rounded text-slate-900 font-mono"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-800 mb-1">
                Mobile Number for SMS Notices <span className="text-rose-600">*</span>
              </label>
              <input
                type="tel"
                required
                value={form.mobile}
                onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                placeholder="98250 XXXXX"
                className="w-full p-2 border border-slate-300 rounded text-slate-900"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold text-slate-800 mb-1">Revenue Village</label>
              <select
                value={form.village}
                onChange={(e) => setForm({ ...form, village: e.target.value })}
                className="w-full p-2 border border-slate-300 rounded bg-white text-slate-900"
              >
                <option value="Sunav">Sunav</option>
                <option value="Bandhani">Bandhani</option>
                <option value="Agas">Agas</option>
                <option value="Petlad">Petlad</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-800 mb-1">
                Revenue Survey / Block No <span className="text-rose-600">*</span>
              </label>
              <input
                type="text"
                required
                value={form.surveyNumber}
                onChange={(e) => setForm({ ...form, surveyNumber: e.target.value })}
                placeholder="e.g. 142/A"
                className="w-full p-2 border border-slate-300 rounded text-slate-900 font-mono font-bold"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-800 mb-1">Objection Category</label>
              <select
                value={form.objectionType}
                onChange={(e) => setForm({ ...form, objectionType: e.target.value })}
                className="w-full p-2 border border-slate-300 rounded bg-white text-slate-900"
              >
                <option value="Valuation & Tree Enumeration Dispute">Valuation & Tree Enumeration Dispute</option>
                <option value="Boundary Demarcation Inaccuracy">Boundary Demarcation Inaccuracy</option>
                <option value="Title Ownership & Revenue Record Dispute">Title Ownership & Revenue Record Dispute</option>
                <option value="R&R Second Schedule Entitlement Claim">R&R Second Schedule Entitlement Claim</option>
                <option value="Other Statutory Grievance">Other Statutory Grievance</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-800 mb-1">
              Detailed Grounds of Objection under RFCTLARR Section 15(1) <span className="text-rose-600">*</span>
            </label>
            <textarea
              rows={4}
              required
              value={form.details}
              onChange={(e) => setForm({ ...form, details: e.target.value })}
              placeholder="State the factual reasons (e.g. number of horticulture trees, borewell valuation, residential structures omitted in Section 11 notice)..."
              className="w-full p-2.5 border border-slate-300 rounded text-slate-900"
            />
          </div>

          <div className="p-3 border border-dashed border-slate-300 rounded bg-slate-50 text-center space-y-1">
            <Upload className="w-5 h-5 text-[#1e3a8a] mx-auto" />
            <div className="font-semibold text-slate-800">Attach Supporting Evidence (7/12 RoR, Sale Deeds, Photographs)</div>
            <div className="text-[11px] text-slate-500">PDF, JPG up to 10MB</div>
          </div>

          <div className="flex justify-end pt-3 border-t">
            <button
              type="submit"
              className="bg-[#1e3a8a] hover:bg-blue-900 text-white px-6 py-2.5 rounded font-bold flex items-center gap-2 shadow-sm"
            >
              <Send className="w-4 h-4" />
              <span>Submit Statutory Objection to District Collector</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
