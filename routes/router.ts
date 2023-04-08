import { Router, Request, Response } from 'express';
import Server from '../classes/server';
import { usuariosConectados } from '../sockets/socket';

const router = Router();

router.get('/mensajes', (req: Request, res: Response) => {
  res.json({
    ok: true,
    mensaje: 'TODO OK',
  });
});
router.post('/mensajes', (req: Request, res: Response) => {
  const cuerpo = req.body.cuerpo;
  const de = req.body.de;
  const server = Server.instance;
  const payload = {
    de,
    cuerpo,
  };
  server.io.emit('mensaje-privado', payload);
  res.json({
    ok: true,
    cuerpo,
    de,
  });
});
router.post('/mensajes/:id', (req: Request, res: Response) => {
  const cuerpo = req.body.cuerpo;
  const de = req.body.de;
  const id = req.params.id;
  const server = Server.instance;
  const payload = {
    de,
    cuerpo,
  };
  server.io.in(id).emit('mensaje-privado', payload);
  res.json({
    ok: true,
    cuerpo,
    de,
    id,
  });
});

router.get('/lista-usuarios', (req: Request, res: Response) => {
  const server = Server.instance;
  server.io
    .allSockets()
    .then((clientes) => {
      return res.json({
        ok: true,
        clientes: Array.from(clientes),
      });
    })
    .catch((err) => {
      return res.json({
        ok: false,
        err,
      });
    });
});

router.get('/lista-usuarios/detalle', (req: Request, res: Response) => {
  return res.json({
    ok: true,
    clientes: usuariosConectados.getLista(),
  });
});
export default router;
