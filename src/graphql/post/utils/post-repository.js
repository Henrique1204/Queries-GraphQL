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

  console.log(indexRefPost);
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
