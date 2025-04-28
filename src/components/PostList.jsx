// src/components/PostList.jsx
import React, { useState, useRef } from "react";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase-config";

// Map stored language codes to ISO language codes
const mapLanguageCode = (lang) => {
  switch (lang) {
    case "RU":
      return "ru";
    case "BY":
      return "be";
    case "PL":
      return "pl";
    default:
      return "ru"; // fallback
  }
};

const PREVIEW_LIMIT = 600; // Character limit for collapsed posts

export function PostList({ posts, user, myUid, onEdit, onDelete }) {
  const [expandedPosts, setExpandedPosts] = useState([]);
  const refs = useRef({}); // Store refs to each post

  // Delete a post with confirmation
  const handleDelete = async (postId) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (confirm) {
      try {
        await deleteDoc(doc(db, "posts", postId));
        onDelete(postId);
      } catch (error) {
        console.error("Error deleting post:", error);
        alert("❌ Failed to delete post.");
      }
    }
  };

  // Expand/collapse a post

  const HEADER_OFFSET = 100; // Change if your header is taller or shorter

  const toggleExpand = (postId) => {
    setExpandedPosts((prev) => {
      const isCurrentlyExpanded = prev.includes(postId);
      const newExpanded = isCurrentlyExpanded
        ? prev.filter((id) => id !== postId)
        : [...prev, postId];

      // Scroll back to top of post on collapse
      if (isCurrentlyExpanded && refs.current[postId]) {
        const rect = refs.current[postId].getBoundingClientRect();
        const scrollTop =
          window.pageYOffset || document.documentElement.scrollTop;
        const targetY = rect.top + scrollTop - HEADER_OFFSET;

        window.scrollTo({
          top: targetY,
          behavior: "smooth",
        });
      }

      return newExpanded;
    });
  };

  return (
    <div className="grid gap-8">
      {posts.map((post) => {
        const isExpanded = expandedPosts.includes(post.id);
        const needsTruncate = post.content.length > PREVIEW_LIMIT;
        const contentToShow = isExpanded
          ? post.content
          : post.content.slice(0, PREVIEW_LIMIT);

        return (
          <div
            key={post.id}
            ref={(el) => (refs.current[post.id] = el)}
            className="group bg-white shadow-md rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition duration-300"
            lang={mapLanguageCode(post.language)}
          >
            {/* Image */}
            {post.imageUrl && (
              <div className="mb-4 overflow-hidden rounded-xl">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full max-h-96 object-cover transition-transform duration-500 group-hover:scale-105 border-4 border-white"
                />
                {(post.imageCredit || post.imageSource) && (
                  <p className="text-xs text-textSecondary mt-2 text-center">
                    {post.imageCredit && (
                      <span>Иллюстрация: {post.imageCredit}</span>
                    )}
                    {post.imageSource && (
                      <>
                        {" "}
                        |{" "}
                        <a
                          href={post.imageSource}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline hover:text-buttonPrimary"
                        >
                          Источник
                        </a>
                      </>
                    )}
                  </p>
                )}
              </div>
            )}

            {/* Title */}
            <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>

            {/* Language */}
            <p className="text-sm text-textSecondary mb-4">
              Language: {post.language}
            </p>

            {/* Content */}
            <div
              className={`relative transition-all duration-500 ease-in-out ${
                !isExpanded && needsTruncate
                  ? "max-h-[350px] overflow-hidden"
                  : "max-h-full"
              }`}
            >
              <pre className="prose max-w-prose font-lora indent-paragraph text-textMain whitespace-pre-wrap">
                {contentToShow}
                {!isExpanded && needsTruncate && "…"}
              </pre>
              {/* Gradient mask at the bottom if truncated */}
              {!isExpanded && needsTruncate && (
                <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-white to-transparent pointer-events-none" />
              )}
            </div>

            {/* Expand/Collapse Button */}
            {needsTruncate && (
              <button
                onClick={() => toggleExpand(post.id)}
                className="text-sm text-buttonPrimary hover:underline focus:outline-none mt-2 flex items-center gap-1"
              >
                {isExpanded ? (
                  <>
                    <span>Скрыть текст</span> <span>↑</span>
                  </>
                ) : (
                  <>
                    <span>Развернуть весь текст</span> <span>↓</span>
                  </>
                )}
              </button>
            )}

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-6">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-block bg-tagBg text-tagText text-xs px-2 py-1 rounded-full whitespace-nowrap"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Admin Actions */}
            {user?.uid === myUid && (
              <div className="mt-4 flex gap-4 text-sm">
                <button
                  onClick={() => onEdit(post)}
                  className="text-buttonPrimary hover:underline"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="text-alertError hover:underline"
                >
                  🗑️ Delete
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
