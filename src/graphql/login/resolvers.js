const login = async (_, { data }, { dataSources }) => {
  const { userName, password } = data;

  return dataSources.loginApi.login(userName, password);
};

const logout = async (_, { userName }, { dataSources }) => {
  return dataSources.loginApi.logout(userName);
};

const loginResolvers = {
  Mutation: { login, logout },
};

export default loginResolvers;
