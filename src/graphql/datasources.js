import { PostsApi } from './post/datasources';
import { UsersApi } from './user/datasources';
import { LoginApi } from './login/datasources';

const dataSources = () => {
  return {
    postApi: new PostsApi(),
    userApi: new UsersApi(),
    loginApi: new LoginApi(),
  };
};

export default dataSources;
