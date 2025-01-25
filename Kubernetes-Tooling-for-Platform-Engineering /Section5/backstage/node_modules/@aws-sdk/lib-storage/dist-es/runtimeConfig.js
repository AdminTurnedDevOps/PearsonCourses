import { lstatSync } from "fs";
import { ClientSharedValues } from "./runtimeConfig.shared";
export const ClientDefaultValues = {
    ...ClientSharedValues,
    runtime: "node",
    lstatSync,
};
