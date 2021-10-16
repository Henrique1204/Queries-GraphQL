import { PostsApi } from './post/datasources';

const dataSources = () => {
  return {
    postApi: new PostsApi(),
  };
};

export default dataSources;
