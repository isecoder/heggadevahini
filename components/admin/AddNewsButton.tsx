import React from "react";
import { useRouter } from "next/navigation"; // ✅ Import useRouter
import { NewsItem } from "@/app/about/protected/routes/heggade-vahini/admin-portal/admind/news/types/news"; // ✅ Import NewsItem type

interface Props {
  setNews: React.Dispatch<React.SetStateAction<NewsItem[]>>;
  setFilteredNews: React.Dispatch<React.SetStateAction<NewsItem[]>>;
}

const AddNewsButton: React.FC<Props> = ({ setNews, setFilteredNews }) => {
  const router = useRouter(); // ✅ Initialize Next.js router

  const handleAddNews = async () => {
    const adminToken = sessionStorage.getItem("adminToken");
    if (!adminToken) {
      console.error("No admin token found");
      return;
    }

    try {
      const response = await fetch(`/api/v1/news`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });

      if (!response.ok) throw new Error("Failed to add news");

      const newNews = await response.json();

      // ✅ Ensure images exist to prevent errors
      const newsItem = { ...newNews.data, images: newNews.data.images || [] };

      setNews((prevNews) => [newsItem, ...prevNews]);
      setFilteredNews((prevNews) => [newsItem, ...prevNews]);

      console.log("News added successfully:", newsItem);

      // ✅ Refresh the page smoothly without flickering
      setTimeout(() => {
        router.refresh();
      }, 500);
    } catch (error) {
      console.error("Error adding news:", error);
    }
  };

  return (
    <div className="flex justify-end px-4 mt-6">
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition"
        onClick={handleAddNews}
      >
        Add News
      </button>
    </div>
  );
};

export default AddNewsButton;
