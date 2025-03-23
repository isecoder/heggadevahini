"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import { useParams } from "next/navigation";
import { ArrowLeft, Calendar, Clock, Share2,Eye } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";

const API_BASE_URL = "/api/v1/news";

interface News {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  images: { url: string }[];
  views: number;
}

export default function NewsDetails() {
  const { id } = useParams() as { id?: string };
  const [news, setNews] = useState<News | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [readingProgress, setReadingProgress] = useState(0);
  const [currentUrl, setCurrentUrl] = useState("");
  const articleRef = useRef<HTMLDivElement>(null);

  // Default fallback image
  const defaultImage =
    "https://jviopmgisqfvtdwrpqxe.supabase.co/storage/v1/object/public/epapers/images%2F1740838660823_Screenshot_20250301_194624.png";

  useEffect(() => {
    if (!id) return;

    const fetchNews = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/${id}`);
        if (!response.ok) throw new Error("News not found");

        const data = await response.json();
        if (data.success && data.data) {
          setNews(data.data);
        } else {
          throw new Error("Invalid response from server");
        }
      } catch (err) {
        console.error("Error fetching news:", err);
        setError("Failed to load news article.");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [id]);

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

  const title = news?.title || "No Title";
  const content = news?.content || "No content available.";
  const mainImage = news?.images.length ? news.images[0].url : defaultImage;
  const views = news?.views || 0;
  const formattedDate = useMemo(() => {
    if (!news?.createdAt) return "";
    return new Date(news.createdAt).toLocaleDateString("kn-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }, [news]);

  const readingTime = useMemo(
    () => Math.max(1, Math.ceil(content.split(/\s+/).length / 200)),
    [content]
  );

  const handleShare = async () => {
    try {
      let message = `Check out this article: ${title}.\nRead more here:`;
      if (typeof navigator.share != "function") {
        message += `\n ${currentUrl}`;
      }
      if (navigator.share) {
        await navigator.share({
          title,
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

  if (loading || error || !news) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-gray-600 font-medium">
          {loading ? "Loading..." : error ? error : "News not found"}
        </p>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-white px-4 sm:px-6 lg:px-8 py-8"
      ref={articleRef}
    >
      <Head>
        <meta property="og:title" content={title} />
        <meta
          property="og:description"
          content={content.substring(0, 150) + "..."}
        />
        <meta property="og:image" content={mainImage} />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:type" content="article" />
      </Head>

      <div
        className="fixed top-0 left-0 h-1 bg-orange-500 z-50 transition-all duration-300 ease-out"
        style={{ width: `${readingProgress}%` }}
      />

      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        {title}
      </h1>

      <div className="flex items-center gap-4 text-gray-600 text-sm mb-4">
        <Calendar className="h-4 w-4" /> {formattedDate}
        <Clock className="h-4 w-4" /> {readingTime} ನಿಮಿಷಗಳ ಓದು
        <Eye className="h-4 w-4"/>{views} ವೀಕ್ಷಣೆಗಳು                   
      </div>

      {mainImage && (
        <div className="w-full mb-6">
          <Image
            src={mainImage}
            alt={title}
            width={800}
            height={500}
            className="w-full h-auto rounded-lg shadow-md"
            loading="lazy"
            unoptimized
          />
        </div>
      )}

      <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
        {content.split("\n").map((paragraph, idx) => (
          <p
            key={idx}
            className={idx === 0 ? "text-xl font-medium text-gray-800" : ""}
          >
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
