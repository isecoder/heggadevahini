"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const API_BASE_URL = "/api/v1"; // Using the proxy path

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = sessionStorage.getItem("adminToken");
    if (token) {
      router.push("/about/protected/routes/heggade-vahini/admin-portal/admind");
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include", // This ensures cookies are sent along with the request
      });

      const data = await response.json();

      if (response.ok) {
        // Access token is stored in sessionStorage
        sessionStorage.setItem("adminToken", data.data?.accessToken || "");

        // Cookie management: `refreshToken` is handled by the browser automatically
        // if it's set by the backend with `HttpOnly` flag.
alert("login successful")
        router.push(
          "/about/protected/routes/heggade-vahini/admin-portal/admind"
        );
      } else {
        setError(data.message || "Invalid email or password.");
      }
    } catch (error) {
      console.error("Login Error:", error);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Admin Login
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Access the news management panel
        </p>

        {error && (
          <p
            className="text-red-500 text-sm text-center mb-4"
            aria-live="polite"
          >
            {error}
          </p>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-[#F48634] focus:outline-none"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-[#F48634] focus:outline-none"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#F48634] text-white font-medium py-2 rounded-lg flex items-center justify-center hover:bg-[#d9752d] transition"
            disabled={loading}
          >
            {loading ? <Loader2 className="animate-spin w-5 h-5" /> : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
