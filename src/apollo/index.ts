import { ApolloServer } from 'apollo-server-express';
import context from './context';
import schema from './schema';

const server = new ApolloServer({
  context,
  schema,
});

export default server;
