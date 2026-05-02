"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

/**
 * Каркасный глобус с ортографической проекцией. Реальные географические
 * координаты городов команды; меридианы, параллели и контуры суши
 * (Natural Earth 110m, public/data/world-land-110m.geojson) проецируются
 * на каждом кадре. Палитра меняется под тёмную/светлую тему.
 */

export interface City {
  name: string;
  lat: number;
  lon: number;
  description?: string;
}

const TEAM_CITIES: City[] = [
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

function projectLatLonPath(
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

// GeoJSON-кольцо: массив [lon, lat]. Возвращает path с разрывами по линии
// терминатора — точки за горизонтом просто пропускаются.
function projectGeoRing(
  ring: number[][],
  lat0: number,
  lon0: number,
): string {
  let d = "";
  let pen = false;
  for (const pt of ring) {
    const p = project(pt[1], pt[0], lat0, lon0);
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

interface LandFeature {
  geometry: {
    type: "Polygon" | "MultiPolygon";
    coordinates: number[][][] | number[][][][];
  };
}

interface LandGeoJson {
  features: LandFeature[];
}

// Все кольца суши, плоско. Для Polygon берём только внешнее кольцо
// (островные дыры на 110m практически не заметны и можно ими пренебречь).
function flattenLandRings(geo: LandGeoJson): number[][][] {
  const rings: number[][][] = [];
  for (const f of geo.features) {
    const g = f.geometry;
    if (g.type === "Polygon") {
      const polygon = g.coordinates as number[][][];
      if (polygon[0]) rings.push(polygon[0]);
    } else if (g.type === "MultiPolygon") {
      const multi = g.coordinates as number[][][][];
      for (const polygon of multi) {
        if (polygon[0]) rings.push(polygon[0]);
      }
    }
  }
  return rings;
}

interface Palette {
  fill0: string;
  fill1: string;
  fill2: string;
  rim: string;
  grid: string;
  land: string;
  cityGlow0: string;
  cityGlow1: string;
  cityRing: string;
  cityDot: string;
  outerGlow: string;
}

const PALETTE_DARK: Palette = {
  fill0: "#1e3a8a",
  fill1: "#0b1230",
  fill2: "#000000",
  rim: "rgba(96,165,250,0.55)",
  grid: "rgba(96,165,250,0.16)",
  land: "rgba(96,165,250,0.45)",
  cityGlow0: "rgba(96,165,250,0.95)",
  cityGlow1: "rgba(96,165,250,0.18)",
  cityRing: "rgba(96,165,250,0.55)",
  cityDot: "#60A5FA",
  outerGlow: "rgba(59,130,246,0.28)",
};

const PALETTE_LIGHT: Palette = {
  fill0: "#FFFFFF",
  fill1: "#F1F5FB",
  fill2: "#DCE5F2",
  rim: "rgba(59,130,246,0.35)",
  grid: "rgba(37,99,235,0.18)",
  land: "rgba(37,99,235,0.55)",
  cityGlow0: "rgba(37,99,235,0.55)",
  cityGlow1: "rgba(37,99,235,0.10)",
  cityRing: "rgba(37,99,235,0.55)",
  cityDot: "#2563EB",
  outerGlow: "rgba(59,130,246,0.18)",
};

interface TeamGlobeProps {
  cities?: City[];
  ariaLabel?: string;
  className?: string;
  labelsOnHover?: boolean;
  glowIntensity?: number;
}

export function TeamGlobe({
  cities = TEAM_CITIES,
  ariaLabel = "Глобус с городами команды",
  className = "max-w-xl",
  labelsOnHover = false,
  glowIntensity = 1,
}: TeamGlobeProps = {}) {
  const [phase, setPhase] = useState(0);
  const [hover, setHover] = useState<number | null>(null);
  const [landRings, setLandRings] = useState<number[][][] | null>(null);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    let cancelled = false;
    fetch("/data/world-land-110m.geojson")
      .then((r) => r.json())
      .then((g: LandGeoJson) => {
        if (!cancelled) setLandRings(flattenLandRings(g));
      })
      .catch(() => {
        // нет данных — глобус всё равно отрендерится с одной только сеткой
      });
    return () => {
      cancelled = true;
    };
  }, []);

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

  const lon0 = 55 + 22 * Math.sin(phase);
  const lat0 = 48 + 4 * Math.sin(phase * 0.5);

  const isLight = mounted && resolvedTheme === "light";
  const p = isLight ? PALETTE_LIGHT : PALETTE_DARK;

  const parallelPaths = PARALLELS.map((pts) =>
    projectLatLonPath(pts, lat0, lon0),
  );
  const meridianPaths = MERIDIANS.map((pts) =>
    projectLatLonPath(pts, lat0, lon0),
  );
  const landPaths = landRings
    ? landRings.map((ring) => projectGeoRing(ring, lat0, lon0))
    : [];

  const cityProj = cities.map((c) => ({
    ...c,
    ...project(c.lat, c.lon, lat0, lon0),
  }));

  return (
    <div
      className={`relative mx-auto w-full aspect-square ${className}`}
    >
      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle at 35% 30%, ${p.outerGlow}, transparent 62%)`,
          filter: "blur(40px)",
          opacity: glowIntensity,
        }}
      />

      <svg
        viewBox={`0 0 ${VB} ${VB}`}
        className="relative w-full h-full"
        aria-label={ariaLabel}
      >
        <defs>
          <radialGradient id="globe-fill" cx="35%" cy="30%" r="80%">
            <stop
              offset="0%"
              stopColor={p.fill0}
              stopOpacity={isLight ? 1 : 0.55}
            />
            <stop
              offset="55%"
              stopColor={p.fill1}
              stopOpacity={isLight ? 1 : 0.9}
            />
            <stop
              offset="100%"
              stopColor={p.fill2}
              stopOpacity={isLight ? 1 : 0.96}
            />
          </radialGradient>
          <radialGradient id="globe-rim" cx="50%" cy="50%" r="50%">
            <stop offset="92%" stopColor="transparent" />
            <stop offset="100%" stopColor={p.rim} />
          </radialGradient>
          <radialGradient id="city-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={p.cityGlow0} />
            <stop offset="55%" stopColor={p.cityGlow1} />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <clipPath id="globe-clip">
            <circle cx={C} cy={C} r={R} />
          </clipPath>
        </defs>

        <circle cx={C} cy={C} r={R} fill="url(#globe-fill)" />

        <g clipPath="url(#globe-clip)">
          {/* контуры суши */}
          <g
            stroke={p.land}
            strokeWidth="1"
            strokeLinejoin="round"
            strokeLinecap="round"
            fill="none"
            style={{ pointerEvents: "none" }}
          >
            {landPaths.map((d, i) =>
              d ? <path key={`l-${i}`} d={d} /> : null,
            )}
          </g>
          {/* меридианы и параллели */}
          <g
            stroke={p.grid}
            strokeWidth="0.9"
            fill="none"
            style={{ pointerEvents: "none" }}
          >
            {parallelPaths.map((d, i) => (
              <path key={`p-${i}`} d={d} />
            ))}
          </g>
          <g
            stroke={p.grid}
            strokeWidth="0.9"
            fill="none"
            style={{ pointerEvents: "none" }}
          >
            {meridianPaths.map((d, i) => (
              <path key={`m-${i}`} d={d} />
            ))}
          </g>
        </g>

        <circle
          cx={C}
          cy={C}
          r={R}
          fill="url(#globe-rim)"
          style={{ pointerEvents: "none" }}
        />

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
                r="2.5"
                fill="none"
                stroke={p.cityRing}
                strokeWidth="0.8"
                style={{
                  animation: `team-globe-ring 3s ease-out ${i * 0.6}s infinite`,
                  transformOrigin: `${c.x}px ${c.y}px`,
                }}
              />
              <circle
                cx={c.x}
                cy={c.y}
                r={active ? 2.75 : 2}
                fill={p.cityDot}
                style={{ transition: "r 0.3s" }}
              />
            </g>
          );
        })}
      </svg>

      <ul className="absolute inset-0 pointer-events-none">
        {cityProj.map((c, i) => {
          if (!c.visible) return null;
          const active = hover === i;
          if (labelsOnHover && !active) return null;
          const opacity = Math.min(1, c.cosc * 3);
          const xPct = (c.x / VB) * 100;
          const yPct = (c.y / VB) * 100;
          const isLeft = c.x < C;
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
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-2xl text-xs font-medium border whitespace-nowrap transition-all ${
                    active
                      ? "bg-[#3B82F6]/20 border-[#3B82F6]/40 text-heading"
                      : "bg-overlay-3 border-glass-border text-body"
                  }`}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{
                      backgroundColor: p.cityDot,
                      boxShadow: active
                        ? `0 0 8px ${p.cityGlow0}`
                        : `0 0 4px ${p.cityRing}`,
                    }}
                  />
                  <span className="flex flex-col leading-tight">
                    <span className="font-heading font-semibold text-heading">
                      {c.name}
                    </span>
                    {c.description ? (
                      <span className="text-[11px] text-dim">
                        {c.description}
                      </span>
                    ) : null}
                  </span>
                </span>
              </div>
            </li>
          );
        })}
      </ul>

      <style jsx>{`
        @keyframes team-globe-ring {
          0% {
            r: 2.5;
            opacity: 0.85;
          }
          100% {
            r: 18;
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
