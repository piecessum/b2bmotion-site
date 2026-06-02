import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CTASection } from "@/components/cta-section";
import { IntegrationsSections } from "./integrations-client";

export const metadata = {
  title: "Интеграции — B2B Движение",
  description:
    "Интеграция B2B Движения с 1С (УТ, КА, УПП), ERP-системами, БД РАЭК для электротехники, API для клиентов, UniSender и платежами. Полный список синхронизируемых данных и этапы внедрения.",
};

export default function IntegrationsPage() {
  return (
    <main className="relative min-h-screen bg-page-alt noise-overlay overflow-x-clip">
      <Navbar />
      <IntegrationsSections />
      <CTASection />
      <Footer />
    </main>
  );
}
