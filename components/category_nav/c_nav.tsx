"use client";

import Link from "next/link";
import { useLanguage } from "../context/language_content";

const translations = {
  English: {
    Business: "Business",
    Entertainment: "Entertainment",
    Sports: "Sports",
    Health: "Health",
    Style: "Style",
    Tech: "Tech",
    Weather: "Weather",
    Travel: "Travel",
    toggleText: "Kannada",
  },
  Kannada: {
    Business: "ವ್ಯಾಪಾರ",
    Entertainment: "ಮನರಂಜನೆ",
    Sports: "ಕ್ರೀಡೆ",
    Health: "ಆರೋಗ್ಯ",
    Style: "ಶೈಲಿ",
    Tech: "ತಂತ್ರಜ್ಞಾನ",
    Weather: "ಹವಾಮಾನ",
    Travel: "ಪ್ರಯಾಣ",
    toggleText: "English",
  },
};

const CategoryNav = () => {
  const { language, toggleLanguage } = useLanguage();
  const t = translations[language];

  return (
    <nav className="bg-[#CEDEED]">
      <div className="container mx-auto px-4">
        <div className="flex items-center  justify-between py-3 overflow-x-auto no-scrollbar">
          {/* Categories */}
          <div className="flex items-center justify-center space-x-6">
            {Object.entries(t)
              .filter(([key]) => key !== "toggleText")
              .map(([key, value]) => (
                <Link
                  key={key}
                  href={`/${key.toLowerCase()}`}
                  className="text-gray-600 hover:text-[#F48634] whitespace-nowrap"
                >
                  {value}
                </Link>
              ))}
          </div>

          {/* Language Toggle Button */}
          <button
            className=" bg-[#F48634] text-white px-4 py-1 rounded-md ml-6"
            onClick={toggleLanguage}
          >
            {t.toggleText}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default CategoryNav;
