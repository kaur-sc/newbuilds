import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { type Section as SectionData } from "@/models/landing-page";
import { Check } from "lucide-react";

export function FeaturesSection({ data }: { data: SectionData }) {
  if (!data.enabled) return null;

  return (
    <Section id={data.id} className="bg-muted/50">
      <Container>
        <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">{data.title}</h2>
            {data.subtitle && <p className="text-muted-foreground">{data.subtitle}</p>}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {data.items?.map((item: { title: string, description: string }, idx) => (
            <Card key={idx} className="border-none">
              <CardHeader>
                <div className="flex items-center gap-4 mb-2">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <Check className="h-5 w-5" />
                    </div>
                    <CardTitle>{item.title}</CardTitle>
                </div>
                <CardDescription className="text-base">
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
