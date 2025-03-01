"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="hidden md:flex items-center space-x-12 font-bold -ml-36">
        <Link href="/" className="text-black hover:text-[#F48634]">ಮುಖಪುಟ</Link>
        <Link href="/about" className="text-black hover:text-[#F48634]">ನಮ್ಮ ಬಗ್ಗೆ</Link>
        <Link href="/e-paper" className="text-black hover:text-[#F48634]">ಇ-ಪೇಪರ್</Link>
        <Link href="/latest" className="text-black hover:text-[#F48634]">ತಾಜಾ ಸುದ್ದಿ</Link>
        <Link href="/subscribe" className="text-black hover:text-[#F48634]" onClick={() => setIsOpen(false)}>ಚಂದಾದಾರರಾಗಿ</Link>
        <Link href="/contact" className="text-black hover:text-[#F48634]" onClick={() => setIsOpen(false)}>ಸಂಪರ್ಕಿಸಿ</Link>
      </nav>

      {/* Mobile Menu Button */}
      <button 
        className="md:hidden block text-black" 
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Mobile Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transition-transform transform ${isOpen ? "translate-x-0" : "translate-x-full"} z-50`}>
        <div className="flex justify-end p-4">
          <button onClick={() => setIsOpen(false)}>
            <X className="h-6 w-6 text-black" />
          </button>
        </div>
        <nav className="flex flex-col space-y-6 font-bold text-lg p-6">
          <Link href="/" className="text-black hover:text-[#F48634]" onClick={() => setIsOpen(false)}>ಮುಖಪುಟ</Link>
          <Link href="/about" className="text-black hover:text-[#F48634]" onClick={() => setIsOpen(false)}>ನಮ್ಮ ಬಗ್ಗೆ</Link>
          <Link href="/e-paper" className="text-black hover:text-[#F48634]" onClick={() => setIsOpen(false)}>ಇ-ಪೇಪರ್</Link>
          <Link href="/latest" className="text-black hover:text-[#F48634]" onClick={() => setIsOpen(false)}>ತಾಜಾ ಸುದ್ದಿ</Link>
          <Link href="/subscribe" className="text-black hover:text-[#F48634]" onClick={() => setIsOpen(false)}>ಚಂದಾದಾರರಾಗಿ</Link>
          <Link href="/contact" className="text-black hover:text-[#F48634]" onClick={() => setIsOpen(false)}>ಸಂಪರ್ಕಿಸಿ</Link>
        </nav>
      </div>

      {/* Overlay when menu is open */}
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsOpen(false)}></div>}
    </>
  );
};

export default Navbar;
