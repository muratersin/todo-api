import { Request, Response } from 'restify';

export default function getTodos(req: Request, res: Response) {
  res.json({ ok: true });
}
