import * as jwt from 'jsonwebtoken';

export const verifyToken = (token, secret) =>
  jwt.verify(token, secret, (err, decode) => {
    if (err) {
      return false;
    }
    return decode;
  });

export const generateToken = (userName: string) => {
  return jwt.sign({ userName }, 'secret', {
    expiresIn: '8h',
  });
};
