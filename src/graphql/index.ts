import * as glue from 'schemaglue';
import {UpperCaseDirective, IsAuthDirective, IsAuthUserDirective} from './directives/directives';

export const { schema, resolver } = glue('src/graphql', { mode: 'ts' });

export const schemaDirectives = {
    upper: UpperCaseDirective,
    isAuth: IsAuthDirective,
    isAuthUser: IsAuthUserDirective,
};