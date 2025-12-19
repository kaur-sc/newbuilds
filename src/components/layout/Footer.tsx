import { Container } from "@/components/ui/container";
import type { LandingPageData } from "@/models/landing-page";

interface FooterProps {
  data: LandingPageData;
}

export function Footer({ data }: FooterProps) {
  return (
    <footer className="bg-muted py-12">
      <Container className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h3 className="font-bold text-lg">{data.name}</h3>
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
