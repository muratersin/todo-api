import { GroupController } from '../../types';
import addGroup from './add-group';
import getGroups from './get-groups';
import deleteGroups from './delete-group';
import updateGroup from './update-group';

const groupController: GroupController = {
  addGroup,
  getGroups,
  deleteGroups,
  updateGroup,
};

export default groupController;
