// Se importa la libreria jwt y el token
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../Configuracion/configuracion.js";

// Se crea el token de acceso
export async function createAccessToken(payload) {

    // Se manda una promesa
    return new Promise((resolve, reject) => {

        // Se genera un token para verificar los datos
        jwt.sign(payload, TOKEN_SECRET, { expiresIn: "1d" }, (err, token) => {

            // Si ocurre algún error lo muestra
            if (err) reject(err);
            // Manda el token
            resolve(token);

        });

    });
}