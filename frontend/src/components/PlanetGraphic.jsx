/**
 * NASA Space Apps Challenge - Junior Astronaut Mission Trainer
 * PlanetGraphic.jsx: High-fidelity scalable vector artwork for the Moon and Mars.
 * No external images required.
 */

import React from 'react';

export function PlanetGraphic({ type = 'moon', size = 160, animated = true }) {
  const isMoon = type.toLowerCase() === 'moon';

  if (isMoon) {
    return (
      <div
        className={`planet-wrapper ${animated ? 'animate-slow-spin' : ''}`}
        style={{ width: size, height: size }}
      >
        <svg
          viewBox="0 0 200 200"
          width={size}
          height={size}
          className="planet-svg moon-svg"
          style={{ filter: 'drop-shadow(0 0 25px rgba(186, 230, 253, 0.45))' }}
        >
          <defs>
            <radialGradient id="moonGlow" cx="40%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#f8fafc" />
              <stop offset="50%" stopColor="#cbd5e1" />
              <stop offset="85%" stopColor="#64748b" />
              <stop offset="100%" stopColor="#334155" />
            </radialGradient>
            <filter id="craterShadow">
              <feDropShadow dx="-1" dy="-1" stdDeviation="1" floodColor="#1e293b" floodOpacity="0.8" />
            </filter>
            <radialGradient id="moonAtmosphere" cx="50%" cy="50%" r="50%">
              <stop offset="85%" stopColor="#38bdf8" stopOpacity="0" />
              <stop offset="98%" stopColor="#38bdf8" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.6" />
            </radialGradient>
          </defs>

          {/* Atmosphere ring */}
          <circle cx="100" cy="100" r="98" fill="url(#moonAtmosphere)" />

          {/* Moon base */}
          <circle cx="100" cy="100" r="90" fill="url(#moonGlow)" />

          {/* Lunar Maria (Dark Basalt Plains) */}
          <path
            d="M50 70 Q 70 50 100 65 T 140 90 Q 120 130 85 125 T 50 70 Z"
            fill="#475569"
            opacity="0.55"
          />
          <path
            d="M110 110 Q 135 120 155 145 T 130 170 Q 100 160 110 110 Z"
            fill="#475569"
            opacity="0.45"
          />
          <path
            d="M60 130 Q 80 155 65 170 T 45 150 Z"
            fill="#334155"
            opacity="0.4"
          />

          {/* Craters with shadows and highlights */}
          {/* Tycho Crater at South Pole */}
          <g transform="translate(100, 160)">
            <circle cx="0" cy="0" r="14" fill="#64748b" stroke="#94a3b8" strokeWidth="1.5" />
            <circle cx="0" cy="0" r="5" fill="#f1f5f9" />
            {/* Crater rays */}
            <line x1="0" y1="-14" x2="-8" y2="-32" stroke="#e2e8f0" strokeWidth="1" opacity="0.6" />
            <line x1="0" y1="-14" x2="12" y2="-30" stroke="#e2e8f0" strokeWidth="1" opacity="0.6" />
            <line x1="-12" y1="-5" x2="-35" y2="-12" stroke="#e2e8f0" strokeWidth="1" opacity="0.5" />
            <line x1="12" y1="-5" x2="32" y2="-15" stroke="#e2e8f0" strokeWidth="1" opacity="0.5" />
          </g>

          {/* Copernicus Crater */}
          <circle cx="70" cy="85" r="9" fill="#475569" stroke="#94a3b8" strokeWidth="1.2" />
          <circle cx="70" cy="85" r="3" fill="#cbd5e1" />

          {/* Kepler Crater */}
          <circle cx="45" cy="95" r="6" fill="#475569" stroke="#94a3b8" strokeWidth="1" />

          {/* Minor impact craters */}
          <circle cx="130" cy="55" r="8" fill="#334155" stroke="#64748b" strokeWidth="1" opacity="0.7" />
          <circle cx="150" cy="85" r="5" fill="#334155" stroke="#64748b" strokeWidth="0.8" opacity="0.6" />
          <circle cx="85" cy="40" r="6" fill="#334155" stroke="#64748b" strokeWidth="0.8" opacity="0.5" />
          <circle cx="115" cy="30" r="4" fill="#334155" opacity="0.4" />
          <circle cx="40" cy="50" r="5" fill="#334155" opacity="0.5" />

          {/* Crescent Shadow Terminator */}
          <path
            d="M 100 10 A 90 90 0 0 1 100 190 A 75 90 0 0 0 100 10"
            fill="#090d16"
            opacity="0.45"
          />
        </svg>
      </div>
    );
  }

  // Mars Graphic
  return (
    <div
      className={`planet-wrapper ${animated ? 'animate-slow-spin' : ''}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 200 200"
        width={size}
        height={size}
        className="planet-svg mars-svg"
        style={{ filter: 'drop-shadow(0 0 28px rgba(244, 63, 94, 0.45))' }}
      >
        <defs>
          <radialGradient id="marsGlow" cx="38%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#fda4af" />
            <stop offset="35%" stopColor="#f43f5e" />
            <stop offset="70%" stopColor="#be123c" />
            <stop offset="100%" stopColor="#881337" />
          </radialGradient>
          <radialGradient id="marsAtmosphere" cx="50%" cy="50%" r="50%">
            <stop offset="85%" stopColor="#fb7185" stopOpacity="0" />
            <stop offset="97%" stopColor="#fb7185" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#fb7185" stopOpacity="0.75" />
          </radialGradient>
        </defs>

        {/* Mars Atmospheric Haze */}
        <circle cx="100" cy="100" r="98" fill="url(#marsAtmosphere)" />

        {/* Mars Base Body */}
        <circle cx="100" cy="100" r="90" fill="url(#marsGlow)" />

        {/* North Polar Ice Cap (Carbon dioxide & water ice) */}
        <ellipse cx="100" cy="16" rx="32" ry="8" fill="#f8fafc" opacity="0.9" />
        <ellipse cx="100" cy="20" rx="22" ry="5" fill="#e2e8f0" opacity="0.7" />

        {/* South Polar Cap */}
        <ellipse cx="100" cy="186" rx="20" ry="5" fill="#f8fafc" opacity="0.8" />

        {/* Darker basaltic plains (Syrtis Major & Acidalia Planitia) */}
        <path
          d="M 50 85 Q 90 70 125 90 T 160 120 Q 130 145 90 140 T 50 85 Z"
          fill="#4c0519"
          opacity="0.45"
        />
        <path
          d="M 115 50 Q 145 60 160 85 Q 130 95 115 75 Z"
          fill="#4c0519"
          opacity="0.35"
        />

        {/* Valles Marineris Canyon System */}
        <path
          d="M 55 110 Q 95 118 135 112 Q 145 115 155 120"
          stroke="#4c0519"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
          opacity="0.75"
        />

        {/* Olympus Mons Volcano Caldera */}
        <g transform="translate(65, 75)">
          <ellipse cx="0" cy="0" rx="14" ry="11" fill="#be123c" stroke="#f43f5e" strokeWidth="1" opacity="0.7" />
          <ellipse cx="-1" cy="-1" rx="4" ry="3" fill="#881337" />
        </g>

        {/* Crescent Nightside Shadow */}
        <path
          d="M 100 10 A 90 90 0 0 1 100 190 A 75 90 0 0 0 100 10"
          fill="#0f0714"
          opacity="0.45"
        />
      </svg>
    </div>
  );
}
