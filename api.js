const baseULR = 'http://localhost:3000';

export const getUser = (path) => `${baseULR}/users/${path}`;

export const getPosts = (path) => `${baseULR}/posts/${path}`;

export const getComments = (path) => `${baseULR}/comments/${path}`;
