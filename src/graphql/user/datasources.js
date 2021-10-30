import { RESTDataSource } from 'apollo-datasource-rest';
import { GET_USER } from '../../../api';
import { makeUserDataLoader } from './dataloaders';
import {
  createUserFn,
  deleteUserFn,
  updateUserFn,
} from './utils/user-repository';

export class UsersApi extends RESTDataSource {
  constructor() {
    super();

    this.baseURL = GET_USER();
    this.dataLoader = makeUserDataLoader(this.getUsers.bind(this));
  }

  async getUsers(urlParams = {}) {
    return this.get('', urlParams, {
      cacheOptions: { ttl: 60 },
    });
  }

  async getUser(id) {
    return this.get(id, undefined, {
      cacheOptions: { ttl: 60 },
    });
  }

  async createUser(data) {
    return createUserFn(data, this);
  }

  async updateUser(id, data) {
    return updateUserFn(id, data, this);
  }

  async deleteUser(id) {
    return deleteUserFn(id, this);
  }

  batchLoaderById(id) {
    return this.dataLoader.load(id);
  }
}
