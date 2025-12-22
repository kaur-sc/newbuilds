import type { LandingPageData } from "@/models/landing-page";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/sections/Hero";
import { FeaturesSection } from "@/sections/Features";
import { ContactSection } from "@/sections/Contact";
import { Head } from 'vite-react-ssg';
import React, { useEffect } from "react";
import { getPageTheme } from "@/lib/pageThemeManager";
import { applyTheme } from "@/themes/resolver";

interface LandingPageProps {
  data: LandingPageData;
}

export function LandingPage({ data }: LandingPageProps) {
  // Apply saved theme on page load
  useEffect(() => {
    // Check if there's a saved theme for this page
    const currentPath = window.location.pathname;
    const savedTheme = getPageTheme(currentPath);
    
    if (savedTheme) {
      console.log(`🎨 Applying saved theme "${savedTheme}" to Landing page`);
      applyTheme(savedTheme);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-sans text-foreground bg-background">
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
