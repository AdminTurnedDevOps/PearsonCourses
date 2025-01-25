export declare enum CasingType {
    flat = "flat",
    camel = "camel",
    pascal = "pascal",
    kebab = "kebab",
    cobol = "cobol",
    snake = "snake",
    macro = "macro"
}
export declare type CasingOptions = {
    type: CasingType;
    disallowDigits?: boolean;
    separator?: {
        char: string;
        allowLeading?: boolean;
    };
};
