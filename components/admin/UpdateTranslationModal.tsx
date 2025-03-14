import React, { useState, useEffect } from "react";
import {
  NewsItem,
  Translation,
} from "@/app/about/protected/routes/heggade-vahini/admin-portal/admind/news/types/news";

interface Props {
  selectedNewsId: number | null;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setNews: React.Dispatch<React.SetStateAction<NewsItem[]>>;
  setFilteredNews: React.Dispatch<React.SetStateAction<NewsItem[]>>;
  existingTranslation: Translation | null;
}

const UpdateTranslationModal: React.FC<Props> = ({
  selectedNewsId,
  setIsModalOpen,
  setNews,
  setFilteredNews,
  existingTranslation,
}) => {
  const [translation, setTranslation] = useState<Translation>({
    languageCode: "kn", // ✅ Always Kannada (kn)
    title: existingTranslation?.title || "",
    content: existingTranslation?.content || "",
  });

  useEffect(() => {
    if (existingTranslation) {
      setTranslation({
        languageCode: "kn", // ✅ Ensure Kannada
        title: existingTranslation.title || "",
        content: existingTranslation.content || "",
      });
    }
  }, [existingTranslation]);

  const handleUpdateTranslation = async () => {
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
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${adminToken}`,
          },
          body: JSON.stringify(translation),
        }
      );

      if (!response.ok) throw new Error("Failed to update translation");

      // ✅ Fetch the updated news data from the API
      const updatedNewsResponse = await fetch(`/api/v1/news/${selectedNewsId}`);
      if (!updatedNewsResponse.ok)
        throw new Error("Failed to fetch updated news");

      const updatedNews: NewsItem = await updatedNewsResponse.json();

      console.log("Updated News Item:", updatedNews);

      // ✅ Ensure React properly updates the state with new references
      setNews((prevNews) =>
        prevNews.map((item) =>
          item.id === selectedNewsId ? updatedNews : item
        )
      );
      setFilteredNews((prevNews) =>
        prevNews.map((item) =>
          item.id === selectedNewsId ? updatedNews : item
        )
      );

      setIsModalOpen(false);
      console.log("Translation updated successfully:", updatedNews);
      alert("Translation updated successfully ✅");

      // ✅ Forcefully reload the page after a short delay (for smooth UX)
      setTimeout(() => {
        window.location.reload();
      }, 500); // Delay refresh for better user experience
    } catch (error) {
      console.error("Error updating translation:", error);
      alert("Error updating translation ❌");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 overflow-auto">
      <div className="bg-white p-6 rounded-md shadow-lg w-96 max-w-full">
        <h2 className="text-lg font-semibold">Update Kannada Translation</h2>

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
            onClick={handleUpdateTranslation}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateTranslationModal;
