import { AuthenticationError } from 'apollo-server-errors';

export const checkLoggedIn = (loggedUserId) => {
  if (!loggedUserId) {
    throw new AuthenticationError('Você não tem autorização para essa ação');
  }
};

export const checkOwner = (loggedUserId, userId) => {
  checkLoggedIn(loggedUserId);

  if (userId !== loggedUserId) {
    throw new AuthenticationError('Você não tem autorização para essa ação');
  }
};
