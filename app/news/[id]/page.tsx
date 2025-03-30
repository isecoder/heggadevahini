import { Metadata } from "next";
import NewsDetails from "./NewsDetails";

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/news`;

type Props = {
  params: Promise<{ id: string }>; 
  searchParams?: Promise<Record<string, string>>; 
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  try {
    const response = await fetch(`${API_BASE_URL}/${resolvedParams.id}`, { cache: "no-store" });
    const data = await response.json();

    if (data.success && data.data) {
      const news = data.data;
      const title = news.title || "No Title";
      const content = news.content || "No content available.";
      const mainImage = news.images.length ? news.images[0].url : "";

      return {
        title,
        description: content.substring(0, 150) + "...",
        openGraph: {
          title,
          description: content.substring(0, 150) + "...",
          images: [{ url: mainImage, width: 800, height: 600 }],
          url: `${process.env.NEXT_PUBLIC_BASE_URL}/news/${resolvedParams.id}`,
          type: "article",
        },
      };
    }
  } catch (error) {
    console.error("Error generating metadata:", error);
  }

  return {
    title: "News Article",
    description: "Latest news article.",
  };
}

export default async function NewsPage({ params, searchParams }: Props) {
  const resolvedParams = await params; 
  if (searchParams) {
    const resolvedSearchParams = await searchParams; 
    console.log(resolvedSearchParams); 
  }

  const response = await fetch(`${API_BASE_URL}/${resolvedParams.id}`, { cache: "no-store" });
  const data = await response.json();
  const news = data.success && data.data ? data.data : null;

  if (!news) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-gray-600 font-medium">News not found</p>
      </div>
    );
  }

  return <NewsDetails news={news} />;
}