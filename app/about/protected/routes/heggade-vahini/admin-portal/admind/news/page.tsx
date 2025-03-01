"use client";
import React, { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import Image from "next/image";

interface Translation {
  languageCode: string;
  title: string;
  content: string;
}

interface ImageItem {
  id: string;
  url: string;
}

interface NewsItem {
  id: number;
  translations: Translation[];
  images: ImageItem[];
  tags: string[];
}

interface Tag {
  id: number;
  name: string;
}

const News = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [filteredNews, setFilteredNews] = useState<NewsItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedTag, setSelectedTag] = useState<{ [key: number]: number }>({});
  const [selectedNewsId, setSelectedNewsId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [translation, setTranslation] = useState({
    languageCode: "en",
    title: "",
    content: "",
  });

  useEffect(() => {
    const fetchNews = async () => {
      const adminToken = sessionStorage.getItem("adminToken");
      if (!adminToken) {
        console.error("No admin token found");
        return;
      }

      try {
        const res = await fetch(`/api/v1/news`, {
          headers: { Authorization: `Bearer ${adminToken}` },
        });
        const data = await res.json();
        setNews(data.data || []);
        setFilteredNews(data.data || []);
      } catch (err) {
        console.error("Error fetching news:", err);
      }
    };

    const fetchTags = async () => {
      const adminToken = sessionStorage.getItem("adminToken");
      if (!adminToken) {
        console.error("No admin token found");
        return;
      }

      try {
        const res = await fetch(`/api/v1/news/tags`, {
          headers: { Authorization: `Bearer ${adminToken}` },
        });
        const data = await res.json();
        setTags(data.data || []);
      } catch (err) {
        console.error("Error fetching tags:", err);
      }
    };

    fetchNews();
    fetchTags();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = news.filter((item: NewsItem) => {
      const englishTranslation = item.translations?.find(
        (t) => t.languageCode === "en"
      );

      return (
        englishTranslation?.title?.toLowerCase().includes(query) ||
        englishTranslation?.content?.toLowerCase().includes(query)
      );
    });

    setFilteredNews(filtered);
  };

  const handleAddTag = async (newsId: number) => {
    const tagId = selectedTag[newsId];
    if (!tagId) return;

    const adminToken = sessionStorage.getItem("adminToken");
    if (!adminToken) {
      console.error("No admin token found");
      return;
    }

    try {
      const response = await fetch(`/api/v1/news/${newsId}/tags`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({ tagId }), // ✅ Fix: Use tagId instead of id
      });

      if (!response.ok) throw new Error("Failed to add tag");

      const tagName = tags.find((t) => t.id === tagId)?.name ?? "Unknown Tag";

      setNews((prevNews) =>
        prevNews.map((item) =>
          item.id === newsId ? { ...item, tags: [...item.tags, tagName] } : item
        )
      );

      setFilteredNews((prevNews) =>
        prevNews.map((item) =>
          item.id === newsId ? { ...item, tags: [...item.tags, tagName] } : item
        )
      );

      setSelectedTag((prev) => ({ ...prev, [newsId]: 0 }));
    } catch (error) {
      console.error("Error adding tag:", error);
    }
  };
  const handleAddImage = async (newsId: number, file: File | null) => {
    if (!file) {
      console.error("No file selected");
      return;
    }

    const adminToken = sessionStorage.getItem("adminToken");
    if (!adminToken) {
      console.error("No admin token found");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file); // ✅ Fix: FormData key should be "file"

      const response = await fetch(`/api/v1/news/${newsId}/images`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
        body: formData,
      });

      console.log("Response:", response);

      if (!response.ok) throw new Error("Failed to upload image");

      const data = await response.json();
      const newImage = data.data; // Assuming API returns the uploaded image details

      setNews((prevNews) =>
        prevNews.map((item) =>
          item.id === newsId
            ? { ...item, images: [...item.images, newImage] }
            : item
        )
      );

      setFilteredNews((prevNews) =>
        prevNews.map((item) =>
          item.id === newsId
            ? { ...item, images: [...item.images, newImage] }
            : item
        )
      );

      console.log("Image uploaded successfully:", newImage);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

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
      setNews((prevNews) => [newNews.data, ...prevNews]); // ✅ Add new news at the top
      setFilteredNews((prevNews) => [newNews.data, ...prevNews]);

      console.log("News added successfully:", newNews);
    } catch (error) {
      console.error("Error adding news:", error);
    }
  };
  const handleAddTranslation = async () => {
    if (!selectedNewsId) return;

    const adminToken = sessionStorage.getItem("adminToken");
    if (!adminToken) {
      console.error("No admin token found");
      return;
    }

    try {
      const response = await fetch(
        `/api/v1/news/${selectedNewsId}/translations`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${adminToken}`,
          },
          body: JSON.stringify(translation),
        }
      );

      if (!response.ok) throw new Error("Failed to add translation");

      const newTranslation = await response.json();

      setNews((prevNews) =>
        prevNews.map((item) =>
          item.id === selectedNewsId
            ? {
                ...item,
                translations: [...item.translations, newTranslation.data],
              }
            : item
        )
      );

      setFilteredNews((prevNews) =>
        prevNews.map((item) =>
          item.id === selectedNewsId
            ? {
                ...item,
                translations: [...item.translations, newTranslation.data],
              }
            : item
        )
      );

      setIsModalOpen(false);
      setTranslation({ languageCode: "en", title: "", content: "" });

      console.log("Translation added successfully:", newTranslation);
    } catch (error) {
      console.error("Error adding translation:", error);
    }
  };

  const handleDeleteNews = async (
    newsId: number,
    images: ImageItem[],
    translations: Translation[]
  ) => {
    const adminToken = sessionStorage.getItem("adminToken");
    if (!adminToken) {
      console.error("No admin token found");
      return;
    }

    try {
      // Step 1: Delete All Images
      for (const image of images) {
        await fetch(`/api/v1/news/${newsId}/images/${image.id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${adminToken}` },
        });
      }

      // Step 2: Delete All Translations
      for (const translation of translations) {
        await fetch(
          `/api/v1/news/${newsId}/translations/${translation.languageCode}`,
          {
            method: "DELETE",
            headers: { Authorization: `Bearer ${adminToken}` },
          }
        );
      }

      // Step 3: Delete News Itself
      const deleteResponse = await fetch(`/api/v1/news/${newsId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${adminToken}` },
      });

      if (!deleteResponse.ok) throw new Error("Failed to delete news");

      // Step 4: Remove from State
      setNews((prevNews) => prevNews.filter((item) => item.id !== newsId));
      setFilteredNews((prevNews) =>
        prevNews.filter((item) => item.id !== newsId)
      );

      console.log("News deleted successfully");
    } catch (error) {
      console.error("Error deleting news:", error);
    }
  };

  return (
    <AdminLayout>
      {/* Add News Button */}
      <div className="flex justify-end px-4 mt-6">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md"
          onClick={handleAddNews}
        >
          Add News
        </button>
      </div>

      {/* Search Bar */}
      <div className="flex justify-between items-center mt-6 px-4">
        <input
          type="text"
          placeholder="Search news..."
          value={searchQuery}
          onChange={handleSearch}
          className="border p-2 w-1/2 rounded-md shadow-sm"
        />
      </div>

      {/* News List */}
      <div className="mt-4 space-y-4 px-4">
        {filteredNews.length > 0 ? (
          filteredNews.map((item: NewsItem) => {
            const englishTranslation = item.translations?.find(
              (t) => t.languageCode === "en"
            );
            const title = englishTranslation?.title || "No Title Available";
            const content =
              englishTranslation?.content || "No Content Available";

            return (
              <div
                key={item.id}
                className="p-4 bg-white shadow-md rounded-md relative cursor-pointer"
              >
                {/* Click to open translation modal */}
                {/* News Content */}
                <div>
                  <h3 className="text-lg font-semibold">{title}</h3>
                  <p className="text-gray-700">{content}</p>

                  {/* Display Images */}
                  {item.images && item.images.length > 0 ? (
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
                  ) : (
                    <p className="text-gray-500 mt-2">No Images Available</p>
                  )}

                  {/* Display Tags */}
                  <div className="mt-2">
                    <h4 className="font-semibold text-sm">Tags:</h4>
                    {item.tags && item.tags.length > 0 ? (
                      <div className="flex flex-wrap gap-2 mt-1">
                        {item.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="bg-blue-200 text-blue-800 px-2 py-1 rounded-md text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-sm">No tags assigned</p>
                    )}
                  </div>

                  {/* Add Translation Button */}
                  <button
                    className="mt-2 bg-blue-500 text-white px-3 py-1 rounded-md text-sm"
                    onClick={() => {
                      setSelectedNewsId(item.id);
                      setIsModalOpen(true);
                    }}
                  >
                    Add Translation
                  </button>

                  {/* Delete News Button */}
                  <button
                    className="mt-2 bg-red-500 text-white px-3 py-1 rounded-md text-sm"
                    onClick={() =>
                      handleDeleteNews(item.id, item.images, item.translations)
                    }
                  >
                    Delete News
                  </button>
                </div>

                {/* Add Tag Dropdown */}
                <div className="mt-2 flex items-center gap-2">
                  <select
                    className="border p-1 rounded-md"
                    value={selectedTag[item.id] || 0}
                    onChange={(e) =>
                      setSelectedTag({
                        ...selectedTag,
                        [item.id]: parseInt(e.target.value),
                      })
                    }
                  >
                    <option value={0} disabled>
                      Select a tag
                    </option>
                    {tags.map((tag) => (
                      <option
                        key={tag.id}
                        value={tag.id}
                        disabled={item.tags?.includes(tag.name)}
                      >
                        {tag.name}
                      </option>
                    ))}
                  </select>
                  <button
                    className="bg-green-500 text-white px-3 py-1 rounded-md text-sm"
                    onClick={() => handleAddTag(item.id)}
                    disabled={!selectedTag[item.id]}
                  >
                    Add Tag
                  </button>
                </div>

                {/* Add Image to News */}
                <div className="mt-2 flex items-center gap-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      handleAddImage(item.id, e.target.files?.[0] || null)
                    }
                    className="border p-1 rounded-md"
                  />
                </div>

                {/* ✅ Translation Modal for This News Item */}
                {/* ✅ Translation Modal for This News Item */}
                {isModalOpen && selectedNewsId === item.id && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 overflow-auto">
                    <div className="bg-white p-6 rounded-md shadow-lg w-96 max-w-full">
                      <h2 className="text-lg font-semibold">Add Translation</h2>

                      {/* Language Dropdown */}
                      <select
                        className="border p-2 w-full mt-2 rounded-md"
                        value={translation.languageCode}
                        onChange={(e) =>
                          setTranslation({
                            ...translation,
                            languageCode: e.target.value,
                          })
                        }
                      >
                        {["en", "kn"].map((lang) => (
                          <option
                            key={lang}
                            value={lang}
                            disabled={item.translations.some(
                              (t) => t.languageCode === lang
                            )}
                          >
                            {lang.toUpperCase()}
                          </option>
                        ))}
                      </select>

                      {/* Title Input */}
                      <input
                        type="text"
                        placeholder="Enter title"
                        className="border p-2 w-full mt-2 rounded-md"
                        value={translation.title}
                        onChange={(e) =>
                          setTranslation({
                            ...translation,
                            title: e.target.value,
                          })
                        }
                      />

                      {/* Content Input */}
                      <textarea
                        placeholder="Enter content"
                        className="border p-2 w-full mt-2 rounded-md"
                        value={translation.content}
                        onChange={(e) =>
                          setTranslation({
                            ...translation,
                            content: e.target.value,
                          })
                        }
                      ></textarea>

                      {/* Buttons */}
                      <div className="flex justify-between mt-4">
                        <button
                          className="bg-gray-400 text-white px-4 py-2 rounded-md"
                          onClick={() => setIsModalOpen(false)}
                        >
                          Cancel
                        </button>
                        <button
                          className="bg-blue-500 text-white px-4 py-2 rounded-md"
                          onClick={handleAddTranslation}
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <p className="text-center mt-4 text-gray-500">No news available</p>
        )}
      </div>
    </AdminLayout>
  );
};

export default News;
