import { PutObjectCommandInput, S3Client, Tag } from "@aws-sdk/client-s3";
import { AbortController } from "@smithy/types";
export interface Progress {
  loaded?: number;
  total?: number;
  part?: number;
  Key?: string;
  Bucket?: string;
}
export type BodyDataTypes = PutObjectCommandInput["Body"];
export type ServiceClients = S3Client;
export interface Configuration {
  queueSize: number;
  partSize: number;
  leavePartsOnError: boolean;
  tags: Tag[];
  abortController?: AbortController;
}
export interface Options extends Partial<Configuration> {
  params: PutObjectCommandInput;
  client: S3Client;
}
