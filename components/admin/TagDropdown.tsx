import React from "react";
import { Tag } from "@/app/about/protected/routes/heggade-vahini/admin-portal/admind/news/types/news";

interface Props {
  newsId: number;
  tags: Tag[];
  selectedTag: { [key: number]: number };
  setSelectedTag: React.Dispatch<
    React.SetStateAction<{ [key: number]: number }>
  >;
  adminToken: string; // Token for authorization
}

const TagDropdown: React.FC<Props> = ({
  newsId,
  tags,
  selectedTag,
  setSelectedTag,
  adminToken,
}) => {
  const handleTagChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const tagId = parseInt(e.target.value);
    setSelectedTag((prev) => ({ ...prev, [newsId]: tagId }));

    try {
      const response = await fetch(`/api/v1/news/${newsId}/tags`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({ tagId }),
      });

      if (!response.ok) {
        throw new Error("Failed to add tag to news");
      }

      console.log("Tag added successfully");
      alert("Tag added successfully");
    } catch (error) {
      console.error("Error adding tag:", error);
      alert("Failed to add tag");
    }
  };

  return (
    <select
      className="border p-1 rounded-md"
      value={selectedTag[newsId] || 0}
      onChange={handleTagChange}
    >
      <option value={0} disabled>
        Select a tag
      </option>
      {tags.map((tag) => (
        <option key={tag.id} value={tag.id}>
          {tag.name}
        </option>
      ))}
    </select>
  );
};

export default TagDropdown;
