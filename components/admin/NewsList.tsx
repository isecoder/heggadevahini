import React from "react";
import NewsItem from "./NewsItem";
import {
  NewsItem as NewsItemType,
  Tag,
} from "@/app/about/protected/routes/heggade-vahini/admin-portal/admind/news/types/news";

interface Props {
  news: NewsItemType[];
  tags: Tag[];
  setNews: React.Dispatch<React.SetStateAction<NewsItemType[]>>;
  setFilteredNews: React.Dispatch<React.SetStateAction<NewsItemType[]>>;
  setSelectedNewsId: React.Dispatch<React.SetStateAction<number | null>>;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedTag: { [key: number]: number };
  setSelectedTag: React.Dispatch<
    React.SetStateAction<{ [key: number]: number }>
  >;
}

const NewsList: React.FC<Props> = ({
  news,
  setNews,
  setFilteredNews,
  setSelectedNewsId,
  setIsModalOpen,
}) => {
  return (
    <div className="mt-4 space-y-4 px-4">
      {news.length > 0 ? (
        [...news]
         .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .map((item) => {
          if (!item.id) {
            console.warn("⚠️ News item missing id:", item);
          }
          return (
            <NewsItem
              key={item.id} // ✅ Ensure unique key
              item={item}
              setNews={setNews}
              setFilteredNews={setFilteredNews}
              setSelectedNewsId={setSelectedNewsId}
              setIsModalOpen={setIsModalOpen}
            />
          );
        })
      ) : (
        <p className="text-center mt-4 text-gray-500">No news available</p>
      )}
    </div>
  );
};

export default NewsList;
