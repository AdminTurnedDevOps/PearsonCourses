'use strict';

var share = require('./share.cjs.js');

const ShareUtils = {
    getRegisteredShare: share.getRegisteredShare,
    getGlobalShareScope: share.getGlobalShareScope
};
const GlobalUtils = {
    Global: share.Global,
    nativeGlobal: share.nativeGlobal,
    resetFederationGlobalInfo: share.resetFederationGlobalInfo,
    getGlobalFederationInstance: share.getGlobalFederationInstance,
    setGlobalFederationInstance: share.setGlobalFederationInstance,
    getGlobalFederationConstructor: share.getGlobalFederationConstructor,
    setGlobalFederationConstructor: share.setGlobalFederationConstructor,
    getInfoWithoutType: share.getInfoWithoutType,
    getGlobalSnapshot: share.getGlobalSnapshot,
    getTargetSnapshotInfoByModuleInfo: share.getTargetSnapshotInfoByModuleInfo,
    getGlobalSnapshotInfoByModuleInfo: share.getGlobalSnapshotInfoByModuleInfo,
    setGlobalSnapshotInfoByModuleInfo: share.setGlobalSnapshotInfoByModuleInfo,
    addGlobalSnapshot: share.addGlobalSnapshot,
    getRemoteEntryExports: share.getRemoteEntryExports,
    registerGlobalPlugins: share.registerGlobalPlugins,
    getGlobalHostPlugins: share.getGlobalHostPlugins,
    getPreloaded: share.getPreloaded,
    setPreloaded: share.setPreloaded
};
var helpers = {
    global: GlobalUtils,
    share: ShareUtils
};

module.exports = helpers;
