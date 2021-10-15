import { GET_POST } from '../../../api';

export const getPosts = (fetch) => {
  return (path = '/') => fetch(GET_POST(path));
};
