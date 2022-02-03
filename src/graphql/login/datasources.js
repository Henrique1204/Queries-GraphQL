import { RESTDataSource } from 'apollo-datasource-rest';
import { AuthenticationError } from 'apollo-server-errors';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { GET_USER } from '../../../api';
import { checkOwner } from './utils/auth-functions';

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

  async getUser(userName) {
    const [user] = await this.get(
      '',
      { userName },
      { cacheOptions: { ttl: 0 } },
    );

    if (!user) throw new AuthenticationError('O usuário não existe');

    return user;
  }

  async login(userName, password) {
    const user = await this.getUser(userName);

    const { password: passwordHash, id: userId } = user;
    const passwordValid = await this.checkUserPassword(password, passwordHash);

    if (!passwordValid) throw new AuthenticationError('Senha inválida');

    const token = this.createJwtToken({ userId });
    await this.patch(userId, { token }, { cacheOptions: { ttl: 0 } });

    // Response Headers
    this.context.res.cookie('jwtToken', token, {
      secure: false, // Rede segura - https.
      httpOnly: true, // Não deve ser acessado via código.
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 Dias.
      path: '/', // Apartir de qual rota será válido.
      sameSite: 'strict', // strict | lax | none
    });

    return { userId, token };
  }

  async logout(userName) {
    const { id } = await this.getUser(userName);

    checkOwner(this.context.loggedUserId, id);

    await this.patch(id, { token: '' }, { cacheOptions: { tll: 0 } });

    return true;
  }
}
