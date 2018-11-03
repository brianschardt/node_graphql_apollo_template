import * as glue from 'schemaglue';
export const { schema, resolver } = glue('src/graphql', { mode: 'ts' });