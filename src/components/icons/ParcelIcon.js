import React from "react";

export default function ParcelIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 300 250"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="cardboardLight" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: "#D4A574", stopOpacity: 1 }} />
          <stop
            offset="100%"
            style={{ stopColor: "#C89A6A", stopOpacity: 1 }}
          />
        </linearGradient>
        <linearGradient id="cardboardMedium" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{ stopColor: "#C89A6A", stopOpacity: 1 }} />
          <stop
            offset="100%"
            style={{ stopColor: "#B88A5A", stopOpacity: 1 }}
          />
        </linearGradient>
        <linearGradient id="cardboardDark" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: "#A87A50", stopOpacity: 1 }} />
          <stop
            offset="100%"
            style={{ stopColor: "#987048", stopOpacity: 1 }}
          />
        </linearGradient>
      </defs>

      <polygon
        points="20,30 80,10 120,80 60,100"
        fill="url(#cardboardLight)"
        stroke="#8B6F47"
        strokeWidth="1"
      />

      <polygon
        points="280,30 220,10 180,80 240,100"
        fill="url(#cardboardLight)"
        stroke="#8B6F47"
        strokeWidth="1"
      />

      <polygon
        points="60,100 120,80 180,80 240,100 240,200 60,200"
        fill="url(#cardboardMedium)"
        stroke="#8B6F47"
        strokeWidth="1"
      />

      <polygon
        points="60,100 60,200 40,190 40,110"
        fill="url(#cardboardDark)"
        stroke="#8B6F47"
        strokeWidth="1"
      />

      <polygon
        points="240,100 240,200 260,190 260,110"
        fill="url(#cardboardDark)"
        stroke="#8B6F47"
        strokeWidth="1"
      />

      <rect
        x="65"
        y="45"
        width="15"
        height="35"
        fill="#8B7355"
        opacity="0.6"
        transform="rotate(-15 72 62)"
      />

      <rect
        x="220"
        y="45"
        width="15"
        height="35"
        fill="#8B7355"
        opacity="0.6"
        transform="rotate(15 228 62)"
      />

      <g transform="translate(80, 130)">
        <path
          d="M 10,0 L 15,10 L 5,10 Z"
          fill="none"
          stroke="black"
          strokeWidth="1.5"
        />
        <line
          x1="10"
          y1="10"
          x2="10"
          y2="15"
          stroke="black"
          strokeWidth="1.5"
        />
        <line x1="7" y1="15" x2="13" y2="15" stroke="black" strokeWidth="1.5" />
      </g>

      <g transform="translate(180, 130)">
        <path
          d="M 10,15 L 10,0 L 5,5 M 10,0 L 15,5"
          fill="none"
          stroke="black"
          strokeWidth="1.5"
        />
      </g>

      <text
        x="150"
        y="170"
        fontFamily="Arial, sans-serif"
        fontSize="12"
        textAnchor="middle"
        fill="#000"
      >
        HANDLE WITH CARE
      </text>

      <g transform="translate(100, 180)">
        <rect x="0" y="0" width="2" height="15" fill="black" />
        <rect x="3" y="0" width="1" height="15" fill="black" />
        <rect x="5" y="0" width="3" height="15" fill="black" />
        <rect x="9" y="0" width="1" height="15" fill="black" />
        <rect x="11" y="0" width="2" height="15" fill="black" />
        <rect x="14" y="0" width="1" height="15" fill="black" />
        <rect x="16" y="0" width="3" height="15" fill="black" />
        <rect x="20" y="0" width="2" height="15" fill="black" />
        <rect x="23" y="0" width="1" height="15" fill="black" />
        <rect x="25" y="0" width="2" height="15" fill="black" />
        <rect x="28" y="0" width="3" height="15" fill="black" />
        <rect x="32" y="0" width="1" height="15" fill="black" />
        <rect x="34" y="0" width="2" height="15" fill="black" />
        <rect x="37" y="0" width="1" height="15" fill="black" />
        <rect x="39" y="0" width="3" height="15" fill="black" />
        <rect x="43" y="0" width="2" height="15" fill="black" />
        <rect x="46" y="0" width="1" height="15" fill="black" />
        <rect x="48" y="0" width="2" height="15" fill="black" />
        <rect x="51" y="0" width="1" height="15" fill="black" />
        <rect x="53" y="0" width="3" height="15" fill="black" />
        <rect x="57" y="0" width="2" height="15" fill="black" />
        <rect x="60" y="0" width="1" height="15" fill="black" />
        <rect x="62" y="0" width="2" height="15" fill="black" />
        <rect x="65" y="0" width="1" height="15" fill="black" />
        <rect x="67" y="0" width="3" height="15" fill="black" />
        <rect x="71" y="0" width="2" height="15" fill="black" />
        <rect x="74" y="0" width="1" height="15" fill="black" />
        <rect x="76" y="0" width="2" height="15" fill="black" />
        <rect x="79" y="0" width="1" height="15" fill="black" />
        <rect x="81" y="0" width="3" height="15" fill="black" />
        <rect x="85" y="0" width="2" height="15" fill="black" />
        <rect x="88" y="0" width="1" height="15" fill="black" />
        <rect x="90" y="0" width="2" height="15" fill="black" />
        <rect x="93" y="0" width="1" height="15" fill="black" />
        <rect x="95" y="0" width="3" height="15" fill="black" />
        <rect x="99" y="0" width="1" height="15" fill="black" />
      </g>

      <ellipse cx="150" cy="220" rx="100" ry="15" fill="black" opacity="0.2" />
    </svg>
  );
}
