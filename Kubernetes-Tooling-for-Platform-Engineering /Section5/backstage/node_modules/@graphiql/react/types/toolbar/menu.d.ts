import { ReactNode } from 'react';
import './menu.css';
import { DropdownMenuProps } from '@radix-ui/react-dropdown-menu';
declare type ToolbarMenuProps = {
    button: ReactNode;
    label: string;
};
export declare const ToolbarMenu: (({ button, children, label, ...props }: ToolbarMenuProps & {
    children: ReactNode;
    className?: string | undefined;
} & DropdownMenuProps) => import("react/jsx-runtime").JSX.Element) & {
    Item: ({ className, children, ...props }: import("@radix-ui/react-dropdown-menu").DropdownMenuItemProps) => import("react/jsx-runtime").JSX.Element;
};
export {};
