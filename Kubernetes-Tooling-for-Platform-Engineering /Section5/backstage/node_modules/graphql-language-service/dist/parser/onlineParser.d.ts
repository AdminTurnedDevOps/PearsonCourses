import CharacterStream from './CharacterStream';
import { State } from './types';
import { LexRules, ParseRules } from './Rules';
export declare type ParserOptions = {
    eatWhitespace: (stream: CharacterStream) => boolean;
    lexRules: Partial<typeof LexRules>;
    parseRules: typeof ParseRules;
    editorConfig: {
        [name: string]: any;
    };
};
export default function onlineParser(options?: ParserOptions): {
    startState: () => State;
    token: (stream: CharacterStream, state: State) => string;
};
//# sourceMappingURL=onlineParser.d.ts.map