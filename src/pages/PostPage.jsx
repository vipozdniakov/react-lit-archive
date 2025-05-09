import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import { TagDisplay } from "../components/TagDisplay";
import { useTagStats } from "../hooks/useTagStats";

function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  // Get post by ID
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

  // Getting tag stats
  const { languagePostCounts, tagUsageByLanguage, getSortedTags } = useTagStats(
    post ? [post] : []
  );
  const lang = post?.lang || "RU";
  const sortedTags = post ? getSortedTags(post.tags, lang) : [];

  if (loading) return <p className="p-4">Загрузка...</p>;
  if (!post) return <p className="p-4">Пост не найден</p>;

  return (
    <>
      <div className="max-w-3xl mx-auto p-4">
        <div
          className="group bg-white shadow-md rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition duration-300 max-w-3xl mx-auto"
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

          {/* Header and language */}
          <h1 className="text-3xl font-semibold mb-2">{post.title}</h1>
          <p className="text-sm text-textSecondary mb-4">Язык: {lang}</p>

          {/* Content */}

          <div
            className={`prose font-lora text-textMain ${
              post.postType === "poetry"
                ? "max-w-md whitespace-pre-line"
                : "max-w-prose indent-paragraph whitespace-pre-wrap"
            }`}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags */}
          <TagDisplay
            tags={sortedTags}
            language={lang}
            tagStats={{ languagePostCounts, tagUsageByLanguage }}
            onTagClick={() => {}}
            activeTags={[]}
          />
        </div>
      </div>
    </>
  );
}

export default PostPage;
