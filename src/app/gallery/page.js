// app/gallery/page.js
"use client";
import { useState } from "react";

export default function Gallery() {
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");

  // Your provided images
  const galleryImages = [
    { id: 1, title: "School Campus", category: "campus", src: "/images/image2.avif" },
    { id: 2, title: "Science Lab", category: "facilities", src: "/images/IMG_9128_JPG.avif" },
    { id: 3, title: "Sports Day", category: "events", src: "/images/IMG_4713_JPG.avif" },
    { id: 4, title: "Art Exhibition", category: "achievements", src: "/images/IMG_6450_JPG.avif" },
    { id: 5, title: "Library", category: "facilities", src: "/images/IMG_6821_JPG.avif" },
    { id: 6, title: "Graduation", category: "events", src: "/images/IMG_7320_JPG.avif" },
    { id: 7, title: "Computer Lab", category: "facilities", src: "/images/Snapchat-3.jpg" },
    { id: 8, title: "Music Class", category: "activities", src: "/images/Snapchat-4.jpg" },
    { id: 9, title: "Student Activities", category: "activities", src: "/images/Snapchat-5.jpg" },
  ];

  // Filter images based on selected category
  const filteredImages = activeCategory === "all" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory);

  const nextGalleryImage = () => {
    setGalleryIndex((prevIndex) => 
      prevIndex === filteredImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevGalleryImage = () => {
    setGalleryIndex((prevIndex) => 
      prevIndex === 0 ? filteredImages.length - 1 : prevIndex - 1
    );
  };

  const openGalleryModal = (index) => {
    setGalleryIndex(index);
    setIsGalleryModalOpen(true);
  };

  const selectCategory = (category) => {
    setActiveCategory(category);
    setGalleryIndex(0);
  };

  return (
    <>
      <section id="gallery" className="min-h-screen py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">Our Gallery</h2>
          
          {/* Gallery Navigation */}
          <div className="flex flex-wrap justify-center mb-12 animate-fade-in gap-2">
            {['all', 'campus', 'facilities', 'events', 'achievements', 'activities'].map(category => (
              <button
                key={category}
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  activeCategory === category 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
                onClick={() => selectCategory(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
          
          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up">
            {filteredImages.map((image, index) => (
              <div 
                key={image.id} 
                className="relative group overflow-hidden rounded-lg cursor-pointer transform transition duration-300 hover:scale-105"
                onClick={() => openGalleryModal(index)}
              >
                <div 
                  className="h-64 bg-cover bg-center flex items-end"
                  style={{ backgroundImage: `url(${image.src})` }}
                >
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                    <div className="text-white opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3-3H7"></path>
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-black bg-opacity-60 text-white transform translate-y-10 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="font-semibold">{image.title}</h3>
                  <p className="text-sm text-gray-300">{image.category}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition transform hover:scale-105">
              View Full Gallery
            </button>
          </div>
        </div>
      </section>

      {/* Gallery Modal */}
      {isGalleryModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="relative max-w-4xl w-full bg-white rounded-lg overflow-hidden">
            <button 
              className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 z-10 hover:bg-opacity-70 transition"
              onClick={() => setIsGalleryModalOpen(false)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
            
            <button 
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 rounded-full p-2 z-10 hover:bg-opacity-70 transition"
              onClick={prevGalleryImage}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
              </svg>
            </button>
            
            <button 
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 rounded-full p-2 z-10 hover:bg-opacity-70 transition"
              onClick={nextGalleryImage}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
            
            <div className="h-96 bg-cover bg-center" style={{ backgroundImage: `url(${filteredImages[galleryIndex].src})` }}></div>
            
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800">{filteredImages[galleryIndex].title}</h3>
              <p className="text-gray-600">{filteredImages[galleryIndex].category}</p>
              <div className="mt-2 text-sm text-gray-500">
                {galleryIndex + 1} of {filteredImages.length}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}