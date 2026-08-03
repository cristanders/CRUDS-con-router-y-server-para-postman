import { UsuarioRepository } from "../repository/UsuarioRepository";
import { Usuario } from "../models/Usuario";

export class UsuarioService {
    private repository = new UsuarioRepository();

    // Método para listar
    async listar(): Promise<Usuario[]> {
        return await this.repository.obtenerUsuarios();
    }

    // Método para agregar
    async agregar(usuario: Usuario): Promise<void> {
        const correoValido = /@(gmail\.com|hotmail\.com|outlook\.com)$/i.test(usuario.correo);
        
        if (!correoValido) {
            throw new Error("El correo debe ser de Gmail, Hotmail o Outlook.");
        }

        const usuarios = await this.repository.obtenerUsuarios();
        const existe = usuarios.some(u => u.id === usuario.id);

        if (existe) {
            throw new Error("Ya existe un usuario con ese ID.");
        }

        usuarios.push(usuario);
        await this.repository.guardarUsuarios(usuarios);
        console.log("Usuario creado correctamente.");
    }

    // Método para actualizar
    async actualizar(usuario: Usuario): Promise<void> {
        const correoValido = /@(gmail\.com|hotmail\.com|outlook\.com)$/i.test(usuario.correo);

        if (!correoValido) {
            throw new Error("El correo debe ser de Gmail, Hotmail o Outlook.");
        }

        const usuarios = await this.repository.obtenerUsuarios();
        const indice = usuarios.findIndex(u => u.id === usuario.id);

        if (indice === -1) {
            throw new Error("El usuario no existe.");
        }

        usuarios[indice] = usuario;
        await this.repository.guardarUsuarios(usuarios);
        console.log("Usuario Actualizado.");
    }

    // Método para eliminar
    async eliminar(id: number): Promise<void> {
        const usuarios = await this.repository.obtenerUsuarios();
        const nuevos = usuarios.filter(u => u.id !== id);

        if (nuevos.length === usuarios.length) {
            throw new Error("El usuario con ese ID no existe.");
        }

        await this.repository.guardarUsuarios(nuevos);
        console.log("Usuario eliminado correctamente.");
    }
}