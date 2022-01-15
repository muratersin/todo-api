import { Response, Next } from 'restify';
import { NotFoundError } from 'restify-errors';

import { TodoDTO } from '../../types';
import Todo from './todo.model';
import { User } from '../user';
import { Group } from '../group';

export async function addTodo(req: any, res: Response, next: Next) {
  try {
    const todoDto: TodoDTO = req.body;
    const { id } = req.get('user');
    const user = await User.findOne(id);
    const group = await Group.findOne({ id: todoDto.groupId, user });

    if (!user || !group) {
      throw new NotFoundError();
    }

    const todo = new Todo();
    todo.user = user;
    todo.group = group;
    todo.title = todoDto.title;
    todo.content = todoDto.content;
    todo.priority = todoDto.priority;
    todo.status = todoDto.status;
    todo.dueDate = todoDto.dueDate;
    await todo.save();

    res.json({
      message: 'Successfully created',
      data: await Todo.findOne(todo.id),
    });
  } catch (err) {
    next(err);
  }
}

export async function deleteTodo(req: any, res: Response, next: Next) {
  try {
    const { id } = req.params;
    const { id: userId } = req.get('user');
    const todo = await Todo.findOne({ id, user: userId });

    if (todo) {
      await Todo.remove(todo);
    } else {
      throw new NotFoundError('Todo not found');
    }

    res.json({ message: 'Successfully deleted' });
  } catch (err) {
    next(err);
  }
}

export async function getTodos(req: any, res: Response, next: Next) {
  try {
    const { groupId, priority, status, minDueDate, maxDueDate } = req.query;
    const { id } = req.get('user');
    const todos = await Todo.findByQuery({
      userId: id,
      groupId,
      priority,
      status,
      minDueDate,
      maxDueDate,
    });

    res.json({ data: todos });
  } catch (err) {
    next(err);
  }
}

export async function updateTodo(req: any, res: Response, next: Next) {
  try {
    const { id } = req.params;
    const todoDto: TodoDTO = req.body;
    const { id: userId } = req.get('user');

    const todo = await Todo.findOne({ id, user: userId });
    if (!todo) {
      throw new NotFoundError('Todo not found');
    }

    if (todoDto.title) {
      todo.title = todoDto.title;
    }

    if (todoDto.content) {
      todo.content = todoDto.content;
    }

    if (todoDto.priority) {
      todo.priority = todoDto.priority;
    }

    if (todoDto.status) {
      todo.status = todoDto.status;
    }

    if (todoDto.dueDate) {
      todo.dueDate = todoDto.dueDate;
    }

    if (todoDto.groupId) {
      const group = await Group.findOne({ id: todoDto.groupId, user: userId });
      if (group) {
        todo.group = group;
      }
    }

    await todo.save();

    res.json({ data: todo, message: 'Successfully updated' });
  } catch (err) {
    next(err);
  }
}
