"use client";

import React, { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Calendar, FileText, ChevronRight } from "lucide-react";
import Swal from "sweetalert2"; // Import Swal

interface Epaper {
  id: number;
  pdfUrl: string;
  releaseDate: string;
  downloadable: boolean;
  shareable: boolean;
  printable: boolean;
}

const Epaper = () => {
  const [epapers, setEpapers] = useState<Epaper[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false); // Track uploading state
  const [uploadProgress, setUploadProgress] = useState<number | null>(null); // Track upload progress

  // Custom fetch with timeout
  const fetchWithTimeout = (
    url: string,
    options: RequestInit,
    timeout: number
  ) => {
    return Promise.race([
      fetch(url, options), // The fetch request
      new Promise<Response>((_, reject) =>
        setTimeout(() => reject(new Error("Request timed out")), timeout)
      ), // Timeout after 'timeout' ms
    ]);
  };

  // Fetch e-papers on component mount
  useEffect(() => {
    const fetchEpapers = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/v1/epaper");
        if (!response.ok) throw new Error("Failed to fetch e-papers.");

        const { data } = await response.json();
        setEpapers(data);
      } catch (err) {
        console.error(err); // Logging the error
        setError("Failed to load the e-papers.");
      } finally {
        setLoading(false);
      }
    };

    fetchEpapers();
  }, []);

  // Handle delete e-paper
  const handleDelete = async (id: number) => {
    const token = sessionStorage.getItem("adminToken");
    if (!token) {
      setError("No token found for authorization.");
      return;
    }

    try {
      const response = await fetch(`/api/v1/epaper/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      alert("E-paper deleted successfully.");
      if (!response.ok) throw new Error("Failed to delete e-paper.");
      setEpapers((prev) => prev.filter((epaper) => epaper.id !== id));
    } catch (err) {
      console.error(err); // Logging the error
      setError("Error deleting e-paper.");
      alert("Failed to delete e-paper.");
    }
  };

  // Handle file input change
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  // Handle file upload
  // Handle file upload
  const handleUpload = async () => {
    const token = sessionStorage.getItem("adminToken");
    if (!token) {
      setError("No token found for authorization.");
      return;
    }

    if (!file) {
      setError("No file selected.");
      return;
    }

    setUploading(true); // Start the upload process
    setUploadProgress(0); // Reset progress

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetchWithTimeout(
        "/api/v1/epaper",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        },
        180000
      ); // Timeout set to 3 minutes (180,000 ms)

      console.log(response);

      if (response.ok) throw new Error("Failed to upload e-paper.");

      const { data } = await response.json();
      // Show success message
      Swal.fire({
        title: "Success!",
        text: "E-paper uploaded successfully!",
        icon: "success",
        confirmButtonText: "Okay",
      });

      // Add the new e-paper to the list and refresh the list
      setEpapers((prev) => [...prev, data]);
      setUploading(false); // Upload done
      setUploadProgress(null); // Reset progress
    } catch (err: unknown) {
      // Explicitly typing `err` as `unknown`
      console.error(err); // Logging the error

      if (err instanceof Error) {
        // Check if it's an instance of Error
        // Show error message
        Swal.fire({
          title: "Error",
          text:
            err.message === "Request timed out"
              ? "The request took too long to complete. Please try again."
              : "Error uploading e-paper.",
          icon: "error",
          confirmButtonText: "Try Again",
        });
      } else {
        // Handle unknown errors
        Swal.fire({
          title: "Error",
          text: "An unexpected error occurred.",
          icon: "error",
          confirmButtonText: "Try Again",
        });
      }

      setUploading(false); // Upload failed
      setUploadProgress(null); // Reset progress
    }
  };

  // Format date string to a readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  };

  // Handle download of the e-paper
  const handleDownload = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <AdminLayout>
      <h2 className="text-center text-xl font-bold mt-6">Manage E-Papers</h2>

      {/* File Upload Section */}
      <div className="mt-6 mb-4 text-center">
        <input
          type="file"
          onChange={handleFileChange}
          className="p-2 border rounded-md"
        />
        <button
          onClick={handleUpload}
          className="ml-4 bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600"
          disabled={uploading} // Disable button during upload
        >
          {uploading ? "Uploading..." : "Upload E-Paper"}
        </button>
      </div>

      {/* Loading or Error Handling */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-12 w-12 rounded-full bg-orange-200 mb-4"></div>
            <div className="h-4 w-48 bg-gray-200 rounded"></div>
          </div>
        </div>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {epapers.map((epaper) => (
            <li
              key={epaper.id}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
            >
              {/* E-paper Preview */}
              <div
                className="relative bg-gray-100 h-40 overflow-hidden cursor-pointer"
                onClick={() => handleDownload(epaper.pdfUrl)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-orange-600/30"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <FileText className="h-16 w-16 text-orange-500" />
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{`E-Paper Edition`}</h3>
                  <div className="flex items-center text-gray-500 mb-4">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span className="text-sm">
                      {formatDate(epaper.releaseDate)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center text-orange-500 font-medium mt-2 group-hover:translate-x-1 transition-transform">
                  <span>Download Now</span>
                  <ChevronRight className="h-4 w-4 ml-1" />
                </div>

                {/* Delete Button */}
                <button
                  onClick={() => handleDelete(epaper.id)}
                  className="mt-4 bg-red-500 text-white py-2 px-4 rounded-full hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Uploading Progress */}
      {uploading && uploadProgress !== null && (
        <div className="mt-4 text-center">
          <div className="text-lg font-medium text-gray-700">
            Compressing...
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div
              className="bg-blue-600 h-2 rounded-full"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default Epaper;
