const detectErrorsInObjects = (objects, errorMappers) => {
  return objects.flatMap((o) => {
    return errorMappers.flatMap((em) => em.detectErrors(o));
  });
};

export { detectErrorsInObjects };
//# sourceMappingURL=common.esm.js.map
