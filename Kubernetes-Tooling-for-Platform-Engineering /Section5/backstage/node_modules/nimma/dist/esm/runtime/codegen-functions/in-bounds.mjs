function inBounds (value, pos, start, end, step) {
  const actualStart = start < 0 ? Math.max(0, start + value.length) : Math.min(value.length, start);
  const actualEnd = end < 0 ? Math.max(0, end + value.length) : Math.min(value.length, end);
  return pos >= actualStart && pos < actualEnd && (step === 1 || actualEnd - Math.abs(step) > 0 && (pos + start) % step === 0);
}

export { inBounds as default };
