import React, { useState } from "react";
import { NewsItem, Translation } from "@/app/about/protected/routes/heggade-vahini/admin-portal/admind/news/types/news";

interface Props {
  selectedNewsId: number | null;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setNews: React.Dispatch<React.SetStateAction<NewsItem[]>>;
  setFilteredNews: React.Dispatch<React.SetStateAction<NewsItem[]>>;
}

const TranslationModal: React.FC<Props> = ({
  selectedNewsId,
  setIsModalOpen,
  setNews,
  setFilteredNews,
}) => {
  const [translation, setTranslation] = useState<Translation>({
    languageCode: "kn",
    title: "",
    content: "",
  });

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
      const addedTranslation: Translation = newTranslation.data; // ✅ Correctly typed

      setNews((prevNews) =>
        prevNews.map((item) =>
          item.id === selectedNewsId
            ? {
                ...item,
                translations: [...item.translations, addedTranslation],
              }
            : item
        )
      );

      setFilteredNews((prevNews) =>
        prevNews.map((item) =>
          item.id === selectedNewsId
            ? {
                ...item,
                translations: [...item.translations, addedTranslation],
              }
            : item
        )
      );

      setIsModalOpen(false);
      setTranslation({ languageCode: "en", title: "", content: "" });

      console.log("Translation added successfully:", addedTranslation);
      alert("Translation added successfully");
    } catch (error) {
      console.error("Error adding translation:", error);
      alert("Error adding translation");
    }
  };

  return (
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
          {["kn", "en"].map((lang) => (
            <option key={lang} value={lang}>
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
  );
};

export default TranslationModal;
