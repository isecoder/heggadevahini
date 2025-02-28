import React from "react";
// import { FaInstagram, FaFacebookF, FaEnvelope, FaYoutube, FaLinkedinIn, FaTwitter } from "react-icons/fa";
// import { AiFillAndroid } from "react-icons/ai";
// import { BsApple } from "react-icons/bs";

const HeaderBar: React.FC = () => {
  return (
    <div className="bg-gray-300 py-6 px-8 flex justify-between items-center">
      {/* Left Section: Date & Time */}
      <div className="text-black text-lg font-semibold">
        Wednesday, 12 Feb 2025 | UPDATED: 01:13 PM IST
      </div>

      {/* Right Section: Icons */}
      {/* <div className="flex gap-6 items-center">
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <FaInstagram className="text-black text-4xl hover:scale-110 transition-transform duration-200" />
        </a>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <FaFacebookF className="text-black text-4xl hover:scale-110 transition-transform duration-200" />
        </a>
        <a href="mailto:someone@example.com">
          <FaEnvelope className="text-black text-4xl hover:scale-110 transition-transform duration-200" />
        </a>
        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
          <FaYoutube className="text-black text-4xl hover:scale-110 transition-transform duration-200" />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
          <FaLinkedinIn className="text-black text-4xl hover:scale-110 transition-transform duration-200" />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <FaTwitter className="text-black text-4xl hover:scale-110 transition-transform duration-200" />
        </a>

       
        <span className="text-black text-lg font-semibold ml-4">Get App</span>

       
        <a href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer">
          <BsApple className="text-black text-4xl hover:scale-110 transition-transform duration-200" />
        </a>
        <a href="https://play.google.com/store" target="_blank" rel="noopener noreferrer">
          <AiFillAndroid className="text-black text-4xl hover:scale-110 transition-transform duration-200" />
        </a>
      </div> */}
    </div>
  );
};

export default HeaderBar;
