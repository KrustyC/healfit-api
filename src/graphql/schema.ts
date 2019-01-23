import { mergeSchemas } from 'apollo-server';

import { AuthResolvers, AuthSchema } from './schemas/auth';
import { IngridientResolvers, IngridientSchema } from './schemas/ingridient';
import { RootResolvers, RootSchema } from './schemas/root';

const linkTypeDefs = `
  extend type Ingridient {
    cretedBy: User
  }
`;

const schema = mergeSchemas({
  resolvers: {
    ...RootResolvers,
    ...AuthResolvers,
    ...IngridientResolvers,
  },
  schemas: [RootSchema, AuthSchema, IngridientSchema, linkTypeDefs],
});

export default schema;
