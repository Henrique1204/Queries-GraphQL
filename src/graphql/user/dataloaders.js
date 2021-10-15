import DataLoader from 'dataloader';

export const makeUserDataLoader = (getUsers) => {
  return new DataLoader(async (ids) => {
    const urlQuery = ids.join('&id=');

    const res = await getUsers('?id=' + urlQuery);
    const users = await res.json();

    return ids.map((id) => users.find((user) => user.id === id));
  });
};
