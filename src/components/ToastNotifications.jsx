// src/components/ToastNotifications.jsx

import React from "react";

// Toast notification component
export function ToastNotifications({ toast }) {
  if (!toast.message) return null; // Don't render if no message

  const bgClass =
    toast.type === "success"
      ? "bg-green-500 text-white"
      : toast.type === "error"
      ? "bg-red-500 text-white"
      : "bg-yellow-400 text-black";

  return (
    <div
      className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded shadow-lg animate-fade-in ${bgClass}`}
    >
      {toast.message}
    </div>
  );
}
