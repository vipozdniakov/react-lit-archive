// Extract all unique tags

export function getAllTags(posts) {
  const tagMap = new Map();

  posts.forEach((post) => {
    const { language, tags } = post;

    tags.forEach((tag) => {
      const key = `${tag}-${language}`;
      const existingTag = tagMap.get(key);

      if (existingTag) {
        existingTag.count += 1;
      } else {
        tagMap.set(key, { name: tag, language, count: 1 });
      }
    });
  });

  return Array.from(tagMap.values());
}
