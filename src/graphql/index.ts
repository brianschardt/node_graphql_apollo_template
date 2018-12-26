import * as glue from 'schemaglue';
export { schemaDirectives } from './directives';
export const { schema, resolver } = glue('src/graphql', { mode: 'ts' });
