import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { type Section as SectionData } from "@/models/landing-page";
import { Check } from "lucide-react";

export function FeaturesSection({ data }: { data: SectionData }) {
  if (!data.enabled) return null;

  return (
    <Section id={data.id}>
      <Container>
        <div className="text-center mb-12">
            <h2 className="h2 mb-4">{data.title}</h2>
            {data.subtitle && <p className="body text-muted-foreground">{data.subtitle}</p>}
        </div>
        
        <div className="features-grid">
          {data.items?.map((item: { title: string, description: string }, idx) => (
            <Card key={idx}>
              <CardHeader>
                <div className="flex items-center gap-4 mb-2">
                    <div className="feature-icon">
                        <Check className="h-5 w-5" />
                    </div>
                    <CardTitle>{item.title}</CardTitle>
                </div>
                <CardDescription className="body">
                  {item.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
