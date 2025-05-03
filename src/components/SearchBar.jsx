// src/components/SearchBar.jsx
import React from "react";

export function SearchBar({ query, onChange }) {
  return (
    <div className="mb-4">
      <label className="block text-textMain mb-1">Поиск публикаций</label>
      <input
        type="text"
        placeholder="Введите заголовок или фрагмент текста…"
        value={query}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm shadow-sm focus:border-buttonPrimary focus:outline-none focus:ring-1 focus:ring-buttonPrimary transition"
      />
    </div>
  );
}
