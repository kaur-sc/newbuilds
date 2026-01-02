import { Container } from "@/components/ui/container";
import { type Section as SectionData } from "@/models/landing-page";
import { resolveAsset } from "@/lib/assets";
import { useTranslation } from "react-i18next";
import { Check, ChevronLeft, ChevronRight, Flag, Armchair, Globe, Plane, BadgeEuro, ScanFace } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function FeaturesSection({ data, namespace }: { data: SectionData, namespace: string }) {
  const { t } = useTranslation(namespace);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!data.enabled) return null;

  const layout = data.layout || 'grid';
  const columns = data.columns || 3;
  const items = (t(`${data.id}.items`, { returnObjects: true }) as any[]) || data.items || [];
  const description = t(`${data.id}.description`, "");

  if (layout === 'split') {
    return (
      <section id={data.id} className="split-layout">
        <div className="split-image relative overflow-hidden">
          <img 
            src={resolveAsset(data.media as string)} 
            alt={t(`${data.id}.title`)} 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="split-content bg-dark-blue flex flex-col justify-center">
          <div className="max-w-xl animate-fade-in-up px-4 md:px-0">
            <h2 className="h2 text-white mb-6">{t(`${data.id}.title`)}</h2>
            {t(`${data.id}.subtitle`) && (
              <p className="body-l text-white/90 mb-8">{t(`${data.id}.subtitle`)}</p>
            )}
            
            {description && (
              <p className="body text-white/80 mb-8">{description}</p>
            )}

            {items && Array.isArray(items) && items.length > 0 && typeof items[0] === 'object' && (
              <div className="space-y-6 mb-10">
                {items.map((item: any, idx: number) => (
                  <div key={idx} className="flex gap-4">
                    <div className="mt-1">
                      <Check className="h-5 w-5 text-secondary" />
                    </div>
                    <div>
                      <h3 className="h3 text-white mb-1">{item.title}</h3>
                      <p className="body text-white/80">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {(data.cta || t(`${data.id}.cta.label`, "")) && (
              <Button asChild className="btn-primary">
                <a href={data.cta?.href || t(`${data.id}.cta.href`, "#")}>
                    {data.cta?.label || t(`${data.id}.cta.label`, "Learn More")}
                </a>
              </Button>
            )}
          </div>
        </div>
      </section>
    );
  }

  if (layout === 'carousel') {
    const next = () => setCurrentIndex((prev) => (prev + 1) % items.length);
    const prev = () => setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);

    return (
      <section id={data.id} className="modern-section bg-muted/30">
        <Container className="container-modern">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 animate-fade-in-up">
            <div className="max-w-2xl">
              <h2 className="h2 mb-4">{t(`${data.id}.title`)}</h2>
              {t(`${data.id}.subtitle`) && (
                <p className="body-l">{t(`${data.id}.subtitle`)}</p>
              )}
            </div>
            <div className="flex gap-4 mt-6 md:mt-0">
              <button 
                onClick={prev}
                className="p-3 rounded-full border border-border hover:bg-white hover:border-primary transition-all active:scale-95"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button 
                onClick={next}
                className="p-3 rounded-full border border-border hover:bg-white hover:border-primary transition-all active:scale-95"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="relative overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out gap-8"
              style={{ transform: `translateX(calc(-${currentIndex * 100}% - ${currentIndex * 2}rem))` }}
            >
              {items.map((item: any, idx: number) => (
                <div 
                  key={idx} 
                  className="min-w-full md:min-w-[calc(50%-1rem)] lg:min-w-[calc(33.333%-1.34rem)] group bg-white p-4 rounded-2xl shadow-sm border border-border/50"
                >
                  <div className="aspect-[4/3] overflow-hidden rounded-xl mb-6 ring-1 ring-border/10">
                    <img 
                      src={resolveAsset(item.image)} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <h3 className="h3 mb-2">{item.title}</h3>
                  <p className="body mb-6 line-clamp-2">{item.description}</p>
                  {item.cta && (
                    <Button asChild className="btn-outline w-full rounded-xl">
                      <a href={item.cta.href}>{item.cta.label}</a>
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section id={data.id} className="modern-section bg-white">
      <Container className="container-modern">
        <div className="text-left mb-16 animate-fade-in-up">
          <h2 className="h2 mb-4">{t(`${data.id}.title`)}</h2>
          {t(`${data.id}.subtitle`) && (
            <p className="body-l max-w-3xl">{t(`${data.id}.subtitle`)}</p>
          )}
        </div>

        <div className={`grid gap-8 ${columns === 2 ? 'md:grid-cols-2' : (columns === 3 ? 'md:grid-cols-3' : 'md:grid-cols-1')}`}>
          {items.map((item: any, idx: number) => (
            <div 
              key={idx} 
              className="group animate-fade-in-up" 
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              {item.image && (
                <div className="aspect-[4/3] overflow-hidden rounded-lg mb-6 shadow-sm group-hover:shadow-md transition-shadow">
                  <img 
                    src={resolveAsset(item.image)} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}
              
              {item.icon ? (
                 <div className="flex flex-row items-start gap-4">
                    <div className="flex-shrink-0 mt-1">
                      {(() => {
                        const iconMap: Record<string, any> = {
                          Flag, Armchair, Globe, Plane, BadgeEuro
                        };
                        const IconComponent = iconMap[item.icon] || ScanFace;
                        return <IconComponent className="h-8 w-8 text-[#10b981]" strokeWidth={1.5} />;
                      })()}
                    </div>
                    <div>
                      <h3 className="h3 mb-2">{item.title}</h3>
                      <p className="body mb-4">{item.description}</p>
                    </div>
                 </div>
              ) : (
                <>
                  <h3 className="h3 mb-2">{item.title}</h3>
                  <p className="body mb-4">{item.description}</p>
                </>
              )}

              {item.cta && (
                  <Button asChild className="btn-secondary w-full">
                      <a href={item.cta.href}>{item.cta.label}</a>
                  </Button>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
