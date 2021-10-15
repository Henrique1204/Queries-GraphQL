const post = async (_, { id }, { getPosts }) => {
  const res = await getPosts(id);
  const json = await res.json();

  if (Math.round(Math.random()) === 1) {
    return {
      statusCode: 500,
      message: 'Post timeout',
      timeout: 600,
    };
  }

  if (typeof json.id === 'undefined') {
    return {
      statusCode: 404,
      message: 'Post not found',
      postId: id,
    };
  }

  return json;
};

const posts = async (_, { input }, { getPosts }) => {
  const ApiFiltersInput = new URLSearchParams(input).toString();

  const res = await getPosts('?' + ApiFiltersInput);

  return res.json();
};

const unixTimestamp = ({ createdAt }) => {
  const timestamp = new Date(createdAt).getTime() / 100;

  return Math.floor(timestamp);
};

const user = async ({ userId }, _, { userDataLoader }) => {
  return userDataLoader.load(userId);
};

const postsResolvers = {
  Query: { post, posts },
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
