import { Estado } from "../models/Estado";
import { Rol } from "../models/Rol";
import { UsuarioService } from "../service/UsuarioService";
import { ProductoMenu } from "./ProductoMenu";
import { ProveedorMenu } from "./ProveedorMenu"; 
import { rl } from "../utils/Readline";

const service = new UsuarioService();

export async function menuPrincipal() {
    let opcion = 7;

    while (true) {
        console.log("\n| MENU PRINCIPAL |");
        console.log("1. Agregar Usuario");
        console.log("2. Listar Usuarios");
        console.log("3. Actualizar Usuario");
        console.log("4. Eliminar Usuario");
        console.log("5. Menú Productos");
        console.log("6. Menú Proveedores");
        console.log("7. Salir");
        
        opcion = Number(await rl.question("Dame un nuevo valor para opciones: "));

        if (opcion === 7) {
            break;
        }

        switch (opcion) {
            case 1: {
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
            }

            case 2: {
                console.table(await service.listar());
                break;
            }

            case 3: {
                console.log("\n| Actualizar Usuario |");
                const id = Number(await rl.question("ID del usuario a actualizar: "));
                const nombre = await rl.question("Nuevo nombre: ");
                const apellido = await rl.question("Nuevo apellido: ");
                const edad = Number(await rl.question("Nueva edad: "));
                const correo = await rl.question("Nuevo correo: ");
                const contrasena = Number(await rl.question("Nueva contraseña: "));
                const rolTexto = await rl.question("Nuevo rol: ");
                const estadoTexto = await rl.question("Nuevo estado: ");

                await service.actualizar({
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
            }

            case 4: {
                console.log("\n| Eliminar Usuario |");
                const id = Number(await rl.question("ID del usuario a eliminar: "));
                await service.eliminar(id);
                break;
            }

            case 5: {
                await ProductoMenu();
                break;
            }

            case 6: {
                await ProveedorMenu(); 
                break;
            }

            default:
                console.log("\nOpción no válida.\n");
                break;
        }   
    }
}