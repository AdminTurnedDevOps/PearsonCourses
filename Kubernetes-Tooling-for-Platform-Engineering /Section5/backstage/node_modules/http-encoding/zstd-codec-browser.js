// This makes importing zstd-codec asynchronous (because of dynamic import).
// This isn't strictly necessary, but it makes it easier to load it optionally
// in Webpack builds.
module.exports = import("zstd-codec/index.js").then((m) => ({
    ZstdCodec: m.default.ZstdCodec
}));

// We can't do this in TS because it compiles dynamic async import to a sync
// require. We can't do this node because older node doesn't support async
// requires, so instead we load it in a browser-only wrapper here.