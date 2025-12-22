import React, { useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Check, MapPin, Sun, Home, ArrowRight } from 'lucide-react';
import type { LandingPageData } from '@/models/landing-page';
import { Head } from 'vite-react-ssg';
import { useTranslation, Trans } from 'react-i18next';
import golfImage from '../assets/golf.jpg';
import { Gallery } from '@/components/ui/Gallery';
import { resolveAsset } from '@/lib/assets';
import { getPageTheme } from '@/lib/pageThemeManager';
import { applyTheme } from '@/themes/resolver';
import type { ThemeKey } from '@/themes';

export function GolfProperties() {
  const { t } = useTranslation('costa-blanca');

  // Apply saved theme on page load
  useEffect(() => {
    // Check if there's a saved theme for this page
    const currentPath = window.location.pathname;
    const savedTheme = getPageTheme(currentPath);
    
    if (savedTheme) {
      console.log(`🎨 Applying saved theme "${savedTheme}" to Golf Properties page`);
      applyTheme(savedTheme);
    }
  }, []);

  // Mock data for Navbar/Footer compatibility
  const pageData: LandingPageData = {
    id: 'costa-blanca',
    name: 'Golf Properties',
    brand: {
      colors: {
        primary: '142.1 76.2% 36.3%', // Green for Golf
        secondary: '30 80% 90%', // Warm/Sun
      }
    },
    seo: {
      title: t('seo.title'),
      description: t('seo.description'),
    },
    sections: [
      { id: 'villas', type: 'features', enabled: true, order: 1, title: 'The Villas' }, // Note: Menu items generally need separate handling or strictly key-based
      { id: 'golf', type: 'features', enabled: true, order: 2, title: 'Golf' },
      { id: 'location', type: 'features', enabled: true, order: 3, title: 'Location' },
      { id: 'lifestyle', type: 'features', enabled: true, order: 4, title: 'Lifestyle' },
      { id: 'contact', type: 'contact', enabled: true, order: 5, title: 'Prices & Visits', cta: { label: 'Get Info', href: '#contact' } },
    ]
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-foreground bg-background">
      <Head>
        <title>{pageData.seo.title}</title>
        <meta name="description" content={pageData.seo.description} />
      </Head>
      
      <Navbar data={pageData} />

      <main className="flex-1">
        
        {/* HERO */}
        <div className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-primary text-primary-foreground">
          <div className="absolute inset-0 z-0">
             <img 
               src={golfImage} 
               alt="Modern new build villa overlooking a golf course in Costa Blanca" 
               className="w-full h-full object-cover"
             />
             <div className="absolute inset-0 bg-black/40" />
          </div>

          <Container className="relative z-10 text-center max-w-4xl">
            <h1 className="h1 mb-6 text-white">
              {t('hero.title_start')} {t('hero.title_middle')} <span className="text-accent">{t('hero.title_highlight')}</span>
            </h1>
            <p className="body text-xl md:text-2xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto">
              {t('hero.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#contact" className="btn-primary text-lg px-8 h-14 inline-flex items-center justify-center">
                {t('hero.cta_brochure')}
              </a>
               <a href="#villas" className="btn-outline text-lg px-8 h-14 inline-flex items-center justify-center">
                {t('hero.cta_explore')}
              </a>
            </div>
            <p className="caption mt-8 text-primary-foreground/60">{t('hero.footer_note')}</p>
          </Container>
        </div>

        {/* SECTION 1: VILLAS */}
        <section id="villas" className="py-20 md:py-32 bg-card">
          <Container>
            <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-stretch">
              <div className="order-2 md:order-1">
                 {/* Villa Image */}
                <div className="h-full rounded-2xl overflow-hidden relative">
                    <img 
                      src={resolveAsset('/assets/lvb/lvb-01-3d.jpg')} 
                      alt="Modern villa interior design concept" 
                      className="w-full h-full object-cover"
                    />
                </div>
              </div>
              <div className="order-1 md:order-2">
                <h2 className="h2 mb-6">{t('villas.title')}</h2>
                <p className="body text-lg mb-6">
                  {t('villas.description_1')}
                </p>
                <p className="body text-lg mb-8">
                  {t('villas.description_2')}
                </p>

                <div className="space-y-4">
                  <KeyPoint text={t('villas.points.layout')} />
                  <KeyPoint text={t('villas.points.space')} />
                  <KeyPoint text={t('villas.points.garden')} />
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* PHOTO GALLERY */}
        <Gallery />

        {/* SECTION 2: GOLF */}
        <section id="golf" className="py-20 md:py-32 bg-muted">
          <Container>
            <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-stretch">
              <div>
                <h2 className="h2 mb-6">{t('golf.title')}</h2>
                <p className="body text-lg mb-6">
                  {t('golf.description_1')}
                </p>
                 <p className="body text-lg mb-8">
                  {t('golf.description_2')}
                </p>
                 <div className="space-y-4 bg-card p-8 rounded-xl border border-border">
                  <KeyPoint text={t('golf.points.cluster')} icon={<MapPin className="w-5 h-5 text-primary" />} />
                  <KeyPoint text={t('golf.points.season')} icon={<Sun className="w-5 h-5 text-primary" />} />
                  <KeyPoint text={t('golf.points.routine')} icon={<Check className="w-5 h-5 text-primary" />} />
                </div>
              </div>
               <div className="h-full">
                 {/* Golf Image */}
                <div className="h-full rounded-2xl overflow-hidden relative">
                    <img 
                      src={resolveAsset('/assets/lvb/golf-06-s.jpg')} 
                      alt="Golf course at Orihuela Costa" 
                      className="w-full h-full object-cover"
                    />
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* SECTION 3: LOCATION */}
        <section id="location" className="py-20 md:py-32 bg-card">
           <Container>
             <div className="max-w-3xl mx-auto text-center mb-16">
                <h2 className="h2 mb-6">{t('location.title')}</h2>
                <p className="body text-xl">
                  {t('location.description')}
                </p>
             </div>
            
            <div className="grid md:grid-cols-3 gap-8">
               <Card title={t('location.points.services.title')} description={t('location.points.services.description')} icon={<Home className="w-6 h-6 text-primary" />} />
               <Card title={t('location.points.beaches.title')} description={t('location.points.beaches.description')} icon={<MapPin className="w-6 h-6 text-primary" />} />
               <Card title={t('location.points.year_round.title')} description={t('location.points.year_round.description')} icon={<Sun className="w-6 h-6 text-primary" />} />
            </div>

            <div className="mt-12 text-center max-w-3xl mx-auto">
                 <p className="body text-lg">
                  {t('location.note')}
                </p>
            </div>
          </Container>
        </section>

         {/* SECTION 4: COMFORT */}
        <section id="lifestyle" className="py-20 md:py-32 bg-foreground text-background">
          <Container>
            <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-stretch">
               <div className="order-2 md:order-1">
                 {/* Villa Image */}
                <div className="h-full rounded-2xl overflow-hidden relative border border-border">
                   <img 
                      src={resolveAsset('/assets/lvb/lvb-13-3d.jpg')} 
                      alt="Modern villa design with low-maintenance pool area" 
                      className="w-full h-full object-cover"
                    />
                </div>
              </div>

              <div className="order-1 md:order-2">
                <h2 className="h2 mb-6 text-gray-200">{t('lifestyle.title')}</h2>
                <p className="body text-lg mb-6 text-gray-300">
                  {t('lifestyle.description_1')}
                </p>
                <p className="body text-lg mb-8 text-gray-300">
                  {t('lifestyle.description_2')}
                </p>
                <div className="space-y-4 text-gray-200">
                  <KeyPoint text={t('lifestyle.points.construction')} light />
                  <KeyPoint text={t('lifestyle.points.outdoor')} light />
                  <KeyPoint text={t('lifestyle.points.maintenance')} light />
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* PRICE & CALL TO ACTION */}
        <section id="contact" className="py-24 bg-accent relative overflow-hidden">
             {/* Decorative blob */}
             <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-muted rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50" />

          <Container className="relative z-10">
            <div className="max-w-4xl mx-auto bg-card rounded-3xl p-8 md:p-16 text-center border border-border">
                <h2 className="h2 mb-6">{t('contact.title')}</h2>
                <p className="body text-xl mb-8 max-w-2xl mx-auto">
                    <Trans i18nKey="contact.price_info" t={t} components={[<span className="font-semibold text-primary" key="0" />]} />
                </p>
                
                <div className="bg-secondary text-secondary-foreground px-6 py-4 rounded-xl mb-10 inline-block text-sm font-medium border border-border">
                    ⚠️ {t('contact.warning')}
                </div>

                <div className="space-y-4 max-w-md mx-auto">
                    <p className="font-medium mb-6">{t('contact.cta_intro')}</p>
                    
                    <button className="btn-primary w-full text-lg h-14">
                        {t('contact.cta_brochure')}
                    </button>
                    <button className="btn-outline w-full text-lg h-14">
                        {t('contact.cta_availability')}
                    </button>
                    <button className="btn-ghost w-full text-lg h-14">
                        {t('contact.cta_visit')} <ArrowRight className="ml-2 w-4 h-4" />
                    </button>
                </div>
            </div>
          </Container>
        </section>

      </main>

      <Footer data={pageData} />
    </div>
  );
}

// Sub-components for this page
function KeyPoint({ text, icon, light = false }: { text: string, icon?: React.ReactNode, light?: boolean }) {
    return (
        <div className="flex items-start gap-3">
             <div className={`mt-1 min-w-5 ${light ? 'text-accent' : 'text-primary'}`}>
                {icon || <Check className="w-5 h-5" />}
             </div>
             <span className={`text-base font-medium ${light ? 'text-muted-foreground' : 'text-foreground'}`}>{text}</span>
        </div>
    )
}

function Card({ title, description, icon }: { title: string, description: string, icon: React.ReactNode }) {
    return (
        <div className="bg-muted p-8 rounded-2xl border border-border transition-shadow duration-300">
            <div className="h-12 w-12 bg-card rounded-xl flex items-center justify-center mb-6">
                {icon}
            </div>
            <h3 className="font-bold text-xl mb-3">{title}</h3>
            <p className="body leading-relaxed">
                {description}
            </p>
        </div>
    )
}
