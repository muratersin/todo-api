import { Response, Next } from 'restify';
import { UnauthorizedError } from 'restify-errors';
import jwt from 'jsonwebtoken';

import jwtConfig from '../config/jwt.config';

export default function authGuardMiddleware(
  req: any,
  res: Response,
  next: Next
) {
  try {
    if (!req.headers.authorization) {
      throw new Error();
    }

    const decoded = jwt.verify(
      req.headers.authorization.replace('Bearer ', ''),
      jwtConfig.secret
    );

    req.set('user', decoded);

    next();
  } catch (err: any) {
    next(new UnauthorizedError(err?.message));
  }
}
