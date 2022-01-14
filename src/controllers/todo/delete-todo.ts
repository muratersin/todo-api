import { Request, Response } from 'restify';

export default function deleteTodo(req: Request, res: Response) {
  res.json({ ok: true });
}
