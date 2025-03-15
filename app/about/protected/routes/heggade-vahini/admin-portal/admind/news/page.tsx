"use client";
import React, { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import NewsList from "@/components/admin/NewsList";
import AddNewsButton from "@/components/admin/AddNewsButton";
import { NewsItem as NewsItemType } from "./types/news";

const News = () => {
  const [filteredNews, setFilteredNews] = useState<NewsItemType[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      const adminToken = sessionStorage.getItem("adminToken");
      if (!adminToken) return console.error("No admin token found");

      try {
        const res = await fetch(`/api/v1/news`, {
          headers: { Authorization: `Bearer ${adminToken}` },
        });
        const data = await res.json();
        setFilteredNews(data.data || []);
      } catch (err) {
        console.error("Error fetching news:", err);
      }
    };

    fetchNews();
  }, []);

  return (
    <AdminLayout>
      <AddNewsButton setFilteredNews={setFilteredNews} />
      <NewsList news={filteredNews} setFilteredNews={setFilteredNews} />
    </AdminLayout>
  );
};

export default News;
