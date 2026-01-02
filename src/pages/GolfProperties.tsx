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
    <div className="">
      <Head>
        <title>{pageData.seo.title}</title>
        <meta name="description" content={pageData.seo.description} />
      </Head>
      
      <Navbar data={pageData} />

      <main>
        
        {/* HERO SECTION */}
        <section>
          <div>
            <img 
              src={resolveAsset('/assets/golf.jpg')} 
              alt="Modern new build villa overlooking a golf course in Costa Blanca" 
            />
            <div />
          </div>

          <Container>
            <div>
              <h1>
                {t('hero.title_start')} {t('hero.title_middle')} <span>{t('hero.title_highlight')}</span>
              </h1>
              <p>
                {t('hero.description')}
              </p>
              <div>
                <a href="#contact">
                  {t('hero.cta_brochure')}
                </a>
                <a href="#villas">
                  {t('hero.cta_explore')}
                </a>
              </div>
            </div>
          </Container>
        </section>

        {/* VILLAS SECTION */}
        <section id="villas">
          <Container>
            <div>
              <div>
                <h2>{t('villas.title')}</h2>
                <p>
                  {t('villas.description_1')}
                </p>
                <p>
                  {t('villas.description_2')}
                </p>
                <div>
                  <FeatureItem text={t('villas.points.layout')} />
                  <FeatureItem text={t('villas.points.space')} />
                  <FeatureItem text={t('villas.points.garden')} />
                </div>
              </div>
              <div>
                <img 
                  src={resolveAsset('/assets/lvb/lvb-01-3d.jpg')} 
                  alt="Modern villa interior design concept" 
                />
              </div>
            </div>
          </Container>
        </section>

        {/* GALLERY SECTION */}
        <section>
            <Container>
                <Gallery />
            </Container>
        </section>

        {/* GOLF SECTION */}
        <section id="golf">
          <Container>
            <div>
              <div>
                <img 
                  src={resolveAsset('/assets/lvb/golf-06-s.jpg')} 
                  alt="Golf course at Orihuela Costa" 
                />
              </div>
              <div>
                <h2>{t('golf.title')}</h2>
                <p>
                  {t('golf.description_1')}
                </p>
                <p>
                  {t('golf.description_2')}
                </p>
                <div>
                  <FeatureItem text={t('golf.points.cluster')} icon={<MapPin />} />
                  <FeatureItem text={t('golf.points.season')} icon={<Sun />} />
                  <FeatureItem text={t('golf.points.routine')} icon={<Check />} />
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* LOCATION SECTION */}
        <section id="location">
          <Container>
            <div>
              <h2>{t('location.title')}</h2>
              <p>
                {t('location.description')}
              </p>
            </div>
            
            <div>
              <FeatureCard 
                title={t('location.points.services.title')} 
                description={t('location.points.services.description')} 
                icon={<Home />} 
              />
              <FeatureCard 
                title={t('location.points.beaches.title')} 
                description={t('location.points.beaches.description')} 
                icon={<MapPin />} 
              />
              <FeatureCard 
                title={t('location.points.year_round.title')} 
                description={t('location.points.year_round.description')} 
                icon={<Sun />} 
              />
            </div>
          </Container>
        </section>

        {/* LIFESTYLE SECTION */}
        <section id="lifestyle">
          <Container>
            <div>
              <div>
                <img 
                  src={resolveAsset('/assets/lvb/lvb-13-3d.jpg')} 
                  alt="Modern villa design with low-maintenance pool area" 
                />
              </div>
              <div>
                <h2>{t('lifestyle.title')}</h2>
                <p>
                  {t('lifestyle.description_1')}
                </p>
                <p>
                  {t('lifestyle.description_2')}
                </p>
                <div>
                  <FeatureItem text={t('lifestyle.points.construction')} />
                  <FeatureItem text={t('lifestyle.points.outdoor')} />
                  <FeatureItem text={t('lifestyle.points.maintenance')} />
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* CONTACT/CTA SECTION */}
        <section id="contact">
          <Container>
            <div>
              <h2>{t('contact.title')}</h2>
              <p>
                <Trans i18nKey="contact.price_info" t={t} components={[<span key="0" />]} />
              </p>
              
              <div>
                ⚠️ {t('contact.warning')}
              </div>

              <div>
                <p>{t('contact.cta_intro')}</p>
                
                <button>
                  {t('contact.cta_brochure')}
                </button>
                <button>
                  {t('contact.cta_availability')}
                </button>
                <button>
                  {t('contact.cta_visit')} <ArrowRight />
                </button>
              </div>

              <div>
                <div>
                  <Check />
                  <span>Free Brochure</span>
                </div>
                <div>
                  <Check />
                  <span>No Obligation</span>
                </div>
                <div>
                  <Check />
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
    <div>
      <div>
        {icon || <Check />}
      </div>
      <span>{text}</span>
    </div>
  );
}

// Feature card component
function FeatureCard({ title, description, icon }: { title: string, description: string, icon: ReactNode }) {
  return (
    <div>
      <div>
        {icon}
      </div>
      <h3>{title}</h3>
      <p>
        {description}
      </p>
    </div>
  );
}
