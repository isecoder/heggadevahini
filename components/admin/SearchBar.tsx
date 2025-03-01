import React from "react";
import { NewsItem as NewsItemType } from "@/app/about/protected/routes/heggade-vahini/admin-portal/admind/news/types/news";

interface Props {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  news: NewsItemType[];
  setFilteredNews: React.Dispatch<React.SetStateAction<NewsItemType[]>>;
}

const SearchBar: React.FC<Props> = ({
  searchQuery,
  setSearchQuery,
  news,
  setFilteredNews,
}) => {
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = news.filter((item) => {
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

  return (
    <div className="flex justify-between items-center mt-6 px-4">
      <input
        type="text"
        placeholder="Search news..."
        value={searchQuery}
        onChange={handleSearch}
        className="border p-2 w-1/2 rounded-md shadow-sm"
      />
    </div>
  );
};

export default SearchBar;
