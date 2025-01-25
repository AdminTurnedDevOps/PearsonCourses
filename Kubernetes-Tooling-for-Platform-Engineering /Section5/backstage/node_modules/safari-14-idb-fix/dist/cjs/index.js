'use strict';

/**
 * https://bugs.webkit.org/show_bug.cgi?id=226547
 * Safari has a horrible bug where IDB requests can hang while the browser is starting up.
 * The only solution is to keep nudging it until it's awake.
 * This probably creates garbage, but garbage is better than totally failing.
 */
function idbReady() {
    const isSafari = !navigator.userAgentData &&
        /Safari\//.test(navigator.userAgent) &&
        !/Chrom(e|ium)\//.test(navigator.userAgent);
    // No point putting other browsers or older versions of Safari through this mess.
    if (!isSafari || !indexedDB.databases)
        return Promise.resolve();
    let intervalId;
    return new Promise((resolve) => {
        const tryIdb = () => indexedDB.databases().finally(resolve);
        intervalId = setInterval(tryIdb, 100);
        tryIdb();
    }).finally(() => clearInterval(intervalId));
}

module.exports = idbReady;
