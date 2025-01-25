import { ReactNode } from 'react';
import './section.css';
declare type ExplorerSectionProps = {
    children: ReactNode;
    /**
     * The title of the section, which will also determine the icon rendered next
     * to the headline.
     */
    title: 'Root Types' | 'Fields' | 'Deprecated Fields' | 'Type' | 'Arguments' | 'Deprecated Arguments' | 'Implements' | 'Implementations' | 'Possible Types' | 'Enum Values' | 'Deprecated Enum Values' | 'Directives' | 'All Schema Types';
};
export declare function ExplorerSection(props: ExplorerSectionProps): import("react/jsx-runtime").JSX.Element;
export {};
