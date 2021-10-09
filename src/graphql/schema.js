import { gql } from 'apollo-server-core';

import documentsResolvers from './documents/resolvers';
import documentsTypesDefs from './documents/typeDefs';

const rootTypesDefs = gql`
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
`;

const rootResolvers = {
  Query: {
    id: () => '1',
    name: () => 'Paulo Henrique',
    age: () => 20,
    height: () => 1.75,
    married: () => false,
    nicknames: () => ['Paulão', 'Rick', 'Henriqueta'],
  },
};

export const typeDefs = [rootTypesDefs, documentsTypesDefs];
export const resolvers = [rootResolvers, documentsResolvers];
