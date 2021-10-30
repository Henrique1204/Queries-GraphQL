import { ValidationError } from 'apollo-server-errors';

export const createUserInfo = async (data, dataSource) => {
  const { firstName, lastName, userName } = data;

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
  };
};

export const createUserFn = async (data, dataSource) => {
  const userInfos = await createUserInfo(data, dataSource);
  const { firstName, lastName, userName } = userInfos;

  if (!firstName || !lastName || !userName) {
    throw new ValidationError(
      'Você precisa enviar [firstName | lastName | userName]',
    );
  }

  return await dataSource.post('', { ...userInfos });
};

export const updateUserFn = async (id, data, dataSource) => {
  if (!id) throw new ValidationError('Faltou o id do user');

  const { firstName, lastName, userName } = data;

  if (typeof firstName !== 'undefined' && firstName === '') {
    throw new ValidationError('Você precisa enviar o firstName');
  }

  if (typeof lastName !== 'undefined' && lastName === '') {
    throw new ValidationError('Você precisa enviar o lastName');
  }

  if (typeof userName !== 'undefined' && userName === '') {
    throw new ValidationError('Você precisa enviar o userName');
  }

  return await dataSource.patch(id, { ...data });
};

export const deleteUserFn = async (id, dataSource) => {
  if (!id) throw new ValidationError('Faltou o id do user');

  const deleted = await dataSource.delete(id);

  return !!deleted;
};
