import fetch from 'node-fetch';

import { getUsers } from './user/utils/api';
import { makeUserDataLoader } from './user/dataloaders';

import { getPosts } from './post/utils/api';

const context = () => ({
  getUser: getUsers(fetch),
  getPosts: getPosts(fetch),
  userDataLoader: makeUserDataLoader(getUsers(fetch)),
});

export default context;
