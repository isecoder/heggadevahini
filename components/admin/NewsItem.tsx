import React, { useState } from "react";
import Image from "next/image";
import ImageUploader from "@/components/admin/ImageUploader";
import UpdateTranslationModal from "@/components/admin/UpdateTranslationModal";
import {
  NewsItem as NewsItemType,
  Translation,
} from "@/app/about/protected/routes/heggade-vahini/admin-portal/admind/news/types/news";

interface Props {
  item: NewsItemType;
  setNews: React.Dispatch<React.SetStateAction<NewsItemType[]>>;
  setFilteredNews: React.Dispatch<React.SetStateAction<NewsItemType[]>>;
  setSelectedNewsId: React.Dispatch<React.SetStateAction<number | null>>;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const NewsItem: React.FC<Props> = ({
  item,
  setNews,
  setFilteredNews,
  setSelectedNewsId,
  setIsModalOpen,
}) => {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const adminToken = sessionStorage.getItem("adminToken") || "";

  const existingTranslation: Translation | null =
    item.translations?.find((t) => t.languageCode === "kn") || null;

  const handleDeleteNews = async () => {
    if (!adminToken) {
      console.error("No admin token found");
      return;
    }

    try {
      for (const translation of item.translations) {
        const response = await fetch(
          `/api/v1/news/${item.id}/translations/${translation.languageCode}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${adminToken}`,
            },
            body: JSON.stringify({
              languageCode: translation.languageCode,
            }),
          }
        );

        if (!response.ok) {
          console.error(
            `Failed to delete translation ${translation.languageCode} for news ${item.id}`
          );
          console.log(response);
        }
      }

      for (const image of item.images) {
        const response = await fetch(
          `/api/v1/news/${item.id}/images/${image.id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${adminToken}`,
            },
            body: JSON.stringify({
              id: item.id,
              imageId: image.id,
            }),
          }
        );

        if (!response.ok) {
          console.error(
            `Failed to delete image ${image.id} for news ${item.id}`
          );
        }
      }

      const deleteResponse = await fetch(`/api/v1/news/${item.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });

      if (!deleteResponse.ok) throw new Error("Failed to delete news");

      setNews((prevNews) => prevNews.filter((news) => news.id !== item.id));
      setFilteredNews((prevNews) =>
        prevNews.filter((news) => news.id !== item.id)
      );

      console.log(`Deleted news item: ${item.id}`);
      alert("News deleted successfully");
    } catch (error) {
      console.error("Error deleting news:", error);
      alert("Failed to delete news");
    }
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-md relative cursor-pointer">
      <h3 className="text-lg font-semibold">
        {existingTranslation?.title || "No Title Available"}
      </h3>
      <p className="text-gray-700">
        {existingTranslation?.content || "No Content Available"}
      </p>

      {(item.images ?? []).length > 0 && (
        <div className="flex gap-2 mt-2">
          {(item.images ?? []).map((img) => (
            <Image
              key={img.id}
              src={img.url}
              alt="News Image"
              width={100}
              height={100}
              className="rounded-md"
            />
          ))}
        </div>
      )}

      <ImageUploader
        newsId={item.id}
        setNews={setNews}
        setFilteredNews={setFilteredNews}
      />

      {existingTranslation ? (
        <button
          className="bg-yellow-500 text-white px-3 py-1 rounded-md text-sm mt-2"
          onClick={() => setIsUpdateModalOpen(true)}
        >
          Update Translation
        </button>
      ) : (
        <button
          className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm mt-2"
          onClick={() => {
            setSelectedNewsId(item.id);
            setIsModalOpen(true);
          }}
        >
          Add Translation
        </button>
      )}

      <button
        className="bg-red-500 text-white px-3 py-1 rounded-md text-sm mt-2"
        onClick={handleDeleteNews}
      >
        Delete News
      </button>

      {isUpdateModalOpen && (
        <UpdateTranslationModal
          selectedNewsId={item.id}
          setIsModalOpen={setIsUpdateModalOpen}
          setNews={setNews}
          setFilteredNews={setFilteredNews}
          existingTranslation={existingTranslation}
        />
      )}
    </div>
  );
};

export default NewsItem;
