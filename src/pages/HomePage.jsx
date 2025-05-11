// src/pages/HomePage.jsx
import React, { useEffect, useState, useMemo } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase-config";

import { NewPostForm } from "../components/NewPostForm";
import { PostList } from "../components/PostList";
import { SearchBar } from "../components/SearchBar";
import "../index.css";
import { PageContainer } from "../layouts/PageContainer";
import { ScrollToTopButton } from "../components/ui/ScrollToTopButton";

import { TagFilter } from "../components/TagFilter";
import { ToastNotifications } from "../components/ToastNotifications";
import { LanguageFilter } from "../components/LanguageFilter";
import { usePosts } from "../hooks/usePosts";
import { getAllTags } from "../utils/getAllTags";
import { AdminBadge } from "../components/ui/AdminBadge";
import { useScrollPosition } from "../hooks/useScrollPosition";
import { useFilteredPosts } from "../hooks/useFilteredPosts";

export function HomePage() {
  // Global states
  const [user, setUser] = useState(null);
  const [query, setQuery] = useState("");
  const [languageFilter, setLanguageFilter] = useState("ALL");
  const [tagFilters, setTagFilters] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const [toast, setToast] = useState({ message: "", type: "" });

  const myUid = import.meta.env.VITE_MY_GOOGLE_UID;

  const [posts, setPosts] = usePosts(); // Fetch posts from Firestore on component mount

  const { filteredEnhancedPosts, languagePostCounts, tagUsageByLanguage } =
    useFilteredPosts(posts, query, languageFilter, tagFilters);

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

  return (
    <div className="font-lora bg-background min-h-screen">
      <PageContainer size="md">
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
          posts={filteredEnhancedPosts}
          user={user}
          myUid={myUid}
          onEdit={setEditingPost}
          onDelete={handleDeletePost}
          tagFilters={tagFilters}
          setTagFilters={setTagFilters}
        />
        <ScrollToTopButton />
      </PageContainer>

      <ToastNotifications toast={toast} />
    </div>
  );
}
