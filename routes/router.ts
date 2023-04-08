import { Router, Request, Response } from 'express';
import Server from '../classes/server';
import { usuariosConectados } from '../sockets/socket';
import { GraficaData } from '../classes/grafica';

const router = Router();
const grafica = new GraficaData();
router.get('/grafica', (req: Request, res: Response) => {
  res.json(grafica.getDataGrafica());
});
router.post('/grafica', (req: Request, res: Response) => {
  const mes = req.body.mes;
  const unidades = Number(req.body.unidades);
  grafica.incrementarValor(mes, unidades);
  const server = Server.instance;
  server.io.emit('cambio-grafica', grafica.getDataGrafica());
  res.json(grafica.getDataGrafica());
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
