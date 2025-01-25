'use strict';

const lastUpdatedRecord = {};
class BuildMetadataStorage {
  entityUid;
  lastUpdatedRecord;
  constructor(entityUid) {
    this.entityUid = entityUid;
    this.lastUpdatedRecord = lastUpdatedRecord;
  }
  setLastUpdated() {
    this.lastUpdatedRecord[this.entityUid] = Date.now();
  }
  getLastUpdated() {
    return this.lastUpdatedRecord[this.entityUid];
  }
}
const shouldCheckForUpdate = (entityUid) => {
  const lastUpdated = new BuildMetadataStorage(entityUid).getLastUpdated();
  if (lastUpdated) {
    if (Date.now() - lastUpdated < 60 * 1e3) {
      return false;
    }
  }
  return true;
};

exports.BuildMetadataStorage = BuildMetadataStorage;
exports.shouldCheckForUpdate = shouldCheckForUpdate;
//# sourceMappingURL=BuildMetadataStorage.cjs.js.map
