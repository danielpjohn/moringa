// Create a new file: components/Toast.tsx
import React, { createContext, useContext, useState } from "react";

type ToastType = {
  message: string;
  type: "success" | "error" | "info";
  visible: boolean;
};

type ToastContextType = {
  showToast: (message: string, type?: "success" | "error" | "info") => void;
};

const ToastContext = createContext<ToastContextType>({
  showToast: () => {},
});

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toast, setToast] = useState<ToastType>({
    message: "",
    type: "success",
    visible: false,
  });

  const showToast = (message: string, type: "success" | "error" | "info" = "success") => {
    setToast({ message, type, visible: true });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast.visible && (
        <div
          className={`fixed bottom-4 right-4 z-50 p-4 rounded-lg shadow-lg text-white ${
            toast.type === "success"
              ? "bg-green-500"
              : toast.type === "error"
              ? "bg-red-500"
              : "bg-blue-500"
          } transition-all duration-300 ${
            toast.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          }`}
        >
          {toast.message}
        </div>
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);