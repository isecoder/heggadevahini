"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import { ArrowLeft, Calendar, Clock, Share2, Eye } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface News {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  images: { url: string }[];
  views: number;
}

interface NewsDetailsProps {
  news: News;
}

export default function NewsDetails({ news }: NewsDetailsProps) {
  const [readingProgress, setReadingProgress] = useState(0);
  const [currentUrl, setCurrentUrl] = useState("");
  const articleRef = useRef<HTMLDivElement>(null);

 
  useEffect(() => {
    if (!currentUrl && typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, [currentUrl]);

  useEffect(() => {
    const handleScroll = () => {
      if (!articleRef.current) return;
      const { top, height } = articleRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const progress = Math.max(
        0,
        Math.min(
          100,
          ((viewportHeight - top) / (height + viewportHeight)) * 100
        )
      );
      setReadingProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const formattedDate = useMemo(() => {
    if (!news?.createdAt) return "";
    return new Date(news.createdAt).toLocaleDateString("kn-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }, [news]);

  const readingTime = useMemo(
    () => Math.max(1, Math.ceil(news.content.split(/\s+/).length / 200)),
    [news.content]
  );

  const handleShare = async () => {
    try {
      let message = `Check out this article: ${news.title}.\nRead more here:`;
      if (typeof navigator.share !== "function") {
        message += `\n${currentUrl}`;
      }
      if (navigator.share) {
        await navigator.share({
          title: news.title,
          text: message,
          url: currentUrl,
        });
      } else {
        navigator.clipboard.writeText(message);
        alert("Article details and URL copied to clipboard!");
      }
    } catch (error) {
      console.log("Error sharing:", error);
    }
  };

  return (
    <div className="min-h-screen bg-white px-1 sm:px-6 lg:px-8 py-8" ref={articleRef}>
      <div
        className="fixed top-0 left-0 h-1 bg-orange-500 z-50 transition-all duration-300 ease-out"
        style={{ width: `${readingProgress}%` }}
      />
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{news.title}</h1>
      <div className="flex items-center gap-2 text-gray-600 text-sm mb-4 lg:gap-6">
        <Calendar className="h-4 w-4" /> {formattedDate}
        <Clock className="h-4 w-4" /> {readingTime} ನಿಮಿಷಗಳ ಓದು
        <Eye className="h-4 w-4" /> {news.views} ವೀಕ್ಷಣೆಗಳು
      </div>
      {news.images.length > 0 && (
        <div className="w-full mb-6">
          <Image
            src={news.images[0].url}
            alt={news.title}
            width={800}
            height={500}
            className="w-full h-auto rounded-lg shadow-md"
            loading="lazy"
            unoptimized
          />
        </div>
      )}
      <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
        {news.content.split("\n").map((paragraph, idx) => (
          <p key={idx} className={idx === 0 ? "text-xl font-medium text-gray-800" : ""}>
            {paragraph}
          </p>
        ))}
      </div>
      <div className="mt-8 flex justify-between">
        <Link
          href="/latest"
          className="inline-flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to News
        </Link>
        <button
          onClick={handleShare}
          className="inline-flex items-center px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
        >
          <Share2 className="mr-2 h-4 w-4" />
          Share Article
        </button>
      </div>
    </div>
  );
}
