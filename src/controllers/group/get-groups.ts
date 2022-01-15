import { Request, Response, Next } from 'restify';
import { BadRequestError } from 'restify-errors';
import Group from '../../entity/Group';

export default async function getGroups(req: any, res: Response, next: Next) {
  try {
    const { id } = req.get('user');
    const groups = await Group.find({
      where: {
        user: id,
      },
    });
    res.json({ data: groups });
  } catch (err) {
    next(new BadRequestError());
  }
}
