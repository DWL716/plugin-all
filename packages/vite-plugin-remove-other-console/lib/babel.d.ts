declare const _default: (name: string, id: string) => (code: string) => {
    code: string | null | undefined;
    map: {
        version: number;
        sources: string[];
        names: string[];
        sourceRoot?: string | undefined;
        sourcesContent?: string[] | undefined;
        mappings: string;
        file: string;
    } | null | undefined;
};
export default _default;
