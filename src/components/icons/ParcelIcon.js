import React from "react";

export default function ParcelIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="50"
      height="50"
      viewBox="0 0 100 100"
      className="parcel-icon"
    >
      <g fill="none" fillRule="evenodd">
        <path
          fill="#242424"
          d="M93.14 19.37L52.07 42.4a6.25 6.25 0 01-6.14 0L5.86 19.37a6.25 6.25 0 00-9.3 5.48V75.15a6.25 6.25 0 009.3 5.48l40.07-23.03a6.25 6.25 0 016.14 0l40.07 23.03a6.25 6.25 0 009.3-5.48V24.85a6.25 6.25 0 00-9.3-5.48z"
        />
        <path
          fill="#FFF"
          d="M12.5 24.85l36.94 21.27a6.25 6.25 0 006.12 0L93.5 24.85v50.3L54.56 52.02a6.25 6.25 0 00-6.12 0L12.5 75.15z"
        />
      </g>
    </svg>
  );
}
