// src/components/SidebarTop.jsx
import React from "react";
import { SearchBar } from "./SearchBar";
import { LanguageFilter } from "./LanguageFilter";

export function SidebarTop({
  query,
  setQuery,
  languageFilter,
  setLanguageFilter,
}) {
  return (
    <div className="space-y-6 text-sm">
      <SearchBar query={query} onChange={setQuery} />
      <LanguageFilter value={languageFilter} onChange={setLanguageFilter} />
    </div>
  );
}
