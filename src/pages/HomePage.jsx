// src/pages/HomePage.jsx
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useMemo, useState } from "react";
import { NewPostForm } from "../components/NewPostForm";
import { PostList } from "../components/PostList";
import { Sidebar } from "../components/Sidebar";
import { SidebarTags } from "../components/SidebarTags";
import { SidebarTop } from "../components/SidebarTop";
import { auth } from "../firebase-config";
import "../index.css";
import { PageContainer } from "../layouts/PageContainer";

import { ToastNotifications } from "../components/ToastNotifications";
import { AdminBadge } from "../components/ui/AdminBadge";
import { useFilteredPosts } from "../hooks/useFilteredPosts";
import { usePosts } from "../hooks/usePosts";
import { getAllTags } from "../utils/getAllTags";

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

  const { filteredEnhancedPosts } = useFilteredPosts(
    posts,
    query,
    languageFilter,
    tagFilters
  );

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
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

  // Extract all unique tags from posts
  const allTags = useMemo(() => {
    const all = getAllTags(posts);
    return languageFilter === "ALL"
      ? all
      : all.filter((tag) => tag.language === languageFilter);
  }, [posts, languageFilter]);

  return (
    <div className="font-lora bg-background min-h-screen">
      <PageContainer size="full">
        {/* Mobile-only top sidebar */}
        <div className="block lg:hidden mb-6">
          <SidebarTop
            query={query}
            setQuery={setQuery}
            languageFilter={languageFilter}
            setLanguageFilter={setLanguageFilter}
          />
        </div>
        <div className="grid gap-8 lg:grid-cols-[3fr,1fr]">
          {/* Main content */}

          <div>
            <AdminBadge user={user} myUid={myUid} />

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
          </div>
          {/* Sidebar */}
          <aside className="hidden lg:block">
            <Sidebar
              query={query}
              setQuery={setQuery}
              languageFilter={languageFilter}
              setLanguageFilter={setLanguageFilter}
              allTags={allTags}
              tagFilters={tagFilters}
              setTagFilters={setTagFilters}
            />
          </aside>
        </div>
      </PageContainer>

      {/* Mobile sidebar under post list */}
      <div className="block lg:hidden mt-6">
        <SidebarTags
          query={query}
          setQuery={setQuery}
          languageFilter={languageFilter}
          setLanguageFilter={setLanguageFilter}
          allTags={allTags}
          tagFilters={tagFilters}
          setTagFilters={setTagFilters}
        />
      </div>

      <ToastNotifications toast={toast} />
    </div>
  );
}
