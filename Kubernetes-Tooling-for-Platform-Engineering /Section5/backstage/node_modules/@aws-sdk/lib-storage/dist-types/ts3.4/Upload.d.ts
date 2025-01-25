import { CompleteMultipartUploadCommandOutput } from "@aws-sdk/client-s3";
import { EventEmitter } from "events";
import { BodyDataTypes, Options, Progress } from "./types";
export interface RawDataPart {
  partNumber: number;
  data: BodyDataTypes;
  lastPart?: boolean;
}
export declare class Upload extends EventEmitter {
  private static MIN_PART_SIZE;
  private MAX_PARTS;
  private readonly queueSize;
  private readonly partSize;
  private readonly leavePartsOnError;
  private readonly tags;
  private readonly client;
  private readonly params;
  private totalBytes?;
  private bytesUploadedSoFar;
  private abortController;
  private concurrentUploaders;
  private createMultiPartPromise?;
  private abortMultipartUploadCommand;
  private uploadedParts;
  private uploadEnqueuedPartsCount;
  uploadId?: string;
  uploadEvent?: string;
  private isMultiPart;
  private singleUploadResult?;
  private sent;
  constructor(options: Options);
  abort(): Promise<void>;
  done(): Promise<CompleteMultipartUploadCommandOutput>;
  on(event: "httpUploadProgress", listener: (progress: Progress) => void): this;
  private __uploadUsingPut;
  private __createMultipartUpload;
  private __doConcurrentUpload;
  private __doMultipartUpload;
  private markUploadAsAborted;
  private __notifyProgress;
  private __abortTimeout;
  private __validateInput;
}
