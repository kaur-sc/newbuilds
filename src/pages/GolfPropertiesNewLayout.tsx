import { type ReactNode, useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Check, MapPin, Sun, Home, ArrowRight } from 'lucide-react';
import type { LandingPageData } from '@/models/landing-page';
import { Head } from 'vite-react-ssg';
import { useTranslation, Trans } from 'react-i18next';
import { getPageTheme } from "@/lib/pageThemeManager";
import { applyTheme } from "@/themes/resolver";
import { resolveAsset } from '@/lib/assets';
import { Gallery } from '@/components/ui/Gallery';

export function GolfPropertiesNewLayout() {
  const { t } = useTranslation('costa-blanca');

  // Apply saved theme on page load
  useEffect(() => {
    const currentPath = window.location.pathname;
    const savedTheme = getPageTheme(currentPath);

    if (savedTheme) {
        console.log(
            `🎨 Applying saved theme "${savedTheme}" to Custom page`,
        );
        applyTheme(savedTheme);
    }
  }, []);

  // Mock data for Navbar/Footer compatibility
  const pageData: LandingPageData = {
    id: 'golf-properties-new-layout', // Changed ID for this new page
    name: 'Golf Properties New Layout', // New name
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
      { id: 'villas', type: 'features', enabled: true, order: 1, title: 'The Villas' },
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
        
        {/* HERO - Full width with centered content */}
        <section className="relative h-[calc(100vh-80px)] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
             <img 
               src={resolveAsset('/assets/golf.jpg')} 
               alt="Modern new build villa overlooking a golf course in Costa Blanca" 
               className="w-full h-full object-cover"
             />
             <div className="absolute inset-0 bg-black/40" />
          </div>

          <Container className="relative z-10 text-center max-w-4xl">
            <h1 className="h1 mb-6 text-white">
              {t('hero.title_start')} {t('hero.title_middle')} <span className="text-accent">{t('hero.title_highlight')}</span>
            </h1>
            <p className="body-l text-primary-foreground/80 mb-10 max-w-2xl mx-auto">
              {t('hero.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#contact" className="btn-primary">
                {t('hero.cta_brochure')}
              </a>
               <a href="#villas" className="btn-outline">
                {t('hero.cta_explore')}
              </a>
            </div>
          </Container>
        </section>

        {/* SECTION 1: VILLAS - Two-column informational block */}
        <section id="villas" className="py-20 md:py-32 bg-card">
          <Container>
            <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center"> {/* Align items to center for new layout style */}
              <div>
                <h2 className="h2 mb-6">{t('villas.title')}</h2>
                <p className="body mb-6">
                  {t('villas.description_1')}
                </p>
                <p className="body mb-8">
                  {t('villas.description_2')}
                </p>

                <div className="space-y-4">
                  <KeyPoint text={t('villas.points.layout')} />
                  <KeyPoint text={t('villas.points.space')} />
                  <KeyPoint text={t('villas.points.garden')} />
                </div>
              </div>
              <div className="h-[400px] md:h-[500px] rounded-2xl overflow-hidden relative"> {/* Fixed height for image consistency */}
                 {/* Villa Image */}
                <img 
                  src={resolveAsset('/assets/lvb/lvb-01-3d.jpg')} 
                  alt="Modern villa interior design concept" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </Container>
        </section>

        {/* GALLERY - Full width product-like display */}
        <section className="py-20 md:py-32 bg-muted">
            <Container>
                <Gallery />
            </Container>
        </section>

        {/* SECTION 2: GOLF - Two-column informational block (reversed order) */}
        <section id="golf" className="py-20 md:py-32 bg-card">
          <Container>
            <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center"> {/* Align items to center for new layout style */}
              <div className="h-[400px] md:h-[500px] rounded-2xl overflow-hidden relative"> {/* Fixed height for image consistency */}
                 {/* Golf Image */}
                <img 
                  src={resolveAsset('/assets/lvb/golf-06-s.jpg')} 
                  alt="Golf course at Orihuela Costa" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="h2 mb-6">{t('golf.title')}</h2>
                <p className="body mb-6">
                  {t('golf.description_1')}
                </p>
                 <p className="body mb-8">
                  {t('golf.description_2')}
                </p>
                 <div className="space-y-4 bg-card p-8 rounded-xl border border-border">
                  <KeyPoint text={t('golf.points.cluster')} icon={<MapPin className="w-5 h-5 text-primary" />} />
                  <KeyPoint text={t('golf.points.season')} icon={<Sun className="w-5 h-5 text-primary" />} />
                  <KeyPoint text={t('golf.points.routine')} icon={<Check className="w-5 h-5 text-primary" />} />
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* SECTION 3: LOCATION - Three-column icon grid */}
        <section id="location" className="py-20 md:py-32 bg-muted">
           <Container>
             <div className="max-w-3xl mx-auto text-center mb-16">
                <h2 className="h2 mb-6">{t('location.title')}</h2>
                <p className="body-l">
                  {t('location.description')}
                </p>
             </div>
            
            <div className="grid md:grid-cols-3 gap-8">
               <Card title={t('location.points.services.title')} description={t('location.points.services.description')} icon={<Home className="w-6 h-6 text-primary" />} />
               <Card title={t('location.points.beaches.title')} description={t('location.points.beaches.description')} icon={<MapPin className="w-6 h-6 text-primary" />} />
               <Card title={t('location.points.year_round.title')} description={t('location.points.year_round.description')} icon={<Sun className="w-6 h-6 text-primary" />} />
            </div>
          </Container>
        </section>

         {/* SECTION 4: COMFORT/LIFESTYLE - Two-column informational block */}
        <section id="lifestyle" className="py-20 md:py-32 bg-card">
          <Container>
            <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
               <div className="h-[400px] md:h-[500px] rounded-2xl overflow-hidden relative">
                 {/* Villa Image */}
                   <img 
                      src={resolveAsset('/assets/lvb/lvb-13-3d.jpg')} 
                      alt="Modern villa design with low-maintenance pool area" 
                      className="w-full h-full object-cover"
                    />
                </div>

              <div>
                <h2 className="h2 mb-6">{t('lifestyle.title')}</h2>
                <p className="body mb-6">
                  {t('lifestyle.description_1')}
                </p>
                <p className="body mb-8">
                  {t('lifestyle.description_2')}
                </p>
                <div className="space-y-4">
                  <KeyPoint text={t('lifestyle.points.construction')} />
                  <KeyPoint text={t('lifestyle.points.outdoor')} />
                  <KeyPoint text={t('lifestyle.points.maintenance')} />
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* PRICE & CALL TO ACTION - Full width promotional banner */}
        <section id="contact" className="py-24 bg-accent relative overflow-hidden">
             {/* Decorative blob */}
             <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-muted rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50" />

          <Container className="relative z-10">
            <div className="max-w-4xl mx-auto bg-card rounded-3xl p-8 md:p-16 text-center border border-border">
                <h2 className="h2 mb-6">{t('contact.title')}</h2>
                <p className="body-l mb-8 max-w-2xl mx-auto">
                    <Trans i18nKey="contact.price_info" t={t} components={[<span className="text-primary" key="0" />]} />
                </p>
                
                <div className="bg-secondary text-secondary-foreground px-6 py-4 rounded-xl mb-10 inline-block small border border-border">
                    ⚠️ {t('contact.warning')}
                </div>

                <div className="space-y-4 max-w-md mx-auto">
                    <p className="mb-6">{t('contact.cta_intro')}</p>
                    
                    <button className="btn-primary w-full">
                        {t('contact.cta_brochure')}
                    </button>
                    <button className="btn-outline w-full">
                        {t('contact.cta_availability')}
                    </button>
                    <button className="btn-ghost w-full">
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
function KeyPoint({ text, icon, light = false }: { text: string, icon?: ReactNode, light?: boolean }) {
    return (
        <div className="flex items-start gap-3">
             <div className={`mt-1 min-w-5 ${light ? 'text-accent' : 'text-primary'}`}>
                {icon || <Check className="w-5 h-5" />}
             </div>
             <span className={`body ${light ? 'text-muted-foreground' : 'text-foreground'}`}>{text}</span>
        </div>
    )
}

function Card({ title, description, icon }: { title: string, description: string, icon: ReactNode }) {
    return (
        <div className="bg-muted p-8 rounded-2xl border border-border transition-shadow duration-300">
            <div className="h-12 w-12 bg-card rounded-xl flex items-center justify-center mb-6">
                {icon}
            </div>
            <h3 className="h3 mb-3">{title}</h3>
            <p className="body">
                {description}
            </p>
        </div>
    )
}
