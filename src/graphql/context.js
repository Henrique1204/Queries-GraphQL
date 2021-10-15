import fetch from 'node-fetch';

import { GET_POST } from '../../api';
import { makeUserDataLoader } from './user/dataloaders';
import { getUsers } from './user/utils';

const context = () => ({
  getUser: getUsers(fetch),
  getPosts: (path = '') => fetch(GET_POST(path)),
  userDataLoader: makeUserDataLoader(getUsers(fetch)),
});

export default context;
