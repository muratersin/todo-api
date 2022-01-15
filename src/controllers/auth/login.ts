import { Next, Request, Response } from 'restify';
import User from '../../entity/User';
import { LoginDTO } from '../../types';

export default async function login(req: Request, res: Response, next: Next) {
  try {
    const credential: LoginDTO = req.body;
    const jwt = await User.login(credential);

    // refresh token mechanism can be implemented
    res.json({
      accessToken: jwt,
    });
  } catch (err) {
    next(err);
  }
}
