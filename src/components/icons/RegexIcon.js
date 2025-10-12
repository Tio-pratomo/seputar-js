import React from 'react';

export default function RegexIcon() {
  return (
    <svg
      width="50"
      height="50"
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      className="regex-icon"
    >
      <rect width="64" height="64" rx="8" fill="#f0db4f" />
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize="24"
        fontWeight="bold"
        fill="#323330"
      >
        /.* /
      </text>
    </svg>
  );
}