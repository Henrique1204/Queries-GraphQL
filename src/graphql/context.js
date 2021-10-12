import fetch from 'node-fetch';

import { getUser, getPosts } from '../../api';

const context = () => ({
  getUser: (path = '') => fetch(getUser(path)),
  getPosts: (path = '') => fetch(getPosts(path)),
});

export default context;
