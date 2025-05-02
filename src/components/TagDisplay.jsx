// src/components/TagDisplay.jsx
import React, { useMemo } from "react";
import { getTagButtonClass } from "../utils/tagStyleHelpers";

const BASE_OPACITY = 0.4;

// Compute dynamic tag opacity
const calculateOpacity = (tagCount, totalPosts) => {
  const proportion = tagCount / totalPosts;
  return BASE_OPACITY + proportion * (1 - BASE_OPACITY);
};

export function TagDisplay({
  tags,
  language,
  tagStats,
  onTagClick,
  activeTags = [], // default to an empty array
}) {
  const tagElements = useMemo(() => {
    const totalPostsForLang = tagStats.languagePostCounts[language] || 1;
    const tagUsage = tagStats.tagUsageByLanguage[language] || {};

    const sortedTags = [...tags].sort((a, b) => {
      const countA = tagUsage[a] || 0;
      const countB = tagUsage[b] || 0;
      return countB - countA;
    });

    return sortedTags.map((tag) => {
      const tagCount = tagUsage[tag] || 1;
      const opacity = calculateOpacity(tagCount, totalPostsForLang);
      const isActive = activeTags.includes(tag); // Check if the tag is active
      const className = `px-2 py-1 rounded-full text-sm whitespace-nowrap transition duration-200 ${getTagButtonClass(
        language,
        isActive
      )}`;

      return onTagClick ? (
        <button
          key={tag}
          onClick={() => onTagClick(tag)}
          className={className}
          style={{ opacity }}
        >
          #{tag}
        </button>
      ) : (
        <span key={tag} className={className} style={{ opacity }}>
          #{tag}
        </span>
      );
    });
  }, [tags, language, tagStats, onTagClick, activeTags]);

  return <div className="flex flex-wrap gap-2 mt-6">{tagElements}</div>;
}
