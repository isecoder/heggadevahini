"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
    
      <nav className="hidden md:flex items-center space-x-12 font-bold -ml-36">
        <Link href="/" className="text-black hover:text-[#F48634]">Home</Link>
        <Link href="/about" className="text-black hover:text-[#F48634]">About us</Link>
        <Link href="/e-paper" className="text-black hover:text-[#F48634]">E-Paper</Link>
        <Link href="/latest" className="text-black hover:text-[#F48634]">Latest News</Link>
        <Link href="/subscribe" className="text-black hover:text-[#F48634]" onClick={() => setIsOpen(false)}>Subscribe</Link>
        <Link href="/contact" className="text-black hover:text-[#F48634]" onClick={() => setIsOpen(false)}>Contact Us</Link>
        </nav>

     
      <button 
        className="md:hidden block text-black" 
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      
      <div className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transition-transform transform ${isOpen ? "translate-x-0" : "translate-x-full"} z-50`}>
        <div className="flex justify-end p-4">
          <button onClick={() => setIsOpen(false)}>
            <X className="h-6 w-6 text-black" />
          </button>
        </div>
        <nav className="flex flex-col space-y-6 font-bold text-lg p-6">
        <Link href="/" className="text-black hover:text-[#F48634]" onClick={() => setIsOpen(false)}>Home</Link>
          <Link href="/about" className="text-black hover:text-[#F48634]" onClick={() => setIsOpen(false)}>About us</Link>
          <Link href="/e-paper" className="text-black hover:text-[#F48634]" onClick={() => setIsOpen(false)}>E-Paper</Link>
          <Link href="/latest" className="text-black hover:text-[#F48634]" onClick={() => setIsOpen(false)}>Latest News</Link>
          <Link href="/subscribe" className="text-black hover:text-[#F48634]" onClick={() => setIsOpen(false)}>Subscribe</Link>
          <Link href="/contact" className="text-black hover:text-[#F48634]" onClick={() => setIsOpen(false)}>Contact Us</Link>
        </nav>
      </div>

     
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsOpen(false)}></div>}
    </>
  );
};

export default Navbar;
