import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import type { LandingPageData } from "@/models/landing-page";
import { Menu } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { LanguageSwitcher } from "./LanguageSwitcher";

interface NavbarProps {
  data: LandingPageData;
}

export function Navbar({ data }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { name } = data;
  
  // Extract contact CTA if present in sections to show in Nav
  const contactSection = data.sections.find(s => s.type === 'contact' && s.enabled);
  const contactCta = contactSection?.cta;

  // Determine the home path for this development
  const homePath = data.id === 'sunny-hills' 
    ? '/' 
    : (data.id === 'costa-blanca' ? '/new-build-golf-properties-costa-blanca' : `/developments/${data.id}`);

  const location = useLocation();
  const handleLogoClick = (e: React.MouseEvent) => {
    if (location.pathname === homePath) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <nav className="navbar">
      <Container className="navbar-container">
        <Link 
          to={homePath} 
          className="site-title"
          onClick={handleLogoClick}
        >
          {name}
        </Link>
        
        {/* Desktop Nav */}
        <div className="nav-desktop">
          {data.sections.filter(s => s.enabled && s.type !== 'hero').map(section => (
            <a 
              key={section.id} 
              href={`#${section.id}`}
              className="nav-link"
            >
              {section.title || section.type}
            </a>
          ))}
          {contactCta && (
            <Button asChild>
              <a href={contactCta.href}>{contactCta.label}</a>
            </Button>
          )}
          <div className="nav-language-separator">
            <LanguageSwitcher />
          </div>
        </div>

        {/* Mobile Toggle - Only shows on mobile */}
        <Button variant="ghost" size="icon" className="nav-desktop-mobile-show" onClick={() => setIsOpen(!isOpen)}>
          <Menu className="h-5 w-5" />
        </Button>
      </Container>
      
      {/* Mobile Menu - Only shows on mobile */}
      {isOpen && (
        <div className="mobile-menu nav-desktop-mobile-show border-t nav-mobile-padding nav-mobile-gap">
           {data.sections.filter(s => s.enabled && s.type !== 'hero').map(section => (
            <a 
              key={section.id} 
              href={`#${section.id}`}
              className="mobile-menu-links block"
              onClick={() => setIsOpen(false)}
            >
              {section.title || section.type}
            </a>
          ))}
          {contactCta && (
             <Button className="w-full" asChild>
              <a href={contactCta.href}>{contactCta.label}</a>
            </Button>
          )}
          <div className="nav-mobile-center pt-2">
            <LanguageSwitcher />
          </div>
        </div>
      )}
    </nav>
  );
}
