// src/hooks/useTagStats.js
import { useCallback, useMemo } from "react";

export function useTagStats(posts) {
  const languagePostCounts = {};
  const tagUsageByLanguage = {};

  posts.forEach(({ language, tags }) => {
    languagePostCounts[language] = (languagePostCounts[language] || 0) + 1;
    tags.forEach((tag) => {
      tagUsageByLanguage[language] ||= {};
      tagUsageByLanguage[language][tag] =
        (tagUsageByLanguage[language][tag] || 0) + 1;
    });
  });

  const getSortedTags = useCallback(
    (tags, language) => {
      const usage = tagUsageByLanguage[language] || {};
      return [...tags].sort((a, b) => (usage[b] || 0) - (usage[a] || 0));
    },
    [tagUsageByLanguage] // critical!
  );

  return {
    languagePostCounts,
    tagUsageByLanguage,
    getSortedTags,
  };
}
