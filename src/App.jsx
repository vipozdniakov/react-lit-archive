// src/App.jsx
import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase-config";

import { NewPostForm } from "./components/NewPostForm";
import { PostList } from "./components/PostList";
import { SearchBar } from "./components/SearchBar";
import "./index.css";

import { TagFilter } from "./components/TagFilter";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ToastNotifications from "./components/ToastNotifications";
import { LanguageFilter } from "./components/LanguageFilter";
import { usePosts } from "./hooks/usePosts";
import { filterPosts } from "./utils/filterPosts";
import { useMemo } from "react";
import { getAllTags } from "./utils/getAllTags";
import AdminBadge from "./components/ui/AdminBadge";
import { useScrollPosition } from "./hooks/useScrollPosition";

function App() {
  // Global states
  const [user, setUser] = useState(null);
  const [query, setQuery] = useState("");
  const [languageFilter, setLanguageFilter] = useState("ALL");
  const [tagFilters, setTagFilters] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const [toast, setToast] = useState({ message: "", type: "" });

  const myUid = import.meta.env.VITE_MY_GOOGLE_UID;

  const [posts, setPosts] = usePosts(); // Fetch posts from Firestore on component mount

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const isScrolled = useScrollPosition(); // Handle scroll event to adjust logo size

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

  // Extract all unique tags from posts
  const allTags = useMemo(() => {
    const all = getAllTags(posts);
    return languageFilter === "ALL"
      ? all
      : all.filter((tag) => tag.language === languageFilter);
  }, [posts, languageFilter]);

  // Sort posts by creation date
  const sortedPosts = [...posts].sort((a, b) => {
    return b.createdAt?.seconds - a.createdAt?.seconds;
  });

  // Filter posts by query, language, and tag
  const filteredPosts = filterPosts(posts, query, languageFilter, tagFilters);

  return (
    <div className="font-lora bg-background min-h-screen">
      {/* Header with logo */}
      <Header isScrolled={isScrolled} />

      {/* Main content */}
      <main className="pt-36 px-4">
        <div className="max-w-2xl mx-auto p-4">
          <AdminBadge user={user} myUid={myUid} />

          {/* Search input */}
          <SearchBar query={query} onChange={setQuery} />

          {/* Language filter */}
          <LanguageFilter value={languageFilter} onChange={setLanguageFilter} />

          {/* Tag filter */}
          <TagFilter
            allTags={allTags}
            tagFilters={tagFilters}
            setTagFilters={setTagFilters}
            languageFilter={languageFilter}
          />

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
            tagFilters={tagFilters}
            setTagFilters={setTagFilters}
          />
        </div>
      </main>

      <ToastNotifications toast={toast} />

      <Footer />
    </div>
  );
}

export default App;
