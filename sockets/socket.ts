import { Socket } from 'socket.io';
import socketIO from 'socket.io';

export const desconectar = (cliente: Socket): void => {
  cliente.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
};
export const mensaje = (cliente: Socket, io: socketIO.Server): void => {
  cliente.on('mensaje', (payload: { de: string; cuerpo: string }) => {
    console.log('Mensaje recibido', payload);
    io.emit('mensaje-nuevo', payload);
  });
};
export const configurarUsuario = (
  cliente: Socket,
  io: socketIO.Server
): void => {
  cliente.on(
    'configurar-usuario',
    (payload: { nombre: string }, callback: Function) => {
      console.log('Usuario recibido', payload.nombre);
      callback({
        ok: true,
        mensaje: `Usuario ${payload.nombre}, configurado`,
      });
    }
  );
};
