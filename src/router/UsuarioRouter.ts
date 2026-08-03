import { IncomingMessage, ServerResponse } from "http";
import { url } from "inspector";
import { UsuarioService } from "../service/UsuarioService";

const service = new UsuarioService();

export async function routes(req: IncomingMessage, res: ServerResponse) {

    res.setHeader("Content-Type", "application/json");

    const url = req.url ?? "";
    const metodo = req.method ?? "";

    try {

        // GET | Listar Usuarios
        if (metodo === "GET" && url === "/usuarios") {

            const usuarios = await service.listar();

            res.writeHead(200);

            res.end(JSON.stringify(usuarios));

            return;
        }

        // POST | Agregar Usuarios
        if (metodo === "POST" && url === "/usuarios/crear") {
            let body = "";

            req.on("data", chunk => {
                body += chunk;
            });

            req.on("end", async () => {
                try {
                    
                    const usuario = JSON.parse(body);

                    await service.agregar(usuario);

                    res.writeHead(201);

                    res.end(JSON.stringify({
                        mensaje: "Usuario agregado correctamete."
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

        // PUT | Actualizar usuarios
        if (metodo === "PUT" && url.startsWith("/usuarios/actualizar/")) {
            const idPart = url.split("/").pop();
            const id = idPart ? Number(idPart) : NaN;
            let body = "";

            req.on("data", chunk => {
                body += chunk;
            });

            req.on("end", async () => {
                try {
                    const datosActualizados = JSON.parse(body);
                    const usuarioAActualizar = { ...datosActualizados, id };

                    await service.actualizar(usuarioAActualizar);

                    res.writeHead(200);

                    res.end(JSON.stringify({
                        mensaje: "Usuario Actualizado."
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

        // DELETE | Eliminar usuarios
        
        if (metodo === "DELETE" && url.startsWith("/usuarios/eliminar/")) {
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
                mensaje: "Usuario eliminado correctamente"
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