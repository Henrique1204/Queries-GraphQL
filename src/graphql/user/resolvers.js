const user = async (_, { id }, { getUser }) => {
  const res = await getUser(id);

  return res.json();
};

const users = async (_, { input }, { getUser }) => {
  const ApiFiltersInput = new URLSearchParams(input).toString();

  const res = await getUser('?' + ApiFiltersInput);

  return res.json();
};

const posts = async ({ id }, _, { dataSources }) => {
  return dataSources.postApi.batchLoaderByUserId(id);
};

const usersResolvers = {
  Query: { users, user },
  User: { posts },
};

export default usersResolvers;
