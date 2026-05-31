import { Link2, ArrowRight, Star } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative w-full flex flex-col items-center justify-center pt-24 pb-16 px-6 text-center">
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[500px] bg-orange-200/30 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

      {/* Beta badge */}
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-200 bg-white shadow-xs mb-8 text-xs font-medium text-gray-500">
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
        Now in beta - 200+ sellers analyzing daily
      </div>

      {/* Headline */}
      <h1 className="text-5xl md:text-7xl font-bold text-gray-900 max-w-4xl mb-6">
        Paste a URL.{" "}
        <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-red-500">
          Own the market.
        </span>
      </h1>

      {/* Subtitle */}
      <p className="text-md md:text-lg text-gray-500 max-w-2xl mb-10 leading-relaxed">
        Sella analyzes 1,000+ Amazon reviews, 10 competitors, and gives you the
        exact intelligence your brand needs in just 60 seconds.
      </p>

      {/* Input section */}
      <div className="w-full max-w-3xl bg-white p-2 rounded-lg shadow-xs border border-gray-200 flex flex-col md:flex-row items-center gap-2 mb-4">
        <div className="flex-1 flex items-center gap-3 px-4 py-2 w-full">
          <Link2 className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Paste any Amazon Best Sellers URL..."
            className="w-full outline-none text-gray-700 bg-transparent"
          />
        </div>
        <button className="w-full md:w-auto bg-orange-500 text-white font-medium px-6 py-3.5 rounded-lg flex items-center justify-center gap-2 transition-all shadow-md">
          Analyze Market
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Feature ticks */}
      <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-gray-400 mb-16">
        <span className="flex items-center gap-1">
          ✦ 1,000+ reviews scraped
        </span>
        <span className="flex items-center gap-1">
          ✦ 10 competitors analyzed
        </span>
        <span className="flex items-center gap-1">✦ AI-powered insights</span>
      </div>

      {/* Social proof */}
      <div className="w-full max-w-5xl border-t border-gray-100 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="flex -space-x-3">
            <div className="w-8 h-8 rounded-full bg-orange-400 border-2 border-white"></div>
            <div className="w-8 h-8 rounded-full bg-blue-900 border-2 border-white"></div>
            <div className="w-8 h-8 rounded-full bg-emerald-500 border-2 border-white"></div>
            <div className="w-8 h-8 rounded-full bg-yellow-400 border-2 border-white"></div>
            <div className="w-8 h-8 rounded-full bg-gray-500 border-2 border-white flex items-center justify-center text-[10px] text-white font-medium">
              +
            </div>
          </div>
          <span className="text-sm font-medium text-gray-500">
            Used by 200+ Amazon sellers in beta
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                className="w-4 h-4 fill-yellow-400 text-yellow-400"
              />
            ))}
          </div>
          <div className="text-sm font-medium">
            <span className="text-gray-900 font-bold">4.9</span>
            <span className="text-gray-400"> / 5 - 84 reviews</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
