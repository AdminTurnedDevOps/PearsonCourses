import { ReactElement } from 'react';
import * as D from '@radix-ui/react-dialog';
import './dialog.css';
export declare function DialogRoot({ children, ...props }: D.DialogProps): ReactElement;
export declare const Dialog: typeof DialogRoot & {
    Close: import("react").ForwardRefExoticComponent<Omit<import("react").DetailedHTMLProps<import("react").ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, "ref"> & import("react").RefAttributes<HTMLButtonElement>>;
    Title: import("react").ForwardRefExoticComponent<D.DialogTitleProps & import("react").RefAttributes<HTMLHeadingElement>>;
    Trigger: import("react").ForwardRefExoticComponent<D.DialogTriggerProps & import("react").RefAttributes<HTMLButtonElement>>;
    Description: import("react").ForwardRefExoticComponent<D.DialogDescriptionProps & import("react").RefAttributes<HTMLParagraphElement>>;
};
