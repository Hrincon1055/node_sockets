import { Request, Response } from 'express';
export const getUsuarios = async (req: Request, res: Response) => {
  console.log('usuario LINE 3 =>', req.body);
  res.json({
    ok: true,
    mensaje: 'Desde get Usuarios',
  });
};
