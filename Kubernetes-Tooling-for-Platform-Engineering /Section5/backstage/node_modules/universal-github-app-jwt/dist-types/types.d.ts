export type PrivateKey = string;
export type Expiration = number;
export type Token = string;
export type Options<IdType extends number | string = number> = {
    id: IdType;
    privateKey: PrivateKey;
    now?: number;
};
export type Result<IdType extends number | string = number> = {
    appId: IdType;
    expiration: Expiration;
    token: Token;
};
export type Payload = {
    iat: number;
    exp: number;
    iss: number | string;
};
export type GetTokenOptions = {
    privateKey: PrivateKey;
    payload: Payload;
};
