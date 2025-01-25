import { ModelData, Model } from "@kubernetes-models/base";
/**
 * Info contains versioning information. how we'll want to distribute that information.
 */
export interface IInfo {
    "buildDate": string;
    "compiler": string;
    "gitCommit": string;
    "gitTreeState": string;
    "gitVersion": string;
    "goVersion": string;
    "major": string;
    "minor": string;
    "platform": string;
}
/**
 * Info contains versioning information. how we'll want to distribute that information.
 */
export declare class Info extends Model<IInfo> implements IInfo {
    "buildDate": string;
    "compiler": string;
    "gitCommit": string;
    "gitTreeState": string;
    "gitVersion": string;
    "goVersion": string;
    "major": string;
    "minor": string;
    "platform": string;
    constructor(data?: ModelData<IInfo>);
}
export { IInfo as IIoK8sApimachineryPkgVersionInfo, Info as IoK8sApimachineryPkgVersionInfo };
