import { mergeSchemas } from 'apollo-server';

import { RootSchema, RootResolvers } from './schemas/root';
import { AuthSchema, AuthResolvers } from './schemas/auth';
import { IngridientSchema, IngridientResolvers } from './schemas/ingridient';

const linkTypeDefs = `
  extend type Ingridient {
    cretedBy: User
  }
`;

const schema = mergeSchemas({
  schemas: [RootSchema, AuthSchema, IngridientSchema, linkTypeDefs],
  resolvers: {
    ...RootResolvers,
    ...AuthResolvers,
    ...IngridientResolvers,
  },
});

export default schema;
