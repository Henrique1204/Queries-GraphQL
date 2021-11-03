import { AuthenticationError } from 'apollo-server-errors';

// Query resolvers
const user = async (_, { id }, { dataSources }) => {
  return dataSources.userApi.getUser(id);
};

const users = async (_, { input }, { dataSources }) => {
  return dataSources.userApi.getUsers(input);
};

// Mutation resolvers
const createUser = async (_, { data }, { dataSources }) => {
  return dataSources.userApi.createUser(data);
};

const updateUser = async (
  _,
  { userId, data },
  { loggedUserId, dataSources },
) => {
  if (!loggedUserId || userId !== loggedUserId) {
    throw new AuthenticationError('Você não tem autorização para essa ação');
  }

  return dataSources.userApi.updateUser(loggedUserId, data);
};

const deleteUser = async (_, { userId }, { loggedUserId, dataSources }) => {
  if (!loggedUserId || userId !== loggedUserId) {
    throw new AuthenticationError('Você não tem autorização para essa ação');
  }

  return dataSources.userApi.deleteUser(loggedUserId);
};

// Field resolvers
const posts = async ({ id }, _, { dataSources }) => {
  return dataSources.postApi.batchLoaderByUserId(id);
};

const usersResolvers = {
  Query: { users, user },
  Mutation: { createUser, updateUser, deleteUser },
  User: { posts },
};

export default usersResolvers;
