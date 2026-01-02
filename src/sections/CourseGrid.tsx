import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Carousel, type CarouselRef } from "@/components/ui/Carousel";
import { resolveAsset } from "@/lib/assets";
import { useTranslation } from "react-i18next";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

interface CourseItem {
  title: string;
  description: string;
  image?: string;
  cta?: {
    label: string;
    href: string;
  };
}

interface CourseGridProps {
  data: {
    id: string;
    title?: string;
    subtitle?: string;
    items?: CourseItem[];
  };
  namespace: string;
}

export function CourseGrid({ data, namespace }: CourseGridProps) {
  const { t } = useTranslation(namespace);
  const carouselRef = useRef<CarouselRef>(null);

  // Default golf courses
  const courses = data.items || [
    {
      title: "Villamartín Golf",
      description: "Established and iconic course with a vibrant community.",
      cta: { label: "View Homepage", href: "#" }
    },
    {
      title: "Las Ramblas Golf",
      description: "Challenging course with dramatic landscapes and views.",
      cta: { label: "View Homepage", href: "#" }
    },
    {
      title: "Real Club de Golf Campoamor",
      description: "Championship course with mature surroundings.",
      cta: { label: "View Homepage", href: "#" }
    },
    {
      title: "Las Colinas Golf & Country Club",
      description: "Private valley setting with world-class facilities.",
      cta: { label: "View Homepage", href: "#" }
    },
    {
      title: "Lo Romero Golf",
      description: "Beautiful 18th hole island green and stunning vistas.",
      cta: { label: "View Homepage", href: "#" }
    }
  ];

  return (
    <section className="course-grid relative bg-white w-full py-20 md:py-32">
      <Container className="mb-12">
        <div className="course-grid-header flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div className="course-grid-header-content max-w-2xl flex flex-col gap-4">
            <h2 className="h2">
              {t(`${data.id}.title`, { defaultValue: data.title })}
            </h2>

            <p className="body">
              {t(`${data.id}.subtitle`, { defaultValue: data.subtitle })}
            </p>
          </div>

          <div className="course-grid-controls hidden md:flex items-center gap-4">
            <button
              onClick={() => carouselRef.current?.scrollLeft()}
              className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm"
              aria-label="Previous"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => carouselRef.current?.scrollRight()}
              className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm"
              aria-label="Next"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </Container>

      {/* Full-width carousel container */}
      <Carousel ref={carouselRef}>
          {courses.map((course, index) => (
            <div 
              key={index} 
              className="course-card flex-shrink-0 w-[300px] md:w-[380px] bg-muted rounded-lg overflow-hidden snap-start flex flex-col"
            >
              {/* Image */}
              <div className="course-card-image relative aspect-[16/11] overflow-hidden">
                {course.image ? (
                  <img
                    src={resolveAsset(course.image)}
                    alt={course.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src="/assets/golf.jpg"
                    alt={course.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}
              </div>

              {/* Content */}
              <div className="course-card-content p-6 md:p-8 flex flex-col flex-1 gap-6">
                <div className="course-card-info flex flex-col gap-4 flex-1">
                  <h3 className="h3">
                    {course.title}
                  </h3>

                  <p className="small">
                    {course.description}
                  </p>
                </div>

                {course.cta && (
                  <Button asChild className="course-card-button bg-primary hover:bg-primary/90 text-white w-full rounded-md h-12">
                    <a href={course.cta.href} className="flex items-center justify-center gap-2">
                      {course.cta.label}
                      <ArrowRight className="w-4 h-4 text-white" />
                    </a>
                  </Button>
                )}
              </div>
            </div>
          ))}
      </Carousel>
    </section>
  );
}
