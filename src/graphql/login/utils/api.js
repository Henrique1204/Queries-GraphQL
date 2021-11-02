import { gql } from 'apollo-server-core';

export const loginTypedefs = gql`
  extend type Mutation {
    login(data: LoginInput!): Login!
  }

  input LoginInput {
    userName: String!
    password: String!
  }

  type Login {
    userId: ID!
    token: String!
  }
`;
