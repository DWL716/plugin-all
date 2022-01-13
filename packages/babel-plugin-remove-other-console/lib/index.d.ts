import { Visitor } from '@babel/traverse';
declare type Options = {
    exclude?: string;
};
export interface PluginOptions {
    opts: Options;
}
export default function (opts: {
    exclude?: string;
}): {
    name: string;
    visitor: Visitor<PluginOptions>;
};
export {};
