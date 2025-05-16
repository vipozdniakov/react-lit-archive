// src/components/TagFilter.jsx
import { AnimatePresence, motion } from "framer-motion";
import React, { useMemo } from "react";
import { calculateOpacity } from "../utils/calculateOpacity";
import { getTagButtonClass } from "../utils/tagStyleHelpers";

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

  const usageByTag = useMemo(() => {
    if (!Array.isArray(allTags)) return {}; // safe default
    // Calculate the usage of each tag
    return allTags.reduce((acc, { name, count }) => {
      acc[name] = count;
      return acc;
    }, {});
  }, [allTags]);

  const maxUsage = Math.max(...Object.values(usageByTag), 1);

  return (
    <section className="mb-6 relative">
      {/* Reset button in top-right */}
      {Array.isArray(tagFilters) && tagFilters.length > 0 && (
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

      {/* Tag cloud container with scroll + shadow hint */}
      {/* Outer container */}
      <div className="relative max-h-[60vh] overflow-hidden">
        {/* Scrollable area */}
        <div className="scroll-area max-h-[60vh] overflow-y-auto pr-1">
          <div className="flex flex-wrap justify-center gap-x-3 gap-y-2 pt-1 max-w-full pb-6">
            <AnimatePresence mode="popLayout">
              {allTags.map(({ name, language, count }) => {
                const isActive = tagFilters.includes(name);
                const normalized = count / maxUsage;
                const fontSize = 0.75 + normalized * 0.4;
                const opacity = isActive
                  ? 1
                  : calculateOpacity(count, maxUsage);

                const className = [
                  "px-2 py-1 text-sm rounded-full shrink-0 transition-colors duration-200",
                  getTagButtonClass(language, isActive),
                ].join(" ");

                return (
                  <motion.button
                    key={`${language}-${name}`}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: isActive ? 1 : opacity, scale: 1 }}
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
                      <span className="text-xs opacity-0 ml-1 select-none">
                        ×
                      </span>
                    )}
                  </motion.button>
                );
              })}
            </AnimatePresence>
          </div>
          {/* Subtle bottom gradient to suggest more tags */}
        </div>
        <div className="pointer-events-none absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-gray-50 to-transparent" />
      </div>
    </section>
  );
}
