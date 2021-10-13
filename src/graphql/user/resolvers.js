const user = async (_, { id }, { getUser }) => {
  const res = await getUser(id);

  return res.json();
};

const users = async (_, { input }, { getUser }) => {
  const apiFiltersInput = new URLSearchParams(input).toString();

  const res = await getUser('?' + apiFiltersInput);

  return res.json();
};

const usersResolvers = {
  Query: { users, user },
};

export default usersResolvers;
