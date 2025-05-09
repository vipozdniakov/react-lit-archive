// src/App.jsx
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import HomePage from "./pages/HomePage";
import PostPage from "./pages/PostPage";
import AdminLogin from "./components/AdminLogin";

function App() {
  const myUid = import.meta.env.VITE_MY_GOOGLE_UID;
  const [toast, setToast] = useState({ message: "", type: "" });

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: "", type: "" }), 3000);
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Layout-container for all public pages */}
        <Route element={<Layout toast={toast} />}>
          <Route
            path="/"
            element={<HomePage myUid={myUid} showToast={showToast} />}
          />
          <Route
            path="/post/:id"
            element={<PostPage myUid={myUid} showToast={showToast} />}
          />
        </Route>

        {/* Login page - without Layout */}
        <Route path="/vp_poetry" element={<AdminLogin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
