export function getRedundantProps(arr = [], obj = {}) {
    if (!arr.length)
        return Object.keys(obj);
    return Object.keys(obj).filter(val => {
        return !arr.includes(val);
    });
}
