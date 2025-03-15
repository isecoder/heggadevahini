import React, { useState, useCallback } from "react";
import NewsForm from "./NewsForm";

const AddNewsButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = useCallback(() => setIsModalOpen(false), []);

  return (
    <>
      <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => setIsModalOpen(true)}>
        Add News
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-all duration-300">
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg z-50 transition-all duration-300">
            <h2 className="text-xl font-semibold mb-4">Add News</h2>
            <NewsForm onClose={closeModal} />
          </div>
        </div>
      )}
    </>
  );
};

export default AddNewsButton;
