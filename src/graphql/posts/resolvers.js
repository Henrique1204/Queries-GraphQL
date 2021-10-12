const post = async (_, { id }, { getPosts }) => {
  const res = await getPosts(id);

  return res.json();
};

const posts = async (_, __, { getPosts }) => {
  const res = await getPosts();

  return res.json();
};

const postsResolvers = {
  Query: { post, posts },
};

export default postsResolvers;
