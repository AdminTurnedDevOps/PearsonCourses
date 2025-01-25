export interface IDeserializedSrn {
    shortcode: string;
    orgSlug: string;
    projectSlug?: string;
    uri?: string;
    file?: string;
    ext?: string;
}
export declare function deserializeSrn(srn: string): IDeserializedSrn;
export declare function serializeSrn({ shortcode, orgSlug, projectSlug, uri }: IDeserializedSrn): string;
