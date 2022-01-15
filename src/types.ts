/* eslint-disable no-unused-vars */
import { Request, Response, Next } from 'restify';
import { TodoStatus } from './constants/enums';

// export type RequestWithContext = Request & {
//   get: (key: string) => any;
//   set: (key: string, value: any) => void;
// };

export type Controller = (req: Request, res: Response, next: Next) => any;

export type Middleware = Controller;

export type AuthController = {
  login: Controller;
  register: Controller;
};

export type TodoController = {
  addTodo: Controller;
  deleteTodos: Controller;
  getTodos: Controller;
  updateTodo: Controller;
  patchTodo: Controller;
};

export type GroupController = {
  addGroup: Controller;
  getGroups: Controller;
  deleteGroups: Controller;
  updateGroup: Controller;
};

export type UserDTO = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
};

export type LoginDTO = {
  email: string;
  password: string;
};

export type GroupDTO = {
  name: string;
};

export type TodoDTO = {
  title: string;
  content: string;
  groupId: number;
  status: TodoStatus;
  priority: number;
};
