// src/components/LoginButton.jsx
import React, { useState, useEffect } from "react";
import {
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, provider } from "../firebase-config";

function LoginButton({ onLogin }) {
  const [message, setMessage] = useState("");

  const login = async () => {
    try {
      setMessage("Вход...");
      if (window.innerWidth < 768) {
        await signInWithRedirect(auth, provider);
      } else {
        const result = await signInWithPopup(auth, provider);
        if (result?.user) {
          onLogin(result.user);
          setMessage(`Добро пожаловать, ${result.user.displayName}!`);
        }
      }
    } catch (error) {
      console.error("Login failed", error);
      setMessage("Ошибка входа: " + error.message);
    }
  };

  useEffect(() => {
    // 1. Сначала пытаемся получить результат редиректа
    getRedirectResult(auth)
      .then((result) => {
        if (result?.user) {
          console.log("Redirect login successful:", result.user);
          onLogin(result.user);
          setMessage(`Добро пожаловать, ${result.user.displayName}!`);
        }
      })
      .catch((error) => {
        console.error("Redirect login error:", error);
        // Можно не показывать сообщение, если просто не было результата
        if (error.message !== "Firebase: Error (auth/no-auth-event).") {
          setMessage("Ошибка входа через редирект: " + error.message);
        }
      });

    // 2. Подстраховываемся — слушаем auth-сессию
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("Auth state detected:", user);
        onLogin(user);
        setMessage(`Добро пожаловать, ${user.displayName}!`);
      }
    });

    return () => unsubscribe();
  }, [onLogin]);

  return (
    <div className="text-center space-y-4">
      <button
        onClick={login}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Войти с Google
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
