'use strict';

function runPeriodically(fn, delayMs) {
  let cancel;
  let cancelled = false;
  const cancellationPromise = new Promise((resolve) => {
    cancel = () => {
      resolve();
      cancelled = true;
    };
  });
  const startRefresh = async () => {
    while (!cancelled) {
      try {
        await fn();
      } catch {
      }
      await Promise.race([
        new Promise((resolve) => setTimeout(resolve, delayMs)),
        cancellationPromise
      ]);
    }
  };
  startRefresh();
  return cancel;
}

exports.runPeriodically = runPeriodically;
//# sourceMappingURL=runPeriodically.cjs.js.map
