// src/layouts/Layout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ScrollToTopButton from "../components/ui/ScrollToTopButton";
import ToastNotifications from "../components/ToastNotifications";
import { useScrollPosition } from "../hooks/useScrollPosition";

export default function Layout({ toast }) {
  const isScrolled = useScrollPosition();

  return (
    <div className="font-lora bg-background min-h-screen">
      <Header isScrolled={isScrolled} />
      <main className="pt-36 px-4">
        <Outlet /> {/* 👈 Here get HomePage and PostPage */}
      </main>
      <ToastNotifications toast={toast} />
      <Footer />
      <ScrollToTopButton />
    </div>
  );
}
