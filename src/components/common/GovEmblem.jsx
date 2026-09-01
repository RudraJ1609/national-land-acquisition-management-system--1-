import React from "react";

export const GovEmblem = ({ className = "w-10 h-10", color = "text-amber-700" }) => {
  return (
    <svg
      viewBox="0 0 100 120"
      className={`${className} fill-current ${color}`}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="State Emblem of India"
    >
      {/* 3 Lions representation */}
      <g>
        {/* Central Lion Head */}
        <circle cx="50" cy="24" r="14" opacity="0.9" />
        <path d="M43 14 Q50 6 57 14 Q60 22 56 30 Q50 34 44 30 Z" />
        {/* Left Lion Head */}
        <circle cx="30" cy="28" r="10" opacity="0.8" />
        <path d="M24 20 Q30 14 36 20 Q38 28 34 34 Q30 36 26 34 Z" />
        {/* Right Lion Head */}
        <circle cx="70" cy="28" r="10" opacity="0.8" />
        <path d="M64 20 Q70 14 76 20 Q78 28 74 34 Q70 36 66 34 Z" />
      </g>
      {/* Main Column & Abacus */}
      <rect x="22" y="44" width="56" height="8" rx="2" opacity="0.95" />
      {/* Ashoka Chakra in Center */}
      <circle cx="50" cy="62" r="10" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="50" cy="62" r="2.5" />
      {/* Chakra Spokes */}
      <line x1="50" y1="52" x2="50" y2="72" stroke="currentColor" strokeWidth="1.2" />
      <line x1="40" y1="62" x2="60" y2="62" stroke="currentColor" strokeWidth="1.2" />
      <line x1="43" y1="55" x2="57" y2="69" stroke="currentColor" strokeWidth="1" />
      <line x1="43" y1="69" x2="57" y2="55" stroke="currentColor" strokeWidth="1" />
      
      {/* Bull and Horse silhouette placeholders on abacus base */}
      <path d="M26 62 Q28 58 32 60 Q34 64 30 66 Z" opacity="0.7" />
      <path d="M68 62 Q70 58 74 60 Q76 64 72 66 Z" opacity="0.7" />

      {/* Bell Capital Base */}
      <path d="M30 76 C30 72, 70 72, 70 76 C66 88, 34 88, 30 76 Z" opacity="0.9" />
      {/* Satyameva Jayate Banner */}
      <rect x="18" y="94" width="64" height="12" rx="2" fill="currentColor" opacity="0.15" />
      <text
        x="50"
        y="103"
        textAnchor="middle"
        fontSize="7.5"
        fontWeight="bold"
        fontFamily="sans-serif"
        fill="currentColor"
        letterSpacing="1"
      >
        सत्यमेव जयते
      </text>
    </svg>
  );
};
