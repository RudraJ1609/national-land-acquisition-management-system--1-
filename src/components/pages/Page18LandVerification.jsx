import React, { useState } from "react";
import { useApp } from "../../context/AppContext.jsx";
import { StatusBadge } from "../common/StatusBadge.jsx";
import { LeafletGisMap } from "../common/LeafletGisMap.jsx";
import {
  FileCheck,
  CheckCircle,
  AlertTriangle,
  Search,
  Filter,
  Eye,
  ShieldCheck,
  X,
  FileText,
  RefreshCw,
  HelpCircle,
  Building,
  Check,
  Download,
  Database,
  Map,
  Table
} from "lucide-react";

export const Page18LandVerification = () => {
  const { parcels, updateParcelVerification, currentUser } = useApp();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [viewMode, setViewMode] = useState("table"); // 'table' | 'map'
  const [selectedParcel, setSelectedParcel] = useState(parcels[0] || null);
  const [feedback, setFeedback] = useState("");
  const [collectorRemarks, setCollectorRemarks] = useState("Verified against e-Dhara Record of Rights (RoR 7/12) and certified mutation register.");
  const [isFetchingRecord, setIsFetchingRecord] = useState(false);
  const [fetchedRecordData, setFetchedRecordData] = useState(null);

  const districtName = currentUser?.district || "Ahmedabad";

  const filteredParcels = parcels.filter((p) => {
    const matchesSearch =
      p.surveyNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.ownerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.village.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All" || p.verificationStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleFetchGovRecord = (parcel) => {
    setIsFetchingRecord(true);
    setFetchedRecordData(null);
    setTimeout(() => {
      setIsFetchingRecord(false);
      setFetchedRecordData({
        ownerName: parcel.ownerName,
        surveyNumber: parcel.surveyNumber,
        landArea: `${parcel.areaAcres} Acres`,
        landClassification: `${parcel.landType} (Jirayat / Bagayat Class-I)`,
        mutationDetails: "Entry #135 Certified on 14-May-2025 (Paternal Partition)",
        encumbrance: parcel.verificationStatus === "Flagged" ? "Mortgage Lien Entry #418 - Bank of Baroda" : "Nil Encumbrance / Clear Title",
        disputeInfo: parcel.verificationStatus === "Flagged" ? "Civil Suit #CS/2025/11 Pending in Senior Civil Court" : "No Legal Dispute / Injunction recorded in Revenue Court"
      });
      setFeedback(`Government e-Dhara Land Record fetched successfully for Survey ${parcel.surveyNumber}.`);
      setTimeout(() => setFeedback(""), 2500);
    }, 800);
  };

  const handleVerify = (parcelId) => {
    updateParcelVerification(parcelId, "Verified", collectorRemarks || "RoR 7/12 verified clear title via e-Dhara Land Records API.");
    setFeedback(`Survey ${selectedParcel?.surveyNumber || parcelId} marked as VERIFIED CLEAR TITLE.`);
    setTimeout(() => {
      setFeedback("");
    }, 2000);
  };

  const handleFlag = (parcelId) => {
    updateParcelVerification(parcelId, "Flagged", collectorRemarks || "Title discrepancy flagged under Section 11 verification. Inquiry initiated.");
    setFeedback(`Survey ${selectedParcel?.surveyNumber || parcelId} FLAGGED for revenue inquiry.`);
    setTimeout(() => {
      setFeedback("");
    }, 2000);
  };

  const handleRequestClarification = (parcelId) => {
    setFeedback(`Clarification request issued to Talati / Circle Officer for Survey ${selectedParcel?.surveyNumber || parcelId}.`);
    setTimeout(() => {
      setFeedback("");
    }, 2500);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div>
          <div className="text-xs text-slate-500 font-medium">
            District Authority • Collector & Competent Land Acquisition Authority
          </div>
          <h1 className="text-xl font-bold text-slate-900 leading-tight flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-[#1B365D]" />
            Land Record & Title Verification (RFCTLARR Section 11)
          </h1>
        </div>

        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded border border-slate-300">
          <button
            onClick={() => setViewMode("table")}
            className={`px-3 py-1 text-xs font-semibold rounded flex items-center gap-1.5 transition-colors ${
              viewMode === "table"
                ? "bg-[#1B365D] text-white shadow-xs"
                : "text-slate-700 hover:bg-slate-200"
            }`}
          >
            <Table className="w-3.5 h-3.5" />
            <span>Table View</span>
          </button>
          <button
            onClick={() => setViewMode("map")}
            className={`px-3 py-1 text-xs font-semibold rounded flex items-center gap-1.5 transition-colors ${
              viewMode === "map"
                ? "bg-[#1B365D] text-white shadow-xs"
                : "text-slate-700 hover:bg-slate-200"
            }`}
          >
            <Map className="w-3.5 h-3.5" />
            <span>GIS Cadastral Map</span>
          </button>
        </div>
      </div>

      {feedback && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs rounded font-semibold flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-700 shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Main Grid: Left Table/Map & Right Parcel Detail Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (7 Cols): Parcels Table or GIS Map */}
        <div className="lg:col-span-7 space-y-4">
          {viewMode === "map" ? (
            <div className="space-y-3">
              <div className="bg-white border border-slate-300 rounded p-2.5 flex items-center justify-between text-xs">
                <span className="font-bold text-[#1B365D] flex items-center gap-1">
                  <Map className="w-4 h-4 text-[#C5A059]" />
                  Interactive Revenue Cadastral GIS (Geoman Enabled)
                </span>
                <span className="text-[11px] text-slate-500">
                  Click any plot polygon to load e-Dhara RoR & verify title
                </span>
              </div>
              <LeafletGisMap
                parcels={filteredParcels}
                selectedParcelIds={selectedParcel ? [selectedParcel.id] : []}
                activeParcel={selectedParcel}
                onSetActiveParcel={(prc) => {
                  const match = parcels.find(p => p.surveyNumber === prc.surveyNumber || p.id === prc.id);
                  if (match) {
                    setSelectedParcel(match);
                  } else {
                    setSelectedParcel({
                      id: prc.id || "TMP",
                      surveyNumber: prc.surveyNumber,
                      ownerName: prc.ownerName,
                      village: prc.village,
                      areaAcres: prc.areaAcres,
                      landType: prc.landType || "Agricultural",
                      verificationStatus: "Pending",
                      dispute: "None"
                    });
                  }
                  setFetchedRecordData(null);
                }}
                height="460px"
              />
            </div>
          ) : (
            <>
              {/* Filters */}
              <div className="bg-white border border-slate-300 rounded p-3.5 shadow-2xs space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Search Survey / Khatedar</label>
                    <div className="relative">
                      <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Survey No (e.g. 142/A) or Owner Name..."
                        className="w-full pl-8 pr-2.5 py-1.5 border border-slate-300 rounded text-slate-900 focus:ring-1 focus:ring-[#1B365D]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Verification Status</label>
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="w-full px-2.5 py-1.5 border border-slate-300 rounded bg-white text-slate-900"
                    >
                      <option value="All">All Statuses</option>
                      <option value="Verified">Verified Clear Title</option>
                      <option value="Pending">Pending Verification</option>
                      <option value="Flagged">Flagged / Dispute</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Table */}
              <div className="bg-white border border-slate-300 rounded shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-100 text-slate-800 font-semibold border-b uppercase text-[11px]">
                      <tr>
                        <th className="py-3 px-3 border-r">Survey No.</th>
                        <th className="py-3 px-3 border-r">Owner</th>
                        <th className="py-3 px-3 border-r">Area</th>
                        <th className="py-3 px-3 border-r">Land Type</th>
                        <th className="py-3 px-3 border-r">Dispute</th>
                        <th className="py-3 px-3 border-r">Status</th>
                        <th className="py-3 px-3 text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {filteredParcels.map((prc) => {
                        const isSelected = selectedParcel?.id === prc.id;
                        const hasDispute = prc.verificationStatus === "Flagged";
                        return (
                          <tr
                            key={prc.id}
                            onClick={() => {
                              setSelectedParcel(prc);
                              setFetchedRecordData(null);
                            }}
                            className={`cursor-pointer transition-colors ${
                              isSelected ? "bg-blue-50/80 font-medium" : "hover:bg-slate-50"
                            }`}
                          >
                            <td className="py-3 px-3 border-r font-mono font-bold text-slate-900">
                              {prc.surveyNumber}
                              <div className="text-[10px] text-slate-500 font-sans font-normal">{prc.village}</div>
                            </td>
                            <td className="py-3 px-3 border-r text-slate-900 font-medium">
                              {prc.ownerName}
                            </td>
                            <td className="py-3 px-3 border-r font-bold text-slate-800">
                              {prc.areaAcres} Acres
                            </td>
                            <td className="py-3 px-3 border-r text-slate-600">
                              {prc.landType}
                            </td>
                            <td className="py-3 px-3 border-r">
                              {hasDispute ? (
                                <span className="bg-rose-100 text-rose-800 px-1.5 py-0.5 rounded text-[10px] font-bold flex items-center gap-1 w-fit">
                                  <AlertTriangle className="w-2.5 h-2.5" /> Yes
                                </span>
                              ) : (
                                <span className="text-slate-500 text-[11px]">No</span>
                              )}
                            </td>
                            <td className="py-3 px-3 border-r">
                              <StatusBadge status={prc.verificationStatus} size="xs" />
                            </td>
                            <td className="py-3 px-3 text-center">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedParcel(prc);
                                  setFetchedRecordData(null);
                                }}
                                className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-colors ${
                                  isSelected
                                    ? "bg-[#1B365D] text-white"
                                    : "bg-slate-100 hover:bg-slate-200 text-slate-800"
                                }`}
                              >
                                Inspect
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Right Column (5 Cols): Detailed Parcel Detail Panel & Government Record Fetch Section */}
        <div className="lg:col-span-5">
          {selectedParcel ? (
            <div className="bg-white border border-slate-300 rounded p-5 shadow-xs space-y-4 text-xs sticky top-4">
              <div className="flex items-center justify-between border-b pb-3">
                <div>
                  <div className="text-[10px] font-bold uppercase text-slate-500">
                    Parcel Detail & Verification Panel
                  </div>
                  <h2 className="text-base font-bold text-slate-900 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#1B365D]" />
                    Survey No: {selectedParcel.surveyNumber}
                  </h2>
                </div>
                <StatusBadge status={selectedParcel.verificationStatus} size="sm" />
              </div>

              {/* Parcel Attribute Fields */}
              <div className="grid grid-cols-2 gap-2.5 bg-slate-50 border border-slate-200 rounded p-3 text-[11px]">
                <div>
                  <span className="text-slate-500 block">Survey Number:</span>
                  <span className="font-bold text-slate-900 font-mono">{selectedParcel.surveyNumber}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Village:</span>
                  <span className="font-bold text-slate-900">{selectedParcel.village}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Taluka:</span>
                  <span className="font-bold text-slate-900">{selectedParcel.taluka || "Petlad / Anand"}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">District:</span>
                  <span className="font-bold text-slate-900">{selectedParcel.district || districtName}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Owner Name:</span>
                  <span className="font-bold text-slate-900">{selectedParcel.ownerName}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Owner ID:</span>
                  <span className="font-mono font-bold text-slate-800">{selectedParcel.ownerAadhaar || "KHAT-2026-9481"}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Land Area:</span>
                  <span className="font-bold text-slate-900">{selectedParcel.areaAcres} Acres</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Land Type:</span>
                  <span className="font-bold text-slate-900">{selectedParcel.landType}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">RoR Number (7/12):</span>
                  <span className="font-mono font-bold text-slate-900">ROR-7-12-{selectedParcel.surveyNumber.replace("/", "-")}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Mutation Number:</span>
                  <span className="font-mono font-bold text-slate-900">Entry 135 (Certified)</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Encumbrance Status:</span>
                  <span className={`font-semibold ${selectedParcel.verificationStatus === "Flagged" ? "text-rose-700" : "text-emerald-700"}`}>
                    {selectedParcel.verificationStatus === "Flagged" ? "Mortgage Lien Entry" : "Nil Encumbrance"}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block">Dispute Status:</span>
                  <span className={`font-semibold ${selectedParcel.verificationStatus === "Flagged" ? "text-rose-700" : "text-slate-700"}`}>
                    {selectedParcel.verificationStatus === "Flagged" ? "Civil Dispute Flagged" : "No Dispute Reported"}
                  </span>
                </div>
                <div className="col-span-2 pt-1 border-t border-slate-200">
                  <span className="text-slate-500 block">Land Record Source:</span>
                  <span className="font-semibold text-[#1B365D]">Gujarat e-Dhara Portal • DILRMP National Land Records Modernization</span>
                </div>
              </div>

              {/* Government Record Fetch Section */}
              <div className="border border-blue-200 bg-blue-50/50 rounded p-3.5 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Database className="w-3.5 h-3.5 text-[#1B365D]" />
                    <span>Government Record Fetch (e-Dhara API)</span>
                  </div>
                  <button
                    onClick={() => handleFetchGovRecord(selectedParcel)}
                    disabled={isFetchingRecord}
                    className="bg-[#1B365D] hover:bg-[#12243f] text-white px-3 py-1 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors disabled:opacity-50"
                  >
                    <RefreshCw className={`w-3 h-3 ${isFetchingRecord ? "animate-spin" : ""}`} />
                    <span>{isFetchingRecord ? "Fetching..." : "Fetch Land Record"}</span>
                  </button>
                </div>

                {fetchedRecordData && (
                  <div className="bg-white border border-blue-300 rounded p-3 space-y-1.5 text-[11px] animate-fadeIn">
                    <div className="font-bold text-emerald-800 flex items-center gap-1 border-b border-slate-200 pb-1">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      Live e-Dhara RoR Record Verified
                    </div>
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <div>• <strong>Owner:</strong> {fetchedRecordData.ownerName}</div>
                      <div>• <strong>Survey:</strong> {fetchedRecordData.surveyNumber}</div>
                      <div>• <strong>Area:</strong> {fetchedRecordData.landArea}</div>
                      <div>• <strong>Classification:</strong> {fetchedRecordData.landClassification}</div>
                    </div>
                    <div>• <strong>Mutation Details:</strong> {fetchedRecordData.mutationDetails}</div>
                    <div>• <strong>Encumbrance:</strong> <span className="font-medium text-slate-800">{fetchedRecordData.encumbrance}</span></div>
                    <div>• <strong>Dispute Information:</strong> <span className="font-medium text-slate-800">{fetchedRecordData.disputeInfo}</span></div>
                  </div>
                )}
              </div>

              {/* Collector Actions */}
              <div className="space-y-3 pt-2 border-t">
                <div className="text-xs font-bold text-slate-900">Collector Verification Actions</div>
                
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Collector Remarks / Statutory Note:
                  </label>
                  <textarea
                    rows={2}
                    value={collectorRemarks}
                    onChange={(e) => setCollectorRemarks(e.target.value)}
                    placeholder="Enter Collector remarks on title verification..."
                    className="w-full p-2 border border-slate-300 rounded text-xs text-slate-900 focus:ring-1 focus:ring-[#1B365D]"
                  />
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => handleVerify(selectedParcel.id)}
                    className="bg-emerald-700 hover:bg-emerald-800 text-white py-1.5 px-2 rounded text-xs font-bold flex items-center justify-center gap-1 transition-colors shadow-2xs"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>✓ Verify Parcel</span>
                  </button>

                  <button
                    onClick={() => handleFlag(selectedParcel.id)}
                    className="bg-rose-700 hover:bg-rose-800 text-white py-1.5 px-2 rounded text-xs font-bold flex items-center justify-center gap-1 transition-colors shadow-2xs"
                  >
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>⚠ Flag Dispute</span>
                  </button>

                  <button
                    onClick={() => handleRequestClarification(selectedParcel.id)}
                    className="bg-amber-600 hover:bg-amber-700 text-white py-1.5 px-2 rounded text-xs font-bold flex items-center justify-center gap-1 transition-colors shadow-2xs"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>Clarification</span>
                  </button>
                </div>

                <div className="flex gap-2 pt-2 border-t">
                  <button
                    onClick={() => {
                      setFeedback(`Draft remarks saved for Survey ${selectedParcel.surveyNumber}.`);
                      setTimeout(() => setFeedback(""), 2000);
                    }}
                    className="flex-1 py-1.5 border border-slate-300 rounded text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    Save Draft
                  </button>
                  <button
                    onClick={() => handleVerify(selectedParcel.id)}
                    className="flex-1 py-1.5 bg-[#1B365D] hover:bg-[#12243f] text-white rounded text-xs font-bold transition-colors shadow-2xs"
                  >
                    Verify Land Record
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white border border-slate-300 rounded p-8 text-center text-slate-500 text-xs">
              Select a parcel from the list to view full details and perform Collector title verification.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
