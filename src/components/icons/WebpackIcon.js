import React from "react";

export default function WebpackIcon() {
  return (
    <svg
      width="50"
      height="50"
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="lightBlue1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "#A8D8F0", stopOpacity: 1 }} />
          <stop
            offset="100%"
            style={{ stopColor: "#7BC8E8", stopOpacity: 1 }}
          />
        </linearGradient>
        <linearGradient id="lightBlue2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{ stopColor: "#7BC8E8", stopOpacity: 1 }} />
          <stop
            offset="100%"
            style={{ stopColor: "#A8D8F0", stopOpacity: 1 }}
          />
        </linearGradient>
        <linearGradient id="darkBlue" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "#2874B5", stopOpacity: 1 }} />
          <stop
            offset="100%"
            style={{ stopColor: "#1A5A8F", stopOpacity: 1 }}
          />
        </linearGradient>
      </defs>

      <path d="M 40 60 L 40 140 L 100 170 L 100 90 Z" fill="url(#lightBlue1)" />

      <path
        d="M 160 60 L 160 140 L 100 170 L 100 90 Z"
        fill="url(#lightBlue2)"
      />

      <path d="M 100 30 L 40 60 L 100 90 L 160 60 Z" fill="url(#lightBlue1)" />

      <path d="M 100 90 L 70 107 L 100 124 L 130 107 Z" fill="url(#darkBlue)" />

      <path d="M 70 107 L 70 147 L 100 164 L 100 124 Z" fill="#2874B5" />

      <path d="M 130 107 L 130 147 L 100 164 L 100 124 Z" fill="#1A5A8F" />

      <g stroke="white" strokeWidth="6" fill="none" strokeLinejoin="miter">
        <path d="M 100 30 L 160 60 L 160 140 L 100 170 L 40 140 L 40 60 Z" />

        <line x1="100" y1="30" x2="100" y2="90" />
        <line x1="40" y1="60" x2="100" y2="90" />
        <line x1="160" y1="60" x2="100" y2="90" />
        <line x1="100" y1="90" x2="100" y2="170" />

        <path d="M 70 107 L 100 90 L 130 107" />
        <line x1="70" y1="107" x2="70" y2="147" />
        <line x1="130" y1="107" x2="130" y2="147" />
        <line x1="70" y1="147" x2="100" y2="164" />
        <line x1="130" y1="147" x2="100" y2="164" />
        <line x1="100" y1="124" x2="70" y2="107" />
        <line x1="100" y1="124" x2="130" y2="107" />
      </g>
    </svg>
  );
}
