import { DirectiveNode } from 'graphql';
import './directive.css';
declare type DirectiveProps = {
    /**
     * The directive that should be rendered.
     */
    directive: DirectiveNode;
};
export declare function Directive({ directive }: DirectiveProps): import("react/jsx-runtime").JSX.Element;
export {};
