import { Request, Response } from 'restify';

export default function login(req: Request, res: Response) {
  res.json({ ok: true });
}
