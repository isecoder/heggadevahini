"use client";
import React, { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import CategoryForm from "@/components/admin/CategoryForm";

type Category = {
  id: string; // Or `number` depending on your API response
  name: string;
};

const Category = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetch(`/api/v1/category/`)
      .then((res) => res.json())
      .then((data) => setCategories(Array.isArray(data) ? data : []))
      .catch((err) => console.error("Error fetching categories:", err));
  }, []); // Add API_BASE_URL as a dependency

  return (
    <AdminLayout>
      <h2 className="text-center text-xl font-bold mt-6">Manage Categories</h2>
      <CategoryForm />
      <ul className="mt-4">
        {categories.map((item) => (
          <li key={item.id} className="p-4 bg-white shadow-md rounded-md mt-2">
            {item.name}
          </li>
        ))}
      </ul>
    </AdminLayout>
  );
};

export default Category;
