// src/components/TagDisplay.jsx
import React, { useMemo } from "react";
import { calculateOpacity } from "../utils/calculateOpacity";
import { getTagButtonClass } from "../utils/tagStyleHelpers";

export function TagDisplay({
  tags,
  language,
  tagStats,
  onTagClick,
  activeTags = [],
}) {
  const tagElements = useMemo(() => {
    const totalPostsForLang = tagStats.languagePostCounts[language] || 1;
    const tagUsage = tagStats.tagUsageByLanguage[language] || {};

    return tags.map((tag) => {
      const tagCount = tagUsage[tag] || 1;
      const isActive = activeTags.includes(tag);
      const opacity = isActive
        ? 1
        : calculateOpacity(tagCount, totalPostsForLang);
      const className = `px-2 py-1 rounded-full text-sm whitespace-nowrap transition duration-200 ${getTagButtonClass(
        language,
        isActive
      )}`;

      return (
        <button
          key={tag}
          onClick={() => onTagClick?.(tag)}
          className={className}
          style={{ opacity }}
        >
          <span>#{tag}</span>
          {isActive ? (
            <span className="text-xs opacity-60 ml-1">×</span>
          ) : (
            <span className="text-xs opacity-0 ml-1 select-none">×</span>
          )}
        </button>
      );
    });
  }, [tags, language, tagStats, onTagClick, activeTags]);

  return (
    <div className="flex flex-wrap gap-2 mt-6 justify-center">
      {tagElements}
    </div>
  );
}
