import * as jwt from 'jsonwebtoken';

export const verifyToken = (token, secret) =>
  jwt.verify(token, secret, (err, decode) => {
    if (err) {
      return false;
    }
    return decode;
  });

export const generateToken = (email: string) => {
  return jwt.sign({ user: email }, 'secret', {
    expiresIn: '8h',
  });
};
