import React from "react";
import { Tag } from "@/app/about/protected/routes/heggade-vahini/admin-portal/admind/news/types/news";

interface Props {
  newsId: number;
  tags: Tag[];
  selectedTag: { [key: number]: number };
  setSelectedTag: React.Dispatch<
    React.SetStateAction<{ [key: number]: number }>
  >;
}

const TagDropdown: React.FC<Props> = ({
  newsId,
  tags,
  selectedTag,
  setSelectedTag,
}) => {
  return (
    <select
      className="border p-1 rounded-md"
      value={selectedTag[newsId] || 0}
      onChange={(e) =>
        setSelectedTag({ ...selectedTag, [newsId]: parseInt(e.target.value) })
      }
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
