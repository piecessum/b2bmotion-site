"use client";

import { useEffect, useState } from "react";

/**
 * Каркасный глобус с ортографической проекцией. Реальные географические
 * координаты городов команды; меридианы и параллели пересчитываются на каждом
 * кадре, центральная долгота плавно качается, чтобы все города оставались
 * видимыми и при этом «Земля» казалась живой.
 */

interface City {
  name: string;
  lat: number;
  lon: number;
}

const cities: City[] = [
  { name: "Санкт-Петербург", lat: 59.93, lon: 30.36 },
  { name: "Воронеж", lat: 51.66, lon: 39.2 },
  { name: "Батуми", lat: 41.62, lon: 41.64 },
  { name: "Бийск", lat: 52.54, lon: 85.21 },
];

const VB = 600;
const C = VB / 2;
const R = 188;
const RAD = Math.PI / 180;

interface Projected {
  x: number;
  y: number;
  visible: boolean;
  cosc: number;
}

function project(
  lat: number,
  lon: number,
  lat0: number,
  lon0: number,
): Projected {
  const phi = lat * RAD;
  const phi0 = lat0 * RAD;
  const dl = (lon - lon0) * RAD;
  const cosc =
    Math.sin(phi0) * Math.sin(phi) +
    Math.cos(phi0) * Math.cos(phi) * Math.cos(dl);
  const x = R * Math.cos(phi) * Math.sin(dl);
  const y =
    R *
    (Math.cos(phi0) * Math.sin(phi) -
      Math.sin(phi0) * Math.cos(phi) * Math.cos(dl));
  return { x: C + x, y: C - y, visible: cosc > 0, cosc };
}

function projectPath(
  points: Array<[number, number]>,
  lat0: number,
  lon0: number,
): string {
  let d = "";
  let pen = false;
  for (const [lat, lon] of points) {
    const p = project(lat, lon, lat0, lon0);
    if (p.visible) {
      d += `${pen ? "L" : "M"}${p.x.toFixed(1)} ${p.y.toFixed(1)} `;
      pen = true;
    } else {
      pen = false;
    }
  }
  return d.trim();
}

const PARALLELS: Array<Array<[number, number]>> = [-60, -30, 0, 30, 60].map(
  (lat) => {
    const pts: Array<[number, number]> = [];
    for (let lon = -180; lon <= 180; lon += 4) pts.push([lat, lon]);
    return pts;
  },
);

const MERIDIANS: Array<Array<[number, number]>> = [];
for (let lon = -180; lon < 180; lon += 30) {
  const pts: Array<[number, number]> = [];
  for (let lat = -88; lat <= 88; lat += 4) pts.push([lat, lon]);
  MERIDIANS.push(pts);
}

export function TeamGlobe() {
  const [phase, setPhase] = useState(0);
  const [hover, setHover] = useState<number | null>(null);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      setPhase((((t - start) / 24000) % 1) * Math.PI * 2);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Центр проекции качается по долготе (≈от 33° до 77° E), широта почти
  // фиксирована — так все четыре города всегда остаются в видимом полушарии.
  const lon0 = 55 + 22 * Math.sin(phase);
  const lat0 = 48 + 4 * Math.sin(phase * 0.5);

  const parallelPaths = PARALLELS.map((p) => projectPath(p, lat0, lon0));
  const meridianPaths = MERIDIANS.map((m) => projectPath(m, lat0, lon0));

  const cityProj = cities.map((c) => ({
    ...c,
    ...project(c.lat, c.lon, lat0, lon0),
  }));

  return (
    <div className="relative mx-auto w-full max-w-xl aspect-square">
      {/* Внешнее свечение */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 35% 30%, rgba(59,130,246,0.28), transparent 62%)",
          filter: "blur(40px)",
        }}
      />

      <svg
        viewBox={`0 0 ${VB} ${VB}`}
        className="relative w-full h-full"
        aria-label="Глобус с городами команды"
      >
        <defs>
          <radialGradient id="globe-fill" cx="35%" cy="30%" r="80%">
            <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.55" />
            <stop offset="55%" stopColor="#0b1230" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#000" stopOpacity="0.96" />
          </radialGradient>
          <radialGradient id="globe-rim" cx="50%" cy="50%" r="50%">
            <stop offset="92%" stopColor="transparent" />
            <stop offset="100%" stopColor="rgba(96,165,250,0.55)" />
          </radialGradient>
          <radialGradient id="city-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(96,165,250,0.95)" />
            <stop offset="55%" stopColor="rgba(96,165,250,0.18)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <clipPath id="globe-clip">
            <circle cx={C} cy={C} r={R} />
          </clipPath>
        </defs>

        {/* Тело глобуса */}
        <circle cx={C} cy={C} r={R} fill="url(#globe-fill)" />

        {/* Сетка — обрезана по диску, чтобы пограничные сегменты не торчали */}
        <g clipPath="url(#globe-clip)">
          <g
            stroke="rgba(96,165,250,0.16)"
            strokeWidth="0.9"
            fill="none"
            style={{ pointerEvents: "none" }}
          >
            {parallelPaths.map((d, i) => (
              <path key={`p-${i}`} d={d} />
            ))}
          </g>
          <g
            stroke="rgba(96,165,250,0.16)"
            strokeWidth="0.9"
            fill="none"
            style={{ pointerEvents: "none" }}
          >
            {meridianPaths.map((d, i) => (
              <path key={`m-${i}`} d={d} />
            ))}
          </g>
        </g>

        {/* Тонкий блик по краю диска */}
        <circle
          cx={C}
          cy={C}
          r={R}
          fill="url(#globe-rim)"
          style={{ pointerEvents: "none" }}
        />

        {/* Точки городов */}
        {cityProj.map((c, i) => {
          if (!c.visible) return null;
          const opacity = Math.min(1, c.cosc * 3);
          const active = hover === i;
          return (
            <g
              key={c.name}
              style={{ opacity, transition: "opacity 0.3s" }}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
            >
              <circle
                cx={c.x}
                cy={c.y}
                r={active ? 26 : 20}
                fill="url(#city-glow)"
                style={{ transition: "r 0.3s" }}
              />
              <circle
                cx={c.x}
                cy={c.y}
                r="5"
                fill="none"
                stroke="rgba(96,165,250,0.55)"
                strokeWidth="1"
                style={{
                  animation: `team-globe-ring 3s ease-out ${i * 0.6}s infinite`,
                  transformOrigin: `${c.x}px ${c.y}px`,
                }}
              />
              <circle
                cx={c.x}
                cy={c.y}
                r={active ? 5.5 : 4}
                fill="#60A5FA"
                style={{ transition: "r 0.3s" }}
              />
            </g>
          );
        })}
      </svg>

      {/* HTML-подписи с выносками: позиционирование в процентах от viewBox,
          аспект 1:1 → проценты по обеим осям совпадают с SVG-координатами. */}
      <ul className="absolute inset-0 pointer-events-none">
        {cityProj.map((c, i) => {
          if (!c.visible) return null;
          const opacity = Math.min(1, c.cosc * 3);
          const xPct = (c.x / VB) * 100;
          const yPct = (c.y / VB) * 100;
          const isLeft = c.x < C;
          const active = hover === i;
          return (
            <li
              key={c.name}
              className="absolute pointer-events-auto"
              style={{
                left: `${xPct}%`,
                top: `${yPct}%`,
                opacity,
                transition: "opacity 0.3s",
              }}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
            >
              <div
                style={{
                  transform: `translate(${isLeft ? "calc(-100% - 14px)" : "14px"}, -50%)`,
                }}
              >
                <span
                  className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border whitespace-nowrap transition-all ${
                    active
                      ? "bg-[#3B82F6]/20 border-[#3B82F6]/40 text-heading"
                      : "bg-overlay-3 border-glass-border text-body"
                  }`}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-[#60A5FA]"
                    style={{
                      boxShadow: active
                        ? "0 0 8px rgba(96,165,250,0.9)"
                        : "0 0 4px rgba(96,165,250,0.5)",
                    }}
                  />
                  {c.name}
                </span>
              </div>
            </li>
          );
        })}
      </ul>

      <style jsx>{`
        @keyframes team-globe-ring {
          0% {
            r: 5;
            opacity: 0.85;
          }
          100% {
            r: 26;
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
