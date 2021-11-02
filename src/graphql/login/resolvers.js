const login = async (_, { data }, { dataSources }) => {
  const { userName, password } = data;

  return dataSources.loginApi.login(userName, password);
};

const loginResolvers = {
  Mutation: { login },
};

export default loginResolvers;
