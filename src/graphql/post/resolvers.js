const post = async (_, { id }, { getPosts }) => {
  const res = await getPosts(id);

  return res.json();
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
};

export default postsResolvers;
