
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import About from "@/app/about/page";
import Gallery from "@/app/gallery/page";
import Services from "@/app/services/page";
import Mission from "@/app/mission/page";
import News from "@/app/news/page";
import Contact from "@/app/contact/page";
import { Provider } from "react-redux";
import store from "./store/store";

export default function Home() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isHovered, setIsHovered] = useState(null);
  const router = useRouter();

  // Handle scroll-based section highlighting
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      let currentSection = "hero";

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - sectionHeight / 3) {
          currentSection = section.id;
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Function to handle smooth scrolling with fallback
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Enhanced interactive features data with more details
  const schoolFeatures = [
    {
      icon: "🎓",
      title: "Academic Excellence",
      description: "Our rigorous curriculum is designed to challenge and inspire students, fostering critical thinking and lifelong learning.",
      color: "from-blue-500 to-blue-700",
      badge: "Top-Rated",
    },
    {
      icon: "🏀",
      title: "Sports & Activities",
      description: "Explore a wide range of athletic programs and extracurriculars to develop teamwork and leadership skills.",
      color: "from-green-500 to-green-700",
      badge: "Award-Winning",
    },
    {
      icon: "👥",
      title: "Community Focus",
      description: "We nurture strong community bonds, encouraging collaboration and leadership in a supportive environment.",
      color: "from-purple-500 to-purple-700",
      badge: "Inclusive",
    },
    {
      icon: "🔬",
      title: "STEM Programs",
      description: "Cutting-edge labs and programs empower students to excel in science, technology, engineering, and math.",
      color: "from-orange-500 to-orange-700",
      badge: "Innovative",
    },
  ];

  return (
    <Provider store={store}>
      <div className="homepage-container bg-gray-100 font-sans">
        <Navbar activeSection={activeSection} />

        {/* Hero Section */}
        <main id="hero" className="relative w-full h-screen bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900 overflow-hidden">
          {/* Enhanced Animated Background */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-48 -right-48 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-pulse"></div>
            <div className="absolute -bottom-48 -left-48 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-pulse animation-delay-2000"></div>
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-pink-400 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-pulse animation-delay-4000"></div>
          </div>

          {/* Hero Content */}
          <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 text-white leading-tight animate-fade-in-up">
              Nicolas Robinson
              <span className="block bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                School
              </span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-blue-100 max-w-3xl mb-8 animate-fade-in-up animation-delay-200">
              Where Excellence Meets Opportunity in Education
            </p>
            <div className="flex gap-4 flex-wrap justify-center">
              <button
                onClick={() => {
                  // Try scrolling first, then route if needed
                  const servicesSection = document.getElementById("services");
                  if (servicesSection) {
                    scrollToSection("services");
                  } else {
                    router.push("/services");
                  }
                }}
                className="px-8 py-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-blue-900 rounded-full font-semibold hover:from-yellow-300 hover:to-orange-300 transition-all transform hover:scale-105 shadow-lg animate-fade-in-up animation-delay-400"
                aria-label="Explore school programs"
              >
                Explore Programs
              </button>
              <button
                onClick={() => {
                  // Try scrolling first, then route if needed
                  const contactSection = document.getElementById("contact");
                  if (contactSection) {
                    scrollToSection("contact");
                  } else {
                    router.push("/contact");
                  }
                }}
                className="px-8 py-3 border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-blue-900 transition-all transform hover:scale-105 shadow-lg animate-fade-in-up animation-delay-600"
                aria-label="Schedule a school visit"
              >
                Schedule a Visit
              </button>
            </div>
          </div>

          {/* Enhanced Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-8 h-12 border-2 border-white rounded-full flex justify-center items-start">
              <div className="w-1.5 h-4 bg-white rounded-full mt-2 animate-scroll-dot"></div>
            </div>
          </div>
        </main>

        {/* Features Section */}
        <section id="features" className="py-24 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 animate-fade-in">
                Why Choose Our School?
              </h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in animation-delay-200">
                Discover what makes Nicolas Robinson School the perfect place for your child's educational journey.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {schoolFeatures.map((feature, index) => (
                <div
                  key={index}
                  className={`relative bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 group cursor-pointer bg-gradient-to-br ${feature.color} bg-opacity-10`}
                  onMouseEnter={() => setIsHovered(index)}
                  onMouseLeave={() => setIsHovered(null)}
                >
                  {/* Badge */}
                  <div className="absolute top-4 right-4 bg-yellow-400 text-blue-900 text-xs font-bold px-3 py-1 rounded-full animate-pulse">
                    {feature.badge}
                  </div>
                  <div className={`text-5xl mb-6 transform transition-transform duration-300 ${isHovered === index ? "scale-110 rotate-6" : ""}`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-700 leading-relaxed">{feature.description}</p>
                  <div
                    className={`mt-6 w-16 h-1 bg-gradient-to-r ${feature.color} rounded-full transition-all duration-300 ${
                      isHovered === index ? "w-24" : ""
                    }`}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <About />
        <Services id="services" />
        <Gallery />
        <Mission />
       <News id="news" />
        <Footer />
      </div>
    </Provider>
  );
}