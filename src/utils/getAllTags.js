// Extract all unique tags

export function getAllTags(posts) {
  return Array.from(
    new Map(
      posts.flatMap((post) =>
        post.tags.map((tag) => [
          `${tag}-${post.language}`,
          { name: tag, language: post.language },
        ])
      )
    ).values()
  );
}
