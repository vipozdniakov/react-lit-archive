// src/components/AdminLogin.jsx
import React, { useState, useEffect } from "react";
import { onAuthStateChanged, getRedirectResult } from "firebase/auth";
import { auth } from "../firebase-config";
import LoginButton from "./LoginButton";
import UserPanel from "./UserPanel";
import { Link } from "react-router-dom";

function AdminLogin() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Проверка состояния авторизации
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    // Обработка результата редиректа после входа с мобильного
    getRedirectResult(auth)
      .then((result) => {
        if (result?.user) {
          console.log("Redirect login successful:", result.user);
          setUser(result.user);
        }
      })
      .catch((error) => {
        console.error("Redirect login error:", error);
      });

    return () => unsubscribe();
  }, []);

  return (
    <div className="font-lora bg-gray-50 min-h-screen flex flex-col justify-center items-center p-6">
      <h1 className="text-2xl font-semibold mb-6 text-center">
        🔐 Админ-панель входа
      </h1>

      {!user ? (
        <>
          <p className="mb-4 text-center">
            Войдите через Google, чтобы получить доступ к функциям
            администратора.
          </p>
          <LoginButton onLogin={setUser} />
        </>
      ) : (
        <>
          <p className="mb-4 text-center text-green-700">
            Вы вошли как <strong>{user.displayName}</strong>. Перейдите на
            главную страницу.
          </p>
          <UserPanel user={user} />
          <Link to="/" className="mt-6 text-blue-600 hover:underline text-sm">
            ← Назад на главную
          </Link>
        </>
      )}
    </div>
  );
}

export default AdminLogin;
