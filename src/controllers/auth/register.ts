import { Next, Request, Response } from 'restify';
import User from '../../entity/User';
import { UserDTO } from '../../types';

export default async function register(
  req: Request,
  res: Response,
  next: Next
) {
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
