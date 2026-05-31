import { Link2, Settings, BarChart3 } from "lucide-react";

const Working = () => {
  const steps = [
    {
      number: "01",
      icon: <Link2 className="w-5 h-5 text-orange-500" />,
      title: "Paste your URL",
      description: "Drop any Amazon Best Sellers, category, or product URL.",
    },
    {
      number: "02",
      icon: <Settings className="w-5 h-5 text-orange-500" />,
      title: "Sella scrapes at scale",
      description:
        "Listings, reviews, ratings, and pricing across the top 10 — pulled in seconds.",
    },
    {
      number: "03",
      icon: <BarChart3 className="w-5 h-5 text-orange-500" />,
      title: "Read the market",
      description:
        "A full intelligence report: revenue, sentiment, pricing, and the gap to attack.",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="w-full py-20 px-6 bg-gray-50 flex flex-col items-center"
    >
      <div className="text-center mb-12">
        <p className="text-orange-500 text-xs font-bold tracking-widest uppercase mb-4">
          How It Works
        </p>
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 tracking-tight">
          From URL to intelligence in three steps.
        </h2>
      </div>

      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl p-8 border border-gray-200 shadow-xs transition-shadow"
          >
            <div className="flex items-center justify-between mb-8">
              <span className="text-sm font-medium text-gray-400">
                {step.number}
              </span>
              <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center">
                {step.icon}
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              {step.title}
            </h3>
            <p className="text-gray-500 leading-relaxed text-sm">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Working;
