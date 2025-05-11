// src/components/layouts/PageContainer.jsx
import React from "react";

const sizeClasses = {
  sm: "max-w-xl",
  md: "max-w-3xl",
  lg: "max-w-5xl",
  full: "max-w-full",
};

export function PageContainer({
  children,
  size = "md", // по умолчанию — средний
  className = "",
}) {
  const widthClass = sizeClasses[size] || sizeClasses.md;

  return (
    <div className={`px-4 py-6 sm:px-6 md:px-8 lg:px-10 ${className}`}>
      <div className={`mx-auto w-full ${widthClass}`}>{children}</div>
    </div>
  );
}
