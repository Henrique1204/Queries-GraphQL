// Query resolvers
const post = async (_, { id }, { dataSources }) => {
  const post = await dataSources.postApi.getPost(id);

  if (Math.round(Math.random()) === 1) {
    return {
      statusCode: 500,
      message: 'Post timeout',
      timeout: 600,
    };
  }

  if (typeof post.id === 'undefined') {
    return {
      statusCode: 404,
      message: 'Post not found',
      postId: id,
    };
  }

  return post;
};

const posts = async (_, { input }, { dataSources }) => {
  return dataSources.postApi.getPosts(input);
};

// Mutation resolvers
const createPost = async (_, { data }, { dataSources }) => {
  return dataSources.postApi.createPost(data);
};

// Field resolvers
const unixTimestamp = ({ createdAt }) => {
  const timestamp = new Date(createdAt).getTime() / 100;

  return Math.floor(timestamp);
};

const user = async ({ userId }, _, { dataSources }) => {
  return dataSources.userApi.batchLoaderById(userId);
};

const postsResolvers = {
  Query: { post, posts },
  Mutation: { createPost },
  Post: { unixTimestamp, user },
  PostResult: {
    __resolveType: (obj) => {
      if (typeof obj.postId !== 'undefined') return 'PostNotFoundError';
      if (typeof obj.timeout !== 'undefined') return 'PostTimeout';
      if (typeof obj.id !== 'undefined') return 'Post';

      return null;
    },
  },
  PostError: {
    __resolveType: (obj) => {
      if (typeof obj.postId !== 'undefined') return 'PostNotFoundError';
      if (typeof obj.timeout !== 'undefined') return 'PostTimeout';

      return null;
    },
  },
};

export default postsResolvers;
