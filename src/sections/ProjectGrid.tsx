import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Carousel, type CarouselRef } from "@/components/ui/Carousel";
import { resolveAsset } from "@/lib/assets";
import { useTranslation } from "react-i18next";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProjectItem {
  title: string;
  description: string;
  reference?: string;
  image?: string;
  cta?: {
    label: string;
    href: string;
  };
}

interface ProjectGridProps {
  data: {
    id: string;
    title?: string;
    subtitle?: string;
    items?: ProjectItem[];
  };
  namespace: string;
}

export function ProjectGrid({ data, namespace }: ProjectGridProps) {
  const { t } = useTranslation(namespace);
  const carouselRef = useRef<CarouselRef>(null);

  // Default projects if none provided
  const projects = data.items || [
    {
      title: "La Vista Boulevard - Phase 1",
      description: "Modern 2-3 bedroom villas with stunning golf views and Mediterranean architecture.",
      image: "/assets/lvb/lvb-01-3d.jpg",
      reference: "SCG001",
      cta: { label: "View Project", href: "#" }
    },
    {
      title: "La Vista Boulevard - Phase 2",
      description: "Contemporary apartments and townhouses with premium finishes and communal facilities.",
      image: "/assets/lvb/lvb-02-3d.jpg",
      reference: "SCG002",
      cta: { label: "View Project", href: "#" }
    },
    {
      title: "La Vista Boulevard - Phase 3",
      description: "Luxury villas with private pools and panoramic golf course views.",
      image: "/assets/lvb/lvb-03-3d.jpg",
      reference: "SCG003",
      cta: { label: "View Project", href: "#" }
    },
    {
      title: "La Vista Boulevard - Premium Collection",
      description: "Exclusive residences with enhanced amenities and landscaped gardens.",
      image: "/assets/lvb/lvb-11-3d.jpg",
      reference: "SCG011",
      cta: { label: "View Project", href: "#" }
    },
    {
      title: "La Vista Boulevard - Golf View Residences",
      description: "Stunning properties overlooking championship fairways with modern design.",
      image: "/assets/lvb/lvb-12-3d.jpg",
      reference: "SCG012",
      cta: { label: "View Project", href: "#" }
    },
    {
      title: "La Vista Boulevard - Final Phase",
      description: "Last opportunity to secure your dream home in this prestigious development.",
      image: "/assets/lvb/lvb-13-3d.jpg",
      reference: "SCG013",
      cta: { label: "View Project", href: "#" }
    }
  ];

  return (
    <section className="project-grid relative bg-muted w-full" style={{ paddingTop: 'var(--project-section-padding-y)', paddingBottom: 'var(--project-section-padding-y)' }}>
      <Container style={{ marginBottom: 'var(--project-section-margin-b)' }}>
        <div className="project-grid-header flex flex-col md:flex-row justify-between items-start md:items-end" style={{ gap: 'var(--project-header-gap)' }}>
          <div className="project-grid-header-content max-w-2xl flex flex-col gap-4">
            <h2 className="h2">
              {t(`${data.id}.title`, { defaultValue: data.title })}
            </h2>

            <p className="body opacity-80 max-w-xl">
              {t(`${data.id}.subtitle`, { defaultValue: data.subtitle })}
            </p>
          </div>

          <div className="project-grid-controls hidden md:flex items-center" style={{ gap: 'var(--project-controls-gap)' }}>
            <button
              onClick={() => carouselRef.current?.scrollLeft()}
              className="rounded-full bg-white flex items-center justify-center hover:bg-gray-100 transition-colors shadow-sm"
              style={{ 
                width: 'var(--project-card-control-size)', 
                height: 'var(--project-card-control-size)' 
              }}
              aria-label="Previous"
            >
              <ChevronLeft style={{ width: 'var(--project-card-control-icon)', height: 'var(--project-card-control-icon)' }} />
            </button>
            <button
              onClick={() => carouselRef.current?.scrollRight()}
              className="rounded-full bg-white flex items-center justify-center hover:bg-gray-100 transition-colors shadow-sm"
              style={{ 
                width: 'var(--project-card-control-size)', 
                height: 'var(--project-card-control-size)' 
              }}
              aria-label="Next"
            >
              <ChevronRight style={{ width: 'var(--project-card-control-icon)', height: 'var(--project-card-control-icon)' }} />
            </button>
          </div>
        </div>
      </Container>

      {/* Full-width carousel container */}
      <Carousel ref={carouselRef}>
          {projects.map((project, index) => (
            <div 
              key={index} 
              className="project-card flex-shrink-0 bg-white rounded-lg overflow-hidden snap-start flex flex-col"
              style={{ width: 'var(--project-card-width)' }}
            >
              {/* Image */}
              <div className="project-card-image relative aspect-[16/11] overflow-hidden">
                {project.image ? (
                  <img
                    src={resolveAsset(project.image)}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 w-full h-full bg-gray-300 flex items-center justify-center">
                    <span className="p">Project Image</span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="project-card-content flex flex-col flex-1" style={{ padding: 'var(--project-card-padding)', gap: 'var(--project-card-gap)' }}>
                <div className="project-card-info flex flex-col gap-3 flex-1">
                  <h3 className="h3">
                    {project.title}
                  </h3>

                  {project.reference && (
                    <p className="project-card-reference text-sm text-gray-500 font-medium">
                      Ref.: {project.reference}
                    </p>
                  )}

                  <p className="small line-clamp-3">
                    {project.description}
                  </p>
                </div>

                {project.cta && (
                  <Button asChild className="button project-card-button bg-primary hover:bg-primary/90 text-white w-full rounded-[4px]" style={{ height: 'var(--project-card-button-height)' }}>
                    <a href={project.cta.href}>{project.cta.label}</a>
                  </Button>
                )}
              </div>
            </div>
          ))}
      </Carousel>
    </section>
  );
}
