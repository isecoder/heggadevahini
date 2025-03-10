"use client"
import { Bell } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Timestamp from "../timestamp/tstamp";
import Navbar from "../navbar/nav";
// import { useLanguage } from "../context/language_content";

const Header = () => {
  // const { language, toggleLanguage } = useLanguage();
  // const toggleText = language === "English" ? "Kannada" : "English";

  return (
    <header className="border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-24">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.jpeg"
              alt="prerana logo"
              width={120}
              height={30}
              className="h-21 w-auto"
            />
          </Link>
          <div className="w-[2px] bg-[#000000] h-14  hidden md:block"></div>

          <div className="hidden md:flex">
            <Navbar />
          </div>

          <div className="flex items-center space-x-4">
            <Bell className="h-5 w-5 text-gray-600" />
            {/* <button
              className="bg-[#F48634] text-white px-4 py-2 rounded-md hover:bg-[#F48634]/90"
              onClick={toggleLanguage}
            >
              {toggleText}
            </button> */}
            <div className="md:hidden">
              <Navbar />
            </div>
          </div>
        </div>
      </div>
      <Timestamp />
    </header>
  );
};

export default Header;
