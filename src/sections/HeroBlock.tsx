import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { resolveAsset } from "@/lib/assets";
import { getAllDevelopments } from "@/lib/content";
import { useTranslation } from "react-i18next";
import { SquarePen, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

interface HeroBlockProps {
  data: {
    id: string;
    title?: string;
    subtitle?: string;
    media?: string;
    cta?: {
      label: string;
      href: string;
    };
    cta_secondary?: {
      label: string;
      href: string;
    };
  };
  namespace: string;
}

export function HeroBlock({ data, namespace }: HeroBlockProps) {
  const { t } = useTranslation(namespace);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const developments = getAllDevelopments();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <section className="hero-block relative flex items-center overflow-hidden image-overlay-gradient" style={{ minHeight: 'var(--hero-min-height)' }}>
      {/* Background */}
      <div className="hero-block-background absolute inset-0 z-0 pointer-events-none">
        {data.media && (
          <img
            src={resolveAsset(data.media)}
            alt={t(`${data.id}.title`)}
            className="w-full h-full object-cover img-zoom"
            loading="eager"
            fetchPriority="high"
          />
        )}
      </div>


      {/* Content */}
      <Container className="hero-block-content relative z-20">
        <div className="hero-block-content-wrapper max-w-3xl text-left">
          <h1 className="h1 text-white mb-4">
            {t(`${data.id}.title`, { defaultValue: data.title })}
          </h1>
          {(data.subtitle || t(`${data.id}.subtitle`, { defaultValue: data.subtitle })) && (
            <p className="body-l text-white max-w-xl mb-8">
              {t(`${data.id}.subtitle`, { defaultValue: data.subtitle })}
            </p>
          )}

          <div className="flex flex-wrap justify-start relative" style={{ gap: 'var(--hero-button-gap)' }}>
            {data.cta && (
              <Button 
                asChild 
                size="lg"
                className="dropdown-btn-large rounded-[4px]"
                style={{ minWidth: 'var(--hero-button-min-width)' }}
              >
                <a href={data.cta.href} className="flex items-center justify-center gap-2">
                  {t(`${data.id}.contact_agent`, { defaultValue: "Contact Agent" })}
                  <SquarePen className="h-4 w-4" style={{ width: 'var(--icon-sm)', height: 'var(--icon-sm)' }} />
                </a>
              </Button>
            )}
            
            <div className="relative" ref={dropdownRef}>
              <Button 
                variant="outline" 
                size="lg"
                style={{ 
                  minWidth: 'var(--hero-button-min-width)',
                  gap: 'var(--component-gap-medium)'
                }}
                className="dropdown-btn-large flex items-center justify-between px-6 bg-white text-primary border-none hover:bg-gray-50 rounded-[4px]"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <span>View Collection</span>
                <ChevronDown 
                  className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                  style={{ width: 'var(--icon-sm)', height: 'var(--icon-sm)' }}
                />
              </Button>

              {isDropdownOpen && developments && developments.length > 0 && (
                <div 
                  className="absolute top-full left-0 bg-white border border-gray-100 rounded-xl shadow-xl py-2 z-[60] animate-fade-in-fast"
                  style={{ 
                    width: 'var(--hero-dropdown-width)',
                    marginTop: 'var(--component-gap-small)',
                    borderRadius: 'var(--component-border-radius)',
                    maxHeight: '400px',
                    overflowY: 'auto'
                  }}
                >
                  {developments
                    .filter(dev => dev.id !== 'style-editor')
                    .map((dev) => (
                      <Link
                        key={dev.id}
                        to={dev.id === 'new-build-golf-properties-costa-blanca' ? '/' : `/developments/${dev.id}`}
                        className="block px-6 py-3 small underline hover:bg-muted/50 transition-colors whitespace-nowrap"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        {dev.name}
                      </Link>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
