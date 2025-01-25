import type { moduleFederationPlugin } from '@module-federation/sdk';
interface BabelPluginOptions {
    hook_id: string;
    import_pkg: string;
    attribute: string;
    name: string;
    exposes: moduleFederationPlugin.ModuleFederationPluginOptions['exposes'];
}
declare const _default: (babel: {
    types: any;
}, options: BabelPluginOptions) => {
    visitor?: undefined;
} | {
    visitor: {
        ImportDeclaration(nodePath: {
            node: {
                source: {
                    value: any;
                };
                specifiers: any;
            };
        }, state: {
            file: {
                opts: {
                    filename: any;
                };
            };
        }): void;
        CallExpression(nodePath: {
            node: {
                callee: any;
                arguments: string | any[];
            };
        }): void;
    };
};
export default _default;
