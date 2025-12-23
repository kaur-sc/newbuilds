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

export function GolfProperties() {
  const { t } = useTranslation('costa-blanca');

  // Apply saved theme on page load
  useEffect(() => {
    const currentPath = window.location.pathname;
    const savedTheme = getPageTheme(currentPath);

    if (savedTheme) {
        console.log(
            `🎨 Applying saved theme "${savedTheme}" to Golf Properties page`,
        );
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
        
        {/* HERO SECTION */}
        <section className="relative min-h-[600px] flex items-center overflow-hidden bg-gradient-to-br from-primary/20 via-primary/10 to-secondary/20">
          <div className="absolute inset-0">
            <img 
              src={resolveAsset('/assets/golf.jpg')} 
              alt="Modern new build villa overlooking a golf course in Costa Blanca" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
          </div>

          <Container className="relative z-10 py-20">
            <div className="max-w-3xl">
              <h1 className="h1 mb-6 text-white">
                {t('hero.title_start')} {t('hero.title_middle')} <span className="text-accent">{t('hero.title_highlight')}</span>
              </h1>
              <p className="body-l mb-8 max-w-2xl text-white/90">
                {t('hero.description')}
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#contact" className="btn-primary">
                  {t('hero.cta_brochure')}
                </a>
                <a href="#villas" className="btn-outline bg-white/10 text-white border-white/30 hover:bg-white/20">
                  {t('hero.cta_explore')}
                </a>
              </div>
            </div>
          </Container>
        </section>

        {/* VILLAS SECTION */}
        <section id="villas" className="py-20 bg-card">
          <Container>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="h2 mb-6">{t('villas.title')}</h2>
                <p className="body mb-6">
                  {t('villas.description_1')}
                </p>
                <p className="body mb-8">
                  {t('villas.description_2')}
                </p>
                <div className="space-y-4">
                  <FeatureItem text={t('villas.points.layout')} />
                  <FeatureItem text={t('villas.points.space')} />
                  <FeatureItem text={t('villas.points.garden')} />
                </div>
              </div>
              <div className="h-[500px] rounded-2xl overflow-hidden">
                <img 
                  src={resolveAsset('/assets/lvb/lvb-01-3d.jpg')} 
                  alt="Modern villa interior design concept" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </Container>
        </section>

        {/* GALLERY SECTION */}
        <section className="py-20 bg-muted">
            <Container>
                <Gallery />
            </Container>
        </section>

        {/* GOLF SECTION */}
        <section id="golf" className="py-20 bg-card">
          <Container>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="h-[500px] rounded-2xl overflow-hidden order-2 lg:order-1">
                <img 
                  src={resolveAsset('/assets/lvb/golf-06-s.jpg')} 
                  alt="Golf course at Orihuela Costa" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="h2 mb-6">{t('golf.title')}</h2>
                <p className="body mb-6">
                  {t('golf.description_1')}
                </p>
                <p className="body mb-8">
                  {t('golf.description_2')}
                </p>
                <div className="space-y-4 bg-muted p-8 rounded-xl border border-border">
                  <FeatureItem text={t('golf.points.cluster')} icon={<MapPin className="w-5 h-5" />} />
                  <FeatureItem text={t('golf.points.season')} icon={<Sun className="w-5 h-5" />} />
                  <FeatureItem text={t('golf.points.routine')} icon={<Check className="w-5 h-5" />} />
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* LOCATION SECTION */}
        <section id="location" className="py-20 bg-muted">
          <Container>
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="h2 mb-6">{t('location.title')}</h2>
              <p className="body-l">
                {t('location.description')}
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard 
                title={t('location.points.services.title')} 
                description={t('location.points.services.description')} 
                icon={<Home className="w-6 h-6" />} 
              />
              <FeatureCard 
                title={t('location.points.beaches.title')} 
                description={t('location.points.beaches.description')} 
                icon={<MapPin className="w-6 h-6" />} 
              />
              <FeatureCard 
                title={t('location.points.year_round.title')} 
                description={t('location.points.year_round.description')} 
                icon={<Sun className="w-6 h-6" />} 
              />
            </div>
          </Container>
        </section>

        {/* LIFESTYLE SECTION */}
        <section id="lifestyle" className="py-20 bg-card">
          <Container>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="h-[500px] rounded-2xl overflow-hidden">
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
                  <FeatureItem text={t('lifestyle.points.construction')} />
                  <FeatureItem text={t('lifestyle.points.outdoor')} />
                  <FeatureItem text={t('lifestyle.points.maintenance')} />
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* CONTACT/CTA SECTION */}
        <section id="contact" className="py-24 bg-gradient-to-br from-primary to-primary/90">
          <Container>
            <div className="max-w-4xl mx-auto bg-card rounded-3xl p-8 md:p-16 text-center border border-border">
              <h2 className="h2 mb-6">{t('contact.title')}</h2>
              <p className="body-l mb-8 max-w-2xl mx-auto">
                <Trans i18nKey="contact.price_info" t={t} components={[<span className="text-primary" key="0" />]} />
              </p>
              
              <div className="bg-muted px-6 py-4 rounded-xl mb-10 inline-block small">
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

              <div className="mt-12 flex flex-wrap justify-center gap-8 small text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary" />
                  <span>Free Brochure</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary" />
                  <span>No Obligation</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary" />
                  <span>Local Support</span>
                </div>
              </div>
            </div>
          </Container>
        </section>

      </main>

      <Footer data={pageData} />
    </div>
  );
}

// Feature item component
function FeatureItem({ text, icon, light = false }: { text: string, icon?: ReactNode, light?: boolean }) {
  return (
    <div className="flex items-start gap-3">
      <div className={`mt-1 min-w-5 ${light ? 'text-accent' : 'text-primary'}`}>
        {icon || <Check className="w-5 h-5" />}
      </div>
      <span className={`body ${light ? 'text-muted-foreground' : 'text-foreground'}`}>{text}</span>
    </div>
  );
}

// Feature card component
function FeatureCard({ title, description, icon }: { title: string, description: string, icon: ReactNode }) {
  return (
    <div className="bg-card p-8 rounded-2xl border border-border transition-shadow duration-300">
      <div className="h-12 w-12 bg-muted rounded-xl flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="h3 mb-3">{title}</h3>
      <p className="body">
        {description}
      </p>
    </div>
  );
}
