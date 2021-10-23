import { gql } from 'apollo-server-core';

const postTypesDefs = gql`
  extend type Query {
    post(id: ID!): PostResult!
    posts(input: ApiFiltersInput): [Post!]!
  }

  extend type Mutation {
    createPost(data: CreatePostInput): Post!
    updatePost(postId: ID!, data: UpdatePostInput!): Post!
  }

  interface PostError {
    statusCode: Int!
    message: String!
  }

  type PostNotFoundError implements PostError {
    statusCode: Int!
    message: String!
    postId: String!
  }

  type PostTimeout implements PostError {
    statusCode: Int!
    message: String!
    timeout: Int!
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    indexRef: Int!
    createdAt: String!
    unixTimestamp: String!
    user: User!
  }

  union PostResult = PostNotFoundError | PostTimeout | Post

  input CreatePostInput {
    title: String!
    body: String!
    userId: ID!
  }

  input UpdatePostInput {
    title: String
    body: String
    userId: ID
  }
`;

export default postTypesDefs;
