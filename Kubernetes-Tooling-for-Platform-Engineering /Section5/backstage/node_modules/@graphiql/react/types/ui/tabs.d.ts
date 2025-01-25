import { ReactNode } from 'react';
import './tabs.css';
declare type TabProps = {
    isActive?: boolean;
    value: object;
    className?: string;
    children: ReactNode;
};
export declare const Tab: import("react").ForwardRefExoticComponent<TabProps & import("react").RefAttributes<HTMLLIElement>> & {
    Button: import("react").ForwardRefExoticComponent<Omit<import("react").DetailedHTMLProps<import("react").ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, "ref"> & import("react").RefAttributes<HTMLButtonElement>>;
    Close: import("react").ForwardRefExoticComponent<Omit<import("react").DetailedHTMLProps<import("react").ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, "ref"> & import("react").RefAttributes<HTMLButtonElement>>;
};
declare type TabsProps = {
    values: object[];
    onReorder: (newOrder: any[]) => void;
    className?: string;
    children: ReactNode;
};
export declare const Tabs: import("react").ForwardRefExoticComponent<TabsProps & import("react").RefAttributes<HTMLUListElement>>;
export {};
