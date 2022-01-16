import { Request, Response, Next } from 'restify';
import logger from '../lib/logger';

export default function authGuardMiddleware(
  req: Request,
  res: Response,
  next: Next
) {
  logger.info(`${req.method}: ${req.url}`);
  next();
}
