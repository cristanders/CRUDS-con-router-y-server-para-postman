import { IncomingMessage, ServerResponse } from "http";
import { url } from "inspector";
import { ProductoService } from "../service/ProductoService";

const service = new ProductoService();

export async function productoRoutes(req: IncomingMessage, res: ServerResponse) {

    res.setHeader("Content-Type", "application/json");

    const url = req.url ?? "";
    const metodo = req.method ?? "";

    try {

        // GET 
        if (metodo === "GET" && url === "/productos") {

            const productos = await service.listar();

            res.writeHead(200);

            res.end(JSON.stringify(productos));

            return;
        }

        // POST 
        if (metodo === "POST" && url === "/productos/crear") {
            let body = "";

            req.on("data", chunk => {
                body += chunk;
            });

            req.on("end", async () => {
                try {
                    
                    const producto = JSON.parse(body);

                    await service.agregar(producto);

                    res.writeHead(201);

                    res.end(JSON.stringify({
                        mensaje: "Producto agregado correctamente."
                    }));

                } catch (error) {
                    
                    res.writeHead(400);

                    res.end(JSON.stringify({
                        mensaje: (error as Error).message
                    }));
                }
            })
            return;
        }

        // PUT 
        if (metodo === "PUT" && url.startsWith("/productos/actualizar/")) {
            const idPart = url.split("/").pop();
            const id = idPart ? Number(idPart) : NaN;
            let body = "";

            req.on("data", chunk => {
                body += chunk;
            });

            req.on("end", async () => {
                try {
                    const datosActualizados = JSON.parse(body);
                    const productoAActualizar = { ...datosActualizados, id };

                    await service.actualizar(productoAActualizar);

                    res.writeHead(200);

                    res.end(JSON.stringify({
                        mensaje: "Producto Actualizado."
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

        // DELETE 
        if (metodo === "DELETE" && url.startsWith("/productos/eliminar/")) {
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
                mensaje: "Producto eliminado correctamente."
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