const Navbar = () => {
  return (
    <nav className="w-full flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
      {/* Logo */}
      <div className="flex items-center cursor-pointer">
        <img
          src="src/assets/logo.png"
          alt="Sella.ai"
          className="h-12 object-contain"
        />
      </div>

      {/* Nav Links */}
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-500">
        <a
          href="#how-it-works"
          className="hover:text-gray-900 transition-colors"
        >
          How it works
        </a>
        <a href="#features" className="hover:text-gray-900 transition-colors">
          Features
        </a>
        <a href="#pricing" className="hover:text-gray-900 transition-colors">
          Pricing
        </a>
      </div>

      {/* Action Button */}
      <div className="flex items-center">
        <button className="bg-gray-900 hover:bg-black text-white text-sm font-medium px-5 py-2 rounded-lg transition-all shadow-sm">
          Sign up free
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
