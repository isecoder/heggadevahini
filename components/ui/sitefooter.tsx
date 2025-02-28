"use client"

import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="bg-gray-900 text-white py-6 mt-12">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        <p className="text-sm">&copy; {new Date().getFullYear()} Wildlife Explorer. All rights reserved.</p>
        <nav className="flex space-x-4 mt-2 md:mt-0">
          <Link href="#" className="text-sm hover:underline">
            Privacy Policy
          </Link>
          <Link href="#" className="text-sm hover:underline">
            Terms of Service
          </Link>
          <Link href="#" className="text-sm hover:underline">
            Contact Us
          </Link>
        </nav>
      </div>
    </footer>
  )
}
