import jwt from 'jsonwebtoken';

export interface ItokenObject {
  token: string;
  userId: string;
  exp: number;
  jti: string;
  error: string | undefined;
}

export function getToken(token: string = ''): ItokenObject {
  const data: ItokenObject = {
    token: '',
    userId: '',
    exp: 0,
    jti: '',
    error: undefined,
  };

  let decode: { [key: string]: any } = {};

  if (token === '') {
    try {
      const storageToken: string | null = localStorage.getItem('jwtToken');
      data.token = storageToken === null ? '' : storageToken;
    } catch (e) {
      data.error = 'Cant get token';
      return data;
    }
  } else {
    data.token = token;
  }

  if (data.token === '') {
    data.error = 'No token found';
    return data;
  }

  try {
    const storageDecode: string | { [key: string]: any } | null = jwt.decode(data.token);
    if (storageDecode !== null && typeof storageDecode !== 'string') {
      decode = storageDecode;
    } else {
      data.error = 'Invalid token. error 1';
      return data;
    }
  } catch (err) {
    data.error = 'Invalid token. error 1';
    return data;
  }

  if (decode.permission !== undefined && decode.permission.userId !== undefined) {
    data.userId = decode.permission.userId;
  } else {
    data.error = 'Invalid token. error 2';
    return data;
  }

  if (decode.exp !== undefined) {
    data.exp = decode.exp;
  } else {
    data.error = 'Invalid token. error 3';
    return data;
  }

  if (decode.jti !== undefined) {
    data.jti = decode.jti;
  } else {
    data.error = 'Invalid token. error 4';
    return data;
  }

  return data;
}

export function removeToken(): boolean {
  try {
    localStorage.removeItem('jwtToken');
    return true;
  } catch (err) {
    return false;
  }
}

export function setToken(token: string = ''): boolean {
  try {
    localStorage.setItem('jwtToken', token);
    return true;
  } catch (err) {
    return false;
  }
}
