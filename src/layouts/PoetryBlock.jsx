// src/components/layouts/PoetryBlock.jsx
import React from "react";

export function PoetryBlock({ html }) {
  return (
    <div className="max-w-md mx-auto bg-white/90 rounded-xl border border-gray-200 p-6 shadow-inner">
      <div
        className="whitespace-pre-line font-lora text-lg leading-relaxed text-center"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
