import express, { Application } from 'express';
import cors from 'cors';
import userRoutes from '../routes/usuario';
import { SERVER_PORT } from '../global/environment';
export default class Server {
  public app!: Application;
  public port!: number;
  private apiPaths = {
    usuarios: '/api/usuarios',
  };
  constructor() {
    this.app = express();
    this.port = SERVER_PORT;
    // Middlewares
    this.middlewares();
    this.routes();
  }
  public middlewares(): void {
    // cors
    this.app.use(cors({ origin: true, credentials: true }));
    // lectura y parseo del body
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }
  public routes() {
    this.app.use(this.apiPaths.usuarios, userRoutes);
  }
  public start(callback: () => void): void {
    this.app.listen(this.port, callback);
  }
}
