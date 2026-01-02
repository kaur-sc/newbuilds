import { Suspense } from "react";
import type { LandingPageData } from "@/models/landing-page";
import { resolveAsset } from '@/lib/assets';
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroBlock } from "@/sections/HeroBlock";

import { FeatureBar } from "@/sections/FeatureBar";
import { TwoColumnBlock } from "@/sections/TwoColumnBlock";
import { ProjectGrid } from "@/sections/ProjectGrid";
import { CourseGrid } from "@/sections/CourseGrid";
import { FullWidthImageRightColText } from "@/sections/FullWidthImageRightColText";
import { TwoColumnList } from "@/sections/TwoColumnList";
import { BenefitGrid } from "@/sections/BenefitGrid";
import { CallToActionSection } from "@/sections/CallToActionSection";
import { ContactSection } from "@/sections/ContactSection";
import { Head } from 'vite-react-ssg';
import { useTranslation } from "react-i18next";

interface LandingPageProps {
  data: LandingPageData;
}

export function LandingPage({ data }: LandingPageProps) {
  const { t } = useTranslation(data.id);

  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
      <div className="min-h-screen flex flex-col font-sans text-foreground bg-background">
      <Head>
        <title>{data.seo.title}</title>
        <meta name="description" content={data.seo.description} />
        {data.seo.ogImage && <meta property="og:image" content={resolveAsset(data.seo.ogImage)} />}
      </Head>

      <Navbar data={data} />
      
      {/* Offer Bar */}
      <div className="announcement-bar">
        <span className="small">{t('announcement.title', 'EXCLUSIVE OFFER | COMPLIMENTARY GOLF MEMBERSHIP | LIMITED TIME')}</span>
      </div>

      <main className="flex-1">
        <HeroBlock
          data={{
            id: 'hero',
            media: '/assets/golf.jpg',
            title: 'New Build Golf Properties in Costa Blanca',
            subtitle: 'New-Build Homes Surrounded by Championship Golf & Mediterranean Living',
            cta: { label: 'Contact Agent', href: '#contact' },
            cta_secondary: { label: 'View Collection', href: '#projects' }
          }}
          namespace={data.id}
        />

        {/* Feature Bar */}
        <FeatureBar
          data={{
            id: 'features',
            items: [
              { text: "300+ Days of Sunshine" },
              { text: "5 Golf Courses Within 10 min" },
              { text: "Mediterranean Lifestyle" },
              { text: "Lock-Up-and-Leave Ready" },
              { text: "From €449,900" },
            ]
          }}
          namespace={data.id}
        />

        {/* Two Column Block */}
        <TwoColumnBlock
          data={{
            id: 'two-column',
            title: 'Live where golf, sunshine, and modern comfort come together.',
            subtitle: 'Our hand-picked selection of new-build golf properties in Orihuela Costa offers a rare opportunity to enjoy year-round golfing in one of Spain\'s most established golf destinations.',
            content: 'Whether you are searching for a Mediterranean lifestyle home, a winter golf escape, or a smart lifestyle investment, Orihuela Costa delivers the perfect balance of quality living and long-term appeal.',
            media: resolveAsset('/assets/golf.jpg')
          }}
          namespace={data.id}
        />

        {/* Project Grid */}
        <ProjectGrid
          data={{
            id: 'projects',
            title: 'Carefully Selected New-Build Golf Developments',
            subtitle: 'We work with a curated portfolio of new-build developments selected for their proximity to multiple golf courses, modern architecture, and strong lifestyle appeal.'
          }}
          namespace={data.id}
        />

        {/* Course Grid */}
        <CourseGrid
          data={{
            id: 'courses',
            title: 'Why Orihuela Costa Is One of Costa Blanca\'s Top Golf Locations',
            subtitle: 'Orihuela Costa is widely known for its concentration of high-quality golf courses, excellent infrastructure, and international atmosphere.'
          }}
          namespace={data.id}
        />

        {/* Climate Section */}
        <FullWidthImageRightColText
          data={{
            id: 'climate',
            media: '/assets/lvb/golf-06-s.jpg',
            title: 'A Climate Made for Golf & Outdoor Living',
            subtitle: 'One of the strongest reasons buyers choose Orihuela Costa is its Mediterranean climate.'
          }}
          namespace={data.id}
        />

        <TwoColumnList
          id="benefits"
          items={[
            {
              title: "300+ Sunny Days",
              description: "More than 300 sunny days per year for year-round outdoor enjoyment."
            },
            {
              title: "Mild Winters",
              description: "Comfortable daytime temperatures even in the middle of winter."
            },
            {
              title: "Outdoor Lifestyle",
              description: "Long seasons ideal for golf, walking, and terrace living."
            },
            {
              title: "Exquisite Mediterranean Cuisine",
              description: "Savor the healthy Mediterranean diet with vibrant tapas, fresh seafood, and exceptional dining experiences."
            }
          ]}
          namespace={data.id}
        />

        {/* Benefit Grid */}
        <BenefitGrid
          data={{
            id: 'benefits',
            title: 'Key Benefits of Owning a Golf Property in Orihuela Costa',
            subtitle: 'Everything you need for a premium lifestyle and smart investment.'
          }}
          namespace={data.id}
        />

        {/* Two Column Block - Lifestyle */}
        <TwoColumnBlock
          data={{
            id: 'lifestyle',
            title: 'Lifestyle & Investment Appeal Combined',
            subtitle: 'Golf properties in Orihuela Costa are popular with long-stay winter golfers, short-term holiday renters, and lifestyle buyers.',
            content: 'This creates consistent demand without relying on speculative promises. The combination of location and golf infrastructure makes these properties attractive.',
            media: resolveAsset('/assets/golf.jpg')
          }}
          namespace={data.id}
        />

        {/* Call to Action Section */}
        <CallToActionSection
          data={{
            id: 'cta',
            media: resolveAsset('/assets/golf.jpg'),
            title: 'Imagine Your Life Here',
            subtitle: 'Morning coffee on the terrace. A short drive to the first tee. Lunch by the sea. Evenings spent outdoors under warm Mediterranean skies.',
            cta: { label: 'View Collection', href: '#projects' }
          }}
          namespace={data.id}
        />

        {/* Contact Section */}
        <ContactSection
          data={{
            id: 'contact',
            title: 'Speak directly with a local property specialist',
            description: 'We\'ll help you compare developments, understand the buying process, and arrange viewings or virtual tours. Contact us today and let\'s find the golf property in Orihuela Costa that truly fits your lifestyle.',
            cta: { label: 'Speak to an Expert', href: '#contact' },
            badges: [
              { icon: 'phone', text: 'Free Information Pack' },
              { icon: 'euro', text: 'Direct Pricing' },
              { icon: 'shield', text: 'No Obligation' }
            ]
          }}
          namespace={data.id}
        />
      </main>

      <Footer data={data} />
    </div>
    </Suspense>
  );
}
