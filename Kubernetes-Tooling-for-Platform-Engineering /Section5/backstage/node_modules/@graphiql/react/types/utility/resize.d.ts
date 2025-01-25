/// <reference types="react" />
declare type ResizableElement = 'first' | 'second';
declare type UseDragResizeArgs = {
    /**
     * Set the default sizes for the two resizable halves by passing their ratio
     * (first divided by second).
     */
    defaultSizeRelation?: number;
    /**
     * The direction in which the two halves should be resizable.
     */
    direction: 'horizontal' | 'vertical';
    /**
     * Choose one of the two halves that should initially be hidden.
     */
    initiallyHidden?: ResizableElement;
    /**
     * Invoked when the visibility of one of the halves changes.
     * @param hiddenElement The element that is now hidden after the change
     * (`null` if both are visible).
     */
    onHiddenElementChange?(hiddenElement: ResizableElement | null): void;
    /**
     * The minimum width in pixels for the first half. If it is resized to a
     * width smaller than this threshold, the half will be hidden.
     */
    sizeThresholdFirst?: number;
    /**
     * The minimum width in pixels for the second half. If it is resized to a
     * width smaller than this threshold, the half will be hidden.
     */
    sizeThresholdSecond?: number;
    /**
     * A key for which the state of resizing is persisted in storage (if storage
     * is available).
     */
    storageKey?: string;
};
export declare function useDragResize({ defaultSizeRelation, direction, initiallyHidden, onHiddenElementChange, sizeThresholdFirst, sizeThresholdSecond, storageKey, }: UseDragResizeArgs): {
    dragBarRef: import("react").RefObject<HTMLDivElement>;
    hiddenElement: ResizableElement | null;
    firstRef: import("react").RefObject<HTMLDivElement>;
    setHiddenElement: import("react").Dispatch<import("react").SetStateAction<ResizableElement | null>>;
    secondRef: import("react").RefObject<HTMLDivElement>;
};
export {};
