var { isPresent, isDefined, isFilled } = require("ts-is-present")

var exampleData = [
    'alpha',
    undefined,
    'beta',
    null,
    'gamma'
];

console.log(`isPresent: ${exampleData.filter(isPresent)}`);
console.log(`isDefined: ${exampleData.filter(isDefined)}`);
console.log(`isFilled: ${exampleData.filter(isFilled)}`);