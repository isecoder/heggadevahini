"use client";
import React, { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import VideoForm from "@/components/admin/VideoForm";

type Video = {
  id: string;
  title: string;
  url: string;
};

const Videos = () => {
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    fetch("/api/v1/videos/")
      .then((res) => res.json())
      .then((data) => setVideos(Array.isArray(data) ? data : []))
      .catch((err) => {
        console.error("Error fetching videos:", err);
        setVideos([]); // Ensure videos remains an array even if fetch fails
      });
  }, []);

  return (
    <AdminLayout>
      <h2 className="text-center text-xl font-bold mt-6">Manage Videos</h2>
      <VideoForm />
      <ul className="mt-4">
        {videos.map((item) => (
          <li key={item.id} className="p-4 bg-white shadow-md rounded-md mt-2">
            {item.title}
          </li>
        ))}
      </ul>
    </AdminLayout>
  );
};

export default Videos;
