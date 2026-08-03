import { IncomingMessage, ServerResponse } from "http";
import { url } from "inspector";
import { ProveedorService } from "../service/ProveedorService";

const service = new ProveedorService();

export async function proveedorRoutes(req: IncomingMessage, res: ServerResponse) {

    res.setHeader("Content-Type", "application/json");

    const url = req.url ?? "";
    const metodo = req.method ?? "";

    try {

        // GET | Listar Proveedores
        if (metodo === "GET" && url === "/proveedores") {

            const proveedores = await service.listar();

            res.writeHead(200);

            res.end(JSON.stringify(proveedores));

            return;
        }

        // POST | Agregar Proveedores
        if (metodo === "POST" && url === "/proveedores/crear") {
            let body = "";

            req.on("data", chunk => {
                body += chunk;
            });

            req.on("end", async () => {
                try {
                    
                    const proveedor = JSON.parse(body);

                    await service.agregar(proveedor);

                    res.writeHead(201);

                    res.end(JSON.stringify({
                        mensaje: "Proveedor agregado correctamente."
                    }));

                } catch (error) {
                    
                    res.writeHead(400);

                    res.end(JSON.stringify({
                        mensaje: (error as Error).message
                    }));
                }
            })
        }

        // PUT | Actualizar proveedores
        if (metodo === "PUT" && url.startsWith("/proveedores/actualizar/")) {
            const idPart = url.split("/").pop();
            const id = idPart ? Number(idPart) : NaN;
            let body = "";

            req.on("data", chunk => {
                body += chunk;
            });

            req.on("end", async () => {
                try {
                    const datosActualizados = JSON.parse(body);
                    const proveedorAActualizar = { ...datosActualizados, id };

                    await service.actualizar(proveedorAActualizar);

                    res.writeHead(200);

                    res.end(JSON.stringify({
                        mensaje: "Proveedor Actualizado."
                    }));

                } catch (error) {
                    res.writeHead(400);

                    res.end(JSON.stringify({
                        mensaje: (error as Error).message
                    }));
                }
            });
            return;
        }

        // DELETE | Eliminar proveedores
        
        if (metodo === "DELETE" && url.startsWith("/proveedores/eliminar/")) {
            const idPart = url.split("/").pop();
            const id = idPart ? Number(idPart) : NaN;

            if (isNaN(id)) {
                res.writeHead(400);
                res.end(JSON.stringify({ mensaje: "ID inválido" }));
                return;
            }

            await service.eliminar(id);

            res.writeHead(200);

            res.end(JSON.stringify({
                mensaje: "Proveedor eliminado correctamente"
            }));
            return;
        }

        // Ruta no encontrada
        res.writeHead(404);
        res.end(JSON.stringify({ mensaje: "Ruta no encontrada" }));

    } catch (error) {
        res.writeHead(500);

        res.end(JSON.stringify({
            mensaje: (error as Error).message
        }));
        
    }
}