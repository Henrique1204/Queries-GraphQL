import bcrypt from 'bcrypt';

import { UserInputError, ValidationError } from 'apollo-server-errors';

export const createUserInfo = async (data, dataSource) => {
  const { firstName, lastName, userName, password } = data;

  const [indexRefPost] = await dataSource.get('', {
    _limit: 1,
    _sort: 'indexRef',
    _order: 'desc',
  });

  const indexRef = indexRefPost.indexRef + 1;

  return {
    firstName,
    lastName,
    userName,
    indexRef,
    createdAt: new Date().toISOString(),
    password,
  };
};

export const validatePassword = (password) => {
  const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,30}$/;

  if (!password.match(strongPasswordRegex)) {
    throw new UserInputError(`
      Senha precisa ter no mínimo uma letra minúscula, uma letra maiúscula e um número.
      E precisa ter entre 6 a 30 caracteres.
    `);
  }
};

export const createUserFn = async (data, dataSource) => {
  const userInfos = await createUserInfo(data, dataSource);
  const { firstName, lastName, userName, password, passwordHash } = userInfos;
  let newHash;

  if (!firstName || !lastName || !userName || !password) {
    throw new ValidationError(
      'Você precisa enviar [firstName | lastName | userName | password]',
    );
  }

  validatePassword(password);

  if (password && !passwordHash) {
    newHash = await bcrypt.hash(password, 12);
  }

  return await dataSource.post('', {
    firstName,
    lastName,
    userName,
    password: newHash,
  });
};

export const updateUserFn = async (id, data, dataSource) => {
  if (!id) throw new ValidationError('Faltou o id do user');

  const { firstName, lastName, userName, password, passwordHash } = data;
  let newHash;

  if (typeof firstName !== 'undefined' && firstName === '') {
    throw new ValidationError('Você precisa enviar o firstName');
  }

  if (typeof lastName !== 'undefined' && lastName === '') {
    throw new ValidationError('Você precisa enviar o lastName');
  }

  if (typeof userName !== 'undefined' && userName === '') {
    throw new ValidationError('Você precisa enviar o userName');
  }

  if (typeof password !== 'undefined' && password === '') {
    throw new ValidationError('Você precisa enviar o userName');
  }

  if (password) validatePassword(password);

  if (password && !passwordHash) {
    newHash = await bcrypt.hash(password, 12);
  }

  return await dataSource.patch(id, {
    firstName,
    lastName,
    userName,
    password: newHash,
  });
};

export const deleteUserFn = async (id, dataSource) => {
  if (!id) throw new ValidationError('Faltou o id do user');

  const deleted = await dataSource.delete(id);

  return !!deleted;
};
