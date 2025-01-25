import { GraphQLArgument } from 'graphql';
import './argument.css';
declare type ArgumentProps = {
    /**
     * The argument that should be rendered.
     */
    arg: GraphQLArgument;
    /**
     * Toggle if the default value for the argument is shown (if there is one)
     * @default false
     */
    showDefaultValue?: boolean;
    /**
     * Toggle whether to render the whole argument including description and
     * deprecation reason (`false`) or to just render the argument name, type,
     * and default value in a single line (`true`).
     * @default false
     */
    inline?: boolean;
};
export declare function Argument({ arg, showDefaultValue, inline }: ArgumentProps): import("react/jsx-runtime").JSX.Element;
export {};
