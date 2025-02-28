"use client";
import React, { useState } from "react";

const CategoryForm = () => {
  const [categoryName, setCategoryName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch("/api/v1/category/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: categoryName }),
      });
      setCategoryName("");
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 flex">
      <input
        type="text"
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
        placeholder="Enter category name"
        className="border p-2 w-full"
      />
      <button type="submit" className="bg-green-500 text-white px-4 ml-2">
        Add Category
      </button>
    </form>
  );
};

export default CategoryForm;
