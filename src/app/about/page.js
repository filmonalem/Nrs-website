"use client";
import React, { useState, useEffect } from 'react';
import { FaBuilding, FaGraduationCap, FaUsers, FaAward, FaLightbulb } from 'react-icons/fa';

const About = () => {
  const [activeTab, setActiveTab] = useState('history');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const aboutImages = [
    "/images/IMG_9128_JPG.avif",
    "/images/IMG_4713_JPG.avif",
    "/images/IMG_6450_JPG.avif",
    "/images/IMG_6821_JPG.avif",
    "/images/IMG_7320_JPG.avif"
  ];

  const messages = {
    history: {
      title: "Our History",
      icon: <FaBuilding className="text-blue-600" />,
      content: "Founded in 1995, Rainbows for Children School has been providing quality education for over 25 years. We've grown from a small community school to a renowned institution recognized for academic excellence and innovative teaching methods."
    },
    mission: {
      title: "Our Mission",
      icon: <FaLightbulb className="text-yellow-500" />,
      content: "To empower students to become lifelong learners and responsible global citizens through a rigorous curriculum, supportive environment, and opportunities for personal growth and leadership development."
    },
    values: {
      title: "Our Values",
      icon: <FaAward className="text-green-500" />,
      content: "We believe in integrity, respect, diversity, and excellence. These core values guide everything we do, from classroom instruction to community engagement and beyond."
    },
    team: {
      title: "Our Team",
      icon: <FaUsers className="text-purple-500" />,
      content: "Our dedicated faculty and staff work tirelessly to create an environment where students can discover their passions and develop the skills needed for success in college and beyond."
    }
  };

  // Auto-rotate images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % aboutImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="about" className="min-h-screen py-20 px-4 bg-gradient-to-b from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-4 bg-white rounded-full shadow-lg mb-6">
            <FaGraduationCap className="h-12 w-12 md:h-16 md:w-16 text-blue-700 animate-pulse" />
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 text-gray-800 tracking-tight">
            About Rainbows for Children School
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Nurturing excellence in education since 1995
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-8">
            {/* Tab Navigation */}
            <div className="flex flex-wrap gap-2 mb-6">
              {Object.keys(messages).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex items-center px-4 py-2 rounded-full transition-all ${
                    activeTab === tab 
                      ? 'bg-blue-600 text-white shadow-md' 
                      : 'bg-white text-gray-700 hover:bg-blue-100'
                  }`}
                >
                  <span className="mr-2">{messages[tab].icon}</span>
                  {messages[tab].title}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 animate-fade-in">
              <div className="flex items-center mb-4">
                <div className="text-2xl mr-3">
                  {messages[activeTab].icon}
                </div>
                <h3 className="text-2xl font-semibold text-gray-800">
                  {messages[activeTab].title}
                </h3>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">
                {messages[activeTab].content}
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-xl shadow-md text-center">
                <div className="text-3xl font-bold text-blue-600">25+</div>
                <div className="text-gray-600">Years of Excellence</div>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-md text-center">
                <div className="text-3xl font-bold text-blue-600">100+</div>
                <div className="text-gray-600">Qualified Teachers</div>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-md text-center">
                <div className="text-3xl font-bold text-blue-600">2000+</div>
                <div className="text-gray-600">Happy Students</div>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-md text-center">
                <div className="text-3xl font-bold text-blue-600">15+</div>
                <div className="text-gray-600">Programs Offered</div>
              </div>
            </div>
          </div>

          {/* Image Gallery */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl animate-fade-in">
              <div 
                className="h-96 bg-cover bg-center flex items-end justify-center transition-all duration-1000"
                style={{ backgroundImage: `url(${aboutImages[currentImageIndex]})` }}
              >
                <div className="bg-black bg-opacity-60 text-white p-4 rounded-t-xl w-full text-center">
                  <span className="text-xl font-bold">Our Campus Facilities</span>
                </div>
              </div>
            </div>
            
            {/* Image Navigation Dots */}
            <div className="flex justify-center mt-4 space-x-2">
              {aboutImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentImageIndex ? 'bg-blue-600 scale-125' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>

            {/* Quote */}
            <div className="mt-8 bg-blue-600 text-white p-6 rounded-2xl shadow-lg">
              <div className="text-2xl font-serif italic mb-2">
                "Education is not the filling of a pail, but the lighting of a fire."
              </div>
              <div className="text-right text-blue-100">
                - William Butler Yeats
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <h3 className="text-2xl font-bold text-center mb-8 text-gray-800">Why Choose Our Institution?</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-xl hover:bg-blue-50 transition-all">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
              </div>
              <h4 className="text-xl font-semibold mb-2 text-gray-800">Safe Environment</h4>
              <p className="text-gray-600">Our campus provides a secure and nurturing environment for all students.</p>
            </div>
            <div className="text-center p-6 rounded-xl hover:bg-blue-50 transition-all">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                </svg>
              </div>
              <h4 className="text-xl font-semibold mb-2 text-gray-800">Modern Facilities</h4>
              <p className="text-gray-600">State-of-the-art classrooms, labs, and sports facilities enhance the learning experience.</p>
            </div>
            <div className="text-center p-6 rounded-xl hover:bg-blue-50 transition-all">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
              <h4 className="text-xl font-semibold mb-2 text-gray-800">Community Focus</h4>
              <p className="text-gray-600">We foster strong connections with parents and the local community.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;