import { resolveAsset } from "@/lib/assets";
import { useTranslation } from "react-i18next";

interface TwoColumnBlockProps {
  data: {
    id: string;
    title?: string;
    subtitle?: string;
    content?: string;
    media?: string;
    imagePosition?: 'left' | 'right';
  };
  namespace: string;
}

export function TwoColumnBlock({ data, namespace }: TwoColumnBlockProps) {
  const { t } = useTranslation(namespace);
  const imagePosition = data.imagePosition || 'left';

  return (
    <section className={`two-column-block relative w-full flex flex-col md:flex-row ${imagePosition === 'right' ? 'md:flex-row-reverse' : ''}`}>
      {/* Image Column */}
      <div className="two-column-image flex-1 relative overflow-hidden min-h-[400px] md:min-h-[600px]">
        {data.media ? (
          <img
            src={resolveAsset(data.media)}
            alt={t(`${data.id}.title`)}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">Image placeholder</span>
          </div>
        )}
      </div>

      {/* Content Column */}
      <div className="two-column-content flex-1 bg-primary flex flex-col justify-center items-start p-8 md:p-20 lg:p-32">
        <div className="two-column-content-wrapper max-w-2xl flex flex-col gap-8">
          <h2 className="h2 text-white">
            {t(`${data.id}.title`, { defaultValue: data.title })}
          </h2>

          <div className="two-column-paragraphs flex flex-col gap-6">
            <p className="two-column-subtitle text-lg md:text-xl text-white opacity-90 leading-relaxed">
              {t(`${data.id}.subtitle`, { defaultValue: data.subtitle })}
            </p>

            {data.content && (
              <p className="two-column-description text-lg md:text-xl text-white opacity-90 leading-relaxed">
                {t(`${data.id}.content`, { defaultValue: data.content })}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
