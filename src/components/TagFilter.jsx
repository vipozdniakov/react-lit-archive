import React from "react";
import tagColors from "../utils/tagColors";

// Helper to decide styles based on language and active state
const getTagButtonClass = (language, isActive) => {
  const baseColor = tagColors[language] || "bg-gray-100 text-gray-800";

  if (isActive) {
    const borderColors = {
      RU: "border-blue-600",
      BY: "border-emerald-600",
      PL: "border-red-600",
    };
    return `bg-white border-l-4 ${
      borderColors[language] || "border-gray-500"
    } text-gray-900 shadow-sm`;
  }

  return `${baseColor} hover:bg-gray-200`;
};

export function TagFilter({ allTags, tagFilter, setTagFilter }) {
  return (
    <div className="mb-6">
      <strong className="block mb-2 text-textMain">Теги:</strong>
      <div className="flex flex-wrap gap-2 max-w-full">
        {allTags.map(({ name, language }) => {
          const isActive = tagFilter === name;
          const className = `px-2 py-1 rounded-full text-sm shrink-0 transition-colors duration-200 ${getTagButtonClass(
            language,
            isActive
          )}`;

          return (
            <button
              key={name}
              onClick={() => setTagFilter(isActive ? "" : name)}
              className={className}
              style={{
                maxWidth: "100%",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              #{name}
            </button>
          );
        })}
      </div>

      {tagFilter && (
        <button
          onClick={() => setTagFilter("")}
          className="text-alertError mt-2 inline-block text-sm hover:text-alertErrorHover"
        >
          ✕ Сбросить тег
        </button>
      )}
    </div>
  );
}
