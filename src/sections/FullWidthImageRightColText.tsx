import { Container } from "@/components/ui/container";
import { resolveAsset } from "@/lib/assets";
import { useTranslation } from "react-i18next";

export function FullWidthImageRightColText({
  data,
  namespace,
}: {
  data: {
    id: string;
    media?: string;
    title?: string;
    subtitle?: string;
    items?: Array<{
      title: string;
      description: string;
    }>;
  };
  namespace: string;
}) {
  const { t } = useTranslation(namespace);

  // Default image
  const media = data.media || "/assets/lvb/golf-06-s.jpg";

  return (
    <section className="full-width-image-right-col-text">
      <div 
        className="full-width-image-background"
        style={{ backgroundImage: `url(${resolveAsset(media)})` }}
      >
        <div className="image-overlay-gradient">
          <div className="full-width-image-content">
            <Container className="h-full flex items-center justify-end">
              <div className="full-width-image-text-content text-white max-w-[60%] min-h-[70vh] gap-6">
                <h2 className="h1 text-white">
                  {t(`${data.id}.title`, {
                    defaultValue: data.title,
                  })}
                </h2>
                <p className="body-l text-white leading-relaxed">
                  {t(`${data.id}.subtitle`, {
                    defaultValue: data.subtitle,
                  })}
                </p>
              </div>
            </Container>
          </div>
        </div>
      </div>
    </section>
  );
}
