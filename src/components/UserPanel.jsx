import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase-config";

const UserPanel = ({ user }) => {
  return (
    <div className="bg-white shadow p-4 rounded-xl mb-6 flex justify-between items-center text-sm text-gray-700">
      <span>
        Logged in as <span className="font-semibold">{user.displayName}</span>
      </span>
      <button
        onClick={() => signOut(auth)}
        className="text-red-500 hover:underline"
      >
        Logout
      </button>
    </div>
  );
};

export default UserPanel;
