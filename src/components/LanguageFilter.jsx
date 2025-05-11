// src/components/LanguageFilter.jsx
import React from "react";

const LANG_STYLES = {
  ALL: {
    active: "bg-gray-400 text-white border-gray-400",
    inactive: "text-gray-700 border-gray-300 bg-transparent",
  },
  RU: {
    active: "bg-blue-400 text-white border-blue-400",
    inactive: "text-blue-700 border-blue-400 bg-transparent",
  },
  BY: {
    active: "bg-emerald-400 text-white border-emerald-400",
    inactive: "text-emerald-700 border-emerald-400 bg-transparent",
  },
  PL: {
    active: "bg-red-400 text-white border-red-400",
    inactive: "text-red-700 border-red-400 bg-transparent",
  },
};

export function LanguageFilter({ value, onChange }) {
  const languages = [
    { code: "ALL", label: "Все" },
    { code: "RU", label: "RU" },
    { code: "BY", label: "BY" },
    { code: "PL", label: "PL" },
  ];

  return (
    <div className="flex items-center flex-wrap gap-2 px-4 py-2 mb-6 rounded-md border border-gray-200 bg-gray-50 text-sm font-medium">
      <span className="text-textMain">Язык публикаций:</span>

      {languages.map(({ code, label }) => {
        const isActive = value === code;
        const style = isActive
          ? LANG_STYLES[code].active
          : LANG_STYLES[code].inactive;

        return (
          <button
            key={code}
            onClick={() => onChange(code)}
            className={`text-xs font-medium px-3 py-1 rounded-md border transition ${style}`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
