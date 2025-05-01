// src/utils/tagStyleHelpers.js
import tagColors from "./tagColors";

export const getTagButtonClass = (language, isActive) => {
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
