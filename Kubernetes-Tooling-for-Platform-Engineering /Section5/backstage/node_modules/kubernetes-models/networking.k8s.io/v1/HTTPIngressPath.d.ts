import { IIoK8sApiNetworkingV1IngressBackend } from "./IngressBackend";
import { ModelData, Model } from "@kubernetes-models/base";
/**
 * HTTPIngressPath associates a path with a backend. Incoming urls matching the path are forwarded to the backend.
 */
export interface IHTTPIngressPath {
    /**
     * backend defines the referenced service endpoint to which the traffic will be forwarded to.
     */
    "backend": IIoK8sApiNetworkingV1IngressBackend;
    /**
     * path is matched against the path of an incoming request. Currently it can contain characters disallowed from the conventional "path" part of a URL as defined by RFC 3986. Paths must begin with a '/' and must be present when using PathType with value "Exact" or "Prefix".
     */
    "path"?: string;
    /**
     * pathType determines the interpretation of the path matching. PathType can be one of the following values: \* Exact: Matches the URL path exactly. \* Prefix: Matches based on a URL path prefix split by '/'. Matching is
     *   done on a path element by element basis. A path element refers is the
     *   list of labels in the path split by the '/' separator. A request is a
     *   match for path p if every p is an element-wise prefix of p of the
     *   request path. Note that if the last element of the path is a substring
     *   of the last element in request path, it is not a match (e.g. /foo/bar
     *   matches /foo/bar/baz, but does not match /foo/barbaz).
     * \* ImplementationSpecific: Interpretation of the Path matching is up to
     *   the IngressClass. Implementations can treat this as a separate PathType
     *   or treat it identically to Prefix or Exact path types.
     * Implementations are required to support all path types.
     *
     * Possible enum values:
     *  - `"Exact"` matches the URL path exactly and with case sensitivity.
     *  - `"ImplementationSpecific"` matching is up to the IngressClass. Implementations can treat this as a separate PathType or treat it identically to Prefix or Exact path types.
     *  - `"Prefix"` matches based on a URL path prefix split by '/'. Matching is case sensitive and done on a path element by element basis. A path element refers to the list of labels in the path split by the '/' separator. A request is a match for path p if every p is an element-wise prefix of p of the request path. Note that if the last element of the path is a substring of the last element in request path, it is not a match (e.g. /foo/bar matches /foo/bar/baz, but does not match /foo/barbaz). If multiple matching paths exist in an Ingress spec, the longest matching path is given priority. Examples: - /foo/bar does not match requests to /foo/barbaz - /foo/bar matches request to /foo/bar and /foo/bar/baz - /foo and /foo/ both match requests to /foo and /foo/. If both paths are present in an Ingress spec, the longest matching path (/foo/) is given priority.
     */
    "pathType": "Exact" | "ImplementationSpecific" | "Prefix";
}
/**
 * HTTPIngressPath associates a path with a backend. Incoming urls matching the path are forwarded to the backend.
 */
export declare class HTTPIngressPath extends Model<IHTTPIngressPath> implements IHTTPIngressPath {
    "backend": IIoK8sApiNetworkingV1IngressBackend;
    "path"?: string;
    "pathType": "Exact" | "ImplementationSpecific" | "Prefix";
    constructor(data?: ModelData<IHTTPIngressPath>);
}
export { IHTTPIngressPath as IIoK8sApiNetworkingV1HTTPIngressPath, HTTPIngressPath as IoK8sApiNetworkingV1HTTPIngressPath };
