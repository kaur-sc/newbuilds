import { Container } from "@/components/ui/container";
import { useTranslation } from "react-i18next";

interface TwoColumnListProps {
  id: string;
  items: Array<{
    title: string;
    description: string;
  }>;
  namespace: string;
}

export function TwoColumnList({ id, items, namespace }: TwoColumnListProps) {
  const { t } = useTranslation(namespace);
  const mid = Math.ceil(items.length / 2);
  const firstHalf = items.slice(0, mid);
  const secondHalf = items.slice(mid);

  return (
    <section className="two-column-list py-12 md:py-24 bg-primary">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
          <div className="flex flex-col gap-y-8">
            {firstHalf.map((item, index) => (
              <div key={index}>
                <h3 className="h3 mb-2 text-white">
                  {t(`${id}.${index}.title`, { defaultValue: item.title })}
                </h3>
                <p className="body text-white">
                  {t(`${id}.${index}.description`, { defaultValue: item.description })}
                </p>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-y-8">
            {secondHalf.map((item, index) => (
              <div key={index + mid}>
                <h3 className="h3 mb-2 text-white">
                  {t(`${id}.${index + mid}.title`, { defaultValue: item.title })}
                </h3>
                <p className="body text-white">
                  {t(`${id}.${index + mid}.description`, {
                    defaultValue: item.description,
                  })}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
