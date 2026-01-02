import { useState, useCallback, useEffect } from 'react';
import { Container } from '@/components/ui/container';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, Maximize2 } from 'lucide-react';
import { resolveAsset } from '@/lib/assets';

type GallerySection = 'photos' | 'plans';

interface GalleryItem {
  src: string;
  alt: string;
}

export function Gallery() {
  const { t } = useTranslation('costa-blanca');
  const [activeTab, setActiveTab] = useState<GallerySection>('photos');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const photos: GalleryItem[] = [
    { src: resolveAsset('/assets/lvb/lvb-01-3d.jpg'), alt: 'La Vista Boulevard 3D View 1' },
    { src: resolveAsset('/assets/lvb/lvb-02-3d.jpg'), alt: 'La Vista Boulevard 3D View 2' },
    { src: resolveAsset('/assets/lvb/lvb-03-3d.jpg'), alt: 'La Vista Boulevard 3D View 3' },
    { src: resolveAsset('/assets/lvb/lvb-04-edited.jpg'), alt: 'La Vista Boulevard Photo 4' },
    { src: resolveAsset('/assets/lvb/lvb-05-edited.jpg'), alt: 'La Vista Boulevard Photo 5' },
    { src: resolveAsset('/assets/lvb/lvb-06-edited.jpg'), alt: 'La Vista Boulevard Photo 6' },
    { src: resolveAsset('/assets/lvb/lvb-07-edited.jpg'), alt: 'La Vista Boulevard Photo 7' },
    { src: resolveAsset('/assets/lvb/lvb-08-edited.jpg'), alt: 'La Vista Boulevard Photo 8' },
    { src: resolveAsset('/assets/lvb/lvb-09-edited.jpg'), alt: 'La Vista Boulevard Photo 9' },
    { src: resolveAsset('/assets/lvb/lvb-10-edited.jpg'), alt: 'La Vista Boulevard Photo 10' },
    { src: resolveAsset('/assets/lvb/lvb-11-3d.jpg'), alt: 'La Vista Boulevard 3D View 11' },
    { src: resolveAsset('/assets/lvb/lvb-12-3d.jpg'), alt: 'La Vista Boulevard 3D View 12' },
    { src: resolveAsset('/assets/lvb/lvb-13-3d.jpg'), alt: 'La Vista Boulevard 3D View 13' },
  ];

  const plans: GalleryItem[] = [
    { src: resolveAsset('/assets/lvb/lvb-development-block.webp'), alt: 'Development Block Plan' },
    { src: resolveAsset('/assets/lvb/lvb-development-floors.webp'), alt: 'Development Floor Plans' },
  ];

  const activeContent = activeTab === 'photos' ? photos : plans;

  const handleOpenLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'unset';
  };

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : activeContent.length - 1));
  }, [activeContent.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev < activeContent.length - 1 ? prev + 1 : 0));
  }, [activeContent.length]);

  const handleTabChange = useCallback((tab: GallerySection) => {
    setActiveTab(tab);
    setCurrentIndex(0);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'Escape') handleCloseLightbox();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, handlePrev, handleNext]);

  return (
    <section className="py-20 md:py-32 overflow-hidden">
      <Container className="mb-12">
        <div className="text-center">
          <h2 className="h2 mb-6">
            {t('gallery.title')}
          </h2>
          
          <div className="gallery-tab-container inline-flex">
            <button
              onClick={() => handleTabChange('photos')}
              className={`gallery-tab ${activeTab === 'photos' ? 'active' : ''}`}
            >
              {t('gallery.tabs.photos')}
            </button>
            <button
              onClick={() => handleTabChange('plans')}
              className={`gallery-tab ${activeTab === 'plans' ? 'active' : ''}`}
            >
              {t('gallery.tabs.plans')}
            </button>
          </div>
        </div>
      </Container>

      {/* Gallery Grid - Left aligned with title */}
      <div className="w-full">
        {/* Outer container: full width, no max constraint */}
        <div className="w-full">
          {/* Inner container: calculate left offset to match centered Container */}
          <div className="ml-[max(1rem,calc((100vw-80rem)/2+1rem))] sm:ml-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))] lg:ml-[max(2rem,calc((100vw-80rem)/2+2rem)]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-8">
              {activeContent.map((item, index) => (
                <motion.div
                  key={index}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative cursor-pointer"
                  onClick={() => handleOpenLightbox(index)}
                >
                  <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden border border-border relative group/item">
                    <img
                      src={item.src}
                      alt={item.alt}
                      className="w-full h-full object-cover transform transition-transform duration-700 group-hover/item:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover/item:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover/item:opacity-100">
                      <Maximize2 className="text-background w-10 h-10" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Overlay */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background/95 flex flex-col items-center select-none text-foreground"
          >
            {/* Top Bar with Tab Switcher */}
            <div className="w-full flex items-center justify-between p-4 md:p-6 backdrop-blur-md border-b border-border">
                <div className="flex gap-4 md:gap-8">
                    <button
                        onClick={() => handleTabChange('photos')}
                        className={`gallery-tab ${activeTab === 'photos' ? 'active' : ''}`}
                    >
                        {t('gallery.tabs.photos')}
                    </button>
                    <button
                        onClick={() => handleTabChange('plans')}
                        className={`gallery-tab ${activeTab === 'plans' ? 'active' : ''}`}
                    >
                        {t('gallery.tabs.plans')}
                    </button>
                </div>
                
                <button 
                  onClick={handleCloseLightbox}
                  className="btn-ghost"
                >
                    <X className="w-6 h-6 md:w-8 md:h-8" />
                </button>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 w-full flex items-center justify-between px-4 md:px-12 relative overflow-hidden">
                <button 
                  onClick={handlePrev}
                  className="hidden md:flex btn-ghost"
                >
                    <ChevronLeft className="w-8 h-8" />
                </button>

                <div className="relative flex-1 h-full flex items-center justify-center p-4 md:p-8">
                    <AnimatePresence mode="wait">
                        <motion.img
                           key={`${activeTab}-${currentIndex}`}
                           initial={{ opacity: 0, x: 50, scale: 0.95 }}
                           animate={{ opacity: 1, x: 0, scale: 1 }}
                           exit={{ opacity: 0, x: -50, scale: 0.95 }}
                           transition={{ duration: 0.3 }}
                           src={activeContent[currentIndex].src}
                           alt={activeContent[currentIndex].alt}
                           className="max-w-full max-h-full object-contain rounded-lg"
                        />
                    </AnimatePresence>
                </div>

                <button 
                  onClick={handleNext}
                  className="hidden md:flex btn-ghost"
                >
                    <ChevronRight className="w-8 h-8" />
                </button>
                
                {/* Mobile Arrows */}
                <div className="absolute inset-x-0 bottom-4 flex justify-between px-4 md:hidden">
                    <button onClick={handlePrev} className="btn-ghost"><ChevronLeft className="w-6 h-6" /></button>
                    <button onClick={handleNext} className="btn-ghost"><ChevronRight className="w-6 h-6" /></button>
                </div>
            </div>

            {/* Bottom Thumbnail Strip */}
            <div className="w-full h-24 md:h-32 backdrop-blur-md flex items-center justify-center p-2 md:p-4 gap-2 md:gap-4 overflow-x-auto bg-background/80 border-t border-border">
                {activeContent.map((item, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`relative flex-none h-full aspect-square rounded-md overflow-hidden transition-all duration-300 ${
                            currentIndex === index ? 'ring-2 ring-primary scale-110 z-10' : 'opacity-40 hover:opacity-100 scale-100'
                        }`}
                    >
                        <img src={item.src} className="w-full h-full object-cover" alt={`Thumb ${index}`} />
                        {currentIndex === index && <div className="absolute inset-0 bg-primary/10" />}
                    </button>
                ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
