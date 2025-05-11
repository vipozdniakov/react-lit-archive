import React from "react";

import { useLocation, useNavigate } from "react-router-dom";

export function Header({ isScrolled }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogoClick = () => {
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 backdrop-blur-md ${
        isScrolled
          ? "bg-header/80 border-b shadow-md border-gray-300"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-2xl mx-auto flex items-center p-2">
        <button onClick={handleLogoClick} className="focus:outline-none">
          <img
            src="/logo.png"
            alt="My Literature Archive — powered by Vitali Pazdniakou"
            className={`transition-all duration-500 transform hover:-translate-y-1 ${
              isScrolled ? "w-40" : "w-80"
            }`}
          />
        </button>
      </div>
    </header>
  );
}
