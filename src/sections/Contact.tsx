import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { type Section as SectionData } from "@/models/landing-page";

export function ContactSection({ data }: { data: SectionData }) {
  if (!data.enabled) return null;

  return (
    <Section id={data.id} className="bg-primary text-primary-foreground">
      <Container>
        <div className="text-center">
          <h2 className="h2 mb-4">{data.title}</h2>
          {data.subtitle && <p className="body text-primary-foreground/80 mb-8 max-w-2xl mx-auto">{data.subtitle}</p>}
          
          {data.cta && (
              <Button className="btn-secondary" asChild>
                  <a href={data.cta.href}>{data.cta.label}</a>
              </Button>
          )}
        </div>
      </Container>
    </Section>
  );
}
