import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { type Section as SectionData } from "@/models/landing-page";
import { useTranslation } from "react-i18next";
import { ArrowRight, Check } from "lucide-react";

export function ContactSection({ data, namespace }: { data: SectionData, namespace: string }) {
  const { t } = useTranslation(namespace);
  if (!data.enabled) return null;

  return (
    <section id={data.id} className="modern-section bg-dark-blue py-24">
      <Container className="container-modern">
        <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
            <h2 className="h2 text-white mb-6">
                {t(`${data.id}.title`, data.title)}
            </h2>
            
            <p className="body-l text-white mb-12 max-w-2xl mx-auto">
                {t(`${data.id}.description`, data.content)}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
                <Button asChild className="btn-primary min-w-[240px]">
                    <a href={data.cta?.href || "#contact"}>
                        {t(`${data.id}.cta`, data.cta?.label || 'Get Started')}
                    </a>
                </Button>
                <Button asChild className="btn-outline text-white border-white hover:bg-white/10 min-w-[240px]">
                    <a href="tel:+34000000000" className="flex items-center justify-center gap-2">
                        {t(`${data.id}.call_us`, 'Speak to an Expert')} <ArrowRight className="h-5 w-5" />
                    </a>
                </Button>
            </div>

            <div className="mt-16 pt-12 border-t border-white/10 flex flex-wrap justify-center gap-8 small text-white/60">
                <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-secondary" />
                    <span>{t(`${data.id}.trust_1`, 'Free Information Pack')}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-secondary" />
                    <span>{t(`${data.id}.trust_2`, 'Direct Pricing')}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-secondary" />
                    <span>{t(`${data.id}.trust_3`, 'No Obligation')}</span>
                </div>
            </div>
        </div>
      </Container>
    </section>
  );
}
