/// <reference types="react" />
import './markdown.css';
declare type MarkdownContentProps = {
    children: string;
    onlyShowFirstChild?: boolean;
    type: 'description' | 'deprecation';
};
export declare const MarkdownContent: import("react").ForwardRefExoticComponent<Omit<MarkdownContentProps & Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "children">, "ref"> & import("react").RefAttributes<HTMLDivElement>>;
export {};
