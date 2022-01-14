/* eslint-disable no-unused-vars */
import { Request, Response, Next } from 'restify';

export type Controller = (req: Request, res: Response, next?: Next) => void;

export type Middleware = (req: Request, res: Response, next: Next) => void;

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
