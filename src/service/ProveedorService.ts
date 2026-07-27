import { ProveedorRepository } from "../data/ProveedorRepository";
import { Proveedor } from "../models/Proveedor";

export class ProveedorService {
    private repository = new ProveedorRepository();

    async listar(): Promise<Proveedor[]> {
        return await this.repository.obtenerProveedores();
    }

    async agregar(proveedor: Proveedor): Promise<void> {
        try {
            const proveedores = await this.repository.obtenerProveedores();
            const existe = proveedores.some(p => p.id === proveedor.id);

            if (existe) {
                console.log("\nYa existe un proveedor con ese ID");
                return;
            }

            proveedores.push(proveedor);
            await this.repository.guardarProveedores(proveedores);
            console.log("\nProveedor creado correctamente");
        } catch (error) {
            console.log("\nNo se pudo crear el proveedor");
        }
    }

    async actualizar(proveedor: Proveedor): Promise<void> {
        try {
            const proveedores = await this.repository.obtenerProveedores();
            const indice = proveedores.findIndex(p => p.id === proveedor.id);

            if (indice === -1) {
                console.log("\nEl proveedor no existe");
                return;
            }

            proveedores[indice] = proveedor;
            await this.repository.guardarProveedores(proveedores);
            console.log("\nProveedor actualizado correctamente");
        } catch (error) {
            console.log("\nNo se pudo actualizar el proveedor");
        }
    }

    async eliminar(id: number): Promise<void> {
        try {
            const proveedores = await this.repository.obtenerProveedores();
            const nuevos = proveedores.filter(p => p.id !== id);

            if (nuevos.length === proveedores.length) {
                console.log("\nEl proveedor con ese ID no existe.");
                return;
            }

            await this.repository.guardarProveedores(nuevos);
            console.log("\nProveedor eliminado correctamente");
        } catch (error) {
            console.log("\nNo se pudo eliminar el proveedor");
        }
    }
}