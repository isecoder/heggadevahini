"use client";

import React, { useState, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";

interface User {
  name: string;
  email: string;
}

const AdminLayout = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading] = useState(true);
  const [message, setMessage] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       console.log("API_BASE_URL", API_BASE_URL);
  //       const response = await fetch(`${API_BASE_URL}/api/auth`);
  //       if (!response.ok) throw new Error("Failed to fetch user data");

  //       const data = await response.json();
  //       setUser(data);
  //     } catch (error) {
  //       console.error("Error fetching user:", error);
  //       setUser(null);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchUser();
  // }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch(`/api/v1/auth/logout`, {
        method: "POST",
      });

      if (!response.ok) throw new Error("Logout failed");

      // Clear session storage and reset user state
      sessionStorage.removeItem("adminToken");
      setUser(null);

      const data = await response.json();
      setMessage(data.message);

      router.push("/about/protected/routes/heggade-vahini/admin-portal/login");
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "An unexpected error occurred."
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-300  p-6">
      <h1 className="text-green-700 text-3xl font-bold text-center">
        Admin Panel
      </h1>

      {loading ? (
        <p className="text-center mt-2">Loading user...</p>
      ) : user ? (
        <p className="text-center mt-2">
          Logged in as:{" "}
          <span className="font-bold text-green-700">{user.name}</span>
        </p>
      ) : (
        <p className="text-center mt-2 text-red-500">Not logged in</p>
      )}

      <div className="flex justify-between mt-4">
        {pathname !== "/admin/dashboard" && (
          <button
            onClick={() => router.back()}
            className="bg-gray-200 px-4 py-2 rounded-lg shadow"
          >
            Back
          </button>
        )}
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg shadow"
        >
          Logout
        </button>
      </div>

      {message && <p className="text-center text-red-500 mt-2">{message}</p>}

      <div className="mt-6">{children}</div>
    </div>
  );
};

export default AdminLayout;
