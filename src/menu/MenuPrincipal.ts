import { Estado } from "../models/Estado";
import { Rol } from "../models/Rol";
import { UsuarioService } from "../service/UsuarioService";
import { rl } from "../utils/Readline";

const service = new UsuarioService();

export async function menuPrincipal() {
    let opcion = 5;

    while (true) {
        
        console.log("| MENU |");
        console.log("\n1. Agregar");
        console.log("2. Listar");
        console.log("3. Actualizar");
        console.log("4. Eliminar");
        console.log("5. Salir");
        
        opcion = Number(await rl.question("Dame un nuevo valor para opciones: "));

        if (opcion === 5){
            break;
        }

        switch (opcion) {
            case 1:
                const id = Number(await rl.question("ID: "));
                const nombre = await rl.question("Nombre: ");
                const apellido = await rl.question("Apellido: ");
                const edad = Number(await rl.question("Edad: "));
                const correo = await rl.question("Correo: ");
                const contrasena = Number(await rl.question("Contraseña: "));
                const rolTexto = await rl.question("Rol: ");
                const estadoTexto = await rl.question("Estado: ");

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

            break;

            case 2:
                console.table(await service.listar());
            break;
        }   
    }
}