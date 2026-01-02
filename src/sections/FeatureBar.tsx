interface FeatureItem {
  text: string;
}

interface FeatureBarProps {
  data: {
    id: string;
    items?: FeatureItem[];
  };
  namespace: string;
}

export function FeatureBar({ data, namespace }: FeatureBarProps) {
  // Default features if none provided
  const features = data.items || [
    { text: "300+ Days of Sunshine" },
    { text: "5 Golf Courses Within 10 min" },
    { text: "Mediterranean Lifestyle" },
    { text: "Lock-Up-and-Leave Ready" },
    { text: "From €449,900" },
  ];

  // Concatenate features multiple times for a truly seamless infinite loop
  const animatedFeatures = [...features, ...features, ...features, ...features];

  return (
    <section className="feature-bar relative overflow-hidden h-32 w-full flex items-center bg-muted">
      <div className="feature-bar-container w-full overflow-hidden">
        <div className="feature-bar-animated flex flex-row items-center whitespace-nowrap">
          {animatedFeatures.map((feature, index) => (
            <div
              key={index}
              className="feature-item flex flex-row items-center gap-5 mx-3"
            >
              <span className="text-1xl text-primary">
                ✦
              </span>
              <span className="feature-text text-m font-light">
                {feature.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
