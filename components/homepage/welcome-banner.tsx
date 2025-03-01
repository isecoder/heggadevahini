"use client"
import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import LoadingSpinner from "@/components/ui/LoadingSpinner";


const WelcomeBanner = () => {
  const [current, setCurrent] = useState(0);
  const images = ["/logo.jpeg", "/logo.jpeg", "/logo.jpeg", "/logo.jpeg"];
  const [loading, setLoading] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  useEffect(() => {
    setLoading(true);
    const interval = setInterval(nextSlide, 1000);
    return () => clearInterval(interval);
  }, [nextSlide]);

    return (
      // <div className="text-center mb-8">
      //   <h1
      //     className="inline-block font-bold px-6 py-3 rounded-lg relative"
      //     style={{
      //       fontSize: '3.5rem', 
      //       color: '#F48634', 
      //       textShadow: '2px 2px 0 black, -2px -2px 0 black, -2px 2px 0 black, 2px -2px 0 black', 
      //     }}
      //   >
      //     WELCOME TO HEGGADE VAHINI 🙏
      //   </h1>
      // </div>
      <div className="relative w-full max-w-4xl mx-auto mb-10">
      {loading && <LoadingSpinner />}
      <Image
        src={images[current]}
        alt="Carousel Image"
        width={800}
        height={400}
        className="w-full rounded-lg"
      />
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-2 w-2 rounded-full ${
              current === index ? "bg-orange-500" : "bg-gray-300"
            }`}
          ></button>
        ))}
      </div>
    </div>
    );
  };
  
  export default WelcomeBanner;
  