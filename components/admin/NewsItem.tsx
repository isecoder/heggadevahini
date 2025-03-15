import React, { useState } from "react";
import Image from "next/image";
import ImageUploader from "@/components/admin/ImageUploader";
import { NewsItem as NewsItemType } from "@/app/about/protected/routes/heggade-vahini/admin-portal/admind/news/types/news";

type Props = {
  item: NewsItemType;
  setFilteredNews: React.Dispatch<React.SetStateAction<NewsItemType[]>>;
};

const NewsItem: React.FC<Props> = ({ item, setFilteredNews }) => {
  const adminToken = sessionStorage.getItem("adminToken") || "";
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState(item.title);
  const [content, setContent] = useState(item.content);
  const [isPublished, setIsPublished] = useState(item.published || false);

  const handleEditTranslation = async () => {
    if (!adminToken) {
      alert("No admin token found");
      return;
    }

    try {
      const response = await fetch(`/api/v1/news/${item.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({ title, content }),
      });

      if (!response.ok) throw new Error("Failed to update translations");

      alert("Translations updated successfully");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating translations:", error);
      alert("Failed to update translations");
    }
  };

  const handleDeleteNews = async () => {
    if (!adminToken) {
      console.error("No admin token found");
      return;
    }

    try {
      if (item.images?.length > 0) {
        for (const image of item.images) {
          await fetch(`/api/v1/news/${item.id}/images/${image.id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${adminToken}`,
            },
          });
        }
      }

      const deleteResponse = await fetch(`/api/v1/news/${item.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${adminToken}` },
      });

      if (!deleteResponse.ok) throw new Error("Failed to delete news");

      setFilteredNews((prevNews) =>
        prevNews.filter((news) => news.id !== item.id)
      );

      alert("News deleted successfully");
    } catch (error) {
      console.error("Error deleting news:", error);
      alert("Failed to delete news");
    }
  };

  const handleTogglePublish = async () => {
    try {
      const response = await fetch(`/api/v1/news/${item.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({ published: !isPublished }),
      });

      if (!response.ok) throw new Error("Failed to update publish status");

      setIsPublished(!isPublished);
      alert(`Post ${!isPublished ? "Published" : "Unpublished"} Successfully`);
    } catch (error) {
      console.error("Error updating publish status:", error);
      alert("Failed to update publish status");
    }
  };

  return (
    <div className="p-5 bg-white shadow-md rounded-md relative cursor-pointer -mr-8 -ml-8">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-gray-700">{content}</p>

      {item.images?.length > 0 && (
        <div className="flex gap-2 mt-2">
          {item.images.map((img) => (
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

      <ImageUploader newsId={item.id} setFilteredNews={setFilteredNews} />

      <div className="flex gap-2 mt-3">
        <button
          className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm"
          onClick={() => setIsModalOpen(true)}
        >
          Edit Translations
        </button>
        <button
          className={`px-3 py-1 rounded-md text-sm ${
            isPublished ? "bg-yellow-500" : "bg-green-500"
          } text-white`}
          onClick={handleTogglePublish}
        >
          {isPublished ? "Unpublish" : "Publish"}
        </button>
        <button
          className="bg-red-500 text-white px-3 py-1 rounded-md text-sm"
          onClick={handleDeleteNews}
        >
          Delete
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-5 rounded-md shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-3">Edit News</h2>

            <label className="text-sm font-medium">Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border border-gray-300 rounded-md p-3 w-full mb-3"
            />

            <label className="text-sm font-medium">Content:</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="border border-gray-300 rounded-md p-6 w-full"
            />

            <div className="mt-4 flex justify-end gap-2">
              <button
                className="bg-gray-400 text-white px-3 py-1 rounded-md text-sm"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-green-500 text-white px-3 py-1 rounded-md text-sm"
                onClick={handleEditTranslation}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsItem;
