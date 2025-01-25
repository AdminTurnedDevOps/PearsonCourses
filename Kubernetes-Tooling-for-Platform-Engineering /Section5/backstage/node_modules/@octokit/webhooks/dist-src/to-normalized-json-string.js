function toNormalizedJsonString(payload) {
  const payloadString = JSON.stringify(payload);
  return payloadString.replace(/[^\\]\\u[\da-f]{4}/g, (s) => {
    return s.substr(0, 3) + s.substr(3).toUpperCase();
  });
}
export {
  toNormalizedJsonString
};
