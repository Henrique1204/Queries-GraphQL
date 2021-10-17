const user = async (_, { id }, { dataSources }) => {
  return dataSources.userApi.getUser(id);
};

const users = async (_, { input }, { dataSources }) => {
  return dataSources.userApi.getUsers(input);
};

const posts = async ({ id }, _, { dataSources }) => {
  return dataSources.postApi.batchLoaderByUserId(id);
};

const usersResolvers = {
  Query: { users, user },
  User: { posts },
};

export default usersResolvers;
