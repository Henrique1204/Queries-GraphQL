import fetch from 'node-fetch';

import { getPosts, getUser } from '../../API';

const context = () => ({
  getUser: (path = '') => fetch(getUser(path)),
  getPosts: (path = '') => fetch(getPosts(path)),
});

export default context;
