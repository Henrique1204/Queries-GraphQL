import { gql } from 'apollo-server-core';

import userTypesDefs from './user/typeDefs';
import userResolvers from './user/resolvers';

import postTypesDefs from './post/typeDefs';
import postResolvers from './post/resolvers';

import apiFiltersTypesDefs from './apiFilters/typeDefs';
import apiFiltersResolvers from './apiFilters/resolvers';
import loginTypedefs from './login/typedefs';
import loginResolvers from './login/resolvers';

const rootTypesDefs = gql`
  type Query {
    empty: Boolean!
  }

  type Mutation {
    empty: Boolean!
  }
`;

const rootResolvers = {
  Query: {
    empty: () => false,
  },
  Mutation: {
    empty: () => false,
  },
};

export const typeDefs = [
  rootTypesDefs,
  userTypesDefs,
  postTypesDefs,
  apiFiltersTypesDefs,
  loginTypedefs,
];

export const resolvers = [
  rootResolvers,
  userResolvers,
  postResolvers,
  apiFiltersResolvers,
  loginResolvers,
];
