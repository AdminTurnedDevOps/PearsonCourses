import { ReactElement } from 'react';
import * as T from '@radix-ui/react-tooltip';
import './tooltip.css';
export declare function TooltipRoot({ children, align, side, sideOffset, label, }: T.TooltipContentProps & {
    label: string;
}): ReactElement;
export declare const Tooltip: typeof TooltipRoot & {
    Provider: import("react").FC<T.TooltipProviderProps>;
};
