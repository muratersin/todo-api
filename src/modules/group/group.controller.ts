import { Next, Response } from 'restify';
import { NotFoundError } from 'restify-errors';
import Group from './group.model';
import { User } from '../user';
import { GroupDTO } from '../../types';

export async function addGroup(req: any, res: Response, next: Next) {
  try {
    const groupDto: GroupDTO = req.body;
    const { id } = req.get('user');
    const user = await User.findOne(id);

    const group = new Group();
    group.user = user;
    group.name = groupDto.name;
    await group.save();

    res.json({
      message: 'Successfully created',
      data: await Group.findOne(group.id),
    });
  } catch (err) {
    next(err);
  }
}

export async function deleteGroup(req: any, res: Response, next: Next) {
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

export async function getGroups(req: any, res: Response, next: Next) {
  try {
    const { id } = req.get('user');
    const groups = await Group.find({
      where: {
        user: id,
      },
    });
    res.json({ data: groups });
  } catch (err) {
    next(err);
  }
}

export async function updateGroup(req: any, res: Response, next: Next) {
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
