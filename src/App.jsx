import React from "react";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase-config";

// import UserPanel from "./components/UserPanel";
import { NewPostForm } from "./components/NewPostForm";
import { PostList } from "./components/PostList";
import { SearchBar } from "./components/SearchBar";
import "./index.css";

import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase-config";

function App() {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [query, setQuery] = useState("");
  const [languageFilter, setLanguageFilter] = useState("ALL");
  const [tagFilter, setTagFilter] = useState("");
  const myUid = import.meta.env.VITE_MY_GOOGLE_UID;

  useEffect(() => {
    const fetchPosts = async () => {
      const postsCollection = collection(db, "posts");
      const snapshot = await getDocs(postsCollection);
      const data = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setPosts(data);
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleAddPost = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  const allTags = [...new Set(posts.flatMap((post) => post.tags))];

  const sortedPosts = [...posts].sort((a, b) => {
    return b.createdAt?.seconds - a.createdAt?.seconds;
  });

  const filteredPosts = sortedPosts.filter((post) => {
    const matchesQuery =
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.content.toLowerCase().includes(query.toLowerCase());

    const matchesLanguage =
      languageFilter === "ALL" || post.language === languageFilter;

    const matchesTag = !tagFilter || post.tags.includes(tagFilter);

    return matchesQuery && matchesLanguage && matchesTag;
  });

  return (
    <div className="font-lora bg-gray-50 min-h-screen py-8 px-4">
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-6">
          📚 Архив прозы и поэзии
        </h1>

        {user?.uid === myUid && (
          <p className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded mb-4 text-right">
            🔒 Admin mode: {user.displayName}
          </p>
        )}
        {/* {user?.uid === myUid && <UserPanel user={user} />} */}

        <SearchBar query={query} onChange={setQuery} />

        <div className="mb-4">
          <label>
            Фильтр по языку:&nbsp;
            <select
              value={languageFilter}
              onChange={(e) => setLanguageFilter(e.target.value)}
            >
              <option value="ALL">Все</option>
              <option value="RU">Русский</option>
              <option value="BY">Беларуская</option>
              <option value="PL">Polski</option>
            </select>
          </label>
        </div>

        <div className="mb-6">
          <strong className="block mb-2">Теги:</strong>
          <div className="flex flex-wrap gap-2 max-w-full">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setTagFilter(tagFilter === tag ? "" : tag)}
                className={`px-2 py-1 border rounded text-sm shrink-0 ${
                  tagFilter === tag ? "bg-gray-300" : "bg-white"
                }`}
                style={{
                  maxWidth: "100%",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                #{tag}
              </button>
            ))}
          </div>
          {tagFilter && (
            <button
              onClick={() => setTagFilter("")}
              className="text-red-600 mt-2 inline-block text-sm"
            >
              ✕ Сбросить тег
            </button>
          )}
        </div>

        {user?.uid === myUid && <NewPostForm onAddPost={handleAddPost} />}

        <PostList posts={filteredPosts} />
      </div>
    </div>
  );
}

export default App;
