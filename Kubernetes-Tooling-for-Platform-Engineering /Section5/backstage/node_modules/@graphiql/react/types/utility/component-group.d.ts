import { JSXElementConstructor } from 'react';
export declare const createComponentGroup: <Root extends JSXElementConstructor<any>, Children extends {
    [key: string]: JSXElementConstructor<any>;
}>(root: Root, children: Children) => Root & Children;
