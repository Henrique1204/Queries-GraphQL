import fetch from 'node-fetch';

import { getUsers } from './user/utils';
import { makeUserDataLoader } from './user/dataloaders';

import { getPosts } from './post/utils';

const context = () => ({
  getUser: getUsers(fetch),
  getPosts: getPosts(fetch),
  userDataLoader: makeUserDataLoader(getUsers(fetch)),
});

export default context;
