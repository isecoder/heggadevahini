import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/components/context/language_content";
import { ToastProvider } from "../components/ui/use-toast";
import SiteFooter from "@/components/footer/footer";
import Header from "@/components/header/header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Heggade Vahini",
  description: "Stay updated with the latest news in English and Kannada.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ToastProvider>
          {" "}
          {/* Wrap your app with ToastProvider */}
          <LanguageProvider>
            <Header />
            <main className="container mx-auto p-4">{children}</main>
            <SiteFooter />
          </LanguageProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
