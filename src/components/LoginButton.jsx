import React from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase-config";

const LoginButton = ({ onLogin }) => {
  const login = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    onLogin(result.user);
  };

  return (
    <button onClick={login} className="text-blue-600 hover:underline mb-4">
      Login with Google
    </button>
  );
};

export default LoginButton;
