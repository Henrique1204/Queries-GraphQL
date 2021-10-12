const post = async (_, { id }, { getPosts }) => {
  const res = await getPosts(id);

  return res.json();
};

const posts = async (_, __, { getPosts }) => {
  const res = await getPosts();

  return res.json();
};

const unixTimestamp = ({ createdAt }) => {
  const timestamp = new Date(createdAt).getTime() / 100;

  return Math.floor(timestamp);
};

const postsResolvers = {
  Query: { post, posts },
  Posts: { unixTimestamp },
};

export default postsResolvers;
