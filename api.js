const baseULR = 'http://localhost:3000';

export const GET_USER = (path) => `${baseULR}/users/${path}`;

export const GET_POST = (path) => `${baseULR}/posts/${path}`;

export const GET_COMMENT = (path) => `${baseULR}/comments/${path}`;
