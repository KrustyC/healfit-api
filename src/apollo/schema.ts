import { makeExecutableSchema } from 'apollo-server';
import { fileLoader, mergeResolvers, mergeTypes } from 'merge-graphql-schemas';
import path from 'path';
import schemaDirectives from './directives';

const typesArray = fileLoader(path.join(__dirname, './types'));
const resolversArray = fileLoader(path.join(__dirname, './resolvers/'), {
  extensions: ['.ts'],
  recursive: true,
});

const schema = makeExecutableSchema({
  resolvers: mergeResolvers(resolversArray),
  schemaDirectives,
  typeDefs: mergeTypes(typesArray, { all: true }),
});

export default schema;
