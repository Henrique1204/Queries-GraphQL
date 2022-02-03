import jwt from 'jsonwebtoken';
import { UsersApi } from './user/datasources';

const authorizeUser = async (req) => {
  try {
    const { authorization } = req.headers;

    const token = authorization.split(' ')[1];

    const { userId } = jwt.verify(token, process.env.JWT_SECRET);

    const usersApi = new UsersApi();
    usersApi.initialize({});
    const { token: tokenUser } = await usersApi.getUser(userId);

    if (tokenUser !== token) throw new Error('Token inválido');

    return userId;
  } catch ({ message }) {
    return null;
  }
};

const context = async ({ req, res }) => {
  const loggedUserId = await authorizeUser(req);

  return {
    loggedUserId,
    res,
  };
};

export default context;
