import React from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
} from "firebase/auth";
import { auth, provider } from "../firebase-config";
import { useEffect } from "react";

function LoginButton({ onLogin }) {
  const login = async () => {
    try {
      if (window.innerWidth < 768) {
        // На мобильных используем редирект
        await signInWithRedirect(auth, provider);
      } else {
        // На десктопе — popup
        await signInWithPopup(auth, provider);
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        if (result?.user) {
          console.log("Redirect login successful:", result.user);
          onLogin(result.user);
        }
      })
      .catch((error) => {
        console.error("Redirect login error:", error);
      });
  }, []);

  return (
    <button
      onClick={login}
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
    >
      Войти с Google
    </button>
  );
}

export default LoginButton;
