import React from "react";

export function PostList({ posts }) {
  return (
    <div className="grid gap-6">
      {posts.map((post) => (
        <div
          key={post.id}
          className="bg-white shadow-md rounded-2xl p-6 border border-gray-100"
        >
          <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
          <p className="text-sm text-gray-500 mb-4">Язык: {post.language}</p>
          <pre className="prose max-w-prose font-lora indent-paragraph text-gray-800 whitespace-pre-wrap mb-4">
            {post.content}
          </pre>

          <div className="text-sm text-blue-600">
            {post.tags.map((tag) => (
              <span key={tag} className="mr-2">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
