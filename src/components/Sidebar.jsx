import React from "react";
import { SearchBar } from "./SearchBar";
import { LanguageFilter } from "./LanguageFilter";
import { TagFilter } from "./TagFilter";

export function Sidebar({
  query,
  setQuery,
  languageFilter,
  setLanguageFilter,
  allTags,
  tagFilters,
  setTagFilters,
}) {
  return (
    <div className="space-y-6 text-sm">
      <SearchBar query={query} onChange={setQuery} />

      <LanguageFilter value={languageFilter} onChange={setLanguageFilter} />

      <TagFilter
        allTags={allTags || []}
        tagFilters={tagFilters || []}
        setTagFilters={setTagFilters}
        languageFilter={languageFilter}
      />
    </div>
  );
}
