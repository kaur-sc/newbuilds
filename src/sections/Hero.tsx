import { Button } from "@/components/ui/button";
import { type Section as SectionData } from "@/models/landing-page";
import { resolveAsset } from "@/lib/assets";
import { useTranslation } from "react-i18next";
import { ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/container";

export function HeroSection({ data, namespace }: { data: SectionData, namespace: string }) {
  const { t } = useTranslation(namespace);
  if (!data.enabled) return null;
  
  const layout = data.layout || 'centered';
  const isLeftAligned = layout === 'left-aligned';

  return (
    <section 
      id={data.id}
      className={`relative min-h-[85vh] flex items-center overflow-hidden ${isLeftAligned ? 'bg-white' : 'hero-parallax image-overlay-gradient'}`}
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        {data.media && typeof data.media === 'string' && (
          <img 
            src={resolveAsset(data.media as string)} 
            alt={t(`${data.id}.title`)} 
            className={`w-full h-full object-cover ${isLeftAligned ? 'object-right lg:w-1/2 lg:ml-auto' : 'img-zoom'}`}
            loading="eager"
            fetchPriority="high"
          />
        )}
        {!isLeftAligned && <div className="absolute inset-0 gradient-overlay z-10" />}
      </div>

      <Container className="relative z-20 pointer-events-none">
        <div className={`max-w-2xl pointer-events-auto animate-fade-in-up ${isLeftAligned ? 'text-left lg:py-20' : 'text-center mx-auto'}`}>
          <h1 className="h1 mb-6">
            {t(`${data.id}.title`)}
          </h1>
          {t(`${data.id}.subtitle`) && (
            <p className="body-l mb-10">
              {t(`${data.id}.subtitle`)}
            </p>
          )}
          
          <div className={`flex flex-wrap gap-4 ${isLeftAligned ? 'justify-start' : 'justify-center'}`}>
            {data.cta ? (
              <Button asChild className="btn-primary min-w-[200px]">
                <a href={data.cta.href}>{data.cta.label}</a>
              </Button>
            ) : (
                <Button asChild className="btn-primary min-w-[200px]">
                    <a href="#contact">{t(`${data.id}.cta_primary`, "Get Started")}</a>
                </Button>
            )}
            <Button asChild className="btn-secondary min-w-[200px]">
              <a href="#explore" className="flex items-center gap-2">
                {t(`${data.id}.cta_explore`, "Explore")} <ChevronRight className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
