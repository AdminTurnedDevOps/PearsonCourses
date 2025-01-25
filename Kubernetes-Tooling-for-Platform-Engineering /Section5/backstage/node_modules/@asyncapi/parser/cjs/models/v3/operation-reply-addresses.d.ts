import { Collection } from '../collection';
import type { OperationReplyAddressInterface } from '../operation-reply-address';
import type { OperationReplyAddressesInterface } from '../operation-reply-addresses';
export declare class OperationReplyAddresses extends Collection<OperationReplyAddressInterface> implements OperationReplyAddressesInterface {
    get(id: string): OperationReplyAddressInterface | undefined;
}
