export function parseUrlVariables(str) {
    if (typeof str !== 'string')
        return [];
    const variables = str.match(/{(.+?)}/g);
    if (!variables || variables.length === 0)
        return [];
    return variables.map(v => v.slice(1, -1));
}
