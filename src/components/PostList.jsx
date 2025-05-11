// src/components/PostList.jsx
import { deleteDoc, doc } from "firebase/firestore";
import React, { useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase-config";
import { useTagStats } from "../hooks/useTagStats";
import { TagDisplay } from "./TagDisplay";

const PREVIEW_LIMIT = 600; // Character limit for collapsed posts
const HEADER_OFFSET = 100; // Offset height for scrolling past sticky header

// Map app language codes to ISO codes
const mapLanguageCode = (lang) =>
  ({ RU: "ru", BY: "be", PL: "pl" }[lang] || "ru");

export function PostList({
  posts,
  user,
  myUid,
  onEdit,
  onDelete,
  tagFilters,
  setTagFilters,
}) {
  const [expandedPosts, setExpandedPosts] = useState([]);
  const refs = useRef({}); // Map post IDs to element refs

  // Count posts and tag usage by language
  const { languagePostCounts, tagUsageByLanguage, getSortedTags } =
    useTagStats(posts);

  // Delete post handler with confirmation
  const handleDelete = async (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await deleteDoc(doc(db, "posts", postId));
        onDelete(postId);
      } catch (error) {
        console.error("Error deleting post:", error);
        alert("❌ Failed to delete post.");
      }
    }
  };

  // Toggle expand/collapse and scroll on collapse
  const toggleExpand = (postId) => {
    setExpandedPosts((prev) => {
      const isExpanded = prev.includes(postId);
      const newList = isExpanded
        ? prev.filter((id) => id !== postId)
        : [...prev, postId];

      if (isExpanded && refs.current[postId]) {
        const rect = refs.current[postId].getBoundingClientRect();
        const scrollTop =
          window.pageYOffset || document.documentElement.scrollTop;
        const targetY = rect.top + scrollTop - HEADER_OFFSET;
        window.scrollTo({ top: targetY, behavior: "smooth" });
      }

      return newList;
    });
  };

  return (
    <div className="grid gap-8">
      {posts.map((post) => {
        const isExpanded = expandedPosts.includes(post.id);
        const needsTruncate = post.content.length > PREVIEW_LIMIT;
        const content = isExpanded
          ? post.content
          : post.content.slice(0, PREVIEW_LIMIT);

        return (
          <div
            key={post.id}
            ref={(el) => (refs.current[post.id] = el)}
            className="group bg-white shadow-md rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition duration-300"
            lang={mapLanguageCode(post.language)}
          >
            {post.imageUrl && (
              <div className="mb-4 overflow-hidden rounded-xl relative">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full max-h-96 object-cover rounded-2xl transition-transform duration-500 group-hover:scale-105 border-4 border-white"
                />

                {/* Image credit inside relative block */}
                {(post.imageCredit || post.imageSource) && (
                  <div className="absolute bottom-2 right-2 text-xs text-textSecondary bg-white/70 px-2 py-1 rounded-md backdrop-blur-sm">
                    {post.imageCredit && (
                      <span>Иллюстрация: {post.imageCredit}</span>
                    )}
                    {post.imageSource && (
                      <>
                        {" | "}
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
                  </div>
                )}
              </div>
            )}

            {/* Title and language badge */}
            <h2
              className={`text-2xl font-semibold mb-2 ${
                post.type === "poetry" ? "text-center" : "text-left"
              }`}
            >
              <Link to={`/post/${post.id}`} className="hover:underline">
                {post.title}
              </Link>
              <span
                className={`align-super text-[10px] font-medium ml-1 px-2 py-[1px] border rounded-sm bg-transparent ${
                  post.language === "RU"
                    ? "border-blue-400 text-blue-700"
                    : post.language === "BY"
                    ? "border-emerald-400 text-emerald-700"
                    : "border-red-400 text-red-700"
                }`}
              >
                {post.language}
              </span>
            </h2>

            {/* Content preview with expand/collapse */}
            <div
              className={`relative transition-all duration-500 ease-in-out ${
                !isExpanded && needsTruncate
                  ? "max-h-[350px] overflow-hidden"
                  : "max-h-full"
              }`}
            >
              <pre
                className={`font-lora text-textMain text-base leading-relaxed ${
                  post.type === "poetry"
                    ? "not-prose text-center whitespace-pre-line max-w-md mx-auto"
                    : "prose indent-paragraph whitespace-pre-wrap max-w-prose"
                }`}
              >
                {content}
                {!isExpanded && needsTruncate && "…"}
              </pre>

              {!isExpanded && needsTruncate && (
                <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-white to-transparent pointer-events-none" />
              )}
            </div>

            {/* Expand button */}
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
            <div className="mt-6">
              <TagDisplay
                tags={post.sortedTags}
                language={post.language}
                tagStats={{ languagePostCounts, tagUsageByLanguage }}
                onTagClick={(tag) => {
                  setTagFilters((prev) =>
                    prev.includes(tag)
                      ? prev.filter((t) => t !== tag)
                      : [...prev, tag]
                  );
                }}
                activeTags={tagFilters}
              />
            </div>

            {/* Admin controls */}
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
