// src/components/SidebarTags.jsx
import React from "react";
import { TagFilter } from "./TagFilter";

export function SidebarTags({
  allTags,
  tagFilters,
  setTagFilters,
  languageFilter,
}) {
  return (
    <div className="mt-12">
      <TagFilter
        allTags={allTags || []}
        tagFilters={tagFilters || []}
        setTagFilters={setTagFilters}
        languageFilter={languageFilter}
      />
    </div>
  );
}
