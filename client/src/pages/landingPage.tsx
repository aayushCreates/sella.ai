import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Working from "../components/Working";
import Features from "../components/Features";
import Footer from "../components/Footer";

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-white selection:bg-orange-200">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Working />
        <Features />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
