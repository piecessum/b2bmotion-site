import Image from "next/image";

export function DeviceShowcase() {
  return (
    <section className="relative py-24 px-6 overflow-hidden">
      {/* Glow behind devices */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-[#3B82F6]/8 via-[#8B5CF6]/6 to-[#06B6D4]/8 blur-[120px] pointer-events-none opacity-40 dark:opacity-100" />

      <div className="max-w-6xl mx-auto">
        {/* Phone — mobile only, full width */}
        <div className="flex md:hidden justify-center mb-16">
          <div className="w-[70%] max-w-[300px] drop-shadow-[0_8px_30px_rgba(0,0,0,0.08)] dark:drop-shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
            <Image
              src="/mockups/phone.png"
              alt="B2B платформа на смартфоне"
              width={320}
              height={640}
              className="w-full h-auto"
              priority
            />
          </div>
        </div>

        {/* Devices container with perspective — desktop */}
        <div
          className="relative hidden md:flex items-end justify-center mb-16"
          style={{ perspective: "1200px" }}
        >
          {/* iPad — left */}
          <div className="relative z-10 -mr-12 lg:-mr-16 self-center">
            <div className="w-[280px] lg:w-[340px] drop-shadow-[0_8px_30px_rgba(0,0,0,0.08)] dark:drop-shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
              <Image
                src="/mockups/pad.png"
                alt="B2B платформа на планшете"
                width={680}
                height={510}
                className="w-full h-auto"
                priority
              />
            </div>
          </div>

          {/* Laptop — center */}
          <div className="relative z-20">
            <div className="w-[440px] lg:w-[540px] drop-shadow-[0_8px_30px_rgba(0,0,0,0.08)] dark:drop-shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
              <Image
                src="/mockups/laptop-hero.png"
                alt="B2B платформа на ноутбуке"
                width={1080}
                height={720}
                className="w-full h-auto"
                priority
              />
            </div>
          </div>

          {/* Phone — right */}
          <div className="relative z-10 -ml-12 lg:-ml-16 self-center">
            <div className="w-[130px] lg:w-[160px] drop-shadow-[0_8px_30px_rgba(0,0,0,0.08)] dark:drop-shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
              <Image
                src="/mockups/phone.png"
                alt="B2B платформа на смартфоне"
                width={320}
                height={640}
                className="w-full h-auto"
                priority
              />
            </div>
          </div>
        </div>

        {/* Text below */}
        <div className="text-center">
          <p className="font-heading font-bold text-[clamp(48px,8vw,72px)] tracking-[-0.03em] mb-4">
            <span className="gradient-text-animated">3 месяца</span>
          </p>
          <p className="text-xl md:text-2xl text-body mb-10">
            и у вас готовый к использованию магазин
          </p>
          <a
            href="#cta"
            className="inline-flex items-center gap-2 px-8 py-4 border border-overlay-8 text-subheading text-base font-medium rounded-2xl hover:bg-overlay-4 hover:border-border-default transition-all duration-300"
          >
            Оставить заявку
          </a>
        </div>
      </div>
    </section>
  );
}
