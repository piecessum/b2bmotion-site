import { Logo } from "@/components/logo";
import Image from "next/image";

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
                  className="opacity-70 hover:opacity-100 transition-opacity duration-300"
                  aria-label="VK"
                >
                  <Image
                    src="/vk.svg"
                    alt="VK"
                    width={24}
                    height={24}
                    className="grayscale brightness-0 invert"
                  />
                </a>
                <a
                  href="https://rutube.ru/channel/63705491/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="opacity-70 hover:opacity-100 transition-opacity duration-300"
                  aria-label="RuTube"
                >
                  <Image
                    src="/rutube.svg"
                    alt="RuTube"
                    width={24}
                    height={24}
                    className="grayscale brightness-0 invert"
                  />
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
