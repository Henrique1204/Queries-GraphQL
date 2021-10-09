import { ApolloServer, gql } from 'apollo-server';

const server = new ApolloServer({
  typeDefs: gql`
    type Query {
      # Sinal de exclamação define um valor que não pode ser null.
      id: ID!
      name: String
      age: Int
      height: Float
      married: Boolean
      # Exclamação de dentro define que nenhum valor dentro do Array pode ser null.
      nicknames: [String!]!
    }
  `,
  resolvers: {
    Query: {
      id: () => '1',
      name: () => 'Paulo Henrique',
      age: () => 20,
      height: () => 1.75,
      married: () => false,
      nicknames: () => ['Paulão', 'Rick', 'Henriqueta'],
    },
  },
});

server.listen(4003).then(({ url }) => console.log(`Rodando na url: ${url}`));
