import React from "react";

export default function PageContainer({ children, className = "" }) {
  return <div className={`max-w-3xl mx-auto p-4 ${className}`}>{children}</div>;
}
