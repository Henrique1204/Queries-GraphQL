import { RESTDataSource } from 'apollo-datasource-rest';
import { AuthenticationError } from 'apollo-server-errors';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { GET_USER } from '../../../api';

export class LoginApi extends RESTDataSource {
  constructor() {
    super();

    this.baseURL = GET_USER();
  }

  checkUserPassword(password, passwordHash) {
    return bcrypt.compare(password, passwordHash);
  }

  createJwtToken(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
  }

  async login(userName, password) {
    const [user] = await this.get(
      '',
      { userName },
      { cacheOptions: { ttl: 0 } },
    );

    if (!user) throw new AuthenticationError('O usuário não existe');

    const { password: passwordHash, id: userId } = user;
    const passwordValid = await this.checkUserPassword(password, passwordHash);

    if (!passwordValid) throw new AuthenticationError('Senha inválida');

    const token = this.createJwtToken({ userId });

    return { userId, token };
  }
}
