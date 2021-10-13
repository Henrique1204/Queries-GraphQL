import { gql } from 'apollo-server-core';

const postTypesDefs = gql`
  extend type Query {
    post(id: ID!): PostResult!
    posts(input: ApiFiltersInput): [Post!]!
  }

  union PostResult = PostNotFoundError | Post

  type PostNotFoundError {
    statusCode: Int!
    message: String!
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
