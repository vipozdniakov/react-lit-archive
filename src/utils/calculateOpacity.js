// src/utils/calculateOpacity.js

const BASE_OPACITY = 0.4;

export function calculateOpacity(count, total) {
  const proportion = count / total;
  return BASE_OPACITY + proportion * (1 - BASE_OPACITY);
}
