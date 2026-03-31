import { Logo } from "@/components/logo";

export function Footer() {
  return (
    <footer className="relative py-16 px-6 border-t border-glass-border">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
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
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:+74951234567"
                  className="text-sm text-dimmer hover:text-body transition-colors duration-300"
                >
                  +7 (495) 123-45-67
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@b2b-dvizhenie.ru"
                  className="text-sm text-dimmer hover:text-body transition-colors duration-300"
                >
                  hello@b2b-dvizhenie.ru
                </a>
              </li>
              <li>
                <span className="text-sm text-dimmer">Москва, Россия</span>
              </li>
            </ul>
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
