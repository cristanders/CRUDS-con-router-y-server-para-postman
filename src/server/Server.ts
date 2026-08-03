import { createServer } from "http";
import { routes as usuarioRoutes } from "../router/UsuarioRouter";
import { productoRoutes } from "../router/ProductoRouter";
import { proveedorRoutes } from "../router/ProveedorRouter";

const servidor = createServer(async (req, res) => {
    const url = req.url ?? "";

    if (url.startsWith("/usuarios")) {
        await usuarioRoutes(req, res);
        return;
    }

    if (url.startsWith("/productos")) {
        await productoRoutes(req, res);
        return;
    }

    if (url.startsWith("/proveedores")) {
        await proveedorRoutes(req, res);
        return;
    }

    res.setHeader("Content-Type", "application/json");
    res.writeHead(404);
    res.end(JSON.stringify({ mensaje: "Ruta no encontrada en el servidor" }));
});

servidor.listen(3000, () => {
    console.log("\n----------------------");
    console.log("Servidor iniciado en:");
    console.log("http://localhost:3000");
    console.log("----------------------");
});