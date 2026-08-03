import { ProductoService } from "../service/ProductoService";
import { rl } from "../utils/Readline";

const productoService = new ProductoService();

export async function ProductoMenu() {
    let opcion = 5;

    while (true) {
        console.log("\n| MENU PRODUCTOS |");
        console.log("1. Agregar Producto");
        console.log("2. Listar Productos");
        console.log("3. Actualizar Producto");
        console.log("4. Eliminar Producto");
        console.log("5. Volver al Menú Principal");
        
        opcion = Number(await rl.question("Elige una opción: "));

        if (opcion === 5) {
            break;
        }

        switch (opcion) {
            case 1: {
                const id = Number(await rl.question("ID: "));
                const nombre = await rl.question("Nombre: ");
                const descripcion = await rl.question("Descripción: ");
                const precio = Number(await rl.question("Precio: "));
                const stock = Number(await rl.question("Stock: "));
                const categoria = await rl.question("Categoría: ");

                await productoService.agregar({
                    id,
                    nombre,
                    descripcion,
                    precio,
                    stock,
                    categoria
                });
                break;
            }

            case 2: {
                console.table(await productoService.listar());
                break;
            }

            case 3: {
                const id = Number(await rl.question("ID del producto a actualizar: "));
                const nombre = await rl.question("Nuevo nombre: ");
                const descripcion = await rl.question("Nueva descripción: ");
                const precio = Number(await rl.question("Nuevo precio: "));
                const stock = Number(await rl.question("Nuevo stock: "));
                const categoria = await rl.question("Nueva categoría: ");

                await productoService.actualizar({
                    id,
                    nombre,
                    descripcion,
                    precio,
                    stock,
                    categoria
                });
                break;
            }

            case 4: {
                const id = Number(await rl.question("ID del producto a eliminar: "));
                await productoService.eliminar(id);
                break;
            }

            default:
                console.log(" Opción no válida.");
                break;
        }   
    }
}