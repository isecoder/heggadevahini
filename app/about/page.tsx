"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { useLanguage } from "@/components/context/language_content";

const translations = {
  English: {
    aboutTitle: "About Us",
    aboutContent:
      "Dear Readers,As we launch Prerana Heggade Vahini, ourmonthly newsletter, I want to emphasise the vital roleit plays in our community. In today’s fast-paced world,it is essential to create a space where our voices can beheard, and our stories can be shared. This newsletter ismore than just a collection of articles; it is a platformfor inspiration, connection, and growth.By coming together each month, we have theopportunity to inspire our younger generation. We canshare successes, lessons learned, and the challenges wehave overcome. These narratives not only empower individuals but also strengthen the fabric of our community. Through Prerana Heggade Vahini, we aim to foster a sense of belonging, encourage creativity, and ignite passion among our youth. Let us use this platform to motivate one another, celebrate our achievements, and support each other in our journeys. Together, we can build a community that thrives on collaboration, inspiration, and unity. I invite each of you to engage, contribute, and make the most of this opportunity. Let’s inspire our future, one story at a time.",
    seeMore: "See More",
    teamTitle: "Our Team",
    members: [
      { name: "Founder", role: "Mr. Ashwath Hegde Balanja" },
      { name: "Co Founder", role: "Mr. Manoj Hegde Elnadu Gutthu" },
      { name: "Co Founder", role: "Mrs Apeksha Ashwath Hegde" },
      { name: "Honorary Editorial Advisor", role: "Dr. Surendra Kumar Hegde" },
      { name: "Honorary Editorial Advisor", role: "Smt. Mithraprabha Hegde" },
      { name: "Honorary Editorial Advisor", role: "Mr. Shyam Hegde Beluvai" },
      { name: "Honorary Editorial Advisor", role: "Dr Sulatha Hebri" },
      { name: "Honorary Editorial Advisor", role: "Mr. V. K. Valpadi" },
      { name: "Honorary Editorial Advisor", role: "Mr Ravi Hegde Hermunde" },
      
    ]
  },
  Kannada: {
    aboutTitle: "ನಮ್ಮ ಬಗ್ಗೆ",
    aboutContent:
      "ಹೆಗ್ಗಡೆ ಸಮಾಜದ ಕಟ್ಟಕಡೆಯ ವ್ಯಕ್ತಿಯನ್ನೂ ತಲುಪಬೇಕು, ಪ್ರತಿಯೋರ್ವ ಹೆಗ್ಗಡೆ ಬಂಧುವಿಗೂ ಸಮಾನ ವೇದಿಕೆಯನ್ನು ಕೊಡಬೇಕು ಎನ್ನುವ ಉದ್ದೇಶದಿಂದ ಪ್ರೇರಣಾ ಹೆಗ್ಗಡೆ ವಾಹಿನಿಯನ್ನು ಹೊರತರುತ್ತಿದ್ದೇವೆ. ಇದು ಹತ್ತು ವರುಷಗಳ ಹಿಂದಿನ ಕನಸು. ಕಾರಣಾಂತರಗಳಿಂದ ತಡವಾಗಿ ನಿಮ್ಮ ಕೈಸೇರಿದೆ ಆದರೆ ಅತ್ಯಂತ ಸಂತಸ ಮತ್ತು ಸಾರ್ಥಕ್ಯ ಭಾವದಿಂದ ನಿಮ್ಮ ಮುಂದೆ ಬರುತ್ತಿದ್ದೇವೆ. ಇಲ್ಲಾವುದೇ ರಾಗ ದ್ವೇಷಗಳಿಗೆ ಜಾಗವಿಲ್ಲ. ರಾಜಕೀಯದ ಗಂಧಗಾಳಿಯೂ ಸೋಕದಂತೆ ಕೇವಲ ನಮ್ಮ ಸಮಾಜವನ್ನು ಒಂದೇ ವೇದಿಕೆಯಡಿ ತರಬೇಕೆನ್ನುವ ಧೈಯೊದ್ದೇಶದೊಂದಿಗೆ ಹೊರಟಿದ್ದೇವೆ,ನಮ್ಮ ಸಮಾಜದಲ್ಲಿ ಸಾಧಕರಿಗೇನೂ ಕಡಿಮೆಯಿಲ್ಲ. ಸಾಧನೆಯ ಶಿಖರವನ್ನೇರಿದ ಅದೆಷ್ಟೋ ಯುವ ಪ್ರತಿಭೆಗಳು ಎಲೆ ಮರೆಯ ಕಾಯಿಯಂತೆ ಸಮಾಜದ ಮುಖ್ಯವಾಹಿನಿಗೆ ಬರಲಿಲ್ಲ ಅಥವಾ ನಾವೇ ಅವರನ್ನು ಸಮಾಜದ ಮುಖ್ಯವಾಹಿನಿಗೆ ಕರೆತಂದು ಗುರುತಿಸಿ ಬೆನ್ನು ತಟ್ಟುವುದರಲ್ಲಿ ವಿಫಲರಾಗಿದ್ದೇವೆ. 'ಪ್ರೇರಣಾ ಹೆಗ್ಗಡೆ ವಾಹಿನಿ' ನಿಮ್ಮ ಮುಂದೆ ತರುತ್ತಿರುವ ಪ್ರಮುಖ ಉದ್ದೇಶ ನಮ್ಮ ಸಮಾಜದ ಪ್ರತಿಭೆಗಳಿಗೆ ಸೂಕ್ತ ವೇದಿಕೆ ನಿರ್ಮಾಣ. ಪ್ರೇರಣಾ ಹೆಗ್ಗಡೆ ವಾಹಿನಿಯ ಮೂಲಕ ನಮ್ಮ ಸಮಾಜದ ಯುವ ಪ್ರತಿಭೆಗಳಲ್ಲಿ ಅಡಕವಾಗಿರುವ ಸುಪ್ತ ಪ್ರತಿಭೆಗಳನ್ನು ಹೊರತಂದು ಸಮಾಜದ ಮುಂದಿಡುವ ನಿಟ್ಟಿನಲ್ಲಿ ಪ್ರಾಮಾಣಿಕ ಪ್ರಯತ್ನ ಮಾಡುತ್ತೇವೆ",
    seeMore: "ಮತ್ತಷ್ಟು ವೀಕ್ಷಿಸಿ",
    teamTitle: "ನಮ್ಮ ತಂಡ",
    members: [
      { name: "ಸಂಸ್ಥಾಪಕರು", role: "ಶ್ರೀ ಅಶ್ವಥ್ ಹೆಗ್ಗಡೆ ಬಾಲಂಜ" },
      { name: "ಸಹ ಸಂಸ್ಥಾಪಕರು", role: "ಶ್ರೀ ಮನೋಜ್ ಹೆಗ್ಗಡೆ ಎಳ್ನಾಡು ಗುಟ್ಟು" },
      { name: "ಸಹ ಸಂಸ್ಥಾಪಕರು", role: "ಶ್ರೀಮತಿ ಅಪೇಕ್ಷಾ ಅಶ್ವಥ್ ಹೆಗ್ಗಡೆ" },
      { name: "ಗೌರವ ಸಂಪಾದಕೀಯ ಸಲಹೆಗಾರರು", role: "ಡಾ. ಸುರೇಂದ್ರ ಕುಮಾರ ಹೆಗ್ಗಡೆ" },
      { name: "ಗೌರವ ಸಂಪಾದಕೀಯ ಸಲಹೆಗಾರರು", role: "ಶ್ರೀಮತಿ ಮಿತ್ರಪ್ರಭಾ ಹೆಗ್ಗಡೆ" },
      { name: "ಗೌರವ ಸಂಪಾದಕೀಯ ಸಲಹೆಗಾರರು", role: "ಶ್ರೀ ಶ್ಯಾಮ್ ಹೆಗ್ಗಡೆ ಬೆಳುವಾಯಿ" },
      { name: "ಗೌರವ ಸಂಪಾದಕೀಯ ಸಲಹೆಗಾರರು", role: "ಡಾ. ಸುಲತಾ ಹೆಬ್ರಿ" },
      { name: "ಗೌರವ ಸಂಪಾದಕೀಯ ಸಲಹೆಗಾರರು", role: "ಶ್ರೀ ವಿ. ಕೆ. ವಲ್ಪಾಡಿ" },
      { name: "ಗೌರವ ಸಂಪಾದಕೀಯ ಸಲಹೆಗಾರರು", role: "ಶ್ರೀ ರವಿ ಹೆಗ್ಗಡೆ ಹರ್ಮುಂಡೆ" },
      
    ]
  }
};

const Carousel = () => {
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
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <section className="text-center py-32 px-5">
      <h2 className="text-3xl font-bold text-orange-500">{t.aboutTitle}</h2>
      <p className="mt-4 text-gray-600 max-w-3xl mx-auto">{t.aboutContent}</p>
      
    </section>
  );
};

const TeamSection = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <section className="py-24 px-5 bg-gray-200 text-center">
      <h2 className="text-2xl font-bold text-orange-500">{t.teamTitle}</h2>
      <div className="flex flex-wrap justify-center gap-12 mt-6">
        {t.members.map((member, index) => (
          <div key={index} className="text-center bg-white p-6 rounded-xl shadow-md w-64">
            <h3 className="mt-2 font-semibold text-gray-800 text-lg">{member.name}</h3>
            <p className="text-sm text-orange-500 mt-1">{member.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
};


export default function AboutPage() {
  return (
    <div>
      <Carousel />
      <AboutSection />
      <TeamSection />
    </div>
  );
}