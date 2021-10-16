import { RESTDataSource } from 'apollo-datasource-rest';
import { GET_POST } from '../../../api';

export class PostsApi extends RESTDataSource {
  constructor() {
    super();

    this.baseURL = GET_POST();
  }

  async getPosts(urlParams = {}) {
    return this.get('', urlParams);
  }

  async getPost(id) {
    return this.get(id);
  }
}
