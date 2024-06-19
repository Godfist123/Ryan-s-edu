import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { addMocksToSchema } from "@graphql-tools/mock";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { faker } from "@faker-js/faker";

const typeDefs = `#graphql

type UserType {
  id: String!
  name: String!
  desc: String!
  account: String!
}

type Query {
  """Find one users"""
  findOne(id: String!): UserType!
}

type Mutation {
  create(params: UserInput!): Boolean!

  """Update user"""
  update(id: String!, params: UserInput!): Boolean!

  """Delete user"""
  delete(id: String!): Boolean!
}

input UserInput {
  name: String!
  desc: String!
}
`;

const resolvers = {
  UserType: {
    name: () => faker.name.fullName(),
  },
};

const mocks = {
  Int: () => 6,
  Float: () => 22.1,
  String: () => "hello",
};

const server = new ApolloServer({
  schema: addMocksToSchema({
    schema: makeExecutableSchema({ typeDefs, resolvers }),
    mocks,
    preserveResolvers: true,
  }),
});

const { url } = await startStandaloneServer(server, { listen: { port: 8888 } });

console.log(`🚀 Server listening at: ${url}`);
