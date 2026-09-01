import React, { useState } from "react";
import { useApp } from "../../context/AppContext.jsx";
import { StatusBadge } from "../common/StatusBadge.jsx";
import {
  Coins,
  Send,
  CheckCircle,
  Building2,
  FileText,
  Search,
  Filter,
  CreditCard,
  CheckCircle2,
  Clock,
  RefreshCw,
  Download,
  Eye,
  X,
  AlertTriangle,
  ShieldCheck
} from "lucide-react";

export const Page23PaymentDisbursement = () => {
  const { disbursements, dbtPayments, initiatePfmsDisbursement, navigateTo } = useApp();
  const [searchQuery, setSearchQuery] = useState("");
  const [feedback, setFeedback] = useState("");
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const list = disbursements || dbtPayments || [];
  const totalApprovedAward = list.reduce((acc, d) => acc + (Number(d.amount) || 0), 0);
  const totalDisbursed = list
    .filter((d) => d.status === "Disbursed" || d.status === "Payment Completed")
    .reduce((acc, d) => acc + (Number(d.amount) || 0), 0);
  const pendingDisbursal = Math.max(0, totalApprovedAward - totalDisbursed);
  const failedTransactions = list.filter((d) => d.status === "Failed" || d.status === "Pending Retry").length;

  const handleInitiateDbt = (id, name) => {
    if (initiatePfmsDisbursement) {
      initiatePfmsDisbursement(id);
    }
    setFeedback(`DBT Payment initiated for ${name} (Ref: ${id}). PFMS gateway dispatched via NPCI.`);
    setTimeout(() => setFeedback(""), 2500);
  };

  const handleVerifyBank = (payment) => {
    setFeedback(`NPCI Public Financial Management System verified account ${payment.bankAccount} (${payment.ifsc}) for ${payment.beneficiaryName}.`);
    setTimeout(() => setFeedback(""), 2500);
  };

  const handleRetryPayment = (payment) => {
    if (initiatePfmsDisbursement) {
      initiatePfmsDisbursement(payment.id);
    }
    setFeedback(`Re-routing transaction ${payment.id} via secondary RTGS node. Bank processing queued.`);
    setTimeout(() => setFeedback(""), 2500);
  };

  const handleOpenDetail = (payment) => {
    setSelectedPayment(payment);
    setShowDetailModal(true);
  };

  const filtered = list.filter(
    (d) =>
      (d.beneficiaryName || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (d.bankAccount || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (d.ifsc || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (d.utrNumber || d.pfmsRef || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-12">
      {/* Title */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div>
          <div className="text-xs text-slate-500 font-medium">
            District Authority • Public Financial Management System (PFMS / NPCI)
          </div>
          <h1 className="text-xl font-bold text-slate-900 leading-tight flex items-center gap-2">
            <Coins className="w-5 h-5 text-[#1B365D]" />
            Direct Benefit Transfer (DBT) & Statutory Payment Disbursement
          </h1>
        </div>
        <button
          onClick={() => navigateTo("possession-memo")}
          className="bg-[#1B365D] hover:bg-[#12243f] text-white px-3.5 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
        >
          <span>Section 38 Possession Memos →</span>
        </button>
      </div>

      {feedback && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs rounded font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      {/* 4 Payment Summary Cards: Total Approved Award, Total Disbursed, Pending Disbursal, Failed / Retried Transactions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
        <div className="bg-white border border-slate-300 rounded p-4 shadow-2xs">
          <div className="text-slate-500 uppercase text-[10px] font-semibold">Total Approved Award</div>
          <div className="text-xl font-bold text-slate-900 font-mono mt-1">
            ₹ {(totalApprovedAward / 10000000).toFixed(2)} Cr
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">Escrow Corpus Allocated</div>
        </div>

        <div className="bg-white border border-slate-300 rounded p-4 shadow-2xs">
          <div className="text-slate-500 uppercase text-[10px] font-semibold">Total Disbursed</div>
          <div className="text-xl font-bold text-emerald-700 font-mono mt-1">
            ₹ {(totalDisbursed / 10000000).toFixed(2)} Cr
          </div>
          <div className="text-[10px] text-emerald-700 font-medium mt-0.5">
            {totalApprovedAward > 0 ? Math.round((totalDisbursed / totalApprovedAward) * 100) : 0}% Transferred via PFMS
          </div>
        </div>

        <div className="bg-white border border-slate-300 rounded p-4 shadow-2xs">
          <div className="text-slate-500 uppercase text-[10px] font-semibold">Pending Disbursal</div>
          <div className="text-xl font-bold text-amber-700 font-mono mt-1">
            ₹ {(pendingDisbursal / 10000000).toFixed(2)} Cr
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">Under Mandate Processing</div>
        </div>

        <div className="bg-white border border-slate-300 rounded p-4 shadow-2xs">
          <div className="text-slate-500 uppercase text-[10px] font-semibold">Failed / Retried Transactions</div>
          <div className="text-xl font-bold text-rose-700 font-mono mt-1">
            {failedTransactions}
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">Awaiting IFSC / Name Correction</div>
        </div>
      </div>

      {/* Payment Table */}
      <div className="bg-white border border-slate-300 rounded shadow-xs p-4 space-y-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b pb-2">
          <h3 className="font-bold text-xs uppercase tracking-wider text-slate-900">
            Beneficiary Compensation Ledger & Bank Accounts
          </h3>
          <div className="relative w-full sm:w-72">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Beneficiary, Account, UTR..."
              className="w-full pl-8 pr-2.5 py-1.5 border border-slate-300 rounded text-xs text-slate-900"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border border-slate-200">
            <thead className="bg-slate-100 text-slate-800 font-semibold border-b uppercase text-[10px]">
              <tr>
                <th className="py-2.5 px-3 border-r">Beneficiary Name</th>
                <th className="py-2.5 px-3 border-r">Bank Account</th>
                <th className="py-2.5 px-3 border-r">IFSC</th>
                <th className="py-2.5 px-3 border-r">Amount</th>
                <th className="py-2.5 px-3 border-r">Status</th>
                <th className="py-2.5 px-3 border-r">UTR Number</th>
                <th className="py-2.5 px-3 border-r">Disbursed Date</th>
                <th className="py-2.5 px-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filtered.map((dis) => (
                <tr key={dis.id} className="hover:bg-slate-50">
                  <td className="py-2.5 px-3 border-r font-bold text-slate-900">
                    {dis.beneficiaryName}
                    <div className="text-[10px] text-slate-500 font-mono font-normal">Award: {dis.awardId || "AWD-2026-01"}</div>
                  </td>
                  <td className="py-2.5 px-3 border-r font-mono text-slate-800">
                    {dis.bankAccount || "501004928192"}
                  </td>
                  <td className="py-2.5 px-3 border-r font-mono text-slate-600 font-medium">
                    {dis.ifsc || "SBIN0001234"}
                    <div className="text-[10px] text-slate-500 font-sans">{dis.bankName || "State Bank of India"}</div>
                  </td>
                  <td className="py-2.5 px-3 border-r font-bold text-emerald-800 font-mono">
                    ₹ {Number(dis.amount || 0).toLocaleString()}
                    <div className="text-[10px] text-slate-500 font-normal">
                      (₹ {((Number(dis.amount) || 0) / 10000000).toFixed(2)} Cr)
                    </div>
                  </td>
                  <td className="py-2.5 px-3 border-r">
                    <StatusBadge status={dis.status} size="xs" />
                  </td>
                  <td className="py-2.5 px-3 border-r font-mono text-slate-700 text-[11px]">
                    {dis.utrNumber || dis.pfmsRef || "RBI-UTR-98214-OK"}
                  </td>
                  <td className="py-2.5 px-3 border-r font-mono text-slate-600 text-[11px]">
                    {dis.transferDate || dis.disbursedDate || "2026-08-24"}
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      {dis.status !== "Disbursed" && dis.status !== "Payment Completed" ? (
                        <button
                          onClick={() => handleInitiateDbt(dis.id, dis.beneficiaryName)}
                          className="bg-emerald-700 hover:bg-emerald-800 text-white px-2.5 py-1 rounded text-[10px] font-bold flex items-center gap-1"
                        >
                          <Send className="w-3 h-3" />
                          <span>Initiate DBT</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => handleOpenDetail(dis)}
                          className="bg-[#1B365D] hover:bg-[#12243f] text-white px-2.5 py-1 rounded text-[10px] font-bold flex items-center gap-1"
                        >
                          <Eye className="w-3 h-3" />
                          <span>Details</span>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Detail Modal */}
      {showDetailModal && selectedPayment && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded border border-slate-400 shadow-2xl max-w-xl w-full p-6 space-y-4 text-xs max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <div className="text-[10px] uppercase font-bold text-slate-500">
                  PFMS Digital Payment Voucher
                </div>
                <h3 className="font-bold text-base text-slate-900 flex items-center gap-1.5">
                  <CreditCard className="w-4 h-4 text-[#1B365D]" />
                  Payment Voucher: {selectedPayment.beneficiaryName}
                </h3>
              </div>
              <button
                onClick={() => setShowDetailModal(false)}
                className="p-1 hover:bg-slate-100 rounded text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Beneficiary Details: Name, Aadhaar (masked), Bank Name, Account Number, IFSC */}
            <div className="bg-slate-50 border border-slate-200 rounded p-3.5 space-y-2">
              <div className="font-bold text-slate-800 uppercase text-[10px] border-b pb-1">
                Beneficiary Bank Account Details
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-slate-500 block text-[10px]">Beneficiary Name:</span>
                  <span className="font-bold text-slate-900">{selectedPayment.beneficiaryName}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Aadhaar Number (Masked):</span>
                  <span className="font-mono font-bold text-slate-800">XXXX-XXXX-8492</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Bank Name:</span>
                  <span className="font-semibold text-slate-800">{selectedPayment.bankName || "State Bank of India"}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Account Number:</span>
                  <span className="font-mono font-bold text-slate-900">{selectedPayment.bankAccount || "501004928192"}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">IFSC Code:</span>
                  <span className="font-mono font-bold text-slate-800">{selectedPayment.ifsc || "SBIN0001234"}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Branch:</span>
                  <span className="text-slate-700">Anand Main Commercial Branch</span>
                </div>
              </div>
            </div>

            {/* Payment Details: Compensation Amount, R&R Grant Amount, Total Disbursal, UTR Number, Timestamp */}
            <div className="border border-slate-300 rounded p-3.5 space-y-2">
              <div className="font-bold text-slate-800 uppercase text-[10px] border-b pb-1">
                Financial Transaction Breakdown
              </div>
              <div className="grid grid-cols-2 gap-2 font-mono">
                <div>
                  <span className="text-slate-500 block text-[10px] font-sans">Compensation Amount:</span>
                  <span className="font-bold text-slate-900">₹ {((Number(selectedPayment.amount || 0) * 0.85)).toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] font-sans">R&R Grant Amount:</span>
                  <span className="font-bold text-slate-900">₹ {((Number(selectedPayment.amount || 0) * 0.15)).toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] font-sans">Total Disbursal:</span>
                  <span className="font-bold text-emerald-800 text-sm">₹ {Number(selectedPayment.amount || 0).toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] font-sans">UTR Number:</span>
                  <span className="font-bold text-blue-900">{selectedPayment.utrNumber || selectedPayment.pfmsRef || "RBI-UTR-98214-OK"}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-slate-500 block text-[10px] font-sans">Timestamp:</span>
                  <span className="text-slate-700">{selectedPayment.transferDate || "2026-08-24 14:32:08 IST"}</span>
                </div>
              </div>
            </div>

            {/* Payment Logs: Initiated -> PFMS Validation -> Bank Processing -> Success */}
            <div className="bg-slate-50 border border-slate-200 rounded p-3.5 space-y-2">
              <div className="font-bold text-slate-800 uppercase text-[10px] border-b pb-1">
                PFMS Gateway Audit Trail
              </div>
              <div className="space-y-1.5 font-mono text-[10px]">
                <div className="flex items-center gap-2 text-emerald-800">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>14:30:00 — Collector Approved DBT Order Dispatched to PFMS</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-800">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>14:30:45 — PFMS Validation (Aadhaar Seeded NPCI Mapper Active)</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-800">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>14:31:30 — RBI NEFT/RTGS Gateway Clearance Completed</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-800 font-bold">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>14:32:08 — Beneficiary Bank (SBI) Account Credited Successfully</span>
                </div>
              </div>
            </div>

            {/* Actions inside modal */}
            <div className="flex flex-wrap gap-2 pt-2 border-t">
              <button
                onClick={() => handleVerifyBank(selectedPayment)}
                className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded font-semibold text-slate-800 flex items-center justify-center gap-1"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-slate-600" />
                <span>Verify Bank Details</span>
              </button>

              <button
                onClick={() => handleRetryPayment(selectedPayment)}
                className="flex-1 py-2 bg-amber-50 hover:bg-amber-100 border border-amber-300 rounded font-semibold text-amber-900 flex items-center justify-center gap-1"
              >
                <RefreshCw className="w-3.5 h-3.5 text-amber-700" />
                <span>Retry Payment</span>
              </button>

              <button
                onClick={() => {
                  setFeedback("Payment voucher PDF downloaded.");
                  setTimeout(() => setFeedback(""), 2000);
                }}
                className="flex-1 py-2 bg-[#1B365D] hover:bg-[#12243f] text-white rounded font-bold flex items-center justify-center gap-1 shadow-2xs"
              >
                <Download className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Download Voucher</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
