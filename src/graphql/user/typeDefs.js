import { gql } from 'apollo-server-core';

const userTypesDefs = gql`
  extend type Query {
    # Forma de passar um parâmetro para o resolver na query.
    user(id: ID!): User!
    users: [User!]!
  }

  type User {
    id: ID!
    firstName: String!
    lastName: String!
    userName: String!
    indexRef: Int!
    createdAt: String!
    # posts: [Posts!]!
  }
`;

export default userTypesDefs;
