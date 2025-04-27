// src/App.jsx
import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase-config";

import { NewPostForm } from "./components/NewPostForm";
import { PostList } from "./components/PostList";
import { SearchBar } from "./components/SearchBar";
import "./index.css";

import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase-config";

function App() {
  // Global states
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [query, setQuery] = useState("");
  const [languageFilter, setLanguageFilter] = useState("ALL");
  const [tagFilter, setTagFilter] = useState("");
  const [editingPost, setEditingPost] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [toast, setToast] = useState({ message: "", type: "" });

  const myUid = import.meta.env.VITE_MY_GOOGLE_UID;

  // Fetch posts from Firestore on component mount
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

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Handle scroll event to adjust logo size
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Show toast notification
  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: "", type: "" }), 3000);
  };

  // Add a new post
  const handleAddPost = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
    showToast("✅ Публикация добавлена!", "success");
  };

  // Edit an existing post
  const handleEditPost = (updatedPost) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => (post.id === updatedPost.id ? updatedPost : post))
    );
    setEditingPost(null);
    showToast("✏️ Публикация обновлена!", "success");
  };

  // Delete a post
  const handleDeletePost = (postId) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    showToast("🗑️ Публикация удалена!", "success");
  };

  // Extract all unique tags
  const allTags = [...new Set(posts.flatMap((post) => post.tags))];

  // Sort posts by creation date
  const sortedPosts = [...posts].sort((a, b) => {
    return b.createdAt?.seconds - a.createdAt?.seconds;
  });

  // Filter posts by query, language, and tag
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
    <div className="font-lora bg-background min-h-screen">
      {/* Header with logo */}

      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 backdrop-blur-md ${
          isScrolled
            ? "bg-header/80 border-b shadow-md border-gray-300"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-2xl mx-auto flex items-center p-2">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="focus:outline-none"
          >
            <img
              src="/logo.png"
              alt="My Literature Archive — powered by Vitali Pazdniakou"
              className={`transition-all duration-500 transform hover:-translate-y-1 ${
                isScrolled ? "w-40" : "w-80"
              }`}
            />
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="pt-36 px-4">
        <div className="max-w-2xl mx-auto p-4">
          {/* Admin badge */}
          {user?.uid === myUid && (
            <p className="inline-block px-3 py-1 bg-tagBg text-tagText text-sm rounded mb-4 text-right">
              🔒 Admin mode: {user.displayName}
            </p>
          )}

          {/* Search input */}
          <SearchBar query={query} onChange={setQuery} />

          {/* Language filter */}
          <div className="mb-4">
            <label className="text-textMain">
              Фильтр по языку:&nbsp;
              <select
                value={languageFilter}
                onChange={(e) => setLanguageFilter(e.target.value)}
                className="border rounded p-1"
              >
                <option value="ALL">Все</option>
                <option value="RU">Русский</option>
                <option value="BY">Беларуская</option>
                <option value="PL">Polski</option>
              </select>
            </label>
          </div>

          {/* Tag filter */}
          <div className="mb-6">
            <strong className="block mb-2 text-textMain">Теги:</strong>
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

            {/* Clear tag filter */}
            {tagFilter && (
              <button
                onClick={() => setTagFilter("")}
                className="text-alertError mt-2 inline-block text-sm hover:text-alertErrorHover"
              >
                ✕ Сбросить тег
              </button>
            )}
          </div>

          {/* New post form (admin only) */}
          {user?.uid === myUid && (
            <NewPostForm
              onAddPost={handleAddPost}
              editingPost={editingPost}
              setEditingPost={setEditingPost}
              onEditPost={handleEditPost}
            />
          )}

          {/* List of posts */}
          <PostList
            posts={filteredPosts}
            user={user}
            myUid={myUid}
            onEdit={setEditingPost}
            onDelete={handleDeletePost}
          />
        </div>
      </main>

      {/* Toast Notification */}
      {toast.message && (
        <div
          className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded shadow-lg animate-fade-in ${
            toast.type === "success"
              ? "bg-green-500 text-white"
              : toast.type === "error"
              ? "bg-red-500 text-white"
              : "bg-yellow-400 text-black"
          }`}
        >
          {toast.message}
        </div>
      )}

      {/* Footer */}
      <footer className="mt-12 text-center text-sm text-textSecondary leading-relaxed">
        © {new Date().getFullYear()} Виталий Поздняков. Все тексты защищены
        авторским правом. <br />
        Копирование или распространение без согласия автора запрещено.
      </footer>
    </div>
  );
}

export default App;
