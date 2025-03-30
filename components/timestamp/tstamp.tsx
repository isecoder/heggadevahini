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
         
          const sortedData = data.data.sort(
            (a: { releaseDate: string }, b: { releaseDate: string }) =>
              new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
          );

          // Get the latest paper's releaseDate
          const latestPaper = sortedData[0];
          const releaseDate = new Date(latestPaper.releaseDate);

          // Format the releaseDate
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
      </div>
    </div>
  );
};

export default HeaderBar;
