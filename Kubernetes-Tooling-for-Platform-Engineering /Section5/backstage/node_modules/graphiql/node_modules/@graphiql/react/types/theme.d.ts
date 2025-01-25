/**
 * The value `null` semantically means that the user does not explicitly choose
 * any theme, so we use the system default.
 */
export declare type Theme = 'light' | 'dark' | null;
export declare function useTheme(): {
    theme: Theme;
    setTheme: (newTheme: Theme) => void;
};
