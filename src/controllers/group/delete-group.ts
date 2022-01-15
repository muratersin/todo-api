import { Response, Next } from 'restify';
import { NotFoundError } from 'restify-errors';
import Group from '../../entity/Group';

export default async function deleteGroup(req: any, res: Response, next: Next) {
  try {
    const { id } = req.params;
    const { id: userId } = req.get('user');
    const group = await Group.findOne({ id, user: userId });

    if (group) {
      await Group.remove(group);
    } else {
      throw new NotFoundError('Group not found');
    }

    res.json({ message: 'Successfully deleted' });
  } catch (err) {
    next(err);
  }
}
