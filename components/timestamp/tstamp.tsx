"use client";

import React, { useState, useEffect } from "react";

const HeaderBar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [latestUpdateTime, setLatestUpdateTime] = useState<string | null>(null);

  useEffect(() => {
    const fetchLatestEpaperTime = async () => {
      try {
        const response = await fetch("/api/v1/epaper");
        const data = await response.json();
        if (data.success && data.data.length > 0) {
          const releaseDate = new Date(data.data[0].releaseDate);
          const formattedTime = releaseDate.toLocaleString("en-IN", {
            weekday: "long",
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
            timeZone: "Asia/Kolkata",
          });
          setLatestUpdateTime(formattedTime);
        }
      } catch (error) {
        console.error("Error fetching e-paper data:", error);
      }
    };

    fetchLatestEpaperTime();
  }, []);

  // ✅ Toggle function for the mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  return (
    <div className="bg-gradient-to-r from-slate-100 to-slate-200 py-4 px-4 md:py-4 md:px-6 lg:px-8 shadow-sm">
      <div className="container mx-auto">
        {/* Desktop View */}
        <div className="hidden md:flex justify-between items-center">
          <div className="text-slate-700 text-sm lg:text-base font-medium">
            {latestUpdateTime ? `${latestUpdateTime} | UPDATED` : "Loading..."}
          </div>
        </div>

        {/* Mobile View */}
        <div className="md:hidden flex justify-between items-center">
          <div className="text-slate-700 text-xs font-medium">
            {latestUpdateTime ? latestUpdateTime : "Loading..."}
          </div>

          
          <button
            onClick={toggleMobileMenu}
            className="text-slate-700 p-1 rounded-md hover:bg-slate-200 transition-colors"
          >
            {mobileMenuOpen ? " " : " "}
          </button>
        </div>

        {/* Mobile Menu */}
        {/* {mobileMenuOpen && (
          <div className="md:hidden mt-3 py-3 px-2 bg-white rounded-lg shadow-md">
            <div className="grid grid-cols-6 gap-4 mb-4">
              <SocialIcon
                href="https://instagram.com"
                icon="instagram"
                mobile
              />
              <SocialIcon href="https://facebook.com" icon="facebook" mobile />
              <SocialIcon
                href="mailto:someone@example.com"
                icon="mail"
                mobile
              />
              <SocialIcon href="https://youtube.com" icon="youtube" mobile />
              <SocialIcon href="https://linkedin.com" icon="linkedin" mobile />
              <SocialIcon href="https://twitter.com" icon="twitter" mobile />
            </div>

            <div className="h-px w-full bg-slate-200 my-2"></div>

            <div className="flex items-center justify-center space-x-4 mt-3">
              <span className="text-slate-700 text-sm font-medium">
                Get App:
              </span>
              <SocialIcon
                href="https://www.apple.com/app-store/"
                icon="apple"
                mobile
              />
              <SocialIcon
                href="https://play.google.com/store"
                icon="android"
                mobile
              />
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
};

// interface SocialIconProps {
//   href: string;
//   icon:
//     | "instagram"
//     | "facebook"
//     | "mail"
//     | "youtube"
//     | "linkedin"
//     | "twitter"
//     | "apple"
//     | "android";
//   mobile?: boolean;
// }

// const SocialIcon: React.FC<SocialIconProps> = ({ href, icon, mobile }) => {
//   const getIcon = () => {
//     switch (icon) {
//       case "instagram":
//         return "📷"; // Instagram icon (replace with an SVG if needed)
//       case "facebook":
//         return "📘"; // Facebook icon
//       case "mail":
//         return "📩"; // Mail icon
//       case "youtube":
//         return "▶️"; // YouTube icon
//       case "linkedin":
//         return "💼"; // LinkedIn icon
//       case "twitter":
//         return "🐦"; // Twitter icon
//       case "apple":
//         return "🍏"; // Apple icon
//       case "android":
//         return "🤖"; // Android icon
//       default:
//         return null;
//     }
//   };

//   return (
//     <a
//       href={href}
//       target="_blank"
//       rel="noopener noreferrer"
//       className={`text-slate-600 hover:text-slate-900 ${
//         mobile ? "" : "hover:scale-110"
//       } transition-all duration-200`}
//     >
//       <span className={mobile ? "text-lg" : "text-xl"}>{getIcon()}</span>
//     </a>
//   );
// };

export default HeaderBar;
