import { ValidationError } from 'apollo-server-errors';

export const usersExist = async (userId, dataSource) => {
  try {
    await dataSource.context.dataSources.userApi.getUser(userId);
  } catch (e) {
    throw new ValidationError(`User ${userId} não existe!`);
  }
};

export const createPostInfo = async (data, dataSource) => {
  const { title, body, userId } = data;

  await usersExist(userId, dataSource);

  const [indexRefPost] = await dataSource.get('', {
    _limit: 1,
    _sort: 'indexRef',
    _order: 'desc',
  });

  const indexRef = indexRefPost.indexRef + 1;

  return {
    title,
    body,
    userId,
    indexRef,
    createdAt: new Date().toISOString(),
  };
};

export const createPostFn = async (data, dataSource) => {
  const postInfos = await createPostInfo(data, dataSource);
  const { title, body, userId } = postInfos;

  if (!title || !body || !userId) {
    throw new ValidationError('Você precisa enviar [title | body | userId]');
  }

  return await dataSource.post('', { ...postInfos });
};

export const updatePostFn = async (id, data, dataSource) => {
  if (!id) throw new ValidationError('Faltou o id do post');

  const { userId, title, body } = data;

  if (typeof userId !== 'undefined' && userId === '') {
    throw new ValidationError('Você precisa enviar o userId');
  }

  if (userId) await usersExist(userId, dataSource);

  if (typeof title !== 'undefined' && title === '') {
    throw new ValidationError('Você precisa enviar o userId');
  }

  if (typeof body !== 'undefined' && body === '') {
    throw new ValidationError('Você precisa enviar o userId');
  }

  return await dataSource.patch(id, { ...data });
};

export const deletePostFn = async (id, dataSource) => {
  if (!id) throw new ValidationError('Faltou o id do post');

  const deleted = await dataSource.delete(id);

  return !!deleted;
};
