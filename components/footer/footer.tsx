"use client";
import { Button } from "@/components/ui/button";
import {
  Facebook,
  Instagram,
  Linkedin,
  LucideIcon,
  Mail,
  Twitter,
  Youtube,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SiteFooter() {
  const router = useRouter();
  const [clickCount, setClickCount] = useState(0);

  const handleClick = () => {
    if (clickCount + 1 === 4) {
      router.push("/about/protected/routes/heggade-vahini/admin-portal/login");
    }
    setClickCount((prev) => prev + 1);

    setTimeout(() => setClickCount(0), 2000);
  };

  return (
    <footer className="w-full bg-gradient-to-b from-orange-50 to-orange-100 pt-8">
      <div className="container mx-auto px-4 space-y-12 sm:space-y-16 ">
        {/* App Download Section */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-8">
          <Link
            href="#"
            className="transform transition-all duration-300 hover:scale-105 hover:-rotate-1"
          >
            <Image
              src="https://download.logo.wine/logo/App_Store_(iOS)/App_Store_(iOS)-Logo.wine.png"
              alt="Download on App Store"
              width={140}
              height={45}
              className="h-12 w-auto drop-shadow-sm"
            />
          </Link>
          <Link
            href="#"
            className="transform transition-all duration-300 hover:scale-105 hover:rotate-1"
          >
            <Image
              src="https://th.bing.com/th?id=OIP.1DOqUq6MOI3yD0VCkhnN9QHaF7&w=279&h=223&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2"
              alt="Get it on Google Play"
              width={140}
              height={45}
              className="h-12 w-auto drop-shadow-sm"
            />
          </Link>
        </div>

        {/* Newsletter Section */}
        <div className="max-w-2xl mx-auto text-center space-y-6 px-4">
          <div className="space-y-2">
            <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
              SIGN UP FOR NEWSLETTER
            </h3>
            <p className="text-muted-foreground text-sm sm:text-base">
              Sign up now and be the first to know about exclusive offers,
              latest fashion news & style tips!
            </p>
          </div>
          <div className="justify-center items-center flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            {/* <Input
              type="email"
              placeholder="Enter your email"
              className="bg-white/80 backdrop-blur-sm h-12 text-base"
            /> */}
            <Link href="/subscribe">
              <Button className="flex justify-center items-center bg-blue-600 hover:bg-blue-700 text-white px-8 h-12 text-base font-medium transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
                Subscribe
              </Button>
            </Link>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex justify-center flex-wrap gap-4 sm:gap-6">
          <SocialLink href="#" icon={Instagram} label="Instagram" />
          <SocialLink href="#" icon={Facebook} label="Facebook" />
          <SocialLink href="#" icon={Mail} label="Email" />
          <SocialLink href="#" icon={Youtube} label="YouTube" />
          <SocialLink href="#" icon={Linkedin} label="LinkedIn" />
          <SocialLink href="#" icon={Twitter} label="Twitter" />
        </div>

        {/* Navigation Links */}
        <nav className="flex justify-center flex-wrap gap-y-6 text-sm font-serif sm:text-base text-muted-foreground/100 max-w-2xl mx-auto px-4">
          <div className="flex items-center gap-3 sm:gap-6">
            <Link
              href="/about"
              className="hover:text-foreground transition-colors"
            >
              About
            </Link>
            <span className="text-muted-foreground/40 hidden sm:inline ">
              |
            </span>
            <Link href="/" className="hover:text-foreground transition-colors">
              Heggade Vahini
            </Link>
          </div>
          <div className="flex items-center gap-3 sm:gap-6 ml-3">
            <span className="text-muted-foreground/40 hidden sm:inline">|</span>
            <Link
              href="/e-paper"
              className="hover:text-foreground transition-colors"
            >
              e-Paper
            </Link>
            <span className="text-muted-foreground/40 hidden sm:inline">|</span>
            <Link
              href="/videos"
              className="hover:text-foreground transition-colors"
            >
              Videos
            </Link>
            <span className="text-muted-foreground/40 hidden sm:inline">|</span>
            <Link
              href="/contact"
              className="hover:text-foreground transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </nav>
        <div className=" border-t border-gray-400"></div>
        {/* Attribution */}
        <div className="text-center border-t border-muted/20">
          <p
            className="text-m -mt-11 hover:text-muted-foreground transition-colors text-black cursor-pointer"
            onClick={handleClick}
          >
            Designed & Developed by{" "}
            <Link
              className="text-black hover:text-amber-500"
              href="https://www.instagram.com/isdc.sahyadri/"
            >
              ISDC
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: LucideIcon;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="group relative bg-black/90 text-white p-3 rounded-full hover:bg-black transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
      aria-label={label}
    >
      <Icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
      <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {label}
      </span>
    </Link>
  );
}
