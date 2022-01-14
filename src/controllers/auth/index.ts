import { AuthController } from '../../types';
import login from './login';
import register from './register';

const authController: AuthController = {
  login,
  register,
};

export default authController;
