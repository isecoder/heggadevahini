import React, { useState } from "react";
import { NewsItem, ImageItem } from "@/app/about/protected/routes/heggade-vahini/admin-portal/admind/news/types/news";

interface Props {
  newsId: number;
  setNews: React.Dispatch<React.SetStateAction<NewsItem[]>>;
  setFilteredNews: React.Dispatch<React.SetStateAction<NewsItem[]>>;
}

const ImageUploader: React.FC<Props> = ({
  newsId,
  setNews,
  setFilteredNews,
}) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
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
      formData.append("file", file);

      const response = await fetch(`/api/v1/news/${newsId}/images`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to upload image");

      const data = await response.json();
      const newImage: ImageItem = data.data; // ✅ Ensure API returns the correct image type

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
      alert("Image uploaded successfully");
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Error uploading image");
    }
  };

  return (
    <div className="flex items-center gap-2">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="border p-1 rounded-md"
      />
      <button
        onClick={handleUpload}
        className="bg-green-500 text-white px-3 py-1 rounded-md text-sm"
      >
        Upload
      </button>
    </div>
  );
};

export default ImageUploader;
