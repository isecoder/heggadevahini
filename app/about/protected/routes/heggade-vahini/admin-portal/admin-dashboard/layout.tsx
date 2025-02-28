"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex">
      {/* Sidebar for Large Screens (Fixed) */}
      <aside className="hidden md:flex flex-col w-64 bg-gray-900 text-white fixed top-0 left-0 h-full p-4">
        <h2 className="text-2xl font-bold text-center py-4">Admin Dashboard</h2>
        <nav className="space-y-2">
          <SidebarLink href="/about/protected/routes/heggade-vahini/admin-portal/dashboard" label="Dashboard" />
          <SidebarLink href="/about/protected/routes/heggade-vahini/admin-portal/latest" label="Latest News" />
          <SidebarLink href="/about/protected/routes/heggade-vahini/admin-portal/trending" label="Trending" />
          <SidebarLink href="/about/protected/routes/heggade-vahini/admin-portal/politics" label="Politics" />
          <SidebarLink href="/about/protected/routes/heggade-vahini/admin-portal/wildlife" label="Environment & Wildlife" />
          <SidebarLink href="/about/protected/routes/heggade-vahini/admin-portal/sports" label="Sports" />
          <SidebarLink href="/about/protected/routes/heggade-vahini/admin-portal/heritage" label="Heritage & Architecture" />
          <SidebarLink href="/about/protected/routes/heggade-vahini/admin-portal/entertainment" label="Entertainment" />
        </nav>
      </aside>

      {/* Mobile Navigation Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-gray-900 text-white flex items-center justify-between p-4 z-50">
        <h2 className="text-xl font-bold">Admin Panel</h2>
        <button onClick={() => setIsOpen(!isOpen)} className="text-white">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsOpen(false)}></div>
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`md:hidden fixed top-0 left-0 h-full bg-gray-900 text-white p-6 w-64 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <nav className="space-y-4">
          <SidebarLink href="/about/protected/routes/heggade-vahini/admin-portal/dashboard" label="Dashboard" />
          <SidebarLink href="/about/protected/routes/heggade-vahini/admin-portal/latest" label="Latest News" />
          <SidebarLink href="/about/protected/routes/heggade-vahini/admin-portal/trending" label="Trending" />
          <SidebarLink href="/about/protected/routes/heggade-vahini/admin-portal/politics" label="Politics" />
          <SidebarLink href="/about/protected/routes/heggade-vahini/admin-portal/wildlife" label="Environment & Wildlife" />
          <SidebarLink href="/about/protected/routes/heggade-vahini/admin-portal/sports" label="Sports" />
          <SidebarLink href="/about/protected/routes/heggade-vahini/admin-portal/heritage" label="Heritage & Architecture" />
          <SidebarLink href="/about/protected/routes/heggade-vahini/admin-portal/entertainment" label="Entertainment" />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:ml-64 mt-16 md:mt-0 bg-gray-100 min-h-screen">
        {children}
      </main>
    </div>
  );
};

// Sidebar Link Component
const SidebarLink = ({ href, label }: { href: string; label: string }) => (
  <Link href={href} className="block px-4 py-2 rounded hover:bg-gray-700 transition">
    {label}
  </Link>
);

export default AdminLayout;
