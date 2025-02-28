"use client";

import { useState } from "react";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast"; // Import the useToast hook
import type React from "react";

export default function Subscribe() {
  const [email, setEmail] = useState("");
  const { toast } = useToast(); // Use the useToast hook to access the toast function

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Thanks for subscribing!",
      description: "Stay tuned for updates in your inbox.",
    });
    setEmail("");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-6xl bg-gradient-to-r from-white via-orange-50 to-orange-200 rounded-3xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 p-6 sm:p-8 lg:p-12">
          {/* Content Section */}
          <div className="flex flex-col justify-center space-y-4 lg:space-y-6 w-full lg:w-1/2 text-center lg:text-left">
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
                Subscribe to <span className="text-orange-500">*</span>
              </h1>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">
                — Our Newsletter
              </h2>
            </div>
            <p className="text-gray-600 text-base sm:text-lg max-w-md mx-auto lg:mx-0">
              Get weekly updates about our product in your inbox. No spam
              guaranteed, we promise ✌
            </p>
          </div>

          {/* Form Section */}
          <div className="w-full lg:w-1/2">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full max-w-xl mx-auto p-2 sm:p-3 bg-white rounded-3xl shadow-md transition-all duration-300 hover:shadow-lg"
            >
              <div className="flex items-center gap-2 flex-1">
                <div className="hidden sm:flex items-center justify-center w-10 h-10">
                  <Mail className="h-5 w-5 text-gray-500" />
                </div>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="youremail123@gmail.com"
                  className="flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-base"
                  required
                />
              </div>
              <Button
                type="submit"
                className="bg-gray-900 hover:bg-gray-800 text-white font-semibold px-8 py-3 rounded-2xl transition-colors duration-200"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
