import * as OctokitTypes from "@octokit/types";
export type AnyResponse = OctokitTypes.OctokitResponse<any>;
export type StrategyInterface = OctokitTypes.StrategyInterface<[
    Options
], [
], Authentication>;
export type EndpointDefaults = OctokitTypes.EndpointDefaults;
export type EndpointOptions = OctokitTypes.EndpointOptions;
export type RequestParameters = OctokitTypes.RequestParameters;
export type RequestInterface = OctokitTypes.RequestInterface;
export type Route = OctokitTypes.Route;
export type Options = {
    reason: string;
};
export type Authentication = {
    type: "unauthenticated";
    reason: string;
};
