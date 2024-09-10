// Libreria zod para verificar errores
import { z } from "zod";

// Esquema para crear articulos
export const crearArticuloSchema = z.object({

    nombre: z.string({
        required_error: "Se requiere un nombre de articulo",
    }),
    latitud: z.string({
        required_error: "Se requiere una latitud",
    }),
    longitud: z.string({
        required_error: "Se requiere una longitud",
    }),
    descripcion: z.string({
        required_error: "Se requiere una descripcion",
    }),
    actividades: z.string({
        required_error: "Se requieren actividades",
    }),
    horario: z.string({
        required_error: "Se requiere un horario",
    }),
    delegacion: z.string({
        required_error: "Se requiere una delegacion",
    }),
    url: z.string(),
    metro: z.string()

});