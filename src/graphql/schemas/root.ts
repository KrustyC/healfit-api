import { gql, makeExecutableSchema } from 'apollo-server';

export const RootSchema = makeExecutableSchema({
  typeDefs: gql`
    directive @auth(role: Role = USER) on OBJECT | FIELD_DEFINITION

    enum Role {
      ADMIN
      USER
    }

    type Query {
      hello: String
    }

    type Mutation {
      hello: String
    }
  `,
});

export const RootResolvers = {
  Mutation: {
    hello: () => 'Hello! Mutations are working!',
  },
  Query: {
    hello: () => 'Hello! Queries are working!',
  },
};
