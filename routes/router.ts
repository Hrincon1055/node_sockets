import { Router, Request, Response } from 'express';
const router = Router();

router.get('/mensajes', (req: Request, res: Response) => {
  res.json({
    ok: true,
    mensaje: 'TODO OK',
  });
});
router.post('/mensajes', (req: Request, res: Response) => {
  console.log('router LINE 12 =>', req.body);
  res.json({
    ok: true,
    mensaje: 'TODO OK POST 1',
  });
});
router.post('/mensajes/:id', (req: Request, res: Response) => {
  console.log('router LINE 18 =>', req.body, req.params);
  res.json({
    ok: true,
    mensaje: 'TODO OK POST 2',
  });
});
export default router;
