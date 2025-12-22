import { useState, useCallback, useEffect } from 'react';
import { Container } from './container';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, Maximize2 } from 'lucide-react';

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
    { src: '/assets/lvb/lvb-01-3d.jpg', alt: 'La Vista Boulevard 3D View 1' },
    { src: '/assets/lvb/lvb-02-3d.jpg', alt: 'La Vista Boulevard 3D View 2' },
    { src: '/assets/lvb/lvb-03-3d.jpg', alt: 'La Vista Boulevard 3D View 3' },
    { src: '/assets/lvb/lvb-04-edited.jpg', alt: 'La Vista Boulevard Photo 4' },
    { src: '/assets/lvb/lvb-05-edited.jpg', alt: 'La Vista Boulevard Photo 5' },
    { src: '/assets/lvb/lvb-06-edited.jpg', alt: 'La Vista Boulevard Photo 6' },
    { src: '/assets/lvb/lvb-07-edited.jpg', alt: 'La Vista Boulevard Photo 7' },
    { src: '/assets/lvb/lvb-08-edited.jpg', alt: 'La Vista Boulevard Photo 8' },
    { src: '/assets/lvb/lvb-09-edited.jpg', alt: 'La Vista Boulevard Photo 9' },
    { src: '/assets/lvb/lvb-10-edited.jpg', alt: 'La Vista Boulevard Photo 10' },
    { src: '/assets/lvb/lvb-11-3d.jpg', alt: 'La Vista Boulevard 3D View 11' },
    { src: '/assets/lvb/lvb-12-3d.jpg', alt: 'La Vista Boulevard 3D View 12' },
    { src: '/assets/lvb/lvb-13-3d.jpg', alt: 'La Vista Boulevard 3D View 13' },
  ];

  const plans: GalleryItem[] = [
    { src: '/assets/lvb/lvb-development-block.webp', alt: 'Development Block Plan' },
    { src: '/assets/lvb/lvb-development-floors.webp', alt: 'Development Floor Plans' },
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
    <section className="py-20 md:py-32 bg-white overflow-hidden">
      <Container>
        <div className="text-center mb-12">
          <h2 className="h2">
            {t('gallery.title')}
          </h2>
          
          <div className="inline-flex p-1 bg-slate-100 rounded-xl mb-8">
            <button
              onClick={() => handleTabChange('photos')}
              className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                activeTab === 'photos'
                  ? 'bg-white text-emerald-600'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {t('gallery.tabs.photos')}
            </button>
            <button
              onClick={() => handleTabChange('plans')}
              className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                activeTab === 'plans'
                  ? 'bg-white text-emerald-600'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {t('gallery.tabs.plans')}
            </button>
          </div>
        </div>

        {/* Carousel / Multi-image Grid */}
        <div className="relative group">
          <div className="flex gap-4 overflow-x-auto pb-8 scrollbar-hide snap-x no-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {activeContent.map((item, index) => (
              <motion.div
                key={index}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex-none w-[85%] md:w-[45%] lg:w-[30%] snap-center cursor-pointer relative"
                onClick={() => handleOpenLightbox(index)}
              >
                <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-slate-100 relative group/item">
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="w-full h-full object-cover transform transition-transform duration-700 group-hover/item:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover/item:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover/item:opacity-100">
                    <Maximize2 className="text-white w-10 h-10" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Visual indicators for carousel */}
          <div className="flex justify-center gap-2 mt-4 md:hidden">
              {activeContent.map((_, idx) => (
                  <div key={idx} className="w-1.5 h-1.5 rounded-full bg-slate-200" />
              ))}
          </div>
        </div>
      </Container>

      {/* Lightbox Overlay */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex flex-col items-center select-none"
          >
            {/* Top Bar with Tab Switcher */}
            <div className="w-full flex items-center justify-between p-4 md:p-6 text-white bg-black/50 backdrop-blur-md border-b border-white/10">
                <div className="flex gap-4 md:gap-8">
                    <button
                        onClick={() => handleTabChange('photos')}
                        className={`text-sm md:text-base font-medium transition-colors ${activeTab === 'photos' ? 'text-emerald-400 border-b-2 border-emerald-400 pb-1' : 'text-gray-400 hover:text-white'}`}
                    >
                        {t('gallery.tabs.photos')}
                    </button>
                    <button
                        onClick={() => handleTabChange('plans')}
                        className={`text-sm md:text-base font-medium transition-colors ${activeTab === 'plans' ? 'text-emerald-400 border-b-2 border-emerald-400 pb-1' : 'text-gray-400 hover:text-white'}`}
                    >
                        {t('gallery.tabs.plans')}
                    </button>
                </div>
                
                <button 
                  onClick={handleCloseLightbox}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                    <X className="w-6 h-6 md:w-8 md:h-8" />
                </button>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 w-full flex items-center justify-between px-4 md:px-12 relative overflow-hidden">
                <button 
                  onClick={handlePrev}
                  className="hidden md:flex p-3 bg-white/5 hover:bg-white/10 rounded-full text-white transition-all transform hover:scale-110"
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
                  className="hidden md:flex p-3 bg-white/5 hover:bg-white/10 rounded-full text-white transition-all transform hover:scale-110"
                >
                    <ChevronRight className="w-8 h-8" />
                </button>
                
                {/* Mobile Arrows */}
                <div className="absolute inset-x-0 bottom-4 flex justify-between px-4 md:hidden">
                    <button onClick={handlePrev} className="p-2 bg-black/40 rounded-full text-white"><ChevronLeft className="w-6 h-6" /></button>
                    <button onClick={handleNext} className="p-2 bg-black/40 rounded-full text-white"><ChevronRight className="w-6 h-6" /></button>
                </div>
            </div>

            {/* Bottom Thumbnail Strip */}
            <div className="w-full h-24 md:h-32 bg-black/80 backdrop-blur-md flex items-center justify-center p-2 md:p-4 gap-2 md:gap-4 overflow-x-auto border-t border-white/10">
                {activeContent.map((item, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`relative flex-none h-full aspect-square rounded-md overflow-hidden transition-all duration-300 ${
                            currentIndex === index ? 'ring-2 ring-emerald-500 scale-110 z-10' : 'opacity-40 hover:opacity-100 scale-100'
                        }`}
                    >
                        <img src={item.src} className="w-full h-full object-cover" alt={`Thumb ${index}`} />
                        {currentIndex === index && <div className="absolute inset-0 bg-emerald-500/10" />}
                    </button>
                ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
