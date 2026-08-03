import { Estado } from "../enum/Estado";
import { Rol } from "../models/Rol";
import { UsuarioService } from "../service/UsuarioService";
import { rl } from "../utils/Readline";
import { menuPrincipal } from "./MenuPrincipal";

const service = new UsuarioService();

export async function iniciarSesion() {
    while (true) {
        console.log("   Bienvenido   ");
        console.log("1. Iniciar Sesión");
        console.log("2. Registrarse");
        console.log("3. Salir");

        const opcion = Number(await rl.question("Elige una opción: "));

        if (opcion === 3) {
            console.log("Abandonando");
            rl.close();
            break;
        }

        switch (opcion) {
            case 1: {
                console.log("Login");
                const correo = await rl.question("Correo electronico: ");
                const contrasenaIngresada = await rl.question("Contraseña: ");
                const contrasena = Number(contrasenaIngresada);

                const usuarios = await service.listar();
                const usuarioEncontrado = usuarios.find(
                    (u) => u.correo === correo && u.contrasena === contrasena
                );

                if (usuarioEncontrado) {
                    console.log(`\nBienvenido ${usuarioEncontrado.nombre}!\n`);
                    await menuPrincipal(); 
                } else {
                    console.log("\nCredenciales incorrectas\n");
                }
                break;
            } 
            //register
            case 2: {
                console.log("Crea tu usuario ");
                const id = Number(await rl.question("ID: "));
                const nombre = await rl.question("Nombre: ");
                const apellido = await rl.question("Apellido: ");
                const edad = Number(await rl.question("Edad: "));
                const correo = await rl.question("Correo: ");
                const contrasena = Number(await rl.question("Contraseña: "));
                const rolTexto = await rl.question("Rol (ADMIN / USER): ");
                const estadoTexto = await rl.question("Estado (ACTIVO / INACTIVO, SUSPENDIDO): ");

                await service.agregar({
                    id,
                    nombre,
                    apellido,
                    edad,
                    correo,
                    contrasena,
                    rol: rolTexto.toUpperCase() as Rol,
                    estado: estadoTexto.toUpperCase() as Estado
                });

                console.log("Usuario registrado");
                break;
            } 

            default:
                console.log("Opcion no valida");
                break;
        }
    }
}