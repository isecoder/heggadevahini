import { useState } from "react";

const NewsForm = ({ onClose, onSubmit = () => window.location.reload() }: { onClose: () => void; onSubmit?: () => void }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  
  const [published, setPublished] = useState(false);
  const [loading, setLoading] = useState(false);
 
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!title.trim() || !content.trim()) {
      alert("Title and content cannot be empty.");
      setLoading(false);
      return;
    }

    try {
    

      const adminToken = sessionStorage.getItem("adminToken");
      if (!adminToken) {
        alert("Admin authentication required.");
        setLoading(false);
        return;
      }

      const response = await fetch("/api/v1/news", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({ title, content, published }),
      });
      

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to add news");

      setNewsId(data.id); // Store the news ID for image upload
     
     alert("News added successfully");
      onSubmit();
      onClose();
    } catch (error) {
      console.error("Error adding news:", error);
      alert("Failed to add news. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Title"
        className="w-full p-2 border rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <textarea
        placeholder="Content"
        className="w-full p-2 border rounded"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />

    

      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={published}
          onChange={() => setPublished(!published)}
          className="w-4 h-4"
        />
        <span>Publish</span>
      </label>

      <div className="flex justify-end space-x-2">
        <button type="button" className="px-4 py-2 bg-gray-300 rounded" onClick={onClose}>
          Cancel
        </button>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </div>

      
    </form>
  );
};

export default NewsForm;