import {
  getIpFromEntry
} from "./chunk-QAUALHAU.js";
import {
  AddDynamicRemoteAction,
  DEFAULT_WEB_SOCKET_PORT,
  FetchTypesAction,
  WEB_SOCKET_CONNECT_MAGIC_ID,
  __name
} from "./chunk-4CSLH7II.js";

// packages/dts-plugin/src/server/createWebsocket.ts
import WebSocket from "isomorphic-ws";
function createWebsocket() {
  return new WebSocket(`ws://127.0.0.1:${DEFAULT_WEB_SOCKET_PORT}?WEB_SOCKET_CONNECT_MAGIC_ID=${WEB_SOCKET_CONNECT_MAGIC_ID}`);
}
__name(createWebsocket, "createWebsocket");

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
export {
  dynamic_remote_type_hints_plugin_default as default
};
