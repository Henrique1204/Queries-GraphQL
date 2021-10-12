const users = async (_, __, { getUser }) => {
  console.log('Disgraça');
  const res = await getUser();

  return res.json();
};

const user = async (_, { id }, { getUser }) => {
  const res = await getUser(id);

  return res.json();
};

const usersResolvers = {
  Query: { users, user },
};

export default usersResolvers;
