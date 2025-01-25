/// <reference types="react" />
import './button.css';
export declare const UnStyledButton: import("react").ForwardRefExoticComponent<Omit<import("react").DetailedHTMLProps<import("react").ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, "ref"> & import("react").RefAttributes<HTMLButtonElement>>;
declare type ButtonProps = {
    state?: 'success' | 'error';
};
export declare const Button: import("react").ForwardRefExoticComponent<Omit<ButtonProps & import("react").ClassAttributes<HTMLButtonElement> & import("react").ButtonHTMLAttributes<HTMLButtonElement>, "ref"> & import("react").RefAttributes<HTMLButtonElement>>;
export {};
