import { UsuarioRepository } from "../data/UsuarioRepository";
import { Usuario } from "../models/Usuario";

export class UsuarioService {
    private repository = new UsuarioRepository();

    // Método para listar
    async listar(): Promise<Usuario[]> {
        return await this.repository.obtenerUsuarios();
    }

    // Métdodo para agregar
    async agregar(usuario: Usuario): Promise<void> {
        try {
            const usuarios = await this.repository.obtenerUsuarios();

            const existe = usuarios.some(u => u.id === usuario.id);

            if (existe) {
                console.log("Ya existe un usuario con ese ID.");
                return;
            }

            usuarios.push(usuario);

            await this.repository.guardarUsuarios(usuarios);

            console.log("Usuarios creado correctamente.");
        } catch (error) {
            console.log("Error al crear el usuario.");
        }
    }

    // Método para actualizar
    async actualizar(usuario: Usuario): Promise<void> {
        try {
            const usuarios = await this.repository.obtenerUsuarios();

            const indice = usuarios.findIndex(u => u.id === usuario.id);

            if (indice === -1) {
                console.log("El usuario no existe.");
                return;
            }

            usuarios[indice] = usuario;

            await this.repository.guardarUsuarios(usuarios);

            console.log("Usuario Actualizado.");
        } catch (error) {
            console.log("Error al actualizar el usuario.");
        }
    }

    // Método para eliminar
    async eliminar(id: number): Promise<void> {
        try {
            const usuarios = await this.repository.obtenerUsuarios();

            const nuevos = usuarios.filter(u => u.id !== id);

            if (nuevos.length === usuarios.length) {
                false;
            }

            await this.repository.guardarUsuarios(nuevos);

            console.log("Usuario eliminado.");
        } catch (error) {
            console.log("Error al eliminar.");
        }
    }
}