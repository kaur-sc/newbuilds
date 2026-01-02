import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { useTranslation } from "react-i18next";
import { ArrowRight, Check } from "lucide-react";

interface ContactBadge {
  icon: string;
  text: string;
}

interface ContactSectionProps {
  data: {
    id: string;
    title?: string;
    subtitle?: string;
    description?: string;
    cta?: {
      label: string;
      href: string;
    };
    badges?: ContactBadge[];
  };
  namespace: string;
}

export function ContactSection({ data, namespace }: ContactSectionProps) {
  const { t } = useTranslation(namespace);

  // Default badges with check icons implicitly used in layout
  const badges = data.badges || [
    { icon: "check", text: "Free Information Pack" },
    { icon: "check", text: "Direct Pricing" },
    { icon: "check", text: "No Obligation" }
  ];

  return (
    <section 
      id={data.id}
      className="relative bg-[#10b77f] w-full flex flex-col justify-start items-center flex-nowrap py-24 px-4 sm:px-8"
    >
      <div className="w-full max-w-[90rem] flex flex-col justify-start items-center flex-nowrap gap-6">
        
        {/* Title */}
        <div className="relative w-full flex flex-col justify-start items-center flex-nowrap">
          <div className="flex justify-center text-center items-center w-full max-w-[54.125rem] relative">
            <h2 
              className="h2 text-white"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              {t(`${data.id}.title`, { defaultValue: data.title })}
            </h2>
          </div>
        </div>

        {/* Description */}
        <div className="relative w-full flex flex-col justify-start items-center flex-nowrap">
          <div className="flex justify-center text-center items-center w-full max-w-[42rem] relative">
            <p 
              className="body-l text-white"
            >
              {t(`${data.id}.description`, { defaultValue: data.description })}
            </p>
          </div>
        </div>

        {/* CTA Button */}
        {data.cta && (
          <div className="relative flex flex-col justify-center items-center flex-nowrap gap-4 mt-2">
            <Button 
              asChild 
              className="button bg-white hover:bg-gray-50 text-[#18b058] rounded shadow-sm h-auto py-3 px-8 transition-colors"
            >
              <a href={data.cta.href} className="no-underline flex flex-row items-center justify-center gap-2">
                <span 
                  className="whitespace-nowrap"
                >
                  {t(`${data.id}.cta_label`, { defaultValue: data.cta.label })}
                </span>
                <ArrowRight className="w-5 h-5" />
              </a>
            </Button>
          </div>
        )}

        {/* Badges / Footer Row */}
        <div className="relative w-full flex flex-row justify-center items-center flex-wrap gap-x-8 pt-12 border-[#ffffff19] border-t-[1px] mt-2">
          {badges.map((badge, index) => (
            <div key={index} className="flex flex-row justify-start items-center flex-nowrap gap-2">
              <Check className="w-4 h-4 text-white" />
              <span 
                className="small text-white whitespace-nowrap"
              >
                {badge.text}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
