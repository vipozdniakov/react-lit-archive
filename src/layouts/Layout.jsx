// src/layouts/Layout.jsx

import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { ToastNotifications } from "../components/ToastNotifications";
import { ScrollToTopButton } from "../components/ui/ScrollToTopButton";
import { useScrollPosition } from "../hooks/useScrollPosition";

export function Layout({ toast }) {
  const isScrolled = useScrollPosition();
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  return (
    <div className="font-lora bg-background min-h-screen">
      <Header isScrolled={isScrolled} />
      <main className="pt-36 px-4">
        <div className="mx-auto max-w-7xl">
          <div className="lg:col-span-3">
            <Outlet /> {/* 👈 Here get HomePage and PostPage */}
          </div>
          <aside className="hidden lg:block lg:col-span">
            {/* Sidebar content */}
          </aside>
        </div>
        <ScrollToTopButton />
      </main>
      <ToastNotifications toast={toast} />
      <Footer />
    </div>
  );
}
