import { ProductoRepository } from '../repository/ProductoRepository';
import { Producto } from '../models/Producto';

export class ProductoService {
    private repository = new ProductoRepository();

    async listar(): Promise<Producto[]> {
        return await this.repository.obtenerProductos();
    }

    async agregar(producto: Producto): Promise<void> {
        try {
            const productos = await this.repository.obtenerProductos();
            const existe = productos.some(p => p.id === producto.id);

            if (existe) {
                console.log("Ya existe un producto con ese ID");
                return;
            }

            productos.push(producto);
            await this.repository.guardarProductos(productos);
            console.log("\nProducto creado correctamente\n");
        } catch (error) {
            console.log("\n No se pudo crear el producto.\n");
        }
    }

    async actualizar(producto: Producto): Promise<void> {
        try {
            const productos = await this.repository.obtenerProductos();
            const indice = productos.findIndex(p => p.id === producto.id);

            if (indice === -1) {
                console.log("\nEl producto no existe.\n");
                return;
            }

            productos[indice] = producto;
            await this.repository.guardarProductos(productos);
            console.log("\nProducto actualizado correctamente\n");
        } catch (error) {
            console.log("\nNo se pudo actualizar el producto.\n");
        }
    }

    async eliminar(id: number): Promise<void> {
        try {
            const productos = await this.repository.obtenerProductos();
            const nuevos = productos.filter(p => p.id !== id);

            if (nuevos.length === productos.length) {
                console.log("\nEl producto con ese ID no existe.\n");
                return;
            }

            await this.repository.guardarProductos(nuevos);
            console.log("\nProducto eliminado correctamente\n");
        } catch (error) {
            console.log("\nNo se pudo eliminar el producto.\n");
        }
    }
}