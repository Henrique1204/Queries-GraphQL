const post = async (_, { id }, { getPosts }) => {
  const res = await getPosts(id);
  const json = await res.json();

  if (typeof json.id === 'undefined') {
    return {
      statusCode: 404,
      message: 'Post not found',
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

const postsResolvers = {
  Query: { post, posts },
  Post: { unixTimestamp },
  PostResult: {
    __resolveType: (obj) => {
      if (typeof obj.statusCode !== 'undefined') return 'PostNotFoundError';
      if (typeof obj.id !== 'undefined') return 'Post';

      return null;
    },
  },
};

export default postsResolvers;
