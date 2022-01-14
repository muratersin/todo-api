import { Request, Response } from 'restify';

export default function deleteGroup(req: Request, res: Response) {
  res.json({ ok: true });
}
