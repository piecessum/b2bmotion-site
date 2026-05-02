"use client";

import { TeamGlobe, type City } from "@/components/team-globe";

const CLIENT_CITIES: City[] = [
  { name: "Москва", lat: 55.75, lon: 37.62, description: "Веста, Древиз" },
  {
    name: "Нижний Новгород",
    lat: 56.33,
    lon: 44.0,
    description: "Древиз",
  },
  { name: "Брянск", lat: 53.24, lon: 34.36, description: "Древиз" },
  { name: "Курск", lat: 51.73, lon: 36.19, description: "Древиз" },
  { name: "Воронеж", lat: 51.66, lon: 39.2, description: "СТРОЙМИКС" },
  { name: "Сыктывкар", lat: 61.67, lon: 50.84, description: "Древиз" },
  {
    name: "Киров",
    lat: 58.6,
    lon: 49.66,
    description: "Кристалл, Древиз",
  },
  { name: "Уфа", lat: 54.74, lon: 55.97, description: "РЭЙД-21" },
  { name: "Пермь", lat: 58.01, lon: 56.25, description: "Древиз" },
  {
    name: "Екатеринбург",
    lat: 56.84,
    lon: 60.61,
    description: "РОСЭК, Древиз, Ирбис",
  },
  {
    name: "Новосибирск",
    lat: 55.03,
    lon: 82.92,
    description: "ПРОТЭК, Ирбис",
  },
  { name: "Хабаровск", lat: 48.48, lon: 135.08, description: "Ирбис" },
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
            От Москвы до Хабаровска — наши клиенты автоматизируют оптовые
            продажи в&nbsp;{CLIENT_CITIES.length} городах России: от
            центральных регионов до Сибири, Урала и&nbsp;Дальнего Востока.
          </p>
          <p className="text-sm text-dimmer mt-3">
            Наведите на точку, чтобы увидеть город и компании
          </p>
        </div>

        <TeamGlobe
          cities={CLIENT_CITIES}
          ariaLabel="Глобус с городами клиентов B2B Движения"
          className="max-w-3xl"
          labelsOnHover
        />
      </div>
    </section>
  );
}
