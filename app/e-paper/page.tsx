"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar, FileText, Newspaper } from "lucide-react";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

interface Epaper {
  id: number;
  pdfUrl: string;
  releaseDate: string;
  downloadable: boolean;
  shareable: boolean;
  printable: boolean;
}

const EpaperPage = () => {
  const [epapers, setEpapers] = useState<Record<string, Epaper[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchEpapers = async () => {
      try {
        const response = await fetch("/api/v1/epaper");
        if (!response.ok) throw new Error("Failed to fetch e-papers.");

        const { data } = await response.json();
        const sortedAndGroupedEpapers = groupByMonth(data);
        setEpapers(sortedAndGroupedEpapers);
      } catch (err) {
        console.error(err);
        setError("Failed to load the e-papers.");
      } finally {
        setLoading(false);
      }
    };

    const interval = setInterval(() => fetchEpapers(), 2000);
    return () => clearInterval(interval);
  }, []);

  const groupByMonth = (epapers: Epaper[]) => {
    return epapers
      .sort(
        (a, b) =>
          new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
      )
      .reduce((acc: Record<string, Epaper[]>, epaper) => {
        const monthYear = new Date(epaper.releaseDate).toLocaleString("en-US", {
          month: "long",
          year: "numeric",
        });

        if (!acc[monthYear]) acc[monthYear] = [];
        acc[monthYear].push(epaper);
        return acc;
      }, {});
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  };

  const getSlugFromFileName = (fileName: string) => {
    const rawName =
      fileName.split("/").pop()?.split("_").slice(1).join(" ") || "";
    return rawName
      .replace(/\.pdf$/i, "")
      .replace(/\s+/g, "-")
      .toLowerCase();
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-10 px-6 text-center">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center items-center mb-2">
            <Newspaper className="h-8 w-8 mr-2" />
            <h1 className="text-3xl md:text-4xl font-bold">E-Paper Archives</h1>
          </div>
          <p className="text-orange-100 max-w-2xl mx-auto">
            Browse and read our complete collection of digital newspaper
            editions.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <LoadingSpinner />
          </div>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : Object.keys(epapers).length === 0 ? (
          <div className="text-center py-16">
            <FileText className="h-16 w-16 mx-auto text-gray-300 mb-4" />
            <p className="text-xl text-gray-500">
              No e-papers available at the moment.
            </p>
          </div>
        ) : (
          Object.entries(epapers).map(([month, papers]) => (
            <div key={month} className="mb-8">
              <h2 className="text-2xl font-semibold text-orange-600 mb-4">
                {month}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {papers.map((epaper) => (
                  <div key={epaper.id} className="group cursor-pointer">
                    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col">
                      <div className="relative bg-gray-100 h-40 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-orange-600/30"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <FileText className="h-16 w-16 text-orange-500 group-hover:scale-110 transition-transform duration-300" />
                        </div>
                        <div className="absolute top-3 right-3 bg-white/90 text-orange-600 text-xs font-medium py-1 px-2 rounded-full">
                          {new Date(epaper.releaseDate).toLocaleDateString(
                            "en-US",
                            {
                              weekday: "long",
                            }
                          )}
                        </div>
                      </div>
                      <div className="p-5 flex-grow flex flex-col justify-between">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-orange-600 transition-colors">
                          E-Paper Edition
                        </h3>
                        <div className="flex items-center text-gray-500 mb-4">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span className="text-sm">
                            {formatDate(epaper.releaseDate)}
                          </span>
                        </div>
                        <div className="flex gap-4 flex-wrap">
                          <button
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                            onClick={async () => {
                              try {
                                const res = await fetch(
                                  `/api/v1/epaper/${epaper.id}`
                                );
                                const data = await res.json();
                                const fileName = data.data.fileName;
                                const slug = getSlugFromFileName(fileName);
                                router.push(`/e-paper/${epaper.id}-${slug}`);
                              } catch (err) {
                                console.error("Failed to redirect", err);
                              }
                            }}
                          >
                            View
                          </button>

                          <a
                            className="bg-green-500 text-white px-4 py-2 rounded"
                            href={epaper.pdfUrl}
                            download
                          >
                            Download
                          </a>

                          <button
                            className="bg-orange-500 text-white px-4 py-2 rounded"
                            onClick={async () => {
                              try {
                                const res = await fetch(
                                  `/api/v1/epaper/${epaper.id}`
                                );
                                const data = await res.json();
                                const fileName = data.data.fileName;
                                const slug = getSlugFromFileName(fileName);
                                const shareUrl = `https://www.heggadevahini.com/e-paper/${epaper.id}-${slug}`;
                                const shareText = `Read the edition released on ${formatDate(
                                  epaper.releaseDate
                                )}.`;

                                if (navigator.share) {
                                  await navigator.share({
                                    title:
                                      "Check out this e-paper edition from Heggadevahini!",
                                    text: shareText,
                                    url: shareUrl,
                                  });
                                } else {
                                  await navigator.clipboard.writeText(shareUrl);
                                  alert("Share link copied to clipboard!");
                                }
                              } catch (err) {
                                console.error("Failed to share", err);
                              }
                            }}
                          >
                            Share
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default EpaperPage;
