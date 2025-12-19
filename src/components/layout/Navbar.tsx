import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import type { LandingPageData } from "@/models/landing-page";
import { Menu } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
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

  const handleLogoClick = (e: React.MouseEvent) => {
    if (window.location.pathname === homePath) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <Container className="h-16 flex items-center justify-between">
        <Link 
          to={homePath} 
          className="font-bold text-xl tracking-tight hover:opacity-80 transition-opacity"
          onClick={handleLogoClick}
        >
          {name}
        </Link>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {data.sections.filter(s => s.enabled && s.type !== 'hero').map(section => (
            <a 
              key={section.id} 
              href={`#${section.id}`}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              {section.title || section.type}
            </a>
          ))}
          {contactCta && (
            <Button asChild>
              <a href={contactCta.href}>{contactCta.label}</a>
            </Button>
          )}
          <div className="pl-2 border-l ml-2">
            <LanguageSwitcher />
          </div>
        </div>

        {/* Mobile Toggle */}
        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          <Menu className="h-5 w-5" />
        </Button>
      </Container>
      
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t p-4 space-y-4 bg-background">
           {data.sections.filter(s => s.enabled && s.type !== 'hero').map(section => (
            <a 
              key={section.id} 
              href={`#${section.id}`}
              className="block text-sm font-medium hover:text-primary transition-colors"
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
          <div className="flex justify-center pt-2">
            <LanguageSwitcher />
          </div>
        </div>
      )}
    </nav>
  );
}
