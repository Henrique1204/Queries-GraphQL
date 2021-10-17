import { RESTDataSource } from 'apollo-datasource-rest';
import { GET_POST } from '../../../api';
import { makePostDataLoader } from './dataloaders';

export class PostsApi extends RESTDataSource {
  constructor() {
    super();

    this.baseURL = GET_POST();
    this.dataLoader = makePostDataLoader(this.getPosts.bind(this));
  }

  async getPosts(urlParams = {}) {
    return this.get('', urlParams, {
      cacheOptions: { ttl: 60 },
    });
  }

  async getPost(id) {
    return this.get(id, undefined, {
      cacheOptions: { ttl: 60 },
    });
  }

  batchLoaderByUserId(id) {
    return this.dataLoader.load(id);
  }
}
