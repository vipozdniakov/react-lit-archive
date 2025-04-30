// src/components/LoginButton.jsx

import React, { useState, useEffect } from "react";
import {
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { auth, provider } from "../firebase-config";

function LoginButton({ onLogin }) {
  const [message, setMessage] = useState("");

  // Unified login function for both desktop and mobile
  const login = async () => {
    try {
      setMessage("Logging in...");

      // Ensure session persists across reloads and browser restarts
      await setPersistence(auth, browserLocalPersistence);

      if (window.innerWidth < 768) {
        // On mobile devices, use redirect-based login
        await signInWithRedirect(auth, provider);
      } else {
        // On desktop devices, use popup-based login
        const result = await signInWithPopup(auth, provider);
        if (result?.user) {
          console.log("✅ Popup login successful:", result.user);
          onLogin(result.user);
          setMessage(`Welcome, ${result.user.displayName}!`);
        }
      }
    } catch (error) {
      console.error("❌ Login failed", error);
      setMessage("Login error: " + error.message);
    }
  };

  // Handle redirect result when returning to the app (e.g., after mobile login)
  useEffect(() => {
    console.log("🔄 Checking getRedirectResult");
    getRedirectResult(auth)
      .then((result) => {
        if (result?.user) {
          console.log("✅ Redirect login successful:", result.user);
          onLogin(result.user);
          setMessage(`Welcome, ${result.user.displayName}!`);
        } else {
          console.log("ℹ️ No redirect result found.");
        }
      })
      .catch((error) => {
        console.error("❌ Redirect login error:", error);
        setMessage("Redirect login error: " + error.message);
      });
  }, [onLogin]);

  return (
    <div className="text-center space-y-4">
      <button
        onClick={login}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Sign in with Google
      </button>
      {message && (
        <p className="text-sm text-gray-700 bg-gray-100 p-2 rounded shadow">
          {message}
        </p>
      )}
    </div>
  );
}

export default LoginButton;
