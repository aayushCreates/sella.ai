import { BarChart2, MessageSquareText, Sparkles } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <BarChart2 className="w-5 h-5 text-orange-500" />,
      title: "Market Size Estimator",
      description:
        "See monthly revenue for the whole category and every top-10 player.",
    },
    {
      icon: <MessageSquareText className="w-5 h-5 text-orange-500" />,
      title: "Review Intelligence",
      description:
        "1,000+ reviews analyzed. Know exactly what customers love — and hate.",
    },
    {
      icon: <Sparkles className="w-5 h-5 text-orange-500" />,
      title: "Hook Mining",
      description:
        "Surface the viral content patterns top sellers use. Write posts that convert.",
    },
  ];

  return (
    <section
      id="features"
      className="w-full py-24 px-6 bg-white flex flex-col items-center"
    >
      <div className="w-full max-w-5xl">
        <div className="mb-12">
          <p className="text-orange-500 text-xs font-bold tracking-widest uppercase mb-4">
            Features
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 tracking-tight">
            A Bloomberg terminal for your category.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-8 border border-gray-200 shadow-xs transition-shadow"
            >
              <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-500 leading-relaxed text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
