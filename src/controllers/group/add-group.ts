import { Request, Response } from 'restify';

export default function addGroup(req: Request, res: Response) {
  res.json({ ok: true });
}
