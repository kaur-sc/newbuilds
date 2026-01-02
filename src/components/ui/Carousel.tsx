import { useRef, useImperativeHandle, forwardRef } from "react";
import type { ReactNode } from "react";

interface CarouselProps {
  children: ReactNode;
  className?: string;
  onScrollLeft?: () => void;
  onScrollRight?: () => void;
}

export interface CarouselRef {
  scrollLeft: () => void;
  scrollRight: () => void;
}

export const Carousel = forwardRef<CarouselRef, CarouselProps>(
  ({ children, className = "", onScrollLeft, onScrollRight }, ref) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => ({
      scrollLeft: () => {
        if (scrollRef.current) {
          // Get the computed value of the CSS variable
          const computedStyle = getComputedStyle(scrollRef.current);
          const scrollAmount = computedStyle.getPropertyValue('--carousel-scroll-amount');
          // Parse the CSS value (e.g., "400px" -> 400)
          const numericValue = parseFloat(scrollAmount) || 400;
          scrollRef.current.scrollBy({ left: -numericValue, behavior: 'smooth' });
          onScrollLeft?.();
        }
      },
      scrollRight: () => {
        if (scrollRef.current) {
          // Get the computed value of the CSS variable
          const computedStyle = getComputedStyle(scrollRef.current);
          const scrollAmount = computedStyle.getPropertyValue('--carousel-scroll-amount');
          // Parse the CSS value (e.g., "400px" -> 400)
          const numericValue = parseFloat(scrollAmount) || 400;
          scrollRef.current.scrollBy({ left: numericValue, behavior: 'smooth' });
          onScrollRight?.();
        }
      }
    }));

    return (
      <div className={`w-full ${className}`}>
        {/* Outer container: full width, no max constraint to allow extending beyond viewport */}
        <div className="w-full">
          {/* Inner container: calculate left offset to match centered Container */}
          <div className="ml-[max(1rem,calc((100vw-80rem)/2+1rem))] sm:ml-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))] lg:ml-[max(2rem,calc((100vw-80rem)/2+2rem)]">
            {/* Scrollable content: cards left-aligned, extends beyond viewport */}
            <div 
              ref={scrollRef}
              className="flex flex-row gap-6 overflow-x-auto pb-8 snap-x snap-mandatory"
              style={{ 
                scrollbarWidth: 'none', 
                msOverflowStyle: 'none',
                gap: 'var(--carousel-gap)',
                paddingBottom: 'var(--carousel-padding-b)'
              }}
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

Carousel.displayName = 'Carousel';
