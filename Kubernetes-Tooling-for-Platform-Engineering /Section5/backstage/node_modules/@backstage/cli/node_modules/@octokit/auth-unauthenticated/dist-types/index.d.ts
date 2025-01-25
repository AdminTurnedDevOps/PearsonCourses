import { StrategyInterface, Options, Authentication } from "./types";
export type Types = {
    StrategyOptions: Options;
    AuthOptions: never;
    Authentication: Authentication;
};
export declare const createUnauthenticatedAuth: StrategyInterface;
