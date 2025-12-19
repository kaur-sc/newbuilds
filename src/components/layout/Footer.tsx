import { Container } from "@/components/ui/container";
import type { LandingPageData } from "@/models/landing-page";
import { Link } from "react-router-dom";

interface FooterProps {
  data: LandingPageData;
}

export function Footer({ data }: FooterProps) {
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
    <footer className="bg-muted py-12">
      <Container className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <Link 
            to={homePath} 
            className="font-bold text-lg hover:text-primary transition-colors"
            onClick={handleLogoClick}
          >
            {data.name}
          </Link>
          <p className="text-sm text-muted-foreground mt-2">
            © {new Date().getFullYear()} {data.name}. All rights reserved.
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
