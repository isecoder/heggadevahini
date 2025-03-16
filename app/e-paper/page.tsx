// "use client";

// import { useEffect, useState } from "react";
// import { Calendar, FileText, Newspaper, Download } from "lucide-react";
// import LoadingSpinner from "@/components/ui/LoadingSpinner";
// import {  Viewer } from "@react-pdf-viewer/core";
// import "@react-pdf-viewer/core/lib/styles/index.css";
// import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
// import "@react-pdf-viewer/default-layout/lib/styles/index.css";
// import * as pdfjs from "pdfjs-dist/build/pdf";
// import "pdfjs-dist/build/pdf.worker.entry";

// pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;

// interface Epaper {
//   id: number;
//   pdfUrl: string;
//   releaseDate: string;
//   downloadable: boolean;
//   shareable: boolean;
//   printable: boolean;
// }

// const EpaperPage = () => {
//   const [epapers, setEpapers] = useState<Record<string, Epaper[]>>({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [selectedPdfUrl, setSelectedPdfUrl] = useState<string | null>(null);

//   const defaultLayoutPluginInstance = defaultLayoutPlugin();

//   useEffect(() => {
//     const fetchEpapers = async () => {
//       try {
//         const response = await fetch("/api/v1/epaper");
//         if (!response.ok) throw new Error("Failed to fetch e-papers.");

//         const { data } = await response.json();
//         const sortedAndGroupedEpapers = groupByMonth(data);
//         setEpapers(sortedAndGroupedEpapers);
//       } catch (err) {
//         console.error(err);
//         setError("Failed to load the e-papers.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     const interval = setInterval(() => fetchEpapers(), 2000);
//     return () => clearInterval(interval);
//   }, []);

//   const groupByMonth = (epapers: Epaper[]) => {
//     return epapers
//       .sort(
//         (a, b) =>
//           new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
//       )
//       .reduce((acc: Record<string, Epaper[]>, epaper) => {
//         const monthYear = new Date(epaper.releaseDate).toLocaleString("en-US", {
//           month: "long",
//           year: "numeric",
//         });

//         if (!acc[monthYear]) acc[monthYear] = [];
//         acc[monthYear].push(epaper);
//         return acc;
//       }, {});
//   };

//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-US", {
//       month: "short",
//       day: "2-digit",
//       year: "numeric",
//     });
//   };

//   return (
//     <div className="min-h-screen bg-white">
//       <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-10 px-6 text-center">
//         <div className="max-w-6xl mx-auto">
//           <div className="flex justify-center items-center mb-2">
//             <Newspaper className="h-8 w-8 mr-2" />
//             <h1 className="text-3xl md:text-4xl font-bold">E-Paper Archives</h1>
//           </div>
//           <p className="text-orange-100 max-w-2xl mx-auto">
//             Browse and read our complete collection of digital newspaper editions.
//           </p>
//         </div>
//       </div>

//       <div className="max-w-6xl mx-auto px-4 py-8">
//         {loading ? (
//           <div className="flex justify-center items-center h-64">
//             <LoadingSpinner />
//           </div>
//         ) : error ? (
//           <p className="text-center text-red-500">{error}</p>
//         ) : Object.keys(epapers).length === 0 ? (
//           <div className="text-center py-16">
//             <FileText className="h-16 w-16 mx-auto text-gray-300 mb-4" />
//             <p className="text-xl text-gray-500">
//               No e-papers available at the moment.
//             </p>
//           </div>
//         ) : (
//           Object.entries(epapers).map(([month, papers]) => (
//             <div key={month} className="mb-8">
//               <h2 className="text-2xl font-semibold text-orange-600 mb-4">
//                 {month}
//               </h2>
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {papers.map((epaper) => (
//                   <div key={epaper.id} className="group cursor-pointer">
//                     <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col">
//                       <div className="relative bg-gray-100 h-40 overflow-hidden flex justify-center items-center">
//                         <FileText className="h-16 w-16 text-orange-500" />
//                       </div>
//                       <div className="p-5 flex flex-col space-y-3">
//                         <h3 className="text-lg font-semibold text-gray-800">E-Paper Edition</h3>
//                         <div className="flex items-center text-gray-500">
//                           <Calendar className="h-4 w-4 mr-2" />
//                           <span className="text-sm">{formatDate(epaper.releaseDate)}</span>
//                         </div>
//                         <div className="flex space-x-3">
//                           <button
//                             className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition"
//                             onClick={() => setSelectedPdfUrl(epaper.pdfUrl)}
//                           >
//                             View
//                           </button>
//                           <a
//                             href={epaper.pdfUrl}
//                             download
//                             className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition flex items-center"
//                           >
//                             <Download className="h-4 w-4 mr-1" /> Download
//                           </a>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ))
//         )}
//       </div>

//       {selectedPdfUrl && (
//         <div className="max-w-6xl mx-auto px-4 py-8">
//           <Viewer fileUrl={selectedPdfUrl} plugins={[defaultLayoutPluginInstance]} />
//         </div>
//       )}
//     </div>
//   );
// };

// export default EpaperPage;
// "use client";

// import { useEffect, useState } from "react";
// import { Calendar, FileText, Newspaper, ChevronRight } from "lucide-react";
// import LoadingSpinner from "@/components/ui/LoadingSpinner";
// import { Worker, Viewer } from "@react-pdf-viewer/core";
// import "@react-pdf-viewer/core/lib/styles/index.css";
// import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
// import "@react-pdf-viewer/default-layout/lib/styles/index.css";
// import * as pdfjs from "pdfjs-dist/build/pdf";
// import "pdfjs-dist/build/pdf.worker.entry";

// pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;

// interface Epaper {
//   id: number;
//   pdfUrl: string;
//   releaseDate: string;
//   downloadable: boolean;
//   shareable: boolean;
//   printable: boolean;
// }

// const EpaperPage = () => {
//   const [epapers, setEpapers] = useState<Record<string, Epaper[]>>({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [selectedPdfUrl, setSelectedPdfUrl] = useState<string | null>(null);
  
//   const defaultLayoutPluginInstance = defaultLayoutPlugin();

//   useEffect(() => {
//     const fetchEpapers = async () => {
//       try {
//         const response = await fetch("/api/v1/epaper");
//         if (!response.ok) throw new Error("Failed to fetch e-papers.");

//         const { data } = await response.json();
//         const sortedAndGroupedEpapers = groupByMonth(data);
//         setEpapers(sortedAndGroupedEpapers);
//       } catch (err) {
//         console.error(err);
//         setError("Failed to load the e-papers.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     const interval = setInterval(() => fetchEpapers(), 2000);
//     return () => clearInterval(interval);
//   }, []);

//   const groupByMonth = (epapers: Epaper[]) => {
//     return epapers
//       .sort(
//         (a, b) =>
//           new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
//       )
//       .reduce((acc: Record<string, Epaper[]>, epaper) => {
//         const monthYear = new Date(epaper.releaseDate).toLocaleString("en-US", {
//           month: "long",
//           year: "numeric",
//         });

//         if (!acc[monthYear]) acc[monthYear] = [];
//         acc[monthYear].push(epaper);
//         return acc;
//       }, {});
//   };

//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-US", {
//       month: "short",
//       day: "2-digit",
//       year: "numeric",
//     });
//   };

//   return (
//     <div className="min-h-screen bg-white">
//       <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-10 px-6 text-center">
//         <div className="max-w-6xl mx-auto">
//           <div className="flex justify-center items-center mb-2">
//             <Newspaper className="h-8 w-8 mr-2" />
//             <h1 className="text-3xl md:text-4xl font-bold">E-Paper Archives</h1>
//           </div>
//           <p className="text-orange-100 max-w-2xl mx-auto">
//             Browse and read our complete collection of digital newspaper editions.
//           </p>
//         </div>
//       </div>

//       <div className="max-w-6xl mx-auto px-4 py-8">
//         {loading ? (
//           <div className="flex justify-center items-center h-64">
//             <LoadingSpinner />
//           </div>
//         ) : error ? (
//           <p className="text-center text-red-500">{error}</p>
//         ) : Object.keys(epapers).length === 0 ? (
//           <div className="text-center py-16">
//             <FileText className="h-16 w-16 mx-auto text-gray-300 mb-4" />
//             <p className="text-xl text-gray-500">
//               No e-papers available at the moment.
//             </p>
//           </div>
//         ) : (
//           Object.entries(epapers).map(([month, papers]) => (
//             <div key={month} className="mb-8">
//               <h2 className="text-2xl font-semibold text-orange-600 mb-4">
//                 {month}
//               </h2>
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {papers.map((epaper) => (
//                   <div key={epaper.id} className="group cursor-pointer">
//                     <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col">
//                       <div className="p-5 flex-grow flex flex-col justify-between">
//                         <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-orange-600 transition-colors">
//                           E-Paper Edition
//                         </h3>
//                         <div className="flex items-center text-gray-500 mb-4">
//                           <Calendar className="h-4 w-4 mr-2" />
//                           <span className="text-sm">
//                             {formatDate(epaper.releaseDate)}
//                           </span>
//                         </div>
//                         <div className="flex gap-4">
//                           <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => setSelectedPdfUrl(epaper.pdfUrl)}>View</button>
//                           <a className="bg-green-500 text-white px-4 py-2 rounded" href={epaper.pdfUrl} download>Download</a>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ))
//         )}
//       </div>

//       {selectedPdfUrl && <PdfViewer fileUrl={selectedPdfUrl} />}
//     </div>
//   );
// };

// const PdfViewer = ({ fileUrl }: { fileUrl: string }) => {
//   return (
//     <div className="w-full h-screen flex items-center justify-center">
//       <Viewer fileUrl={fileUrl} />
//     </div>
//   );
// };

// export default EpaperPage;

"use client";

import { useEffect, useState } from "react";
import { Calendar, FileText, Newspaper } from "lucide-react";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import * as pdfjs from "pdfjs-dist/build/pdf";
import "pdfjs-dist/build/pdf.worker.entry";

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;

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
  const [selectedPdfUrl, setSelectedPdfUrl] = useState<string | null>(null);
  


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

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-10 px-6 text-center">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center items-center mb-2">
            <Newspaper className="h-8 w-8 mr-2" />
            <h1 className="text-3xl md:text-4xl font-bold">E-Paper Archives</h1>
          </div>
          <p className="text-orange-100 max-w-2xl mx-auto">
            Browse and read our complete collection of digital newspaper editions.
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
                            { weekday: "long" }
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
                        <div className="flex gap-4">
                          <button className="bg-blue-500 text-white px-4 py-2 rounded"onClick={() => {
  setSelectedPdfUrl(epaper.pdfUrl);
  window.scrollTo({ top: document.body.scrollHeight / 3, behavior: "smooth" });
}}>View</button>
                          <a className="bg-green-500 text-white px-4 py-2 rounded" href={epaper.pdfUrl} download>Download</a>
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

      {selectedPdfUrl && <PdfViewer fileUrl={selectedPdfUrl} />}
    </div>
  );
};

const PdfViewer = ({ fileUrl }: { fileUrl: string }) => {
  return (
    <div className="w-full h-screen flex items-center justify-center ">
      <div className="w-full h-full max-w-[100vw] max-h-[100vh] overflow-scroll">
        <div className="scale-[1.2] sm:scale-100 origin-top">
          <Viewer fileUrl={fileUrl} />
        </div>
      </div>
    </div>
  );
};


export default EpaperPage;
