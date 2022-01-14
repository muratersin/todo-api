import { Request, Response } from 'restify';

export default function addTodo(req: Request, res: Response) {
  res.json({ ok: true });
}
