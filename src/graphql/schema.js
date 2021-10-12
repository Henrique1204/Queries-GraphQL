import { gql } from 'apollo-server-core';

import userResolvers from './user/resolvers';
import userTypesDefs from './user/typeDefs';

const rootTypesDefs = gql`
  type Query {
    empty: Boolean!
  }
`;

const rootResolvers = {
  Query: {
    empty: () => false,
  },
};

export const typeDefs = [rootTypesDefs, userTypesDefs];
export const resolvers = [rootResolvers, userResolvers];
