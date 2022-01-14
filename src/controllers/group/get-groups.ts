import { Request, Response } from 'restify';

export default function getGroups(req: Request, res: Response) {
  res.json({ ok: true });
}
