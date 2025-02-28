"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "@/components/admin/AdminLayout";

const CountAnimation = ({ count }: { count: number }) => {
  const [displayCount, setDisplayCount] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);

    let start = 0;
    const duration = 1000;
    const incrementTime = duration / Math.max(count, 1);

    timerRef.current = setInterval(() => {
      if (start < count) {
        start++;
        setDisplayCount(start);
      } else {
        if (timerRef.current) clearInterval(timerRef.current);
      }
    }, incrementTime);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [count]);

  return <div className="font-bold text-3xl mb-2">{displayCount}</div>;
};

const Dashboard = () => {
  const router = useRouter();
  const [stats, setStats] = useState([
    {
      count: 0,
      label: "News",
      api: "/api/v1/news/",
      color: "bg-red-500",
      path: "/about/protected/routes/heggade-vahini/admin-portal/admind/news",
      countable: true,
    },
    {
      count: 0,
      label: "E-Paper",
      api: "/api/v1/epaper/",
      color: "bg-blue-500",
      path: "/about/protected/routes/heggade-vahini/admin-portal/admind/epaper",
      countable: true,
    },
    {
      count: 0,
      label: "Manage Category",
      api: "/api/v1/category/",
      color: "bg-green-500",
      path: "/about/protected/routes/heggade-vahini/admin-portal/admind/category",
      countable: false,
    },
    {
      count: 0,
      label: "Videos",
      api: "/api/v1/videos/",
      color: "bg-yellow-500",
      path: "/about/protected/routes/heggade-vahini/admin-portal/admind/videos",
      countable: false,
    },
  ]);
  const [loading, setLoading] = useState(true);

  // Using useRef to hold the previous stats state to prevent the dependency warning
  const statsRef = useRef(stats);

  useEffect(() => {
    const fetchCounts = async () => {
      setLoading(true);
      try {
        const updatedStats = [...statsRef.current]; // Use the current value of statsRef
        for (let i = 0; i < updatedStats.length; i++) {
          const item = updatedStats[i];
          if (!item.countable) continue;

          const response = await fetch(item.api);
          if (!response.ok) throw new Error(`Failed to fetch ${item.label}`);

          const result = await response.json();
          console.log(`API response for ${item.label}:`, result);

          updatedStats[i] = {
            ...item,
            count:
              result.success && Array.isArray(result.data)
                ? result.data.length
                : 0,
          };
        }

        setStats(updatedStats); // Set the updated stats to the state
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
  }, []); // Empty dependency array, no warning

  return (
    <AdminLayout>
      <h2 className="text-center text-xl font-bold text-green-700 mt-6">
        Heggade Vahini Admin Dashboard
      </h2>
      {loading ? (
        <div className="flex justify-center items-center mt-6">
          <p className="text-lg">Loading counts...</p>
          <div className="ml-2 animate-spin h-5 w-5 border-4 border-blue-500 border-t-transparent rounded-full"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-6 px-4">
          {stats.map((item, index) => (
            <div
              key={index}
              className={`p-6 text-white rounded-lg shadow-md text-center ${item.color} cursor-pointer hover:opacity-90`}
              onClick={() => router.push(item.path)}
            >
              {item.countable && <CountAnimation count={item.count} />}
              <p className="text-lg">{item.label}</p>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
};

export default Dashboard;
