import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { Request } from 'express';
import { ObjectId } from 'mongoose';
import createHash from './createHash';

dotenv.config();
const secret = createHash(process.env.JWT_SECRET as string);
const expiration = process.env.JWT_LIFETIME;

type SignTokenType = {
  _id: ObjectId;
};

type UserRequest = Request & { user?: jwt.JwtPayload };

function authMiddleware({ req }: { req: UserRequest }) {
  let token = req.body.token || req.query.token || req.headers.authorization;

  if (req.headers.authorization) {
    token = token.split(' ').pop().trim();
  }

  if (!token) {
    return req;
  }

  try {
    const { data } = jwt.verify(token, secret, { maxAge: expiration }) as jwt.JwtPayload;
    req.user = data;
  } catch (error: any) {
    throw new Error(error.message);
  }

  return req;
}

function signToken({ _id }: SignTokenType) {
  const payload = { _id };
  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
}

export { authMiddleware, signToken };
