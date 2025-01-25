export interface IPath {
    protocol: 'file' | 'http' | 'https' | null;
    origin: string | null;
    absolute: boolean;
    drive: string | null;
    path: string[];
}
