"use client";
import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

const Carousel = () => {
  const [current, setCurrent] = useState(0);
  const images = ["/logo.jpeg", "/logo2.png", "/logo3.png", "/logo4.png"];
  const [loading, setLoading] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  useEffect(() => {
    setLoading(true);
    const interval = setInterval(nextSlide, 1000);
    return () => clearInterval(interval);
  }, [nextSlide]); // Added nextSlide to the dependency array

  return (
    <div className="relative w-full max-w-4xl mx-auto">
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

const AboutSection = () => {
  return (
    <section className="text-center py-32 px-5">
      <h2 className="text-3xl font-bold text-orange-500">About Us</h2>
      <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry&apos;s standard dummy text
        ever since the 1500s.
      </p>
      <button className="mt-5 px-4 py-2 bg-gray-700 text-white rounded-md">
        See More
      </button>
    </section>
  );
};

const TeamSection = () => {
  const teamMembers = [
    { name: "Mr. A", role: "Senior Editor" },
    { name: "Mr. B", role: "Senior Photographer" },
    { name: "Mr. C", role: "Senior Reporter" },
  ];

  return (
    <section className="py-24 px-5 bg-gray-200 text-center">
      <h2 className="text-2xl font-bold text-orange-500">Our Team</h2>
      <div className="flex flex-wrap justify-center gap-8 mt-6">
        {teamMembers.map((member, index) => (
          <div key={index} className="text-center">
            <Image
              src="/profile-placeholder.png"
              alt={member.name}
              width={150}
              height={150}
              className="rounded-lg"
            />
            <h3 className="mt-2 font-semibold">{member.name}</h3>
            <p className="text-sm text-gray-600">{member.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default function MainPage() {
  return (
    <div>
      <Carousel />
      <AboutSection />
      <TeamSection />
    </div>
  );
}
