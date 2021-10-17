import { PostsApi } from './post/datasources';
import { UsersApi } from './user/datasources';

const dataSources = () => {
  return {
    postApi: new PostsApi(),
    userApi: new UsersApi(),
  };
};

export default dataSources;
