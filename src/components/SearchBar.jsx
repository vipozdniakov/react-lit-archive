import React from "react";

export function SearchBar({ query, onChange }) {
  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Поиск по заголовку или содержанию..."
        value={query}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border p-2 rounded"
      />
    </div>
  );
}
