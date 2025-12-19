import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { type Section as SectionData } from "@/models/landing-page";
import { resolveAsset } from "@/lib/assets";

export function HeroSection({ data }: { data: SectionData }) {
  if (!data.enabled) return null;

  return (
    <div className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        {data.media && typeof data.media === 'string' && (
            <div className="absolute inset-0 z-0">
                <img src={resolveAsset(data.media)} alt={data.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40" />
            </div>
        )}

      <Container className="relative z-10 text-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
          {data.title}
        </h1>
        {data.subtitle && (
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto">
            {data.subtitle}
          </p>
        )}
        {data.cta && (
          <Button size="lg" asChild className="text-lg px-8">
            <a href={data.cta.href}>{data.cta.label}</a>
          </Button>
        )}
      </Container>
    </div>
  );
}
