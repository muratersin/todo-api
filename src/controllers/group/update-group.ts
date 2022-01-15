import { Response, Next } from 'restify';
import { NotFoundError } from 'restify-errors';
import Group from '../../entity/Group';

export default async function updateGroup(req: any, res: Response, next: Next) {
  try {
    const { id } = req.params;
    const { id: userId } = req.get('user');

    const group = await Group.findOne({ id, user: userId });

    if (!group) throw new NotFoundError('Group not found');

    group.name = req.body.name;
    await group.save();

    res.json({ data: group, message: 'Successfully updated' });
  } catch (err) {
    next(err);
  }
}
