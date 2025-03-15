import React from "react";
import NewsItem from "./NewsItem";
import { NewsItem as NewsItemType } from "@/app/about/protected/routes/heggade-vahini/admin-portal/admind/news/types/news";

type Props = {
  news: NewsItemType[];
  setFilteredNews: React.Dispatch<React.SetStateAction<NewsItemType[]>>;
};

const NewsList: React.FC<Props> = ({
  news,
  setFilteredNews,
}) => {
  return (
    <div className="mt-4 space-y-4 px-4">
      {news.length > 0 ? (
        [...news]
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
          .map((item) => {
            if (!item.id) {
              console.warn("⚠️ News item missing id:", item);
            }
            return (
              <NewsItem
                key={item.id}
                item={item}
                setFilteredNews={setFilteredNews}
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
