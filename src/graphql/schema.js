import { gql } from 'apollo-server-core';

import userTypesDefs from './user/typeDefs';
import userResolvers from './user/resolvers';

import postsTypesDefs from './posts/typeDefs';
import postsResolvers from './posts/resolvers';

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

export const typeDefs = [rootTypesDefs, userTypesDefs, postsTypesDefs];
export const resolvers = [rootResolvers, userResolvers, postsResolvers];
