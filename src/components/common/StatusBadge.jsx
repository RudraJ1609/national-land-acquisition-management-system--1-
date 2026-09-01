import React from "react";

export const StatusBadge = ({ status, text, size = "sm" }) => {
  const label = text || status || "Pending";
  const normalized = String(label).toLowerCase();

  // Green: OK / Completed / Low Risk / Verified / Approved / Published / Disbursed / On Track / Clear Title
  const isGreen =
    normalized.includes("complete") ||
    normalized.includes("verified") ||
    normalized.includes("approved") ||
    normalized.includes("published") ||
    normalized.includes("disbursed") ||
    normalized.includes("low") ||
    normalized.includes("on track") ||
    normalized.includes("active") ||
    normalized.includes("clear") ||
    normalized.includes("synced");

  // Red: High Risk / Flagged / Dispute / Delayed / Breached / Rejected / Inactive
  const isRed =
    normalized.includes("high") ||
    normalized.includes("flag") ||
    normalized.includes("dispute") ||
    normalized.includes("delay") ||
    normalized.includes("breach") ||
    normalized.includes("reject") ||
    normalized.includes("inactive") ||
    normalized.includes("court");

  // Blue: In Progress / Hearing Scheduled / Processing / Calculated / Generated
  const isBlue =
    normalized.includes("in progress") ||
    normalized.includes("hearing") ||
    normalized.includes("processing") ||
    normalized.includes("calculated") ||
    normalized.includes("generated") ||
    normalized.includes("review");

  // Orange/Yellow: Moderate / Pending / Draft / Under Verification / Escrow
  let colorClasses = "bg-amber-50 text-amber-800 border-amber-300";

  if (isGreen) {
    colorClasses = "bg-emerald-50 text-emerald-800 border-emerald-300";
  } else if (isRed) {
    colorClasses = "bg-rose-50 text-rose-800 border-rose-300";
  } else if (isBlue) {
    colorClasses = "bg-blue-50 text-blue-800 border-blue-300";
  }

  const sizeClasses = size === "xs" ? "text-xs px-1.5 py-0.5" : size === "md" ? "text-sm px-3 py-1 font-medium" : "text-xs px-2.5 py-0.5 font-medium";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded border ${colorClasses} ${sizeClasses} whitespace-nowrap`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          isGreen ? "bg-emerald-600" : isRed ? "bg-rose-600" : isBlue ? "bg-blue-600" : "bg-amber-500"
        }`}
      />
      {label}
    </span>
  );
};
