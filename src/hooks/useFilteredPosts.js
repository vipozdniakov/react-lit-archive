// src/hooks/useFilteredPosts.js
import { useMemo } from "react";
import { filterPosts } from "../utils/filterPosts";
import { useTagStats } from "./useTagStats";

export function useFilteredPosts(posts, query, languageFilter, tagFilters) {
  const { getSortedTags, languagePostCounts, tagUsageByLanguage } =
    useTagStats(posts);

  const filteredEnhancedPosts = useMemo(() => {
    const filtered = filterPosts(posts, query, languageFilter, tagFilters);
    return filtered.map((post) => ({
      ...post,
      sortedTags: getSortedTags(post.tags, post.language),
    }));
  }, [posts, query, languageFilter, tagFilters, getSortedTags]);

  return {
    filteredEnhancedPosts,
    languagePostCounts,
    tagUsageByLanguage,
  };
}
