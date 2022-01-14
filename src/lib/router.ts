import { Server } from 'restify';

import authController from '../controllers/auth';
import todoController from '../controllers/todo';
import groupController from '../controllers/group';

export default function router(server: Server) {
  server.post('/login', authController.login);
  server.post('/register', authController.register);

  server.get('/todo', todoController.getTodos);
  server.post('/todo', todoController.addTodo);
  server.put('/todo/:id', todoController.updateTodo);
  server.patch('/todo/:id', todoController.patchTodo);
  server.del('/todo/:id', todoController.deleteTodos);

  server.get('/group', groupController.getGroups);
  server.post('/group', groupController.addGroup);
  server.put('/group/:id', groupController.updateGroup);
  server.del('/group/:id', groupController.deleteGroups);
}
