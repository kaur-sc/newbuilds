import { Container } from "@/components/ui/container";
import type { LandingPageData } from "@/models/landing-page";
import { Link, useLocation } from "react-router-dom";
import { resolveAsset } from "@/lib/assets";

interface FooterProps {
  data: LandingPageData;
}

export function Footer({ data }: FooterProps) {
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
    <footer className="bg-muted py-12">
      <Container className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <Link 
            to="/" 
            className="block hover:opacity-80 transition-opacity"
            onClick={handleLogoClick}
          >
            <img 
              src={resolveAsset("/assets/SC-Logo-Horizontal.svg")} 
              alt="Sunny Casas" 
              className="h-8 w-auto"
            />
          </Link>
          <p className="small text-muted-foreground mt-2">
            © {new Date().getFullYear()} SUNNY CASAS. All rights reserved.
          </p>
        </div>
        <div className="flex gap-6 text-sm text-muted-foreground">
          <a href="#" className="hover:text-foreground">Privacy Policy</a>
          <a href="#" className="hover:text-foreground">Terms of Service</a>
        </div>
      </Container>
    </footer>
  );
}
