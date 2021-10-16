import fetch from 'node-fetch';

import { getUsers } from './user/utils';
import { makeUserDataLoader } from './user/dataloaders';

import { getPosts } from './post/utils';
import { makePostDataLoader } from './post/dataloaders';

const context = () => ({
  getUser: getUsers(fetch),
  getPosts: getPosts(fetch),
  userDataLoader: makeUserDataLoader(getUsers(fetch)),
  postsDataLoader: makePostDataLoader(getPosts(fetch)),
});

export default context;
