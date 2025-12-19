import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Check, MapPin, Sun, Home, ArrowRight } from 'lucide-react';
import type { LandingPageData } from '@/models/landing-page';
import { Helmet } from 'react-helmet-async';
import { useTranslation, Trans } from 'react-i18next';

export function LaVistaBoulevard() {
  const { t } = useTranslation('la-vista-boulevard');

  // Mock data for Navbar/Footer compatibility
  const pageData: LandingPageData = {
    id: 'la-vista-boulevard',
    name: 'La Vista Boulevard',
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

  const style = {
    '--primary': pageData.brand.colors?.primary,
    '--secondary': pageData.brand.colors?.secondary,
  } as React.CSSProperties;

  return (
    <div className="min-h-screen flex flex-col font-sans text-foreground bg-background" style={style}>
      <Helmet>
        <title>{pageData.seo.title}</title>
        <meta name="description" content={pageData.seo.description} />
      </Helmet>
      
      <Navbar data={pageData} />

      <main className="flex-1">
        
        {/* HERO */}
        <div className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-slate-900 text-white">
          <div className="absolute inset-0 z-0">
             {/* Placeholder for Hero Image - using a gradient/colored block if no image available */}
             <div className="w-full h-full bg-gradient-to-br from-green-900 via-emerald-900 to-slate-900 opacity-80" />
             <div className="absolute inset-0 bg-black/30" />
          </div>

          <Container className="relative z-10 text-center max-w-4xl">
            <span className="inline-block py-1 px-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm font-medium mb-6 animate-fade-in-up">
              {t('hero.badge')}
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight">
              {t('hero.title_start')} <br className="hidden md:block"/> {t('hero.title_middle')} <span className="text-emerald-400">{t('hero.title_highlight')}</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-10 max-w-2xl mx-auto leading-relaxed">
              {t('hero.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 h-14 bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-900/20" asChild>
                <a href="#contact">{t('hero.cta_brochure')}</a>
              </Button>
               <Button size="lg" variant="outline" className="text-lg px-8 h-14 bg-white/5 hover:bg-white/10 text-white border-white/30 backdrop-blur-sm" asChild>
                <a href="#villas">{t('hero.cta_explore')}</a>
              </Button>
            </div>
            <p className="mt-8 text-sm text-gray-400">{t('hero.footer_note')}</p>
          </Container>
        </div>

        {/* SECTION 1: VILLAS */}
        <section id="villas" className="py-20 md:py-32 bg-white">
          <Container>
            <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div className="order-2 md:order-1">
                 {/* Visual Placeholder */}
                <div className="aspect-[4/3] bg-slate-100 rounded-2xl overflow-hidden relative shadow-2xl">
                    <div className="absolute inset-0 flex items-center justify-center text-slate-400 bg-slate-100">
                        Villa Interior / Terrace Concept
                    </div>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight text-slate-900">{t('villas.title')}</h2>
                <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                  {t('villas.description_1')}
                </p>
                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
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

        {/* SECTION 2: GOLF */}
        <section id="golf" className="py-20 md:py-32 bg-slate-50">
          <Container>
            <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div>
                <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight text-slate-900">{t('golf.title')}</h2>
                <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                  {t('golf.description_1')}
                </p>
                 <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                  {t('golf.description_2')}
                </p>
                 <div className="space-y-4 bg-white p-8 rounded-xl shadow-sm border border-slate-100">
                  <KeyPoint text={t('golf.points.cluster')} icon={<MapPin className="w-5 h-5 text-emerald-600" />} />
                  <KeyPoint text={t('golf.points.season')} icon={<Sun className="w-5 h-5 text-emerald-600" />} />
                  <KeyPoint text={t('golf.points.routine')} icon={<Check className="w-5 h-5 text-emerald-600" />} />
                </div>
              </div>
               <div className="h-full">
                 {/* Visual Placeholder */}
                <div className="aspect-[3/4] md:aspect-auto md:h-full bg-emerald-900/5 rounded-2xl overflow-hidden relative shadow-xl min-h-[400px]">
                    <div className="absolute inset-0 flex items-center justify-center text-emerald-800/20 bg-emerald-50">
                        Golf Course / Map Visual
                    </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* SECTION 3: LOCATION */}
        <section id="location" className="py-20 md:py-32 bg-white">
           <Container>
             <div className="max-w-3xl mx-auto text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight text-slate-900">{t('location.title')}</h2>
                <p className="text-xl text-slate-600 leading-relaxed">
                  {t('location.description')}
                </p>
             </div>
            
            <div className="grid md:grid-cols-3 gap-8">
               <Card title={t('location.points.services.title')} description={t('location.points.services.description')} icon={<Home className="w-6 h-6 text-blue-500" />} />
               <Card title={t('location.points.beaches.title')} description={t('location.points.beaches.description')} icon={<MapPin className="w-6 h-6 text-blue-500" />} />
               <Card title={t('location.points.year_round.title')} description={t('location.points.year_round.description')} icon={<Sun className="w-6 h-6 text-blue-500" />} />
            </div>

            <div className="mt-12 text-center max-w-3xl mx-auto">
                 <p className="text-lg text-slate-600">
                  {t('location.note')}
                </p>
            </div>
          </Container>
        </section>

         {/* SECTION 4: COMFORT */}
        <section id="lifestyle" className="py-20 md:py-32 bg-slate-900 text-white">
          <Container>
            <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
               <div className="order-2 md:order-1">
                 {/* Visual Placeholder */}
                <div className="aspect-video bg-white/5 rounded-2xl overflow-hidden relative border border-white/10">
                    <div className="absolute inset-0 flex items-center justify-center text-white/20">
                        Modern Villa Exterior / Pool
                    </div>
                </div>
              </div>

              <div className="order-1 md:order-2">
                <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">{t('lifestyle.title')}</h2>
                <p className="text-lg text-slate-300 mb-6 leading-relaxed">
                  {t('lifestyle.description_1')}
                </p>
                <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                  {t('lifestyle.description_2')}
                </p>
                <div className="space-y-4">
                  <KeyPoint text={t('lifestyle.points.construction')} light />
                  <KeyPoint text={t('lifestyle.points.outdoor')} light />
                  <KeyPoint text={t('lifestyle.points.maintenance')} light />
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* PRICE & CALL TO ACTION */}
        <section id="contact" className="py-24 bg-emerald-50 relative overflow-hidden">
             {/* Decorative blob */}
             <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-100 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50" />

          <Container className="relative z-10">
            <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl p-8 md:p-16 text-center border border-emerald-100">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900">{t('contact.title')}</h2>
                <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
                    <Trans i18nKey="contact.price_info" t={t} components={[<span className="font-semibold text-emerald-700" key="0" />]} />
                </p>
                
                <div className="bg-amber-50 text-amber-900 px-6 py-4 rounded-xl mb-10 inline-block text-sm font-medium border border-amber-100">
                    ⚠️ {t('contact.warning')}
                </div>

                <div className="space-y-4 max-w-md mx-auto">
                    <p className="font-medium text-slate-900 mb-6">{t('contact.cta_intro')}</p>
                    
                    <Button size="lg" className="w-full text-lg h-14 bg-emerald-600 hover:bg-emerald-700 shadow-md">
                        {t('contact.cta_brochure')}
                    </Button>
                    <Button size="lg" variant="outline" className="w-full text-lg h-14 border-emerald-200 text-emerald-700 hover:bg-emerald-50">
                        {t('contact.cta_availability')}
                    </Button>
                    <Button size="lg" variant="ghost" className="w-full text-lg h-14 hover:bg-slate-100 text-slate-600">
                        {t('contact.cta_visit')} <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
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
             <div className={`mt-1 min-w-5 ${light ? 'text-emerald-400' : 'text-emerald-600'}`}>
                {icon || <Check className="w-5 h-5" />}
             </div>
             <span className={`text-base font-medium ${light ? 'text-slate-200' : 'text-slate-700'}`}>{text}</span>
        </div>
    )
}

function Card({ title, description, icon }: { title: string, description: string, icon: React.ReactNode }) {
    return (
        <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:shadow-lg transition-shadow duration-300">
            <div className="h-12 w-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6">
                {icon}
            </div>
            <h3 className="font-bold text-xl mb-3 text-slate-900">{title}</h3>
            <p className="text-slate-600 leading-relaxed">
                {description}
            </p>
        </div>
    )
}
