import { ReactElement } from 'react';
import { DropdownMenuContentProps, DropdownMenuItemProps } from '@radix-ui/react-dropdown-menu';
import './dropdown.css';
declare function Content({ children, align, sideOffset, className, ...props }: DropdownMenuContentProps): ReactElement;
export declare const DropdownMenu: import("react").FC<import("@radix-ui/react-dropdown-menu").DropdownMenuProps> & {
    Button: import("react").ForwardRefExoticComponent<Omit<import("react").DetailedHTMLProps<import("react").ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, "ref"> & import("react").RefAttributes<HTMLButtonElement>>;
    Item: ({ className, children, ...props }: DropdownMenuItemProps) => import("react/jsx-runtime").JSX.Element;
    Content: typeof Content;
};
export {};
