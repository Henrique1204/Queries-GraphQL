const users = async (_, __, { fetch }) => {
  const res = await fetch('http://localhost:3000/users');

  return res.json();
};

const user = async (_, { id }, { fetch }) => {
  const res = await fetch('http://localhost:3000/users/' + id);

  return res.json();
};

const usersResolvers = {
  Query: { users, user },
};

export default usersResolvers;
