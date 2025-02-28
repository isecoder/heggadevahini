"use client";

import React, { useState, useEffect } from "react";

// Define types for news and form props
interface NewsItem {
  id: number;
  title: string;
  description: string;
  titleKannada?: string;
  descriptionKannada?: string;
}

interface NewsFormProps {
  setNews: React.Dispatch<React.SetStateAction<NewsItem[]>>; // Proper type for setNews function
  closeForm: () => void; // Close form function
  editNews?: NewsItem; // Optional editNews prop
  handleUpdate: (newsData: NewsItem) => Promise<void>; // Update function
}

const NewsForm: React.FC<NewsFormProps> = ({
  setNews,
  closeForm,
  editNews,
  handleUpdate,
}) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [titleKannada, setTitleKannada] = useState<string>("");
  const [descriptionKannada, setDescriptionKannada] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);

  useEffect(() => {
    if (editNews) {
      setTitle(editNews.title || "");
      setDescription(editNews.description || "");
      setTitleKannada(editNews.titleKannada || "");
      setDescriptionKannada(editNews.descriptionKannada || "");
    }
  }, [editNews]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newsData: NewsItem = {
      id: editNews?.id || 0,
      title,
      description,
      titleKannada,
      descriptionKannada,
    };

    try {
      if (editNews) {
        await handleUpdate(newsData);
        setNews((prev) =>
          prev.map((news) =>
            news.id === editNews.id ? { ...news, ...newsData } : news
          )
        );
      } else {
        const newsResponse = await fetch(`/api/v1/news/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, description }),
        });

        if (!newsResponse.ok) throw new Error("Failed to add news");
        const newsData = await newsResponse.json();
        const newsId = newsData.id;

        if (titleKannada || descriptionKannada) {
          await fetch(`/api/v1/news/${newsId}/translations`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              title: titleKannada,
              description: descriptionKannada,
            }),
          });
        }

        if (image) {
          const formData = new FormData();
          formData.append("image", image);
          await fetch(`/api/v1/news/${newsId}/images`, {
            method: "POST",
            body: formData,
          });
        }

        setNews((prev) => [
          ...prev,
          { id: newsId, title, description, titleKannada, descriptionKannada },
        ]);
      }

      closeForm();
    } catch (error) {
      console.error("Error adding/updating news:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-4 space-y-4 flex flex-col items-center w-full max-w-lg mx-auto"
    >
      <div className="w-full">
        <label className="block font-medium">Title (English)</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 w-full"
        />
      </div>

      <div className="w-full">
        <label className="block font-medium">Description (English)</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 w-full"
        />
      </div>

      <div className="w-full">
        <label className="block font-medium">Title (Kannada)</label>
        <input
          type="text"
          value={titleKannada}
          onChange={(e) => setTitleKannada(e.target.value)}
          className="border p-2 w-full"
        />
      </div>

      <div className="w-full">
        <label className="block font-medium">Description (Kannada)</label>
        <textarea
          value={descriptionKannada}
          onChange={(e) => setDescriptionKannada(e.target.value)}
          className="border p-2 w-full"
        />
      </div>

      <div className="w-full">
        <label className="block font-medium">Upload Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          className="border p-2 w-full"
        />
      </div>

      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded w-full max-w-xs"
      >
        {editNews ? "Update News" : "Upload"}
      </button>
    </form>
  );
};

export default NewsForm;
