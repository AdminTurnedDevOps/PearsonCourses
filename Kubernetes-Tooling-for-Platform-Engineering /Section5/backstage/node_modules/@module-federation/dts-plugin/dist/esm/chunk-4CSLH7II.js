var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined")
    return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// packages/dts-plugin/src/server/constant.ts
var DEFAULT_WEB_SOCKET_PORT = 16322;
var WEB_SOCKET_CONNECT_MAGIC_ID = "1hpzW-zo2z-o8io-gfmV1-2cb1d82";
var MF_SERVER_IDENTIFIER = "Module Federation Dev Server";
var WEB_CLIENT_OPTIONS_IDENTIFIER = "__WEB_CLIENT_OPTIONS__";
var DEFAULT_TAR_NAME = "@mf-types.zip";
var UpdateMode;
(function(UpdateMode2) {
  UpdateMode2["POSITIVE"] = "POSITIVE";
  UpdateMode2["PASSIVE"] = "PASSIVE";
})(UpdateMode || (UpdateMode = {}));

// packages/dts-plugin/src/server/message/Action/Update.ts
var UpdateKind;
(function(UpdateKind2) {
  UpdateKind2["UPDATE_TYPE"] = "UPDATE_TYPE";
  UpdateKind2["RELOAD_PAGE"] = "RELOAD_PAGE";
})(UpdateKind || (UpdateKind = {}));

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

// packages/dts-plugin/src/server/message/Action/AddPublisher.ts
var _AddPublisherAction = class _AddPublisherAction extends Action {
  constructor(payload) {
    super({
      payload
    }, ActionKind.ADD_PUBLISHER);
  }
};
__name(_AddPublisherAction, "AddPublisherAction");
var AddPublisherAction = _AddPublisherAction;

// packages/dts-plugin/src/server/message/Action/AddSubscriber.ts
var _AddSubscriberAction = class _AddSubscriberAction extends Action {
  constructor(payload) {
    super({
      payload
    }, ActionKind.ADD_SUBSCRIBER);
  }
};
__name(_AddSubscriberAction, "AddSubscriberAction");
var AddSubscriberAction = _AddSubscriberAction;

// packages/dts-plugin/src/server/message/Action/ExitSubscriber.ts
var _ExitSubscriberAction = class _ExitSubscriberAction extends Action {
  constructor(payload) {
    super({
      payload
    }, ActionKind.EXIT_SUBSCRIBER);
  }
};
__name(_ExitSubscriberAction, "ExitSubscriberAction");
var ExitSubscriberAction = _ExitSubscriberAction;

// packages/dts-plugin/src/server/message/Action/ExitPublisher.ts
var _ExitPublisherAction = class _ExitPublisherAction extends Action {
  constructor(payload) {
    super({
      payload
    }, ActionKind.EXIT_PUBLISHER);
  }
};
__name(_ExitPublisherAction, "ExitPublisherAction");
var ExitPublisherAction = _ExitPublisherAction;

// packages/dts-plugin/src/server/message/Action/NotifyWebClient.ts
var _NotifyWebClientAction = class _NotifyWebClientAction extends Action {
  constructor(payload) {
    super({
      payload
    }, ActionKind.NOTIFY_WEB_CLIENT);
  }
};
__name(_NotifyWebClientAction, "NotifyWebClientAction");
var NotifyWebClientAction = _NotifyWebClientAction;

// packages/dts-plugin/src/server/message/Action/UpdatePublisher.ts
var _UpdatePublisherAction = class _UpdatePublisherAction extends Action {
  constructor(payload) {
    super({
      payload
    }, ActionKind.UPDATE_PUBLISHER);
  }
};
__name(_UpdatePublisherAction, "UpdatePublisherAction");
var UpdatePublisherAction = _UpdatePublisherAction;

export {
  __spreadValues,
  __spreadProps,
  __name,
  __require,
  __objRest,
  __export,
  __publicField,
  __async,
  Message,
  DEFAULT_WEB_SOCKET_PORT,
  WEB_SOCKET_CONNECT_MAGIC_ID,
  MF_SERVER_IDENTIFIER,
  WEB_CLIENT_OPTIONS_IDENTIFIER,
  DEFAULT_TAR_NAME,
  UpdateMode,
  ActionKind,
  UpdateKind,
  AddPublisherAction,
  AddSubscriberAction,
  ExitSubscriberAction,
  ExitPublisherAction,
  NotifyWebClientAction,
  UpdatePublisherAction,
  FetchTypesAction,
  AddDynamicRemoteAction
};
