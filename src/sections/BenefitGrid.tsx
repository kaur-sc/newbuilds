import { Container } from "@/components/ui/container";
import { useTranslation } from "react-i18next";
import { Flag, Armchair, Globe, Plane, BadgeEuro, LandPlot, ScanFace } from "lucide-react";

interface BenefitItem {
  title: string;
  description: string;
  icon?: string;
}

interface BenefitGridProps {
  data: {
    id: string;
    title?: string;
    subtitle?: string;
    items?: BenefitItem[];
  };
  namespace: string;
}

export function BenefitGrid({ data, namespace }: BenefitGridProps) {
  const { t } = useTranslation(namespace);

  // Default benefits
  const benefits = data.items || [
    {
      title: "Golf at Your Doorstep",
      description: "Live within minutes of several championship courses. Play more often, drive less.",
      icon: "LandPlot"
    },
    {
      title: "Modern Comfort",
      description: "New-build properties offer contemporary design, energy efficiency, and low maintenance.",
      icon: "Armchair"
    },
    {
      title: "International Community",
      description: "Strong international population with excellent services and healthcare access.",
      icon: "Globe"
    },
    {
      title: "Easy Access",
      description: "Alicante and Murcia airports are both within easy reach with frequent flights.",
      icon: "Plane"
    },
    {
      title: "Lifestyle Flexibility",
      description: "Enjoy property yourself, rent it out seasonally, or combine both.",
      icon: "BadgeEuro"
    }
  ];

  const getIcon = (iconName: string) => {
    // Normalize icon name to PascalCase for mapping if needed, but we expect data to match
    // Mapping both case styles just in case
    const iconMap: Record<string, any> = {
      Flag, Armchair, Globe, Plane, BadgeEuro, LandPlot, 
      flag: Flag, armchair: Armchair, globe: Globe, plane: Plane, 'badge-euro': BadgeEuro, 'land-plot': LandPlot
    };
    
    // Provide a fallback or handle case sensitivity
    const keys = Object.keys(iconMap);
    const match = keys.find(key => key.toLowerCase() === iconName.toLowerCase().replace(/-/g, ''));
    
    const IconComponent = iconMap[iconName] || (match ? iconMap[match] : ScanFace);
    
    return <IconComponent className="w-12 h-12 text-[#10b981]" strokeWidth={1.5} />;
  };

  return (
    <section 
      id={data.id}
      className="relative w-full flex flex-col justify-start items-center flex-nowrap py-32 box-border"
    >
      <Container>
        <div 
          className="relative w-full flex flex-col justify-start items-start flex-nowrap gap-16"
        >
          <div 
            className="relative w-full flex flex-col justify-start items-start flex-nowrap gap-4"
          >
            <div 
              className="relative w-[42rem] max-w-full flex flex-col justify-start items-start flex-nowrap"
            >
              <h2 className="h2 text-left"
              >
                {t(`${data.id}.title`, { defaultValue: data.title })}
              </h2>
            </div>
          </div>

          <div 
            className="relative w-full flex flex-row justify-start items-start flex-wrap gap-x-8 gap-y-8"
          >
            {benefits.map((benefit, index) => (
              <div 
                key={index} 
                className="relative w-[36rem] max-w-full flex flex-row justify-start items-start flex-nowrap gap-8"
              >
                <div 
                  className="relative overflow-hidden h-12 w-12 flex-shrink-0"
                >
                   {getIcon(benefit.icon || 'default')}
                </div>

                <div 
                  className="relative flex-1 flex flex-col justify-start items-start flex-nowrap gap-2"
                >
                  <div 
                    className="relative w-full flex flex-col justify-start items-start flex-nowrap"
                  >
                    <h3 
                      className="body-l whitespace-nowrap"
                    >
                      {benefit.title}
                    </h3>
                  </div>

                  <div 
                    className="relative w-full flex flex-col justify-start items-start flex-nowrap"
                  >
                    <p 
                      className="small"
                    >
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
