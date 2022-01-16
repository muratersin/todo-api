import { Server } from 'restify';

import { userController } from '../modules/user';
import { todoController } from '../modules/todo';
import { groupController } from '../modules/group';
import authGuardMiddleware from '../middlewares/auth-guard.middleware';
import { Controller } from '../types';

function withGuard(controller: Controller) {
  return [authGuardMiddleware, controller];
}

export default function router(server: Server) {
  server.post('/login', userController.login);
  server.post('/register', userController.register);
  server.get('/user', withGuard(userController.getUser));

  server.get('/todo', withGuard(todoController.getTodos));
  server.post('/todo', withGuard(todoController.addTodo));
  server.patch('/todo/:id', withGuard(todoController.updateTodo));
  server.del('/todo/:id', withGuard(todoController.deleteTodo));

  server.get('/group', withGuard(groupController.getGroups));
  server.post('/group', withGuard(groupController.addGroup));
  server.put('/group/:id', withGuard(groupController.updateGroup));
  server.del('/group/:id', withGuard(groupController.deleteGroup));
}
