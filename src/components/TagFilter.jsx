import React from "react";
import { getTagButtonClass } from "../utils/tagStyleHelpers";

export function TagFilter({
  allTags,
  tagFilters,
  setTagFilters,
  languageFilter,
}) {
  const toggleTag = (tag) => {
    setTagFilters((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="mb-6">
      <strong className="block mb-2 text-textMain">Теги:</strong>
      {languageFilter !== "ALL" && (
        <p className="text-sm text-textSecondary mb-2">
          Показаны теги для языка:{" "}
          <strong>
            {languageFilter === "RU"
              ? "русский"
              : languageFilter === "PL"
              ? "польский"
              : "белорусский"}
          </strong>
        </p>
      )}

      <div className="flex flex-wrap gap-2 max-w-full">
        {allTags.map(({ name, language }) => {
          const isActive = tagFilters.includes(name);
          const className = `px-2 py-1 rounded-full text-sm shrink-0 transition-colors duration-200 ${getTagButtonClass(
            language,
            isActive
          )}`;

          return (
            <button
              key={name}
              onClick={() => toggleTag(name)}
              className={className}
              style={{
                maxWidth: "100%",
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "flex",
                alignItems: "center",
                gap: "0.25rem",
              }}
            >
              <span>#{name}</span>
              {isActive && <span className="text-xs opacity-60 ml-1">×</span>}
            </button>
          );
        })}
      </div>

      {tagFilters.length > 0 && (
        <button
          onClick={() => setTagFilters([])}
          className="text-alertError mt-2 inline-block text-sm hover:text-alertErrorHover"
        >
          ✕ Сбросить теги
        </button>
      )}
    </div>
  );
}
