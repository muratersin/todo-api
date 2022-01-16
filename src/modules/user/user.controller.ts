import { Next, Request, Response } from 'restify';
import User from './user.model';
import { LoginDTO, UserDTO } from '../../types';

export async function login(req: Request, res: Response, next: Next) {
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

export async function register(req: Request, res: Response, next: Next) {
  try {
    const userDto: UserDTO = req.body;

    await User.register(userDto);

    res.json({
      message: 'User successfully registered',
    });
  } catch (err) {
    next(err);
  }
}

export async function getUser(req: any, res: Response, next: Next) {
  try {
    const user = req.get('user');
    res.json(user);
  } catch (err) {
    next(err);
  }
}
