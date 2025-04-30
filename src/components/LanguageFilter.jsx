// src/components/LanguageFilter.jsx
import React from "react";

export function LanguageFilter({ value, onChange }) {
  return (
    <div className="mb-4">
      <label className="text-textMain">
        Фильтр по языку:&nbsp;
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="border rounded p-1"
        >
          <option value="ALL">Все</option>
          <option value="RU">Русский</option>
          <option value="BY">Беларуская</option>
          <option value="PL">Polski</option>
        </select>
      </label>
    </div>
  );
}
