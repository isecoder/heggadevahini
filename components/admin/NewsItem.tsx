import React from "react";
import Image from "next/image";
import TagDropdown from "@/components/admin/TagDropdown";
import ImageUploader from "@/components/admin/ImageUploader";
import {
  NewsItem as NewsItemType,
  Tag,
} from "@/app/about/protected/routes/heggade-vahini/admin-portal/admind/news/types/news";

interface Props {
  item: NewsItemType;
  tags: Tag[];
  setNews: React.Dispatch<React.SetStateAction<NewsItemType[]>>;
  setFilteredNews: React.Dispatch<React.SetStateAction<NewsItemType[]>>;
  setSelectedNewsId: React.Dispatch<React.SetStateAction<number | null>>;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedTag: { [key: number]: number };
  setSelectedTag: React.Dispatch<
    React.SetStateAction<{ [key: number]: number }>
  >;
}

const NewsItem: React.FC<Props> = ({
  item,
  tags,
  setNews,
  setFilteredNews,
  setSelectedNewsId,
  setIsModalOpen,
  selectedTag,
  setSelectedTag,
}) => {
  const handleDeleteNews = async () => {
    const adminToken = sessionStorage.getItem("adminToken");
    if (!adminToken) {
      console.error("No admin token found");
      return;
    }

    try {
      // Step 1: Delete all translations associated with this news
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
              id: item.id, // ✅ Include newsId in the body
              languageCode: translation.languageCode, // ✅ Include languageCode in the body
            }),
          }
        );

        if (!response.ok) {
          console.error(
            `Failed to delete translation ${translation.languageCode} for news ${item.id}`
          );
        }
      }

      // Step 2: Delete all images associated with this news
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
              id: item.id, // ✅ Include newsId in the body
              imageId: image.id, // ✅ Include imageId in the body
            }),
          }
        );

        if (!response.ok) {
          console.error(
            `Failed to delete image ${image.id} for news ${item.id}`
          );
        }
      }

      // Step 3: Delete the news itself
      const deleteResponse = await fetch(`/api/v1/news/${item.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });

      if (!deleteResponse.ok) throw new Error("Failed to delete news");

      // Step 4: Remove from UI state
      setNews((prevNews) => prevNews.filter((news) => news.id !== item.id));
      setFilteredNews((prevNews) =>
        prevNews.filter((news) => news.id !== item.id)
      );

      console.log(`Deleted news item: ${item.id}`);
    } catch (error) {
      console.error("Error deleting news:", error);
    }
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-md relative cursor-pointer">
      <h3 className="text-lg font-semibold">
        {item.translations?.find((t) => t.languageCode === "en")?.title ||
          "No Title Available"}
      </h3>
      <p className="text-gray-700">
        {item.translations?.find((t) => t.languageCode === "en")?.content ||
          "No Content Available"}
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

      <TagDropdown
        newsId={item.id}
        tags={tags}
        selectedTag={selectedTag}
        setSelectedTag={setSelectedTag}
      />

      {/* ✅ Pass setNews and setFilteredNews to ImageUploader */}
      <ImageUploader
        newsId={item.id}
        setNews={setNews}
        setFilteredNews={setFilteredNews}
      />

      <button
        className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm mt-2"
        onClick={() => {
          setSelectedNewsId(item.id);
          setIsModalOpen(true);
        }}
      >
        Add Translation
      </button>

      <button
        className="bg-red-500 text-white px-3 py-1 rounded-md text-sm mt-2"
        onClick={handleDeleteNews}
      >
        Delete News
      </button>
    </div>
  );
};

export default NewsItem;
