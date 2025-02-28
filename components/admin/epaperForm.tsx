"use client";
import React, { useState } from "react";

const months = [
  "January", "February", "March", "April", "May", "June", 
  "July", "August", "September", "October", "November", "December"
];

const EpaperForm = () => {
  const [title, setTitle] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedMonth) {
      alert("Please select a month.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/v1/epaper/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          month: selectedMonth,
          link,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage("E-Paper uploaded successfully!");
        setTitle("");
        setSelectedMonth("");
        setLink("");
      } else {
        setMessage(result.error || "Failed to upload E-Paper.");
      }
    } catch (error) {
      console.error("Error uploading E-Paper:", error);
      setMessage("An error occurred while uploading.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 flex flex-col items-center space-y-4 w-3/5 max-w-lg mx-auto">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter E-Paper title"
        className="border w-3/5 p-2"
      />

      <select
        value={selectedMonth}
        onChange={(e) => setSelectedMonth(e.target.value)}
        className="border w-3/5 p-2"
      >
        <option value="">Select Month</option>
        {months.map((month) => (
          <option key={month} value={month}>{month}</option>
        ))}
      </select>

      <input
        type="url"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        placeholder="Enter E-Paper link"
        className="border w-3/5 p-2"
      />

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Uploading..." : "Upload E-Paper"}
      </button>

      {message && <p className="text-sm text-gray-700">{message}</p>}
    </form>
  );
};

export default EpaperForm;
