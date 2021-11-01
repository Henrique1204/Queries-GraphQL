import { gql } from 'apollo-server-core';

const userTypesDefs = gql`
  extend type Query {
    user(id: ID!): User!
    users(input: ApiFiltersInput): [User!]!
  }

  extend type Mutation {
    createUser(data: CreateUserInput): User!
    updateUser(userId: ID!, data: UpdateUserInput!): User!
    deleteUser(userId: ID!): Boolean!
  }

  type User {
    id: ID!
    firstName: String!
    lastName: String!
    userName: String!
    indexRef: Int!
    password: String!
    createdAt: String!
    posts: [Post!]!
  }

  input CreateUserInput {
    firstName: String!
    lastName: String!
    userName: String!
    password: String!
  }

  input UpdateUserInput {
    firstName: String
    lastName: String
    userName: String
    password: String
  }
`;

export default userTypesDefs;
