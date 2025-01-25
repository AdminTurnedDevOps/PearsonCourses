var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

// packages/dts-plugin/src/runtime-plugins/dynamic-remote-type-hints-plugin.ts
var dynamic_remote_type_hints_plugin_exports = {};
__export(dynamic_remote_type_hints_plugin_exports, {
  default: () => dynamic_remote_type_hints_plugin_default
});
module.exports = __toCommonJS(dynamic_remote_type_hints_plugin_exports);

// packages/dts-plugin/src/server/createWebsocket.ts
var import_isomorphic_ws = __toESM(require("isomorphic-ws"));

// packages/dts-plugin/src/server/constant.ts
var DEFAULT_WEB_SOCKET_PORT = 16322;
var WEB_SOCKET_CONNECT_MAGIC_ID = "1hpzW-zo2z-o8io-gfmV1-2cb1d82";
var UpdateMode;
(function(UpdateMode2) {
  UpdateMode2["POSITIVE"] = "POSITIVE";
  UpdateMode2["PASSIVE"] = "PASSIVE";
})(UpdateMode || (UpdateMode = {}));

// packages/dts-plugin/src/server/createWebsocket.ts
function createWebsocket() {
  return new import_isomorphic_ws.default(`ws://127.0.0.1:${DEFAULT_WEB_SOCKET_PORT}?WEB_SOCKET_CONNECT_MAGIC_ID=${WEB_SOCKET_CONNECT_MAGIC_ID}`);
}
__name(createWebsocket, "createWebsocket");

// packages/dts-plugin/src/server/message/Message.ts
var _Message = class _Message {
  constructor(type, kind) {
    __publicField(this, "type");
    __publicField(this, "kind");
    __publicField(this, "time");
    this.type = type;
    this.kind = kind;
    this.time = Date.now();
  }
};
__name(_Message, "Message");
var Message = _Message;

// packages/dts-plugin/src/server/message/Action/Action.ts
var ActionKind;
(function(ActionKind2) {
  ActionKind2["ADD_SUBSCRIBER"] = "ADD_SUBSCRIBER";
  ActionKind2["EXIT_SUBSCRIBER"] = "EXIT_SUBSCRIBER";
  ActionKind2["ADD_PUBLISHER"] = "ADD_PUBLISHER";
  ActionKind2["UPDATE_PUBLISHER"] = "UPDATE_PUBLISHER";
  ActionKind2["NOTIFY_SUBSCRIBER"] = "NOTIFY_SUBSCRIBER";
  ActionKind2["EXIT_PUBLISHER"] = "EXIT_PUBLISHER";
  ActionKind2["ADD_WEB_CLIENT"] = "ADD_WEB_CLIENT";
  ActionKind2["NOTIFY_WEB_CLIENT"] = "NOTIFY_WEB_CLIENT";
  ActionKind2["FETCH_TYPES"] = "FETCH_TYPES";
  ActionKind2["ADD_DYNAMIC_REMOTE"] = "ADD_DYNAMIC_REMOTE";
})(ActionKind || (ActionKind = {}));
var _Action = class _Action extends Message {
  constructor(content, kind) {
    super("Action", kind);
    __publicField(this, "payload");
    const { payload } = content;
    this.payload = payload;
  }
};
__name(_Action, "Action");
var Action = _Action;

// packages/dts-plugin/src/server/message/Action/Update.ts
var UpdateKind;
(function(UpdateKind2) {
  UpdateKind2["UPDATE_TYPE"] = "UPDATE_TYPE";
  UpdateKind2["RELOAD_PAGE"] = "RELOAD_PAGE";
})(UpdateKind || (UpdateKind = {}));

// packages/dts-plugin/src/server/message/Action/FetchTypes.ts
var _FetchTypesAction = class _FetchTypesAction extends Action {
  constructor(payload) {
    super({
      payload
    }, ActionKind.FETCH_TYPES);
  }
};
__name(_FetchTypesAction, "FetchTypesAction");
var FetchTypesAction = _FetchTypesAction;

// packages/dts-plugin/src/server/message/Action/AddDynamicRemote.ts
var _AddDynamicRemoteAction = class _AddDynamicRemoteAction extends Action {
  constructor(payload) {
    super({
      payload
    }, ActionKind.ADD_DYNAMIC_REMOTE);
  }
};
__name(_AddDynamicRemoteAction, "AddDynamicRemoteAction");
var AddDynamicRemoteAction = _AddDynamicRemoteAction;

// packages/dts-plugin/src/dev-worker/utils.ts
var DEFAULT_LOCAL_IPS = [
  "localhost",
  "127.0.0.1"
];
function getIpFromEntry(entry, ipv4) {
  let ip;
  entry.replace(/https?:\/\/([0-9|.]+|localhost):/, (str, matched) => {
    ip = matched;
    return str;
  });
  if (ip) {
    return DEFAULT_LOCAL_IPS.includes(ip) ? ipv4 : ip;
  }
}
__name(getIpFromEntry, "getIpFromEntry");

// packages/dts-plugin/src/runtime-plugins/dynamic-remote-type-hints-plugin.ts
var PLUGIN_NAME = "dynamic-remote-type-hints-plugin";
function dynamicRemoteTypeHintsPlugin() {
  let ws = createWebsocket();
  let isConnected = false;
  ws.onopen = () => {
    isConnected = true;
  };
  ws.onerror = (err) => {
    console.error(`[ ${PLUGIN_NAME} ] err: ${err}`);
  };
  return {
    name: "dynamic-remote-type-hints-plugin",
    registerRemote(args) {
      const { remote, origin } = args;
      try {
        if (!isConnected) {
          return args;
        }
        if (!("entry" in remote)) {
          return args;
        }
        const defaultIpV4 = typeof FEDERATION_IPV4 === "string" ? FEDERATION_IPV4 : "127.0.0.1";
        const remoteIp = getIpFromEntry(remote.entry, defaultIpV4);
        const remoteInfo = {
          name: remote.name,
          url: remote.entry,
          alias: remote.alias || remote.name
        };
        if (remoteIp) {
          ws.send(JSON.stringify(new AddDynamicRemoteAction({
            remoteIp,
            remoteInfo,
            name: origin.name,
            ip: defaultIpV4
          })));
        }
        ws.send(JSON.stringify(new FetchTypesAction({
          name: origin.name,
          ip: defaultIpV4,
          remoteInfo
        })));
        return args;
      } catch (err) {
        console.error(new Error(err));
        return args;
      }
    }
  };
}
__name(dynamicRemoteTypeHintsPlugin, "dynamicRemoteTypeHintsPlugin");
var dynamic_remote_type_hints_plugin_default = dynamicRemoteTypeHintsPlugin;
