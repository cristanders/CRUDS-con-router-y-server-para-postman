import { ProveedorService } from "../service/ProveedorService";
import { rl } from "../utils/Readline";

const proveedorservice = new ProveedorService();

export async function ProveedorMenu() {
    let opcion = 5;

    while (true) {
        console.log("\n| MENU PROVEEDORES |");
        console.log("1. Agregar Proveedor");
        console.log("2. Listar Proveedores");
        console.log("3. Actualizar Proveedor");
        console.log("4. Eliminar Proveedor");
        console.log("5. Volver al Menú Principal");
        
        opcion = Number(await rl.question("Elige una opción: "));

        if (opcion === 5) {
            break;
        }

        switch (opcion) {
            case 1: {
                const id = Number(await rl.question("ID: "));
                const empresa = await rl.question("Empresa: ");
                const contacto = await rl.question("Contacto: ");
                const telefono = Number(await rl.question("Teléfono: "));
                const correo = await rl.question("Correo: ");

                await proveedorservice.agregar({
                    id,
                    empresa,
                    contacto,
                    telefono,
                    correo
                });
                break;
            }

            case 2: {
                console.table(await proveedorservice.listar());
                break;
            }

            case 3: {
                const id = Number(await rl.question("ID del proveedor a actualizar: "));
                const empresa = await rl.question("Nueva empresa: ");
                const contacto = await rl.question("Nuevo contacto: ");
                const telefono = Number(await rl.question("Nuevo teléfono: "));
                const correo = await rl.question("Nuevo correo: ");

                await proveedorservice.actualizar({
                    id,
                    empresa,
                    contacto,
                    telefono,
                    correo
                });
                break;
            }

            case 4: {
                const id = Number(await rl.question("ID del proveedor a eliminar: "));
                await proveedorservice.eliminar(id);
                break;
            }

            default:
                console.log("Opción no válida");
                break;
        }   
    }
}