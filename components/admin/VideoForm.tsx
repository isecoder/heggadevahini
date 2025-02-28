"use client";
import React, { useState } from "react";

const VideoForm = () => {
  const [title, setTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch("/api/v1/videos/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, url: videoUrl }),
      });
      setTitle("");
      setVideoUrl("");
    } catch (error) {
      console.error("Error adding video:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 flex flex-col space-y-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter video title"
        className="border p-2"
      />
      <input
        type="url"
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
        placeholder="Enter video URL"
        className="border p-2"
      />
      <button type="submit" className="bg-yellow-500 text-white px-4 py-2">
        Add Video
      </button>
    </form>
  );
};

export default VideoForm;
