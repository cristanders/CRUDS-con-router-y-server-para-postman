import { Estado } from "../enum/Estado";
import { Rol } from "./Rol";

export interface Usuario {
    id: number;
    nombre: string;
    apellido: string;
    edad: number;
    correo: string;
    contrasena: number;
    rol: Rol;
    estado: Estado;
}