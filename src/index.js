import { ApolloServer, gql } from 'apollo-server';

const server = new ApolloServer({
  typeDefs: gql`
    type Documents {
      RG: String
      CPF: String
    }

    type Query {
      # Sinal de exclamação define um valor que não pode ser null.
      id: ID!
      name: String
      age: Int
      height: Float
      married: Boolean
      # Exclamação de dentro define que nenhum valor dentro do Array pode ser null.
      nicknames: [String!]!
      documents: Documents
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
      documents: () => ({ RG: '12.345.678-9', CPF: '987.654.321-0' }),
    },
  },
});

server.listen(4003).then(({ url }) => console.log(`Rodando na url: ${url}`));
