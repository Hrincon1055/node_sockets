import { Usuario } from './usuario';

export class UsuariosLista {
  private lista: Usuario[] = [];
  constructor() {}
  public agregar(usuario: Usuario): Usuario {
    this.lista.push(usuario);
    console.log(this.lista);
    return usuario;
  }
  public actualizarNombre(id: string, nombre: string): void {
    for (const usuario of this.lista) {
      if (usuario.id === id) {
        usuario.nombre = nombre;
        break;
      }
    }
    console.log('actualizando usuario...');
    console.log(this.lista);
  }
  public getLista(): Usuario[] {
    return this.lista.filter((usuario) => usuario.nombre !== 'sin-nombre');
  }
  public getUsuario(id: string): Usuario | undefined {
    return this.lista.find((usuario) => usuario.id === id);
  }
  public getUsuarioEnSala(sala: string): Usuario[] {
    return this.lista.filter((usuario) => usuario.sala === sala);
  }
  public borraUsuario(id: string): Usuario | undefined {
    const tempUsuario = this.getUsuario(id);
    this.lista = this.lista.filter((usuario) => usuario.id !== id);
    return tempUsuario;
  }
}
