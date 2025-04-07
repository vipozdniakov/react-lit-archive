// src/components/AdminLogin.jsx
import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase-config";
import LoginButton from "./LoginButton";
import UserPanel from "./UserPanel";
import { Link } from "react-router-dom";

function AdminLogin() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="font-lora bg-gray-50 min-h-screen flex items-center justify-center p-6">
      <div className="bg-white shadow-md rounded-xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-6">
          🔐 Admin Login Panel
        </h1>

        {!user ? (
          <>
            <p className="mb-4 text-center text-gray-700">
              Sign in with Google to access admin features.
            </p>
            <div className="flex justify-center">
              <LoginButton onLogin={setUser} />
            </div>
          </>
        ) : (
          <>
            <p className="mb-4 text-center text-green-700">
              Logged in as <strong>{user.displayName}</strong>.
            </p>
            <UserPanel user={user} />
            <div className="text-center mt-6">
              <Link to="/" className="text-blue-600 hover:underline text-sm">
                ← Back to Main Page
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default AdminLogin;
