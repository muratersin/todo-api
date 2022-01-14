import { Request, Response } from 'restify';

export default function patchTodo(req: Request, res: Response) {
  res.json({ ok: true });
}
