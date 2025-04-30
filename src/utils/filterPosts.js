export function filterPosts(posts, query, languageFilter, tagFilter) {
  const sorted = [...posts].sort(
    (a, b) => b.createdAt?.seconds - a.createdAt?.seconds
  );

  return sorted.filter((post) => {
    const matchesQuery =
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.content.toLowerCase().includes(query.toLowerCase());

    const matchesLanguage =
      languageFilter === "ALL" || post.language === languageFilter;

    const matchesTag = !tagFilter || post.tags.includes(tagFilter);

    return matchesQuery && matchesLanguage && matchesTag;
  });
}
