/// <reference types="react" />
import './button.css';
declare type ToolbarButtonProps = {
    label: string;
};
export declare const ToolbarButton: import("react").ForwardRefExoticComponent<Omit<ToolbarButtonProps & import("react").ClassAttributes<HTMLButtonElement> & import("react").ButtonHTMLAttributes<HTMLButtonElement>, "ref"> & import("react").RefAttributes<HTMLButtonElement>>;
export {};
