import { mergeSchemas } from 'apollo-server';

import { RootSchema, RootResolvers } from './schemas/root';
import { AuthSchema, AuthResolvers } from './schemas/auth';

const schema = mergeSchemas({
  schemas: [RootSchema, AuthSchema],
  resolvers: {
    ...RootResolvers,
    ...AuthResolvers,
  },
});

export default schema;
