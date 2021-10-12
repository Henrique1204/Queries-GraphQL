const users = async (_, __, { fetch }) => {
  const res = await fetch('http://localhost:3000/users');

  return res.json();
};

const user = async (_, __, { fetch }) => {
  const res = await fetch('http://localhost:3000/users/602');

  return res.json();
};

const usersResolvers = {
  Query: { users, user },
};

export default usersResolvers;
