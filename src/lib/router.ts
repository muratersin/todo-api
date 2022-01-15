import { Server } from 'restify';

import authController from '../controllers/auth';
import todoController from '../controllers/todo';
import groupController from '../controllers/group';
import authGuardMiddleware from '../middlewares/auth-guard.middleware';
import { Controller } from '../types';

function withGuard(controller: Controller) {
  return [authGuardMiddleware, controller];
}

export default function router(server: Server) {
  server.post('/login', authController.login);
  server.post('/register', authController.register);

  server.get('/todo', withGuard(todoController.getTodos));
  server.post('/todo', withGuard(todoController.addTodo));
  server.put('/todo/:id', withGuard(todoController.updateTodo));
  server.patch('/todo/:id', withGuard(todoController.patchTodo));
  server.del('/todo/:id', withGuard(todoController.deleteTodos));

  server.get('/group', withGuard(groupController.getGroups));
  server.post('/group', withGuard(groupController.addGroup));
  server.put('/group/:id', withGuard(groupController.updateGroup));
  server.del('/group/:id', withGuard(groupController.deleteGroups));
}
