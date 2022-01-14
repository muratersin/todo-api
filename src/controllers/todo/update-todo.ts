import { Request, Response } from 'restify';

export default function updateTodo(req: Request, res: Response) {
  res.json({ ok: true });
}
