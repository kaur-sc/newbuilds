import type { LandingPageData } from "@/models/landing-page";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/sections/Hero";
import { FeaturesSection } from "@/sections/Features";
import { ContactSection } from "@/sections/Contact";
import { Head } from 'vite-react-ssg';
import React from "react";

interface LandingPageProps {
  data: LandingPageData;
}

export function LandingPage({ data }: LandingPageProps) {
  // Inject brand colors into CSS variables for this page
  // In a real app we might use a ThemeProvider, but inline style on a wrapper works for static gen too.
  const style = {
    '--primary': data.brand.colors?.primary || '222.2 47.4% 11.2%',
    '--secondary': data.brand.colors?.secondary || '210 40% 96.1%',
  } as React.CSSProperties;

  return (
    <div className="min-h-screen flex flex-col font-sans text-foreground bg-background" style={style}>
      <Head>
        <title>{data.seo.title}</title>
        <meta name="description" content={data.seo.description} />
        {data.seo.ogImage && <meta property="og:image" content={data.seo.ogImage} />}
      </Head>

      <Navbar data={data} />
      
      <main className="flex-1">
        {data.sections.sort((a, b) => a.order - b.order).map(section => {
          if (!section.enabled) return null;
          
          switch (section.type) {
            case 'hero':
              return <HeroSection key={section.id} data={section} />;
            case 'features':
              return <FeaturesSection key={section.id} data={section} />;
             case 'contact':
              return <ContactSection key={section.id} data={section} />;
            default:
              return null;
          }
        })}
      </main>

      <Footer data={data} />
    </div>
  );
}
