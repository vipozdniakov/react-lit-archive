// src/components/ui/AdminBadge.jsx
import React from "react";

export function AdminBadge({ user, myUid }) {
  if (user?.uid !== myUid) return null;

  return (
    <p className="inline-block px-3 py-1 bg-tagBg text-tagText text-sm rounded mb-4 text-right">
      🔒 Admin mode: {user.displayName}
    </p>
  );
}
