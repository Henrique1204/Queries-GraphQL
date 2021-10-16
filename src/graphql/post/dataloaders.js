import DataLoader from 'dataloader';

export const makePostDataLoader = (getPosts) => {
  return new DataLoader(async (ids) => {
    const urlQuery = ids.join('&userId=');

    const res = await getPosts('?userId=' + urlQuery);
    const posts = await res.json();

    return ids.map((id) => posts.filter((post) => post.userId === id));
  });
};
