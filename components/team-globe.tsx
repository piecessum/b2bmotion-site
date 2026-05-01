"use client";

import { useEffect, useState } from "react";

/**
 * Стилизованный глобус с подсвеченными городами команды.
 * Орфографическая проекция с центром около 55°N / 55°E — Воронеж, Санкт-Петербург,
 * Бийск и Батуми оказываются в видимом полушарии. Координаты пересчитаны
 * заранее в проценты внутри SVG viewBox 200×200, чтобы не тащить трансформации.
 */

interface City {
  name: string;
  /** Доля от диаметра, [0..1] от левого края диска. */
  cx: number;
  /** Доля от диаметра, [0..1] от верхнего края диска. */
  cy: number;
  /** Задержка пульсации (сек) — чтобы маркеры не моргали в унисон. */
  delay: number;
}

const cities: City[] = [
  { name: "Санкт-Петербург", cx: 0.42, cy: 0.28, delay: 0 },
  { name: "Воронеж", cx: 0.46, cy: 0.4, delay: 0.6 },
  { name: "Батуми", cx: 0.5, cy: 0.55, delay: 1.2 },
  { name: "Бийск", cx: 0.74, cy: 0.4, delay: 1.8 },
];

export function TeamGlobe() {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  // Лёгкое колебание глобуса — имитирует медленное вращение.
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      setPhase(((t - start) / 12000) % 1);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const meridianShift = Math.sin(phase * Math.PI * 2) * 6; // px

  return (
    <div className="relative mx-auto w-full max-w-md aspect-square">
      {/* Внешнее свечение */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 35% 30%, rgba(59,130,246,0.25), transparent 60%)",
          filter: "blur(40px)",
        }}
      />

      <svg
        viewBox="0 0 200 200"
        className="relative w-full h-full"
        aria-label="Карта городов команды"
      >
        <defs>
          <radialGradient id="globe-fill" cx="35%" cy="30%" r="80%">
            <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.4" />
            <stop offset="55%" stopColor="#0b1230" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#000" stopOpacity="0.95" />
          </radialGradient>

          <radialGradient id="globe-rim" cx="50%" cy="50%" r="50%">
            <stop offset="92%" stopColor="transparent" />
            <stop offset="100%" stopColor="rgba(96,165,250,0.6)" />
          </radialGradient>

          <radialGradient id="city-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(96,165,250,0.9)" />
            <stop offset="60%" stopColor="rgba(96,165,250,0.15)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>

        {/* Тело глобуса */}
        <circle cx="100" cy="100" r="92" fill="url(#globe-fill)" />

        {/* Сетка широт — горизонтальные эллипсы */}
        <g
          stroke="rgba(96,165,250,0.18)"
          strokeWidth="0.6"
          fill="none"
          style={{ pointerEvents: "none" }}
        >
          <ellipse cx="100" cy="100" rx="90" ry="20" />
          <ellipse cx="100" cy="100" rx="90" ry="45" />
          <ellipse cx="100" cy="100" rx="90" ry="70" />
          <ellipse cx="100" cy="100" rx="90" ry="86" />
        </g>

        {/* Сетка долгот — слегка анимированная "вращением" */}
        <g
          stroke="rgba(96,165,250,0.18)"
          strokeWidth="0.6"
          fill="none"
          style={{ pointerEvents: "none" }}
        >
          <ellipse
            cx="100"
            cy="100"
            rx={20 + meridianShift}
            ry="90"
            opacity="0.7"
          />
          <ellipse
            cx="100"
            cy="100"
            rx={45 + meridianShift}
            ry="90"
            opacity="0.6"
          />
          <ellipse
            cx="100"
            cy="100"
            rx={70 + meridianShift}
            ry="90"
            opacity="0.5"
          />
          <ellipse cx="100" cy="100" rx="86" ry="90" opacity="0.4" />
        </g>

        {/* Размытые "континенты" — абстрактные пятна суши */}
        <g
          fill="rgba(96,165,250,0.18)"
          style={{ pointerEvents: "none", filter: "blur(1.5px)" }}
        >
          <path d="M 60 60 Q 80 50 100 65 Q 120 55 140 70 Q 145 90 130 95 Q 100 80 80 90 Q 65 80 60 60 Z" />
          <path d="M 70 110 Q 90 105 115 115 Q 130 130 110 140 Q 90 135 75 125 Z" />
          <path d="M 130 105 Q 150 100 165 115 Q 160 130 140 130 Q 130 120 130 105 Z" />
        </g>

        {/* Тонкий блик по краю диска */}
        <circle
          cx="100"
          cy="100"
          r="92"
          fill="url(#globe-rim)"
          style={{ pointerEvents: "none" }}
        />

        {/* Точки городов */}
        {cities.map((c, i) => {
          const cx = c.cx * 200;
          const cy = c.cy * 200;
          const active = hoverIndex === i;
          return (
            <g
              key={c.name}
              onMouseEnter={() => setHoverIndex(i)}
              onMouseLeave={() => setHoverIndex(null)}
              style={{ cursor: "pointer" }}
            >
              {/* Большое свечение */}
              <circle
                cx={cx}
                cy={cy}
                r={active ? 16 : 12}
                fill="url(#city-glow)"
                style={{
                  transition: "r 0.3s ease",
                  animation: `pulse-glow 3s ease-in-out ${c.delay}s infinite`,
                  transformOrigin: `${cx}px ${cy}px`,
                }}
              />
              {/* Кольцо-волна */}
              <circle
                cx={cx}
                cy={cy}
                r="3"
                fill="none"
                stroke="rgba(96,165,250,0.6)"
                strokeWidth="0.8"
                style={{
                  animation: `pulse-ring 3s ease-out ${c.delay}s infinite`,
                  transformOrigin: `${cx}px ${cy}px`,
                }}
              />
              {/* Сама точка */}
              <circle
                cx={cx}
                cy={cy}
                r={active ? 3.5 : 2.5}
                fill="#60A5FA"
                style={{ transition: "r 0.3s ease" }}
              />
            </g>
          );
        })}
      </svg>

      {/* Легенда — внешние подписи с линиями к точкам */}
      <ul className="absolute inset-0 pointer-events-none">
        {cities.map((c, i) => {
          const isLeft = c.cx < 0.5;
          const top = `${c.cy * 100}%`;
          return (
            <li
              key={c.name}
              className="absolute pointer-events-auto"
              style={{
                top,
                [isLeft ? "right" : "left"]: `${(1 - Math.abs(c.cx - 0.5) - 0.5) * 100 + 50}%`,
                transform: "translateY(-50%)",
              }}
              onMouseEnter={() => setHoverIndex(i)}
              onMouseLeave={() => setHoverIndex(null)}
            >
              <span
                className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border transition-all ${
                  hoverIndex === i
                    ? "bg-[#3B82F6]/20 border-[#3B82F6]/40 text-heading"
                    : "bg-overlay-3 border-glass-border text-body"
                }`}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full bg-[#60A5FA]"
                  style={{
                    boxShadow:
                      hoverIndex === i
                        ? "0 0 8px rgba(96,165,250,0.9)"
                        : "0 0 4px rgba(96,165,250,0.5)",
                  }}
                />
                {c.name}
              </span>
            </li>
          );
        })}
      </ul>

      <style jsx>{`
        @keyframes pulse-glow {
          0%, 100% {
            opacity: 0.55;
          }
          50% {
            opacity: 1;
          }
        }
        @keyframes pulse-ring {
          0% {
            r: 3;
            opacity: 0.9;
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
