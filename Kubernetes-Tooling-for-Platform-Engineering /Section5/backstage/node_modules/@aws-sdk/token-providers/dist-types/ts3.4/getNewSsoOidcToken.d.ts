import { SSOToken } from "@smithy/shared-ini-file-loader";
import { FromSsoInit } from "./fromSso";
export declare const getNewSsoOidcToken: (
  ssoToken: SSOToken,
  ssoRegion: string,
  init?: FromSsoInit
) => Promise<any>;
