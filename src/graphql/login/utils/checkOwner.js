import { AuthenticationError } from 'apollo-server-errors';

const checkOwner = (loggedUserId, userId) => {
  if (!loggedUserId || userId !== loggedUserId) {
    throw new AuthenticationError('Você não tem autorização para essa ação');
  }
};

export default checkOwner;
