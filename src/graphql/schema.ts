import { mergeSchemas } from 'apollo-server';
import merge from 'lodash/merge';
import schemaDirectives from './directives';

import { AuthResolvers, AuthSchema } from './schemas/auth';
import { IngridientResolvers, IngridientSchema } from './schemas/ingridient';
import { RootResolvers, RootSchema } from './schemas/root';

const linkTypeDefs = `
  extend type Ingridient {
    cretedBy: User
  }
`;

const schema = mergeSchemas({
  resolvers: merge(RootResolvers, AuthResolvers, IngridientResolvers),
  schemaDirectives,
  schemas: [RootSchema, AuthSchema, IngridientSchema, linkTypeDefs],
});

export default schema;
