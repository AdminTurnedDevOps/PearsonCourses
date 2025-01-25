import type { Token } from 'codemirror';
declare type ImagePreviewProps = {
    token: Token;
};
export declare function ImagePreview(props: ImagePreviewProps): import("react/jsx-runtime").JSX.Element;
export declare namespace ImagePreview {
    var shouldRender: (token: Token) => boolean;
}
export {};
