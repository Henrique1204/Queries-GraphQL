import jwt from 'jsonwebtoken';

const authorizeUser = (req) => {
  try {
    const { authorization } = req.headers;

    const token = authorization.split(' ')[1];

    const { userId } = jwt.verify(token, process.env.JWT_SECRET);

    return userId;
  } catch ({ message }) {
    console.log(message);
    return null;
  }
};

const context = ({ req }) => {
  const loggedUserId = authorizeUser(req);

  return {
    loggedUserId,
  };
};

export default context;
