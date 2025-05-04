// src/components/TagFilter.jsx
import React from "react";
import { getTagButtonClass } from "../utils/tagStyleHelpers";
import { motion, AnimatePresence } from "framer-motion";

export function TagFilter({
  allTags,
  tagFilters,
  setTagFilters,
  languageFilter,
}) {
  const toggleTag = (tag) => {
    setTagFilters((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const usageByTag = allTags.reduce((acc, { name, count }) => {
    acc[name] = count;
    return acc;
  }, {});
  const maxUsage = Math.max(...Object.values(usageByTag), 1);

  return (
    <section className="mb-6 relative">
      {/* Reset button in top-right */}
      {tagFilters.length > 0 && (
        <button
          onClick={() => setTagFilters([])}
          className="absolute right-0 -top-5 text-sm text-alertError hover:text-alertErrorHover"
        >
          ✕ сбросить метки
        </button>
      )}

      {/* Language hint */}
      {languageFilter !== "ALL" && (
        <p className="text-sm text-textSecondary mb-2 text-center">
          Показаны теги для языка:{" "}
          <strong>
            {languageFilter === "RU"
              ? "русский"
              : languageFilter === "PL"
              ? "польский"
              : "белорусский"}
          </strong>
        </p>
      )}

      {/* Tag cloud */}
      <div className="flex flex-wrap justify-center gap-x-3 gap-y-2 pt-1 max-w-full">
        <AnimatePresence mode="popLayout">
          {allTags.map(({ name, language }) => {
            const isActive = tagFilters.includes(name);
            const usage = usageByTag[name] || 1;
            const normalized = usage / maxUsage;
            const fontSize = 0.75 + normalized * 0.4;
            const opacity = 0.4 + normalized * 0.6;

            const className = [
              "px-2 py-1 text-sm rounded-full shrink-0 transition-colors duration-200",
              getTagButtonClass(language, isActive),
            ].join(" ");

            return (
              <motion.button
                key={`${language}-${name}`}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity, scale: 1 }}
                whileHover={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.25 }}
                onClick={() => toggleTag(name)}
                className={className}
                style={{
                  opacity,
                  maxWidth: "100%",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.25rem",
                  fontSize: `${fontSize}rem`,
                }}
              >
                <span>#{name}</span>
                {isActive ? (
                  <span className="text-xs opacity-60 ml-1">×</span>
                ) : (
                  <span className="text-xs opacity-0 ml-1 select-none">×</span>
                )}
              </motion.button>
            );
          })}
        </AnimatePresence>
      </div>
    </section>
  );
}
