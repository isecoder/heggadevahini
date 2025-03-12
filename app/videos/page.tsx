"use client";
import React from 'react';
import { useEffect, useState } from "react";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
interface Video {
  title: string;
  video_url: string;
}

function fetchdata(): Video[] {
  return [
    {
      title:
        "Kabettu School Centenary Program - Reminiscence of our Founder Shri Shivappa Hegde Yelnaduguthu",
      video_url:
        "https://www.youtube.com/embed/KbANCPsBzRQ?si=VC1vW7fyFq-H5xyA",
    },
  ];
}

const Page: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const data = fetchdata();
    setVideos(data);
    setLoading(false);
    setTimeout(() => {}, 1000);
  },[] );

  return (
    <div>
      {loading && <LoadingSpinner />}
      <h2 className="text-xl font-semibold mt-10 mb-6 p-2">VIDEOS</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 mb-80">
        {videos.map((video, index) => (
          <div key={index} className="w-full h-64">
            <iframe
              src={video.video_url}
              title={video.title}
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;