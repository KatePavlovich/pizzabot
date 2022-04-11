export const getBoard = ([ width, height ]) =>
  Array(Number(height)).fill(1).map(() => Array.from({ length: Number(width) }, (_, k) => k));
