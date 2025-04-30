// src/components/TagDisplay.jsx
import React, { useMemo } from "react";
import tagColors from "../utils/tagColors";

const BASE_OPACITY = 0.4;

// Compute dynamic tag opacity
const calculateOpacity = (tagCount, totalPosts) => {
  const proportion = tagCount / totalPosts;
  return BASE_OPACITY + proportion * (1 - BASE_OPACITY);
};

export function TagDisplay({ tags, language, tagStats }) {
  const tagElements = useMemo(() => {
    const totalPostsForLang = tagStats.languagePostCounts[language] || 1;
    const tagUsage = tagStats.tagUsageByLanguage[language] || {};

    // Sort tags by frequency (descending)
    const sortedTags = [...tags].sort((a, b) => {
      const countA = tagUsage[a] || 0;
      const countB = tagUsage[b] || 0;
      return countB - countA;
    });

    return sortedTags.map((tag) => {
      const tagCount = tagUsage[tag] || 1;
      const opacity = calculateOpacity(tagCount, totalPostsForLang);
      const color = tagColors[language];

      return (
        <span
          key={tag}
          className={`${color} text-sm text-gray-800 bg-gray-100 px-2 py-1 rounded-full whitespace-nowrap`}
          style={{ opacity }}
        >
          #{tag}
        </span>
      );
    });
  }, [tags, language, tagStats]);
  return <div className="flex flex-wrap gap-2 mt-6">{tagElements}</div>;
}
