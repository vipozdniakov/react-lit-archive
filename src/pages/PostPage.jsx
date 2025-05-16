// src/pages/PostPage.jsx

import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TagDisplay } from "../components/TagDisplay";
import { db } from "../firebase-config";
import { useTagStats } from "../hooks/useTagStats";
import { PageContainer } from "../layouts/PageContainer";
import { PostContent } from "../layouts/PostContent";

export function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch post data by ID from Firestore
  useEffect(() => {
    const loadPost = async () => {
      try {
        const ref = doc(db, "posts", id);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setPost({ id: snap.id, ...snap.data() });
        }
      } catch (e) {
        console.error("Ошибка загрузки поста:", e);
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [id]);

  // Get tag statistics (usage counts etc.)
  const { languagePostCounts, tagUsageByLanguage, getSortedTags } = useTagStats(
    post ? [post] : []
  );

  // Define language and tag list (with safe fallback)
  const lang = post?.lang || "RU";
  const sortedTags = Array.isArray(post?.tags)
    ? getSortedTags(post.tags, lang)
    : [];

  if (loading) return <p className="p-4">Загрузка...</p>;
  if (!post) return <p className="p-4">Пост не найден</p>;

  return (
    <PageContainer size="lg">
      <div
        className="bg-white shadow-md rounded-2xl p-6 border border-gray-200"
        lang={lang.toLowerCase()}
      >
        {/* Illustration */}
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
              </p>
            )}
          </div>
        )}

        {/* Title and metadata */}
        <h1
          className={`text-3xl font-semibold mb-2 ${
            post.type === "poetry" ? "text-center" : "text-left"
          }`}
        >
          {post.title}
        </h1>

        {/* Content */}
        {post.type === "poetry" ? (
          <PostContent html={post.content} type="poetry" />
        ) : (
          <PostContent html={post.content} type="prose" />
        )}

        {/* Tags */}
        <TagDisplay
          tags={sortedTags}
          language={lang}
          tagStats={{
            languagePostCounts: languagePostCounts || {},
            tagUsageByLanguage: tagUsageByLanguage || {},
          }}
          onTagClick={() => {}}
          activeTags={[]}
        />
      </div>
    </PageContainer>
  );
}
