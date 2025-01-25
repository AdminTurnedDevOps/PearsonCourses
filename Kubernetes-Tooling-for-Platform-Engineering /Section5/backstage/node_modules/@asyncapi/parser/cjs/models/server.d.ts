import type { BaseModel } from './base';
import type { ChannelsInterface } from './channels';
import type { MessagesInterface } from './messages';
import type { BindingsMixinInterface, DescriptionMixinInterface, ExtensionsMixinInterface, TagsMixinInterface } from './mixins';
import type { OperationsInterface } from './operations';
import type { ServerVariablesInterface } from './server-variables';
import type { SecurityRequirementsInterface } from './security-requirements';
export interface ServerInterface extends BaseModel, DescriptionMixinInterface, BindingsMixinInterface, ExtensionsMixinInterface, TagsMixinInterface {
    id(): string;
    url(): string;
    host(): string;
    hasPathname(): boolean;
    pathname(): string | undefined;
    protocol(): string;
    protocolVersion(): string | undefined;
    hasProtocolVersion(): boolean;
    channels(): ChannelsInterface;
    operations(): OperationsInterface;
    messages(): MessagesInterface;
    variables(): ServerVariablesInterface;
    security(): SecurityRequirementsInterface[];
}
