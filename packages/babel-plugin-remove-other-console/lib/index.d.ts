import { Visitor } from '@babel/traverse';
declare type Options = {
    exclude?: {
        name: string;
    }[];
};
export interface PluginOptions {
    opts: Options;
}
export default function (): {
    name: string;
    visitor: Visitor<PluginOptions>;
};
export {};
