import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { resolveAsset } from "@/lib/assets";
import { getAllDevelopments } from "@/lib/content";
import { useTranslation } from "react-i18next";
import { ChevronRight, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

interface CallToActionSectionProps {
  data: {
    id: string;
    media?: string;
    title?: string;
    subtitle?: string;
    cta?: {
      label: string;
      href: string;
    };
  };
  namespace: string;
}

export function CallToActionSection({ data, namespace }: CallToActionSectionProps) {
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
    <section className="cta-section relative h-[56.25rem] w-full flex flex-col justify-start items-start flex-nowrap image-overlay-gradient">
      <div className="cta-background relative h-[56.25rem] w-full">
        {data.media ? (
          <img
            src={data.media}
            alt={t(`${data.id}.title`)}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-600 to-green-600"></div>
        )}

        <div className="cta-overlay absolute inset-0 z-10" />

        <div className="cta-content absolute inset-0 z-20 flex flex-col justify-center items-center pb-24 md:pt-32">
          <div className="cta-text-content max-w-[75vw] text-center text-white">
            <h1 className="cta-title h1 mb-4 text-white">
              {t(`${data.id}.title`, { defaultValue: data.title })}
            </h1>

            <p className="cta-subtitle body-l mb-8 text-white">
              {t(`${data.id}.subtitle`, { defaultValue: data.subtitle })}
            </p>

            <div className="relative flex justify-center" ref={dropdownRef}>
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
                  className="absolute top-full left-1/2 transform -translate-x-1/2 bg-white border border-gray-100 rounded-xl shadow-xl py-2 z-[60] animate-fade-in-fast"
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
      </div>
    </section>
  );
}
