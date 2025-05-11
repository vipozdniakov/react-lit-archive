// src/components/ui/ScrollToTopButton.jsx
import React, { useEffect, useState } from "react";

export function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisible = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisible);
    return () => window.removeEventListener("scroll", toggleVisible);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return visible ? (
    <div className="fixed bottom-6 md:bottom-6 inset-x-0 z-40 flex justify-center pointer-events-none">
      <div className="w-full max-w-3xl px-4 flex justify-end pointer-events-auto">
        <button
          onClick={scrollToTop}
          title="Наверх"
          className="p-3 rounded-full shadow-md bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
        >
          ↑
        </button>
      </div>
    </div>
  ) : null;
}
