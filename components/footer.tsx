import { Logo } from "@/components/logo";

function VkIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-5 h-5"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M15.073 2H8.937C5.006 2 2 4.988 2 8.918v6.164C2 18.992 4.988 22 8.918 22h6.164C18.992 22 22 19.012 22 15.082V8.918C22 4.988 19.012 2 15.073 2zM17.887 13.856c.458.45.608.74.608.74s.06.127-.036.25c-.27.358-1.898.36-1.898.36s-4.08.01-4.87-.018c-.42-.015-.818-.134-1.115-.427-.404-.397-.382-1.12-.382-1.72 0-1.88.284-2.812 1.158-3.257.404-.205.875-.268 1.398-.268.745 0 1.36.196 1.36.196s.13.087.17.294c.048.25.01 1.69.78 2.56.707.796 1.51.88 1.89.88h.937s.28.016.42.234c.14.22.04.63-.06.91-.21.59-.83 1.74-1.75 2.62-.17.16-.34.31-.51.45zm-6.82-3.44c-.16.21-.29.45-.4.71-.29.68-.29 1.25-.29 1.25s-.03.15-.17.18c-.41.09-.89-.15-1.25-.55-.54-.6-.52-1.53-.52-1.53s-.02-.93.59-1.61c.56-.62 1.35-.82 2.02-.82 0 0 .61-.02.77.19.11.14.02.42-.02.54-.15.43-.41 1.13-.73 1.64z" />
    </svg>
  );
}

function RuTubeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-5 h-5"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M23.85 6.68c-.29-1.08-1.13-1.92-2.2-2.21C19.7 3.94 12 3.94 12 3.94s-7.7 0-9.65.53c-1.07.29-1.91 1.13-2.2 2.21C.15 8.63.15 12 .15 12s0 3.37.15 5.32c.29 1.08 1.13 1.92 2.2 2.21 1.95.53 9.65.53 9.65.53s7.7 0 9.65-.53c1.07-.29 1.91-1.13 2.2-2.21.15-1.95.15-5.32.15-5.32s0-3.37-.15-5.32zM9.75 15.08V8.92l5.33 3.08-5.33 3.08z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="relative py-16 px-6 border-t border-glass-border">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Logo */}
          <div>
            <a href="#" className="inline-block">
              <Logo gradient className="h-5 w-auto" />
            </a>
            <p className="mt-4 text-sm text-dim leading-relaxed">
              Автоматизация оптовых продаж с интеграцией 1С
            </p>
          </div>

          {/* Платформа */}
          <div>
            <h4 className="font-medium text-subtle mb-4 text-sm uppercase tracking-wider">
              Платформа
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Возможности", href: "#platform" },
                { label: "Цены", href: "#pricing" },
                { label: "Интеграции", href: "#solutions" },
                { label: "База знаний", href: "/wiki" },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-dimmer hover:text-body transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Компания */}
          <div>
            <h4 className="font-medium text-subtle mb-4 text-sm uppercase tracking-wider">
              Компания
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Клиенты", href: "#clients" },
                { label: "О нас", href: "#" },
                { label: "Карьера", href: "#" },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-dimmer hover:text-body transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Контакты */}
          <div>
            <h4 className="font-medium text-subtle mb-4 text-sm uppercase tracking-wider">
              Контакты
            </h4>
            <ul className="space-y-3 text-sm text-dimmer">
              <li>
                <a
                  href="tel:+74993503436"
                  className="hover:text-body transition-colors duration-300"
                >
                  +7 (499) 350-34-36
                </a>
              </li>
              <li>
                <a
                  href="mailto:ageev@b2bmotion.ru"
                  className="hover:text-body transition-colors duration-300"
                >
                  ageev@b2bmotion.ru
                </a>
              </li>
              <li className="pt-2">
                <p className="text-dimmest mb-1">Юридический адрес:</p>
                <p>РФ, 394005, Воронеж, ул. 60 Армии, д. 26, кв. 86</p>
              </li>
              <li>
                <p>ИНН 3666150357, ОКВЭД 62.01</p>
              </li>
            </ul>

            {/* Соц.сети */}
            <div className="mt-6">
              <h4 className="font-medium text-subtle mb-3 text-sm uppercase tracking-wider">
                Соц.сети
              </h4>
              <div className="flex items-center gap-4">
                <a
                  href="https://vk.com/3davinci"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-dimmer hover:text-body transition-colors duration-300"
                  aria-label="VK"
                >
                  <VkIcon />
                </a>
                <a
                  href="https://rutube.ru/channel/63705491/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-dimmer hover:text-body transition-colors duration-300"
                  aria-label="RuTube"
                >
                  <RuTubeIcon />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="section-divider mb-8" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-dimmest">
            &copy; ООО &laquo;ТриДаВинчи&raquo;, 2025
          </p>
          <div className="flex items-center gap-6">
            <a
              href="/privacy"
              className="text-sm text-dimmest hover:text-dim transition-colors duration-300"
            >
              Политика конфиденциальности
            </a>
            <a
              href="/agreement"
              className="text-sm text-dimmest hover:text-dim transition-colors duration-300"
            >
              Пользовательское соглашение
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
