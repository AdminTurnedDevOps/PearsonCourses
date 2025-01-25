import { IDocument } from '../document';
import { DocumentInventory } from '../documentInventory';
import { IRuleResult } from '../types';
import { Ruleset } from '../ruleset/ruleset';
export declare class Runner {
    protected readonly inventory: DocumentInventory;
    readonly results: IRuleResult[];
    constructor(inventory: DocumentInventory);
    protected get document(): IDocument;
    addResult(result: IRuleResult): void;
    run(ruleset: Ruleset): Promise<void>;
    getResults(): IRuleResult[];
}
