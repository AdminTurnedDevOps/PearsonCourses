import { JSONSchema7 } from 'json-schema';
import { Dictionary } from './basic';
import { IShareableNode, INode, INodeExample, INodeExternalExample, IComponentNode } from './graph';
import { IServer } from './servers';
/**
 * HTTP Service
 */
export interface IHttpService extends INode, IShareableNode {
    name: string;
    version: string;
    servers?: IServer[];
    security?: HttpSecurityScheme[];
    securitySchemes?: HttpSecurityScheme[];
    termsOfService?: string;
    contact?: {
        name?: string;
        url?: string;
        email?: string;
    };
    license?: {
        name: string;
        url?: string;
        identifier?: string;
    };
    logo?: {
        altText: string;
        href?: string;
        url?: string;
        backgroundColor?: string;
    };
    internal?: boolean;
}
export interface IBundledHttpService extends Omit<IHttpService, 'securitySchemes'> {
    operations: IHttpOperation<true>[];
    components: {
        schemas: (IComponentNode & JSONSchema7)[];
        responses: (IComponentNode & (IHttpOperationResponse<true> | Reference))[];
        path: (IComponentNode & (IHttpHeaderParam<true> | Reference))[];
        query: (IComponentNode & (IHttpQueryParam<true> | Reference))[];
        header: (IComponentNode & (IHttpHeaderParam<true> | Reference))[];
        cookie: (IComponentNode & (IHttpCookieParam<true> | Reference))[];
        examples: (IComponentNode & (INodeExample | INodeExternalExample | Reference))[];
        requestBodies: (IComponentNode & (IHttpOperationRequestBody<true> | Reference))[];
        securitySchemes: (IComponentNode & (HttpSecurityScheme | Reference))[];
    };
}
/**
 * HTTP Operation
 */
export interface IHttpOperation<Bundle extends boolean = false> extends INode, IShareableNode {
    method: string;
    path: string;
    request?: Bundle extends true ? IHttpOperationRequest<true> | Reference : IHttpOperationRequest<false>;
    responses: (Bundle extends true ? IHttpOperationResponse<true> | (Pick<IHttpOperationResponse, 'code'> & Reference) : IHttpOperationResponse<false>)[];
    servers?: IServer[];
    callbacks?: IHttpCallbackOperation[];
    security?: HttpSecurityScheme[][];
    deprecated?: boolean;
    internal?: boolean;
}
export declare type IHttpCallbackOperation = Omit<IHttpOperation<false>, 'servers' | 'security' | 'callbacks'> & {
    callbackName: string;
};
export interface IHttpOperationRequest<Bundle extends boolean = false> {
    path?: (Bundle extends true ? IHttpPathParam<true> | Reference : IHttpPathParam<false>)[];
    query?: (Bundle extends true ? IHttpQueryParam<true> | Reference : IHttpQueryParam<false>)[];
    headers?: (Bundle extends true ? IHttpHeaderParam<true> | Reference : IHttpHeaderParam<false>)[];
    cookie?: (Bundle extends true ? IHttpCookieParam<true> | Reference : IHttpCookieParam<false>)[];
    unknown?: Reference[];
    body?: Bundle extends true ? IHttpOperationRequestBody<true> | Reference : IHttpOperationRequestBody<false>;
}
export interface IHttpOperationRequestBody<Bundle extends boolean = false> extends IShareableNode {
    contents?: IMediaTypeContent<Bundle>[];
    required?: boolean;
    description?: string;
}
export interface IHttpOperationResponse<Bundle extends boolean = false> extends IShareableNode {
    code: string;
    contents?: IMediaTypeContent<Bundle>[];
    headers?: (Bundle extends true ? IHttpHeaderParam<true> | (Pick<IHttpHeaderParam, 'name'> & Reference) : IHttpHeaderParam<false>)[];
    description?: string;
}
/**
 * HTTP Params
 */
export interface IHttpParam<Bundle extends boolean = false> extends IHttpContent<Bundle>, IShareableNode {
    name: string;
    style: HttpParamStyles;
    description?: string;
    explode?: boolean;
    required?: boolean;
    deprecated?: boolean;
}
export declare enum HttpParamStyles {
    Simple = "simple",
    Matrix = "matrix",
    Label = "label",
    Form = "form",
    CommaDelimited = "commaDelimited",
    SpaceDelimited = "spaceDelimited",
    PipeDelimited = "pipeDelimited",
    DeepObject = "deepObject"
}
export interface IHttpPathParam<Bundle extends boolean = false> extends IHttpParam<Bundle> {
    style: HttpParamStyles.Label | HttpParamStyles.Matrix | HttpParamStyles.Simple;
}
export interface IHttpQueryParam<Bundle extends boolean = false> extends IHttpParam<Bundle> {
    style: HttpParamStyles.Form | HttpParamStyles.CommaDelimited | HttpParamStyles.SpaceDelimited | HttpParamStyles.PipeDelimited | HttpParamStyles.DeepObject;
    allowEmptyValue?: boolean;
    allowReserved?: boolean;
}
export interface IHttpHeaderParam<Bundle extends boolean = false> extends IHttpParam<Bundle> {
    style: HttpParamStyles.Simple;
}
export interface IHttpCookieParam<Bundle extends boolean = false> extends IHttpParam<Bundle> {
    style: HttpParamStyles.Form;
}
/**
 * HTTP Content
 */
export interface IHttpContent<Bundle extends boolean = false> extends IShareableNode {
    schema?: JSONSchema7;
    examples?: (Bundle extends true ? INodeExample | INodeExternalExample | (Pick<INodeExample, 'key'> & Reference) : INodeExample | INodeExternalExample)[];
    encodings?: IHttpEncoding<Bundle>[];
}
export interface IMediaTypeContent<Bundle extends boolean = false> extends IHttpContent<Bundle> {
    mediaType: string;
}
export interface IHttpEncoding<Bundle extends boolean = false> {
    property: string;
    style: HttpParamStyles.Form | HttpParamStyles.CommaDelimited | HttpParamStyles.SpaceDelimited | HttpParamStyles.PipeDelimited | HttpParamStyles.DeepObject;
    headers?: (Bundle extends true ? IHttpHeaderParam<true> | Reference : IHttpHeaderParam<false>)[];
    mediaType?: string;
    explode?: boolean;
    allowReserved?: boolean;
}
/**
 * HTTP Security
 */
export declare type HttpSecurityScheme = IApiKeySecurityScheme | IBearerSecurityScheme | IBasicSecurityScheme | IOauth2SecurityScheme | IOpenIdConnectSecurityScheme | IMutualTLSSecurityScheme;
interface ISecurityScheme extends IShareableNode {
    key: string;
    description?: string;
}
export interface IApiKeySecurityScheme extends ISecurityScheme {
    type: 'apiKey';
    name: string;
    in: 'query' | 'header' | 'cookie';
}
export interface IBearerSecurityScheme extends ISecurityScheme {
    type: 'http';
    scheme: 'bearer';
    bearerFormat?: string;
}
export interface IBasicSecurityScheme extends ISecurityScheme {
    type: 'http';
    scheme: 'basic' | 'digest';
}
export interface IOpenIdConnectSecurityScheme extends ISecurityScheme {
    type: 'openIdConnect';
    openIdConnectUrl: string;
}
export interface IOauth2SecurityScheme extends ISecurityScheme {
    type: 'oauth2';
    flows: IOauthFlowObjects;
}
export interface IMutualTLSSecurityScheme extends ISecurityScheme {
    type: 'mutualTLS';
}
export interface IOauthFlowObjects {
    implicit?: IOauth2ImplicitFlow;
    password?: IOauth2PasswordFlow;
    clientCredentials?: IOauth2ClientCredentialsFlow;
    authorizationCode?: IOauth2AuthorizationCodeFlow;
}
export interface IOauth2Flow {
    scopes: Dictionary<string, string>;
    refreshUrl?: string;
}
export interface IOauth2ImplicitFlow extends IOauth2Flow {
    authorizationUrl: string;
}
export interface IOauth2AuthorizationCodeFlow extends IOauth2Flow {
    authorizationUrl: string;
    tokenUrl: string;
}
export interface IOauth2PasswordFlow extends IOauth2Flow {
    tokenUrl: string;
}
export interface IOauth2ClientCredentialsFlow extends IOauth2Flow {
    tokenUrl: string;
}
export declare type Reference = {
    $ref: string;
    summary?: string;
    description?: string;
};
export interface Extensions {
    [key: string]: unknown;
}
export {};
