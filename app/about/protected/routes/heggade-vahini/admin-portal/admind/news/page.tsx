"use client";
import React, { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import NewsList from "@/components/admin/NewsList";
import AddNewsButton from "@/components/admin/AddNewsButton";
import SearchBar from "@/components/admin/SearchBar";
import TranslationModal from "@/components/admin/TranslationModel";
import { NewsItem as NewsItemType, Tag } from "./types/news";

const News = () => {
  const [news, setNews] = useState<NewsItemType[]>([]);
  const [filteredNews, setFilteredNews] = useState<NewsItemType[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedTag, setSelectedTag] = useState<{ [key: number]: number }>({});
  const [selectedNewsId, setSelectedNewsId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      const adminToken = sessionStorage.getItem("adminToken");
      if (!adminToken) return console.error("No admin token found");

      try {
        const res = await fetch(`/api/v1/news`, {
          headers: { Authorization: `Bearer ${adminToken}` },
        });
        const data = await res.json();
        setNews(data.data || []);
        setFilteredNews(data.data || []);
      } catch (err) {
        console.error("Error fetching news:", err);
      }
    };

    const fetchTags = async () => {
      const adminToken = sessionStorage.getItem("adminToken");
      if (!adminToken) return console.error("No admin token found");

      try {
        const res = await fetch(`/api/v1/news/tags`, {
          headers: { Authorization: `Bearer ${adminToken}` },
        });
        const data = await res.json();
        setTags(data.data || []);
      } catch (err) {
        console.error("Error fetching tags:", err);
      }
    };

    fetchNews();
    fetchTags();
  }, []);

  return (
    <AdminLayout>
      <AddNewsButton setNews={setNews} setFilteredNews={setFilteredNews} />
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        news={news}
        setFilteredNews={setFilteredNews}
      />
      <NewsList
        news={filteredNews}
        tags={tags}
        setNews={setNews}
        setFilteredNews={setFilteredNews}
        setSelectedNewsId={setSelectedNewsId}
        setIsModalOpen={setIsModalOpen}
        selectedTag={selectedTag}
        setSelectedTag={setSelectedTag}
      />
      {isModalOpen && (
        <TranslationModal
          selectedNewsId={selectedNewsId}
          setIsModalOpen={setIsModalOpen}
          setNews={setNews}
          setFilteredNews={setFilteredNews}
        />
      )}
    </AdminLayout>
  );
};

export default News;
