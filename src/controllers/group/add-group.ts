import { Next, Response } from 'restify';
import { BadRequestError } from 'restify-errors';
import Group from '../../entity/Group';
import User from '../../entity/User';
import { GroupDTO } from '../../types';

export default async function addGroup(req: any, res: Response, next: Next) {
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
      data: group,
    });
  } catch (err) {
    next(new BadRequestError(err));
  }
}
