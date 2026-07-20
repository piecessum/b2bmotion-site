"use client";

import { useId } from "react";

// Декоративный технологичный узор для баннеров: тонкая сетка + узлы + пара
// «трасс», плавно затухающих к краям. Кладётся абсолютным слоем под контент.
export function TechPattern({ className = "" }: { className?: string }) {
  const raw = useId().replace(/[:]/g, "");
  const grid = `tp-grid-${raw}`;
  const fade = `tp-fade-${raw}`;
  const mask = `tp-mask-${raw}`;

  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none absolute inset-0 h-full w-full text-white ${className}`}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern
          id={grid}
          width="34"
          height="34"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M34 0H0V34"
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.12"
            strokeWidth="1"
          />
          <circle cx="0" cy="0" r="1.4" fill="currentColor" fillOpacity="0.22" />
          <circle
            cx="17"
            cy="17"
            r="0.9"
            fill="currentColor"
            fillOpacity="0.12"
          />
        </pattern>
        <radialGradient id={fade} cx="26%" cy="20%" r="90%">
          <stop offset="0" stopColor="white" stopOpacity="0.95" />
          <stop offset="0.65" stopColor="white" stopOpacity="0.18" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <mask id={mask}>
          <rect width="100%" height="100%" fill={`url(#${fade})`} />
        </mask>
      </defs>

      <g mask={`url(#${mask})`}>
        <rect width="100%" height="100%" fill={`url(#${grid})`} />
        {/* пара акцентных «трасс» с узлами */}
        <g stroke="currentColor" strokeOpacity="0.16" strokeWidth="1.5" fill="none">
          <path d="M-10 60 H120 V150" />
          <path d="M40 -10 V80 H210" />
        </g>
        <g fill="currentColor" fillOpacity="0.5">
          <circle cx="120" cy="150" r="3" />
          <circle cx="210" cy="80" r="3" />
          <circle cx="40" cy="80" r="2.5" />
        </g>
      </g>
    </svg>
  );
}
