import { gql } from 'apollo-server-core';

const postsTypesDefs = gql`
  extend type Query {
    post(id: String!): Posts!
    posts: [Posts!]!
  }

  type Posts {
    id: ID!
    title: String!
    body: String!
    indexRef: Int!
    createdAt: String!
    # user: User!
  }
`;

export default postsTypesDefs;
