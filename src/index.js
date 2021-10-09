import { ApolloServer, gql } from 'apollo-server';

const server = new ApolloServer({
  typeDefs: gql`
    type Query {
      hello: String
      hi: String
    }
  `,
  resolvers: {
    Query: {
      hello: () => 'Hello World!',
      hi: () => 'Hi World!',
    },
  },
});

server.listen(4003).then(({ url }) => console.log(`Rodando na url: ${url}`));
