"use client";

import { TeamGlobe, type City } from "@/components/team-globe";

const CLIENT_CITIES: City[] = [
  { name: "Москва — Веста", lat: 55.75, lon: 37.62 },
  { name: "Нижний Новгород — Древиз", lat: 56.33, lon: 44.0 },
  { name: "Воронеж — СТРОЙМИКС", lat: 51.66, lon: 39.2 },
  { name: "Киров — Кристалл", lat: 58.6, lon: 49.66 },
  { name: "Уфа — РЭЙД-21", lat: 54.74, lon: 55.97 },
  { name: "Екатеринбург — РОСЭК", lat: 56.84, lon: 60.61 },
  { name: "Новосибирск — Ирбис", lat: 55.03, lon: 82.92 },
];

export function ClientsGlobe() {
  return (
    <section className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-14 text-center">
          <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#60A5FA]">
            География клиентов
          </span>
          <h2 className="font-heading font-bold text-[clamp(28px,4.5vw,42px)] tracking-[-0.02em] text-heading mt-3">
            B2B Движение работает{" "}
            <span className="gradient-text">по всей России</span>
          </h2>
          <p className="text-base sm:text-lg text-subtle max-w-2xl mx-auto leading-relaxed mt-4">
            От Москвы до Новосибирска — наши клиенты автоматизируют оптовые
            продажи в разных отраслях и регионах.
          </p>
        </div>

        <TeamGlobe
          cities={CLIENT_CITIES}
          ariaLabel="Глобус с городами клиентов B2B Движения"
        />
      </div>
    </section>
  );
}
