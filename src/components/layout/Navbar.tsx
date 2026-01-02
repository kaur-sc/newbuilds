import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import type { LandingPageData } from "@/models/landing-page";
import { Menu, ChevronDown, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { getAllDevelopments } from "@/lib/content";
import { useTranslation } from "react-i18next";

interface NavbarProps {
  data: LandingPageData;
}

export function Navbar({ data }: NavbarProps) {
  const { t } = useTranslation(data.id);
  const [isOpen, setIsOpen] = useState(false);
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
    <nav className="navbar bg-white border-b border-gray-100 z-50 sticky top-0">
      <Container className="navbar-container h-20 flex items-center justify-between">
        <Link 
          to="/" 
          className="site-logo site-logo-text" 
          aria-label={`${t('nav.logo_main')} - ${t('nav.logo_sub')}`}
          title={`${t('nav.logo_main')} - ${t('nav.logo_sub')}`}
        >
          <span className="site-logo-main" itemProp="name">{t('nav.logo_main')}</span>
          <span className="site-logo-sub" itemProp="description">{t('nav.logo_sub')}</span>
        </Link>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-1 group py-2"
            >
              Golf Developments
              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-100 rounded-xl shadow-xl py-2 z-[60] animate-fade-in-fast">
                {developments
                  .filter(dev => dev.id !== 'style-editor')
                  .map((dev) => (
                    <Link
                      key={dev.id}
                      to={dev.id === 'new-build-golf-properties-costa-blanca' ? '/' : `/developments/${dev.id}`}
                      className="block px-6 py-3 small underline hover:bg-muted/50 transition-colors"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      {dev.name}
                    </Link>
                  ))}
              </div>
            )}
          </div>

          <Button asChild className="btn-primary rounded-[4px] px-4">
            <a href="#contact">{t('nav.contact_agent')}</a>
          </Button>

          <div className="h-6 w-px bg-gray-200 mx-2" />
          
          <LanguageSwitcher />
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-dark-blue"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </Container>
      
      {/* Mobile Menu */}
      {isOpen && (
        <div className="mobile-menu md:hidden fixed inset-x-0 top-20 bg-white border-b shadow-lg z-40 p-6 animate-fade-in">
          <div className="space-y-6">
            <div>
              <p className="caption text-gray-400 mb-4 tracking-widest uppercase">Golf Developments</p>
              <div className="grid gap-4">
                {developments
                  .filter(dev => dev.id !== 'style-editor')
                  .map((dev) => (
                    <Link
                      key={dev.id}
                      to={dev.id === 'new-build-golf-properties-costa-blanca' ? '/' : `/developments/${dev.id}`}
                      className="body-l"
                      onClick={() => setIsOpen(false)}
                    >
                      {dev.name}
                    </Link>
                  ))}
              </div>
            </div>
            
            <div className="pt-4 border-t border-gray-100">
              <Button asChild className="btn-primary w-full h-14 text-lg rounded-full">
                <a href="#contact" onClick={() => setIsOpen(false)}>{t('nav.contact_agent')}</a>
              </Button>
            </div>
            
            <div className="flex justify-center pt-4">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
