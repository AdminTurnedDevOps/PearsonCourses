/**
 * Provided a duration and a function, returns a new function which is called
 * `duration` milliseconds after the last call.
 */
export default function debounce<F extends (...args: any[]) => any>(duration: number, fn: F): F;
