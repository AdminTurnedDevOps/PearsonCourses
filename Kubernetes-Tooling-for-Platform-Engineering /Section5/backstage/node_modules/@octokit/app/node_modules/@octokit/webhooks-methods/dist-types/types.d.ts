export declare enum Algorithm {
    SHA1 = "sha1",
    SHA256 = "sha256"
}
export type AlgorithmLike = Algorithm | "sha1" | "sha256";
export type SignOptions = {
    secret: string;
    algorithm?: AlgorithmLike;
};
