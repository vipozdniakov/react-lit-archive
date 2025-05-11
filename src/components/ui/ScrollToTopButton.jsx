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
    <button
      onClick={scrollToTop}
      title="Наверх"
      className="fixed bottom-6 right-6 z-40 p-3 rounded-full shadow-md bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 transition-all"
    >
      ↑
    </button>
  ) : null;
}
