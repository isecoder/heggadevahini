"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

import * as pdfjs from "pdfjs-dist/build/pdf";
import "pdfjs-dist/build/pdf.worker.entry";

// ✅ Set workerSrc from CDN
pdfjs.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

const EpaperViewer = () => {
  const params = useParams();
  const id = params?.id as string;
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    fetch(`/api/v1/epaper/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.success) setFileUrl(data.data.pdfUrl);
        else setError("Failed to load e-paper.");
      })
      .catch(() => setError("Something went wrong."));
  }, [id]);

  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!fileUrl) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-full h-full max-w-[100vw] max-h-[100vh] overflow-scroll">
        <div className="scale-[1.2] sm:scale-100 origin-top lg:ml-36 lg:mr-36">
          <Viewer fileUrl={fileUrl} />
        </div>
      </div>
    </div>
  );
};

export default EpaperViewer;
