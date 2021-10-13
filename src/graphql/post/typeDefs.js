import { gql } from 'apollo-server-core';

const postTypesDefs = gql`
  extend type Query {
    post(id: ID!): Post!
    posts(input: ApiFiltersInput): [Post!]!
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    indexRef: Int!
    createdAt: String!
    unixTimestamp: String!
    # user: User!
  }
`;

export default postTypesDefs;
