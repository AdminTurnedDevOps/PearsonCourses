const getAlgorithm = (signature) => {
  return signature.startsWith("sha256=") ? "sha256" : "sha1";
};
export {
  getAlgorithm
};
