import Jwt from 'jsonwebtoken';

export const createJwt = (payload: object) => {
  return Jwt.sign(payload, process.env.SECRET ?? 'MY_WEB_APK');
};
