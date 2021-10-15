import { GET_USER } from '../../../api';

export const getUsers = (fetch) => {
  return (path = '/') => fetch(GET_USER(path));
};
