import React, { useState } from "react";
import { NewsItem, ImageItem } from "@/app/about/protected/routes/heggade-vahini/admin-portal/admind/news/types/news";
import { useRouter } from "next/navigation";
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
  
  const router = useRouter();
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const sanitizedFile = new File(
        [event.target.files[0]],
        event.target.files[0].name.replace(/\s+/g, "_"),
        { type: event.target.files[0].type }
      );
      setFile(sanitizedFile);
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
      const newImage: ImageItem = data.data;

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
      router.refresh();
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Error uploading image");
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="border p-2 rounded-md w-full sm:w-auto text-sm"
      />
      <button
        onClick={handleUpload}
        className="bg-green-500 text-white px-4 py-2 rounded-md text-sm w-full sm:w-auto"
      >
        Upload
      </button>
    </div>
  );
};

export default ImageUploader;
