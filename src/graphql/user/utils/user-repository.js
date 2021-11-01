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

export const validateUserFields = (data, isRequired = true) => {
  const fields = ['firstName', 'lastName', 'userName', 'password'];

  if (!isRequired) {
    for (let key in data) {
      if (data[key] === '') {
        throw new ValidationError(`Você precisa enviar o ${key}`);
      }

      if (key === 'password' && data[key]) validatePassword(data[key]);
    }

    return;
  }

  for (let key of fields) {
    if (!data[key]) throw new ValidationError(`Você precisa enviar [${key}]`);

    if (key === 'password') validatePassword(data[key]);
  }
};

export const createHashPassword = async (password, passwordHash) => {
  if (password && !passwordHash) return await bcrypt.hash(password, 12);

  return passwordHash;
};

export const createUserFn = async (data, dataSource) => {
  const userInfos = await createUserInfo(data, dataSource);
  const { password, passwordHash, ...fields } = userInfos;

  validateUserFields(data);

  const hash = await createHashPassword(password, passwordHash);

  return await dataSource.post('', {
    ...fields,
    password: hash,
  });
};

export const updateUserFn = async (id, data, dataSource) => {
  if (!id) throw new ValidationError('Faltou o id do user');

  const { password, passwordHash, ...fields } = data;

  validateUserFields(data, false);

  const hash = await createHashPassword(password, passwordHash);

  return await dataSource.patch(id, {
    fields,
    password: hash,
  });
};

export const deleteUserFn = async (id, dataSource) => {
  if (!id) throw new ValidationError('Faltou o id do user');

  const deleted = await dataSource.delete(id);

  return !!deleted;
};
