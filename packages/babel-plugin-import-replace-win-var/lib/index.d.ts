import { Visitor } from '@babel/traverse';
declare type Options = {
    libs?: any;
};
export interface PluginOptions {
    opts: Options;
}
export default function babelPlugin(opts: Options): {
    name: string;
    visitor: Visitor<PluginOptions>;
};
export {};
