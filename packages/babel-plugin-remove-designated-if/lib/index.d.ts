import { Visitor } from '@babel/traverse';
export default function (opts: {
    designated: string;
}): {
    name: string;
    visitor: Visitor<{
        opts: {
            designated: string;
        };
    }>;
};
