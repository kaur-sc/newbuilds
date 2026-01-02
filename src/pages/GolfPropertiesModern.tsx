import { type ReactNode, useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Check, MapPin, Sun, Home, ArrowRight, Bed, Bath, Ruler, Waves, Coffee, ShoppingBag, Plane, Calendar, Star, ChevronRight } from 'lucide-react';
import type { LandingPageData } from '@/models/landing-page';
import { Head } from 'vite-react-ssg';
import { useTranslation, Trans } from 'react-i18next';
import { getPageTheme } from "@/lib/pageThemeManager";
import { applyTheme } from "@/themes/resolver";
import { resolveAsset } from '@/lib/assets';
import { Gallery } from '@/components/ui/Gallery';

export function GolfPropertiesModern() {
  const { t } = useTranslation('costa-blanca');

  // Apply saved theme on page load
  useEffect(() => {
    const currentPath = window.location.pathname;
    const savedTheme = getPageTheme(currentPath);

    if (savedTheme) {
        console.log(
            `🎨 Applying saved theme "${savedTheme}" to Golf Properties Modern page`,
        );
        applyTheme(savedTheme);
    }
  }, []);

  // Mock data for Navbar/Footer compatibility
  const pageData: LandingPageData = {
    id: 'costa-blanca-modern',
    name: 'Golf Properties Modern',
    brand: {
      colors: {
        primary: '142.1 76.2% 36.3%',
        secondary: '30 80% 90%',
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

      <main id="MainContent" className="flex-1" role="main" tabIndex={-1}>
        
        {/* HERO - Emotional Hook with Storytelling */}
        <section className="hero-parallax">
          <img 
            src={resolveAsset('/assets/golf.jpg')} 
            alt="Modern new build villa overlooking a golf course in Costa Blanca" 
            className="hero-parallax-img"
            loading="eager"
            fetchPriority="high"
          />
          <div className="gradient-overlay"></div>
          
          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <div className="container-modern text-center">
              <div className="animate-fade-in-up">
                <h1 className="h1 text-white mb-6">
                  Imagine Waking Up to<br/>18-Hole Golf Views<br/>
                  <span className="text-accent">Every Single Morning</span>
                </h1>
                <p className="body-l text-white/90 mb-8 max-w-2xl mx-auto">
                  Your dream golf getaway is waiting in La Zenia, Costa Blanca. Modern villas designed for golf lovers who refuse to compromise.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a href="#contact" className="btn-primary">
                    {t('hero.cta_brochure')}
                  </a>
                  <a href="#villas" className="btn-ghost bg-white/20 backdrop-blur-sm text-white hover:bg-white/30">
                    Explore Properties <ChevronRight className="ml-2 w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SCROLLING TEXT BANNER - Social Proof */}
        <section className="overflow-hidden bg-primary py-4">
          <div className="flex gap-8 animate-fade-in whitespace-nowrap">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center gap-8 small text-white">
                <span>✦ 300+ Days of Sunshine</span>
                <span>•</span>
                <span>✦ 5 Golf Courses Within 10 min</span>
                <span>•</span>
                <span>✦ Mediterranean Lifestyle</span>
                <span>•</span>
                <span>✦ Lock-Up-and-Leave Ready</span>
                <span>•</span>
                <span>✦ From €449,900</span>
              </div>
            ))}
          </div>
        </section>

        {/* INTRODUCTION - Paint's Picture */}
        <section className="modern-section">
          <div className="container-modern max-w-4xl">
            <div className="text-center mb-16 animate-fade-in-up">
              <h2 className="h2 mb-6">Your Perfect Golf Life Starts Here</h2>
              <p className="body-l text-muted-foreground">
                {t('hero.description')}
              </p>
            </div>

            {/* Key Benefits - Plain Text Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 animate-fade-in-up">
              <div>
                <div className="mb-6">
                  <GolfIcon />
                </div>
                <h3 className="h3 mb-4">Multiple Golf Courses</h3>
                <p className="body text-muted-foreground">
                  5 championship courses within 10 minutes drive - never play the same course twice in a week. Rotate weekly, vary difficulty, keep your game fresh.
                </p>
              </div>
              <div>
                <div className="mb-6">
                  <Sun className="w-10 h-10 text-primary" />
                </div>
                <h3 className="h3 mb-4">Year-Round Climate</h3>
                <p className="body text-muted-foreground">
                  300+ sunny days annually - perfect golf weather from January to December. Mild winters mean you can escape cold and play year-round.
                </p>
              </div>
              <div>
                <div className="mb-6">
                  <Waves className="w-10 h-10 text-primary" />
                </div>
                <h3 className="h3 mb-4">Beach & Golf Combined</h3>
                <p className="body text-muted-foreground">
                  Sandy beaches just 5 minutes away - best of both worlds in one location. You don't have to choose between golf and beach lifestyle.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* PROPERTY SHOWCASE - The Villas */}
        <section id="villas" className="modern-section bg-muted">
          <div className="container-modern">
            <div className="mb-12 text-center animate-fade-in-up">
              <h2 className="h2 mb-4">Modern Villas Built for Golfers</h2>
              <p className="body-l text-muted-foreground max-w-2xl mx-auto">
                {t('villas.description_1')}
              </p>
            </div>

            {/* Full VW Image */}
            <div className="mb-12 animate-fade-in-up delay-100">
              <div className="full-vw-image">
                <img 
                  src={resolveAsset('/assets/lvb/lvb-01-3d.jpg')} 
                  alt="Modern villa interior design concept" 
                  className="w-full h-full img-zoom"
                />
              </div>
            </div>

            {/* Property Stats - Numeric Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 animate-fade-in-up delay-200">
              <StatCard icon={<Bed />} value="3" label={<span className="small">Bedrooms</span>} />
              <StatCard icon={<Bath />} value="2" label={<span className="small">Bathrooms</span>} />
              <StatCard icon={<Ruler />} value="106m²" label={<span className="small">Built Area</span>} />
              <StatCard icon={<Home />} value="150m²" label={<span className="small">Garden</span>} />
            </div>

            {/* Detailed Features - Plain Text */}
            <div className="mb-12 animate-fade-in-up delay-300">
              <div className="space-y-8">
                <div>
                  <h3 className="h3 mb-3">Smart Layout</h3>
                  <p className="body text-muted-foreground">{t('villas.points.layout')}</p>
                </div>
                <div>
                  <h3 className="h3 mb-3">Generous Space</h3>
                  <p className="body text-muted-foreground">{t('villas.points.space')}</p>
                </div>
                <div>
                  <h3 className="h3 mb-3">Private Plot</h3>
                  <p className="body text-muted-foreground">{t('villas.points.garden')}</p>
                </div>
              </div>
            </div>

            {/* Additional Info - Card */}
            <div className="bg-card rounded-2xl p-8 border border-border animate-fade-in-up delay-400">
              <h3 className="h3 mb-4">Why This Layout Works for You</h3>
              <p className="body text-muted-foreground">
                {t('villas.description_2')}
              </p>
            </div>
          </div>
        </section>

        {/* GALLERY - Visual Details */}
        <section className="modern-section">
          <div className="container-modern">
            <div className="mb-12 text-center animate-fade-in">
              <h2 className="h2 mb-4">Explore Every Corner</h2>
              <p className="body-l text-muted-foreground">See the quality, space, and attention to detail</p>
            </div>
            
            <Gallery />
          </div>
        </section>

        {/* GOLF LIFESTYLE - Your Golf Life */}
        <section id="golf" className="modern-section bg-muted">
          <div className="container-modern">
            <div className="mb-12 text-center animate-fade-in-up">
              <h2 className="h2 mb-4">Your Base in Orihuela Costa Golf Belt</h2>
              <p className="body-l text-muted-foreground max-w-3xl mx-auto">
                {t('golf.description_1')}
              </p>
            </div>

            {/* Full VW Image */}
            <div className="mb-12 animate-fade-in-up delay-100">
              <div className="full-vw-image">
                <img 
                  src={resolveAsset('/assets/lvb/golf-06-s.jpg')} 
                  alt="Golf course at Orihuela Costa" 
                  className="w-full h-full img-zoom"
                />
              </div>
            </div>

            {/* Golf Benefits - Plain Text */}
            <div className="mb-12 animate-fade-in-up delay-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div>
                  <div className="mb-6">
                    <MapPin className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="h3 mb-4">Golf Course Cluster</h3>
                  <p className="body text-muted-foreground">
                    Not just one course - choose from multiple 18-hole championship courses. Rotate weekly, vary difficulty, keep your game fresh. The variety keeps golf exciting.
                  </p>
                </div>
                <div>
                  <div className="mb-6">
                    <Calendar className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="h3 mb-4">Extended Season</h3>
                  <p className="body text-muted-foreground">
                    Mild winters mean year-round golf. Escape the cold, play in perfect conditions from January through December. No more winter off-season.
                  </p>
                </div>
                <div>
                  <div className="mb-6">
                    <Sun className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="h3 mb-4">Perfect Routine</h3>
                  <p className="body text-muted-foreground">
                    Golf in the morning, terrace lunch, beach afternoon - or siesta, sunset, dinner. Your pace, your choice. Build your ideal daily routine.
                  </p>
                </div>
              </div>
            </div>

            {/* Season Info - Card */}
            <div className="bg-card rounded-2xl p-8 border border-border animate-fade-in-up delay-300">
              <h3 className="h3 mb-4">Winter Golf Paradise</h3>
              <p className="body text-muted-foreground">
                {t('golf.description_2')}
              </p>
            </div>
          </div>
        </section>

        {/* LOCATION & ACTIVITIES - Everything Nearby */}
        <section id="location" className="modern-section">
          <div className="container-modern">
            <div className="mb-12 text-center animate-fade-in-up">
              <h2 className="h2 mb-4">La Zenia: Everything You Need Within Reach</h2>
              <p className="body-l text-muted-foreground max-w-3xl mx-auto mb-6">
                {t('location.description')}
              </p>
              <p className="body text-muted-foreground">
                {t('location.note')}
              </p>
            </div>

            {/* What's Nearby - Numeric Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 animate-fade-in-up">
              <DistanceCard 
                icon={<ShoppingBag className="w-8 h-8" />}
                title="Shopping"
                items={['Large Shopping Centre', 'Supermarkets', 'Local Markets', 'Pharmacies']}
                distance="5 min"
              />
              <DistanceCard 
                icon={<Coffee className="w-8 h-8" />}
                title="Dining"
                items={['Restaurants', 'Cafés & Bars', 'Local Cuisine', 'International Options']}
                distance="5 min"
              />
              <DistanceCard 
                icon={<Waves className="w-8 h-8" />}
                title="Beaches"
                items={['Sandy Beaches', 'Hidden Coves', 'Coastal Walks', 'Water Sports']}
                distance="5 min"
              />
              <DistanceCard 
                icon={<Plane className="w-8 h-8" />}
                title="Airport"
                items={['Alicante Airport', 'Murcia Airport', 'Easy Access', 'Flights Daily']}
                distance="45 min"
              />
            </div>

            {/* Location Features - Plain Text */}
            <div className="animate-fade-in-up">
              <div className="space-y-8">
                <div>
                  <h3 className="h3 mb-3">{t('location.points.services.title')}</h3>
                  <p className="body text-muted-foreground">{t('location.points.services.description')}</p>
                </div>
                <div>
                  <h3 className="h3 mb-3">{t('location.points.beaches.title')}</h3>
                  <p className="body text-muted-foreground">{t('location.points.beaches.description')}</p>
                </div>
                <div>
                  <h3 className="h3 mb-3">{t('location.points.year_round.title')}</h3>
                  <p className="body text-muted-foreground">{t('location.points.year_round.description')}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* LIFESTYLE - Modern Comfort */}
        <section id="lifestyle" className="modern-section bg-foreground text-background">
          <div className="container-modern">
            <div className="mb-12 text-center animate-fade-in-up">
              <h2 className="h2 mb-4 text-background">Built for Your Lifestyle</h2>
              <p className="body-l text-background max-w-3xl mx-auto mb-6">
                {t('lifestyle.description_1')}
              </p>
            </div>

            {/* Full VW Image */}
            <div className="mb-12 animate-fade-in-up delay-100">
              <div className="full-vw-image">
                <img 
                  src={resolveAsset('/assets/lvb/lvb-13-3d.jpg')} 
                  alt="Modern villa design with low-maintenance pool area" 
                  className="w-full h-full img-zoom"
                />
              </div>
            </div>

            {/* Lifestyle Benefits - Plain Text */}
            <div className="mb-12 animate-fade-in-up delay-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div>
                  <div className="mb-6">
                    <Home className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="h3 mb-4 text-background">New Construction</h3>
                  <p className="body text-background/70">
                    {t('lifestyle.points.construction')} Modern materials and equipment ensure quality and durability for years to come.
                  </p>
                </div>
                <div>
                  <div className="mb-6">
                    <Sun className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="h3 mb-4 text-background">Outdoor Living</h3>
                  <p className="body text-background/70">
                    {t('lifestyle.points.outdoor')} Spaces designed for al fresco dining, relaxing, and entertaining in Spanish sunshine.
                  </p>
                </div>
                <div>
                  <div className="mb-6">
                    <Plane className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="h3 mb-4 text-background">Hassle-Free</h3>
                  <p className="body text-background/70">
                    {t('lifestyle.points.maintenance')} A home that's easy to close, leave, and open again several times a year.
                  </p>
                </div>
              </div>
            </div>

            {/* Additional Info - Card */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 animate-fade-in-up delay-300">
              <h3 className="h3 mb-4 text-background">The Perfect Balance</h3>
              <p className="body text-background/70">
                {t('lifestyle.description_2')}
              </p>
            </div>
          </div>
        </section>

        {/* WHY CHOOSE US - Trust & Scarcity */}
        <section className="modern-section bg-gradient-to-br from-primary/5 to-secondary/5">
          <div className="container-modern max-w-5xl">
            <div className="animate-fade-in-up">
              <h2 className="h2 mb-6 text-center">Why Costa Blanca?</h2>
              <div className="max-w-2xl mx-auto space-y-4">
                <TrustItem text="Exclusive development - only a limited number of villas" />
                <TrustItem text="Prime location in La Zenia - established residential area" />
                <TrustItem text="Proven developer track record" />
                <TrustItem text="Designed specifically for international buyers" />
                <TrustItem text="Turnkey delivery - move-in ready" />
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT - Clear CTA */}
        <section id="contact" className="modern-section">
          <div className="container-modern">
            <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
              <h2 className="h2 mb-6">{t('contact.title')}</h2>
              
              <div className="bg-card rounded-3xl p-8 md:p-12 border border-border mb-8">
                <Trans i18nKey="contact.price_info" t={t} components={[<span className="display-md text-primary mx-2" key="0" />]} />
              </div>
              
              <div className="bg-secondary text-secondary-foreground px-6 py-4 rounded-xl mb-8 inline-block body">
                ⚠️ {t('contact.warning')}
              </div>
              
              <p className="body-l mb-8 text-muted-foreground">
                {t('contact.cta_intro')}
              </p>
              
              <div className="space-y-4 max-w-md mx-auto">
                <button className="btn-primary w-full">
                  {t('contact.cta_brochure')}
                </button>
                <button className="btn-outline w-full">
                  {t('contact.cta_availability')}
                </button>
                <button className="btn-outline w-full">
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
          </div>
        </section>

      </main>

      <Footer data={pageData} />
    </div>
  );
}

// Numeric data cards only
function StatCard({ icon, value, label }: { icon: ReactNode, value: string, label: string }) {
  return (
    <div className="bg-card rounded-2xl p-6 border border-border text-center">
      <div className="h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
        {icon}
      </div>
      <div className="display-md text-primary mb-1">{value}</div>
      <div className="small text-muted-foreground">{label}</div>
    </div>
  );
}

function DistanceCard({ icon, title, items, distance }: { icon: ReactNode, title: string, items: string[], distance: string }) {
  return (
    <div className="bg-card rounded-2xl p-6 border border-border">
      <div className="h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="h3 mb-4">{title}</h3>
      <ul className="space-y-2 mb-4">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-2 small text-muted-foreground">
            <div className="w-1.5 h-1.5 bg-primary/50 rounded-full"></div>
            {item}
          </li>
        ))}
      </ul>
      <div className="flex items-center gap-2 small text-primary">
        <MapPin className="w-4 h-4" />
        {distance}
      </div>
    </div>
  );
}

function TrustItem({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3">
      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
      <span className="body text-foreground">{text}</span>
    </div>
  );
}

function GolfIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-primary">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a10 10 0 0 1 10 10" />
      <path d="M12 12l-3-5" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
    </svg>
  );
}
