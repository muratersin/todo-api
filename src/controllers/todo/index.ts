import { TodoController } from '../../types';
import addTodo from './add-todo';
import getTodos from './get-todos';
import deleteTodos from './delete-todo';
import updateTodo from './update-todo';
import patchTodo from './patch-todo';

const todoController: TodoController = {
  addTodo,
  getTodos,
  deleteTodos,
  updateTodo,
  patchTodo,
};

export default todoController;
