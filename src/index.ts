import { iniciarSesion } from "./menu/Login";
import "./server/Server";

async function main() {
    await iniciarSesion();
}

main();