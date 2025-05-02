export function filterPosts(posts, query, languageFilter, tagFilters) {
  if (!Array.isArray(tagFilters)) {
    tagFilters = [];
  }

  const sorted = [...posts].sort(
    (a, b) => b.createdAt?.seconds - a.createdAt?.seconds
  );

  return sorted.filter((post) => {
    const matchesQuery =
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.content.toLowerCase().includes(query.toLowerCase());

    const matchesLanguage =
      languageFilter === "ALL" || post.language === languageFilter;

    const matchesTags =
      tagFilters.length === 0 ||
      tagFilters.every((tag) => post.tags.includes(tag));

    return matchesQuery && matchesLanguage && matchesTags;
  });
}
