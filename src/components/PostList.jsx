// src/components/PostList.jsx
import React from "react";

export function PostList({ posts, user, myUid, onEdit }) {
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

          <div className="flex flex-wrap gap-2 mt-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-block bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full whitespace-nowrap"
              >
                #{tag}
              </span>
            ))}
          </div>

          {user?.uid === myUid && (
            <button
              onClick={() => onEdit(post)}
              className="mt-4 text-sm text-blue-600 hover:underline"
            >
              ✏️ Редактировать
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
