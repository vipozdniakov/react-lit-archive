// src/components/LanguageFilter.jsx
import React from "react";

export function LanguageFilter({ value, onChange }) {
  return (
    <div className="mb-4">
      <label className="block text-textMain mb-1">Язык публикаций</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="block w-full max-w-xs rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-buttonPrimary focus:outline-none focus:ring-1 focus:ring-buttonPrimary transition"
      >
        <option value="ALL">Все</option>
        <option value="RU">Русский</option>
        <option value="BY">Белорусский</option>
        <option value="PL">Польский</option>
      </select>
    </div>
  );
}
