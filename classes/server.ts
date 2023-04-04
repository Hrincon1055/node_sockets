import express, { Application } from 'express';
import userRoutes from '../routes/usuario';
import cors from 'cors';
import socketIO from 'socket.io';
import http from 'http';
import * as socket from '../sockets/socket';
import { SERVER_PORT } from '../global/environment';
export default class Server {
  private static _intance: Server;
  public app!: Application;
  public port!: number;
  public io!: socketIO.Server;
  private httpServer!: http.Server;
  private apiPaths = {
    usuarios: '/api/usuarios',
  };
  private constructor() {
    this.app = express();
    this.port = SERVER_PORT;
    this.middlewares();
    this.httpServer = new http.Server(this.app);
    this.io = new socketIO.Server(this.httpServer, {
      cors: { origin: true, credentials: true },
    });
    this.listenSockets();
    this.routes();
  }
  public static get instance(): Server {
    return this._intance || (this._intance = new this());
  }
  private listenSockets() {
    console.log('escuchando socket');
    this.io.on('connection', (cliente) => {
      console.log(cliente.id);
      socket.conectarCliente(cliente);
      socket.configurarUsuario(cliente, this.io);

      socket.mensaje(cliente, this.io);
      socket.desconectar(cliente);
    });
  }
  private middlewares(): void {
    this.app.use(cors({ origin: true, credentials: true }));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }
  private routes(): void {
    this.app.use(this.apiPaths.usuarios, userRoutes);
  }
  public start(callback: () => void): void {
    this.httpServer.listen(this.port, callback);
  }
}
