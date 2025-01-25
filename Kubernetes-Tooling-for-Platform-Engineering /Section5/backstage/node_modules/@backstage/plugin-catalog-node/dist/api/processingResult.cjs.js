'use strict';

var errors = require('@backstage/errors');

const processingResult = Object.freeze({
  /**
   * Associates a NotFoundError with the processing state of the current entity.
   */
  notFoundError(atLocation, message) {
    return {
      type: "error",
      location: atLocation,
      error: new errors.NotFoundError(message)
    };
  },
  /**
   * Associates an InputError with the processing state of the current entity.
   */
  inputError(atLocation, message) {
    return {
      type: "error",
      location: atLocation,
      error: new errors.InputError(message)
    };
  },
  /**
   * Associates a general Error with the processing state of the current entity.
   */
  generalError(atLocation, message) {
    return { type: "error", location: atLocation, error: new Error(message) };
  },
  /**
   * Emits a location. In effect, this is analogous to emitting a Location kind
   * child entity. This is commonly used in discovery processors. Do not use
   * this while processing Location entities.
   */
  location(newLocation) {
    return { type: "location", location: newLocation };
  },
  /**
   * Emits a child of the current entity, associated with a certain location.
   */
  entity(atLocation, newEntity) {
    return { type: "entity", location: atLocation, entity: newEntity };
  },
  /**
   * Emits a relation owned by the current entity. The relation does not have to
   * start or end at the current entity. The relation only lives for as long as
   * the current entity lives.
   */
  relation(spec) {
    return { type: "relation", relation: spec };
  },
  /**
   * Associates the given refresh key with the current entity. The effect of
   * this is that the entity will be marked for refresh when such requests are
   * made.
   */
  refresh(key) {
    return { type: "refresh", key };
  }
});

exports.processingResult = processingResult;
//# sourceMappingURL=processingResult.cjs.js.map
