"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

const images = [
  "/images/image2.avif",
  "/images/IMG_9128_JPG.avif",
  "/images/IMG_4713_JPG.avif",
  "/images/IMG_6450_JPG.avif",
  "/images/IMG_6821_JPG.avif",
  "/images/IMG_7320_JPG.avif",
  "/images/Snapchat-3.jpg",
  "/images/Snapchat-4.jpg",
  "/images/Snapchat-5.jpg",
];

const ImageDisplay = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextImage = () =>
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);

  const prevImage = () =>
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextImage, 3000);
    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <div
      className="relative w-screen h-screen flex justify-center items-center overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <Image
        src={images[currentIndex]}
        alt={`Image ${currentIndex + 1}`}
        fill
        priority
        className="object-cover"
      />

      {/* Prev Button */}
      <button
        onClick={prevImage}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 text-black rounded-full p-2 shadow-lg hover:bg-gray-200"
      >
        &lt;
      </button>

      {/* Next Button */}
      <button
        onClick={nextImage}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 text-black rounded-full p-2 shadow-lg hover:bg-gray-200"
      >
        &gt;
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 flex space-x-2">
        {images.map((_, i) => (
          <span
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`w-3 h-3 rounded-full cursor-pointer transition ${
              currentIndex === i ? "bg-blue-600" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageDisplay;
