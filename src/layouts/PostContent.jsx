// src/components/layouts/PostContent.jsx
import React from "react";

export function PostContent({ html, type = "prose" }) {
  const proseStyles =
    "prose font-lora text-textMain indent-paragraph whitespace-pre-wrap";

  const poetryStyles =
    "font-lora text-textMain text-center text-lg leading-relaxed whitespace-pre-line max-w-md mx-auto";

  const className = type === "poetry" ? poetryStyles : proseStyles;

  return (
    <div className={className} dangerouslySetInnerHTML={{ __html: html }} />
  );
}
