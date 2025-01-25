import { ComponentType, ReactNode } from 'react';
export declare type GraphiQLPlugin = {
    /**
     * A component that renders content into the plugin pane.
     */
    content: ComponentType;
    /**
     * A component that renders an icon that will be shown inside a button that
     * toggles the plugin visibility.
     */
    icon: ComponentType;
    /**
     * The unique title of the plugin. If two plugins are present with the same
     * title the provider component will throw an error.
     */
    title: string;
};
export declare const DOC_EXPLORER_PLUGIN: GraphiQLPlugin;
export declare const HISTORY_PLUGIN: GraphiQLPlugin;
export declare type PluginContextType = {
    /**
     * A list of all current plugins, including the built-in ones (the doc
     * explorer and the history).
     */
    plugins: GraphiQLPlugin[];
    /**
     * Defines the plugin which is currently visible.
     * @param plugin The plugin that should become visible. You can either pass
     * the plugin object (has to be referentially equal to the one passed as
     * prop) or the plugin title as string. If `null` is passed, no plugin will
     * be visible.
     */
    setVisiblePlugin(plugin: GraphiQLPlugin | string | null): void;
    /**
     * The plugin which is currently visible.
     */
    visiblePlugin: GraphiQLPlugin | null;
};
export declare const PluginContext: import("react").Context<PluginContextType | null>;
export declare type PluginContextProviderProps = {
    children: ReactNode;
    /**
     * Invoked when the visibility state of any plugin changes.
     * @param visiblePlugin The plugin object that is now visible. If no plugin
     * is visible, the function will be invoked with `null`.
     */
    onTogglePluginVisibility?(visiblePlugin: GraphiQLPlugin | null): void;
    /**
     * This props accepts a list of plugins that will be shown in addition to the
     * built-in ones (the doc explorer and the history).
     */
    plugins?: GraphiQLPlugin[];
    /**
     * This prop can be used to set the visibility state of plugins. Every time
     * this prop changes, the visibility state will be overridden. Note that the
     * visibility state can change in between these updates, for example by
     * calling the `setVisiblePlugin` function provided by the context.
     */
    visiblePlugin?: GraphiQLPlugin | string;
};
export declare function PluginContextProvider(props: PluginContextProviderProps): import("react/jsx-runtime").JSX.Element;
export declare const usePluginContext: {
    (options: {
        nonNull: true;
        caller?: Function | undefined;
    }): PluginContextType;
    (options: {
        nonNull?: boolean | undefined;
        caller?: Function | undefined;
    }): PluginContextType | null;
    (): PluginContextType | null;
};
