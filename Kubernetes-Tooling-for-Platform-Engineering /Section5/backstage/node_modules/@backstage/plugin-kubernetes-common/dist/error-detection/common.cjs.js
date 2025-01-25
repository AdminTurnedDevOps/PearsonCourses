'use strict';

const detectErrorsInObjects = (objects, errorMappers) => {
  return objects.flatMap((o) => {
    return errorMappers.flatMap((em) => em.detectErrors(o));
  });
};

exports.detectErrorsInObjects = detectErrorsInObjects;
//# sourceMappingURL=common.cjs.js.map
