import { ModelData, Model } from "@kubernetes-models/base";
/**
 * ServerAddressByClientCIDR helps the client to determine the server address that they should use, depending on the clientCIDR that they match.
 */
export interface IServerAddressByClientCIDR {
    /**
     * The CIDR with which clients can match their IP to figure out the server address that they should use.
     */
    "clientCIDR": string;
    /**
     * Address of this server, suitable for a client that matches the above CIDR. This can be a hostname, hostname:port, IP or IP:port.
     */
    "serverAddress": string;
}
/**
 * ServerAddressByClientCIDR helps the client to determine the server address that they should use, depending on the clientCIDR that they match.
 */
export declare class ServerAddressByClientCIDR extends Model<IServerAddressByClientCIDR> implements IServerAddressByClientCIDR {
    "clientCIDR": string;
    "serverAddress": string;
    constructor(data?: ModelData<IServerAddressByClientCIDR>);
}
export { IServerAddressByClientCIDR as IIoK8sApimachineryPkgApisMetaV1ServerAddressByClientCIDR, ServerAddressByClientCIDR as IoK8sApimachineryPkgApisMetaV1ServerAddressByClientCIDR };
