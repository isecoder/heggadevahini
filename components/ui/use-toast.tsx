"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ToastContextType {
  toast: (message: { title: string; description?: string }) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<
    { id: number; title: string; description?: string }[]
  >([]);

  const toast = (message: { title: string; description?: string }) => {
    const id = Date.now();
    setToasts((prevToasts) => [...prevToasts, { id, ...message }]);

    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    }, 3000); // Auto-dismiss after 3 seconds
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      {/* Toast Notifications */}
      <div className="fixed top-5 right-5 z-50 space-y-2">
        <AnimatePresence>
          {toasts.map(({ id, title, description }) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-gray-900 text-white px-4 py-3 rounded-lg shadow-lg w-80"
            >
              <strong className="block">{title}</strong>
              {description && (
                <p className="text-sm text-gray-300">{description}</p>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
