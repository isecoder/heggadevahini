"use client"

import React, { useState, useEffect } from "react";
import { Menu, X } from 'lucide-react';

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

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="bg-gradient-to-r from-slate-100 to-slate-200 py-3 px-4 md:py-4 md:px-6 lg:px-8 shadow-sm">
      <div className="container mx-auto">
        {/* Desktop View */}
        <div className="hidden md:flex justify-between items-center">
          {/* Left Section: Date & Time */}
          <div className="text-slate-700 text-sm lg:text-base font-medium">
            {latestUpdateTime ? `${latestUpdateTime} | UPDATED` : "Loading..."}
          </div>

          {/* Right Section: Icons */}
          <div className="flex items-center space-x-3 lg:space-x-5">
            <div className="flex space-x-2 lg:space-x-4">
              <SocialIcon href="https://instagram.com" icon="instagram" />
              <SocialIcon href="https://facebook.com" icon="facebook" />
              <SocialIcon href="mailto:someone@example.com" icon="mail" />
              <SocialIcon href="https://youtube.com" icon="youtube" />
              <SocialIcon href="https://linkedin.com" icon="linkedin" />
              <SocialIcon href="https://twitter.com" icon="twitter" />
            </div>

            <div className="h-6 w-px bg-slate-300 mx-1"></div>

            <div className="flex items-center space-x-3">
              <span className="text-slate-700 text-sm lg:text-base font-medium">Get App</span>
              <SocialIcon href="https://www.apple.com/app-store/" icon="apple" />
              <SocialIcon href="https://play.google.com/store" icon="android" />
            </div>
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
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 py-3 px-2 bg-white rounded-lg shadow-md">
            <div className="grid grid-cols-6 gap-4 mb-4">
              <SocialIcon href="https://instagram.com" icon="instagram" mobile />
              <SocialIcon href="https://facebook.com" icon="facebook" mobile />
              <SocialIcon href="mailto:someone@example.com" icon="mail" mobile />
              <SocialIcon href="https://youtube.com" icon="youtube" mobile />
              <SocialIcon href="https://linkedin.com" icon="linkedin" mobile />
              <SocialIcon href="https://twitter.com" icon="twitter" mobile />
            </div>

            <div className="h-px w-full bg-slate-200 my-2"></div>

            <div className="flex items-center justify-center space-x-4 mt-3">
              <span className="text-slate-700 text-sm font-medium">Get App:</span>
              <SocialIcon href="https://www.apple.com/app-store/" icon="apple" mobile />
              <SocialIcon href="https://play.google.com/store" icon="android" mobile />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};


interface SocialIconProps {
  href: string;
  icon: "instagram" | "facebook" | "mail" | "youtube" | "linkedin" | "twitter" | "apple" | "android";
  mobile?: boolean;
}

const SocialIcon: React.FC<SocialIconProps> = ({ href, icon, mobile }) => {
  const getIcon = () => {
    switch (icon) {
      case "instagram":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
          </svg>
        );
      case "facebook":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
          </svg>
        );
      case "mail":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <polyline points="22,6 12,13 2,6"></polyline>
          </svg>
        );
      case "youtube":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
            <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
            <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
          </svg>
        );
      case "linkedin":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
            <rect x="2" y="9" width="4" height="12"></rect>
            <circle cx="4" cy="4" r="2"></circle>
          </svg>
        );
      case "twitter":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
            <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
          </svg>
        );
      case "apple":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
            <path d="M12 19c-2.3 0-2.5-1.7-4.5-1.7-2.3 0-2.5 1.7-4.5 1.7-1.5 0-2-.6-2.5-1.7 1.9-2.3 3-5.3 5.5-5.3 2.3 0 2.5 1.7 4.5 1.7 2.3 0 2.5-1.7 4.5-1.7 1.5 0 2 .6 2.5 1.7-1.9 2.3-3 5.3-5.5 5.3z"></path>
            <path d="M9 7c0-1.7 1.3-3 3-3s3 1.3 3 3c0 0-1 0-3 0s-3 0-3 0z"></path>
          </svg>
        );
      case "android":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
            <path d="M5 16V8c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2v8c0 1.1-.9 2-2 2H7c-1.1 0-2-.9-2-2z"></path>
            <path d="M12 6V4"></path>
            <path d="M18 12h2"></path>
            <path d="M4 12h2"></path>
            <path d="M12 18v2"></path>
            <path d="M9 22h6"></path>
          </svg>
        );
      default:
        return null;
    }
  };

  const sizeClasses = mobile 
    ? "w-8 h-8" 
    : "w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7";

  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className={`text-slate-600 hover:text-slate-900 ${mobile ? '' : 'hover:scale-110'} transition-all duration-200`}
    >
      <div className={sizeClasses}>
        {getIcon()}
      </div>
    </a>
  );
};

export default HeaderBar;